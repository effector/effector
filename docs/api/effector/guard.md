---
id: guard
title: guard
hide_title: true
---

# `guard({source, filter, target?})`

Guard is a method for conditional event routing.
It provide a way to control one dataflow with the help of another: when the condition and the data are in different places, then we can use guard with stores as a filters to trigger events when condition state is true, thereby modulate signals without mixing them.

#### Arguments

1. `params` (_Object_): Configuration object

#### Returns

[_Event_](Event.md), which fires upon clock is triggered

#### Example

```js try
import {createStore, createEffect, createEvent, guard, sample} from 'effector'

const clickRequest = createEvent()
const fetchRequest = createEffect({
  handler: n => new Promise(rs => setTimeout(rs, 2500, n)),
})

const clicks = createStore(0).on(clickRequest, x => x + 1)
const requests = createStore(0).on(fetchRequest, x => x + 1)

const isIdle = fetchRequest.pending.map(pending => !pending)

/*
on clickRequest, take current clicks value,
and call fetchRequest with it
if isIdle value is true 
*/
guard({
  source: sample(clicks, clickRequest),
  filter: isIdle,
  target: fetchRequest,
})
```

See [ui visualization](https://share.effector.dev/zLB4NwNV)

Also, guard can accept common function predicate as a filter, to drop events before forwarding them to target

#### Example 2

```js try
import {createEffect, createEvent, guard} from 'effector'

const searchUser = createEffect()
const submitForm = createEvent()

guard({
  source: submitForm,
  filter: user => user.length > 0,
  target: searchUser,
})

submitForm('') // nothing happens
submitForm('alice') // ~> searchUser('alice')
```

[Try it](https://share.effector.dev/84j97tZ7)

# `guard(source, {filter: booleanStore})`

#### Arguments

1. `source` ([_Store_](Store.md)/[_Event_](Event.md)/[_Effect_](Effect.md)): Source unit. Will trigger given guard on updates
1. `filter` ([_Store_](Store.md)): Filter store

#### Example

```js try
import {createEvent, createStore, createApi, guard} from 'effector'

const trigger = createEvent()
const $unlocked = createStore(true)
const {lock, unlock} = createApi($unlocked, {
  lock: () => false,
  unlock: () => true,
})

const target = guard(trigger, {
  filter: $unlocked,
})

target.watch(console.log)
trigger('A')
lock()
trigger('B') // nothing happens
unlock()
trigger('C')
```

[Try it](https://share.effector.dev/6bqOCO4y)

# `guard(source, {filter: predicate})`

#### Arguments

1. `source` ([_Store_](Store.md)/[_Event_](Event.md)/[_Effect_](Effect.md)): Source unit. Will trigger given guard on updates
2. `filter` (_(payload) => Boolean_): Predicate function, should be **pure**

#### Example 2

```js try
import {createEvent, guard} from 'effector'

const source = createEvent()
const target = guard(source, {
  filter: x => x > 0,
})

target.watch(() => {
  console.log('target called')
})

source(0)
// nothing happens
source(1)
// target called
```

[Try it](https://share.effector.dev/ethzpd8Y)
