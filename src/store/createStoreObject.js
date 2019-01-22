//@flow
//@jsx fx
//eslint-disable-next-line no-unused-vars
import {fx, Kind} from 'effector/stdlib'

import {createEvent, forward} from 'effector/event'
import type {Store} from './index.h'
import {storeObjectName, storeObjectArrayName} from './setStoreName'
import {storeFabric} from './storeFabric'

function createStoreArray<State: $ReadOnlyArray<Store<any> | any>>(
  obj: State,
): Store<
  $TupleMap<
    State,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
> {
  const state = [...obj]
  const stateNew = [...obj]

  const updater: any = createEvent('update ' + Math.random().toString())

  let updates: Array<(state: any) => any> = []
  const committer = () => {
    updates = []
    return () => {
      let current = store.getState()
      for (const fn of updates) {
        current = fn(current)
      }
      commit = committer()
      updater(current)
    }
  }
  let commit = committer()
  for (const [key, child] of state.map((e, i) => [i, e])) {
    if (child.kind === Kind.store) {
      const substore: Store<any> = (child: any)
      //eslint-disable-next-line no-unused-vars
      const runCmd = <run runner={newValue => {}} />
      runCmd.data.data.transactionContext = data => {
        updates.push(state => {
          const nextState = [...state]
          nextState[key] = data
          return nextState
        })
        return commit
      }
      stateNew[key] = substore.getState()
      //$todo
      forward({
        from: substore,
        to: {
          graphite: {seq: runCmd},
        },
      })
    }
  }
  const name = storeObjectArrayName(obj)
  const store = storeFabric({
    name,
    currentState: stateNew,
  })
  //$todo
  store.defaultShape = obj
  store.on(updater, (_, payload) => payload)
  return store
}

function createStoreObjectMap<State: {-[key: string]: Store<any> | any}>(
  obj: State,
): Store<
  $ObjMap<
    State,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
> {
  const state = Object.assign({}, obj)
  const stateNew = Object.assign({}, obj)

  const updater: any = createEvent('update ' + Math.random().toString())

  let updates: Array<(state: any) => any> = []
  const committer = () => {
    updates = []
    return () => {
      let current = store.getState()
      for (const fn of updates) {
        current = fn(current)
      }
      commit = committer()
      updater(current)
    }
  }
  let commit = committer()
  for (const [key, child] of Object.entries(state)) {
    const substore: Store<any> = (child: any)
    if (substore.kind !== Kind.store) continue
    //eslint-disable-next-line no-unused-vars
    const runCmd = <run runner={newValue => {}} />
    runCmd.data.data.transactionContext = data => {
      updates.push(state =>
        Object.assign({}, state, {
          [key]: data,
        }),
      )
      return commit
    }
    stateNew[key] = substore.getState()
    //$todo
    forward({
      from: substore,
      to: {
        graphite: {seq: runCmd},
      },
    })
  }
  //$todo
  const name = storeObjectName(obj)
  const store = storeFabric({
    name,
    currentState: stateNew,
  })
  //$todo
  store.defaultShape = obj
  store.on(updater, (_, payload) => payload)
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
  State: {-[key: string]: Store<any> | any},
>(
  obj: State,
): Store<
  $ObjMap<
    State,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
>
export function createStoreObject(obj: *) {
  if (Array.isArray(obj)) {
    return createStoreArray(obj)
  }
  return createStoreObjectMap(obj)
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
  State: {-[key: string]: Store<any> | any},
  NextState: {-[key: string]: Store<any> | any},
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
