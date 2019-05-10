//@flow

/*
 * People assume that time is a strict progression of cause to effect,
 * but actually from a non-linear, non-subjective viewpoint -
 * it's more like a big ball of wibbly wobbly time-y wimey stuff
 */

export {combine, combine as createStoreObject} from './combine'
export {sample} from './sample'

export type {Domain} from 'effector/domain'
export {createDomain} from 'effector/domain'

export type {Event} from 'effector/event'
export {createEvent, forward, fromObservable} from 'effector/event'

export type {Effect} from 'effector/effect'
export {createEffect} from 'effector/effect'

export type {Store} from 'effector/store'
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
} from 'effector/store'

export {Kind, clearNode, createGraph as createNode, step} from 'effector/stdlib'
export {launch} from 'effector/kernel'
export type {kind} from 'effector/stdlib'

export {
  invariant,
  warning,
  isUnit,
  isStore,
  isEvent,
  isEffect,
  isDomain,
  is,
} from 'effector/validate'
export {version} from 'effector/flags'

//eslint-disable-next-line
export * as blocks from 'effector/blocks'
