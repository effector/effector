//@flow

import type {Graphite, Graph, ID} from '../stdlib'
import {type PriorityTag, getPriority} from './getPriority'
import {getGraph, readRef} from '../stdlib'

/**
 * Position in the current branch,
 * including call stack, priority type
 * and index of next step in the executed Graph
 */
type Layer = {|
  +firstIndex: number,
  +stack: Stack,
  +resetStop: boolean,
  +type: PriorityTag,
  +id: number,
|}

/**
 * Call stack
 */
type Stack = {
  value: any,
  a: any,
  b: any,
  parent: Stack | null,
  node: Graph,
}

/**
 * Dedicated local metadata
 */
type Local = {
  skip: boolean,
  fail: boolean,
  ref: ID,
  scope: {[key: string]: any, ...},
}

/**
 * Skew heap
 */
type Heap = {
  /** heap node value */
  v: Layer,
  /** left heap node */
  l: Heap | null,
  /** right heap node */
  r: Heap | null,
}

let heap: Heap | null = null

const merge = (a: Heap | null, b: Heap | null): Heap | null => {
  if (!a) return b
  if (!b) return a

  let ret
  if (
    (a.v.type === b.v.type && a.v.id > b.v.id) ||
    getPriority(a.v.type) > getPriority(b.v.type)
  ) {
    ret = a
    a = b
    b = ret
  }
  ret = merge(a.r, b)
  a.r = a.l
  a.l = ret

  return a
}

const queue = []
let ix = 0
while (ix < 5) {
  queue.push({first: null, last: null, size: 0})
  ix += 1
}

const deleteMin = () => {
  for (let i = 0; i < 5; i++) {
    const list = queue[i]
    if (list.size > 0) {
      if (i === 2 || i === 3) {
        list.size -= 1
        const value = heap.v
        heap = merge(heap.l, heap.r)
        return value
      }
      if (list.size === 1) {
        list.last = null
      }
      const item = list.first
      list.first = item.right
      list.size -= 1
      return item.value
    }
  }
}
const pushFirstHeapItem = (
  type: PriorityTag,
  node: Graph,
  parent: Stack | null,
  value: any,
) =>
  pushHeap(
    0,
    ({
      a: null,
      b: null,
      node,
      parent,
      value,
    }: Stack),
    type,
  )
const pushHeap = (
  firstIndex: number,
  stack: Stack,
  type: PriorityTag,
  id = ++layerID,
) => {
  const priority = getPriority(type)
  const list = queue[priority]
  const value = {
    firstIndex,
    stack,
    resetStop: currentResetStop,
    type,
    id,
  }
  if (priority === 2 || priority === 3) {
    heap = merge(heap, {v: value, l: 0, r: 0})
  } else {
    const item = {
      right: null,
      value,
    }
    if (list.size === 0) {
      list.first = item
    } else {
      list.last.right = item
    }
    list.last = item
  }
  list.size += 1
}

let layerID = 0
const barriers = new Set()

let alreadyStarted = false

let currentResetStop = false
const exec = () => {
  const lastStartedState = alreadyStarted
  alreadyStarted = true
  const meta = {
    stop: false,
  }
  let graph
  let value
  mem: while ((value = deleteMin())) {
    const {firstIndex, stack, resetStop, type} = value
    graph = stack.node
    const local: Local = {
      skip: false,
      fail: false,
      ref: '',
      scope: graph.scope,
    }
    for (
      let stepn = firstIndex;
      stepn < graph.seq.length && !meta.stop;
      stepn++
    ) {
      const step = graph.seq[stepn]
      const data = step.data
      switch (step.type) {
        case 'barrier': {
          const id = data.barrierID
          const priority = data.priority
          if (stepn !== firstIndex || type !== priority) {
            if (!barriers.has(id)) {
              barriers.add(id)
              pushHeap(stepn, stack, priority, id)
            }
            continue mem
          }
          barriers.delete(id)
          break
        }
        case 'mov': {
          let value
          //prettier-ignore
          switch (data.from) {
            case 'stack': value = stack.value; break
            case 'a': value = stack.a; break
            case 'b': value = stack.b; break
            case 'value': value = data.store; break
            case 'store':
              value = readRef(graph.reg[data.store.id])
              break
          }
          //prettier-ignore
          switch (data.to) {
            case 'stack': stack.value = value; break
            case 'a': stack.a = value; break
            case 'b': stack.b = value; break
            case 'store':
              graph.reg[data.target.id].current = value
              break
          }
          break
        }
        case 'check':
          switch (data.type) {
            case 'defined':
              local.skip = stack.value === undefined
              break
            case 'changed':
              local.skip = stack.value === readRef(graph.reg[data.store.id])
              break
          }
          break
        case 'filter':
          /**
           * handled edge case: if step.fn will throw,
           * tryRun will return null
           * thereby forcing that branch to stop
           */
          local.skip = !tryRun(local, data, stack)
          break
        case 'run':
          /** exec 'compute' step when stepn === firstIndex */
          if (stepn !== firstIndex || type !== 'effect') {
            pushHeap(stepn, stack, 'effect')
            continue mem
          }
        case 'compute':
          stack.value = tryRun(local, data, stack)
          break
      }
      meta.stop = local.fail || local.skip
    }
    if (!meta.stop) {
      currentResetStop = true
      for (let stepn = 0; stepn < graph.next.length; stepn++) {
        pushFirstHeapItem('child', graph.next[stepn], stack, stack.value)
      }
      currentResetStop = false
    }
    if (resetStop) {
      meta.stop = false
    }
  }
  alreadyStarted = lastStartedState
}
export const launch = (unit: Graphite, payload: any, upsert?: boolean) => {
  pushFirstHeapItem('pure', getGraph(unit), null, payload)
  if (upsert && alreadyStarted) return
  exec()
}
export const upsertLaunch = (units: Graphite[], payloads: any[]) => {
  for (let i = 0; i < units.length; i++) {
    pushFirstHeapItem('pure', getGraph(units[i]), null, payloads[i])
  }
  if (alreadyStarted) return
  exec()
}

const tryRun = (local: Local, {fn}, stack: Stack) => {
  try {
    return fn(stack.value, local.scope, stack)
  } catch (err) {
    console.error(err)
    local.fail = true
  }
}
