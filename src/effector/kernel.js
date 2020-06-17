//@flow

import {Graphite, Graph} from './index.h'
import {readRef} from './stateRef'
import {getGraph, getValue} from './getter'

/** Names of priority groups */
type PriorityTag = 'child' | 'pure' | 'barrier' | 'sampler' | 'effect'

/**
 * Position in the current branch,
 * including call stack, priority type
 * and index of next step in the executed Graph
 */
type Layer = {
  idx: number,
  stack: Stack,
  type: PriorityTag,
  id: number,
}

/** Call stack */
type Stack = {
  value: any,
  a: any,
  b: any,
  parent: Stack | null,
  node: Graph,
  page: {[id: string]: any} | null,
  forkPage?: any,
}

/** Queue as linked list or skew heap */
type QueueItem = {
  /** node value */
  v: Layer,
  /** left node. always null in queue but used in skew heap */
  l: QueueItem | null,
  /** right node */
  r: QueueItem | null,
}
type QueueBucket = {
  first: QueueItem | null,
  last: QueueItem | null,
  size: number,
}

/** Dedicated local metadata */
type Local = {
  fail: boolean,
  scope: {[key: string]: any},
}

let heap: QueueItem | null = null

const merge = (a: QueueItem | null, b: QueueItem | null): QueueItem | null => {
  if (!a) return b
  if (!b) return a

  let ret
  const isSameType = a.v.type === b.v.type
  if (
    /**
     * if both nodes has the same PriorityType
     * and first node is created after second one
     */
    (isSameType && a.v.id > b.v.id) ||
    /** if first node is "sampler" and second node is "barrier" */
    (!isSameType && a.v.type === 'sampler')
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

/** queue buckets for each PriorityType */
const queue: QueueBucket[] = []
let ix = 0
while (ix < 5) {
  /**
   * although "sampler" and "barrier" are using heap instead of linked list,
   * their buckets are still useful: they maintains size of heap queue
   */
  queue.push({first: null, last: null, size: 0})
  ix += 1
}

const deleteMin = () => {
  for (let i = 0; i < 5; i++) {
    const list = queue[i]
    if (list.size > 0) {
      /**
       * second bucket is for "barrier" PriorityType (used in combine)
       * and third bucket is for "sampler" PriorityType (used in sample and guard)
       */
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
      list.first = item.r
      list.size -= 1
      return item.v
    }
  }
}
const pushFirstHeapItem = (
  type: PriorityTag,
  page: {[id: string]: any} | null,
  node: Graph,
  parent: Stack | null,
  value: any,
  forkPage: any | void,
) =>
  pushHeap(
    0,
    {
      a: null,
      b: null,
      node,
      parent,
      value,
      page,
      forkPage,
    },
    type,
  )
const pushHeap = (idx: number, stack: Stack, type: PriorityTag, id = 0) => {
  const priority = getPriority(type)
  const bucket: QueueBucket = queue[priority]
  const item: QueueItem = {
    v: {
      idx,
      stack,
      type,
      id,
    },
    l: 0,
    r: 0,
  }
  /**
   * second bucket is for "barrier" PriorityType (used in combine)
   * and third bucket is for "sampler" PriorityType (used in sample and guard)
   */
  if (priority === 2 || priority === 3) {
    heap = merge(heap, item)
  } else {
    if (bucket.size === 0) {
      bucket.first = item
    } else {
      bucket.last.r = item
    }
    bucket.last = item
  }
  bucket.size += 1
}

const getPriority = (t: PriorityTag) => {
  switch (t) {
    case 'child':
      return 0
    case 'pure':
      return 1
    case 'barrier':
      return 2
    case 'sampler':
      return 3
    case 'effect':
      return 4
    default:
      return -1
  }
}

const barriers = new Set()

let alreadyStarted = false
let currentPage = null
let forkPage
export const getCurrentPage = () => currentPage

/** main execution method */
const exec = () => {
  const lastStartedState = {alreadyStarted, currentPage, forkPage}
  alreadyStarted = true
  let stop
  let skip
  let graph
  let value
  let page
  let reg
  mem: while ((value = deleteMin())) {
    const {idx, stack, type} = value
    graph = stack.node
    currentPage = page = stack.page
    forkPage = stack.forkPage
    reg = (page ? page : graph).reg
    const local: Local = {
      fail: false,
      scope: graph.scope,
    }
    stop = skip = false
    for (let stepn = idx; stepn < graph.seq.length && !stop; stepn++) {
      const step = graph.seq[stepn]
      const data = step.data
      switch (step.type) {
        case 'barrier': {
          let id = data.barrierID
          if (page) {
            id = `${page.fullID}_${id}`
          }
          const priority = data.priority
          if (stepn !== idx || type !== priority) {
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
            case 'stack': value = getValue(stack); break
            case 'a': value = stack.a; break
            case 'b': value = stack.b; break
            case 'value': value = data.store; break
            case 'store':
              if (!reg[data.store.id]) {
                // if (!page.parent) {
                stack.page = page = null
                reg = graph.reg
                // }
              }
              value = readRef(reg[data.store.id])
              break
          }
          //prettier-ignore
          switch (data.to) {
            case 'stack': stack.value = value; break
            case 'a': stack.a = value; break
            case 'b': stack.b = value; break
            case 'store':
              reg[data.target.id].current = value
              break
          }
          break
        }
        case 'check':
          switch (data.type) {
            case 'defined':
              skip = getValue(stack) === undefined
              break
            case 'changed':
              skip = getValue(stack) === readRef(reg[data.store.id])
              break
          }
          break
        case 'filter':
          /**
           * handled edge case: if step.fn will throw,
           * tryRun will return null
           * thereby forcing that branch to stop
           */
          skip = !tryRun(local, data, stack)
          break
        case 'run':
          /** exec 'compute' step when stepn === idx */
          if (stepn !== idx || type !== 'effect') {
            pushHeap(stepn, stack, 'effect')
            continue mem
          }
        case 'compute':
          stack.value = tryRun(local, data, stack)
          break
      }
      stop = local.fail || skip
    }
    if (!stop) {
      for (let stepn = 0; stepn < graph.next.length; stepn++) {
        pushFirstHeapItem(
          'child',
          page,
          graph.next[stepn],
          stack,
          getValue(stack),
          stack.forkPage,
        )
      }
    }
  }
  alreadyStarted = lastStartedState.alreadyStarted
  currentPage = lastStartedState.currentPage
  forkPage = lastStartedState.forkPage
}
export const launch = (unit: Graphite, payload: any, upsert?: boolean) => {
  let page = currentPage
  let stack = null
  let forkedPage = forkPage
  if (unit.target) {
    payload = unit.params
    upsert = unit.defer
    page = 'page' in unit ? unit.page : page
    if (unit.stack) stack = unit.stack
    forkedPage = unit.forkPage || forkedPage
    unit = unit.target
  }
  if (Array.isArray(unit)) {
    for (let i = 0; i < unit.length; i++) {
      pushFirstHeapItem(
        'pure',
        page,
        getGraph(unit[i]),
        stack,
        payload[i],
        forkedPage,
      )
    }
  } else {
    pushFirstHeapItem('pure', page, getGraph(unit), stack, payload, forkedPage)
  }
  if (upsert && alreadyStarted) return
  exec()
}

/** try catch for external functions */
const tryRun = (local: Local, {fn}, stack: Stack) => {
  try {
    return fn(getValue(stack), local.scope, stack)
  } catch (err) {
    console.error(err)
    local.fail = true
  }
}
