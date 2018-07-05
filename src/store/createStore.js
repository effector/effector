//@flow

import invariant from 'invariant'

import $$observable from 'symbol-observable'

import {createEvent, type Event} from 'effector/event'
import {
 cmd as Cmd,
 ctx as Ctx,
 step as Step,
} from 'effector/datatype/FullDatatype.bs'
import type {Store} from './index.h'
import * as Kind from '../kind'
import {createRef, type Ref} from '../ref/createRef'
// import warning from 'warning'

let id = 0
export function createStore<State>(state: State): Store<State> {
 return storeConstructor({
  currentState: state,
 })
}

export function storeConstructor<State>(props: {
 currentState: State,
}): Store<State> {
 const currentId = (++id).toString(36)
 const {currentState} = props
 const defaultState = currentState

 const plainState: Ref<typeof defaultState> = createRef(defaultState)
 const shouldChange = new Cmd.filter({
  filter(newValue, ctx) {
   return newValue !== plainState[1]() && newValue !== undefined
  },
 })
 const cmd = new Cmd.update({
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
  defaultState,
  kind: Kind.STORE,
  id: currentId,
  withProps,
  setState,
  dispatch,
  map,
  on,
  to,
  watch,
  // epic,
  thru,
  subscribe,
  getState,
  reset,
  //$off
  [$$observable]: observable,
 }
 on(updater, (_, payload) => payload)
 function getState(): State {
  return plainState[1]()
 }

 function map<NextState>(
  fn: (state: State, lastState?: NextState) => NextState,
  firstState?: NextState,
 ): Store<NextState> {
  //prettier-ignore
  return mapStore/*::<State, NextState>*/(store, fn, firstState)
 }

 function subscribe(listener) {
  invariant(
   typeof listener === 'function',
   'Expected the listener to be a function.',
  )
  let lastCall = getState()
  let active = true
  const runCmd = Step.single(
   new Cmd.run({
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
  const computeCmd = new Cmd.compute({
   reduce(_, newValue, ctx) {
    const lastState = getState()
    return handler(lastState, newValue, e.getType())
   },
  })
  const filterCmd = new Cmd.filter({
   filter(data, ctx: Ctx.compute) {
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
 firstState?: B,
): Store<B> {
 let lastValue = store.getState()
 let lastResult = fn(lastValue, firstState)
 const innerStore: Store<any> = (createStore: any)(lastResult)
 const computeCmd = Step.single(
  new Cmd.compute({
   reduce(_, newValue, ctx) {
    lastValue = newValue
    const lastState = innerStore.getState()
    const result = fn(newValue, lastState)
    return result
   },
  }),
 )
 const filterCmdPost = Step.single(
  new Cmd.filter({
   filter(result, ctx: Ctx.compute) {
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
