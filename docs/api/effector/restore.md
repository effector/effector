---
id: restore
title: restore
hide_title: true
---

# `restore(event, defaultState)`

Creates a _`Store`_ from _`Event`_

#### Arguments

1. `event` (_Event_)
2. `defaultState` (_Payload_)

#### Returns

(_`Store`_)

#### Example

```js
const event = createEvent('event')
const store = restore(event, 'default')

store.watch(state => console.log('state: ', state))
// state: default
// state: foo

event('foo')
```

# `restore(effect, defaultState)`

Creates a _`Store`_ from _`Effect`_

#### Arguments

1. `effect` (_Effect_)
2. `defaultState` (_Done_)

#### Returns

(_`Store`_)

#### Example

```js
const effect = createEffect('effect')
effect.use(() => Promise.resolve('foo'))
const store = restore(effect, 'default')

store.watch(state => console.log('state: ', state))
// state: default
// state: foo

effect()
```

# `restore(obj)`

Creates an object with stores from object

#### Arguments

1. `obj` (_State_)

#### Returns

(_`Store`_)

#### Example

```js
const obj = restore({
  foo: 'foo',
  bar: 0,
})

obj.foo.getState()
// 'foo'
obj.bar.getState()
// 0
```
