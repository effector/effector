//@flow

import type {
  Graph,
  StateRef,
  Cmd,
  Emit,
  Run,
  Update,
  Filter,
  Compute,
} from 'effector/stdlib'

export function exec(unit: {+graphite: Graph<any>, ...}, payload: any) {
  runtime(unit.graphite, payload)
}
export function runtime(graph: Graph<any>, payload: any) {
  const pendingEvents = []
  runStep(graph, payload, pendingEvents)
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
class Local {
  /*::
  isChanged: boolean
  isFailed: boolean
  arg: any
  */
  constructor(arg: any) {
    this.isChanged = true
    this.isFailed = false
    this.arg = arg
  }
}
const runStep = (step: Graph<any>, payload: any, pendingEvents) => {
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
    meta.val = graph.val
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
      const local = new Local(scope.value)
      //$todo
      scope.value = cmd(meta, local, step.data)
      if (local.isFailed) {
        meta.stop = true
      } else if (!local.isChanged) {
        meta.stop = true
      } else {
        meta.stop = false
      }
    }
    if (!meta.stop) {
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
    }
    if (resetStop) {
      meta.stop = false
    }
  }
  const meta = {
    pendingEvents,
    stop: false,
    val: step.val,
  }

  runFifo()
}
const command = {
  emit: (meta, local, step: $PropertyType<Emit, 'data'>) => local.arg,
  filter(meta, local, step: $PropertyType<Filter, 'data'>) {
    const runCtx = tryRun({
      arg: local.arg,
      val: meta.val,
      fn: step.fn,
    })
    /**
     * .isFailed assignment is not needed because in such case
     * runCtx.result will be null
     * thereby successfully forcing that branch to stop
     */
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
    local.isFailed = runCtx.err
    return runCtx.result
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
    local.isFailed = runCtx.err
    return runCtx.result
  },
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
