// @flow

import {createStore, createApi} from 'effector'
import {mediaMatcher} from '../mediaMatcher'

export const isDesktopChanges = mediaMatcher('(min-width: 700px)')

export const tab = createStore<
  'graphite' | 'dom' | 'share' | 'editor' | 'outline' | 'settings',
>(isDesktopChanges.getState() ? 'dom' : 'editor')

tab.on(isDesktopChanges, (state, isDesktop) => {
  if (state === 'editor' && isDesktop) return 'dom'
  if (state === 'outline' && isDesktop) return 'dom'
  return state
})

export const tabApi = createApi(tab, {
  showOutline: () => 'outline',
  showEditor: () => 'editor',
  showGraphite: () => 'graphite',
  showDOM: () => 'dom',
  showShare: () => 'share',
  showSettings: () => 'settings',
})
