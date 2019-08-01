---
id: forward
title: forward
hide_title: true
---

# `forward({from, to})`

Sends data from one entity to another. </br>
**Note:** If you want forward  `from` store `to` store, there is your store `from` must change. Let's see example 1 below.

#### Arguments

1. `ops` (Object): Object of kind `{from: A, to: B}`, where `from` and `to` are entities.

#### Returns

(_`Subscription`_): Unsubscribe function

#### Example 1

Send store data to store

```js
const a = createStore(1)
const b = createStore(2)

const event = createEvent('event')

forward({
  from: a,
  to: b
})

b.watch(state => console.log('state b: ', state))
// state b: 11

/* A snippet at the top is equivalent to a snippet at the bottom */

b.on(a, (state,valueFromA) => valueFromA).watch(state => console.log('state b: ', state))
// state b: 11

a.on(event, state => state + 10)

event()
```

#### Example 2

Send event data to store

```js
const event = createEvent()
const proxy = createStore(-1)

proxy.watch(data => console.log('data: ', data))
// data: -1
// data: 1

forward({
  from: event,
  to: proxy,
})

event(1)
event(1)
```
