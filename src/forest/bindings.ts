import type {DOMElement, StaticOperationDef} from './index.h'

const defMap = {
  attr: applyAttr,
  data: applyDataAttr,
  style: applyStyle,
  styleVar: applyStyleVar,
  classList: applyClassList,
}

export function escapeTag(value: string) {
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
    case 'setProperty':
    case 'removeProperty':
      return 'forbidden'
    default:
      return value.replace(/[^a-zA-Z0-9\-_]/g, '')
  }
}

export function applyStaticOps(
  element: DOMElement,
  defs: StaticOperationDef[],
) {
  defs.forEach(({type, field, value}) => {
    defMap[type](element, field, value)
  })
}

export function isFalse(val: any) {
  return (
    val !== '' &&
    val !== 0 &&
    val !== '0' &&
    (val === false || val === undefined || val === null)
  )
}

export function applyStyleVar(
  element: DOMElement,
  field: string,
  value: string | number | boolean | null,
) {
  if (isFalse(value)) {
    element.style.removeProperty(`--${field}`)
  } else {
    element.style.setProperty(`--${field}`, `${value}`)
  }
}

export function applyStyle(
  element: DOMElement,
  field: string,
  value: string | number | boolean | null,
) {
  if (isFalse(value)) {
    delete element.style[field as any]
  } else {
    element.style[field as any] = `${value}`
  }
}

export function applyClassList(
  element: DOMElement,
  field: string,
  value: string | number | boolean | null,
) {
  if (field && field.trim().length > 0) {
    if (value) {
      element.classList.add(field)
    } else {
      element.classList.remove(field)
      if (element.classList.length === 0) {
        element.removeAttribute('class')
      }
    }
  }
}

export function applyDataAttr(
  element: DOMElement,
  field: string,
  value: string | number | boolean | null,
) {
  if (isFalse(value)) {
    delete element.dataset[field]
  } else {
    element.dataset[field] = `${value}`
  }
}
export function applyAttr(
  element: DOMElement,
  field: string,
  value: string | number | boolean | null,
) {
  if (isFalse(value)) {
    switch (field) {
      case 'value':
        //@ts-expect-error
        delete element.value
        break
      case 'checked':
        //@ts-expect-error
        element.checked = false
        break
      case 'spellcheck':
        if (value === false) {
          element.setAttribute('spellcheck', 'false')
          return
        }
        break
    }
    element.removeAttribute(field)
  } else {
    switch (field) {
      case 'value':
        //@ts-expect-error
        element.value = `${value}`
        break
      case 'checked':
        //@ts-expect-error
        element.checked = `${value}`
        break
    }
    element.setAttribute(field, `${value}`)
  }
}

export function applyText(textNode: Text, text: string | number | boolean) {
  textNode.replaceData(0, (textNode.textContent || '').length, String(text))
}
