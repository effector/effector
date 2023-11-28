---
id: domain
title: Domain
description: Domain, its methods and properties
---

Domain is a namespace for your events, stores and effects.

Domain can subscribe to event, effect, store or nested domain creation with `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain` methods.

It is useful for logging or other side effects.

## Unit creators

:::note since
effector 20.7.0
:::

### `createEvent(name?)`

**Arguments**

1. `name`? (_string_): event name

**Returns**

[_Event_](./Event.md): New event

<hr />

### `createEffect(handler?)`

Creates an [effect](./Effect.md) with given handler

**Arguments**

1. `handler`? (_Function_): function to handle effect calls, also can be set with [`use(handler)`](#use)

**Returns**

[_Effect_](./Effect.md): A container for async function.

:::note since
effector 21.3.0
:::

<hr />

### `createEffect(name?)`

**Arguments**

1. `name`? (_string_): effect name

**Returns**

[_Effect_](./Effect.md): A container for async function.

<hr />

### `createStore(defaultState)`

**Arguments**

1. `defaultState` (_State_): store default state

**Returns**

[_Store_](./Store.md): New store

<hr />

### `createDomain(name?)`

**Arguments**

1. `name`? (_string_): domain name

**Returns**

[_Domain_](./Domain.md): New domain

<hr />

### `history`

Contains mutable read-only sets of units inside domain.

#### Formulae

```ts
const {stores, events, domains, effects} = domain.history
```

- When any kind of units created inside domain, it appears in set with the name of type(stores, events, domains, effects) in the same order as created

:::note since
effector 20.3.0
:::

```js
import {createDomain} from 'effector'
const domain = createDomain()
const eventA = domain.event()
const $storeB = domain.store(0)
console.log(domain.history)
// => {stores: Set{storeB}, events: Set{eventA}, domains: Set, effects: Set}
```

[Try it](https://share.effector.dev/flIV7Fja)

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

#### Formulae

```ts
domain.onCreateEvent(event => {})
```

- Function passed to `onCreateEvent` called every time, as new event created in `domain`
- Function called with `event` as first argument
- Result of function call is ignored

**Arguments**

1. `hook` ([_Watcher_]): A function that receives [Event](./Event.md) and will be called during every [domain.createEvent](./Domain.md#createeventname) call

**Returns**

[_Subscription_]: Unsubscribe function.

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

#### Formulae

```ts
domain.onCreateEffect(effect => {})
```

- Function passed to `onCreateEffect` called every time, as new effect created in `domain`
- Function called with `effect` as first argument
- Result of function call is ignored

**Arguments**

1. `hook` ([_Watcher_]): A function that receives [Effect](./Effect.md) and will be called during every [domain.createEffect](./Domain.md#createeffectname) call

**Returns**

[_Subscription_]: Unsubscribe function.

#### Example

```js
import {createDomain} from 'effector'

const domain = createDomain()

domain.onCreateEffect(effect => {
  console.log('new effect created')
})

const fooFx = domain.createEffect()
// => new effect created

const barFx = domain.createEffect()
// => new effect created
```

[Try it](https://share.effector.dev/uT6f8vv9)

<hr />

### `onCreateStore(hook)`

#### Formulae

```ts
domain.onCreateStore($store => {})
```

- Function passed to `onCreateStore` called every time, as new store created in `domain`
- Function called with `$store` as first argument
- Result of function call is ignored

**Arguments**

1. `hook` ([_Watcher_]): A function that receives [Store](./Store.md) and will be called during every [domain.createStore](./Domain.md#createstoredefaultstate) call

**Returns**

[_Subscription_]: Unsubscribe function.

#### Example

```js
import {createDomain} from 'effector'

const domain = createDomain()

domain.onCreateStore(store => {
  console.log('new store created')
})

const $a = domain.createStore(null)
// => new store created
```

[Try it](https://share.effector.dev/OGlYOtfz)

<hr />

### `onCreateDomain(hook)`

#### Formulae

```ts
domain.onCreateDomain(domain => {})
```

- Function passed to `onCreateDomain` called every time, as subdomain created in `domain`
- Function called with `domain` as first argument
- Result of function call is ignored

**Arguments**

1. `hook` ([_Watcher_]): A function that receives [Domain](./Domain.md) and will be called during every [domain.createDomain](./Domain.md#createdomainname) call

**Returns**

[_Subscription_]: Unsubscribe function.

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

[_watcher_]: ../../explanation/glossary.md#watcher
[_subscription_]: ../../explanation/glossary.md#subscription
