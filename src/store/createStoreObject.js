//@flow

import {cmd as Cmd, step as Step} from 'effector/datatype/FullDatatype.bs'
import {createEvent} from 'effector/event'
import type {Store} from './index.h'
import * as Kind from '../kind'
import {storeFabric, getDisplayName} from './storeFabric'

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

  const updater: any = createEvent(`update ${Math.random().toString()}`)

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
    if (Kind.isStore(child)) {
      const substore: Store<any> = (child: any)
      const runCmd = new Cmd.run({
        runner(newValue) {},
      })
      runCmd.data.transactionContext = data => {
        updates.push(state => {
          const nextState = [...state]
          nextState[key] = data
          return nextState
        })
        return commit
      }
      stateNew[key] = substore.getState()
      substore.graphite.next.data.push(Step.single(runCmd))
    }
  }
  const name = `combine(${obj
    .map(store => {
      if (!Kind.isStore(store)) return store.toString()
      return getDisplayName(store)
    })
    .join(', ')})`
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
  const state = {...obj}
  const stateNew = {...obj}

  const updater: any = createEvent(`update ${Math.random().toString()}`)

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
    if (!Kind.isStore(child)) continue
    const substore: Store<any> = (child: any)
    const runCmd = new Cmd.run({
      runner(newValue) {},
    })
    runCmd.data.transactionContext = data => {
      updates.push(state => ({
        ...state,
        [key]: data,
      }))
      // commit()
      return commit
    }
    stateNew[key] = substore.getState()
    substore.graphite.next.data.push(Step.single(runCmd))
  }
  const name = `combine(${(Object.values(obj): Array<$Values<typeof obj>>)
    .map(store => {
      if (!Kind.isStore(store)) return store.toString()
      return getDisplayName(store)
    })
    .join(', ')})`
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
