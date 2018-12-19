//@flow

import type {Store} from './index.h'
import {Kind} from 'effector/stdlib/kind'
import {__DEBUG__} from 'effector/flags'
import {type CompositeName, createName} from '../compositeName'

export function setStoreName<State>(store: Store<State>, rawName: string) {
  const compositeName = createName(rawName, store.domainName)
  store.shortName = rawName
  store.compositeName = compositeName
}

function isStoreObject(store: Store<any>) {
  return (
    typeof store.kind !== 'undefined'
    && store.kind === Kind.store
    && typeof store.defaultShape !== 'undefined'
  )
}

export function storeNaming<Obj: {[key: string]: Store<any> | Object}>(
  object: Obj,
  parent?: Store<any>,
) {
  const entries: Array<[string, Store<any>]> = (Object.entries(object): any)
  for (const [storeName, store] of entries) {
    if (parent && store.kind === Kind.store) {
      store.domainName = parent.compositeName || store.domainName
    }

    if (isStoreObject(store)) {
      setStoreName(store, storeName)
      storeNaming(store.defaultShape, store)
      continue
    }

    if (store.kind === Kind.store) {
      setStoreName(store, storeName)
      continue
    }

    if (__DEBUG__)
      console.warn(
        'effector: Key "%s" must be store but instead received %s',
        storeName,
        store.kind || '"' + typeof store + '"',
        store,
      )
  }
}
