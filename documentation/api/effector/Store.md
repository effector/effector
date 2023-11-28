---
id: store
title: Store
keywords:
  - store
  - unit
description: Store, its methods and properties
---

_Store_ is an object that holds the state value. Store is getting updates when receives a value that is not equal (`!==`) to current one and to `undefined`. Store is [Unit](../../explanation/glossary.md#common-unit). Some stores can be [derived](#derived-store).

## Store Methods

### `map(fn: (state: State, lastState?: T) => T, firstState: T)`

:::note
Since [effector 21.8.0](https://github.com/effector/effector/releases/tag/effector%4021.8.0) the second argument of `fn` and `firstState` are deprecated, use [`updateFilter`](./createStore.md) or explicit `createStore` instead.
:::

Creates a derived store. It will call a provided function with the state, when the original store updates, and will use the result to update the derived store

#### Formulae

```ts
const $second = $first.map(fn)
```

- When `$first` store is updated, call `fn` with new state and previous state
- Next update `$second` store with result of `fn()` call and trigger all subscribers

**Arguments**

1. `fn` (_Function_): Function that receives `state` and `lastState?` and returns a new state for the derived store

If the function returns an old state or if it returns `undefined`, the new store will not be updated.

[Should be **pure**](../../explanation/glossary.md#purity)

**Returns**

[_DerivedStore_](Store.md#derived-store): New derived store

#### Example

```js
import {createEvent, createStore} from 'effector'

const changed = createEvent()

const $title = createStore('').on(changed, (_, newTitle) => newTitle)

const $length = $title.map(title => title.length)

$length.watch(length => {
  console.log('new length', length)
})
// => new length 0

changed('hello')
// => new length 5

changed('world')
// no reaction

changed('hello world')
// => new length 11
```

[Try it](https://share.effector.dev/XGKGMvpF)

<hr />

### `on(trigger, reducer)`

Updates state when `trigger` is triggered by using [`reducer`](../../explanation/glossary.md#reducer). For each trigger, last installed reducer will override previous reducers (useful for dynamic behavior).

#### Formulae

```ts
$store.on(trigger, reducer)
```

- When `trigger` is triggered, call `reducer` with payload of the `trigger` and data of `$store`
- Next update `$store` with result of `reducer` call and trigger all subscribers

**Arguments**

1. `trigger` [_Event_](Event.md), [_Effect_](Effect.md) or another [_Store_](./Store.md)
2. `reducer` [_Reducer_](../../explanation/glossary.md#reducer): Function that receives `state` and `params` and returns a new state, [should be **pure**](../../explanation/glossary.md#purity).
   A store cannot hold an `undefined` value. If a reducer function returns `undefined`, the store will not be updated.
   - `state`: Current state of store
   - `params`: Parameters passed to event call

**Returns**

[_Store_](Store.md): Current store

#### Example

```js
import {createEvent, createStore} from 'effector'

const $store = createStore(0)
const changed = createEvent()

$store.on(changed, (value, incrementor) => value + incrementor)

$store.watch(value => {
  console.log('updated', value)
})
// => updated 0

changed(2)
// => updated 2

changed(2)
// => updated 4
```

[Try it](https://share.effector.dev/O0JnDtIl)

<hr />

### `on(triggers[], reducer)`

:::note since
effector 20.15.0
:::
Updates state when any from `triggers` is triggered by using [`reducer`](../../explanation/glossary.md#reducer).

#### Formulae

```ts
$store.on([triggerA, triggerB, ...], reducer)
```

- When `triggerA` or `triggerB` is triggered, call `reducer` with payload of the `triggerA` or `triggerB` and data of `$store`
- Next update `$store` with result of `reducer` call and trigger all subscribers
- Any count of triggers can be passed to `triggers`

**Arguments**

1. `triggers` array of [_Event_](Event.md), [_Effect_](Effect.md) or [_Store_](Store.md)
2. `reducer` [_Reducer_](../../explanation/glossary.md#reducer): Function that receives `state` and `params` and returns a new state, [should be **pure**](../../explanation/glossary.md#purity).
   A store cannot hold an `undefined` value. If a reducer function returns `undefined`, the store will not be updated.
   - `state`: Current state of store
   - `payload`: Value passed to event/effect call, or source if it passed as trigger

**Returns**

[_Store_](Store.md): Current store

#### Example

```js
import {createEvent, createStore} from 'effector'

const changedA = createEvent()
const changedB = createEvent()

const $store = createStore(0)

$store.on([changedA, changedB], (value, incrementor) => value + incrementor)

$store.watch(value => {
  console.log('updated', value)
})

changedA(2)
// => updated 2

changedB(2)
// => updated 4

// You can unsubscribe from any trigger
$store.off(changedA)
```

[Try it](https://share.effector.dev/iP0oM3NF)

<hr />

### `watch(watcher)`

Call `watcher` function each time when store is updated. <br/>

#### Formulae

```ts
const unwatch = $store.watch(watcher)
```

- On initialize and each `$store` update, call `watcher` with the new state of `$store`
- When `unwatch` is called, stop calling `watcher`

**Arguments**

1. `watcher` ([_Watcher_](../../explanation/glossary.md#watcher)): Watcher function that receives current store state as the first argument

**Returns**

[_Subscription_](../../explanation/glossary.md#subscription): Unsubscribe function

#### Example

```js
const add = createEvent()
const $store = createStore(0).on(add, (state, payload) => state + payload)

$store.watch(value => console.log(`current value: ${value}`))
// => current value: 0
add(4)
// => current value: 4
add(3)
// => current value: 7
```

<hr />

### `watch(trigger, watcher)`

:::note
Since [effector 23.0.0](https://github.com/effector/effector/releases/tag/effector%4023.0.0) the second argument of `watch` is deprecated, use [`sample`](./sample.md) to run a function after `clock` field trigerred instead.
:::

Run `watcher` only when `trigger` event triggered. <br/>

#### Formulae

```ts
const unwatch = $store.watch(trigger, watcher)
```

- On each `$store` update with passed `trigger`, call `watcher` with the new state of `$store` and payload from `trigger`
- When `unwatch` is called, stop calling `watcher`

**Arguments**

1. `trigger` [_Event_](Event.md), [_Effect_](Effect.md) or [_Store_](Store.md): Trigger, which leads to call of `watcher`
1. `watcher` (_Function_): Function that receives current store state as the first argument and payload of trigger as the second argument.

**Returns**

[_Subscription_](../../explanation/glossary.md#subscription): Unsubscribe function

#### Example 1

`.watch` trigger `watcher` when `foo` is executed, because `foo` is explicitly passed to `watch`. <br/>
First argument of `watcher` is a state value, second is an event value.

```js
import {createEvent, createStore} from 'effector'

const foo = createEvent()
const bar = createEvent()

const $store = createStore(0)

$store.watch(foo, (storeValue, eventValue) => {
  console.log(`triggered ${storeValue}, ${eventValue}`)
})

foo(1)
// => triggered 0, 1

bar(2)

foo(3)
// => triggered 0, 3
```

[Try it](https://share.effector.dev/xEltaFyH)

<hr />

### `reset(...triggers)`

Resets store state to the default value.

A state is reset when _Event_ or _Effect_ is called or another _Store_ is changed.

#### Formulae

```ts
$store.reset(...triggers)
```

- When any unit from `triggers` list is triggered, update `$store` with its default state, from `createStore(defaultState)`

**Arguments**

1. `triggers` (_(Event | Effect | Store)[]_): any number of [_Events_](Event.md), [_Effects_](Effect.md) or [_Stores_](Store.md)

**Returns**

[_Store_](Store.md): Current store

#### Example

```js
import {createEvent, createStore} from 'effector'

const increment = createEvent()
const reset = createEvent()

const $store = createStore(0)
  .on(increment, state => state + 1)
  .reset(reset)

$store.watch(state => console.log('changed', state))
// changed 0
// watch method calls its function immediately

increment() // changed 1
increment() // changed 2
reset() // changed 0
```

[Try it](https://share.effector.dev/7W8m2Zdg)

<hr />

### `reset(triggersArray)`

:::note since
effector 20.15.0
:::
Resets store state to the default value. An overload for arrays of units, which make `reset` consistent with [merge](./merge.md) and [store.on(triggers[], fn)](./Store.md#ontriggers-reducer)

A state is reset when _Event_ or _Effect_ is called or another _Store_ is changed.

#### Formulae

```ts
$store.reset([triggerA, triggerB, ...])
```

- When any unit from `triggersArray` list is triggered, update `$store` with its default state, from `createStore(defaultState)`

**Arguments**

1. `triggersArray` (_(Event | Effect | Store)[]_): any number of [_Events_](Event.md), [_Effects_](Effect.md) or [_Stores_](Store.md)

**Returns**

[_Store_](Store.md): Current store

#### Example

```js
import {createEvent, createStore} from 'effector'

const increment = createEvent()
const reset = createEvent()

const $store = createStore(0)
  .on(increment, state => state + 1)
  .reset([reset])

$store.watch(state => console.log('changed', state))
// changed 0
// watch method calls its function immediately

increment() // changed 1
increment() // changed 2
reset() // changed 0
```

[Try it](https://share.effector.dev/ot6R5ePc)

<hr />

### `off(trigger)`

```ts
$store.off(trigger)
```

- Removes reducer for given `trigger`, which was installed via [\$store.on](./Store.md#ontrigger-reducer) or [\$store.reset](./Store.md#resettriggers)
- If there was no reducer for that `trigger`, this method will do nothing

**Arguments**

1. `trigger`: [_Event_](Event.md), [_Effect_](Effect.md) or [_Store_](Store.md)

**Returns**

[_Store_](Store.md): Current store

#### Example

```js
import {createEvent, createStore} from 'effector'

const changedA = createEvent()
const changedB = createEvent()

const $store = createStore(0)

// If you want to unsubscribe from all triggers simultaneously, better to manually merge
const changed = merge([changedA, changedB])

$store.on(changed, (state, params) => state + params)

$store.off(changed)
```

[Try it](https://share.effector.dev/bzdoyLHm)

<hr />

### `thru(fn)`

:::caution deprecated
since 22.0.0
:::

Call function with the given store and return result as it is.

#### Formulae

```ts
const result = $store.thru(fn)
```

- Call `fn` with `$store` as argument
- Return result of the `fn()` call

**Arguments**

1. `fn` (_Function_): Function that receives `Store` and returns some value, [should be **pure**](../../explanation/glossary.md#purity)

**Returns**

(_any_): Value, returned by `fn`

#### Example

```js
import {createStore, createEvent} from 'effector'

const enhance = fn => store => store.map(fn)

const inc = createEvent()
const $num = createStore(1)

$num.on(inc, n => n + 1)

//prettier-ignore
const $result = $num
  .thru(enhance(x => x + 1))
  .thru(enhance(x => x * 10))

$num.watch(n => {
  console.log('num', n)
})
// => num 1

$result.watch(n => {
  console.log('result', n)
})
// => result 20

inc()
// => num 2
// => result 30
```

[Try it](https://share.effector.dev/RRSyqVus)

<hr />

## Store Properties

### `updates`

#### Formulae

```ts
$store.updates
```

- When `$store` is **changed** trigger `updates` event with the new state

**Returns**

[_Event_](Event.md): Event that represents updates of the given store.

:::caution Important
Do not manually call this event. It is event that depends on a store.
:::

Use case: watchers, which will not trigger immediately after creation (unlike [_store.watch_](Store.md#watchwatcher))

```js
import {createStore, is} from 'effector'

const $clicksAmount = createStore(0)
is.event($clicksAmount.updates) // => true

$clicksAmount.watch(amount => {
  console.log('will be triggered with current state, immediately, sync', amount)
})

$clicksAmount.updates.watch(amount => {
  console.log('will not be triggered unless store value is changed', amount)
})
```

[Try it](https://share.effector.dev/F5L5kLTE)

<hr />

### `shortName`

**Returns**

(_`string`_): ID or short name of the store

<hr />

### `defaultState`

**Returns**

(_`State`_): Default state of the store

#### Example

```ts
const $store = createStore('DEFAULT')

console.log($store.defaultState === 'DEFAULT')
// => true
```

## Utility methods

### `getState()`

Returns current state of store

:::caution You don't need this method!
`getState()` usage can result in difficult-to-debug imperative code and create a kind of race condition.
Prefer declarative [sample](sample.md) to pass data from store and [attach](attach.md) for effects
:::

**Returns**

(_`State`_): Current state of the store

#### Example

```js
import {createEvent, createStore} from 'effector'

const add = createEvent()

const $number = createStore(0).on(add, (state, data) => state + data)

$number.watch(n => {
  console.log(n)
})
// => 0

add(2)
// => 2

add(3)
// => 5
```

[Try it](https://share.effector.dev/YrnlMuRj)

## Derived store

_DerivedStore_ has no specific interface in TypeScript, but it has different implementation in the effector kernel.

Some methods like [`combine`](./combine.md), [`.map`](#mapfn-state-state-laststate-t--t-firststate-t), [`sample`](./sample.md), [`.pending`](./Effect.md#pending) returns `Store` instance.
The store updates by specific rules defined in the method above. That's why we have different type of stores.

Derived stores are not allowed to be modified from the outside. For example, you shall not add new triggers on the derived store:

```ts
const update = createEvent()
const $a = createStore(1)
const $b = createStore(2)

const $derived = combine({a: $a, b: $b})
$derived.on(update, (_, value) => ({a: value, b: value}))
// => .on in derived store is deprecated, use createStore instead
```

Derived store only allows methods that do not modify state. It means, that DerivedStore cannot be used as `target` in `sample`:

```ts
const update = createEvent()
const $a = createStore(1)
const $b = createStore('foo')

const $derived = combine({a: $a, b: $b})

sample({
  clock: update,
  fn: value => ({a: value, b: value}),
  target: $derived,
})
// => sample: derived unit in "target" is deprecated, use createEvent/createStore instead
```

These methods are <u>allowed</u> for DerivedStore:

- `.map`
- `.watch`
- using DerivedStore as a `source` and/or `clock` in `sample` and so on
- using DerivedStore in `combine` sources

:::caution deprecation
since 23.0.0 banned methods will throw an exception
:::

These methods are _banned_ for DerivedStore:

- `.on`
- `.reset`
- using DerivedStore as a `target` in `sample`, `guard` and so on

Any kind of store can be used as a `clock` or `source` in methods like [`sample`](./sample.md).
