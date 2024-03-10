---
title: guard
description: Method for conditional event routing.
redirectFrom:
  - /api/effector/guard
  - /docs/api/effector/guard
---

```ts
import { guard } from "effector";
```

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0).

The core team recommends using [sample](/en/api/effector/sample) instead of `guard`.
:::

Method for conditional event routing.
It provides a way to control one dataflow with the help of another: when the condition and the data are in different places, we can use `guard` with stores as filters to trigger events when condition state is true, thereby modulate signals without mixing them.

# Methods (#methods)

## `guard({ clock?, source?, filter, target? })` (#methods-guard-clock-source-filter-target)

### Formulae (#methods-guard-clock-source-filter-target-formulae)

```ts
guard({ clock?, source?, filter, target? }): target
```

:::info
Either `clock` or `source` is required
:::

When `clock` is triggered, check `filter` for [truthy] and call `target` with data from `source` if `true`.

- If `clock` is not passed, `guard` will be triggered on every `source` update
- If `source` is not passed, call `target` with data from `clock`
- If `target` is not passed, create [_Event_](/en/api/effector/Event) with type of `source` and return it from `guard()`
- If `filter` is [_Store_](/en/api/effector/Store), check it value for [truthy]
- If `filter` is `Function`, call it with data from `source` and check result for [truthy]

[truthy]: https://developer.mozilla.org/en-US/docs/Glossary/Truthy

:::info{title="since"}
`clock` in `guard` is available since [effector 21.8.0](https://changelog.effector.dev/#effector-21-8-0)
:::

## `guard({source, filter, target?})` (#methods-guard-source-filter-target)

### Arguments (#methods-guard-source-filter-target-arguments)

1. `params` (_Object_): Configuration object

### Returns (#methods-guard-source-filter-target-returns)

[_Event_](/en/api/effector/Event), which fires upon `clock` trigger

### Examples (#methods-guard-source-filter-target-examples)

#### Basic (#methods-guard-source-filter-target-examples-basic)

```js
import { createStore, createEffect, createEvent, guard } from "effector";

const clickRequest = createEvent();
const fetchRequest = createEffect((n) => new Promise((rs) => setTimeout(rs, 2500, n)));

const $clicks = createStore(0).on(clickRequest, (x) => x + 1);
const $requestsCount = createStore(0).on(fetchRequest, (x) => x + 1);

const $isIdle = fetchRequest.pending.map((pending) => !pending);

/*
1. on clickRequest
2. if $isIdle is true
3. take current $clicks value
4. and call fetchRequest with it
*/
guard({
  clock: clickRequest /* 1 */,
  filter: $isIdle /* 2 */,
  source: $clicks /* 3 */,
  target: fetchRequest /* 4 */,
});
```

See [ui visualization](https://share.effector.dev/zLB4NwNV)

#### Function predicate (#methods-guard-source-filter-target-examples-function-predicate)

```js
import { createEffect, createEvent, guard } from "effector";

const submitForm = createEvent();
const searchUser = createEffect();

guard({
  source: submitForm,
  filter: (user) => user.length > 0,
  target: searchUser,
});

submitForm(""); // nothing happens
submitForm("alice"); // ~> searchUser('alice')
```

[Try it](https://share.effector.dev/84j97tZ7)

## `guard(source, {filter: booleanStore})` (#methods-guard-source-filter-booleanStore)

### Arguments (#methods-guard-source-filter-booleanStore-arguments)

1. `source` ([_Store_](/en/api/effector/Store)/[_Event_](/en/api/effector/Event)/[_Effect_](/en/api/effector/Effect)): Source unit. Will trigger given `guard` on updates
2. `filter` ([_Store_](/en/api/effector/Store)): Filter store

### Examples (#methods-guard-source-filter-booleanStore-examples)

#### Store filter (#methods-guard-source-filter-booleanStore-examples-store-filter)

```js
import { createEvent, createStore, createApi, guard } from "effector";

const trigger = createEvent();
const $unlocked = createStore(true);

const { lock, unlock } = createApi($unlocked, {
  lock: () => false,
  unlock: () => true,
});

const target = guard(trigger, {
  filter: $unlocked,
});

target.watch(console.log);
trigger("A");
lock();
trigger("B"); // nothing happens
unlock();
trigger("C");
```

[Try it](https://share.effector.dev/6bqOCO4y)

## `guard(source, {filter: predicate})` (#methods-guard-source-filter-predicate)

### Arguments (#methods-guard-source-filter-predicate-arguments)

1. `source` ([_Store_](/en/api/effector/Store)/[_Event_](/en/api/effector/Event)/[_Effect_](/en/api/effector/Effect)): Source unit. Will trigger given `guard` on updates
2. `filter` (_(payload) => Boolean_): Predicate function, [should be **pure**](/en/explanation/glossary#purity)

### Examples (#methods-guard-source-filter-predicate-examples)

#### Predicate function (#methods-guard-source-filter-predicate-examples-predicate-function)

```js
import { createEvent, guard } from "effector";

const source = createEvent();
const target = guard(source, {
  filter: (x) => x > 0,
});

target.watch(() => {
  console.log("target called");
});

source(0);
// nothing happens
source(1);
// target called
```

[Try it](https://share.effector.dev/ethzpd8Y)
