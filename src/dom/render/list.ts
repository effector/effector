import {
  Store,
  createStore,
  createEvent,
  is,
  launch,
  sample,
  clearNode,
} from 'effector'
import {Signal, DOMElement, Stack, ListItemType} from './index.h'
import {own} from '../own'
import {beginMark, endMark} from './mark'
import {nodeStack, activeStack} from './stack'
import {appendBatch, forwardStacks} from './using'
import {createSignal} from './createSignal'
import {createWatch} from './createWatch'
import {dynamicQueue, dynamicQueueFlat} from '../batch'
import {bind} from './bind'
import {remap} from '../storeField'
import {setRightSibling, setLeftSibling, makeSiblings} from './locality'

type ListContext = {
  parentNode: DOMElement
  cb: (opts: any) => void
  shortName: string
  reverse: boolean
  parentStack: Stack
  getID: (item: any, i: number) => string | number | symbol
}

export function tree<T, K extends keyof T, C extends keyof T>(
  {
    key,
    child,
    source,
  }: {
    key: T[K] extends string | number | symbol ? K : never
    child: T[C] extends T[] ? C : never
    source: Store<T[]>
  },
  cb: (
    opts: {store: Store<T>; key: T[K]; signal: Signal},
    child: () => void,
  ) => void,
) {
  list({source, key}, ({store, key: currentKey, signal}) => {
    const [childList] = remap(store, [child] as const)
    cb({store, key: currentKey, signal}, () => {
      //@ts-ignore
      tree({key, child, source: childList as Store<T[]>}, cb)
    })
  })
}

export function list<T>(
  source: Store<T[]>,
  cb: (opts: {store: Store<T>; index: number; signal: Signal}) => void,
): void
export function list<T, K extends keyof T>(
  {
    key,
    source,
    reverse,
  }: {
    key: T[K] extends string | number | symbol ? K : never
    source: Store<T[]>
    reverse?: boolean
  },
  cb: (opts: {store: Store<T>; key: T[K]; signal: Signal}) => void,
): void
export function list<T>(opts, cb: (opts: any) => void) {
  let source
  let reverse = false
  let getID: (item: T, i: number) => string | number | symbol
  if (is.store(opts)) {
    getID = indexIDGetter
    source = opts
  } else {
    const key = opts.key
    getID = bind(keyIDGetter, key)
    source = opts.source
    reverse = !!opts.reverse
  }
  const parentStack = activeStack.get()

  const parentSignal = createSignal()
  const currentStack: Stack = {
    parent: parentStack,
    signal: parentSignal,
    namespace: parentStack.namespace,
    targetElement: parentStack.targetElement,
    svgRoot: parentStack.svgRoot,
    child: [],
    locality: {
      sibling: {
        left: {ref: null},
        right: {ref: null},
      },
      child: {
        first: {ref: null},
        last: {ref: null},
      },
    },
    node: {
      type: 'list',
      pure: false,
      reverse,
      key: is.store(opts) ? {type: 'index'} : {type: 'key', key: opts.key},
      store: source,
      cb,
    },
    mountStatus: 'initial',
  }
  // parentSignal.scope.stack = currentStack
  forwardStacks(parentStack, currentStack)
  activeStack.replace(currentStack)

  const context: ListContext = {
    parentNode: parentStack.targetElement,
    cb,
    shortName: source.shortName,
    reverse,
    parentStack: currentStack,
    getID,
  }

  const updates = createStore(update(context, [], source.getState()))
  own(parentSignal, [updates])

  createWatch(parentSignal, bind(clearParentSignal, updates))
  sample({
    source: updates,
    clock: source,
    fn: bind(update, context),
    target: updates,
  })
  activeStack.replace(parentStack)
}

function update<T>(context: ListContext, records: Stack[], input: T[]) {
  beginMark('list update [' + context.shortName + ']')
  const skipNode: boolean[] = Array(input.length).fill(false)
  const keys = input.map(context.getID)
  const newRecords: Stack[] = []
  const resultRecords: Stack[] = []
  const removedRecords: Stack[] = []
  for (let i = 0; i < records.length; i++) {
    const stack = records[i]
    const record = stack.node as ListItemType
    const index = keys.indexOf(record.key)
    if (index !== -1) {
      resultRecords.push(stack)
      skipNode[index] = true
      if (record.store.getState() !== input[index])
        //@ts-ignore
        launch(record.store, input[index], true)
    } else {
      removedRecords.push(stack)
    }
  }
  if (removedRecords.length > 0) {
    for (let i = 0; i < removedRecords.length; i++) {
      const item = removedRecords[i]
      const {node, locality} = item
      ;(node as ListItemType).active = false
      ;(node as ListItemType).store = null
      const left = locality.sibling.left.ref
      const right = locality.sibling.right.ref
      makeSiblings(left, right)
      setRightSibling(item, null)
      setLeftSibling(item, null)
    }
    //@ts-ignore
    launch(removeNodesFromDOM, removedRecords, true)
  }
  let lastItem: Stack | null =
    resultRecords.length > 0 ? resultRecords[resultRecords.length - 1] : null
  for (let i = 0; i < input.length; i++) {
    if (skipNode[i]) continue
    const item = input[i]
    const store = createStore(item)
    const signal = createSignal()
    own(signal, [store])
    const id = context.getID(item, i)
    const stack: Stack = {
      parent: context.parentStack,
      signal,
      namespace: context.parentStack.namespace,
      targetElement: context.parentStack.targetElement,
      svgRoot: context.parentStack.svgRoot,
      child: [],
      locality: {
        sibling: {
          left: {ref: null},
          right: {ref: null},
        },
        child: {
          first: {ref: null},
          last: {ref: null},
        },
      },
      node: {
        type: 'listItem',
        pure: false,
        key: id as any,
        index: id as any,
        store,
        signal,
        active: true,
        nodes: [],
      },
      mountStatus: 'initial',
    }
    makeSiblings(lastItem, stack)
    lastItem = stack
    forwardStacks(context.parentStack, stack)
    newRecords.push(stack)
    resultRecords.push(stack)
  }
  if (newRecords.length > 0) {
    //@ts-ignore
    launch(applyNewRecordsEvent, {context, list: newRecords}, true)
  }
  endMark('list update [' + context.shortName + ']')
  return resultRecords
}
type AppendElements = {
  node: DOMElement
  append: Array<{
    listItem: ListItemType
    appended: DOMElement[]
  }>
  reverse: boolean
}

const {trigger: appendBatchEvent} = dynamicQueueFlat<AppendElements>({
  mark: 'append DOM nodes',
  fn: function appendDOMNode(block) {
    const append = [] as DOMElement[]
    for (let j = 0; j < block.append.length; j++) {
      const child = block.append[j]
      if (child.listItem.active === false) continue
      for (let k = 0; k < child.appended.length; k++) {
        append.push(child.appended[k])
      }
    }
    if (append.length > 0) {
      appendBatch({
        node: block.node,
        append,
        reverse: block.reverse,
      })
    }
  },
})

type AddRecords = {
  context: ListContext
  list: Stack[]
}

const {trigger: applyNewRecordsEvent} = dynamicQueueFlat<AddRecords>({
  mark: 'addRecords',
  fn: function addRecords({context, list}) {
    const {shortName, parentStack, parentNode, cb, reverse} = context
    beginMark('initRecord ' + shortName)
    const currentActiveStack = activeStack.get()
    activeStack.replace(parentStack)

    const nodes = [] as {
      listItem: ListItemType
      appended: DOMElement[]
    }[]
    const appended = [] as DOMElement[]
    nodeStack.push({
      node: parentNode,
      append: appended,
      reverse,
    })
    for (let j = 0; j < list.length; j++) {
      const stack: Stack = list[j]
      const item = stack.node as ListItemType
      if (!item.active) continue
      activeStack.replace(stack)
      cb(item)
      for (let k = 0; k < appended.length; k++) {
        item.nodes.push(appended[k])
      }
      nodes.push({
        appended: appended.slice(),
        listItem: item,
      })
      appended.length = 0
    }
    nodeStack.pop()
    if (nodes.length > 0) {
      launch(
        appendBatchEvent,
        {
          node: parentNode,
          append: nodes,
          reverse,
        },
        //@ts-ignore
        true,
      )
    }
    activeStack.replace(currentActiveStack)
    endMark('initRecord ' + shortName)
  },
})

const indexIDGetter = (item, i) => i
const keyIDGetter = (key, item, i) => item[key]

const removeNodesFromDOM = createEvent<Stack[]>()

dynamicQueue<Stack, Signal, any>({
  trigger: removeNodesFromDOM,
  priority: 'high',
  mark: 'runSignals',
  flatten: ({signal}) => [signal],
  fn: function launchSignal(signal) {
    if (!signal.scope) return
    //@ts-ignore
    launch(signal, null, false)
  },
})

dynamicQueue<Stack, DOMElement, DOMElement>({
  trigger: removeNodesFromDOM,
  priority: 'high',
  mark: 'remove DOM nodes',
  flatten({node}) {
    const {nodes} = node as ListItemType
    return nodes
  },
  fn: function removeDOMNode(item) {
    item.remove()
    return item
  },
})

const clearParentSignal = (updates: Store<Stack[]>) => {
  const allRecords = updates.getState()
  for (let i = 0; i < allRecords.length; i++) {
    const listItem = allRecords[i].node as ListItemType
    listItem.active = false
    listItem.store = null
  }
  //@ts-ignore
  launch(removeNodesFromDOM, allRecords, true)
}
