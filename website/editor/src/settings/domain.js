// @flow

import {combine, type Store, type Effect, createDomain} from 'effector'

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

export const clickPrettify = domain.event<any>()
export const prettier: Effect<string, string, Error> = domain.effect()
export const prettierButtonStatus: Store<{
  text: string,
  disabled: boolean,
}> = prettier.pending.map(pending =>
  pending
    ? {
      text: 'In progress',
      disabled: true,
    }
    : {
      text: 'Prettify',
      disabled: false,
    },
)
