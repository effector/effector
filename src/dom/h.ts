import {Store, Event, createNode} from 'effector'

import {
  PropertyMap,
  TransformMap,
  StoreOrData,
  StylePropertyMap,
  DOMProperty,
  DOMElement,
} from './render/index.h'
import {activeStack} from './render/stack'
import {own} from './own'

export {using} from './render/using'
export {h} from './render/h'
// export {Signal} from './render/index.h'
export {list, tree} from './render/list'

export function explicitUnmount(unmountOn: Event<any>) {
  const stack = activeStack.get()
  if (stack) {
    createNode({
      node: [],
      //@ts-ignore
      parent: unmountOn,
      //@ts-ignore
      child: stack.signal,
      //@ts-ignore
      family: {
        type: 'crosslink',
        owners: [stack.signal, unmountOn],
      },
    })
  }
}

export function signalOwn<T>(value: T): T {
  const stack = activeStack.get()
  if (stack) {
    own(stack.signal, [value])
  }
  return value
}

function assertElementNode() {
  const stack = activeStack.get()
  if (stack.node.type !== 'element' && stack.node.type !== 'using') {
    throw Error(
      `this extension can be used only with element nodes, got "${stack.node.type}"`,
    )
  }
}

export function nodeMethod<K extends keyof DOMElement>(
  method: K,
): DOMElement[K] extends Function ? DOMElement[K] : never
export function nodeMethod<T extends DOMElement, K extends keyof T>(
  method: K,
): T[K] extends Function ? T[K] : never
export function nodeMethod<K extends keyof DOMElement>(
  method: K,
): DOMElement[K] extends Function ? DOMElement[K] : never {
  let item: DOMElement
  node(e => {
    item = e
  })
  return ((...args) => {
    if (!item) {
      // throw Error('node not mounted yet')
      return
    }
    return item[method](...args)
  }) as any
}

export function node(fn: (node: DOMElement) => void) {
  const stack = activeStack.get()
  //@ts-ignore
  if (!stack.targetElement.__STATIC__) {
    fn(stack.targetElement)
  }
}
export type Specification = {
  attr?: PropertyMap
  data?: PropertyMap
  transform?: Partial<TransformMap>
  text?: StoreOrData<DOMProperty>
  visible?: Store<boolean>
  style?: {
    prop?: StylePropertyMap
    val?: PropertyMap
  }
  focus?: {
    focus?: Event<any>
    blur?: Event<any>
  }
  handler?: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >
}
export function spec(spec: {
  attr?: PropertyMap
  data?: PropertyMap
  transform?: Partial<TransformMap>
  text?: StoreOrData<DOMProperty>
  visible?: Store<boolean>
  style?: {
    prop?: StylePropertyMap
    val?: PropertyMap
  }
  focus?: {
    focus?: Event<any>
    blur?: Event<any>
  }
  handler?: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >
}) {
  if (spec.attr) attr(spec.attr)
  if (spec.data) data(spec.data)
  if (spec.transform) transform(spec.transform)
  if ('text' in spec) text(spec.text)
  if ('visible' in spec) visible(spec.visible)
  if (spec.style) style(spec.style)
  if (spec.focus) focus(spec.focus)
  if (spec.handler) handler(spec.handler)
}

export function attr(map: PropertyMap) {
  assertElementNode()
  activeStack.getElementNode().attr.push(map)
}
export function data(dataset: PropertyMap) {
  assertElementNode()
  activeStack.getElementNode().data.push(dataset)
}
export function transform(operations: Partial<TransformMap>) {
  assertElementNode()
  activeStack.getElementNode().transform.push(operations)
}
export function text(store: StoreOrData<DOMProperty>) {
  assertElementNode()
  activeStack.getElementNode().text.push(store)
}
export function visible(visible: Store<boolean>) {
  assertElementNode()
  activeStack.getElementNode().visible.push(visible)
}

export function style({
  prop,
  val,
}: {
  prop?: StylePropertyMap
  val?: PropertyMap
}) {
  assertElementNode()
  if (prop) {
    activeStack.getElementNode().styleProp.push(prop)
  }
  if (val) {
    activeStack.getElementNode().styleVar.push(val)
  }
}

export function handler(
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void
export function handler(
  options: {passive?: boolean; capture?: boolean},
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void
export function handler(options, map?: any) {
  assertElementNode()
  if (map === undefined) {
    map = options
    options = {}
  }
  const {passive = true, capture = false} = options
  activeStack.getElementNode().handler.push({
    options: {passive, capture},
    map,
  })
}

export function focus({focus, blur}: {focus?: Event<any>; blur?: Event<any>}) {
  assertElementNode()
  const node = activeStack.getElementNode()
  if (focus) node.focus.push(focus)
  if (blur) node.blur.push(blur)
}
