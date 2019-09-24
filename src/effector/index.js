//@flow

/*
 * People assume that time is a strict progression of cause to effect,
 * but actually from a non-linear, non-subjective viewpoint -
 * it's more like a big ball of wibbly wobbly time-y wimey stuff
 */

export {combine, combine as createStoreObject} from './combine'
export {sample} from './sample'
export {split} from './split'
export {merge} from './merge'
export {forward} from './forward'
export {fromObservable} from './fromObservable'
export {createDomain} from './domain'
export {createEvent} from './event'
export {createEffect} from './effect'
export {createStore} from './store'
export {restore, restoreEvent, restoreEffect, restoreObject} from './restore'
export {setStoreName} from './naming'
export {createApi} from './createApi'
export {Kind, createNode, step, is} from './stdlib'
export {clearNode} from './clearNode'
export {launch} from './kernel'
export {version} from './flags'
//eslint-disable-next-line
export * as blocks from './blocks'

export type {Store, Event, Effect, Domain} from './unit.h'
export type {kind} from './stdlib'
