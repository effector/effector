import {is, Store, Event, combine} from 'effector'
import {debounceRaf, domOperation} from './renderer'

import {
  PropertyMap,
  TransformMap,
  StoreOrData,
  StylePropertyMap,
  Signal,
  DOMElement,
  HandlerRecord,
  DOMProperty,
  Stack,
} from './index.h'
import {activeStack} from './stack'
import {createWatch} from './createWatch'
import {document} from './documentResolver'
import {findNearestVisibleNode} from './nearestNode'

function isFalse(val: any) {
  return (
    val !== '' &&
    val !== 0 &&
    val !== '0' &&
    (val === false || val === undefined || val === null)
  )
}
const finalizeHandler = (
  element: DOMElement,
  {map, options}: HandlerRecord,
) => {
  for (const key in map) {
    //@ts-ignore
    element.removeEventListener(key, map[key], options)
  }
}
export function bindHandler(
  element: DOMElement,
  signal: Signal,
  handlers: HandlerRecord[],
) {
  for (let i = 0; i < handlers.length; i++) {
    const {options, map} = handlers[i]
    for (const key in map) {
      //@ts-ignore
      element.addEventListener(key, map[key], options)
    }
    createWatch(signal, finalizeHandler.bind(null, element, handlers[i]))
  }
}
function applyData(dataset: DOMStringMap, field: string, value: any) {
  if (isFalse(value)) {
    delete dataset[field]
  } else {
    dataset[field] = `${value}`
  }
}

export function bindData(
  element: DOMElement,
  signal: Signal,
  dataset: PropertyMap,
) {
  for (const field in dataset) {
    domOperation(
      false,
      signal,
      dataset[field],
      applyData.bind(null, element.dataset, field),
    )
  }
}

function applyVisible(
  node: DOMElement,
  parent: DOMElement,
  stack: Stack,
  visible: boolean,
) {
  stack.visible = visible
  if (visible) {
    if (!parent.contains(node)) {
      const nearestVisible = findNearestVisibleNode(stack)
      if (nearestVisible && parent.contains(nearestVisible.targetElement)) {
        nearestVisible.targetElement.after(node)
      } else {
        parent.prepend(node)
      }
    }
  } else {
    node.remove()
  }
}

export function bindVisible(
  element: DOMElement,
  signal: Signal,
  visible: Store<boolean> | null,
) {
  if (visible === null) return
  const stack = activeStack.get()
  debounceRaf(
    signal,
    visible,
    applyVisible.bind(null, element, stack.parent!.targetElement, stack),
  )
}
const applyStyleProp = (
  style: CSSStyleDeclaration,
  propName: any,
  value: any,
) => {
  if (isFalse(value)) {
    delete style[propName]
  } else {
    style[propName] = value
  }
}
const applyStyleVal = (
  style: CSSStyleDeclaration,
  variableName: string,
  value: any,
) => {
  if (isFalse(value)) {
    style.removeProperty(variableName)
  } else {
    style.setProperty(variableName, value)
  }
}
export function bindStyleProp(
  element: DOMElement,
  signal: Signal,
  map: StylePropertyMap,
) {
  const style = element.style
  for (const propName in map) {
    domOperation(
      false,
      signal,
      map[propName],
      applyStyleProp.bind(null, style, propName),
    )
  }
}
export function bindStyleVar(
  element: DOMElement,
  signal: Signal,
  map: PropertyMap,
) {
  const style = element.style
  for (const propName in map) {
    domOperation(
      false,
      signal,
      map[propName],
      applyStyleVal.bind(null, style, `--${propName}`),
    )
  }
}

function applyAttr(
  element: DOMElement,
  attr: string,
  value: string | number | boolean | null,
) {
  if (isFalse(value)) {
    switch (attr) {
      case 'value':
        //@ts-ignore
        delete element.value
        break
      case 'checked':
        //@ts-ignore
        element.checked = false
        break
      case 'spellcheck':
        if (value === false) {
          element.setAttribute('spellcheck', 'false')
          return
        }
        break
    }
    element.removeAttribute(attr)
  } else {
    switch (attr) {
      case 'value':
        //@ts-ignore
        element.value = `${value}`
        break
      case 'checked':
        //@ts-ignore
        element.checked = `${value}`
        break
    }
    element.setAttribute(attr, `${value}`)
  }
}

export function bindAttr(
  element: DOMElement,
  signal: Signal,
  map: PropertyMap,
) {
  for (const attr in map) {
    domOperation(
      attr !== 'value' &&
        attr !== 'checked' &&
        attr !== 'min' &&
        attr !== 'max',
      signal,
      map[attr],
      applyAttr.bind(null, element, attr),
    )
  }
}
const xShape = (y: number, x: number) => ({x, y})
const yShape = (x: number, y: number) => ({x, y})
function normalizeTranslateShape(
  data:
    | Store<{x?: number; y?: number}>
    | {x?: StoreOrData<number>; y?: StoreOrData<number>},
): StoreOrData<{
  x?: number
  y?: number
}> {
  if (is.store(data)) return data
  //@ts-ignore
  if (is.store(data.x)) {
    //@ts-ignore
    if (is.store(data.y)) return combine({x: data.x, y: data.y})
    //@ts-ignore
    return data.x.map(xShape.bind(null, data.y))
  }
  //@ts-ignore
  if (is.store(data.y)) return data.y.map(yShape.bind(null, data.x))
  return data as any
}

function applyTransform<T>(
  svg: SVGSVGElement,
  signal: Signal,
  transformList: SVGTransformList,
  data: StoreOrData<T>,
  handler: (transform: SVGTransform, data: T) => void,
  key: keyof typeof transformResolvers,
) {
  const transform = svg.createSVGTransform()
  switch (key) {
    case 'translate':
    case 'scale':
      data = normalizeTranslateShape(data as any) as any
      break
  }
  domOperation(false, signal, data, handler.bind(null, transform))
  transformList.appendItem(transform)
}
const transformResolvers = {
  translate(transform: SVGTransform, {x = 0, y = 0}: {x?: number; y?: number}) {
    transform.setTranslate(x, y)
  },
  scale(transform: SVGTransform, {x = 0, y = 0}: {x?: number; y?: number}) {
    transform.setScale(x, y)
  },
  rotate(
    transform: SVGTransform,
    data:
      | number
      | {
          angle?: number
          x?: number
          y?: number
        },
  ) {
    if (typeof data === 'number') {
      transform.setRotate(data, 0, 0)
    } else {
      transform.setRotate(data.angle || 0, data.x || 0, data.y || 0)
    }
  },
  skewX(transform: SVGTransform, angle: number) {
    transform.setSkewX(angle)
  },
  skewY(transform: SVGTransform, angle: number) {
    transform.setSkewY(angle)
  },
}
export function bindTransform(
  element: DOMElement,
  signal: Signal,
  operationsSeq: Partial<TransformMap>[],
) {
  const stack = activeStack.get()
  if (stack.namespace !== 'svg') return
  if (operationsSeq.length === 0) return
  //@ts-ignore
  const transformList: SVGTransformList = element.transform.baseVal
  const svg = stack.svgRoot
  for (let i = 0; i < operationsSeq.length; i++) {
    const operations = operationsSeq[i]
    for (const key in operations) {
      applyTransform(
        svg!,
        signal,
        transformList,
        //@ts-ignore
        operations[key],
        //@ts-ignore
        transformResolvers[key],
        key as any,
      )
    }
  }
}
function setText(textNode: Text, text: string | number | boolean) {
  textNode.replaceData(0, (textNode.textContent || '').length, String(text))
}

export function bindText(
  element: DOMElement,
  signal: Signal,
  stores: StoreOrData<DOMProperty>[],
) {
  for (let i = 0; i < stores.length; i++) {
    const store = stores[i]
    if (store === null) continue
    const textNode = document.createTextNode('')
    element.appendChild(textNode)
    if (is.unit(store)) {
      debounceRaf(signal, store, setText.bind(null, textNode))
    } else {
      setText(textNode, store)
    }
  }
}
function setFocus(element: DOMElement) {
  element.focus()
}
export function bindFocus(
  element: DOMElement,
  signal: Signal,
  events: Event<any>[],
) {
  for (let i = 0; i < events.length; i++) {
    domOperation(true, signal, events[i], setFocus.bind(null, element))
  }
}
function setBlur(element: DOMElement) {
  element.blur()
}
export function bindBlur(
  element: DOMElement,
  signal: Signal,
  events: Event<any>[],
) {
  for (let i = 0; i < events.length; i++) {
    domOperation(true, signal, events[i], setBlur.bind(null, element))
  }
}
