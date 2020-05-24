const isObject = obj => typeof obj === 'object' && obj !== null

export function isDOM(val) {
  if (!isObject(val) || typeof window.Node !== 'function') {
    return false
  }

  return typeof val.nodeType === 'number' && typeof val.nodeName === 'string'
}
