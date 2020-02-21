import {createEvent, launch, Store, Event, is, createNode, step} from 'effector'
import {own} from './own'
import {beginMark, endMark} from './render/mark'
import {TASK_DEADLINE} from './env'
import {now} from './render/platform/now'

export type Priority = 'low' | 'high'
type Time = number
type QueuedItem<T> = {
  inserted: Time
  retry: number
  value: T
}

const executeTasks = createEvent()
let bonusTime = false
let isBatched = false
let rafID: number | NodeJS.Timeout
function batchRAFrs() {
  isBatched = false
  beginMark('batchRAF')
  executeTasks()
  endMark('batchRAF')
}
const raf =
  typeof requestAnimationFrame !== 'undefined'
    ? requestAnimationFrame
    : (cb: Function) => setTimeout(cb, 0)
//@ts-ignore
const cancelRaf: (id: number | NodeJS.Timeout) => void =
  typeof cancelAnimationFrame !== 'undefined'
    ? cancelAnimationFrame
    : clearTimeout
const batchWindow = () => {
  if (isBatched) return
  isBatched = true
  rafID = raf(batchRAFrs)
}

const targets = new Map<number, Store<any> | Event<any>>()
const importantTasks = new Map<number, any>()
const tasks = new Map<number, any>()
const priorities = new Map<number, Priority>()

let nextTaskID = 0
let startTime = 0

const executionEndMark = createNode({
  node: [
    step.run({fn: () => {}}),
    step.filter({
      fn() {
        if (importantTasks.size === 0 && tasks.size === 0) return false
        if (now() - startTime >= TASK_DEADLINE) return false
        cancelRaf(rafID)
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
    startTime = now()
  }
  bonusTime = false
  beginMark('plan')
  for (const [id, data] of importantTasks) {
    if (now() - startTime >= TASK_DEADLINE) {
      batchWindow()
      interrupted = true
      break
    }
    importantTasks.delete(id)
    launch({
      target: targets.get(id)!,
      params: data,
      defer: true,
    })
  }
  if (!interrupted) {
    for (const [id, data] of tasks) {
      if (now() - startTime >= TASK_DEADLINE) {
        batchWindow()
        interrupted = true
        break
      }
      tasks.delete(id)
      launch({
        target: targets.get(id)!,
        params: data,
        defer: true,
      })
    }
  }
  launch({
    target: executionEndMark,
    params: null,
    defer: true,
  })
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

const pushSingleValue = step.compute({
  fn(value, {taskID}) {
    const taskList = priorities.get(taskID) === 'high' ? importantTasks : tasks
    let list: any[] = taskList.get(taskID)
    if (!list) {
      list = []
      taskList.set(taskID, list)
    }
    for (let i = 0; i < value.length; i++) {
      list.push(value[i])
    }
    batchWindow()
  },
})
const runBatchFn = step.run({
  fn(values, {fn}) {
    return fn(values, startTime)
  },
})

function backpressureEvent<T, S>(
  trigger: Event<T[]> | Store<T[]>,
  fn: (
    values: T[],
    start: number,
  ) => {
    done: S[]
    fail: T[]
  },
  priority: Priority,
): Event<S[]> {
  const taskID = ++nextTaskID
  const result = createEvent<S[]>()
  const unit = is.store(trigger) ? trigger.updates : trigger
  const family = {
    type: 'crosslink',
    owners: [unit, result],
  }
  createNode({
    node: [pushSingleValue],
    //@ts-ignore
    parent: [unit],
    scope: {taskID},
    //@ts-ignore
    family,
  })

  own(trigger, [result])
  targets.set(
    taskID,
    createNode({
      node: [runBatchFn],
      child: [
        createNode({
          node: [unwrapFail, dropEmptyList, pushSingleValue],
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
} {
  const prepared = trigger.map(value => [
    {
      inserted: now(),
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
        const timeNow = now()
        if (item.inserted + batchWindow > timeNow) {
          batched.push(item)
          continue
        }
        if (item.inserted + timeout < timeNow) continue
        if (timeNow - start >= TASK_DEADLINE) {
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
    priority,
  )
  return {
    trigger,
    processed,
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
    const inserted = now()
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
        const timeNow = now()
        if (item.inserted + batchWindow > timeNow) {
          batched.push(item)
          continue
        }
        if (item.inserted + timeout < timeNow) continue
        if (timeNow - start >= TASK_DEADLINE) {
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
    priority,
  )
  return {
    trigger,
    processed,
  }
}
