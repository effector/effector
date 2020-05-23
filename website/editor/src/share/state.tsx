import {createStore} from 'effector'
import {createLocalStore} from '~/lib/local-store'

export const $shareList = createLocalStore('share-list', {})
export const $currentShareId = createStore(null)
export const $shareDescription = createStore('')
