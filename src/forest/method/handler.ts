import {Event, is} from 'effector'

import {currentTemplate} from '../template'
import {assert} from '../assert'

export function handler(
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void
export function handler(
  options: {
    passive?: boolean
    capture?: boolean
    prevent?: boolean
    stop?: boolean
  },
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void
export function handler(options: any, map?: any) {
  if (!currentTemplate) return
  const draft = currentTemplate.draft
  assert(
    draft.type === 'element',
    `"handler" extension can be used only with element nodes, got "${draft.type}"`,
  )
  if (map === undefined) {
    map = options
    options = {}
  }
  for (const key in map) {
    assert(is.unit(map[key]), `handler for "${key}" should be event`)
  }
  const {
    passive = false,
    capture = false,
    prevent = false,
    stop = false,
  } = options
  draft.handler.push({
    options: {
      prevent,
      stop,
    },
    domConfig: {
      passive: prevent ? false : passive,
      capture,
    },
    map,
  })
}
