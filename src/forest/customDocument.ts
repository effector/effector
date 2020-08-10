import {Env} from './index.h'
import {escapeTag} from './bindings'
const invalidValue = /[\\<>"]/g
const dataValue = /[A-Z]/g
const escaped = /[&<>'"]/g
const scriptEscape = /<\/(\s|\\n)*script/gim

function setNextSibling(target: DOMNode, sibling: DOMNode | null) {
  target.sibling.right = sibling
  target.nextSibling = sibling
}

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
  nodeName = ''
  namespaceURI = 'http://www.w3.org/1999/xhtml' as const
  dataset = Object.create(null)
  style = new CSSStyle()
  value?: string
  firstChild: DOMNode | null = null
  nextSibling: DOMNode | null = null
  isFragment = true
  attributes: {[attributeName: string]: string} = Object.create(null)
  textContent: string | null = null
  __STATIC__ = true
  cloneNode() {
    const result = new DOMNode()
    result.tagName = this.tagName
    result.nodeName = this.nodeName
    result.namespaceURI = this.namespaceURI
    Object.assign(result.dataset, this.dataset)
    Object.assign(result.style, this.style)
    result.value = this.value
    result.isFragment = this.isFragment
    Object.assign(result.attributes, this.attributes)
    result.textContent = this.textContent
    return result
  }
  after(node: DOMNode): void {
    if (this.sibling.right === node) return
    if (node.parent) node.remove()
    if (!this.parent) return
    if (this.sibling.right) {
      this.sibling.right.sibling.left = node
      setNextSibling(node, this.sibling.right)
    } else {
      this.parent.child.last = node
    }
    setNextSibling(this, node)
    node.sibling.left = this
    node.parent = this.parent
  }
  prepend(node: DOMNode): void {
    if (node.parent) node.remove()
    if (!this.child.last) {
      this.child.first = node
      this.child.last = node
    } else {
      this.child.first!.sibling.left = node
      setNextSibling(node, this.child.first)
    }
    this.child.first = node
    this.firstChild = node
    node.parent = this
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
      setNextSibling(this.sibling.left!, null)
    } else {
      this.sibling.right!.sibling.left = this.sibling.left
      setNextSibling(this.sibling.left!, this.sibling.right)
    }
    this.sibling.left = null
    setNextSibling(this, null)
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
      setNextSibling(this.sibling.left!, node)
    } else {
      this.sibling.right!.sibling.left = node
      setNextSibling(this.sibling.left!, node)
    }
    node.sibling.left = this.sibling.left
    setNextSibling(node, this.sibling.right)
    node.parent = parent
    this.sibling.left = null
    setNextSibling(this, null)
    this.parent = null
  }
  replaceData(offset: number, length: number, content: string) {
    if (typeof this.textContent !== 'string') return
    this.textContent = `${this.textContent.slice(
      0,
      offset,
    )}${content}${this.textContent.slice(offset + length)}`
  }
  splitText(offset: number) {
    if (typeof this.textContent !== 'string') return null
    const node = new DOMNode()
    node.nodeName = '#text'
    node.textContent = this.textContent.slice(offset)
    this.textContent = this.textContent.slice(0, offset)
    this.after(node)
    return node
  }
}
class CSSStyle {
  setProperty(property: string, value: string): void {
    //@ts-ignore
    this[escapeTag(property)] = escapeTagValue(value)
  }
  removeProperty(property: string): void {
    //@ts-ignore
    delete this[escapeTag(property)]
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

function escapeTagValue(value: string) {
  return String(value).replace(invalidValue, '')
}
function escapeContent(value: string) {
  return String(value).replace(escaped, escapeContentHandler)
}
function escapeScriptContent(value: string) {
  return value.replace(scriptEscape, '<\\/script')
}

export function createEnv(): Env {
  const document = {
    createTextNode(text: string) {
      const node = new DOMNode()
      node.textContent = String(text)
      node.nodeName = '#text'
      return node
    },
    createElement(tag: string) {
      const node = new DOMNode()
      node.tagName = escapeTag(tag)
      node.isFragment = false
      return node
    },
    createElementNS(
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
    },
    createDocumentFragment() {
      return new DOMNode()
    },
  }
  return {
    //@ts-ignore
    document,
  }
}

function renderPart(node: DOMNode, parts: string[]) {
  if (node.textContent !== null) {
    let textContent = node.textContent
    if (!node.parent || node.parent.tagName !== 'script') {
      textContent = escapeContent(textContent)
    }
    parts.push(textContent)
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
  for (const property in node.style) {
    //@ts-ignore
    const value = node.style[property]
    if (property.startsWith('--')) {
      styles.push(`${property}: ${value}`)
    } else {
      let dashedProperty = property.replace(
        /[A-Z]/g,
        char => `-${char.toLowerCase()}`,
      )
      if (property.startsWith('webkit') || property.startsWith('moz')) {
        dashedProperty = `-${dashedProperty}`
      }
      styles.push(`${dashedProperty}: ${value}`)
    }
  }
  if (styles.length > 0) {
    parts.push(' ', 'style', '=', '"', styles.join(';'), '"')
  }
  parts.push('>')
  if (nonClosedTags.includes(node.tagName)) return
  const childParts: string[] = node.tagName === 'script' ? [] : parts
  let child: DOMNode | null = node.firstChild
  while (child) {
    renderPart(child, childParts)
    child = child.sibling.right
  }
  if (node.tagName === 'script') {
    const rawScript = childParts.join('')
    parts.push(escapeScriptContent(rawScript))
  }
  parts.push('</', node.tagName, '>')
}

const nonClosedTags = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]

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
