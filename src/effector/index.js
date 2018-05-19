//@flow

export {createRootDomain as createDomain} from './domain'

export {createEvent} from './default-domain'
export {createEffect} from '../effect'

export {combine} from './combine'

export * from './index.h'

export {
 createStore,
 createReduxStore,
 applyMiddleware,
 compose,
 createStoreObject,
} from '../store'
