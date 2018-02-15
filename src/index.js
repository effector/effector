//@flow

export type {Event, Effect, Domain, Reducer, Store} from './index.h'
export {
  createDomain,
  rootDomain,
  rootDomain as createRootDomain,
} from './domain'
export {effectorMiddleware} from './middleware'
export {createReducer} from './reducer'
export {joint} from './joint'
