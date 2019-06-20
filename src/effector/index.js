//@flow

/*
 * People assume that time is a strict progression of cause to effect,
 * but actually from a non-linear, non-subjective viewpoint -
 * it's more like a big ball of wibbly wobbly time-y wimey stuff
 */

export {combine, combine as createStoreObject} from './combine'
export {sample} from './sample'

export type {Domain} from './domain'
export {createDomain} from './domain'

export type {Event} from './event'
export {createEvent, merge, forward, fromObservable} from './event'

export type {Effect} from './effect'
export {createEffect} from './effect'

export type {Store} from './store'
export {
  createStore,
  setStoreName,
  extract,
  createApi,
  restore,
  restoreEvent,
  restoreEffect,
  restoreObject,
  withProps,
} from './store'

export {
  Kind,
  clearNode,
  createGraph as createNode,
  step,
  traverse,
} from './stdlib'
export {launch} from './kernel'
export type {kind} from './stdlib'

export {
  invariant,
  warning,
  isUnit,
  isStore,
  isEvent,
  isEffect,
  isDomain,
  is,
} from './validate'
export {version} from 'effector/flags'

//eslint-disable-next-line
export * as blocks from './blocks'
