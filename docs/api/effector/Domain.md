---
id: domain
title: Domain
---

_Domain_ is a namespace for your events, stores and effects.

Domain can subscribe to event, effect, store or nested domain creation with `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain` methods.

It is useful for logging or other side effects.

## Unit creators

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

### Aliases

#### `event(name?)`

An alias for [domain.createEvent](./Domain.md#createeventname)

<hr />

#### `effect(name?)`

An alias for [domain.createEffect](./Domain.md#createeffectname)

<hr />

#### `store(defaultState)`

An alias for [domain.createStore](./Domain.md#createstoredefaultstate)

<hr />

#### `domain(name?)`

An alias for [domain.createDomain](./Domain.md#createdomainname)

<hr />

## Domain hooks

### `onCreateEvent(hook)`

#### Arguments

1. `hook` ([_Watcher_](../../glossary.md#watcher)): A function that receives [Event](./Event.md) and will be called during every [domain.createEvent](./Domain.md#createeventname) call

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function.

#### Example

```js
import {createDomain} from 'effector'

const domain = createDomain()

domain.onCreateEvent(event => {
  console.log('new event created')
})

const a = domain.createEvent()
// => new event created

const b = domain.createEvent()
// => new event created
```

[Try it](https://share.effector.dev/QCQpga6u)

<hr />

### `onCreateEffect(hook)`

#### Arguments

1. `hook` ([_Watcher_](../../glossary.md#watcher)): A function that receives [Effect](./Effect.md) and will be called during every [domain.createEffect](./Domain.md#createeffectname) call

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function.

#### Example

```js
import {createDomain} from 'effector'

const domain = createDomain()

domain.onCreateEffect(effect => {
  console.log('new effect created')
})

const a = domain.createEffect()
// => new effect created

const b = domain.createEffect()
// => new effect created
```

[Try it](https://share.effector.dev/uT6f8vv9)

<hr />

### `onCreateStore(hook)`

#### Arguments

1. `hook` ([_Watcher_](../../glossary.md#watcher)): A function that receives [Store](./Store.md) and will be called during every [domain.createStore](./Domain.md#createstoredefaultstate) call

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function.

#### Example

```js
import {createDomain} from 'effector'

const domain = createDomain()

domain.onCreateStore(store => {
  console.log('new store created')
})

const a = domain.createStore(null)
// => new store created

const b = domain.createEffect(null)
// => new store created
```

[Try it](https://share.effector.dev/LuYhaYJS)

<hr />

### `onCreateDomain(hook)`

#### Arguments

1. `hook` ([_Watcher_](../../glossary.md#watcher)): A function that receives [Domain](./Domain.md) and will be called during every [domain.createDomain](./Domain.md#createdomainname) call

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function.

#### Example

```js
import {createDomain} from 'effector'

const domain = createDomain()

domain.onCreateDomain(domain => {
  console.log('new domain created')
})

const a = domain.createDomain()
// => new domain created

const b = domain.createDomain()
// => new domain created
```

[Try it](https://share.effector.dev/dvBLiwHf)

<hr />
