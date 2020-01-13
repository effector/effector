---
id: merge
title: merge
hide_title: true
---

# `merge(eventsArray)`

Merges [`events`](Event.md), resulting single one, which fires upon trigger of any of merged events.

#### Arguments

1. `eventsArray` (_Array<[_`Event`_](Event.md)>_): Array of [`events`](Event.md) to be merged.

#### Returns

([_`Event`_](Event.md)) - Event, which fires upon any of merged units was triggered

#### Example 1

```js try
import {createEvent, merge} from 'effector'

const foo = createEvent()
const bar = createEvent()
const baz = merge([foo, bar])
baz.watch(v => console.log('merged event triggered: ', v))

foo(1)
// => merged event triggered: 1
bar(2)
// => merged event triggered: 2
```

[Try it](https://share.effector.dev/WxUgr6dZ)

> **Note:** however, array can contain both events and stores. In this case, resulting event will fire, upon trigger of merged events, or upon store updates.

#### Example 2

```js try
import {createEvent, createStore, merge} from 'effector'

const setFoo = createEvent()
const setBar = createEvent()

const $foo = createStore(0).on(setFoo, (_, v) => v)

const $bar = createStore(100).on(setBar, (_, v) => v)

const anyUpdated = merge([$foo, $bar])
anyUpdated.watch(v => console.log(`state changed to: ${v}`))

setFoo(1) // => state changed to: 1
setBar(123) // => state changed to: 123
```

[Try it](https://share.effector.dev/Rp9wuRvl)

#### Example 3

```js try
import {createEvent, createStore, merge} from 'effector'

const setFoo = createEvent()
const otherEvent = createEvent()

const $foo = createStore(0).on(setFoo, (_, v) => v)

const merged = merge([$foo, otherEvent])
merged.watch(v => console.log(`merged event payload: ${v}`))

setFoo(999)
otherEvent('bar')
```

[Try it](https://share.effector.dev/Rp9wuRvl)
