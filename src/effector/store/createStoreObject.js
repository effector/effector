//@flow
import {
  step,
  nextBarrierID,
  createStateRef,
  readRef,
  writeRef,
  createCrosslink,
  type StateRef,
} from '../stdlib'
import {is} from '../validate'
import {unitObjectName} from '../naming'
import {createLink} from '../event'

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
    //prettier-ignore
    step.filter({
      fn: (upd, {target, key}: CombinationScope) => (
        upd !== readRef(target)[key]
      && upd !== undefined
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
    createLink(child, {
      scope: {key, clone, target: store.stateRef, isFresh},
      node,
      child: [store],
      family: createCrosslink([store, child], [store]),
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
//eslint-disable-next-line
declare export function extract<
  State: $ReadOnlyArray<Store<any> | any>,
  NextState: $ReadOnlyArray<Store<any> | any>,
>(
  store: Store<State>,
  extractor: (_: State) => NextState,
): Store<
  $TupleMap<
    NextState,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
>
declare export function extract<
  State: {-[key: string]: Store<any> | any, ...},
  NextState: {-[key: string]: Store<any> | any, ...},
>(
  obj: Store<State>,
  extractor: (_: State) => NextState,
): Store<
  $ObjMap<
    NextState,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
>
export function extract(store: Store<any>, extractor: any => any) {
  let result
  if ('defaultShape' in store) result = extractor((store: any).defaultShape)
  else result = extractor((store: any).defaultState)
  return createStoreObject(result)
}
