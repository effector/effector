//@flow

import type {Graphite, Graph} from '../stdlib'
import type {PriorityTag} from './getPriority'
import {getGraph, writeRef, readRef} from '../stdlib'
import type {Layer} from './layer'
import {type leftist, insert, deleteMin} from './leftist'
import {Stack} from './stack'

/**
 * Dedicated local metadata
 */
class Local {
  /*::
  isChanged: boolean
  isFailed: boolean
  scope: {[key: string]: any, ...}
  */
  constructor(scope: {[key: string]: any, ...}) {
    this.isChanged = true
    this.isFailed = false
    this.scope = scope
  }
}

let layerID = 0
let heap: leftist = null
const barriers = new Set()
const pushHeap = (firstIndex: number, stack: Stack, type: PriorityTag) => {
  heap = insert(
    {
      firstIndex,
      stack,
      resetStop: currentResetStop,
      type,
      id: ++layerID,
    },
    heap,
  )
}

let alreadyStarted = false

let currentResetStop = false

const getData = ({data}) => data

const exec = () => {
  const lastStartedState = alreadyStarted
  alreadyStarted = true
  const meta = {
    stop: false,
  }
  let graph
  let value
  mem: while (heap) {
    value = heap.value
    heap = deleteMin(heap)
    const {firstIndex, stack, resetStop, type} = value
    graph = stack.node
    const local = new Local(graph.scope)
    for (
      let stepn = firstIndex;
      stepn < graph.seq.length && !meta.stop;
      stepn++
    ) {
      const step = graph.seq[stepn]
      switch (step.type) {
        case 'stack':
          pushHeap(0, new Stack(stack, stack, getData(step).to), 'pure')
          break
        case 'batch': {
          const blocks = readRef(stack.value)
          const ctx = readRef(stack.parent.value)
          for (let i = 0; i < blocks.length; i++) {
            pushHeap(
              0,
              new Stack(ctx, stack.parent, getData(step).blocks[blocks[i]]),
              'pure',
            )
          }
          break
        }
        case 'barrier': {
          const id = getData(step).barrierID
          const priority = getData(step).priority
          if (stepn !== firstIndex || type !== priority) {
            if (!barriers.has(id)) {
              barriers.add(id)
              pushHeap(stepn, stack, priority)
            }
            continue mem
          }
          barriers.delete(id)
          local.isFailed = false
          local.isChanged = true
          break
        }
        case 'check':
          switch (getData(step).type) {
            case 'defined':
              local.isChanged = readRef(stack.value) !== undefined
              break
            case 'changed':
              local.isChanged =
                readRef(getData(step).store) !== readRef(stack.value)
              break
          }
          break
        case 'filter':
          /**
           * handled edge case: if step.fn will throw,
           * tryRun will return null
           * thereby forcing that branch to stop
           */
          local.isChanged = !!tryRun(local, getData(step), stack.value)
          break
        case 'run':
          /** exec 'compute' step when stepn === firstIndex */
          if (stepn !== firstIndex || type !== 'effect') {
            pushHeap(stepn, stack, 'effect')
            continue mem
          }
        case 'compute':
          writeRef(stack.value, tryRun(local, getData(step), stack.value))
          break
        case 'update':
          writeRef(getData(step).store, readRef(stack.value))
          break
        case 'tap':
          tryRun(local, getData(step), stack.value)
          break
      }
      meta.stop = local.isFailed || !local.isChanged
    }
    if (!meta.stop) {
      currentResetStop = true
      for (let stepn = 0; stepn < graph.next.length; stepn++) {
        pushHeap(
          0,
          new Stack(readRef(stack.value), stack, graph.next[stepn]),
          'child',
        )
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
  pushHeap(0, new Stack(payload, null, getGraph(unit)), 'pure')
  if (upsert && alreadyStarted) return
  exec()
}
export const upsertLaunch = (units: Graphite[], payloads: any[]) => {
  for (let i = 0; i < units.length; i++) {
    pushHeap(0, new Stack(payloads[i], null, getGraph(units[i])), 'pure')
  }
  if (alreadyStarted) return
  exec()
}

const tryRun = (local: Local, {fn}, val: {current: any, ...}) => {
  let result = null
  let isFailed = false
  try {
    result = fn(readRef(val), local.scope)
  } catch (err) {
    console.error(err)
    isFailed = true
  }
  local.isFailed = isFailed
  return result
}
