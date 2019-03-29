//@flow

import type {Graph, Step, StateRef, Single} from 'effector/stdlib'

type Meta = {|
  callstack: Array<Step>,
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
  +step: Step,
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

const last = <T>(list: $ReadOnlyArray<T>): T => list[list.length - 1]
const step = (meta: Meta): Step => last(meta.callstack)
//$todo
const single = (meta: Meta): any => step(meta).data.data

export function exec(unit: {+graphite: Graph<any>, ...}, payload: any) {
  runtime(unit.graphite, payload)
}
export function runtime(graph: Graph<any>, payload: any) {
  const meta: Meta = {
    callstack: [],
    pendingEvents: [],
    stop: false,
    scope: [
      {
        arg: payload,
      },
    ],
    val: {},
  }
  runStep(graph.seq, meta, graph.val)
  runPendings(meta.pendingEvents)
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
const runStep = (step: Step, meta: Meta, valRaw) => {
  const scope = meta.scope
  const valStack: Array<typeof valRaw> = [valRaw]
  //prettier-ignore
  const pos: {|
    head: number,
    +stack: Array<Area>,
  |} = {
    head: 0,
    stack: [{
      list: [{
        step,
        post: [
          {type: 'callstack/pop'},
        ],
      }],
      post: [],
      index: 0,
    }],
  }
  headLoop: while (pos.head >= 0) {
    const area = pos.stack[pos.head]
    while (area.index < area.list.length) {
      const line = area.list[area.index]
      const step = line.step
      meta.stop = false
      meta.callstack.push(step)
      switch (step.type) {
        case 'single': {
          const type = step.data.type
          const local = command[type].local(meta, scope[scope.length - 1].arg)
          scope.push(local)
          command[type].cmd(meta, local, last(valStack))
          meta.stop = !command[type].transition(meta, local)
          break
        }
        case 'multi': {
          line.post.push({type: 'meta/!stop'})
          const items = step.data
          const list: Array<Line> = Array(items.length)
          for (let i = 0; i < items.length; i++) {
            list[i] = {
              step: items[i],
              post: [
                {type: 'callstack/pop'},
                {type: 'scope/size', size: scope.length},
              ],
            }
          }
          area.index += 1
          pos.head += 1
          pos.stack[pos.head] = {
            list,
            post: line.post,
            index: 0,
          }
          continue headLoop
        }
        case 'seq': {
          line.post.push({type: 'scope/size', size: scope.length})
          const items: Array<Step> = step.data
          const list: Array<Line> = Array(items.length)
          for (let i = 0; i < items.length; i++) {
            //prettier-ignore
            list[i] = {
              step: items[i],
              post: [
                {type: 'callstack/pop'},
                {type: 'meta/?stop'},
              ],
            }
          }
          area.index += 1
          pos.head += 1
          pos.stack[pos.head] = {
            list,
            post: line.post,
            index: 0,
          }
          continue headLoop
        }
      }
      runActions(line.post, area)
      area.index += 1
    }
    runActions(area.post, area)
    pos.head -= 1
  }

  function runActions(post: Array<PostAction>, area: Area) {
    for (let i = post.length - 1; i >= 0; i--) {
      const action = post[i]
      switch (action.type) {
        case 'meta/?stop':
          if (meta.stop) area.index = Infinity
          break
        case 'callstack/pop':
          meta.callstack.pop()
          break
        case 'meta/!stop':
          meta.stop = false
          break
        case 'scope/size':
          scope.length = action.size
          break
        /*::
        default:
          (action.type: empty)
        */
      }
    }
  }
}

const cmd = {
  emit(meta, local, val) {},
  filter(meta, local, val) {
    const runCtx = tryRun({
      arg: local.arg,
      val: meta.val,
      fn: single(meta).fn,
    })
    local.isChanged = Boolean(runCtx.result)
  },
  run(meta, local, val) {
    const data = single(meta)
    if ('pushUpdate' in data) {
      data.pushUpdate = data => meta.pendingEvents.push(data)
    }
    const runCtx = tryRun({
      arg: local.arg,
      val: meta.val,
      fn: data.fn,
    })
    local.isFailed = runCtx.err
  },
  update(meta, local, val) {
    local.store.current = local.arg
  },
  compute(meta, local, val) {
    const runCtx = tryRun({
      arg: local.arg,
      val: meta.val,
      fn: single(meta).fn,
    })
    local.isChanged = !runCtx.err
    ///TODO WARNING!! DIRTY HACK REMOVE ASAP
    ///need to separate post local variables
    local.arg = runCtx.err ? null : runCtx.result
  },
}

const command = ({
  emit: {
    cmd: cmd.emit,
    transition: () => true,
    local: (meta, arg) => ({arg}),
  },
  filter: {
    cmd: cmd.filter,
    transition: (meta, local) => local.isChanged,
    local: (meta, arg) => ({arg, isChanged: false}),
  },
  run: {
    cmd: cmd.run,
    transition: (meta, local) => local.isFailed,
    local: (meta, arg) => ({arg, isFailed: true}),
  },
  update: {
    cmd: cmd.update,
    transition: () => true,
    local: (meta, arg) => ({
      arg,
      store: single(meta).store,
    }),
  },
  compute: {
    cmd: cmd.compute,
    transition: (meta, local) => local.isChanged,
    local: (meta, arg) => ({
      arg,
      isChanged: false,
    }),
  },
}: $ReadOnly<{
  emit: Command<{arg: any}>,
  filter: Command<{arg: any, isChanged: boolean}>,
  run: Command<{arg: any, isFailed: boolean}>,
  update: Command<{arg: any, store: StateRef}>,
  compute: Command<{arg: any, isChanged: boolean}>,
}>)

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
