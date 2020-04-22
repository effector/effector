---
id: restore
title: restore
hide_title: true
---

# restore

## `restore(event, defaultState)`

Creates a [_Store_](Store.md) from [_Event_](Event.md).
It works like a shortcut for `createStore(defaultState).on(event, (_, payload) => payload)`

#### Arguments

1. `event` [_Event_](Event.md)
2. `defaultState` (_Payload_)

#### Returns

[_Store_](Store.md): New store

#### Example

```js try
import {createEvent, restore} from 'effector'

const event = createEvent()
const store = restore(event, 'default')

store.watch(state => console.log('state: ', state))
// state: default

event('foo')
// state: foo
```

[Try it](https://share.effector.dev/MGGQnTlQ)

## `restore(effect, defaultState)`

Creates a [_Store_](Store.md) out of successful results of [_Effect_](Effect.md).
It works like a shortcut for `createStore(defaultState).on(effect.done, (_, {result}) => result)`

#### Arguments

1. `effect` [_Effect_](Effect.md)
2. `defaultState` (_Done_)

#### Returns

[_Store_](Store.md): New store

#### Example

```js try
import {createEffect, restore} from 'effector'

const effect = createEffect({
  handler: () => 'foo',
})
const store = restore(effect, 'default')

store.watch(state => console.log('state: ', state))
// state: default

effect()
// state: foo
```

[Try it](https://share.effector.dev/CuOQT4Lq)

## `restore(obj)`

Creates an object with stores from object with values

#### Arguments

1. `obj` (_State_)

#### Returns

[_Store_](Store.md): New store

#### Example

```js try
import {restore} from 'effector'

const {foo, bar} = restore({
  foo: 'foo',
  bar: 0,
})
foo.watch(foo => {
  console.log('foo', foo)
})
// => foo 'foo'
bar.watch(bar => {
  console.log('bar', bar)
})
// => bar 0
```

[Try it](https://share.effector.dev/NQX0kotI)
