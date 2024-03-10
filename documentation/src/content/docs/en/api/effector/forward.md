---
title: forward
description: Method to create connection between units in a declarative way. Send updates from one set of units to another
redirectFrom:
  - /api/effector/forward
  - /docs/api/effector/forward
---

```ts
import { forward, type Subscription } from "effector";
```

Method to create connection between units in a declarative way. Send updates from one set of units to another.

# Methods (#methods)

## `forward({ from, to })` (#methods-forward)

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0).

The core team recommends using [sample](/en/api/effector/sample) instead of `forward`.
:::

### Formulae (#methods-forward-formulae)

```ts
forward({
  from: Unit | Unit[],
  to: Unit | Unit[]
}): Subscription
```

### Arguments (#methods-forward-arguments)

1. `from` ([Unit | Unit\[\]](/en/explanation/glossary#common-unit)): Source of updates. Forward will listen for changes of these units

   - if an [_Event_] is passed, `to` will be triggered on each event trigger and receives event argument
   - if a [_Store_] is passed, `to` will be triggered on each store **change** and receives new value of the store
   - if an [_Effect_] is passed, `to` will be triggered on each effect call and receives effect parameter
   - if an array of [units](/en/explanation/glossary#common-unit) is passed, `to` will be triggered when any unit in `from` array is triggered

2. `to` ([Unit | Unit\[\]](/en/explanation/glossary#common-unit)): Target for updates. `forward` will trigger these units with data from `from`
   - if passed an [_Event_], it will be triggered with data from `from` unit
   - if passed a [_Store_], data from `from` unit will be written to store and **trigger its update**
   - if passed an [_Effect_], it will be called with data from `from` unit as parameter
   - if `to` is an array of [units](/en/explanation/glossary#common-unit), each unit in that array will be triggered

### Returns (#methods-forward-returns)

[Subscription](/en/explanation/glossary#subscription): Unsubscribe function. It breaks connection between `from` and `to`. After call, `to` will not be triggered anymore.

:::info{title="since"}
Arrays of units are supported since [effector 20.6.0](https://changelog.effector.dev/#effector-20-6-0)
:::

### Examples (#methods-forward-examples)

#### Send store updates to another store (#methods-forward-examples-send-store-updates)

```js
import { createStore, createEvent, forward } from "effector";

const $store = createStore(1);
const event = createEvent();

forward({
  from: event,
  to: $store,
});

$store.watch((state) => console.log("store changed: ", state));
// => store changed: 1

event(200);
// => store changed: 200
```

[Try it](https://share.effector.dev/UeJbgRG9)

#### Forward between arrays of units (#methods-forward-examples-forward-between-arrays)

```js
import { createEvent, forward } from "effector";

const firstSource = createEvent();
const secondSource = createEvent();

const firstTarget = createEvent();
const secondTarget = createEvent();

forward({
  from: [firstSource, secondSource],
  to: [firstTarget, secondTarget],
});

firstTarget.watch((e) => console.log("first target", e));
secondTarget.watch((e) => console.log("second target", e));

firstSource("A");
// => first target A
// => second target A
secondSource("B");
// => first target B
// => second target B
```

[Try it](https://share.effector.dev/8aVpg8nU)

[_effect_]: /en/api/effector/Effect
[_store_]: /en/api/effector/Store
[_event_]: /en/api/effector/Event
