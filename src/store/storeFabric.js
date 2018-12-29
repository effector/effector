//@flow
//@jsx fx
//eslint-disable-next-line no-unused-vars
import fx from 'effector/stdlib/fx'

import invariant from 'invariant'
import {beginStoreMark, endStoreMark} from 'effector/perf'

import {Kind} from 'effector/stdlib/kind'
import {pushNext} from 'effector/stdlib/typedef'

import $$observable from 'symbol-observable'

import {createStateRef} from 'effector/stdlib/stateref'
import {createEvent, type Event} from 'effector/event'
import type {Store} from './index.h'
import {setStoreName} from './setStoreName'
import {type CompositeName} from '../compositeName'

export function storeFabric<State>(props: {
  currentState: State,
  name?: string,
  parent?: CompositeName,
}): Store<State> {
  const {currentState, name, parent} = props
  const plainState = createStateRef(currentState)
  const currentId = plainState.id
  const defaultState = currentState

  const subscribers = new Map()
  const def = {}
  def.next = <multi />
  def.seq = (
    <seq>
      <single>
        <filter
          filter={newValue =>
            newValue !== undefined && newValue !== plainState.current
          }
        />
      </single>
      <single>
        <update store={plainState} />
      </single>
      {def.next}
    </seq>
  )

  const updater: any = createEvent('update ' + currentId)

  const store: $Shape<Store<State>> = {
    graphite: def,
    kind: Kind.store,
    id: currentId,
    shortName: currentId,
    domainName: parent,
    setState,
    on,
    off,
    watch,
    subscribe,
    getState,
    reset,
    //$off
    [$$observable]: observable,
  }
  ;(store: any).defaultState = defaultState
  ;(store: any).map = mapStore.bind(null, store)
  ;(store: any).thru = thru.bind(store)
  ;(store: any).dispatch = dispatch
  //TODO fix type
  //$off
  if (name) setStoreName(store, name)
  store.on(updater, (_, payload) => payload)
  function getState() {
    return plainState.current
  }

  const visitors = {
    watch: {
      event({eventOrFn, fn}) {
        invariant(typeof fn === 'function', 'watch requires function handler')
        return eventOrFn.watch(payload =>
          fn(store.getState(), payload, eventOrFn.getType()),
        )
      },
      effect({eventOrFn, fn}) {
        invariant(typeof fn === 'function', 'watch requires function handler')
        return eventOrFn.watch(payload =>
          fn(store.getState(), payload, eventOrFn.getType()),
        )
      },
      __({eventOrFn}) {
        invariant(
          typeof eventOrFn === 'function',
          'watch requires function handler',
        )
        return subscribe(eventOrFn)
      },
    },
  }

  function subscribe(listener) {
    beginStoreMark(store, 'subscribe')
    invariant(
      typeof listener === 'function',
      'Expected the listener to be a function.',
    )
    let lastCall = getState()
    let active = true
    const runCmd = (
      <single>
        <run
          runner={args => {
            if (args === lastCall || !active) return
            lastCall = args
            try {
              listener(args)
              endStoreMark(store, 'subscribe', null)
            } catch (err) {
              console.error(err)
              endStoreMark(store, 'subscribe', 'Got error')
            }
          }}
        />
      </single>
    )
    pushNext(runCmd, store.graphite.next)
    listener(lastCall)
    function unsubscribe() {
      active = false
      const i = store.graphite.next.data.indexOf(runCmd)
      if (i === -1) return
      store.graphite.next.data.splice(i, 1)
    }
    unsubscribe.unsubscribe = unsubscribe
    return (unsubscribe: {
      (): void,
      unsubscribe(): void,
    })
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
    return store.on(event, () => defaultState)
  }
  function off(event: Event<any>) {
    const currentSubscription = subscribers.get(event)
    if (currentSubscription === undefined) return
    currentSubscription()
    subscribers.delete(event)
  }
  function on(event: any, handler: Function) {
    const e: Event<any> = event
    const nextSeq = (
      <seq>
        <compute
          fn={newValue => {
            const lastState = getState()
            return handler(lastState, newValue, e.getType())
          }}
        />
        <single>
          <filter
            filter={data => {
              const lastState = getState()
              return data !== lastState && data !== undefined
            }}
          />
        </single>
        {store.graphite.seq}
      </seq>
    )
    pushNext(nextSeq, e.graphite.next)
    subscribers.set(e, () => {
      const i = e.graphite.next.data.indexOf(nextSeq)
      if (i === -1) return
      e.graphite.next.data.splice(i, 1)
    })
    return store
  }

  function watch(eventOrFn: Event<*> | Function, fn?: Function) {
    return visitors.watch[String(eventOrFn?.kind || '__')]({eventOrFn, fn})
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

  return store
}

function thru(fn: Function) {
  return fn(this)
}
function dispatch(action) {
  return action
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
  beginStoreMark(store, 'map')
  let lastValue = store.getState()
  let lastResult = fn(lastValue, firstState)
  const innerStore: Store<any> = storeFabric({
    name: '' + store.shortName + ' → *',
    currentState: lastResult,
    parent: store.domainName,
  })
  const nextSeq = (
    <seq>
      <compute
        fn={newValue => {
          lastValue = newValue
          const lastState = innerStore.getState()
          const result = fn(newValue, lastState)
          endStoreMark(store, 'map', null)
          return result
        }}
      />
      <single>
        <filter
          filter={result => {
            const lastState = innerStore.getState()
            const isChanged = result !== lastState && result !== undefined
            if (isChanged) {
              lastResult = result
            }
            return isChanged
          }}
        />
      </single>
      {innerStore.graphite.seq}
    </seq>
  )
  pushNext(nextSeq, store.graphite.next)
  //TODO
  // const off = () => {
  //   const i = store.graphite.next.data.indexOf(nextSeq)
  //   if (i === -1) return
  //   store.graphite.next.data.splice(i, 1)
  // }
  return innerStore
}
