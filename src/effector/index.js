//@flow

export {createRootDomain as createDomain} from './domain'

export {createEffect} from 'effector/effect'
export {createEvent} from 'effector/event'

export {combine} from './combine'

export * from './index.h'

export {
 createStore,
 createReduxStore,
 applyMiddleware,
 compose,
 createStoreObject,
} from 'effector/store'
