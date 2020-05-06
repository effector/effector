import {TASK_DEADLINE} from './platform/env'
import {now} from './platform/now'
import {beginMark, endMark} from './platform/mark'
import {raf} from './platform/raf'
import {Op, OpPriorityQueue, OpGroup, AsyncValue} from './index.h'

type Linkable = {
  cursor: {
    prev: Linkable | null
    next: Linkable | null
  }
}

function addItemToQueue(
  queue: {first: Linkable | null; last: Linkable | null},
  item: Linkable,
) {
  if (queue.last) {
    item.cursor.prev = queue.last
    queue.last.cursor.next = item
    queue.last = item
  } else {
    queue.first = queue.last = item
  }
}

function removeItemFromQueue(
  queue: {first: Linkable | null; last: Linkable | null},
  item: Linkable,
) {
  if (item.cursor.prev) {
    item.cursor.prev.cursor.next = item.cursor.next
  }
  if (item.cursor.next) {
    item.cursor.next.cursor.prev = item.cursor.prev
  }
  if (queue.last === item) {
    queue.last = item.cursor.prev
  }
  if (queue.first === item) {
    queue.first = item.cursor.next
  }
  item.cursor.prev = null
  item.cursor.next = null
}

//prettier-ignore
function removeOpGroupFromQueue(
  group: OpGroup,
  priority: 'props' | 'tree' | 'data'
) {
  if (group.cursor[priority].prev) {
    group.cursor[priority].prev!.cursor[priority].next = group.cursor[priority].next
  }
  if (group.cursor[priority].next) {
    group.cursor[priority].next!.cursor[priority].prev = group.cursor[priority].prev
  }
  if (group.queue[priority].last === group) {
    group.queue[priority].last = group.cursor[priority].prev
  }
  if (group.queue[priority].first === group) {
    group.queue[priority].first = group.cursor[priority].next
  }
  group.cursor[priority].prev = null
  group.cursor[priority].next = null
}

function removeOpFromQueue(op: Op) {
  op.status = 'active'
  removeItemFromQueue(getOpQueue(op), op)
}

function addOpGroupToQueue(
  group: OpGroup,
  priority: 'props' | 'tree' | 'data',
) {
  if (group.queue[priority].last) {
    group.cursor[priority].prev = group.queue[priority].last
    group.queue[priority].last!.cursor[priority].next = group
    group.queue[priority].last = group
  } else {
    group.queue[priority].first = group.queue[priority].last = group
  }
}

function getOpQueue(op: Op) {
  return op.group.activeChilds[op.priority]
}

export function forceSetOpValue(value: any, op: Op) {
  op.value.active = op.value.pending = value
  if (op.status === 'active') return
  removeOpFromQueue(op)
}

export function pushOpToQueue(value: any, op: Op) {
  if (op.value.active === value) {
    op.value.pending = value
    if (op.status === 'pending') {
      removeOpFromQueue(op)
      if (!getOpQueue(op).first) {
        removeOpGroupFromQueue(op.group, op.priority)
      }
    }
    return
  }
  if (op.status === 'active') {
    op.status = 'pending'
    if (!getOpQueue(op).first) {
      addOpGroupToQueue(op.group, op.priority)
    }
    addItemToQueue(getOpQueue(op), op)
  }
  op.value.pending = value
  if (!op.group.queue.rafID) {
    op.group.queue.rafID = raf(op.group.queue.execQueue)
  }
}

function execQueue(queue: OpPriorityQueue) {
  beginMark('execQueue')
  const start = now()
  let interrupted = false
  let group: OpGroup | null
  let op: Op | null

  quant: {
    while (queue.props.first || queue.tree.first || queue.data.first) {
      if (now() - start >= TASK_DEADLINE) {
        interrupted = true
        break quant
      }
      const hasPropsTasks = !!queue.props.first
      if (hasPropsTasks) beginMark('props')

      while ((group = queue.props.first)) {
        while ((op = group.activeChilds.props.first)) {
          if (now() - start >= TASK_DEADLINE) {
            interrupted = true
            endMark('props')
            break quant
          }
          op.runOp(op.value.pending)
          op.value.active = op.value.pending
          removeOpFromQueue(op)
        }
        removeOpGroupFromQueue(group, 'props')
      }
      if (hasPropsTasks) endMark('props')

      const hasTreeTasks = !!queue.tree.first
      if (hasTreeTasks) beginMark('tree')

      while ((group = queue.tree.first)) {
        while ((op = group.activeChilds.tree.first)) {
          if (now() - start >= TASK_DEADLINE) {
            interrupted = true
            endMark('tree')
            break quant
          }
          op.runOp(op.value.pending)
          op.value.active = op.value.pending
          removeOpFromQueue(op)
        }
        removeOpGroupFromQueue(group, 'tree')
      }
      if (hasTreeTasks) endMark('tree')

      const hasDataTasks = !!queue.data.first
      if (hasDataTasks) beginMark('data')

      while ((group = queue.data.first)) {
        while ((op = group.activeChilds.data.first)) {
          if (now() - start >= TASK_DEADLINE) {
            interrupted = true
            endMark('data')
            break quant
          }
          op.runOp(op.value.pending)
          op.value.active = op.value.pending
          removeOpFromQueue(op)
        }
        removeOpGroupFromQueue(group, 'data')
      }
      if (hasDataTasks) endMark('data')
    }
  }
  endMark('execQueue')
  if (interrupted) {
    queue.rafID = raf(queue.execQueue)
  } else {
    queue.rafID = null
    if (queue.onDrain) {
      const rs = queue.onDrain
      queue.onDrain = null
      rs()
    }
  }
}

export function createOp({
  value,
  runOp,
  group,
  priority,
}: {
  value: any
  runOp: (value: any) => void
  group: OpGroup
  priority: 'props' | 'tree' | 'data'
}): Op {
  return {
    value: {
      active: value,
      pending: value,
    },
    runOp,
    status: 'active',
    priority,
    group,
    cursor: {
      prev: null,
      next: null,
    },
  }
}

export function createOpQueue({
  onComplete,
}: {
  onComplete?: () => void
}): OpPriorityQueue {
  const queue: OpPriorityQueue = {
    props: {
      first: null,
      last: null,
    },
    tree: {
      first: null,
      last: null,
    },
    data: {
      first: null,
      last: null,
    },
    rafID: null,
    execQueue() {},
    onDrain: onComplete,
  }
  queue.execQueue = execQueue.bind(null, queue)
  return queue
}

export function createOpGroup(queue: OpPriorityQueue): OpGroup {
  return {
    ops: [],
    queue,
    activeChilds: {
      props: {
        first: null,
        last: null,
      },
      tree: {
        first: null,
        last: null,
      },
      data: {
        first: null,
        last: null,
      },
    },
    cursor: {
      props: {
        prev: null,
        next: null,
      },
      tree: {
        prev: null,
        next: null,
      },
      data: {
        prev: null,
        next: null,
      },
    },
  }
}

export function createAsyncValue({
  value,
  group,
  onInit,
  onChange,
  onTerminate,
}: {
  value: any
  group: OpGroup
  onInit: (value: any) => void
  onChange: (value: any) => void
  onTerminate: (wasActive: boolean) => void
}): AsyncValue {
  const change = createOp({
    value,
    group,
    runOp(value) {
      item.status = 'A'
      onChange(value)
    },
    priority: 'data',
  })
  const item: AsyncValue = {
    status: 'IA',
    value: change.value,
    hooks: {
      onTerminate,
    },
    ops: {
      init: createOp({
        value: false,
        group,
        runOp(value) {
          item.status = 'A'
          onInit(item.value.active)
        },
        priority: 'data',
      }),
      change,
      terminate: createOp({
        value: false,
        group,
        runOp(value) {
          item.status = 'T'
          item.hooks.onTerminate(true)
        },
        priority: 'data',
      }),
    },
  }
  pushOpToQueue(true, item.ops.init)
  return item
}

export function stopAsyncValue(item: AsyncValue) {
  switch (item.status) {
    case 'I':
    case 'T':
    case 'AT':
      return
    case 'A':
      item.status = 'AT'
      pushOpToQueue(true, item.ops.terminate)
      break
    case 'AA':
      item.status = 'AT'
      pushOpToQueue(true, item.ops.terminate)
      pushOpToQueue(item.value.active, item.ops.change)
      break
    case 'IA':
      item.status = 'T'
      pushOpToQueue(false, item.ops.init)
      item.hooks.onTerminate(false)
      break
  }
}

export function updateAsyncValue(value: any, item: AsyncValue) {
  switch (item.status) {
    case 'I':
    case 'T':
      return
    case 'A':
      if (item.value.active !== value) {
        item.status = 'AA'
        pushOpToQueue(value, item.ops.change)
      }
      break
    case 'AA':
      if (item.value.active === value) {
        item.status = 'A'
        pushOpToQueue(value, item.ops.change)
      } else if (item.value.pending !== value) {
        item.value.pending = value
      }
      break
    case 'IA':
      item.value.active = item.value.pending = value
      break
    case 'AT':
      // item.status = item.value.active === value ? 'A' : 'AA'
      // pushOpToQueue(value, item.ops.change)
      // pushOpToQueue(false, item.ops.terminate)
      break
  }
}
