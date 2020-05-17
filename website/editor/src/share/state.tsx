import {createStore} from 'effector'
import {createLocalStore} from '../lib/createLocalStorage'


export const $shareList = createLocalStore('share-list', {})
export const $currentShareId = createStore(null)
export const $shareDescription = createStore('')
