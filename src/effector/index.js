//@flow

export {createRootDomain as createDomain} from './domain'

export {createEffect} from '../effect'
export {createEvent} from '../event'

export {combine} from './combine'

export * from './index.h'

export {
 createStore,
 createReduxStore,
 applyMiddleware,
 compose,
 createStoreObject,
} from '../store'
