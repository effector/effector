//@flow

import type {Graphite, Graph, ID} from '../stdlib'
import {type PriorityTag, getPriority} from './getPriority'
import {getGraph, readRef} from '../stdlib'
import type {Layer} from './layer'
import {Stack} from './stack'

/**
 * Dedicated local metadata
 */
class Local {
  /*::
  isChanged: boolean
  isFailed: boolean
  ref: ID
  scope: {[key: string]: any, ...}
  */
  constructor(scope: {[key: string]: any, ...}) {
    this.isChanged = true
    this.isFailed = false
    this.ref = ''
    this.scope = scope
  }
}
const pushValueToList = (list, value) => {
  const item = {
    right: null,
    value,
  }
  if (list.size === 0) {
    list.first = item
  } else {
    list.last.right = item
  }
  list.size += 1
  list.last = item
}
const popMinFromList = list => {
  if (list.size === 0) return
  if (list.size === 1) {
    list.last = null
  }
  const item = list.first
  list.first = item.right
  list.size -= 1
  return item.value
}

const queue = []
let ix = 0
while (ix < 5) {
  queue.push({first: null, last: null, size: 0})
  ix += 1
}

let layerID = 0
const barriers = new Set()
const deleteMin = () => {
  for (let i = 0; i < 5; i++) {
    if (queue[i].size > 0) return popMinFromList(queue[i])
  }
}
const pushHeap = (firstIndex: number, stack: Stack, type: PriorityTag) => {
  pushValueToList(queue[getPriority(type)], {
    firstIndex,
    stack,
    resetStop: currentResetStop,
    type,
    id: ++layerID,
  })
}

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
    const local = new Local(graph.scope)
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
              pushHeap(stepn, stack, priority)
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
              local.isChanged = stack.value !== undefined
              break
            case 'changed':
              local.isChanged =
                stack.value !== readRef(graph.reg[data.store.id])
              break
          }
          break
        case 'filter':
          /**
           * handled edge case: if step.fn will throw,
           * tryRun will return null
           * thereby forcing that branch to stop
           */
          local.isChanged = !!tryRun(local, data, stack)
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
      meta.stop = local.isFailed || !local.isChanged
    }
    if (!meta.stop) {
      currentResetStop = true
      for (let stepn = 0; stepn < graph.next.length; stepn++) {
        pushHeap(0, new Stack(graph.next[stepn], stack, stack.value), 'child')
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
  pushHeap(0, new Stack(getGraph(unit), null, payload), 'pure')
  if (upsert && alreadyStarted) return
  exec()
}
export const upsertLaunch = (units: Graphite[], payloads: any[]) => {
  for (let i = 0; i < units.length; i++) {
    pushHeap(0, new Stack(getGraph(units[i]), null, payloads[i]), 'pure')
  }
  if (alreadyStarted) return
  exec()
}

const tryRun = (local: Local, {fn}, stack: Stack) => {
  try {
    return fn(stack.value, local.scope, stack)
  } catch (err) {
    console.error(err)
    local.isFailed = true
  }
}
