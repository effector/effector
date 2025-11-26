---
title: Domain
description: Domain, its methods and properties
redirectFrom:
  - /api/effector/Domain
  - /docs/api/effector/domain
---

```ts
import { type Domain } from "effector";
```

Domain is a namespace for your events, stores and effects.

Domain can subscribe to event, effect, store or nested domain creation with `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain` methods.

It is useful for logging or other side effects.

# Unit creators (#unit-creators)

:::info{title="since"}
[effector 20.7.0](https://changelog.effector.dev/#effector-20-7-0)
:::

## `createEvent(name?)` (#unit-creators-createEvent-name)

### Arguments (#unit-creators-createEvent-name-arguments)

1. `name`? (_string_): event name

### Returns (#unit-creators-createEvent-name-returns)

[_Event_](/en/api/effector/Event): New event

## `createEffect(handler?)` (#unit-creators-createEffect-handler)

Creates an [effect](/en/api/effector/Effect) with given handler.

### Arguments (#unit-creators-createEffect-handler-arguments)

1. `handler`? (_Function_): function to handle effect calls, also can be set with [use(handler)](#use)

### Returns (#unit-creators-createEffect-handler-returns)

[_Effect_](/en/api/effector/Effect): A container for async function.

:::info{title="since"}
[effector 21.3.0](https://changelog.effector.dev/#effector-21-3-0)
:::

## `createEffect(name?)` (#unit-creators-createEffect-name)

### Arguments (#unit-creators-createEffect-name-arguments)

1. `name`? (_string_): effect name

### Returns (#unit-creators-createEffect-name-returns)

[_Effect_](/en/api/effector/Effect): A container for async function.

## `createStore(defaultState)` (#unit-creators-createStore-defaultState)

### Arguments (#unit-creators-createStore-defaultState-arguments)

1. `defaultState` (_State_): store default state

### Returns (#unit-creators-createStore-defaultState-returns)

[_Store_](/en/api/effector/Store): New store

## `createDomain(name?)` (#unit-creators-createDomain-name)

### Arguments (#unit-creators-createDomain-name-arguments)

1. `name`? (_string_): domain name

### Returns (#unit-creators-createDomain-name-returns)

[_Domain_](/en/api/effector/Domain): New domain

## Aliases (#unit-creators-aliases)

### `event(name?)` (#unit-creators-aliases-event-name)

An alias for [domain.createEvent](/en/api/effector/Domain#createevent-name)

### `effect(name?)` (#unit-creators-aliases-effect-name)

An alias for [domain.createEffect](/en/api/effector/Domain#createeffect-name)

### `store(defaultState)` (#unit-creators-aliases-store-defaultState)

An alias for [domain.createStore](/en/api/effector/Domain#createstore-defaultstate)

### `domain(name?)` (#unit-creators-aliases-domain-name)

An alias for [domain.createDomain](/en/api/effector/Domain#createdomain-name)

# Domain Properties (#properties)

## `.history` (#unit-creators-history)

Contains mutable read-only sets of units inside a domain.

:::info{title="since"}
[effector 20.3.0](https://changelog.effector.dev/#effector-20-3-0)
:::

### Formulae (#unit-creators-history-formulae)

```ts
interface DomainHistory {
  stores: Set<Store<any>>;
  events: Set<Event<any>>;
  domains: Set<Domain>;
  effects: Set<Effect<any, any, any>>;
}

const { stores, events, domains, effects } = domain.history;
```

When any kind of unit created inside a domain, it appears in a set with the name of type(stores, events, domains, effects) in the same order as created.

### Examples (#unit-creators-history-examples)

#### Basic (#unit-creators-history-examples-basic)

```js
import { createDomain } from "effector";
const domain = createDomain();
const eventA = domain.event();
const $storeB = domain.store(0);
console.log(domain.history);
// => {stores: Set{storeB}, events: Set{eventA}, domains: Set, effects: Set}
```

[Try it](https://share.effector.dev/flIV7Fja)

# Domain hooks (#domain-hooks)

## `onCreateEvent(callback)` (#domain-hooks-onCreateEvent-callback)

### Formulae (#domain-hooks-onCreateEvent-callback-formulae)

```ts
domain.onCreateEvent((event: Event<any>) => {});
```

- Function passed to `onCreateEvent` called every time, as new event created in `domain`
- Function called with `event` as first argument
- The result of function call is ignored

### Arguments (#domain-hooks-onCreateEvent-callback-arguments)

1. `callback` ([_Watcher_]): A function that receives [Event](/en/api/effector/Event) and will be called during every [domain.createEvent](/en/api/effector/Domain#unit-creators-createEvent-name) call

### Returns (#domain-hooks-onCreateEvent-callback-returns)

[_Subscription_]: Unsubscribe function.

### Example (#domain-hooks-onCreateEvent-callback-example)

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

## `onCreateEffect(callback)` (#domain-hooks-onCreateEffect-callback)

### Formulae (#domain-hooks-onCreateEffect-callback-formulae)

```ts
domain.onCreateEffect((effect: Effect<any, any, any>) => {});
```

- Function passed to `onCreateEffect` called every time, as new effect created in `domain`
- Function called with `effect` as first argument
- The result of function call is ignored

### Arguments (#domain-hooks-onCreateEffect-callback-arguments)

1. `callback` ([_Watcher_]): A function that receives [Effect](/en/api/effector/Effect) and will be called during every [domain.createEffect](/en/api/effector/Domain#unit-creators-createEffect-handler) call

### Returns (#domain-hooks-onCreateEffect-callback-returns)

[_Subscription_]: Unsubscribe function.

### Example (#domain-hooks-onCreateEffect-callback-example)

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

## `onCreateStore(callback)` (#domain-hooks-onCreateStore-callback)

### Formulae (#domain-hooks-onCreateStore-callback-formulae)

```ts
domain.onCreateStore(($store: Store<any>) => {});
```

- Function passed to `onCreateStore` called every time, as new store created in `domain`
- Function called with `$store` as first argument
- The result of function call is ignored

### Arguments (#domain-hooks-onCreateStore-callback-arguments)

1. `callback` ([_Watcher_]): A function that receives [Store](/en/api/effector/Store) and will be called during every [domain.createStore](/en/api/effector/Domain#unit-creators-createStore-defaultState) call

### Returns (#domain-hooks-onCreateStore-callback-returns)

[_Subscription_]: Unsubscribe function.

### Example (#domain-hooks-onCreateStore-callback-example)

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

## `onCreateDomain(callback)` (#domain-hooks-onCreateDomain-callback)

### Formulae (#domain-hooks-onCreateDomain-callback-formulae)

```ts
domain.onCreateDomain((domain) => {});
```

- Function passed to `onCreateDomain` called every time, as subdomain created in `domain`
- Function called with `domain` as first argument
- The result of function call is ignored

### Arguments (#domain-hooks-onCreateDomain-callback-arguments)

1. `callback` ([_Watcher_]): A function that receives [Domain](/en/api/effector/Domain) and will be called during every [domain.createDomain](/en/api/effector/Domain#unit-creators-createDomain-name) call

### Returns (#domain-hooks-onCreateDomain-callback-returns)

[_Subscription_]: Unsubscribe function.

### Example (#domain-hooks-onCreateDomain-callback-example)

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
