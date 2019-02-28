//@flow

export {storeFabric} from './storeFabric'
export {normalizeConfig} from './storeConfig'
export {createStore} from './createStore'
export {setStoreName, storeNaming} from './setStoreName'
export {createStoreObject, extract} from './createStoreObject'
export {createApi} from './createApi'
export {restore, restoreEvent, restoreEffect, restoreObject} from './restore'

export {withProps, getDisplayName} from './staticMethods'

export type {Config as StoreConfig} from './storeConfig'
export type {Store} from './index.h'
