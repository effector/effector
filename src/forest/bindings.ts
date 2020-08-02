import {DOMElement, StaticOperationDef} from './index.h'

const defMap = {
  attr: applyAttr,
  data: applyDataAttr,
  style: applyStyle,
  styleVar: applyStyleVar,
}

export function applyStaticOps(
  element: DOMElement,
  defs: StaticOperationDef[],
) {
  for (let i = 0; i < defs.length; i++) {
    const {type, field, value} = defs[i]
    defMap[type](element, field, value)
  }
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
    element.removeAttribute(field)
  } else {
    switch (field) {
      case 'value':
        //@ts-ignore
        element.value = `${value}`
        break
      case 'checked':
        //@ts-ignore
        element.checked = `${value}`
        break
    }
    element.setAttribute(field, `${value}`)
  }
}

export function applyText(textNode: Text, text: string | number | boolean) {
  textNode.replaceData(0, (textNode.textContent || '').length, String(text))
}
