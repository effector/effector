---
id: glossary
title: Glossary
description: Glossary of basic terms in effector
---

Glossary of basic terms in effector

## Event

_Event_ is a function you can subscribe to. It can be an intention to change the store, indication of something happening in the application, a command to be executed, aggregated analytics trigger and so on.

[Event](../api/effector/Event.md) in api documentation

## Store

_Store_ is an object that holds state.
There can be multiple stores.

[Store](../api/effector/Store.md) in api documentation

## Effect

_Effect_ is a container for (possibly async) side effects.
It exposes special events and stores, such as `pending`, `done`, `fail`, `finally`, etc...

It can be safely used in place of the original async function.

It returns promise with result of a function call

The only requirement for the function:

- **Must** have zero or one argument

[Effect](../api/effector/Effect.md) in api documentation

## Domain

_Domain_ is a namespace for your events, stores and effects.

Domains are notified when events, stores, effects, or nested domains are created via `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain` methods.

It is useful for logging or other side effects.

[Domain](../api/effector/Domain.md) in api documentation

## Unit

Data type used to describe business logic of applications. Most of the effector methods deal with unit processing.
There are five units types: [store], [event], [effect], [domain] and [scope]

## Common unit

Common units can be used to trigger updates of other units. There are three common unit types: [store], [event] and [effect]. **When a method accepts units, it means that it accepts events, effects, and stores** as a source of reactive updates

## Purity

Most of the functions in api must not call other events or effects: it's easier to reason about application's data flow when imperative triggers are grouped inside watchers and effect handlers rather than spread across entire business logic.

**Correct**, imperative:

```js
import {createStore, createEvent} from 'effector'

const submitLoginSize = createEvent()

const $login = createStore('guest')
const $loginSize = $login.map(login => login.length)

$loginSize.watch(size => {
  submitLoginSize(size)
})
```

[Try it](https://share.effector.dev/D5hV8C70)

[store.map in docs](../api/effector/Store.md#mapfn-state-state-laststate-t--t)

[store.watch in docs](../api/effector/Store.md#watchwatcher)

**Correct**, declarative:

```js
import {createStore, createEvent, forward} from 'effector'

const submitLoginSize = createEvent()

const $login = createStore('guest')
const $loginSize = $login.map(login => login.length)

forward({
  from: $loginSize,
  to: submitLoginSize,
})
```

[Try it](https://share.effector.dev/it0gXQLI)

[forward in docs](../api/effector/forward.md)

**Incorrect**:

```js
import {createStore, createEvent, forward} from 'effector'

const submitLoginSize = createEvent()

const $login = createStore('guest')
const $loginSize = $login.map(login => {
  // no! use forward or watch instead
  submitLoginSize(login.length)
  return login.length
})
```

## Reducer

```typescript
type StoreReducer<State, E> = (state: State, payload: E) => State | void
type EventOrEffectReducer<T, E> = (state: T, payload: E) => T
```

_Reducer_ calculates a new state given the previous state and an event's payload. For stores, if reducer returns undefined or the same state (===), then there will be no update for a given store.

## Watcher

```typescript
type Watcher<T> = (update: T) => any
```

_Watcher_ is used for **side effects**. Accepted by [event.watch](../api/effector/Event.md#watchwatcher), [store.watch](../api/effector/Store.md#watchwatcher) and [domain.onCreate\* hooks](../api/effector/Domain.md#oncreateeventhook). Return value of a watcher is ignored.

## Subscription

```typescript
type Subscription = {
  (): void
  unsubscribe(): void
}
```

Function, returned by [forward](../api/effector/forward.md), [event.watch](../api/effector/Event.md#watchwatcher), [store.watch](../api/effector/Store.md#watchwatcher) and some others methods. Used for cancelling a subscription. After first call, subscription will do nothing

:::caution Managing subscriptions manually distracts from business logic improvements
Effector provides a wide range of features to minimize the need to remove subscriptions. This sets it apart from most other reactive libraries
:::

[effect]: ../api/effector/Effect.md
[store]: ../api/effector/Store.md
[event]: ../api/effector/Event.md
[domain]: ../api/effector/Domain.md
[scope]: ../api/effector/Scope.md
