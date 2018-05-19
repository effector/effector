//@flow

// import invariant from 'invariant'

import * as Cmd from '../effector/datatype/cmd'
import * as Step from '../effector/datatype/step'
import {createEvent} from 'effector/event'
import type {Event, Store} from '../effector/index.h'
import * as Kind from '../kind'
import {storeConstructor} from './createStore'

export function createStoreObject<State>(obj: State): Store<State> {
 const isArray = Array.isArray(obj)
 const state = isArray ? [...obj] : {...obj}
 const stateNew = isArray ? [...obj] : {...obj}

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
 const iter = isArray ? state.map((e, i) => [i, e]) : Object.entries(state)
 for (const [key, child] of iter) {
  if (Kind.isStore(child)) {
   const substore: Store<any> = (child: any)
   const runCmd = Cmd.run({
    runner(newValue) {},
   })
   runCmd.data.transactionContext = data => {
    if (isArray) {
     updates.push(state => {
      const nextState = [...state]
      nextState[key] = data
      return nextState
     })
    } else {
     updates.push(state => ({
      ...state,
      [key]: data,
     }))
    }
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
