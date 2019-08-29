//@flow

import type {Graphite} from '../stdlib'
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
const pushHeap = (opts: Layer) => {
  heap = insert(opts, heap)
}

let alreadyStarted = false

const addSingleBranch = (unit: Graphite, payload: any) => {
  pushHeap({
    step: getGraph(unit),
    firstIndex: 0,
    stack: new Stack(payload, null),
    resetStop: false,
    type: 'pure',
    id: ++layerID,
  })
}

const exec = () => {
  const lastStartedState = alreadyStarted
  alreadyStarted = true
  const meta = {
    stop: false,
  }
  let value
  mem: while (heap) {
    value = heap.value
    heap = deleteMin(heap)
    const {step: graph, firstIndex, stack, resetStop, type} = value
    const local = new Local(graph.scope)
    for (
      let stepn = firstIndex;
      stepn < graph.seq.length && !meta.stop;
      stepn++
    ) {
      const step = graph.seq[stepn]
      switch (step.type) {
        case 'barrier': {
          const id = step.data.barrierID
          const priority = step.data.priority
          if (stepn !== firstIndex || type !== priority) {
            if (!barriers.has(id)) {
              barriers.add(id)
              pushHeap({
                step: graph,
                firstIndex: stepn,
                stack,
                resetStop: false,
                type: priority,
                id: ++layerID,
              })
            }
            continue mem
          }
          barriers.delete(id)
          local.isFailed = false
          local.isChanged = true
          break
        }
        case 'check':
          switch (step.data.type) {
            case 'defined':
              local.isChanged = readRef(stack.value) !== undefined
              break
            case 'changed':
              local.isChanged =
                readRef(step.data.store) !== readRef(stack.value)
              break
          }
          break
        case 'filter':
          /**
           * handled edge case: if step.fn will throw,
           * tryRun will return null
           * thereby forcing that branch to stop
           */
          local.isChanged = !!tryRun(local, step.data, stack.value)
          break
        case 'run':
          /** exec 'compute' step when stepn === firstIndex */
          if (stepn !== firstIndex || type !== 'effect') {
            pushHeap({
              step: graph,
              firstIndex: stepn,
              stack,
              resetStop: false,
              type: 'effect',
              id: ++layerID,
            })
            continue mem
          }
        case 'compute':
          writeRef(stack.value, tryRun(local, step.data, stack.value))
          break
        case 'update':
          writeRef(step.data.store, readRef(stack.value))
          break
        case 'tap':
          tryRun(local, step.data, stack.value)
          break
      }
      meta.stop = local.isFailed || !local.isChanged
    }
    if (!meta.stop) {
      for (let stepn = 0; stepn < graph.next.length; stepn++) {
        pushHeap({
          step: graph.next[stepn],
          firstIndex: 0,
          stack: new Stack(readRef(stack.value), stack),
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
  alreadyStarted = lastStartedState
}
export const launch = (unit: Graphite, payload: any) => {
  addSingleBranch(unit, payload)
  exec()
}
export const upsertLaunch = (unit: Graphite, payload: any) => {
  addSingleBranch(unit, payload)
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
