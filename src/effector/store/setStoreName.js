//@flow

import {is} from '../validate'
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

export function storeNaming<Obj: {[key: string]: Store<any> | Object, ...}>(
  object: Obj,
  parent?: Store<any>,
) {
  for (const storeName in object) {
    const store: Store<any> = object[storeName]
    if (!is.store(store)) {
      console.warn(
        'effector: Key "%s" must be store but instead received %s',
        storeName,
        store.kind || '"' + typeof store + '"',
        store,
      )
      continue
    }
    if (parent) {
      store.domainName = parent.compositeName || store.domainName
    }
    setStoreName(store, storeName)
    if (store.defaultShape !== undefined) {
      storeNaming(store.defaultShape, store)
    }
  }
}
