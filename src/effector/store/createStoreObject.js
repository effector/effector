//@flow
import {
  step,
  nextBarrierID,
  createStateRef,
  readRef,
  writeRef,
  type StateRef,
  is,
} from '../stdlib'
import {unitObjectName} from '../naming'
import {createLinkNode} from '../event'

import type {Store} from './index.h'
import {storeFabric} from './storeFabric'

type CombinationScope = {
  key: any,
  target: StateRef,
  clone(value: any): any,
  isFresh: StateRef,
  ...
}

const storeCombination = (obj: any, clone: Function, defaultState: any) => {
  const node = [
    step.check.defined(),
    //prettier-ignore
    step.filter({
      fn: (upd, {target, key}: CombinationScope) => (
        upd !== readRef(target)[key]
      ),
    }),
    step.tap({
      fn(upd, {isFresh, target, clone}: CombinationScope) {
        if (readRef(isFresh)) return
        writeRef(target, clone(readRef(target)))
        writeRef(isFresh, true)
      },
    }),
    step.tap({
      fn(upd, {target, key}: CombinationScope) {
        readRef(target)[key] = upd
      },
    }),
    step.barrier({barrierID: nextBarrierID()}),
    step.compute({
      fn(none, {isFresh, target}: CombinationScope) {
        writeRef(isFresh, false)
        return readRef(target)
      },
    }),
  ]
  const stateNew = clone(defaultState)
  const store = storeFabric({
    currentState: stateNew,
    //TODO: add location
    config: {name: unitObjectName(obj)},
  })
  const isFresh = createStateRef(false)
  for (const key in obj) {
    const child = obj[key]
    if (!is.store(child)) {
      stateNew[key] = defaultState[key] = child
      continue
    }
    defaultState[key] = child.defaultState
    stateNew[key] = child.getState()
    createLinkNode(child, store, {
      scope: {key, clone, target: store.stateRef, isFresh},
      node,
    })
  }

  ;(store: any).defaultShape = obj
  ;(store: any).defaultState = defaultState
  return store
}

declare export function createStoreObject<
  State: $ReadOnlyArray<Store<any> | any>,
>(
  obj: State,
): Store<
  $TupleMap<
    State,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
>
declare export function createStoreObject<
  State: {-[key: string]: Store<any> | any, ...},
>(
  obj: State,
): Store<
  $ObjMap<
    State,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
>
//prettier-ignore
export function createStoreObject(obj: *, fn?: Function) {
  const mergedStore = Array.isArray(obj)
    ? storeCombination(
      obj,
      list => list.slice(),
      [],
    )
    : storeCombination(
      obj,
      obj => Object.assign({}, obj),
      {},
    )
  return fn
    ? mergedStore.map(fn)
    : mergedStore
}
