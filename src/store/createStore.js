//@flow

import invariant from 'invariant'
// import type {ComponentType, Node} from 'react'
import {from} from 'most'
import $$observable from 'symbol-observable'

import {createEvent} from 'effector/event'
import * as Cmd from '../effector/datatype/cmd'
import * as Ctx from '../effector/datatype/context'
import * as Step from '../effector/datatype/step'
import type {Event, Store} from '../effector/index.h'
import * as Kind from '../kind'
import {atom, type Atom} from '../effector/atom'
// import warning from 'warning'

export type Nest = {
 get(): any,
 set(state: any, action: any): any,
}
let id = 0
export function createStore<State>(state: State): Store<State> {
 return storeConstructor({
  currentReducer: _ => _,
  currentState: state,
 })
}

export function storeConstructor<State>(props: {
 currentReducer: Function,
 currentState: State,
}): Store<State> {
 const currentId = (++id).toString(36)
 const {currentState} = props
 let currentReducer = props?.currentReducer
 const defaultState = currentState

 const plainState: Atom<typeof defaultState> = atom(defaultState)
 const shouldChange: Cmd.Filter = Cmd.filter({
  filter(newValue, ctx) {
   return newValue !== plainState.get() && newValue !== undefined
  },
 })
 const cmd: Cmd.Update = Cmd.update({
  store: plainState,
 })
 const filterStep: Step.Single = Step.single(shouldChange)
 const singleStep: Step.Single = Step.single(cmd)
 const nextSteps: Step.Multi = Step.multi()
 const fullSeq: Step.Seq = Step.seq([filterStep, singleStep, nextSteps])

 const updater: any = createEvent(`update ${currentId}`)

 const store = {
  graphite: {
   next: nextSteps,
   seq: fullSeq,
  },
  kind: Kind.STORE,
  id: currentId,
  withProps,
  setState,
  dispatch,
  map,
  on,
  to,
  watch,
  epic,
  thru,
  subscribe,
  getState,
  replaceReducer,
  reset,
  //$off
  [$$observable]: observable,
 }
 on(updater, (_, payload) => payload)
 function getState(): State {
  return plainState.get()
 }

 function map<NextState>(
  fn: (state: State, lastState?: NextState) => NextState,
 ): Store<NextState> {
  //prettier-ignore
  return mapStore/*::<State, NextState>*/(store, fn)
 }

 function subscribe(listener) {
  invariant(
   typeof listener === 'function',
   'Expected the listener to be a function.',
  )
  let lastCall = getState()
  let active = true
  const runCmd = Step.single(
   Cmd.run({
    runner(args) {
     if (args === lastCall || !active) return
     lastCall = args
     try {
      listener(args)
     } catch (err) {
      console.error(err)
     }
    },
   }),
  )
  store.graphite.next.data.add(runCmd)
  listener(lastCall)
  function unsubscribe() {
   active = false
   store.graphite.next.data.delete(runCmd)
  }
  unsubscribe.unsubscribe = unsubscribe
  //$off
  return (unsubscribe: {
   (): void,
   unsubscribe(): void,
  })
 }

 function dispatch(action) {
  if (action === undefined || action === null) return action
  if (typeof action.type !== 'string' && typeof action.type !== 'number')
   return action

  return action
 }

 function replaceReducer(nextReducer) {
  invariant(
   typeof nextReducer === 'function',
   'Expected the nextReducer to be a function.',
  )

  currentReducer = nextReducer
  updater(getState())
  // dispatch({type: REPLACE})
 }

 function observable() {
  return {
   subscribe(observer) {
    invariant(
     typeof observer === 'object' && observer !== null,
     'Expected the observer to be an object.',
    )

    function observeState(state) {
     if (observer.next) {
      observer.next(state)
     }
    }
    return subscribe(observeState)
   },
   //$off
   [$$observable]() {
    return this
   },
  }
 }

 function reset(event) {
  return on(event, () => defaultState)
 }

 function on(event: any, handler: Function) {
  const e: Event<any> = event
  const computeCmd = Cmd.compute({
   reduce(_, newValue, ctx) {
    const lastState = getState()
    return handler(lastState, newValue, e.getType())
   },
  })
  const filterCmd = Cmd.filter({
   filter(data, ctx: Ctx.ComputeContext) {
    // const oldValue = ctx.data.args[1]
    const lastState = getState()
    return data !== lastState && data !== undefined
   },
  })
  const step = Step.single(computeCmd)
  const filtStep = Step.single(filterCmd)
  const nextSeq = Step.seq([step, filtStep, ...store.graphite.seq.data])
  e.graphite.next.data.add(nextSeq)
  const unsub = () => {
   e.graphite.next.data.delete(nextSeq)
  }
  return store
 }

 function withProps(fn: Function) {
  return props => fn(getState(), props)
 }

 function to(action: any, reduce) {
  const needReduce = Kind.isStore(action) && typeof reduce === 'function'
  return watch(data => {
   if (!needReduce) {
    action(data)
   } else {
    const lastState = action.getState()
    const reduced = reduce(lastState, data)
    if (lastState !== reduced) action.setState(reduced)
   }
  })
 }
 function watch<E>(eventOrFn: Event<E> | Function, fn?: Function) {
  switch (Kind.readKind(eventOrFn)) {
   case (2: Kind.Event):
   case (3: Kind.Effect):
    if (typeof fn === 'function') {
     return eventOrFn.watch(payload =>
      fn(store.getState(), payload, eventOrFn.getType()),
     )
    } else throw new TypeError('watch requires function handler')

   default:
    if (typeof eventOrFn === 'function') {
     return subscribe(eventOrFn)
    } else throw new TypeError('watch requires function handler')
  }
 }

 function epic<E>(event: Event<E>, fn: Function) {
  return epicStore(event, store, fn)
 }
 function stateSetter(_, payload) {
  return payload
 }
 function setState(value, reduce?: Function) {
  const currentReducer = typeof reduce === 'function' ? reduce : stateSetter
  const state = getState()
  const newResult = currentReducer(state, value)

  setter(state, newResult)
 }
 function setter(oldState, newState) {
  if (newState === undefined || newState === oldState) return
  updater(newState)
 }

 function thru(fn: Function) {
  return fn(store)
 }

 return store
}

function mapStore<A, B>(
 store: Store<A>,
 fn: (state: A, lastState?: B) => B,
): Store<B> {
 let lastValue = store.getState()
 let lastResult = fn(lastValue)
 const innerStore: Store<any> = (createStore: any)(lastResult)
 const computeCmd = Step.single(
  Cmd.compute({
   reduce(_, newValue, ctx) {
    lastValue = newValue
    const lastState = innerStore.getState()
    const result = fn(newValue, lastState)
    return result
   },
  }),
 )
 const filterCmdPost = Step.single(
  Cmd.filter({
   filter(result, ctx: Ctx.ComputeContext) {
    const lastState = innerStore.getState()
    const isChanged = result !== lastState && result !== undefined
    if (isChanged) {
     lastResult = result
    }
    return isChanged
   },
  }),
 )
 const nextSeq = Step.seq([
  computeCmd,
  filterCmdPost,
  ...innerStore.graphite.seq.data,
 ])
 store.graphite.next.data.add(nextSeq)
 const off = () => {
  store.graphite.next.data.delete(nextSeq)
 }
 return innerStore
}

function epicStore(event, store, fn: Function) {
 const store$ = from(store).multicast()
 const event$ = from(event).multicast()
 const mapped$ = fn(event$, store$).multicast()
 const innerStore = (createStore: any)(store.getState())
 const subs = mapped$.subscribe({
  next(value) {
   innerStore.setState(value)
  },
  error(err) {
   console.error(err)
  },
  complete() {
   subs()
  },
 })
 return innerStore
}
