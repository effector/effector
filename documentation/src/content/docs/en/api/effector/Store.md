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

_Store_ is an object that holds the state value. Store is getting updates when receives a value that is not
equal (`!==`) to current one and to `undefined`. Store is [Unit](/en/explanation/glossary#common-unit). Some stores can
be [derived](#store-derived).

<br/><br/>

# Methods {#methods}

## `map(fn)` {#map-fn}

Creates a derived store. It will call a provided function with the state, when the original store updates, and will use
the result to update the derived store

### Formulae {#map-fn-formulae}

```ts
const $second = $first.map(fn);
```

- When `$first` store is updated, call `fn` with new state and previous state
- Next update `$second` store with the result of `fn()` call and trigger all subscribers

### Arguments {#map-fn-arguments}

1. `fn` (_Function_): Function that receives `state` and `lastState?` and returns a new state for the derived store

If the function returns an old state or if it returns `undefined`, the new store will not be updated.

2. `config` (_Object_): Optional configuration
   - `skipVoid`: (_boolean_): Flag to control, how specifically store should handle `undefined` value _(since `effector 23.0.0`)_. If set to `false` - store will use `undefined` as a value. If set to `true` (deprecated), store will read `undefined` as a "skip update" command and will do nothing.

[Should be **pure**](/en/explanation/glossary#purity)

### Throws {#map-fn-throws}

<details>
<summary><b>unit call from pure function is not supported, use operators like sample instead</b></summary>

> Since: effector 23.0.0

Happens when events or effects called from [pure functions](/en/glossary#purity), like mappers:

```ts
const someHappened = createEvent<number>();
const $counter = createStore(0);

const $stringified = $counter.map((counter) => {
  someHappened(counter); // THROWS!
  return String(counter);
});
```

To fix this, use `sample`:

```ts
const someHappened = createEvent<number>();
const $counter = createStore(0);

const $stringified = $counter.map((counter) => {
  return String(counter);
});

sample({
  clock: $counter,
  target: someHappened,
});
```

</details>

### Returns {#map-fn-returns}

[_DerivedStore_](/en/api/effector/Store#readonly): New derived store

### Example {#map-fn-example}

```js
import { createEvent, createStore } from "effector";

const changed = createEvent();

const $title = createStore("").on(changed, (_, newTitle) => newTitle);

const $length = $title.map((title) => title.length);

$length.watch((length) => {
  console.log("new length", length);
});
// => new length 0

changed("hello");
// => new length 5

changed("world");
// no reaction

changed("hello world");
// => new length 11
```

[Try it](https://share.effector.dev/XGKGMvpF)

### Skip Void Example {#map-skip-void-example}

```js
const $length = $title.map((title) => title.length, {skipVoid: false});
```

## `on(trigger, reducer)` {#on}

Updates state when `trigger` is triggered by using [reducer](/en/explanation/glossary#reducer). For each trigger, the
last installed reducer will override previous reducers (useful for dynamic behavior).

### Formulae {#on-trigger-reducer-formulae}

```ts
$store.on(trigger, reducer);
```

- When `trigger` is triggered, call `reducer` with payload of the `trigger` and data of `$store`
- Next update `$store` with result of `reducer` call and trigger all subscribers

### Arguments {#on-trigger-reducer-arguments}

1. `trigger` [_Event_](/en/api/effector/Event), [_Effect_](/en/api/effector/Effect) or another [
   _Store_](/en/api/effector/Store)
2. `reducer` [_Reducer_](/en/explanation/glossary#reducer): Function that receives `state` and `params` and returns a
   new state, [should be **pure**](/en/explanation/glossary#purity).
   A store cannot hold an `undefined` value. If a reducer function returns `undefined`, the store will not be updated.
   - `state`: Current state of store
   - `params`: Parameters passed to the event call

### Throws {#on-trigger-reducer-throws}

<details>
<summary><b>unit call from pure function is not supported, use operators like sample instead</b></summary>

> Since: effector 23.0.0

Happens when events or effects called from [pure functions](/en/explanation/glossary#purity),
like [reducers](/en/explanation/glossary#reducer):

```ts
const someHappened = createEvent();
const increment = createEvent();
const $counter = createStore(0);

$counter.on(increment, (counter) => {
  someHappened(); // THROWS!
  return counter + 1;
});
```

To fix this use `sample`:

```ts
const someHappened = createEvent();
const increment = createEvent();
const $counter = createStore(0);

$counter.on(increment, (counter) => {
  return counter + 1;
});

sample({
  clock: increment,
  source: $counter,
  target: someHappened,
});
```

</details>

### Returns {#on-trigger-reducer-returns}

[_Store_](/en/api/effector/Store): Current store

### Example {#on-trigger-reducer-example}

```js
import { createEvent, createStore } from "effector";

const $store = createStore(0);
const changed = createEvent();

$store.on(changed, (value, incrementor) => value + incrementor);

$store.watch((value) => {
  console.log("updated", value);
});
// => updated 0

changed(2);
// => updated 2

changed(2);
// => updated 4
```

[Try it](https://share.effector.dev/O0JnDtIl)

## `on(triggers[], reducer)` {#on-triggers-reducer}

:::info{title="since"}
[effector 20.15.0](https://changelog.effector.dev/#effector-20-15-0)
:::
Updates state when any from `triggers` is triggered by using [reducer](/en/explanation/glossary#reducer).

### Formulae {#on-triggers-reducer-formulae}

```ts
$store.on([triggerA, triggerB, ...], reducer)
```

- When `triggerA` or `triggerB` is triggered, call `reducer` with payload of the `triggerA` or `triggerB` and data
  of `$store`
- Next update `$store` with result of `reducer` call and trigger all subscribers
- Any count of triggers can be passed to `triggers`

### Arguments {#on-triggers-reducer-arguments}

1. `triggers` array of [_Event_](/en/api/effector/Event), [_Effect_](/en/api/effector/Effect) or [
   _Store_](/en/api/effector/Store)
2. `reducer` [_Reducer_](/en/explanation/glossary#reducer): Function that receives `state` and `params` and returns a
   new state, [should be **pure**](/en/explanation/glossary#purity).
   A store cannot hold an `undefined` value. If a reducer function returns `undefined`, the store will not be updated.
   - `state`: Current state of store
   - `payload`: Value passed to event/effect call, or source if it passed as trigger

### Throws {#on-triggers-reducer-throws}

The same as [`on(trigger, reducer)`](#on-trigger-reducer-throws)

### Returns {#on-triggers-reducer-returns}

[_Store_](/en/api/effector/Store): Current store

### Example {#on-triggers-reducer-example}

```js
import { createEvent, createStore } from "effector";

const changedA = createEvent();
const changedB = createEvent();

const $store = createStore(0);

$store.on([changedA, changedB], (value, incrementor) => value + incrementor);

$store.watch((value) => {
  console.log("updated", value);
});

changedA(2);
// => updated 2

changedB(2);
// => updated 4

// You can unsubscribe from any trigger
$store.off(changedA);
```

[Try it](https://share.effector.dev/iP0oM3NF)

## `watch(watcher)` {#watch-watcher}

Call `watcher` function each time when store is updated. <br/>

### Formulae {#watch-watcher-formulae}

```ts
const unwatch = $store.watch(watcher);
```

- On initialize and each `$store` update, call `watcher` with the new state of `$store`
- When `unwatch` is called, stop calling `watcher`

### Arguments {#watch-watcher-arguments}

1. `watcher` ([_Watcher_](/en/explanation/glossary#watcher)): Watcher function that receives current store state as the
   first argument

### Returns {#watch-watcher-returns}

[_Subscription_](/en/explanation/glossary#subscription): Unsubscribe function

### Example {#watch-watcher-example}

```js
const add = createEvent();
const $store = createStore(0).on(add, (state, payload) => state + payload);

$store.watch((value) => console.log(`current value: ${value}`));
// => current value: 0
add(4);
// => current value: 4
add(3);
// => current value: 7
```

## `watch(trigger, watcher)` {#watch-trigger-watcher}

Run `watcher` only when `trigger` event triggered. <br/>

### Formulae {#watch-trigger-watcher-formulae}

```ts
const unwatch = $store.watch(trigger, watcher);
```

- On each `$store` update with passed `trigger`, call `watcher` with the new state of `$store` and payload
  from `trigger`
- When `unwatch` is called, stop calling `watcher`

### Arguments {#watch-trigger-watcher-arguments}

1. `trigger` [_Event_](/en/api/effector/Event), [_Effect_](/en/api/effector/Effect) or [
   _Store_](/en/api/effector/Store): Trigger, which leads to call of `watcher`
1. `watcher` (_Function_): Function that receives current store state as the first argument and payload of trigger as
   the second argument.

### Returns {#watch-trigger-watcher-returns}

[_Subscription_](/en/explanation/glossary#subscription): Unsubscribe function

### Example {#watch-trigger-watcher-example}

`.watch` trigger `watcher` when `foo` is executed, because `foo` is explicitly passed to `watch`. <br/>
First argument of `watcher` is a state value, second is an event value.

```js
import { createEvent, createStore } from "effector";

const foo = createEvent();
const bar = createEvent();

const $store = createStore(0);

$store.watch(foo, (storeValue, eventValue) => {
  console.log(`triggered ${storeValue}, ${eventValue}`);
});

foo(1);
// => triggered 0, 1

bar(2);

foo(3);
// => triggered 0, 3
```

[Try it](https://share.effector.dev/xEltaFyH)

## `reset(...triggers)` {#reset-triggers}

Resets store state to the default value.

A state is reset when _Event_ or _Effect_ is called or another _Store_ is changed.

### Formulae {#reset-triggers-formulae}

```ts
$store.reset(...triggers);
```

- When any unit from `triggers` list is triggered, update `$store` with its default state,
  from `createStore(defaultState)`

### Arguments {#reset-triggers-arguments}

1. `triggers` (_(Event | Effect | Store)[]_): any number of [_Events_](/en/api/effector/Event), [
   _Effects_](/en/api/effector/Effect) or [_Stores_](/en/api/effector/Store)

### Returns {#reset-triggers-returns}

[_Store_](/en/api/effector/Store): Current store

### Example {#reset-triggers-example}

```js
import { createEvent, createStore } from "effector";

const increment = createEvent();
const reset = createEvent();

const $store = createStore(0)
  .on(increment, (state) => state + 1)
  .reset(reset);

$store.watch((state) => console.log("changed", state));
// changed 0
// watch method calls its function immediately

increment(); // changed 1
increment(); // changed 2
reset(); // changed 0
```

[Try it](https://share.effector.dev/7W8m2Zdg)

## `reset(triggersArray)` {#reset-triggersArray}

:::info{title="since"}
[effector 20.15.0](https://changelog.effector.dev/#effector-20-15-0)
:::
Resets store state to the default value. An overload for arrays of units, which make `reset` consistent
with [merge](/en/api/effector/merge) and [store.on(triggers[], fn)](/en/api/effector/Store#on-triggers-reducer)

A state is reset when _Event_ or _Effect_ is called or another _Store_ is changed.

### Formulae {#reset-triggersArray-formulae}

```ts
$store.reset([triggerA, triggerB, ...])
```

- When any unit from `triggersArray` list is triggered, update `$store` with its default state,
  from `createStore(defaultState)`

### Arguments {#reset-triggersArray-arguments}

1. `triggersArray` (_(Event | Effect | Store)[]_): any number of [_Events_](/en/api/effector/Event), [
   _Effects_](/en/api/effector/Effect) or [_Stores_](/en/api/effector/Store)

### Returns {#reset-triggersArray-returns}

[_Store_](/en/api/effector/Store): Current store

### Example {#reset-triggersArray-example}

```js
import { createEvent, createStore } from "effector";

const increment = createEvent();
const reset = createEvent();

const $store = createStore(0)
  .on(increment, (state) => state + 1)
  .reset([reset]);

$store.watch((state) => console.log("changed", state));
// changed 0
// watch method calls its function immediately

increment(); // changed 1
increment(); // changed 2
reset(); // changed 0
```

[Try it](https://share.effector.dev/ot6R5ePc)

## `off(trigger)` {#off-trigger}

```ts
$store.off(trigger);
```

- Removes reducer for given `trigger`, which was installed via [\$store.on](/en/api/effector/Store#on-triggers-reducer)
  or [\$store.reset](/en/api/effector/Store#reset-triggers)
- If there was no reducer for that `trigger`, this method will do nothing

### Arguments {#off-trigger-arguments}

1. `trigger`: [_Event_](/en/api/effector/Event), [_Effect_](/en/api/effector/Effect) or [
   _Store_](/en/api/effector/Store)

### Returns {#off-trigger-returns}

[_Store_](/en/api/effector/Store): Current store

### Example {#off-trigger-example}

```js
import { createEvent, createStore } from "effector";

const changedA = createEvent();
const changedB = createEvent();

const $store = createStore(0);

// If you want to unsubscribe from all triggers simultaneously, better to manually merge
const changed = merge([changedA, changedB]);

$store.on(changed, (state, params) => state + params);

$store.off(changed);
```

[Try it](https://share.effector.dev/bzdoyLHm)

# Properties {#properties}

## `updates` {#updates}

### Formulae {#updates-formulae}

```ts
$store.updates;
```

- When `$store` is **changed** trigger `updates` event with the new state

### Returns {#updates-returns}

[_Event_](/en/api/effector/Event): Event that represents updates of the given store.

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on a store.
:::

### Example {#updates-example}

Use case: watchers, which will not trigger immediately after creation (unlike [
_store.watch_](/en/api/effector/Store#watch-watcher))

```js
import { createStore, is } from "effector";

const $clicksAmount = createStore(0);
is.event($clicksAmount.updates); // => true

$clicksAmount.watch((amount) => {
  console.log("will be triggered with current state, immediately, sync", amount);
});

$clicksAmount.updates.watch((amount) => {
  console.log("will not be triggered unless store value is changed", amount);
});
```

[Try it](https://share.effector.dev/F5L5kLTE)

## `reinit` {#store-reinit}

:::info{title="since"}
Supported since effector 22.4.0
:::

### Formulae {#store-reinit-formulae}

```ts
$store.reinit; // Event<void>
```

- Trigger `reinit` to set default value as a current value in the `$store`

### Returns {#store-reinit-returns}

[_Event_](/en/api/effector/Event): Event that can reinitialize a store with a default value.

### Example {#store-reinit-example}

Use case: reset counter to default value

```js
import { createStore, createEvent, sample, is } from "effector";

const $counter = createStore(0);
is.event($counter.reinit); // => true

const increment = createEvent();

sample({
  clock: increment,
  source: $counter,
  fn: (counter) => counter + 1,
  target: $counter,
});

console.log("Initial value: ", $counter.getState()); // => Initial value: 0

increment();
console.log("Incremented value: ", $counter.getState()); // => Incremented value: 1

$counter.reinit();
console.log("Reinitialized value: ", $counter.getState()); // => Reinitialized value: 0
```

[Try it](https://share.effector.dev/vtJncyYn)

## `shortName` {#shortName}

### Returns {#shortName-returns}

(_`string`_): ID or short name of the store

## `defaultState` {#defaultState}

### Returns {#defaultState-returns}

(_`State`_): Default state of the store

### Example {#defaultState-example}

```ts
const $store = createStore("DEFAULT");

console.log($store.defaultState === "DEFAULT");
// => true
```

# Utility methods

## `getState()` {#getState}

Returns current state of store

:::warning{title="You don't need this method!"}
`getState()` usage can result in difficult-to-debug imperative code and create a kind of race condition.
Prefer declarative [sample](/en/api/effector/sample) to pass data from store and [attach](/en/api/effector/attach) for
effects
:::

### Returns {#getState-returns}

(_`State`_): Current state of the store

### Example {#getState-example}

```js
import { createEvent, createStore } from "effector";

const add = createEvent();

const $number = createStore(0).on(add, (state, data) => state + data);

$number.watch((n) => {
  console.log(n);
});
// => 0

add(2);
// => 2

add(3);
// => 5
```

[Try it](https://share.effector.dev/YrnlMuRj)

<br/><br/>

# Readonly store {#readonly}

_ReadonlyStore_ has no specific interface in TypeScript, but it has different implementation in the effector kernel.

Some methods
like [combine](/en/api/effector/combine), [.map](#mapfn-state-state-laststate-t--t-firststate-t), [sample](/en/api/effector/sample), [.pending](/en/api/effector/Effect#pending)
returns `Store` instance.
The store updates by specific rules defined in the method above. That's why we have different types of stores.

Derived stores are not allowed to be modified from the outside. For example, you shall not add new triggers on the
readonly store:

```ts
const update = createEvent();
const $a = createStore(1);
const $b = createStore(2);

const $derived = combine({ a: $a, b: $b });
$derived.on(update, (_, value) => ({ a: value, b: value }));
// => .on in readonly store is deprecated, use createStore instead
```

Readonly store only allows methods that do not modify state. It means that ReadonlyStore cannot be used as `target`
in `sample`:

```ts
const update = createEvent();
const $a = createStore(1);
const $b = createStore("foo");

const $derived = combine({ a: $a, b: $b });

sample({
  clock: update,
  fn: (value) => ({ a: value, b: value }),
  target: $derived,
});
// => sample: readonly unit in "target" is deprecated, use createEvent/createStore instead
```

These methods are <u>allowed</u> for ReadonlyStore:

- `.map`
- `.watch`
- using ReadonlyStore as a `source` and/or `clock` in `sample` and so on
- using ReadonlyStore in `combine` sources

:::warning{title="deprecation"}
since 23.0.0 banned methods will throw an exception
:::

These methods are _banned_ for ReadonlyStore:

- `.on`
- `.reset`
- using ReadonlyStore as a `target` in `sample`, `guard` and so on

Moreover, ReadonlyStore _does not have_ the following properties:

- `.reinit`, because it is not possible to reinitialize read-only store

Any kind of store can be used as a `clock` or `source` in methods like [sample](/en/api/effector/sample).
