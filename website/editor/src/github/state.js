import {createStore, restore} from 'effector'
import {createLocalStore} from '../lib/createLocalStorage'

export const initialUserInfo = {
  id: '',
  avatarUrl: '',
  name: '',
  url: ''
}

export const $csrf = createLocalStore('csrf', '')
export const $githubToken = createLocalStore('github-token', '')
export const $githubUser = createLocalStore('github-user', initialUserInfo)
