//@flow

// import invariant from 'invariant'

import * as Cmd from '../effector/datatype/cmd'
import * as Step from '../effector/datatype/step'
import {createEvent} from 'effector/event'
import type {Store} from './index.h'
import * as Kind from '../kind'
import {storeConstructor} from './createStore'

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
   const runCmd = Cmd.run({
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
   substore.graphite.next.data.add(Step.single(runCmd))
  }
 }
 const store = storeConstructor({
  currentReducer: _ => _,
  currentState: stateNew,
 })
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
  if (Kind.isStore(child)) {
   const substore: Store<any> = (child: any)
   const runCmd = Cmd.run({
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
   substore.graphite.next.data.add(Step.single(runCmd))
  }
 }
 const store = storeConstructor({
  currentReducer: _ => _,
  currentState: stateNew,
 })
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
