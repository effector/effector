---
id: store
title: Store
---

_Store_ is an object that holds the state tree.
There can be multiple stores.

### Store Methods

- [`reset(trigger)`](#reset)
- [`getState()`](#getState)
- [`map(fn)`](#map)
- [`on(trigger, handler)`](#on)
- [`off(trigger)`](#off)
- [`watch(trigger, watcher) | watch(watcher)`](#watch)
- [`thru(fn)`](#thru)

### Store Properties

- [`shortName`](#shortName)
- [`defaultState`](#defaultState)

## Store Methods

### <a id='reset'></a>[`reset(eventOrStore)`](#reset)

Resets store state to initial value when event occurs.

Reset state when Event/Effect triggered or another Store is changed.

#### Arguments

([_`Unit`_](Unit.md)): [_`Event`_](Event.md), [_`Effect`_](Effect.md), _`Store`_

#### Returns

(_`Store`_): Current store

#### Example

```js
const store = createStore(0)
const increment = createEvent()
const reset = createEvent()

store
  .on(increment, (state) => state + 1)
  .reset(reset)

store.watch(state => console.log("changed", state))
// changed 0
// watch call its fn immediatly

increment() // changed 1
increment() // changed 2
reset() // changed 0
```

<hr>

### <a id='getState'></a>[`getState()`](#getState)

Returns current state of store

#### Returns

(`State`): Current state of store

#### Example

```js
const store = createStore(0)
const updated = createEvent()

store.on(updated, (state, value) => state + value)

updated(2)
updated(3)

console.log(store.getState()) // 5
```

<hr>

### <a id='map'></a>[`map(fn)`](#map)

Create derived store. Map value from original store to derived with `fn`.

#### Arguments

(_`Function`_): Function receive `state` should return state for a new store

The new store will not be called, if function returns same state as previous.

#### Returns

(_`Store`_): New store

#### Example

```js
const title = createStore("")
const changed = createEvent()

const length = title.map((title) => title.length)

title.on(changed, (_, newTitle) => newTitle)

length.watch((length) => console.log("new length", length)) // new length 0

changed("hello") // new length 5
changed("world") // 
changed("hello world") // new length 11
```

<hr>

### <a id='on'></a>[`on(trigger, handler)`](#on)

Update state when trigger triggered, just call `hander`.

#### Arguments

([_`Unit`_](Unit.md)): [_`Event`_](Event.md), [_`Effect`_](Effect.md), _`Store`_
(_`Function`_): Reducer function receive `state` and `params` and must return new state
   - `state`: Current state of store
   - `params`: Parameters passed to event call

#### Returns

(Store): Current store

#### Example

```js
const store = createStore(0)
const changed = createEvent()

store.on(changed, (state, params) => state + params)

store.watch((value) => console.log("updated", value))

changed(2) // updated 2
changed(2) // updated 4
```

<hr>

### <a id='off'></a>[`off(trigger)`](#off)

#### Returns

(Store): Current store

<hr>

### <a id='watch'></a>[`watch(trigger, watcher) | watch(watcher)`](#watch)

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

Effect is an Event with 2 events for `fail` and `done`.<br/>
You can subscribe to triggering effect, fail event and done.

```js
const effect = createEffect().use(
  value => new Promise(res => setTimeout(res, value, 200)),
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

<hr>

### <a id='thru'></a>[`thru(fn)`](#thru)

#### Returns

(any)

<hr>
