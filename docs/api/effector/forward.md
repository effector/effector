---
id: forward
title: forward
hide_title: true
---

# `forward({from, to})`

Sends data from one entity to another.

> **Note:** If you want forward `from` store `to` store, there is your store `from` must change. Let's see example 1 below.

#### Arguments

1. `opts` (_Object_): Object of kind `{from: A, to: B}`, where `from` and `to` are units.

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function

#### Example 1

Send store data to store

```js try
import {createStore, createEvent, forward} from 'effector'

const a = createStore(1)
const b = createStore(2)

const event = createEvent('event')

forward({
  from: a,
  to: b,
})

b.watch(state => console.log('state b: ', state))
// state b: 11

/* A snippet at the top is equivalent to a snippet at the bottom */

b.on(a, (state, valueFromA) => valueFromA).watch(state =>
  console.log('state b: ', state),
)
// state b: 11

a.on(event, state => state + 10)

event()
```

[Try it](https://share.effector.dev/LJCt2hdi)

#### Example 2

Send event data to store

```js try
import {createEvent, createStore, forward} from 'effector'

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

[Try it](https://share.effector.dev/bED2glHm)

#### Example 3

Arrays to forward

```js try
import {createEvent, forward} from 'effector'

const firstSource = createEvent()
const secondSource = createEvent()
const firstTarget = createEvent()
const secondTarget = createEvent()

forward({
  from: [firstSource, secondSource],
  to: [firstTarget, secondTarget],
})

firstTarget.watch(e => console.log('first target', e))
secondTarget.watch(e => console.log('second target', e))

firstSource('A')
// => first target A
// => second target A
secondSource('B')
// => first target B
// => second target B
```

[Try it](https://share.effector.dev/8aVpg8nU)
