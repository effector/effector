---
id: forward
title: forward
hide_title: true
---

# forward

## Formulae

```ts
forward({ from, to }): Subscription
```

When `from` triggered, send data from it to `to`.

- `forward()` returns [_Subscription_] function, that can disconnect forward
- if `from` is an array of Units, `to` will be triggered if any from `from` is triggered
- if `to` is an array of Units, when `to` is triggered, each of `to` will be triggered too
- _Unit_ is an interface, that implemented by [_Event_], [_Store_], [_Effect_]

## `forward({ from: Unit, to: Unit })`

Sends data from one entity to another.

### Arguments

1. `from` ([_Event_] | [_Store_] | [_Effect_]): Source of data. Forward will listen for changes in this unit.

   - If passed an [_Event_], `to` will be triggered on each event trigger and passed event argument.
   - If passed a [_Store_], `to` will be triggered on each store **change** and passed new value of the store.
   - If passed an [_Effect_], `to` will be triggered on each effect call and passed effect parameter.

2. `to` ([_Event_] | [_Store_] | [_Effect_]): Target for data. Forward will trigger this unit with data from `from`.

   - If passed an [_Event_], it will be triggered with data from `from` unit.
   - If passed a [_Store_], data from `from` unit will be written to store and **trigger its update**.
   - If passed an [_Effect_], it will be called with data from `from` unit as parameter.

**Data type of the `from` and `to` should be equal**

### Returns

[_Subscription_]: Unsubscribe function. It breaks connection between `from` and `to`. After call, `to` will not be triggered anymore.

### Example

Send store data to store

```js try
import { createStore, createEvent, forward } from 'effector'

const $store = createStore(1)
const event = createEvent()

forward({
  from: event,
  to: $store,
})

$store.watch((state) => console.log('store changed: ', state))
// => store changed: 1

event(200)
// => store changed: 200
```

[Try it](https://share.effector.dev/UeJbgRG9)

It is the not better way to update store. In most cases you need [`store.on`](https://effector.now.sh/docs/api/effector/store#ontrigger-handler)

## `forward({ from: Array<Unit>, to: Array<Unit> })`

1. `from` (`Array`<[_Event_] | [_Store_] | [_Effect_]>): List of units. When triggered one from list, `to` will be triggered with data from it.
   - Array can contain different type of units, but data type must fit together.
2. `to` (`Array`<[_Event_] | [_Store_] | [_Effect_]>): List of targets. When unit from `from` is triggered, each unit from `to` is called with data from unit `from`.

- Array can contain different type of units, but data type must fit together.

**Data type of the `from` and `to` should be equal**

[_Subscription_]: Unsubscribe function. It breaks connection between `from` and `to`. After call, `to` will not be triggered anymore.

### Example

```js try
import { createEvent, forward } from 'effector'

const firstSource = createEvent()
const secondSource = createEvent()

const firstTarget = createEvent()
const secondTarget = createEvent()

forward({
  from: [firstSource, secondSource],
  to: [firstTarget, secondTarget],
})

firstTarget.watch((e) => console.log('first target', e))
secondTarget.watch((e) => console.log('second target', e))

firstSource('A')
// => first target A
// => second target A
secondSource('B')
// => first target B
// => second target B
```

[Try it](https://share.effector.dev/8aVpg8nU)

## Combination

Also, you can combine array with simple unit:

```js
forward({
  from: singleSource,
  to: [$store, event, effect],
})

// Another example

forward({
  from: [firstSource, secondSource, $store],
  to: [event, effect, anotherEffect],
})
```

## Recommendation

- Use [`store.on`](https://effector.now.sh/docs/api/effector/store#ontrigger-handler) to update store.
- Be careful when forwarding store to another store.
- Use [_Subscription_] with caution, because it breaks static connections and make debug harder.

[_effect_]: Effect.md
[_store_]: Store.md
[_event_]: Event.md
[_subscription_]: ../../glossary.md#subscription
