// @flow

import {createEvent, createStore, createDomain} from 'effector'

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

console.log(domain, flowToggle)
