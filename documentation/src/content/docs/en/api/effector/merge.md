---
title: merge
description: merge is a method for creating an event triggered by given units
redirectFrom:
  - /api/effector/merge
  - /docs/api/effector/merge
---

```ts
import { merge, type Unit } from "effector";
```

# Methods (#methods)

## `merge(units)` (#methods-merge-units)

:::info{title="since"}
[effector 20.0.0](https://changelog.effector.dev/#effector-20-0-0)
:::

Merges an array of units (events, effects, or stores), returning a new event that triggers upon any of the given units being triggered.

```ts
merge(units: Unit[]): Event<T>
```

### Arguments (#methods-merge-units-arguments)

1. `units`: An array of [units](/en/explanation/glossary#common-unit) to be merged.

### Returns (#methods-merge-units-returns)

[_Event_](/en/api/effector/Event): A new event that fires when any of the given units is triggered.

:::tip
In the case of a store, the resulting event will fire upon store updates.
:::

### Types (#methods-merge-units-types)

TBD

### Examples (#methods-merge-units-examples)

#### Basic Usage (#methods-merge-units-examples-basic-usage)

```js
import { createEvent, merge } from "effector";

const foo = createEvent();
const bar = createEvent();
const baz = merge([foo, bar]);
baz.watch((v) => console.log("merged event triggered: ", v));

foo(1);
// => merged event triggered: 1
bar(2);
// => merged event triggered: 2
```

[Try it](https://share.effector.dev/WxUgr6dZ)

#### Working with Stores (#methods-merge-units-examples-working-with-stores)

```js
import { createEvent, createStore, merge } from "effector";

const setFoo = createEvent();
const setBar = createEvent();

const $foo = createStore(0).on(setFoo, (_, v) => v);
const $bar = createStore(100).on(setBar, (_, v) => v);

const anyUpdated = merge([$foo, $bar]);
anyUpdated.watch((v) => console.log(`state changed to: ${v}`));

setFoo(1); // => state changed to: 1
setBar(123); // => state changed to: 123
```

[Try it](https://share.effector.dev/Rp9wuRvl)

#### Merging a Store and an Event (#methods-merge-units-examples-merging-a-store-and-an-event)

```js
import { createEvent, createStore, merge } from "effector";

const setFoo = createEvent();
const otherEvent = createEvent();

const $foo = createStore(0).on(setFoo, (_, v) => v);
const merged = merge([$foo, otherEvent]);

merged.watch((v) => console.log(`merged event payload: ${v}`));

setFoo(999);
// => merged event payload: 999

otherEvent("bar");
// => merged event payload: bar
```

[Try it](https://share.effector.dev/pKkiyhVQ)
