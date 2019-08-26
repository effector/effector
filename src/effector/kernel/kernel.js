//@flow

import type {
  Graphite,
  StateRef,
  Run,
  Update,
  Filter,
  Compute,
  Barrier,
  Tap,
} from '../stdlib'
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
const runGraph = ({step: graph, firstIndex, stack, resetStop}: Layer, meta) => {
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
            stack,
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
              stack,
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
    cmd(local, step.data, stack.value)
    meta.stop = local.isFailed || !local.isChanged
  }
  if (!meta.stop) {
    for (let stepn = 0; stepn < graph.next.length; stepn++) {
      /**
       * copy head of scope stack to feel free
       * to override it during seq execution
       */
      const subscope = new Stack(readRef(stack.value), stack)
      pushHeap({
        step: graph.next[stepn],
        firstIndex: 0,
        stack: subscope,
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
  while (heap) {
    value = heap.value
    heap = deleteMin(heap)
    runGraph(value, meta)
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
const command = {
  barrier(local, step: $PropertyType<Barrier, 'data'>, val: StateRef) {
    local.isFailed = false
    local.isChanged = true
  },
  filter(local, step: $PropertyType<Filter, 'data'>, val: StateRef) {
    /**
     * handled edge case: if step.fn will throw,
     * tryRun will return null
     * thereby forcing that branch to stop
     */
    local.isChanged = !!tryRun(local, step, val)
  },
  run(local, step: $PropertyType<Run, 'data'>, val: StateRef) {
    writeRef(val, tryRun(local, step, val))
  },
  update(local, step: $PropertyType<Update, 'data'>, val: StateRef) {
    writeRef(step.store, readRef(val))
  },
  compute(local, step: $PropertyType<Compute, 'data'>, val: StateRef) {
    writeRef(val, tryRun(local, step, val))
  },
  tap(local, step: $PropertyType<Tap, 'data'>, val: StateRef) {
    tryRun(local, step, val)
  },
}
const tryRun = (local: Local, {fn}, val: StateRef) => {
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
