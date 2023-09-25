---
title: Domain
description: Domain, its methods and properties
redirectFrom:
  - /api/effector/Domain
  - /docs/api/effector/domain
---

Domain is a namespace for your events, stores and effects.

Domain can subscribe to event, effect, store or nested domain creation with `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain` methods.

It is useful for logging or other side effects.

# Unit creators

:::info{title="since"}
[effector 20.7.0](https://changelog.effector.dev/#effector-20-7-0)
:::

## `createEvent(name?)`

### Arguments

1. `name`? (_string_): event name

**Returns**

[_Event_](/en/api/effector/Event): New event

## `createEffect(handler?)`

Creates an [effect](/en/api/effector/Effect) with given handler

### Arguments

1. `handler`? (_Function_): function to handle effect calls, also can be set with [use(handler)](#use)

**Returns**

[_Effect_](/en/api/effector/Effect): A container for async function.

:::info{title="since"}
[effector 21.3.0](https://changelog.effector.dev/#effector-21-3-0)
:::

## `createEffect(name?)`

### Arguments

1. `name`? (_string_): effect name

**Returns**

[_Effect_](/en/api/effector/Effect): A container for async function.

## `createStore(defaultState)`

### Arguments

1. `defaultState` (_State_): store default state

**Returns**

[_Store_](/en/api/effector/Store): New store

## `createDomain(name?)`

### Arguments

1. `name`? (_string_): domain name

**Returns**

[_Domain_](/en/api/effector/Domain): New domain

## `history`

Contains mutable read-only sets of units inside a domain.

### Formulae

```ts
const { stores, events, domains, effects } = domain.history;
```

- When any kind of unit created inside a domain, it appears in a set with the name of type(stores, events, domains, effects) in the same order as created

:::info{title="since"}
[effector 20.3.0](https://changelog.effector.dev/#effector-20-3-0)
:::

```js
import { createDomain } from "effector";
const domain = createDomain();
const eventA = domain.event();
const $storeB = domain.store(0);
console.log(domain.history);
// => {stores: Set{storeB}, events: Set{eventA}, domains: Set, effects: Set}
```

[Try it](https://share.effector.dev/flIV7Fja)

## Aliases

### `event(name?)`

An alias for [domain.createEvent](/en/api/effector/Domain#createevent-name)

### `effect(name?)`

An alias for [domain.createEffect](/en/api/effector/Domain#createeffect-name)

### `store(defaultState)`

An alias for [domain.createStore](/en/api/effector/Domain#createstore-defaultstate)

### `domain(name?)`

An alias for [domain.createDomain](/en/api/effector/Domain#createdomain-name)

# Domain hooks

## `onCreateEvent(hook)`

### Formulae

```ts
domain.onCreateEvent((event) => {});
```

- Function passed to `onCreateEvent` called every time, as new event created in `domain`
- Function called with `event` as first argument
- The result of function call is ignored

### Arguments

1. `hook` ([_Watcher_]): A function that receives [Event](/en/api/effector/Event) and will be called during every [domain.createEvent](/en/api/effector/Domain#createeventname) call

**Returns**

[_Subscription_]: Unsubscribe function.

### Example

```js
import { createDomain } from "effector";

const domain = createDomain();

domain.onCreateEvent((event) => {
  console.log("new event created");
});

const a = domain.createEvent();
// => new event created

const b = domain.createEvent();
// => new event created
```

[Try it](https://share.effector.dev/QCQpga6u)

## `onCreateEffect(hook)`

### Formulae

```ts
domain.onCreateEffect((effect) => {});
```

- Function passed to `onCreateEffect` called every time, as new effect created in `domain`
- Function called with `effect` as first argument
- The result of function call is ignored

### Arguments

1. `hook` ([_Watcher_]): A function that receives [Effect](/en/api/effector/Effect) and will be called during every [domain.createEffect](/en/api/effector/Domain#createeffect-name) call

**Returns**

[_Subscription_]: Unsubscribe function.

### Example

```js
import { createDomain } from "effector";

const domain = createDomain();

domain.onCreateEffect((effect) => {
  console.log("new effect created");
});

const fooFx = domain.createEffect();
// => new effect created

const barFx = domain.createEffect();
// => new effect created
```

[Try it](https://share.effector.dev/uT6f8vv9)

## `onCreateStore(hook)`

### Formulae

```ts
domain.onCreateStore(($store) => {});
```

- Function passed to `onCreateStore` called every time, as new store created in `domain`
- Function called with `$store` as first argument
- The result of function call is ignored

### Arguments

1. `hook` ([_Watcher_]): A function that receives [Store](/en/api/effector/Store) and will be called during every [domain.createStore](/en/api/effector/Domain#createstore-defaultstate) call

**Returns**

[_Subscription_]: Unsubscribe function.

### Example

```js
import { createDomain } from "effector";

const domain = createDomain();

domain.onCreateStore((store) => {
  console.log("new store created");
});

const $a = domain.createStore(null);
// => new store created
```

[Try it](https://share.effector.dev/OGlYOtfz)

## `onCreateDomain(hook)`

### Formulae

```ts
domain.onCreateDomain((domain) => {});
```

- Function passed to `onCreateDomain` called every time, as subdomain created in `domain`
- Function called with `domain` as first argument
- The result of function call is ignored

### Arguments

1. `hook` ([_Watcher_]): A function that receives [Domain](/en/api/effector/Domain) and will be called during every [domain.createDomain](/en/api/effector/Domain#createdomain-name) call

**Returns**

[_Subscription_]: Unsubscribe function.

### Example

```js
import { createDomain } from "effector";

const domain = createDomain();

domain.onCreateDomain((domain) => {
  console.log("new domain created");
});

const a = domain.createDomain();
// => new domain created

const b = domain.createDomain();
// => new domain created
```

[Try it](https://share.effector.dev/dvBLiwHf)

[_watcher_]: /en/explanation/glossary#watcher
[_subscription_]: /en/explanation/glossary#subscription
