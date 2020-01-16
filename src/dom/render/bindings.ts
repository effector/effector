import {is, Store, Event} from 'effector'
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
} from './index.h'
import {activeStack} from './stack'
import {createWatch} from './createWatch'
import {document} from './documentResolver'

function isFalse(val) {
  return val !== '' && (val === false || val === undefined || val === null)
}
const finalizeHandler = (
  element: DOMElement,
  {map, options}: HandlerRecord,
) => {
  for (const key in map) {
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
      element.addEventListener(key, map[key], options)
    }
    createWatch(signal, finalizeHandler.bind(null, element, handlers[i]))
  }
}
function applyData(dataset, field, value) {
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
function applyVisible(node: DOMElement, parent: DOMElement, visible: boolean) {
  if (visible) {
    if (!parent.contains(node)) {
      parent.appendChild(node)
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
  const parent = activeStack.get().parent.targetElement
  debounceRaf(signal, visible, applyVisible.bind(null, element, parent))
}
const applyStyleProp = (style: CSSStyleDeclaration, propName, value) => {
  if (isFalse(value)) {
    delete style[propName]
  } else {
    style[propName] = value
  }
}
const applyStyleVal = (style: CSSStyleDeclaration, variableName, value) => {
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

function applyAttr(element: DOMElement, attr, value) {
  if (isFalse(value)) {
    switch (attr) {
      case 'value':
        //@ts-ignore
        delete element.value
        break
      case 'checked':
        //@ts-ignore
        delete element.checked
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

function applyTransform<T>(
  svg: SVGSVGElement,
  signal: Signal,
  transformList: SVGTransformList,
  data: StoreOrData<T>,
  handler: (transform: SVGTransform, data: T) => void,
) {
  const transform = svg.createSVGTransform()
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
        svg,
        signal,
        transformList,
        operations[key],
        transformResolvers[key],
      )
    }
  }
}
function setText(node, text) {
  const textNode = document.createTextNode(`${text}`)
  const firstChild = node.firstChild
  if (firstChild) {
    firstChild.replaceWith(textNode)
  } else {
    node.appendChild(textNode)
  }
}

export function bindText(
  element: DOMElement,
  signal: Signal,
  store: StoreOrData<DOMProperty>,
) {
  if (store === null) return
  if (is.unit(store)) {
    debounceRaf(signal, store, setText.bind(null, element))
  } else {
    setText(element, store)
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
