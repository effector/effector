//@flow

export {createRootDomain as createDomain} from './domain'

export {createEvent, createEffect} from './default-domain'

export {combine} from './combine'

export {
 createStore,
 createReduxStore,
 applyMiddleware,
 compose,
 createStoreObject,
} from '../store'
