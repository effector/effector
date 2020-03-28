import {createStore} from 'effector'
import {createLocalStore} from '../lib/createLocalStorage'


export const $gistApiKey = createLocalStore('gist', '')
export const $gistRemember = createStore(false)
export const $gistAuth = createStore(false)
