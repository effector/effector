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

[_Subscription_](../../glossary.md#subscription): Unsubscribe function.

<hr />

### `onCreateEffect(hook)`

#### Arguments

1. `hook` (_Function_): Callback with created [Effect](Effect.md)

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function.

<hr />

### `onCreateStore(hook)`

#### Arguments

1. `hook` (_Function_): Callback with created [Store](Store.md)

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function.

<hr />

### `onCreateDomain(hook)`

#### Arguments

1. `hook` (_Function_): Callback with created [Domain](Domain.md)

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function.

<hr />

### `createEvent(name?)`

#### Arguments

1. `name`? (_string_): event name

#### Returns

[_Event_](Event.md): New event

<hr />

### `createEffect(name?)`

#### Arguments

1. `name`? (_string_): effect name

#### Returns

[_Effect_](Effect.md): A container for async function.

<hr />

### `createStore(defaultState)`

#### Arguments

1. `defaultState` (_State_): store default state

#### Returns

[_Store_](Store.md): New store

<hr />

### `createDomain(name?)`

#### Arguments

1. `name`? (_string_): domain name

#### Returns

[_Domain_](Domain.md): New domain

<hr />

### `event(name?)`

#### Arguments

1. `name`? (_string_): event name

#### Returns

[_Event_](Event.md): New event

<hr />

### `effect(name?)`

#### Arguments

1. `name`? (_string_): effect name

#### Returns

[_Effect_](Effect.md): New effect

<hr />

### `store(defaultState)`

#### Arguments

1. `defaultState` (_State_): store default state

#### Returns

[_Store_](Store.md): New store

<hr />

### `domain(name?)`

#### Arguments

1. `name`? (_string_): domain name

#### Returns

[_Domain_](Domain.md): New domain

<hr />
