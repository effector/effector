//@flow

export {combine, sample} from './effector'

export type {Domain} from 'effector/domain'
export {createDomain} from 'effector/domain'

export type {Event} from 'effector/event'
export {
  createEvent,
  forward,
  fromObservable,
  relay,
  relayShape,
} from 'effector/event'

export type {Effect} from 'effector/effect'
export {createEffect} from 'effector/effect'

export type {Store} from 'effector/store'
export {
  createStore,
  createStoreObject,
  setStoreName,
  extract,
  createApi,
  restore,
  restoreEvent,
  restoreEffect,
  restoreObject,
  withProps,
} from 'effector/store'

export {
  Kind,
  isUnit,
  isStore,
  isEvent,
  isEffect,
  isDomain,
} from 'effector/stdlib'
export type {kind} from 'effector/stdlib'
export {version} from 'effector/flags'
