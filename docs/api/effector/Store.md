---
id: store
title: Store
---

_Store_ is an object that holds the state value.
There can be multiple stores.

## Store Methods

### `map(fn: (state: State, lastState?: T) => T)`

Creates a derived store. It will call a provided function with the state, when the original store updates, and will use the result to update the derived store

#### Formulae

```ts
const $second = $first.map(fn)
```

- When `$first` store is updated, call `fn` with new state and previous state
- Next update `$second` store with result of `fn()` call and trigger all subscribers

#### Arguments

1. `fn` (_Function_): Function that receives `state` and `lastState?` and returns a new state for the derived store

If the function returns an old state or if it returns `undefined`, the new store will not be updated.

[Should be **pure**](../../glossary.md#pureness)

#### Returns

[_Store_](Store.md): New store

#### Example

```js try
import {createEvent, createStore} from 'effector'

const changed = createEvent()
const title = createStore('').on(changed, (_, newTitle) => newTitle)
const length = title.map(title => title.length)

length.watch(length => {
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

### `on(trigger, handler)`

Updates state when `trigger` is triggered by using `handler`. For each trigger, last installed handler will override previous handlers (useful for dynamic behavior).

#### Formulae

```ts
$store.on(trigger, handler)
```

- When `trigger` is triggered, call `handler` with payload of the `trigger` and data of `$store`
- Next update `$store` with result of `handler()` call and trigger all subscribers

#### Arguments

1. `trigger` [_Event_](Event.md), [_Effect_](Effect.md) or [_Store_](Store.md)
2. `handler` (_Function_): Reducer function that receives `state` and `params` and returns a new state, [should be **pure**](../../glossary.md#pureness).
   A store cannot hold an `undefined` value. If a reducer function returns `undefined`, the store will not be updated.
   - `state`: Current state of store
   - `params`: Parameters passed to event call

#### Returns

[_Store_](Store.md): Current store

#### Example

```js try
import {createEvent, createStore} from 'effector'

const store = createStore(0)
const changed = createEvent()

store.on(changed, (state, params) => state + params)

store.watch(value => {
  console.log('updated', value)
})

changed(2)
// => updated 2

changed(2)
// => updated 4
```

[Try it](https://share.effector.dev/O0JnDtIl)

<hr />

### `on(triggers[], handler)`

Updates state when any from `triggers` is triggered by using `handler`.

#### Formulae

```ts
$store.on([triggerA, triggerB, ...], handler)
```

- When `triggerA` or `triggerB` is triggered, call `handler` with payload of the `triggerA` or `triggerB` and data of `$store`
- Next update `$store` with result of `handler()` call and trigger all subscribers
- Any count of triggers can be passed to `triggers`

#### Arguments

1. `triggers` array of [_Event_](Event.md), [_Effect_](Effect.md) or [_Store_](Store.md)
2. `handler` (_Function_): Reducer function that receives `state` and `params` and returns a new state, [should be **pure**](../../glossary.md#pureness).
   A store cannot hold an `undefined` value. If a reducer function returns `undefined`, the store will not be updated.
   - `state`: Current state of store
   - `payload`: Value passed to event/effect call, or source if it passed as trigger

#### Returns

[_Store_](Store.md): Current store

#### Example

```js try
import {createEvent, createStore} from 'effector'

const store = createStore(0)
const changedA = createEvent()
const changedB = createEvent()

store.on([changedA, changedB], (state, params) => state + params)

store.watch(value => {
  console.log('updated', value)
})

changedA(2)
// => updated 2

changedB(2)
// => updated 4

// You can unsubscribe from any trigger
store.off(changedA)
```

#### Unsubscribe example

```js try
import {createEvent, createStore} from 'effector'

const store = createStore(0)
const changedA = createEvent()
const changedB = createEvent()

// If you want to unsubscribe from all triggers simultaneously, better to manually merge
const changed = merge([changedA, changedB])

store.on(changed, (state, params) => state + params)

store.off(changed)
```

[Try it](https://share.effector.dev/bzdoyLHm)

<hr />

### `watch(watcher)`

Call `watcher` function each time when store is updated. <br/>
If `trigger` not passed, run `watcher` on each event that linked to the store.

#### Formulae

```ts
const unwatch = $store.watch(watcher)
```

- On initialize and each `$store` update, call `watcher` with the new state of `$store`
- When `unwatch` is called, stop calling `watcher`

#### Arguments

1. `watcher` ([_Watcher_](../../glossary.md#watcher)): Watcher function that receives current store state as the first argument

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function

#### Example

```js try
const add = createEvent()
const store = createStore(0).on(add, (state, payload) => state + payload)

store.watch(value => console.log(`current value: ${value}`))
// => current value: 0
add(4)
// => current value: 4
add(3)
// => current value: 7
```

<hr />

### `watch(trigger, watcher)`

Run `watcher` only when `trigger` event triggered. <br/>

#### Formulae

```ts
const unwatch = $store.watch(trigger, watcher)
```

- On each `$store` update with passed `trigger`, call `watcher` with the new state of `$store` and payload from `trigger`
- When `unwatch` is called, stop calling `watcher`

#### Arguments

1. `trigger` [_Event_](Event.md), [_Effect_](Effect.md) or [_Store_](Store.md): Trigger, which leads to call of `watcher`
1. `watcher` (_Function_): Function that receives current store state as the first argument and payload of trigger as the second argument.

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function

#### Example 1

`.watch` trigger `watcher` when `foo` is executed, because `foo` is explicitly passed to `watch`. <br/>
First argument of `watcher` is a state value, second is an event value.

```js try
import {createEvent, createStore} from 'effector'

const foo = createEvent()
const bar = createEvent()

const store = createStore(0)

store.watch(foo, (storeValue, eventValue) => {
  console.log(`triggered ${storeValue}, ${eventValue}`)
})

foo(1)
// => triggered 0, 1

bar(2)

foo(3)
// => triggered 0, 3
```

[Try it](https://share.effector.dev/xEltaFyH)

#### Example 2

Here `.on(bar, ...)` changes the state between `foo` executions.
But `.watch` reacts only to `foo` event

```js try
import {createEvent, createStore} from 'effector'

const foo = createEvent()
const bar = createEvent()

const store = createStore(0).on(bar, (state, value) => value)

store.watch(foo, value => {
  console.log(`triggered ${value}`)
})

foo(1)
// => triggered 0

bar(2)

foo(3)
// => triggered 2
```

[Try it](https://share.effector.dev/iydvYHdS)

#### Example 3

Here `watch` reacts only to `incr` and `decr` events, because it is explicitly used in `.on` calls. But doesn't react to any other event.

```js try
import {createEvent, createStore} from 'effector'

const incr = createEvent()
const decr = createEvent()
const another = createEvent()

const store = createStore(0)
  .on(incr, (state, value) => state + value)
  .on(decr, (state, value) => state - value)

store.watch(value => console.log(`triggered ${value}`))

another(100)
incr(1) // 0 + 1 = 1
incr(2) // 1 + 2 = 3
decr(3) // 3 - 3 = 0
another(200)
```

[Try it](https://share.effector.dev/2yu2hvYp)

#### Example with Effect

Effect is an Event with 2 additional events: `fail` and `done`.<br/>
You can subscribe to `fail` and `done` events of the effect.

```js try
import {createEffect, createStore} from 'effector'

const effectFx = createEffect().use(
  value => new Promise(res => setTimeout(res, 200, value)),
)

const store = createStore('initial')

store.watch(effectFx, (state, params) => console.log(`executed with ${params}`))

store.watch(effectFx.done, (state, {params, result}) =>
  console.log(`executed with ${params}, resolved with ${result}`),
)

store.watch(effectFx.fail, (state, {params, result}) =>
  console.log(`rejected with ${params}, resolved with ${result}`),
)

effectFx(100)
```

[Try it](https://share.effector.dev/fT4JgRJr)

#### Example with another Store

One store can subscribe to updates of another store.

```js try
import {createEvent, createStore} from 'effector'

const change = createEvent()

const first = createStore(0).on(change, (state, value) => state + value)

const second = createStore(100)

second.watch(first, (secondState, firstState) =>
  console.log(secondState * firstState),
)

// Change first store and trigger watch in second
change(20)
```

Output

```
> 0
> 2000
```

[Try it](https://share.effector.dev/llg8OjJ8)

#### Example with watcher

```js try
import {createEvent, createStore} from 'effector'

const foo = createEvent()

const store = createStore(0)

store.watch(foo, (storeValue, eventValue) => {
  console.log(`store: ${storeValue}, event: ${eventValue}`)
})

foo(1)
```

Output

```
> store: 0, event: 1
```

[Try it](https://share.effector.dev/yp0GKYFb)

<hr />

### `reset(...triggers)`

Resets store state to the default value.

A state is reset when _Event_ or _Effect_ is called or another _Store_ is changed.

#### Formulae

```ts
$store.reset(...triggers)
```

- When any unit from `triggers` list is triggered, update `$store` with its default state, from `createStore(defaultState)`

#### Arguments

1. `triggers` (_(Event | Effect | Store)[]_): any number of [_Events_](Event.md), [_Effects_](Effect.md) or [_Stores_](Store.md)

#### Returns

[_Store_](Store.md): Current store

#### Example

```js try
import {createEvent, createStore} from 'effector'

const store = createStore(0)
const increment = createEvent()
const reset = createEvent()

store.on(increment, state => state + 1).reset(reset)

store.watch(state => console.log('changed', state))
// changed 0
// watch method calls its function immediately

increment() // changed 1
increment() // changed 2
reset() // changed 0
```

[Try it](https://share.effector.dev/7W8m2Zdg)

<hr />

### `off(trigger)`

```ts
$store.off(trigger)
```

- Removes handler for given `trigger`, which was installed via [\$store.on](Store.md#ontrigger-handler)
- If there was no handler for that `trigger`, this method will do nothing

#### Arguments

1. `trigger`: [_Event_](Event.md), [_Effect_](Effect.md) or [_Store_](Store.md)

#### Returns

[_Store_](Store.md): Current store

<hr />

### `getState()`

Returns current state of store

#### Returns

(_`State`_): Current state of the store

#### Example

```js try
import {createEvent, createStore} from 'effector'

const store = createStore(0)
const updated = createEvent()

store.on(updated, (state, value) => state + value)

updated(2)
updated(3)

store.watch(console.log) // => 5
```

[Try it](https://share.effector.dev/gmXolqQL)

<hr />

### `thru(fn)`

Call function with the given store and return result as it is.

#### Formulae

```ts
const result = $store.thru(fn)
```

- Call `fn` with `$store` as argument
- Return result of the `fn()` call

#### Arguments

1. `fn` (_Function_): Function that receives `Store` and returns some value

#### Returns

(_any_): Value, returned by `fn`

#### Example

```js try
import {createStore} from 'effector'

const enhance = fn => store => store.map(fn)

const store = createStore(1)

console.log(store.thru(() => 'plain value'))

// => plain value

const newStore = store.thru(enhance(x => x + 1)).thru(enhance(x => x * 10))

console.log(newStore)

// => Store

newStore.watch(state => {
  console.log(`newStore: ${state}`)
})

// => newStore: 20
```

[Try it](https://share.effector.dev/A9T6JQZh)

<hr />

## Store Properties

### `updates`

#### Formulae

```ts
$store.updates
```

- When `$store` is **changed** trigger `updates` event with the new state

#### Returns

[_Event_](Event.md): Event that represents updates of the given store.

Use case: watchers, which will not trigger immediately after creation (unlike [_store.watch_](Store.md#watchwatcher))

```js try
import {createStore, is} from 'effector'

const clicksAmount = createStore(0)
is.event(clicksAmount.updates) // => true

clicksAmount.watch(amount => {
  console.log('will be triggered with current state, immediately, sync', amount)
})

clicksAmount.updates.watch(amount => {
  console.log('will not be triggered unless store value is changed', amount)
})
```

[Try it](https://share.effector.dev/F5L5kLTE)

<hr />

### `shortName`

#### Returns

(_`string`_): ID or short name of the store

<hr />

### `defaultState`

#### Returns

(_`State`_): Default state of the store

#### Example

```ts
const $store = createStore('DEFAULT')

console.log($store.defaultState === 'DEFAULT')
// => true
```
