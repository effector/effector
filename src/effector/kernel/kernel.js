//@flow

import type {
  Graph,
  Graphite,
  StateRef,
  Cmd,
  Emit,
  Run,
  Update,
  Filter,
  Compute,
  Barrier,
  Tap,
} from 'effector/stdlib'
import {getGraph, writeRef, readRef, createStateRef} from 'effector/stdlib'
import {__CANARY__} from 'effector/flags'

import {getPriority, type PriorityTag} from './getPriority'

class Stack {
  /*::
  value: StateRef
  parent: Stack | null
  */
  constructor(value: any, parent: Stack | null) {
    this.value = createStateRef(value)
    this.parent = parent
  }
}

type Layer = {|
  +step: Graph,
  +firstIndex: number,
  +scope: Stack,
  +resetStop: boolean,
  +type: PriorityTag,
  +id: number,
|}

export class Leftist {
  /*::
  left: leftist
  right: leftist
  value: Layer
  rank: number
  */
  constructor(value: Layer, rank: number, left: leftist, right: leftist) {
    this.value = value
    this.rank = rank
    this.left = left
    this.right = right
  }
}
export type leftist = null | Leftist
const insert = (x: Layer, t: leftist): leftist =>
  merge(new Leftist(x, 1, null, null), t)

const deleteMin = (param: leftist): leftist => {
  if (param) {
    return merge(param.left, param.right)
  }
  return null
}
const merge = (_t1: leftist, _t2: leftist): leftist => {
  let t2
  let t1
  let k1
  let l
  let merged
  let rank_left
  let rank_right
  while (true) {
    t2 = _t2
    t1 = _t1
    if (t1) {
      if (t2) {
        k1 = t1.value
        l = t1.left
        if (layerComparator(k1, t2.value)) {
          _t2 = t1
          _t1 = t2
          continue
        }
        merged = merge(t1.right, t2)
        rank_left = l?.rank ?? 0
        rank_right = merged?.rank ?? 0
        if (rank_left >= rank_right) {
          return new Leftist(k1, rank_right + 1, l, merged)
        }
        return new Leftist(k1, rank_left + 1, merged, l)
      }
      return t1
    }
    return t2
  }
  /*::return _t1*/
}
class Local {
  /*::
  isChanged: boolean
  isFailed: boolean
  scope: {[key: string]: any}
  */
  constructor(scope: {[key: string]: any}) {
    this.isChanged = true
    this.isFailed = false
    this.scope = scope
  }
}
const layerComparator = (a: Layer, b: Layer) => {
  if (a.type === b.type) return a.id > b.id
  return getPriority(a.type) > getPriority(b.type)
}
let layerID = 0
let heap: leftist = null
const barriers = new Set()
const pushHeap = (opts: Layer) => {
  heap = insert(opts, heap)
}
const runGraph = ({step: graph, firstIndex, scope, resetStop}: Layer, meta) => {
  const local = new Local(graph.scope)
  for (
    let stepn = firstIndex;
    stepn < graph.seq.length && !meta.stop;
    stepn++
  ) {
    const step = graph.seq[stepn]
    if (stepn === firstIndex) {
      if (step.type === 'barrier') {
        barriers.delete(step.data.barrierID)
      }
    } else {
      switch (step.type) {
        case 'run':
          pushHeap({
            step: graph,
            firstIndex: stepn,
            scope,
            resetStop: false,
            type: 'effect',
            id: ++layerID,
          })
          return
        case 'barrier': {
          const id = step.data.barrierID
          if (!barriers.has(id)) {
            barriers.add(id)
            pushHeap({
              step: graph,
              firstIndex: stepn,
              scope,
              resetStop: false,
              type: step.data.priority,
              id: ++layerID,
            })
          }
          return
        }
      }
    }
    const cmd = command[step.type]
    //$todo
    cmd(local, step.data, scope.value)
    meta.stop = local.isFailed || !local.isChanged
  }
  if (!meta.stop) {
    for (let stepn = 0; stepn < graph.next.length; stepn++) {
      /**
       * copy head of scope stack to feel free
       * to override it during seq execution
       */
      const subscope = new Stack(readRef(scope.value), scope)
      pushHeap({
        step: graph.next[stepn],
        firstIndex: 0,
        scope: subscope,
        resetStop: true,
        type: 'child',
        id: ++layerID,
      })
    }
  }
  if (resetStop) {
    meta.stop = false
  }
}
export const launch = (unit: Graphite, payload: any) => {
  const step = getGraph(unit)
  pushHeap({
    step,
    firstIndex: 0,
    scope: new Stack(payload, null),
    resetStop: false,
    type: 'pure',
    id: ++layerID,
  })
  const meta = {
    stop: false,
  }
  let value
  while (heap) {
    value = heap.value
    heap = deleteMin(heap)
    runGraph(value, meta)
  }
}
const command = {
  barrier(local, step: $PropertyType<Barrier, 'data'>, val: StateRef) {
    local.isFailed = false
    local.isChanged = true
  },
  emit(local, step: $PropertyType<Emit, 'data'>, val: StateRef) {},
  filter(local, step: $PropertyType<Filter, 'data'>, val: StateRef) {
    const runCtx = tryRun({
      arg: readRef(val),
      val: local.scope,
      fn: step.fn,
    })
    /**
     * .isFailed assignment is not needed because in such case
     * runCtx.result will be null
     * thereby successfully forcing that branch to stop
     */
    local.isChanged = !!runCtx.result
  },
  run(local, step: $PropertyType<Run, 'data'>, val: StateRef) {
    const runCtx = tryRun({
      arg: readRef(val),
      val: local.scope,
      fn: step.fn,
    })
    local.isFailed = runCtx.err
    writeRef(val, runCtx.result)
  },
  update(local, step: $PropertyType<Update, 'data'>, val: StateRef) {
    writeRef(step.store, readRef(val))
  },
  compute(local, step: $PropertyType<Compute, 'data'>, val: StateRef) {
    const runCtx = tryRun({
      arg: readRef(val),
      val: local.scope,
      fn: step.fn,
    })
    local.isFailed = runCtx.err
    writeRef(val, runCtx.result)
  },
  tap(local, step: $PropertyType<Tap, 'data'>, val: StateRef) {
    const runCtx = tryRun({
      arg: readRef(val),
      val: local.scope,
      fn: step.fn,
    })
    local.isFailed = runCtx.err
  },
}
const tryRun = ({fn, arg, val}: any) => {
  const result = {
    err: false,
    result: null,
  }
  try {
    result.result = fn(arg, val)
  } catch (err) {
    console.error(err)
    result.err = true
  }
  return result
}
