---
id: forward
title: forward
description: Method to create connection between units in a declarative way. Send updates from one set of units to another
---

:::info since effector 22.0.0
core team recommends [sample](sample.md) instead
:::

Method to create connection between units in a declarative way. Send updates from one set of units to another

## Formulae

```ts
forward({
  from: Unit | Unit[],
  to: Unit | Unit[]
}): Subscription
```

**Arguments**

1. `from` ([Unit | Unit\[\]](../../explanation/glossary.md#common-unit)): Source of updates. Forward will listen for changes of these units

   - if an [_Event_] is passed, `to` will be triggered on each event trigger and receives event argument
   - if a [_Store_] is passed, `to` will be triggered on each store **change** and receives new value of the store
   - if an [_Effect_] is passed, `to` will be triggered on each effect call and receives effect parameter
   - if an array of [units](../../explanation/glossary.md#common-unit) is passed, `to` will be triggered when any unit in `from` array is triggered

2. `to` ([Unit | Unit\[\]](../../explanation/glossary.md#common-unit)): Target for updates. `forward` will trigger these units with data from `from`
   - if passed an [_Event_], it will be triggered with data from `from` unit
   - if passed a [_Store_], data from `from` unit will be written to store and **trigger its update**
   - if passed an [_Effect_], it will be called with data from `from` unit as parameter
   - if `to` is an array of [units](../../explanation/glossary.md#common-unit), each unit in that array will be triggered

**Returns**

[Subscription](../../explanation/glossary.md#subscription): Unsubscribe function. It breaks connection between `from` and `to`. After call, `to` will not be triggered anymore.

:::note since
Arrays of units are supported since [effector 20.6.0](https://changelog.effector.dev/#effector-20-6-0)
:::

## Recommendation

- Arrays can contain different type of units, but their data types should match
- Use subscription with caution, because it breaks static connections and makes debug harder

## Examples

### Send store updates to another store

```js
import {createStore, createEvent, forward} from 'effector'

const $store = createStore(1)
const event = createEvent()

forward({
  from: event,
  to: $store,
})

$store.watch(state => console.log('store changed: ', state))
// => store changed: 1

event(200)
// => store changed: 200
```

[Try it](https://share.effector.dev/UeJbgRG9)

### Forward between arrays of units

```js
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

[_effect_]: ./Effect.md
[_store_]: ./Store.md
[_event_]: ./Event.md
