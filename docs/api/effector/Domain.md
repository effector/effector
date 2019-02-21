---
id: domain
title: Domain
---

_Domain_ is a namespace for your events, stores and effects.

Domain can subscribe to event, effect, store or nested domain creation with `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain` methods.

It is useful for logging or other side effects.

### Domain Methods

- [`onCreateEvent(hook)`](#onCreateEvent)
- [`onCreateEffect(hook)`](#onCreateEffect)
- [`onCreateStore(hook)`](#onCreateStore)
- [`onCreateDomain(hook)`](#onCreateDomain)
- [`event(name?)`](#event)
- [`effect(name?)`](#effect)
- [`store(defaultState)`](#store)
- [`domain(name?)`](#domain)

## Domain Methods

### <a id='onCreateEvent'></a>[`onCreateEvent(hook)`](#onCreateEvent)

#### Arguments

1. `hook` (_Function_): Callback with created [Event](Event.md)

#### Returns

(Subscription): Unsubscribe function

<hr>

### <a id='onCreateEffect'></a>[`onCreateEffect(hook)`](#onCreateEffect)

#### Arguments

1. `hook` (_Function_): Callback with created [Effect](Effect.md)

#### Returns

(Subscription): Unsubscribe function

<hr>

### <a id='onCreateStore'></a>[`onCreateStore(hook)`](#onCreateStore)

#### Arguments

1. `hook` (_Function_): Callback with created [Store](Store.md)

#### Returns

(Subscription): Unsubscribe function

<hr>

### <a id='onCreateDomain'></a>[`onCreateDomain(hook)`](#onCreateDomain)

#### Arguments

1. `hook` (_Function_): Callback with created [Domain](Domain.md)

#### Returns

(Subscription): Unsubscribe function

<hr>

### <a id='event'></a>[`event(name?)`](#event)

#### Arguments

1. `name`? (_string_): event name

#### Returns

([_`Event`_](Event.md)): An intention to change state.

<hr>

### <a id='effect'></a>[`effect(name?)`](#effect)

#### Arguments

1. `name`? (_string_): effect name

#### Returns

([_`Effect`_](Effect.md)): A container for async function.

<hr>

### <a id='store'></a>[`store(defaultState)`](#store)

#### Arguments

1. `defaultState` (_State_): store default state

#### Returns

([_`Store`_](Store.md)): An object that holds the state tree. There can be multiple stores.

<hr>

### <a id='domain'></a>[`domain(name?)`](#domain)

#### Arguments

1. `name`? (_string_): domain name

#### Returns

([_`Domain`_](Store.md)): A namespace for your events, stores and effects.

<hr>
