---
id: guard
title: guard
hide_title: true
---

# `guard({source, filter, target?})`

Introduce guard: conditional event routing
Control one dataflow with the help of another: when the condition and the data are in different places, then we can use guard with stores as a filters to trigger events when condition state is true, thereby modulate signals without mixing them

#### Arguments

1. `params` (_Object_): Configuration object

#### Returns

([_`Event`_](Event.md)) - Event, which fires upon clock is triggered

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

# `guard(source, {filter: booleanStore})`

#### Arguments

1. `sourceEvent` (_Event_): Source event
1. `filterStore` (_Store_): Filter store

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

# `guard({sourceEvent, {filter: predicate})`

#### Arguments

1. `sourceEvent` (_Event_): Source eventre
2. `filter` (_(sourcePayload) => Boolean_): Predicate function, should be **pure**

#### Example 2

```js try
import {createEvent, guard} from 'effector'

const source = createEvent()
const target = guard(source, {
  filter: x => x > 0,
})

target.watch(spy)

source(0)
source(1)
```
