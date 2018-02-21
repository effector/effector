//@flow

export type {Event, Effect, Domain, Reducer, Store} from './index.h'
export {
  createDomain,
  createRootDomain,
} from './domain'
export {effectorMiddleware} from './middleware'
export {createReducer} from './reducer'
export {joint} from './joint'
export {createHaltAction} from './config'


// Experimental API

export {
  createEvent,
  createEffect,
} from './default-domain'

export type {
  DomainAuto,
  EffectAuto,
  EventAuto,
} from './default-domain'


export {mill} from './mill'
export type {MillType} from './mill'
