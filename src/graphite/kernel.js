//@flow

import type {
  Graph,
  Step,
  StateRef,
  Cmd,
  Emit,
  Run,
  Update,
  Filter,
  Compute,
  Single,
} from 'effector/stdlib'

type Meta = {|
  callstack: Array<Cmd>,
  stop: boolean,
  scope: Array<any>,
  pendingEvents: Array<{
    event: (data: any) => any,
    data: any,
  }>,
  val: {[name: string]: StateRef},
|}

type Command<Local> = {
  cmd(meta: Meta, local: Local, val: Object): void,
  transition(meta: Meta, local: Local): boolean,
  local(meta: Meta): Local,
}

type Line = {|
  +step: Graph<any>,
  +post: Array<PostAction>,
|}

type Area = {|
  +list: $ReadOnlyArray<Line>,
  +post: Array<PostAction>,
  index: number,
|}

type PostAction =
  | {|+type: 'meta/?stop'|}
  | {|+type: 'meta/!stop'|}
  | {|+type: 'callstack/pop'|}
  | {|+type: 'scope/size', +size: number|}

export function exec(unit: {+graphite: Graph<any>, ...}, payload: any) {
  runtime(unit.graphite, payload)
}
export function runtime(graph: Graph<any>, payload: any) {
  const pendingEvents = []
  runStep2(graph, payload, pendingEvents)
  runPendings(pendingEvents)
}
const runPendings = pendings => {
  if (pendings.length === 0) return
  const ordered = []
  const orderedIDs = []
  for (let i = pendings.length - 1; i >= 0; i--) {
    const item = pendings[i]
    if (orderedIDs.indexOf(item.event.id) !== -1) continue
    orderedIDs.push(item.event.id)
    ordered.push(item)
  }
  if (ordered.length === 0) return
  for (let i = ordered.length - 1; i >= 0; i--) {
    const item = ordered[i]
    item.event(item.data)
  }
  console.warn('orderedIDs', orderedIDs)
}
class Stack {
  /*::
  value: any
  parent: Stack | null
  */
  constructor(value: any, parent: Stack | null) {
    this.value = value
    this.parent = parent
  }
}
class FIFO {
  /*::
  value: {
    step: Graph<any>,
    firstIndex: number,
    scope: Stack,
    resetStop: boolean,
  }
  child: FIFO | null
  */
  constructor(value: {
    step: Graph<any>,
    firstIndex: number,
    scope: Stack,
    resetStop: boolean,
  }) {
    this.value = value
    this.child = null
  }
}

const runStep2 = (step: Graph<any>, payload: any, pendingEvents) => {
  const voidStack = new Stack(null, null)
  const fifo = new FIFO({
    step,
    firstIndex: 0,
    scope: new Stack(payload, voidStack),
    resetStop: false,
  })
  const addFifo = (opts: {
    step: Graph<any>,
    firstIndex: number,
    scope: Stack,
    resetStop: boolean,
  }) => {
    const next = new FIFO(opts)
    last.child = next
    last = next
  }

  let last = fifo
  const runFifo = () => {
    let current = fifo
    while (current) {
      runGraph(current)
      current = current.child
    }
  }
  const runGraph = (fifo: FIFO) => {
    const {step: graph, firstIndex, scope, resetStop} = fifo.value
    for (
      let stepn = firstIndex;
      stepn < graph.seq.length && !meta.stop;
      stepn++
    ) {
      const step = graph.seq[stepn]
      if (stepn !== firstIndex && step.type === 'run') {
        addFifo({
          step: graph,
          firstIndex: stepn,
          scope,
          resetStop,
        })
        return
      }
      const cmd = command[step.type]
      const local = cmd.local(scope.value)
      //$todo
      scope.value = cmd.cmd(meta, local, step.data)
      //$todo
      meta.stop = !cmd.transition(local)
    }
    if (!resetStop && meta.stop) return
    for (let stepn = 0; stepn < graph.next.length; stepn++) {
      /**
       * copy head of scope stack to feel free
       * to override it during seq execution
       */
      const subscope = new Stack(scope.value, scope)
      addFifo({
        step: graph.next[stepn],
        firstIndex: 0,
        scope: subscope,
        resetStop: true,
      })
    }
    if (resetStop) {
      meta.stop = false
    }
  }
  const meta: Meta = {
    callstack: [],
    pendingEvents,
    stop: false,
    scope: [],
    val: {},
  }
  const cmd = {
    emit: (meta, local, step: $PropertyType<Emit, 'data'>) => local.arg,
    filter(meta, local, step: $PropertyType<Filter, 'data'>) {
      const runCtx = tryRun({
        arg: local.arg,
        val: meta.val,
        fn: step.fn,
      })
      //$todo
      local.isChanged = Boolean(runCtx.result)
      return local.arg
    },
    run(meta, local, step: $PropertyType<Run, 'data'>) {
      if ('pushUpdate' in step) {
        step.pushUpdate = data => meta.pendingEvents.push(data)
      }
      const runCtx = tryRun({
        arg: local.arg,
        val: meta.val,
        fn: step.fn,
      })
      //$todo
      local.isFailed = runCtx.err
      return local.arg
    },
    update(meta, local, step: $PropertyType<Update, 'data'>) {
      return (step.store.current = local.arg)
    },
    compute(meta, local, step: $PropertyType<Compute, 'data'>) {
      const runCtx = tryRun({
        arg: local.arg,
        val: meta.val,
        fn: step.fn,
      })
      //$todo
      local.isChanged = !runCtx.err
      return runCtx.err ? null : runCtx.result
    },
  }

  const command = {
    emit: {
      cmd: cmd.emit,
      transition: () => true,
      local: (arg): {arg: any} => ({arg}),
    },
    filter: {
      cmd: cmd.filter,
      //$todo
      transition: local => local.isChanged,
      local: (arg): {arg: any, isChanged: boolean} => ({
        arg,
        isChanged: false,
      }),
    },
    run: {
      cmd: cmd.run,
      //$todo
      transition: local => !local.isFailed,
      local: (arg): {arg: any, isFailed: boolean} => ({
        arg,
        isFailed: true,
      }),
    },
    update: {
      cmd: cmd.update,
      transition: () => true,
      local: (arg): {arg: any} => ({
        arg,
      }),
    },
    compute: {
      cmd: cmd.compute,
      //$todo
      transition: local => local.isChanged,
      local: (arg): {arg: any, isChanged: boolean} => ({
        arg,
        isChanged: false,
      }),
    },
  }

  runFifo()
}

const tryRun = ctx => {
  const result = {
    err: false,
    result: null,
  }
  try {
    result.result = ctx.fn.call(null, ctx.arg, ctx.val)
  } catch (err) {
    console.error(err)
    result.err = true
  }
  return result
}
