import type {Store, Event} from 'effector'

import type {
  PropertyMap,
  StoreOrData,
  DOMProperty,
  StylePropertyMap,
  ClassListArray,
  ClassListMap,
  ClassListProperty,
} from '../index.h'

import {escapeTag} from '../bindings'
import {currentTemplate} from '../engine/createTemplate'
import {assertClosure} from '../assert'
import {handler} from './handler'
import {forIn} from '../forIn'

export function spec(config: {
  attr?: PropertyMap
  data?: PropertyMap
  text?: StoreOrData<DOMProperty> | Array<StoreOrData<DOMProperty>>
  style?: StylePropertyMap
  styleVar?: PropertyMap
  classList?: ClassListArray | ClassListMap
  visible?: Store<boolean>
  handler?:
    | {
        config?: {
          passive?: boolean
          capture?: boolean
          prevent?: boolean
          stop?: boolean
        }
        on: Partial<
          {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
        >
      }
    | Partial<{[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}>
  ɔ?: any
}) {
  assertClosure(currentTemplate, 'spec')
  const draft = currentTemplate.draft
  switch (draft.type) {
    case 'list':
      if (config.visible) draft.itemVisible = config.visible
      return
    case 'listItem':
    case 'using':
    case 'route':
    case 'rec':
    case 'recItem':
    case 'block':
    case 'blockItem':
      return
  }
  if (config.attr) draft.attr.push(config.attr)
  if (config.data) draft.data.push(config.data)
  if ('text' in config) {
    const text = config.text
    const firstIndex = draft.childCount
    if (Array.isArray(text)) {
      draft.text.push(
        ...text.map((value, i) => ({
          index: i + firstIndex,
          value,
        })),
      )
      draft.childCount += text.length
    } else {
      draft.text.push({
        index: firstIndex,
        value: text!,
      })
      draft.childCount += 1
    }
  }
  if (config.style) {
    const escaped = {} as StylePropertyMap
    for (const field in config.style) {
      //@ts-expect-error
      escaped[escapeTag(field)] = config.style[field]
    }
    draft.style.push(escaped)
  }
  if (config.classList) {
    normalizeClassList(config.classList, property =>
      draft.classList.push(property),
    )
  }
  if (config.styleVar) draft.styleVar.push(config.styleVar)
  if (config.visible) draft.visible = config.visible
  if (config.handler) {
    const handlerDef = config.handler
    //@ts-expect-error
    if (typeof handlerDef.on === 'object') {
      //@ts-expect-error
      handler(handlerDef.config || {}, handlerDef.on)
    } else {
      //@ts-expect-error
      handler(handlerDef)
    }
  }
  if (config.ɔ) {
    spec(config.ɔ)
  }
}

function normalizeClassList(
  classList: ClassListMap | ClassListArray,
  cb: (property: ClassListProperty) => void,
) {
  if (Array.isArray(classList)) {
    classList.forEach(className => {
      const name =
        typeof className === 'string'
          ? classListArray(className)
          : className.map(optionalClass => classListArray(optionalClass || ''))
      const enabled =
        typeof className === 'string'
          ? true
          : className.map(optionalClass => optionalClass !== null)

      cb({name, enabled})
    })
  } else {
    forIn(classList, (enabled, names) => {
      const name = classListArray(names)
      cb({name, enabled})
    })
  }
}

function classListArray(classNames: string): string[] {
  return classNames
    .split(' ')
    .map(name => name.trim())
    .filter(name => name.length > 0)
}
