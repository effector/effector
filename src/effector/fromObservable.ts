import {observableSymbol} from './observable'
import type {Event} from './unit.h'
import {createEvent, createStore} from './createUnit'
import {combine} from './combine'
import {merge} from './merge'
import {scopeBind} from './fork'
import {assertObject, isFunction, isObject, is} from './is'
import {assert} from './throw'
import {createSubscription} from './subscription'
import {sample} from './sample'

export function fromObservable<T>(observableOrConfig: any): Event<T> {
  assertObject(observableOrConfig)
  const observable =
    observableSymbol in observableOrConfig
      ? observableOrConfig[observableSymbol]()
      : observableOrConfig
  const event = createEvent<T>()

  if (isObservable(observable)) {
    const disposer = createSubscription(event)
    observable.subscribe({
      next: event,
      error: disposer,
      complete: disposer,
    })
  } else {
    const {start, stop, source, setup} = normalizeConfig(observableOrConfig)
    const $enabled = createStore(false, {serialize: 'ignore'}).on(
      start as Event<any>,
      () => true,
    ).reset(stop as Event<any>)
    const saveUnsubscribe = createEvent<() => void>()
    const $unsubscribe = createStore(noop, {serialize: 'ignore'}).on(
      saveUnsubscribe,
      (_, fn) => fn,
    )

    ;(
      sample({
        source: $unsubscribe,
        clock: start,
        filter: $enabled.map(s => !s),
      }) as Event<any>
    ).watch(runCleanup)
    ;(
      sample({
        source,
        clock: start,
        filter: $enabled,
      }) as Event<any>
    ).watch(source => {
      const listener = scopeBind(event, {safe: true})

      const unsubscribe = setup(listener, source)

      if (unsubscribe) {
        saveUnsubscribe(unsubscribe)
      }
    })

    if (stop) {
      ;(
        sample({
          source: $unsubscribe,
          clock: stop,
        }) as Event<any>
      ).watch(runCleanup)
    }
  }
  return event
}

function isObservable(maybeObservable: any) {
  return (
    (isObject(maybeObservable) || isFunction(maybeObservable)) &&
    (isFunction(maybeObservable.subscribe) ||
      observableSymbol in maybeObservable)
  )
}

function noop() {}

function normalizeConfig(config: any) {
  const start = Array.isArray(config.start) ? merge(config.start) : config.start
  assert(is.unit(start), 'expect start to be a unit')

  const stop = Array.isArray(config.stop) ? merge(config.stop) : config.stop
  assert(!stop || is.unit(stop), 'expect stop to be a unit')

  const source = config.source
    ? is.unit(config.source)
      ? config.source
      : combine(config.source)
    : createStore(null)
  assert(is.store(source), 'expect source to be a store')

  assert(
    isFunction(config.setup) || isObservable(config.setup),
    'expect setup to be a function or observable',
  )
  const setup = isFunction(config.setup)
    ? config.setup
    : normalizeObservableToFunction(config.setup)

  return {start, stop, source, setup}
}

function normalizeObservableToFunction(observable: any) {
  assert(isObservable(observable), 'expect observable to have .subscribe')

  return (listener: (p: any) => void) => {
    const unsubscribe = observable.subscribe({
      next: listener,
    })

    return () =>
      isFunction(unsubscribe) ? unsubscribe() : unsubscribe.unsubscribe()
  }
}

function runCleanup(callback?: () => void) {
  assert(isFunction(callback), 'expect cleanup callback to be a function')

  callback()
}
