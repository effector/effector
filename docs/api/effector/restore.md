---
id: restore
title: restore
hide_title: true
---

# restore

## `restore(event, defaultState)`

Creates a [_Store_](Store.md) from [_Event_](Event.md).
It works like a shortcut for `createStore(defaultState).on(event, (_, payload) => payload)`

:::info It is not a derived store
Restore creates a new store. It is not [DerivedStore](./Store.md#derived-store). That means you can modify it's state via events, and use it as `target` in [`sample`](./sample.md).
:::

**Arguments**

1. `event` [_Event_](Event.md)
2. `defaultState` (_Payload_)

**Returns**

[_Store_](Store.md): New store

#### Example

```js
import {createEvent, restore} from 'effector'

const event = createEvent()
const $store = restore(event, 'default')

$store.watch(state => console.log('state: ', state))
// state: default

event('foo')
// state: foo
```

[Try it](https://share.effector.dev/MGGQnTlQ)

## `restore(effect, defaultState)`

Creates a [_Store_](Store.md) out of successful results of [_Effect_](Effect.md).
It works like a shortcut for `createStore(defaultState).on(effect.done, (_, {result}) => result)`

**Arguments**

1. `effect` [_Effect_](Effect.md)
2. `defaultState` (_Done_)

**Returns**

[_Store_](Store.md): New store

#### Example

```js
import {createEffect, restore} from 'effector'

const fx = createEffect(() => 'foo')
const $store = restore(fx, 'default')

$store.watch(state => console.log('state: ', state))
// => state: default

await fx()
// => state: foo
```

[Try it](https://share.effector.dev/tP6RQsri)

## `restore(obj)`

Creates an object with stores from object with values

**Arguments**

1. `obj` (_State_)

**Returns**

[_Store_](Store.md): New store

#### Example

```js
import {restore} from 'effector'

const {foo: $foo, bar: $bar} = restore({
  foo: 'foo',
  bar: 0,
})

$foo.watch(foo => {
  console.log('foo', foo)
})
// => foo 'foo'
$bar.watch(bar => {
  console.log('bar', bar)
})
// => bar 0
```

[Try it](https://share.effector.dev/NQX0kotI)
