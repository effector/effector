---
title: Store API
keywords:
  - store
  - unit
description: Store, its methods and properties
redirectFrom:
  - /api/effector/Store
  - /docs/api/effector/store
---

# Store API (#store-api)

```ts
import { type Store, type StoreWritable, createStore } from "effector";

const $store = createStore();
```

A _Store_ is an object that holds the state value. The store updates when the new value is not strictly equal (`!==`) to the current one and is not `undefined` (unless the store is configured with `skipVoid: false`). A store is a [Unit](/en/explanation/glossary#common-unit). Some stores can be [derived](/en/explanation/glossary#derived-store).

:::tip{title="What is a store anyway?"}
If you're not yet familiar with how to work with a store, feel free to start [here](/en/essentials/manage-states).
:::

## Store Interface (#store-interface)

Available store methods and properties:

| Method/Property                                       | Description                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| [`map(fn)`](#methods-map-fn)                          | Creates a new [derived store](/en/explanation/glossary#derived-store)                                  |
| [`on(trigger, reducer)`](#methods-on-trigger-reducer) | Updates state via a `reducer` when the `trigger` is fired    |
| [`watch(watcher)`](#methods-watch-watcher)            | Calls the `watcher` function every time the store is updated |
| [`reset(...triggers)`](#methods-reset-triggers)       | Resets the store to its initial state                        |
| [`off(trigger)`](#methods-off-trigger)                | Removes the subscription to the specified trigger            |
| [`updates()`](#properties-updates)                    | Event that fires when the store updates                      |
| [`reinit()`](#properties-reinit)                      | Event to reinitialize the store                              |
| [`shortName`](#properties-shortName)                  | ID or short name of the store                                |
| [`defaultState`](#properties-defaultState)            | Initial state of the store                                   |
| [`getState()`](#utility-methods-getState)             | Returns the current state                                    |

## Immutability (#immutability)

A store in effector is immutable. This means that updates will only occur if the handler function (such as `combine`, `sample`, or `on`) returns a new object.

For example, before using array methods, you need to create a new reference to it. Here’s how to do it correctly:

```ts
$items.on(addItem, (items, newItem) => {
  const updatedItems = [...items];
  // ✅ .push method is called on a new array
  updatedItems.push(newItem);
  return updatedItems;
});
```

This approach should not be used, as the store **will not be updated**:

```ts
$items.on(addItem, (items, newItem) => {
  // ❌ Error! The array reference remains the same, the store will not be updated
  items.push(newItem);
  return items;
});
```

Updating objects works in a similar way.

A store in effector should be as small as possible, responsible for a specific part of the business logic, unlike, for example, Redux, whose store tends to hold everything together. When the state is atomic, the need for spreading objects becomes less frequent. However, if there is a need to frequently update deeply nested data, it is acceptable to use [immer](https://immerjs.github.io/immer/produce) to simplify repetitive code when updating the state.

## Store Methods (#methods)

### `.map(fn)` (#methods-map-fn)

Accepts a function `fn` and returns a [derived store](/en/explanation/glossary#derived-store) that automatically updates when the original store changes.

:::tip{title="Recommendation"}
For creating derived stores, prefer using [`combine($store, fn)`](/en/api/effector/combine#methods-combine-store-fn) over `.map()` for better composability and consistency with other combine forms.
:::

- **Formulae**

```ts
$source.map(fn, config?);
```

- **Type**

```ts
const $derived = $source.map<T>(
  fn: (value: SourceValue) => T,
  config?: {
    skipVoid?: boolean
  }
): Store<T>
```

- **Examples**

Basic usage:

```ts
import { createEvent, createStore } from "effector";

const changed = createEvent<string>();

const $title = createStore("");
const $titleLength = $title.map((title) => title.length);

$title.on(changed, (_, newTitle) => newTitle);

$titleLength.watch((length) => {
  console.log("new length", length);
});

changed("hello");
changed("world");
changed("hello world");
```

[Try it](https://share.effector.dev/XGKGMvpF)

You can pass a config object with `skipVoid: false` to allow the store to accept `undefined`:

```js
const $titleLength = $title.map((title) => title.length, { skipVoid: false });
```

- **Detailed Description**

The `map` method runs the function `fn` with the current store state as input every time the original store updates.
The return value becomes the new state of the [derived store](/en/explanation/glossary#derived-store).

- **Returns**

Returns a new [derived store](/en/explanation/glossary#derived-store).

### `.on(trigger, reducer)` (#methods-on-trigger-reducer)

Updates state using a [reducer](/en/explanation/glossary#reducer) when the `trigger` is fired.

- **Formulae**

```ts
$store.on(trigger, reducer);
```

- **Type**

```ts
$store.on<T>(
  trigger: Unit<T> | Unit<T>[]
  reducer: (state: State, payload: T) => State | void
): this
```

- **Examples**

```ts
import { createEvent, createStore } from "effector";

const $counter = createStore(0);
const incrementedBy = createEvent<number>();

$counter.on(incrementedBy, (value, incrementor) => value + incrementor);

$counter.watch((value) => {
  console.log("updated", value);
});

incrementedBy(2);
incrementedBy(2);
```

[Try it](https://share.effector.dev/O0JnDtIl)

- **Returns**

Returns the [current store](/en/api/effector/Store).

### `.watch(watcher)` (#methods-watch-watcher)

Calls the `watcher` function whenever the store updates.

- **Formulae**

```ts
const unwatch = $store.watch(watcher);
```

- **Type**

```ts
$store.watch(watcher: (state: State) => any): Subscription
```

- **Examples**

```ts
import { createEvent, createStore } from "effector";

const add = createEvent<number>();
const $store = createStore(0);

$store.on(add, (state, payload) => state + payload);

$store.watch((value) => console.log(`current value: ${value}`));

add(4);
add(3);
```

[Try it](https://share.effector.dev/aj0A6OI4)

- **Returns**

Returns a [subscription cancellation function](/en/explanation/glossary#subscription).

### `.reset(...triggers)` (#methods-reset-triggers)

Resets the store to its default value when any of the `triggers` fire.

- **Formulae**

```ts
$store.reset(...triggers);
```

- **Type**

```ts
$store.reset(...triggers: Array<Unit<any>>): this
```

- **Examples**

```ts
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

- **Returns**

Returns the current store.

### `.off(trigger)` (#methods-off-trigger)

Removes the reducer for the specified `trigger`.

- **Formulae**

```ts
$store.off(trigger);
```

- **Type**

```ts
$store.off(trigger: Unit<any>): this
```

- **Examples**

```ts
import { createEvent, createStore, merge } from "effector";

const changedA = createEvent();
const changedB = createEvent();

const $store = createStore(0);
const changed = merge([changedA, changedB]);

$store.on(changed, (state, params) => state + params);
$store.off(changed);
```

[Try it](https://share.effector.dev/bzdoyLHm)

- **Returns**

Returns the current store.

## Store Properties (#properties)

### `.updates` (#properties-updates)

An event that fires on every store update.

- **Examples**

```ts
import { createStore, is } from "effector";

const $clicksAmount = createStore(0);
is.event($clicksAmount.updates); // true

$clicksAmount.updates.watch((amount) => {
  console.log(amount);
});
```

[Try it](https://share.effector.dev/F5L5kLTE)

- **Returns**

A [derived event](/en/api/effector/Event#event) representing the store's updates.

### `.reinit` (#properties-reinit)

Event to reinitialize the store to its default state.

- **Examples**

```ts
import { createStore, createEvent, sample, is } from "effector";

const $counter = createStore(0);
is.event($counter.reinit);

const increment = createEvent();

$counter.reinit();
console.log($counter.getState());
```

[Try it](https://share.effector.dev/vtJncyYn)

- **Returns**

An [event](/en/api/effector/Event#eventCallable) that reinitializes the store.

### `.shortName` (#properties-shortName)

A string property containing the store's ID or short name.

- **Examples**

```ts
const $store = createStore(0, {
  name: "someName",
});

console.log($store.shortName); // someName
```

[Try it](https://share.effector.dev/vtJncyYn)

- **Returns**

The store’s ID or short name.

### `.defaultState` (#properties-defaultState)

The store’s default state value.

- **Example**

```ts
const $store = createStore("DEFAULT");

console.log($store.defaultState === "DEFAULT"); // true
```

- **Returns**

The default state value.

## Utility Methods (#utility-methods)

### `.getState()` (#utility-methods-getState)

Returns the current state of the store.

:::warning{title="Caution!"}
Using `getState()` in business logic is not recommended — it's better to pass data through `sample`.
:::

- **Examples**

```ts
import { createEvent, createStore } from "effector";

const add = createEvent<number>();

const $number = createStore(0).on(add, (state, data) => state + data);

add(2);
add(3);

console.log($number.getState());
```

[Try it](https://share.effector.dev/YrnlMuRj)

- **Returns**

The current state of the store.

## Related APIs (#related-api)

- [`createStore`](/en/api/effector/createStore) – Creates a new store
- [`combine`](/en/api/effector/combine) – Combines multiple stores into a [derived store](/en/explanation/glossary#derived-store)
- [`sample`](/en/api/effector/sample) – A core operator for connecting units
- [`createEvent`](/en/api/effector/createEvent) – Creates an event
- [`createEffect`](/en/api/effector/createEffect) – Creates an effect
