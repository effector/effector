//@flow

export {createRootDomain as createDomain} from './domain'

export {createEvent, createEffect} from './default-domain'

export {combine} from './combine'

export * from './index.h'

export {
 createStore,
 createReduxStore,
 applyMiddleware,
 compose,
 createStoreObject,
} from '../store'
