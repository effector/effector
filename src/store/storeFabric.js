//@flow

import invariant from 'invariant'
import * as perf from 'effector/perf'

import {Kind, type kind} from 'effector/stdlib/kind'

import {makeVisitorRecordMap} from 'effector/stdlib/visitor'

import $$observable from 'symbol-observable'

import {createEvent, type Event} from 'effector/event'
import {Step} from 'effector/graphite/typedef'
import type {TypeDef} from 'effector/stdlib/typedef'
import type {Store} from './index.h'
import {setStoreName} from './setStoreName'
import {createRef, type Ref} from '../ref/createRef'
import {type CompositeName} from '../compositeName'
// import warning from 'warning'

import * as Box from './StepBox'

let id = 0

export function storeFabric<State>(props: {
  currentState: State,
  name?: string,
  parent?: CompositeName,
}): Store<State> {
  const currentId = (++id).toString(36)
  const {currentState, name, parent} = props
  const defaultState = currentState

  const plainState: Ref<typeof defaultState> = createRef(defaultState)
  const subscribers = new Map()
  const shouldChange = Box.filter(
    (newValue, ctx) => newValue !== undefined && newValue !== plainState[1](),
  )
  const cmd = Box.update(plainState)
  const bx = new Box.StepBox()
    .modeSeq()
    .push(shouldChange)
    .push(cmd)
    .modePar()

  const updater: any = createEvent(`update ${currentId}`)

  const store = {
    graphite: {
      next: bx.current,
      seq: bx.prime,
    },
    defaultState,
    kind: Kind.store,
    id: currentId,
    shortName: currentId,
    domainName: parent,
    withProps,
    setState,
    map,
    on,
    off,
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
  if (name) setStoreName(store, name)
  ;(store: any).dispatch = dispatch
  on(updater, (_, payload) => payload)
  function getState() {
    return plainState[1]()
  }

  const visitors = makeVisitorRecordMap({
    to: {
      visitor: {
        store(action, reduce) {
          const needReduce = typeof reduce === 'function'
          return watch(data => {
            if (!needReduce) {
              action(data)
            } else {
              const lastState = action.getState()
              const reduced = reduce(lastState, data)
              if (lastState !== reduced) action.setState(reduced)
            }
          })
        },
        __(action, reduce) {
          return watch(data => {
            action(data)
          })
        },
      },
      reader(eventOrFn) {
        if (typeof eventOrFn === 'function') {
          if (typeof eventOrFn.kind !== 'undefined')
            return ((eventOrFn.kind: any): kind)
        } else if (typeof eventOrFn === 'object' && eventOrFn !== null) {
          if ('kind' in eventOrFn) return (eventOrFn.kind: kind)
        }
      },
      writer: (handler, action, reduce) => handler(action, reduce),
    },
    watch: {
      visitor: {
        event(eventOrFn, fn) {
          if (typeof fn === 'function') {
            return eventOrFn.watch(payload =>
              fn(store.getState(), payload, eventOrFn.getType()),
            )
          } else throw new TypeError('watch requires function handler')
        },
        effect(eventOrFn, fn) {
          if (typeof fn === 'function') {
            return eventOrFn.watch(payload =>
              fn(store.getState(), payload, eventOrFn.getType()),
            )
          } else throw new TypeError('watch requires function handler')
        },
        __(eventOrFn, fn) {
          if (typeof eventOrFn === 'function') {
            return subscribe(eventOrFn)
          } else throw new TypeError('watch requires function handler')
        },
      },
      reader(eventOrFn) {
        if (typeof eventOrFn === 'function') {
          if (typeof eventOrFn.kind !== 'undefined')
            return ((eventOrFn.kind: any): kind)
        } else if (typeof eventOrFn === 'object' && eventOrFn !== null) {
          if ('kind' in eventOrFn) return (eventOrFn.kind: kind)
        }
      },
      writer: (handler, eventOrFn, fn) => handler(eventOrFn, fn),
    },
  })

  function map<NextState>(
    fn: (state: State, lastState?: NextState) => NextState,
    firstState?: NextState,
  ): Store<NextState> {
    //prettier-ignore
    return mapStore/*::<State, NextState>*/(store, fn, firstState)
  }

  function subscribe(listener) {
    if (__DEV__)
      perf.beginMark(
        `Start ${getDisplayName(store)} subscribe (id: ${store.id})`,
      )
    invariant(
      typeof listener === 'function',
      'Expected the listener to be a function.',
    )
    let lastCall = getState()
    let active = true
    const runCmd = Step.single(
      Box.run({
        runner(args) {
          if (args === lastCall || !active) return
          lastCall = args
          try {
            listener(args)
            if (__DEV__)
              perf.endMark(
                `Call ${getDisplayName(store)} subscribe listener (id: ${
                  store.id
                })`,
                `Start ${getDisplayName(store)} subscribe (id: ${store.id})`,
              )
          } catch (err) {
            console.error(err)
            if (__DEV__)
              perf.endMark(
                `Got error on ${getDisplayName(store)} subscribe (id: ${
                  store.id
                })`,
                `Start ${getDisplayName(store)} subscribe (id: ${store.id})`,
              )
          }
        },
      }),
    )
    store.graphite.next.data.push(runCmd)
    listener(lastCall)
    function unsubscribe() {
      active = false
      const i = store.graphite.next.data.indexOf(runCmd)
      if (i === -1) return
      store.graphite.next.data.splice(i, 1)
    }
    unsubscribe.unsubscribe = unsubscribe
    //$off
    return (unsubscribe: {
      (): void,
      unsubscribe(): void,
    })
  }

  function dispatch(action) {
    // if (action === undefined || action === null) return action
    // if (typeof action.type !== 'string' && typeof action.type !== 'number')
    //  return action

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
  function off(event: Event<any>) {
    const currentSubscription = subscribers.get(event)
    if (currentSubscription === undefined) return
    currentSubscription()
    subscribers.delete(event)
  }
  function on(event: any, handler: Function) {
    const e: Event<any> = event
    off(e)
    const computeCmd = Box.compute((_, newValue, ctx) => {
      const lastState = getState()
      return handler(lastState, newValue, e.getType())
    })
    const filterCmd = Box.filter((data, ctx: TypeDef<'compute', 'ctx'>) => {
      const lastState = getState()
      return data !== lastState && data !== undefined
    })
    const step = Step.single(computeCmd)
    const filtStep = Step.single(filterCmd)
    const nextSeq = Step.seq([step, filtStep, ...store.graphite.seq.data])
    e.graphite.next.data.push(nextSeq)

    subscribers.set(e, () => {
      const i = e.graphite.next.data.indexOf(nextSeq)
      if (i === -1) return
      e.graphite.next.data.splice(i, 1)
    })
    return store
  }

  function withProps(fn: Function) {
    return props => fn(getState(), props)
  }

  function to(action: any, reduce) {
    return visitors.to(action, reduce)
  }
  function watch(eventOrFn: Event<*> | Function, fn?: Function) {
    return visitors.watch(eventOrFn, fn)
  }

  function stateSetter(_, payload) {
    return payload
  }
  function setState(value, reduce?: Function) {
    const currentReducer = typeof reduce === 'function' ? reduce : stateSetter
    const state = getState()
    const newResult = currentReducer(state, value)

    updater(newResult)
  }

  function thru(fn: Function) {
    return fn(store)
  }

  return store
}

export function getDisplayName<A>(store: Store<A>) {
  if (store.compositeName) {
    return store.compositeName.fullName
  }
  if (store.domainName) {
    return store.domainName.fullName
  }
  return store.id
}

function mapStore<A, B>(
  store: Store<A>,
  fn: (state: A, lastState?: B) => B,
  firstState?: B,
): Store<B> {
  if (__DEV__)
    perf.beginMark(`Start ${getDisplayName(store)} map (id: ${store.id})`)
  let lastValue = store.getState()
  let lastResult = fn(lastValue, firstState)
  const innerStore: Store<any> = storeFabric({
    name: `${store.shortName} → *`,
    currentState: lastResult,
    parent: store.domainName,
  })
  const computeCmd = Step.single(
    Box.compute((_, newValue, ctx) => {
      lastValue = newValue
      const lastState = innerStore.getState()
      const result = fn(newValue, lastState)
      if (__DEV__)
        perf.endMark(
          `Map ${getDisplayName(store)} (id: ${store.id})`,
          `Start ${getDisplayName(store)} subscribe (id: ${store.id})`,
        )
      return result
    }),
  )
  const filterCmdPost = Step.single(
    Box.filter((result, ctx: TypeDef<'compute', 'ctx'>) => {
      const lastState = innerStore.getState()
      const isChanged = result !== lastState && result !== undefined
      if (isChanged) {
        lastResult = result
      }
      return isChanged
    }),
  )
  const nextSeq = Step.seq([
    computeCmd,
    filterCmdPost,
    ...innerStore.graphite.seq.data,
  ])
  store.graphite.next.data.push(nextSeq)
  const off = () => {
    const i = store.graphite.next.data.indexOf(nextSeq)
    if (i === -1) return
    store.graphite.next.data.splice(i, 1)
  }
  return innerStore
}
