//@flow

import {createDomain, combine, type Store, createStore} from 'effector'

export const domain = createDomain('settings')

export const flowToggle = domain.store<boolean>(false)
export const tsToggle = domain.store<boolean>(false)
export const typeHoverToggle = domain.store<boolean>(false)
export const typechecker: Store<'flow' | 'typescript' | null> = combine(
  tsToggle,
  flowToggle,
  (tsEnabled, flowEnabled) => {
    if (flowEnabled) return 'flow'
    if (tsEnabled) return 'typescript'
    return null
  },
)
export const autoScrollLog = createStore<boolean>(true)
