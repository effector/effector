import {createStore} from 'effector'
import {createLocalStore} from '~/lib/local-store'

const shareListBackup = localStorage.getItem('share-list-backup')

if (!shareListBackup) {
  const shareListOrigin = localStorage.getItem('share-list') || '{}'
  localStorage.setItem('share-list-backup', shareListOrigin)
}

export const $shareList = createLocalStore('share-list', {})
export const $hiddenShareList = createLocalStore('share-list-hidden', {})
export const $currentShareId = createStore(null)
export const $shareDescription = createStore('')

export const $filterMode = createLocalStore<Boolean>('filter-mode', true)
