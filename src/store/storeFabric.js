//@flow
//@jsx fx
import $$observable from 'symbol-observable'
//eslint-disable-next-line no-unused-vars
import fx from 'effector/stdlib/fx'

import invariant from 'invariant'
import {startPhaseTimer, stopPhaseTimer} from 'effector/perf'

import {Kind} from 'effector/stdlib/kind'

import {createStateRef} from 'effector/stdlib/stateref'
import {createEvent, forward, type Event} from 'effector/event'
import type {Store} from './index.h'
import {setStoreName} from './setStoreName'
import type {CompositeName} from '../compositeName'

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
      <filter
        filter={newValue =>
          newValue !== undefined && newValue !== plainState.current
        }
      />
      <update store={plainState} />
      {def.next}
    </seq>
  )

  const updater: any = createEvent('update ' + currentId)
  const storeInstance = {
    graphite: def,
    kind: Kind.store,
    id: currentId,
    shortName: currentId,
    domainName: parent,
    defaultState,
    plainState,
  }
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

  function subscribe(listener) {
    invariant(
      typeof listener === 'function',
      'Expected the listener to be a function.',
    )
    let stopPhaseTimerMessage = null
    let lastCall = storeInstance.plainState.current

    startPhaseTimer(storeInstance, 'subscribe')
    try {
      listener(lastCall)
      stopPhaseTimerMessage = 'Initial'
    } catch (err) {
      console.error(err)
      stopPhaseTimerMessage = 'Got initial error'
    }
    stopPhaseTimer(stopPhaseTimerMessage)

    return forward({
      from: storeInstance,
      to: {
        graphite: {
          seq: (
            //$todo
            <run
              runner={args => {
                let stopPhaseTimerMessage = null
                startPhaseTimer(storeInstance, 'subscribe')
                if (args === lastCall) return
                lastCall = args
                try {
                  listener(args)
                } catch (err) {
                  console.error(err)
                  stopPhaseTimerMessage = 'Got error'
                }
                stopPhaseTimer(stopPhaseTimerMessage)
              }}
            />
          ),
        },
      },
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
    subscribers.set(
      e,
      forward({
        from: e,
        to: {
          graphite: {
            seq: (
              <seq>
                <compute
                  fn={newValue => {
                    const lastState = getState()
                    return handler(lastState, newValue, e.getType())
                  }}
                />
                <filter
                  filter={data => {
                    const lastState = getState()
                    return data !== lastState && data !== undefined
                  }}
                />
                {store.graphite.seq}
              </seq>
            ),
          },
        },
      }),
    )
    return store
  }

  function watch(eventOrFn: Event<*> | Function, fn?: Function) {
    const kind = String(eventOrFn?.kind || '__')
    switch (kind) {
      case 'event':
      case 'effect':
        invariant(typeof fn === 'function', 'watch requires function handler')
        return eventOrFn.watch(payload =>
          fn(store.getState(), payload, eventOrFn.getType()),
        )
      case '__':
      default:
        invariant(
          typeof eventOrFn === 'function',
          'watch requires function handler',
        )
        return subscribe(eventOrFn)
    }
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

export function getDisplayName(store: {
  compositeName?: CompositeName,
  domainName?: CompositeName,
  /*::+*/ id: string,
  /*::...*/
}) {
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
  startPhaseTimer(store, 'map')
  let lastValue = store.getState()
  let lastResult
  let stopPhaseTimerMessage = null
  try {
    lastResult = fn(lastValue, firstState)
    stopPhaseTimerMessage = 'Initial'
  } catch (err) {
    console.error(err)
    stopPhaseTimerMessage = 'Got initial error'
  }
  stopPhaseTimer(stopPhaseTimerMessage)
  const innerStore: Store<any> = storeFabric({
    name: '' + store.shortName + ' → *',
    currentState: lastResult,
    parent: store.domainName,
  })
  forward({
    from: store,
    to: {
      graphite: {
        seq: (
          <seq>
            <compute
              fn={newValue => {
                startPhaseTimer(store, 'map')
                lastValue = newValue
                let stopPhaseTimerMessage = null
                const lastState = innerStore.getState()
                let result
                try {
                  result = fn(newValue, lastState)
                } catch (err) {
                  console.error(err)
                  stopPhaseTimerMessage = 'Got error'
                }
                stopPhaseTimer(stopPhaseTimerMessage)
                return result
              }}
            />
            <filter
              filter={result => {
                const lastState = innerStore.getState()
                const isChanged = result !== lastState && result !== undefined
                if (isChanged) {
                  lastResult = result
                }
                stopPhaseTimer(null)
                return isChanged
              }}
            />
            {innerStore.graphite.seq}
          </seq>
        ),
      },
    },
  })
  return innerStore
}
