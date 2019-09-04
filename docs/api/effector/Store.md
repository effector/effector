---
id: store
title: Store
---

_Store_ is an object that holds the state tree.
There can be multiple stores.

## Store Methods

### `reset(eventOrStore)`

Resets store state to the default value.

A state is reset when _Event_ or _Effect_ is called or another _Store_ is changed.

#### Arguments

- (_`Event | Effect | Store`_): [_`Event`_](Event.md), [_`Effect`_](Effect.md), _`Store`_

#### Returns

(_`Store`_): Current store

#### Example

```js
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

<hr />

### `getState()`

Returns current state of store

#### Returns

(`State`): Current state of the store

#### Example

```js
const store = createStore(0)
const updated = createEvent()

store.on(updated, (state, value) => state + value)

updated(2)
updated(3)

console.log(store.getState()) // 5
```

<hr />

### `map(fn)`

Creates a derived store. It will call a provided function with the state, when the original store updates, and will use the result to update the derived store

#### Arguments

- (_`Function`_): Function that receives `state` and returns a new state for the derived store

If the function returns an old state or if it returns `undefined`, the new store will not be updated.

#### Returns

(_`Store`_): New store

#### Example

```js
const title = createStore('')
const changed = createEvent()

const length = title.map(title => title.length)

title.on(changed, (_, newTitle) => newTitle)

length.watch(length => console.log('new length', length)) // new length 0

changed('hello') // new length 5
changed('world') //
changed('hello world') // new length 11
```

<hr />

### `on(trigger, handler)`

Updates state when `trigger` is triggered by using `handler`.

#### Arguments

- (_`Event | Effect | Store`_): [_`Event`_](Event.md), [_`Effect`_](Effect.md), _`Store`_
- (_`Function`_): Reducer function that receives `state` and `params` and returns a new state
  - `state`: Current state of store
  - `params`: Parameters passed to event call
    A store cannot hold an `undefined` value. If a reducer function returns `undefined`, the store will not be updated.

#### Returns

(Store): Current store

#### Example

```js
const store = createStore(0)
const changed = createEvent()

store.on(changed, (state, params) => state + params)

store.watch(value => console.log('updated', value))

changed(2) // updated 2
changed(2) // updated 4
```

<hr />

### `off(trigger)`

#### Returns

(Store): Current store

<hr />

### `watch(trigger, watcher) | watch(watcher)`

Run `watcher` only when `trigger` event triggered. <br/>
If `trigger` not passed, run `watcher` on each event that linked with store.

#### Returns

(Subscription): Unsubscribe function

#### Example 1

`.watch` trigger `watcher` when `foo` executed, because `foo` explicitly passed to `watch`. <br/>
First argument of `watcher` is a state value, second is an event value.

```js
const foo = createEvent('foo')
const bar = createEvent('bar')

const store = createStore(0).watch(foo, (storeValue, eventValue) =>
  console.log(`triggered ${storeValue}, ${eventValue}`),
)

foo(1)
bar(2)
foo(3)
```

Output

```
> triggered 0, 1
> triggered 0, 3
```

https://runkit.com/embed/6j1bg5fsysa0

#### Example 2

Here `.on(bar, ...)` changes the state between `foo` executes.
But `.watch` reacts only on `foo` event

```js
const foo = createEvent('foo')
const bar = createEvent('bar')

const store = createStore(0)
  .on(bar, (state, value) => value)
  .watch(foo, value => console.log(`triggered ${value}`))

foo(1)
bar(2)
foo(3)
```

Output

```
> triggered 0
> triggered 2
```

https://runkit.com/embed/74lmt29e1ei5

#### Example 3

Here `watch` reacts only on `incr` and `decr` because it explicitly used in `.on` calls. But not reacts on any other events.

```js
const incr = createEvent('foo')
const decr = createEvent('bar')
const another = createEvent('another')

const store = createStore(0)
  .on(incr, (state, value) => state + value)
  .on(decr, (state, value) => state - value)
  .watch(value => console.log(`triggered ${value}`))

another(100)
incr(1) // 0 + 1 = 1
incr(2) // 1 + 2 = 3
decr(3) // 3 - 3 = 0
another(200)
```

Output

```
> triggered 0
> triggered 1
> triggered 3
> triggered 0
```

https://runkit.com/embed/1r2qo0nsockp

#### Example 4

`.watch` triggers `watcher` on first initialization

```js
const store = createStore(0).watch(value => console.log(`triggered ${value}`))
```

Output

```
> triggered 0
```

#### Example with Effect

Effect is an Event with 2 additional events such as `fail` and `done`.<br/>
You can subscribe to triggering effect by `fail` and `done` events.

```js
const effect = createEffect().use(
  value => new Promise(res => setTimeout(res, 200, value)),
)

const store = createStore('initial')

store.watch(effect, (state, params) => console.log(`executed with ${params}`))

store.watch(effect.done, (state, {params, result}) =>
  console.log(`executed with ${params}, resolved with ${result}`),
)

store.watch(effect.fail, (state, {params, result}) =>
  console.log(`rejected with ${params}, resolved with ${result}`),
)

effect(100)
```

Output

```
> executed with 100
> executed with 100, resolved with 200
```

https://runkit.com/embed/ovnsqp9k9zoq

#### Example with another Store

One store can subscribe to updates of another store.

```js
const change = createEvent('change')

const first = createStore(0).on(change, (state, value) => state + value)

const second = createStore(100).watch(first, (secondState, firstState) =>
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

https://runkit.com/embed/eoiiqofdtchn

#### Example with watcher

Watcher receive third argument event name.

```js
const foo = createEvent('foo event')

const store = createStore(0).watch(foo, (storeValue, eventValue, eventName) =>
  console.log(`store: ${storeValue}, event: ${eventValue}, name: ${eventName}`),
)

foo(1)
```

Output

```
> store: 0, event: 1, name: foo event
```

https://runkit.com/embed/lwo1u4m8yhz0

<hr />

### `thru(fn)`

Creates a new store. This method calls with a provide function that receives Store. Other words "escape hatch" for creating compose function, also making chains.
For example, you want to make multiple, summary and divide operations. You can create these functions and provide them followed by a call `.thru`.

#### Arguments

- (_`Function`_): Function that receives `Store` and returns a new derived store

#### Returns

(_`Store`_): New store

#### Example

```js
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
<hr />

## Store Properties

### `shortName`

#### Returns

(string): ID or short name of store

<hr />

### `defaultState`

#### Returns

(`State`): Default state of store

<hr />

### `updates`

#### Returns 

(`Event<State>`): Event that represent updates of given store.

Use case: watchers, which will not trigger immediately after creation (unlike `store.watch`)

```js
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
