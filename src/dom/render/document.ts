import {DOMElement} from './index.h'
const invalidToken = /[^a-zA-Z0-9\-]/g
const invalidValue = /[\\<>"]/g
const dataValue = /[A-Z]/g
const escaped = /[&<>'"]/g

class DOMNode {
  child: {
    first: DOMNode | null
    last: DOMNode | null
  } = {
    first: null,
    last: null,
  }
  sibling: {
    left: DOMNode | null
    right: DOMNode | null
  } = {
    left: null,
    right: null,
  }
  parent: DOMNode | null = null
  tagName = ''
  namespaceURI = 'http://www.w3.org/1999/xhtml' as const
  dataset = Object.create(null)
  style = new CSSStyle()
  value?: string
  firstChild: DOMNode | null = null
  transform = {
    baseVal: new DOMSVGTransformList(),
  }
  isFragment = true
  attributes: {[attributeName: string]: string} = Object.create(null)
  textContent: string | null = null
  __STATIC__ = true
  appendChild(node: DOMNode): void {
    if (node.parent) node.remove()
    if (node.isFragment && node.textContent === null) {
      let child = node.firstChild
      let nextChild
      while (child) {
        nextChild = child.sibling.right
        this.appendChild(child)
        child = nextChild
      }
      return
    }
    if (!this.child.last) {
      this.child.first = node
      this.firstChild = node
    } else {
      this.child.last.sibling.right = node
      node.sibling.left = this.child.last
    }
    this.child.last = node
    node.parent = this
  }
  prepend(node: DOMNode): void {
    if (node.parent) node.remove()
    if (!this.child.last) {
      this.child.first = node
      this.child.last = node
    } else {
      this.child.first!.sibling.left = node
      node.sibling.right = this.child.first
    }
    this.child.first = node
    this.firstChild = node
    node.parent = this
  }
  contains(node: DOMNode): boolean {
    let parent: DOMNode | null = node
    while (parent) {
      if (parent === this) return true
      parent = parent.parent
    }
    return false
  }
  remove(): void {
    if (!this.parent) return
    const {parent} = this
    if (parent.child.first === this && parent.child.last === this) {
      parent.firstChild = null
      parent.child.first = null
      parent.child.last = null
    } else if (parent.child.first === this) {
      parent.child.first = this.sibling.right
      parent.firstChild = this.sibling.right
      this.sibling.right!.sibling.left = null
    } else if (parent.child.last === this) {
      parent.child.last = this.sibling.left
      this.sibling.left!.sibling.right = null
    } else {
      this.sibling.right!.sibling.left = this.sibling.left
      this.sibling.left!.sibling.right = this.sibling.right
    }
    this.sibling.left = null
    this.sibling.right = null
    this.parent = null
  }
  addEventListener(key: string, fn: Function, options: object): void {}
  removeEventListener(key: string, fn: Function, options: object): void {}
  setAttribute(property: string, value: string): void {
    this.attributes[escapeTag(property)] = escapeTagValue(value)
  }
  removeAttribute(property: string): void {
    delete this.attributes[escapeTag(property)]
  }
  replaceWith(node: DOMNode): void {
    if (!this.parent) return
    const {parent} = this
    if (node.parent) node.remove()
    if (parent.child.first === this && parent.child.last === this) {
      parent.firstChild = node
      parent.child.first = node
      parent.child.last = node
    } else if (parent.child.first === this) {
      parent.child.first = node
      parent.firstChild = node
      this.sibling.right!.sibling.left = node
    } else if (parent.child.last === this) {
      parent.child.last = node
      this.sibling.left!.sibling.right = node
    } else {
      this.sibling.right!.sibling.left = node
      this.sibling.left!.sibling.right = node
    }
    node.sibling.left = this.sibling.left
    node.sibling.right = this.sibling.right
    node.parent = parent
    this.sibling.left = null
    this.sibling.right = null
    this.parent = null
  }
  focus(): void {}
  blur(): void {}
  createSVGTransform(): DOMSVGTransform {
    return new DOMSVGTransform()
  }
  replaceData(offset: number, length: number, content: string) {
    if (typeof this.textContent !== 'string') return
    this.textContent = `${this.textContent.slice(
      0,
      offset,
    )}${content}${this.textContent.slice(offset + length)}`
  }
}
class CSSStyle {
  properties = Object.create(null)
  setProperty(property: string, value: string): void {
    this.properties[escapeTag(property)] = escapeTagValue(value)
  }
  removeProperty(property: string): void {
    delete this.properties[escapeTag(property)]
  }
}
class DOMSVGTransformList {
  items: DOMSVGTransform[] = []
  appendItem(newItem: DOMSVGTransform) {
    this.items.push(newItem)
  }
}
class DOMSVGTransform {
  value = ''
  setTranslate(tx: number, ty: number): void {
    this.value = `translate(${tx} ${ty})`
  }
  setScale(sx: number, sy: number): void {
    this.value = `scale(${sx} ${sy})`
  }
  setRotate(angle: number, cx: number, cy: number): void {
    if (cx !== 0 || cy !== 0) {
      this.value = `rotate(${angle} ${cx} ${cy})`
    } else {
      this.value = `rotate(${angle})`
    }
  }
  setSkewX(angle: number): void {
    this.value = `skewX(${angle})`
  }
  setSkewY(angle: number): void {
    this.value = `skewY(${angle})`
  }
}
function convertDataChar(char: string) {
  return `-${char.toLowerCase()}`
}
function convertDataAttr(value: string) {
  return escapeTag(value).replace(dataValue, convertDataChar)
}
function escapeContentHandler(char: string) {
  switch (char) {
    case '&':
      return '&amp;'
    case '<':
      return '&lt;'
    case '>':
      return '&gt;'
    case '"':
      return '&quot;'
    case "'":
      return '&#39;'
    default:
      return char
  }
}
function escapeTag(value: string) {
  value = String(value)
  switch (value) {
    case '__proto__':
    case '__defineGetter__':
    case '__defineSetter__':
    case 'constructor':
    case 'prototype':
    case 'hasOwnProperty':
    case 'toString':
    case 'valueOf':
      return 'blacklisted'
    default:
      return value.replace(invalidToken, '')
  }
}
function escapeTagValue(value: string) {
  return String(value).replace(invalidValue, '')
}
function escapeContent(value: string) {
  return String(value).replace(escaped, escapeContentHandler)
}

export const body = new DOMNode()
//@ts-ignore
body.isBody = true
export function createTextNode(text: string) {
  const node = new DOMNode()
  node.textContent = escapeContent(text)
  return node
}
export function createElement(tag: string) {
  const node = new DOMNode()
  node.tagName = escapeTag(tag)
  node.isFragment = false
  return node
}
export function createElementNS(
  namespace: 'http://www.w3.org/1999/xhtml' | 'http://www.w3.org/2000/svg',
  tag: string,
) {
  switch (namespace) {
    case 'http://www.w3.org/1999/xhtml':
    case 'http://www.w3.org/2000/svg':
      break
    default:
      namespace = 'http://www.w3.org/1999/xhtml'
  }
  const node = new DOMNode()
  node.tagName = escapeTag(tag)
  //@ts-ignore
  node.namespaceURI = namespace
  node.isFragment = false
  return node
}

export function createDocumentFragment(): DOMNode & DOMElement {
  //@ts-ignore
  return new DOMNode()
}

function renderPart(node: DOMNode, parts: string[]) {
  if (node.textContent !== null) {
    parts.push(node.textContent)
  }
  if (node.isFragment) {
    let child = node.firstChild
    while (child) {
      renderPart(child, parts)
      child = child.sibling.right
    }
    return
  }
  parts.push('<', node.tagName)
  for (const key in node.attributes) {
    parts.push(' ', key, '=', '"', escapeTagValue(node.attributes[key]), '"')
  }
  for (const key in node.dataset) {
    parts.push(
      ' ',
      'data-',
      convertDataAttr(key),
      '=',
      '"',
      escapeTagValue(node.dataset[key]),
      '"',
    )
  }
  const styles = [] as string[]
  for (const property in node.style.properties) {
    if (property.startsWith('--')) {
      styles.push(`${property}: ${node.style.properties[property]}`)
    } else {
      const dashedProperty = property.replace(
        /[A-Z]/,
        char => `-${char.toLowerCase()}`,
      )
      styles.push(`${dashedProperty}: ${node.style.properties[property]}`)
    }
  }
  if (styles.length > 0) {
    parts.push(' ', 'style', '=', '"', styles.join(';'), '"')
  }
  if (node.transform.baseVal.items.length > 0) {
    parts.push(' ', 'transform', '=', '"')
    const transforms = node.transform.baseVal.items.map(({value}) => value)
    parts.push(transforms.join(' '), '"')
  }
  if (!node.firstChild) {
    if (node.tagName === 'meta' || node.tagName === 'link') {
      parts.push('>')
    } else {
      parts.push('/>')
    }
    return
  }
  parts.push('>')
  let child: DOMNode | null = node.firstChild
  while (child) {
    renderPart(child, parts)
    child = child.sibling.right
  }
  parts.push('</', node.tagName, '>')
}

export function render(node: DOMNode) {
  const parts = [] as string[]
  renderPart(node, parts)
  const content = parts.join('')
  if (detectFullPageRender(node)) {
    return `<!DOCTYPE html>${content}`
  }
  return content
}

function detectFullPageRender(node: DOMNode): boolean {
  if (node.tagName === 'html') return true
  if (node.isFragment && node.textContent === null) {
    const firstChild = node.firstChild
    if (firstChild && node.child.last === firstChild) {
      return detectFullPageRender(firstChild)
    }
  }
  return false
}
