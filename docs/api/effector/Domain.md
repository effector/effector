---
id: domain
title: Domain
---

_Domain_ is a namespace for your events, stores and effects.

Domain can subscribe to event, effect, store or nested domain creation with `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain` methods.

It is useful for logging or other side effects.

## Domain Methods

### `onCreateEvent(hook)`

#### Arguments

1. `hook` (_Function_): Callback with created [Event](Event.md)

#### Returns

(Subscription): Unsubscribe function

<hr>

### `onCreateEffect(hook)`

#### Arguments

1. `hook` (_Function_): Callback with created [Effect](Effect.md)

#### Returns

(Subscription): Unsubscribe function

<hr>

### `onCreateStore(hook)`

#### Arguments

1. `hook` (_Function_): Callback with created [Store](Store.md)

#### Returns

(Subscription): Unsubscribe function

<hr>

### `onCreateDomain(hook)`

#### Arguments

1. `hook` (_Function_): Callback with created [Domain](Domain.md)

#### Returns

(Subscription): Unsubscribe function

<hr>

### `event(name?)`

#### Arguments

1. `name`? (_string_): event name

#### Returns

([_`Event`_](Event.md)): An intention to change state.

<hr>

### `effect(name?)`

#### Arguments

1. `name`? (_string_): effect name

#### Returns

([_`Effect`_](Effect.md)): A container for async function.

<hr>

### `store(defaultState)`

#### Arguments

1. `defaultState` (_State_): store default state

#### Returns

([_`Store`_](Store.md)): An object that holds the state tree. There can be multiple stores.

<hr>

### `domain(name?)`

#### Arguments

1. `name`? (_string_): domain name

#### Returns

([_`Domain`_](Store.md)): A namespace for your events, stores and effects.

<hr>
