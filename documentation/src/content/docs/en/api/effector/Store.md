---
title: Store
keywords:
  - store
  - unit
description: Store, its methods and properties
redirectFrom:
  - /api/effector/Store
  - /docs/api/effector/store
---

```ts
import { type Store, type StoreWritable } from "effector";
```

_Store_ is an object that holds the state value. Store gets updates when it receives a value that is not equal (`!==`) to the current one and to `undefined`. Store is a [Unit](/en/explanation/glossary#common-unit). Some stores can be [derived](#store-derived).

# Methods (#methods)

## `.map(fn)` (#methods-map-fn)

Creates a derived store. It will call a provided function with the state when the original store updates, and will use the result to update the derived store.

### Formulae (#methods-map-fn-formulae)

```ts
const $second = $first.map(fn);
```

### Arguments (#methods-map-fn-arguments)

1. `fn` (_Function_): Function that receives `state` and returns a new state for the derived store.
2. `config` (_Object_): Optional configuration.

### Returns (#methods-map-fn-returns)

[_DerivedStore_](/en/api/effector/Store#readonly): New derived store.

### Examples (#methods-map-fn-examples)

#### Basic (#methods-map-fn-examples-basic)

```js
import { createEvent, createStore } from "effector";

const changed = createEvent();
const $title = createStore("").on(changed, (_, newTitle) => newTitle);
const $length = $title.map((title) => title.length);

$length.watch((length) => {
  console.log("new length", length);
});

changed("hello");
changed("world");
changed("hello world");
```

[Try it](https://share.effector.dev/XGKGMvpF)

#### SkipVoid (#methods-map-fn-examples-skipVoid)

```js
const $length = $title.map((title) => title.length, { skipVoid: false });
```

## `.on(trigger, reducer)` (#methods-on-trigger-reducer)

Updates state when `trigger` is triggered by using a [reducer](/en/explanation/glossary#reducer).

### Formulae (#methods-on-trigger-reducer-formulae)

```ts
$store.on(trigger, reducer);
```

### Arguments (#methods-on-trigger-reducer-arguments)

1. `trigger`: _Event_, _Effect_, or another _Store_.
2. `reducer`: _Reducer_: Function that receives `state` and `params` and returns a new state.

### Returns (#methods-on-trigger-reducer-returns)

[_Store_](/en/api/effector/Store): Current store.

### Examples (#methods-on-trigger-reducer-examples)

#### Basic (#methods-on-trigger-reducer-examples-basic)

```js
import { createEvent, createStore } from "effector";

const $store = createStore(0);
const changed = createEvent();

$store.on(changed, (value, incrementor) => value + incrementor);

$store.watch((value) => {
  console.log("updated", value);
});

changed(2);
changed(2);
```

[Try it](https://share.effector.dev/O0JnDtIl)

## `.watch(watcher)` (#methods-watch-watcher)

Calls `watcher` function each time when the store is updated.

### Formulae (#methods-watch-watcher-formulae)

```ts
const unwatch = $store.watch(watcher);
```

### Arguments (#methods-watch-watcher-arguments)

1. `watcher`: [_Watcher_](/en/explanation/glossary#watcher): Watcher function that receives the current store state as the first argument.

### Returns (#methods-watch-watcher-returns)

[_Subscription_](/en/explanation/glossary#subscription): Unsubscribe function.

### Examples (#methods-watch-watcher-examples)

#### Basic (#methods-watch-watcher-examples-basic)

```js
const add = createEvent();
const $store = createStore(0).on(add, (state, payload) => state + payload);

$store.watch((value) => console.log(`current value: ${value}`));
add(4);
add(3);
```

## `.reset(...triggers)` (#methods-reset-triggers)

Resets store state to the default value.

### Formulae (#methods-reset-triggers-formulae)

```ts
$store.reset(...triggers);
```

### Arguments (#methods-reset-triggers-arguments)

1. `triggers`: (_(Event | Effect | Store)[]_): any number of _Events_, _Effects_, or _Stores_.

### Returns (#methods-reset-triggers-returns)

[_Store_](/en/api/effector/Store): Current store.

### Examples (#methods-reset-triggers-examples)

#### Basic (#methods-reset-triggers-examples-basic)

```js
import { createEvent, createStore } from "effector";

const increment = createEvent();
const reset = createEvent();

const $store = createStore(0)
  .on(increment, (state) => state + 1)
  .reset(reset);

$store.watch((state) => console.log("changed", state));

increment();
increment();
reset();
```

[Try it](https://share.effector.dev/7W8m2Zdg)

## `.off(trigger)` (#methods-off-trigger)

Removes reducer for the given `trigger`.

### Formulae (#methods-off-trigger-formulae)

```ts
$store.off(trigger);
```

### Arguments (#methods-off-trigger-arguments)

1. `trigger`: _Event_, _Effect_, or _Store_.

### Returns (#methods-off-trigger-returns)

[_Store_](/en/api/effector/Store): Current store.

### Examples (#methods-off-trigger-examples)

#### Basic (#methods-off-trigger-examples-basic)

```js
import { createEvent, createStore, merge } from "effector";

const changedA = createEvent();
const changedB = createEvent();

const $store = createStore(0);
const changed = merge([changedA, changedB]);

$store.on(changed, (state, params) => state + params);
$store.off(changed);
```

[Try it](https://share.effector.dev/bzdoyLHm)

# Properties (#properties)

## `.updates` (#properties-updates)

### Returns (#properties-updates-returns)

[_Event_](/en/api/effector/Event): Event that represents updates of the given store.

### Example (#properties-updates-example)

```js
import { createStore, is } from "effector";

const $clicksAmount = createStore(0);
is.event($clicksAmount.updates);

$clicksAmount.updates.watch((amount) => {
  console.log(amount);
});
```

[Try it](https://share.effector.dev/F5L5kLTE)

## `.reinit` (#properties-reinit)

### Returns (#properties-reinit-returns)

[_Event_](/en/api/effector/Event): Event that can reinitialize a store with a default value.

### Example (#properties-reinit-example)

```js
import { createStore, createEvent, sample, is } from "effector";

const $counter = createStore(0);
is.event($counter.reinit);

const increment = createEvent();

$counter.reinit();
console.log($counter.getState());
```

[Try it](https://share.effector.dev/vtJncyYn)

## `.shortName` (#properties-shortName)

### Returns (#properties-shortName-returns)

(_`string`_): ID or short name of the store.

## `.defaultState` (#properties-defaultState)

### Returns (#properties-defaultState-returns)

(_`State`_): Default state of the store.

### Example (#properties-defaultState-example)

```ts
const $store = createStore("DEFAULT");
console.log($store.defaultState === "DEFAULT");
```

# Utility methods (#utility-methods)

## `.getState()` (#utility-methods-getState)

Returns the current state of the store.

### Returns (#utility-methods-getState-returns)

(_`State`_): Current state of the store.

### Example (#utility-methods-getState-example)

```js
import { createEvent, createStore } from "effector";

const add = createEvent();

const $number = createStore(0).on(add, (state, data) => state + data);

add(2);
add(3);

console.log($number.getState());
```

[Try it](https://share.effector.dev/YrnlMuRj)

# Readonly store (#readonly)

TBD

# Types (#types)

```ts
import { type StoreValue } from "effector";
```

## `StoreValue<S>` (#types-StoreValue)

Extracts type of `Store` or `StoreWritable` value.

```ts
const $store: Store<Value>;
type Value = StoreValue<typeof $store>;
```
