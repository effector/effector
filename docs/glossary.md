---
id: glossary
title: Glossary
---

This is a glossary of the core terms in Effector, along with their type signatures. The types are documented using [TypeScript notation](http://typescriptlang.org).

## Event

_Event_ is a function you can subscribe to. It can be an intention to change the store, some occurence in application, command to be executed, aggregated analytics trigger and so on.

[Event]('./api/effector/Event.md) in api documentation

```typescript
function createEvent<E>(eventName?: string): Event<E>
```

- [createEvent(eventName)](./api/effector/createEvent.md) creates event

```typescript
type Event<Payload> = {
  (payload: Payload): Payload
  watch(watcher: (payload: Payload) => any): Subscription
  map<T>(fn: (payload: Payload) => T): Event<T>
  filter(options: {fn(payload: Payload): boolean}): Event<Payload>
  filterMap<T>(fn: (payload: Payload) => T | void): Event<T>
  prepend<Before>(fn: (params: Before) => Payload): Event<Before>
}
```

- `(payload)` calls `Event` with payload
- [watch(watcher)](./api/effector/Event.md#watchwatcher) listens to the event and calls provided [`watcher`](#watcher)
- [map(fn)](./api/effector/Event.md#mapfn) creates new event, which will be called after the original event is called, applying the result of a fn as a payload
- [filter({fn})](./api/effector/Event.md#filterfn) creates new event that will receive update only when given `fn` returns true
- [filterMap(fn)](./api/effector/Event.md#filtermapfn) creates new event that will receive value, returned by given `fn`, but only when it returns anything but undefined. Use cases: extract value from react's refs; statically typed filters;
- [prepend(fn)](./api/effector/Event.md#prependfn) creates new event that preprocesses payload before calling the original event

## Effect

_Effect_ is a container for async function.

It can be safely used in place of the original async function.

It returns promise with result of a function call

The only requirement for the function:

- **Must** have zero or one argument

[Effect]('./api/effector/Effect.md) in api documentation

```typescript
function createEffect<Params, Done, Fail>(config?: {
  handler?: (params: Params) => Promise<Done> | Done
}): Effect<Params, Done, Fail>
```

- [createEffect(config)](./api/effector/createEffect.md) creates effect

```typescript
type Effect<Params, Done, Fail = Error> = {
  (payload: Params): Promise<Done>
  doneData: Event<Done>
  failData: Event<Fail>
  done: Event<{params: Params; result: Done}>
  fail: Event<{params: Params; error: Fail}>
  pending: Store<boolean>
  inFlight: Store<number>
  use: {
    (asyncFunction: (params: Params) => Promise<Done>): this
    getCurrent(): (params: Params) => Promise<Done>
  }
  watch(watcher: (payload: Params) => any): Subscription
}
```

- `(payload)` calls `Effect` with payload and returns a Promise
- [use(asyncFunction)](./api/effector/Effect.md#usehandler) injects async function into the effect (can be called multiple times)
- [watch(watcher)](./api/effector/Effect.md#watchwatcher) listens to the effect and calls provided [`watcher`](#watcher) when effect starts

## Store

_Store_ is an object that holds the state tree.
There can be multiple stores.

[Store]('./api/effector/Store.md) in api documentation

```typescript
function createStore<State>(defaultState: State): Store<State>
```

- [createStore(defaultState)](./api/effector/createStore.md) creates new store
- [combine(stores)](./api/effector/combine.md) combines multiple stores into one

```typescript
type Store<State> = {
  on<E>(
    trigger: Event<E> | Effect<E, any, any> | Store<E>,
    reducer: (state: State, payload: E) => State | void,
  ): this
  map<T>(fn: (_: State) => T): Store<T>
  reset(
    ...triggers: Array<Event<any> | Effect<any, any, any> | Store<any>>
  ): this
  watch<E>(watcher: (state: State) => any): Subscription
  updates: Event<State>
  defaultState: State
}
```

- [on(event, reducer)](./api/effector/Store.md#ontrigger-handler) calls [`reducer`](#reducer) on store when event occurs
- [map(fn)](./api/effector/Store.md#mapfn-state-state-laststate-t--t) creates computed store from given one
- [reset(...triggers)](./api/effector/Store.md#resettriggers) resets state to default when event occurs
- [watch(watcher)](./api/effector/Store.md#watchwatcher) calls given [`watcher`](#watcher) with current state
- [updates](./api/effector/Store.md#updates) is `event` for watch `store` changes only
- [defaultState](./api/effector/Store.md#defaultstate) initial state of given store

## Domain

_Domain_ is a namespace for your events, stores and effects.

Domain can subscribe to event, effect, store or nested domain creation with `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain` methods.

It is useful for logging or other side effects.

[Domain]('./api/effector/Domain.md) in api documentation

```typescript
function createDomain(domainName?: string): Domain
```

- [createDomain(domainName)](./api/effector/createDomain.md) creates new domain

```typescript
type Domain = {
  onCreateEvent(hook: (newEvent: Event<unknown>) => any): Subscription
  onCreateEffect(
    hook: (newEffect: Effect<unknown, unknown, unknown>) => any,
  ): Subscription
  onCreateStore(hook: (newStore: Store<unknown>) => any): Subscription
  onCreateDomain(hook: (newDomain: Domain) => any): Subscription
  createEvent<Payload>(name?: string): Event<Payload>
  createEffect<Params, Done, Fail>(name?: string): Effect<Params, Done, Fail>
  createStore<State>(defaultState: State): Store<State>
  createDomain(name?: string): Domain
}
```

- [onCreateEvent(hook)](./api/effector/Domain.md#oncreateeventhook) calls hook when nested [`Event`](#Event) created
- [onCreateEffect(hook)](./api/effector/Domain.md#oncreateeffecthook) calls hook when nested [`Effect`](#Effect) created
- [onCreateStore(hook)](./api/effector/Domain.md#oncreatestorehook) calls hook when nested [`Store`](#Store) created
- [onCreateDomain(hook)](./api/effector/Domain.md#oncreatedomainhook) calls hook when nested [`Domain`](#Domain) created
- [createEvent(name)](./api/effector/Domain.md#createeventname) is the function that creates [`Event`](#Event)
- [createEffect(name)](./api/effector/Domain.md#createeffectname) is the function that creates [`Effect`](#Effect)
- [createStore(defaultState)](./api/effector/Domain.md#createstoredefaultstate) is the function that creates [`Store`](#Store)
- [createDomain(name)](./api/effector/Domain.md#createdomainname) creates nested [`Domain`](#Domain)

## Reducer

```typescript
type StoreReducer<State, E> = (state: State, payload: E) => State | void
type EventOrEffectReducer<T, E> = (state: T, payload: E) => T
```

_Reducer_ calculates a new state given the previous state and an event. For stores, if reducer returns undefined or the same state (===), then there will be no update for given store.

## Watcher

```typescript
type Watcher<T> = (update: T) => any
```

_Watcher_ is used for **side effects**

## Subscription

```typescript
type Subscription = {
  (): void
  unsubscribe(): void
}
```

Function, returned by [forward](./api/effector/forward.md), [event.watch](./api/effector/Event.md#watchwatcher), [store.watch](./api/effector/Store.md#watchwatcher) and some others methods. Used for cancelling a subscription. After first call, subscription will do nothing

## Pureness

Most of functions in api mustn't call other events or effects: it's easier to reason about application dataflow when imperative triggers are grouped inside watchers and effect handlers rather than spread across entire business logic.

**Correct**, imperative:

```js
import {createStore, createEvent} from 'effector'

const login = createStore('guest')

const loginSize = login.map(login => login.length)

const submitLoginSize = createEvent()

loginSize.watch(size => {
  submitLoginSize(size)
})
```

[Try it](https://share.effector.dev/D5hV8C70)

[store.map in docs](./api/effector/Store.md#mapfn-state-state-laststate-t--t)

[store.watch in docs](./api/effector/Store.md#watchwatcher)

**Correct**, declarative:

```js
import {createStore, createEvent, forward} from 'effector'

const login = createStore('guest')

const loginSize = login.map(login => login.length)

const submitLoginSize = createEvent()

forward({
  from: loginSize,
  to: submitLoginSize,
})
```

[Try it](https://share.effector.dev/it0gXQLI)

[forward in docs](./api/effector/forward.md)

**Incorrect**:

```js
import {createStore, createEvent, forward} from 'effector'

const submitLoginSize = createEvent()

const login = createStore('guest')
const loginSize = login.map(login => {
  // no! use forward or watch instead
  submitLoginSize(login.length)
  return login.length
})
```
