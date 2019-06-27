// @flow

import {combine, type Store, createDomain} from 'effector'

const domain = createDomain('settings')

domain.onCreateStore(store => {
  const snapshot = localStorage.getItem(store.compositeName.fullName)
  if (snapshot != null) {
    const data = JSON.parse(snapshot)
    store.setState(data)
  }

  store.updates.watch(newState => {
    localStorage.setItem(store.compositeName.fullName, JSON.stringify(newState))
  })
  return store
})

export const flowToggle = domain.store<boolean>(false)
export const flowToggleChange = domain.event<SyntheticEvent<HTMLInputElement>>()

export const tsToggle = domain.store<boolean>(false)
export const tsToggleChange = domain.event<SyntheticEvent<HTMLInputElement>>()

export const typeHoverToggle = domain.store<boolean>(false)
export const typeHoverToggleChange = domain.event<
  SyntheticEvent<HTMLInputElement>,
>()

export const typechecker: Store<'flow' | 'typescript' | null> = combine(
  tsToggle,
  flowToggle,
  (tsEnabled, flowEnabled) => {
    if (flowEnabled) return 'flow'
    if (tsEnabled) return 'typescript'
    return null
  },
)
