export const IS_IOS =
  typeof navigator !== 'undefined' &&
  !!navigator.platform &&
  /iPad|iPhone|iPod/.test(navigator.platform)

export const JSON_KEYS_MAX = 2

export const USE_PERF = true

export const SHOW_VIZION = false
export const SHOW_CODE = false
export const SHOW_GRAPH = false
export const MAX_IN_FLIGHT_ITEMS = 100
export const TIMELINE_MAX = 360e3

export const USE_ANIMATE =
  typeof document !== 'undefined' && !!document.createElement('div').animate

export const MD = 12
export const BLACK = 'hsla(336, 71%, 2%, 1)'
export const WHITE = '#fffcfa'

export const TASK_DEADLINE = 10
