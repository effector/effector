//@flow

export type {Event, Effect, Domain, Reducer, Store} from './index.h'
export {createDomain, createRootDomain} from './domain'
export {effectorMiddleware} from './middleware'
export {createReducer} from './reducer'
export {combine, joint} from './combine'
export {createHaltAction} from './config'

// Experimental API

export {createEvent, createEffect} from './default-domain'

export type {DomainAuto, EffectAuto, EventAuto} from './default-domain'

export {mill, collect} from './collect'
export type {CollectType, CollectType as MillType} from './collect'
