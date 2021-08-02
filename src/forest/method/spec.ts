import type {Store, Event} from 'effector'

import type {
  PropertyMap,
  StoreOrData,
  DOMProperty,
  StylePropertyMap,
} from '../index.h'

import {escapeTag} from '../bindings'
import {currentActor} from '../template'
import {assertClosure} from '../assert'
import {handler} from './handler'

export function spec(config: {
  attr?: PropertyMap
  data?: PropertyMap
  text?: StoreOrData<DOMProperty> | Array<StoreOrData<DOMProperty>>
  style?: StylePropertyMap
  styleVar?: PropertyMap
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
  assertClosure(currentActor, 'spec')
  const draft = currentActor.draft
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
    draft.styleProp.push(escaped)
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
