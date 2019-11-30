---
id: restore
title: restore
hide_title: true
---

# `restore(event, defaultState)`

Creates a _`Store`_ from _`Event`_.
It works like a shortcut for `createStore(defaultState).on(event, (_, payload) => payload)`

#### Arguments

1. `event` (_Event_)
2. `defaultState` (_Payload_)

#### Returns

(_`Store`_)

#### Example

```js try
const event = createEvent()
const store = restore(event, 'default')

store.watch(state => console.log('state: ', state))
// state: default

event('foo')
// state: foo
```

# `restore(effect, defaultState)`

Creates a _`Store`_ from sucessful results of _`Effect`_.
It works like a shortcut for `createStore(defaultState).on(effect.done, (_, {result}) => result)`

#### Arguments

1. `effect` (_Effect_)
2. `defaultState` (_Done_)

#### Returns

(_`Store`_)

#### Example

```js try
const effect = createEffect({
  handler: () => 'foo',
})
const store = restore(effect, 'default')

store.watch(state => console.log('state: ', state))
// state: default

effect()
// state: foo
```

# `restore(obj)`

Creates an object with stores from object

#### Arguments

1. `obj` (_State_)

#### Returns

(_`Store`_)

#### Example

```js try
const obj = restore({
  foo: 'foo',
  bar: 0,
})

obj.foo.getState()
// 'foo'
obj.bar.getState()
// 0
```
