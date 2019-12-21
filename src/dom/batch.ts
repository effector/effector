import {createEvent, launch, Store, Event, is, createNode, step} from 'effector'
import {own} from './own'
import {beginMark, endMark} from './render/mark'
import {TASK_DEADLINE} from './env'

export type Priority = 'low' | 'high'

const runner =
  typeof queueMicrotask !== 'undefined'
    ? queueMicrotask
    : function runner(cb) {
        cb()
      }
const executeTasks = createEvent()
let bonusTime = false
let isBatched = false
let rafID
function batchRAFrs() {
  isBatched = false
  beginMark('batchRAF')
  executeTasks()
  endMark('batchRAF')
}

const batchWindow = () => {
  if (isBatched) return
  isBatched = true
  rafID = requestAnimationFrame(batchRAFrs)
}

const targets = new Map<number, Store<any> | Event<any>>()
const importantTasks = new Map<number, any>()
const tasks = new Map<number, any>()
const priorities = new Map<number, Priority>()

let nextTaskID = 0
let startTime = 0
function getTaskList(taskID: number) {
  return priorities.get(taskID) === 'high' ? importantTasks : tasks
}
function watchBatchEvent(taskID: number, isList: boolean, value) {
  const taskList = getTaskList(taskID)
  let list: any[] = taskList.get(taskID)
  if (!list) {
    list = []
    taskList.set(taskID, list)
  }
  if (isList) {
    for (let i = 0; i < value.length; i++) {
      list.push(value[i])
    }
  } else {
    list.push(value)
  }
  batchWindow()
}
export function batchEvent<T>(trigger: Event<T> | Store<T>): Event<T[]> {
  const taskID = ++nextTaskID
  const result = createEvent<T[]>()
  const unit = is.store(trigger) ? trigger.updates : trigger
  unit.watch(watchBatchEvent.bind(null, taskID, false))
  own(trigger, [result])
  targets.set(taskID, result)
  priorities.set(taskID, 'low')
  return result
}
const executionEndMark = createNode({
  node: [
    step.run({fn: () => {}}),
    step.filter({
      fn() {
        if (importantTasks.size === 0 && tasks.size === 0) return false
        if (performance.now() - startTime >= TASK_DEADLINE) return false
        cancelAnimationFrame(rafID)
        bonusTime = true
        isBatched = false
        return true
      },
    }),
  ],
  child: [executeTasks],
})
executeTasks.watch(() => {
  if (isBatched) return
  if (importantTasks.size === 0 && tasks.size === 0) {
    bonusTime = false
    return
  }
  let interrupted = false
  if (!bonusTime) {
    startTime = performance.now()
  }
  bonusTime = false
  beginMark('plan')
  for (const [id, data] of importantTasks) {
    if (performance.now() - startTime >= TASK_DEADLINE) {
      batchWindow()
      interrupted = true
      break
    }
    importantTasks.delete(id)
    const unit = targets.get(id)
    //@ts-ignore
    launch(unit, data, true)
  }
  if (!interrupted) {
    for (const [id, data] of tasks) {
      if (performance.now() - startTime >= TASK_DEADLINE) {
        batchWindow()
        interrupted = true
        break
      }
      tasks.delete(id)
      const unit = targets.get(id)
      //@ts-ignore
      launch(unit, data, true)
    }
  }
  //@ts-ignore
  launch(executionEndMark, null, true)

  endMark('plan')
})
const unwrapDone = step.compute({
  fn: ({done}) => done,
})
const unwrapFail = step.compute({
  fn: ({fail}) => fail,
})
const dropEmptyList = step.filter({
  fn: list => list.length > 0,
})
const pushBatchList = step.compute({
  fn(values, {taskID}) {
    watchBatchEvent(taskID, true, values)
  },
})
const pushSingleValue = step.compute({
  fn(value, {taskID, flat}) {
    watchBatchEvent(taskID, flat, value)
  },
})
const runBatchFn = step.run({
  fn(values, {fn}) {
    return fn(values, startTime)
  },
})

//@ts-ignore
export function backpressureEvent<T, S>(
  trigger: Event<T> | Store<T>,
  fn: (
    values: T[],
    start: number,
  ) => {
    done: S[]
    fail: T[]
  },
): Event<S[]>
export function backpressureEvent<T, S>(
  trigger: Event<T[]> | Store<T[]>,
  fn: (
    values: T[],
    start: number,
  ) => {
    done: S[]
    fail: T[]
  },
  flat: boolean,
  priority: Priority,
): Event<S[]>
export function backpressureEvent(
  trigger,
  fn,
  flat: boolean = false,
  priority: Priority = 'low',
) {
  const taskID = ++nextTaskID
  const result = createEvent()
  const unit = eventify(trigger)
  const family = {
    type: 'crosslink',
    owners: [unit, result],
  }
  createNode({
    node: [pushSingleValue],
    //@ts-ignore
    parent: [unit],
    scope: {taskID, flat},
    family,
  })

  own(trigger, [result])
  targets.set(
    taskID,
    createNode({
      node: [runBatchFn],
      child: [
        createNode({
          node: [unwrapFail, dropEmptyList, pushBatchList],
          scope: {taskID},
          //@ts-ignore
          family,
        }),
        createNode({
          node: [unwrapDone, dropEmptyList],
          child: [result],
          //@ts-ignore
          family,
        }),
      ],
      scope: {fn},
      //@ts-ignore
      family,
    }),
  )

  priorities.set(taskID, priority)
  return result
}
const toArray = step.compute({
  fn: e => [e],
})
type Time = number
type QueuedItem<T> = {
  inserted: Time
  retry: number
  value: T
}
export function dynamicQueueFlat<T, R = null>({
  trigger = createEvent(),
  fn,
  priority = 'low',
  timeout = Infinity,
  batchWindow = 0,
  retries = Infinity,
  mark = trigger.shortName,
}: {
  trigger?: Event<T>
  fn: ((item: T) => R | undefined) | ((item: T) => void)
  priority?: Priority
  timeout?: number
  batchWindow?: number
  retries?: number
  mark?: string
}): {
  trigger: Event<T>
  processed: Event<R[]>
  connect: (source: Event<T> | Store<T>) => void
} {
  const prepared = trigger.map(value => [
    {
      inserted: performance.now(),
      retry: 0,
      value,
    } as QueuedItem<T>,
  ])
  const processed = backpressureEvent(
    prepared,
    (list, start) => {
      let interrupted = false
      let i
      const done = [] as R[]
      const batched = [] as Array<QueuedItem<T>>
      beginMark(mark)
      for (i = 0; i < list.length; i++) {
        const item = list[i]
        const now = performance.now()
        if (item.inserted + batchWindow > now) {
          batched.push(item)
          continue
        }
        if (item.inserted + timeout < now) continue
        if (now - start >= TASK_DEADLINE) {
          interrupted = true
          break
        }
        const result = fn(item.value)
        if (result === undefined) continue
        //@ts-ignore
        done.push(result)
      }
      if (interrupted) {
        for (let j = i; j < list.length; j++) {
          const item = list[j]
          item.retry += 1
          if (item.retry >= retries) continue
          batched.push(item)
        }
      }
      endMark(mark)
      return {done, fail: batched}
    },
    true,
    priority,
  )
  const connect = (source: Store<T> | Event<T>) => {
    createNode({
      node: [],
      //@ts-ignore
      parent: source,
      //@ts-ignore
      child: trigger,
      //@ts-ignore
      family: {
        type: 'crosslink',
        owners: [source, trigger],
      },
    })
  }
  return {
    trigger,
    processed,
    connect,
  }
}
export function dynamicQueue<T, S, R>({
  trigger = createEvent(),
  fn,
  priority = 'low',
  timeout = Infinity,
  batchWindow = 0,
  retries = Infinity,
  mark = trigger.shortName,
  flatten,
}: {
  trigger?: Event<T[]>
  fn: (item: S) => R | undefined
  priority?: Priority
  timeout?: number
  batchWindow?: number
  retries?: number
  mark?: string
  flatten: (item: T) => S[]
}) {
  const prepared = trigger.map(items => {
    const result = [] as Array<QueuedItem<S>>
    const inserted = performance.now()
    for (let i = 0; i < items.length; i++) {
      const block = flatten(items[i])
      for (let j = 0; j < block.length; j++) {
        result.push({
          inserted,
          retry: 0,
          value: block[j],
        })
      }
    }
    return result
  })
  const processed = backpressureEvent(
    prepared,
    (list, start) => {
      let interrupted = false
      let i
      const done = [] as R[]
      const batched = [] as Array<QueuedItem<S>>
      beginMark(mark)
      for (i = 0; i < list.length; i++) {
        const item = list[i]
        const now = performance.now()
        if (item.inserted + batchWindow > now) {
          batched.push(item)
          continue
        }
        if (item.inserted + timeout < now) continue
        if (now - start >= TASK_DEADLINE) {
          interrupted = true
          break
        }
        const result = fn(item.value)
        if (result === undefined) continue
        done.push(result)
      }
      if (interrupted) {
        for (let j = i; j < list.length; j++) {
          const item = list[j]
          item.retry += 1
          if (item.retry >= retries) continue
          batched.push(item)
        }
      }
      endMark(mark)
      return {done, fail: batched}
    },
    true,
    priority,
  )
  const connect = (source: Store<T> | Event<T>) => {
    createNode({
      node: [toArray],
      //@ts-ignore
      parent: source,
      //@ts-ignore
      child: trigger,
      //@ts-ignore
      family: {
        type: 'crosslink',
        owners: [source, trigger],
      },
    })
  }
  return {
    trigger,
    processed,
    connect,
  }
}

function eventify<T>(source: Store<T> | Event<T>): Event<T> {
  return is.store(source) ? source.updates : source
}
