---
id: merge
title: merge
description: merge is a method for creating an event triggered by given units
---

:::note
Since effector 20.0.0
:::
Merges array of units (events, effects or stores), returns a new event, which fires upon trigger of given units

```ts
merge(units: Unit[]): Event
```

**Arguments**

1. `units`: Array of [units](../../explanation/glossary.md#common-unit) to be merged

**Returns**

[_Event_](./Event.md): New event, which fires when any of given units is triggered

:::tip
In case of store, resulting event will fire upon store updates
:::

#### Example 1

```js
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

#### Example 2

```js
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

```js
import {createEvent, createStore, merge} from 'effector'

const setFoo = createEvent()
const otherEvent = createEvent()

const $foo = createStore(0).on(setFoo, (_, v) => v)
const merged = merge([$foo, otherEvent])

merged.watch(v => console.log(`merged event payload: ${v}`))

setFoo(999)
// => merged event payload: 999

otherEvent('bar')
// => merged event payload: bar
```

[Try it](https://share.effector.dev/pKkiyhVQ)
