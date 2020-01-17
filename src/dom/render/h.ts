import {Store, Event} from 'effector'

import {
  DOMElement,
  Stack,
  ElementDraft,
  MergedBindings,
  NSType,
  PropertyMap,
  TransformMap,
  StoreOrData,
  DOMProperty,
  StylePropertyMap,
} from './index.h'
import {nodeStack, activeStack} from './stack'
import {appendBatch, forwardStacks} from './using'
import {createSignal} from './createSignal'
import {
  bindAttr,
  bindData,
  bindHandler,
  bindStyleProp,
  bindStyleVar,
  bindTransform,
  bindText,
  bindVisible,
  bindFocus,
  bindBlur,
} from './bindings'
import {document} from './documentResolver'
import {spec} from '../h'

export function h(tag: string, cb: () => void): DOMElement
export function h(
  tag: string,
  spec: {
    attr?: PropertyMap
    data?: PropertyMap
    transform?: Partial<TransformMap>
    text?: StoreOrData<DOMProperty>
    visible?: Store<boolean>
    style?: StylePropertyMap
    styleVar?: PropertyMap
    focus?: {
      focus?: Event<any>
      blur?: Event<any>
    }
    handler?: Partial<
      {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
    >
  },
)
export function h(
  tag: string,
  opts: {type?: 'svg'; noAppend?: boolean},
  cb?: () => void,
): DOMElement
export function h(tag, opts, cb?: any) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  if (opts === undefined) opts = {}
  const {noAppend = false} = opts
  const parent = activeStack.get()
  const parentNS: NSType = parent ? parent.namespace : 'html'
  let ns: NSType = parentNS
  let type = 'html'
  if ('type' in opts) {
    type = opts.type
    ns = opts.type
  } else {
    ns = type = parentNS === 'svg' ? 'svg' : 'html'
  }
  if (tag === 'svg') {
    type = 'svg'
    ns = 'svg'
  }
  const node =
    type === 'svg'
      ? document.createElementNS('http://www.w3.org/2000/svg', tag)
      : document.createElement(tag)
  if (parentNS === 'foreignObject') {
    node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
    ns = 'html'
  } else if (tag === 'svg') {
    node.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    ns = 'svg'
  } else if (tag === 'foreignObject') {
    ns = 'foreignObject'
  }
  const signal = createSignal()
  const draft: ElementDraft = {
    type: 'element',
    pure: false,
    tag,
    attr: [],
    data: [],
    visible: [],
    text: [],
    styleVar: [],
    styleProp: [],
    handler: [],
    transform: [],
    focus: [],
    blur: [],
  }
  const currentStack: Stack = {
    parent: null,
    signal,
    namespace: ns,
    targetElement: node,
    svgRoot: null,
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
    node: draft,
    mountStatus: 'initial',
  }
  if (parent) {
    forwardStacks(parent, currentStack)
  }
  if (tag === 'svg') {
    currentStack.svgRoot = node
  } else if (parent) {
    currentStack.svgRoot = parent.svgRoot
  }
  activeStack.replace(currentStack)
  // node.__SIGNAL__ = signal
  if (cb) {
    initNode(node, parent, cb)
  } else {
    draft.pure = true
    spec(opts)
  }
  applyNodeDraft()
  activeStack.replace(parent)
  if (!noAppend) {
    if (nodeStack.length > 0) {
      nodeStack[nodeStack.length - 1].append.push(node)
    }
  }
  return node
}

function applyNodeDraft() {
  const merged = mergeNodeDraft()
  const stack = activeStack.get()
  const element = stack.targetElement
  const signal = stack.signal
  bindAttr(element, signal, merged.attr)
  bindData(element, signal, merged.data)
  bindHandler(element, signal, merged.handler)
  bindStyleProp(element, signal, merged.styleProp)
  bindStyleVar(element, signal, merged.styleVar)
  bindTransform(element, signal, merged.transform)
  bindText(element, signal, merged.text)
  bindVisible(element, signal, merged.visible)
  bindFocus(element, signal, merged.focus)
  bindBlur(element, signal, merged.blur)
}

function mergeNodeDraft() {
  const draft = activeStack.getElementNode()
  const merged: MergedBindings = {
    attr: {},
    data: {},
    visible: null,
    text: null,
    styleVar: {},
    styleProp: {},
    handler: draft.handler,
    transform: draft.transform,
    focus: draft.focus,
    blur: draft.blur,
  }
  for (let i = 0; i < draft.attr.length; i++) {
    const map = draft.attr[i]
    for (const key in map) {
      merged.attr[key] = map[key]
    }
  }
  for (let i = 0; i < draft.data.length; i++) {
    const map = draft.data[i]
    for (const key in map) {
      merged.data[key] = map[key]
    }
  }
  if (draft.visible.length > 0) {
    merged.visible = draft.visible[draft.visible.length - 1]
  }
  if (draft.text.length > 0) {
    merged.text = draft.text[draft.text.length - 1]
  }
  for (let i = 0; i < draft.styleVar.length; i++) {
    const map = draft.styleVar[i]
    for (const key in map) {
      merged.styleVar[key] = map[key]
    }
  }
  for (let i = 0; i < draft.styleProp.length; i++) {
    const map = draft.styleProp[i]
    for (const key in map) {
      merged.styleProp[key] = map[key]
    }
  }
  return merged
}

function initNode(node: DOMElement, parent: Stack, cb: () => void) {
  let succ = false
  nodeStack.push({node, append: [], reverse: false})
  try {
    cb()
    succ = true
  } finally {
    appendBatch(nodeStack.pop()!)
    if (!succ) {
      activeStack.replace(parent)
    }
  }
}
