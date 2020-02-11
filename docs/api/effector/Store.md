---
id: store
title: Store
---

_Store_ is an object that holds the state value.
There can be multiple stores.

## Store Methods

### `map(fn: (state: State, lastState?: T) => T)`

Creates a derived store. It will call a provided function with the state, when the original store updates, and will use the result to update the derived store

#### Arguments

1. `fn` (_Function_): Function that receives `state` and `lastState?` and returns a new state for the derived store

If the function returns an old state or if it returns `undefined`, the new store will not be updated.

#### Returns

(_`Store`_): New store

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

Updates state when `trigger` is triggered by using `handler`.

#### Arguments

1. `trigger` (_Event | Effect | Store_): [_`Event`_](Event.md), [_`Effect`_](Effect.md), _`Store`_
2. `handler` (_Function_): Reducer function that receives `state` and `params` and returns a new state, should be **pure**.
   A store cannot hold an `undefined` value. If a reducer function returns `undefined`, the store will not be updated.
   - `state`: Current state of store
   - `params`: Parameters passed to event call

#### Returns

(_`Store`_): Current store

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

### `watch(watcher)`

Call `watcher` function each time when store is updated. <br/>
If `trigger` not passed, run `watcher` on each event that linked with store.

#### Arguments

1. `watcher` (_Function_): Function that receives current store state as first argument

#### Returns

(_`Subscription`_): Unsubscribe function

#### Example

```js try
const add = createEvent()
const store = createStore(0).on(add, (state, payload) => state + payload)

store.watch(value => console.log(`current value: ${value}`))
// current value: 0
add(4)
// current value: 4
add(3)
// current value: 7
```

[Try it](https://share.effector.dev/t2eqYQ9m)

<hr />

### `watch(trigger, watcher)`

Run `watcher` only when `trigger` event triggered. <br/>

#### Arguments

1. `trigger` (_Event | Effect | Store_): [_`Event`_](Event.md), [_`Effect`_](Effect.md), _`Store`_: Trigger, which leads to call of `watcher`
1. `watcher` (_Function_): Function that receives current store state as first argument and payload of trigger as second argument.

#### Returns

(_`Subscription`_): Unsubscribe function

#### Example 1

`.watch` trigger `watcher` when `foo` executed, because `foo` explicitly passed to `watch`. <br/>
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

Here `.on(bar, ...)` changes the state between `foo` executes.
But `.watch` reacts only on `foo` event

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

Here `watch` reacts only on `incr` and `decr` because it explicitly used in `.on` calls. But not reacts on any other events.

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

Effect is an Event with 2 additional events such as `fail` and `done`.<br/>
You can subscribe to triggering effect by `fail` and `done` events.

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

#### Arguments

1. `triggers` (_(Event | Effect | Store)[]_): any amount of [_`Events`_](Event.md), [_`Effects`_](Effect.md) or _`Stores`_

#### Returns

(_`Store`_): Current store

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

#### Arguments

1. `trigger` (_Event | Effect | Store_): [_`Event`_](Event.md), [_`Effect`_](Effect.md), _`Store`_

#### Returns

(_`Store`_): Current store

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

Creates a new store. This method calls with a provide function that receives Store. Other words "escape hatch" for creating compose function, also making chains.
For example, you want to make multiple, summary and divide operations. You can create these functions and provide them followed by a call `.thru`.

#### Arguments

1. `fn` (_Function_): Function that receives `Store` and returns a new derived store

#### Returns

(_`Store`_): The same store

#### Example

```js try
import {createStore} from 'effector'

const sum = value => value + 10
const square = value => value * value
const divide = value => value / 2

const enhance = fn => store => store.map(fn)

const store = createStore(0)
const newStore = store
  .thru(enhance(sum))
  .thru(enhance(square))
  .thru(enhance(divide))
  .watch(state => console.log(`newStore: ${state}`))
```

Output

```
// sum: 10
// square: 100
// divide: 50

> newStore: 50
```

[Try it](https://share.effector.dev/QCqXcCpQ)

<hr />

## Store Properties

### `updates`

#### Returns

(_`Event<State>`_): Event that represent updates of given store.

Use case: watchers, which will not trigger immediately after creation (unlike `store.watch`)

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

(_`string`_): ID or short name of store

<hr />

### `defaultState`

#### Returns

(_`State`_): Default state of store
