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
  Barrier,
} from 'effector/stdlib'
import {__DEBUG__} from 'effector/flags'

export function exec(unit: {+graphite: Graph<any>, ...}, payload: any) {
  runtime(unit.graphite, payload)
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
type Layer = {|
  +step: Graph<any>,
  +firstIndex: number,
  +scope: Stack,
  +resetStop: boolean,
  +type: 'layer' | 'barrier' | 'effect',
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
function insert(x: Layer, t: leftist): leftist {
  return merge(new Leftist(x, 1, null, null), t)
}
function deleteMin(param: leftist): leftist {
  if (param) {
    return merge(param.left, param.right)
  }
  return null
}
function merge(_t1: leftist, _t2: leftist): leftist {
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
  arg: any
  */
  constructor(arg: any) {
    this.isChanged = true
    this.isFailed = false
    this.arg = arg
  }
}
const layerComparator = (a: Layer, b: Layer) => {
  if (a.type === b.type) return a.id > b.id
  let arank = -1
  switch (a.type) {
    case 'layer':
      arank = 0
      break
    case 'barrier':
      arank = 1
      break
    case 'effect':
      arank = 2
      break
  }
  let brank = -1
  switch (b.type) {
    case 'layer':
      brank = 0
      break
    case 'barrier':
      brank = 1
      break
    case 'effect':
      brank = 2
      break
  }
  return arank > brank
}
function iterate(tree: leftist) {
  const results = []
  while (tree) {
    results.push(tree.value)
    tree = deleteMin(tree)
  }
  return results
}
const flattenLayer = (layer: Layer) => {
  const result = {}
  const scope = []
  let currentScope = layer.scope
  while (currentScope) {
    scope.push(currentScope.value)
    currentScope = currentScope.parent
  }
  result.id = layer.id
  result.type = layer.type
  result.scope = scope
  return result
}
const printLayers = list => {
  const flatten = list.map(flattenLayer)
  console.table((flatten: any))
  for (let i = 0; i < flatten.length; i++) {
    console.table((flatten[i].scope.reverse(): any))
  }
}
let layerID = 0
let heap: leftist = null
const barriers = new Set()
const pushHeap = (opts: Layer) => {
  heap = insert(opts, heap)
}
const runGraph = ({step: graph, firstIndex, scope, resetStop}: Layer, meta) => {
  meta.val = graph.val
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
            resetStop,
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
              resetStop,
              type: 'barrier',
              id: ++layerID,
            })
          }
          return
        }
      }
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
      pushHeap({
        step: graph.next[stepn],
        firstIndex: 0,
        scope: subscope,
        resetStop: true,
        type: 'layer',
        id: ++layerID,
      })
    }
  }
  if (resetStop) {
    meta.stop = false
  }
}
export const runtime = (step: Graph<any>, payload: any) => {
  pushHeap({
    step,
    firstIndex: 0,
    scope: new Stack(payload, new Stack(null, null)),
    resetStop: false,
    type: 'layer',
    id: ++layerID,
  })
  const meta = {
    stop: false,
    val: step.val,
  }
  let value
  while (heap) {
    value = heap.value
    heap = deleteMin(heap)
    runGraph(value, meta)
    if (__DEBUG__) {
      const list = iterate(heap)
      if (list.length > 4) {
        printLayers(list)
      }
    }
  }
}
const command = {
  barrier(meta, local, step: $PropertyType<Barrier, 'data'>) {
    local.isFailed = false
    local.isChanged = true
    return local.arg
  },
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
