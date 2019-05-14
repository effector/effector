//@flow

import {is} from '../validate'
import {__DEBUG__} from 'effector/flags'
import type {Store} from './index.h'
import {createName} from '../compositeName'

export function setStoreName<State>(store: Store<State>, rawName: string) {
  const compositeName = createName(rawName, store.domainName)
  store.shortName = rawName
  if (!store.compositeName) {
    store.compositeName = compositeName
    return
  }
  //$todo
  store.compositeName.path = compositeName.path
  //$todo
  store.compositeName.shortName = compositeName.shortName
  //$todo
  store.compositeName.fullName = compositeName.fullName
}

function isStoreObject(store: Store<any>) {
  return (
    is.store(store)
    //$todo
    && typeof store.defaultShape !== 'undefined'
  )
}

export function storeNaming<Obj: {[key: string]: Store<any> | Object}>(
  object: Obj,
  parent?: Store<any>,
) {
  for (const storeName in object) {
    const store: Store<any> = object[storeName]
    if (parent && is.store(store)) {
      store.domainName = parent.compositeName || store.domainName
    }

    if (isStoreObject(store)) {
      setStoreName(store, storeName)
      //$todo
      storeNaming(store.defaultShape, store)
      continue
    }

    if (is.store(store)) {
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
