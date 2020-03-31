import {createStore, restore} from 'effector'
import {createLocalStore} from '../lib/createLocalStorage'


export const $csrf = createLocalStore('csrf', '')
export const $githubToken = createLocalStore('github-token', '')
export const $githubUser = createLocalStore('github-user', {
  email: '',
  avatarUrl: '',
  name: '',
})
