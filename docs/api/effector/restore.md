---
id: restore
title: Restore
hide_title: true
sidebar_label: restore
---

# restore

## `restore(event, defaultState)`

Создает [_Store_](Store.md) из [_Event_](Event.md).
Это работает как сокращение для `createStore(defaultState).on(event, (_, payload) => payload)`.

**Аргументы**

1. `event` [_Event_](Event.md)
2. `defaultState` (_Payload_)

**Возвращает**

[_Store_](Store.md): Новый стор

#### Пример

```js
import {createEvent, restore} from 'effector'

const event = createEvent()
const $store = restore(event, 'default')

$store.watch(state => console.log('state: ', state))
// state: default

event('foo')
// state: foo
```

[Попробовать](https://share.effector.dev/MGGQnTlQ)

## `restore(effect, defaultState)`

Создает [_Store_](Store.md) из успешных результатов [_Effect_](Effect.md).
Это работает как сокращение для `createStore(defaultState).on(effect.done, (_, {result}) => result)`.

**Аргументы**

1. `effect` [_Effect_](Effect.md)
2. `defaultState` (_Done_)

**Возвращает**

[_Store_](Store.md): Новый стор

#### Пример

```js
import {createEffect, restore} from 'effector'

const fx = createEffect(() => 'foo')
const $store = restore(fx, 'default')

$store.watch(state => console.log('state: ', state))
// => state: default

await fx()
// => state: foo
```

[Попробовать](https://share.effector.dev/tP6RQsri)

## `restore(obj)`

Создает объект со сторами из объекта со значениями

**Аргументы**

1. `obj` (_State_)

**Возвращает**

[_Store_](Store.md): Новый стор

#### Пример

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

[Попробовать](https://share.effector.dev/NQX0kotI)
