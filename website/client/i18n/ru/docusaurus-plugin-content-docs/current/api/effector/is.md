---
id: is
title: is
---

# is

Объект с валидаторами юнитов

## `is.store(value)`

Проверяет, является ли переданное значение [_стором_](./Store.md)

**Возвращает**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()

is.store(store)
// => true

is.store(event)
// => false

is.store(fx)
// => false

is.store(createDomain())
// => false

is.store(fx.pending)
// => true

is.store(fx.done)
// => false

is.store(store.updates)
// => false

is.store(null)
// => false
```

[Запустить пример](https://share.effector.dev/4vzdWan1)

## `is.event(value)`

Проверяет, является ли переданное значение [_событием_](./Event.md)

**Возвращает**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()

is.event(store)
// => false

is.event(event)
// => true

is.event(fx)
// => false

is.event(createDomain())
// => false

is.event(fx.pending)
// => false

is.event(fx.done)
// => true

is.event(store.updates)
// => true

is.event(null)
// => false
```

[Запустить пример](https://share.effector.dev/hB0JEiIo)

## `is.effect(value)`

Проверяет, является ли переданное значение [_эффектом_](./Effect.md)

**Возвращает**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()

is.effect(store)
// => false

is.effect(event)
// => false

is.effect(fx)
// => true

is.effect(createDomain())
// => false

is.effect(null)
// => false
```

[Запустить пример](https://share.effector.dev/ZdZ2N6VG)

## `is.domain(value)`

Проверяет, является ли переданное значение [_доменом_](./Domain.md)

**Возвращает**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()

is.domain(store)
// => false

is.domain(event)
// => false

is.domain(fx)
// => false

is.domain(createDomain())
// => true

is.domain(null)
// => false
```

[Запустить пример](https://share.effector.dev/Iea0gmfD)

## `is.scope(value)`

:::note
Добавлен в effector 22.0.0
:::

Проверяет, является ли переданное значение [_скоупом_](./Scope.md)

**Возвращает**

boolean

```js
import {fork} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()
const scope = fork()

is.scope(scope)
// => true

is.scope(store)
// => false

is.scope(event)
// => false

is.scope(fx)
// => false

is.scope(createDomain())
// => false

is.scope(null)
// => false
```

[Запустить пример](https://share.effector.dev/hF0krFUK)

## `is.unit(value)`

Проверяет, является ли переданное значение [юнитом](../../glossary.md#unit): [стором](./Store.md), [эвентом](./Event.md), [эффектом](./Effect.md), [доменом](./Domain.md) или [скоупом](./Scope.md)

**Возвращает**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
  fork,
} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()
const scope = fork()

is.unit(scope)
// => true

is.unit(store)
// => true

is.unit(event)
// => true

is.unit(fx)
// => true

is.unit(createDomain())
// => true

is.unit(fx.pending)
// => true

is.unit(fx.done)
// => true

is.unit(store.updates)
// => true

is.unit(null)
// => false
```

[Запустить пример](https://share.effector.dev/iOpDvweB)

## `is.attached(value)`

:::note
Добавлен в effector 22.4.0
:::

Проверяет, что переданный [_effect_](./Effect.md) был создан с помощью метода [_attach_](./attach.md).
Если в качестве аргумента был передан не effect, возвращает `false`.

**Возвращает**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
  attach,
} from 'effector'

const $store = createStore(null)
const event = createEvent()
const fx = createEffect()

const childFx = attach({
  effect: fx,
})

is.attached(childFx)
// => true

is.attached(fx)
// => false

is.attached($store)
// => false

is.attached(event)
// => false

is.attached(createDomain())
// => false

is.attached(null)
// => false
```
[Запустить пример](https://share.effector.dev/qsdTF7og)


### Пример использования

Иногда нужно добавить отображение ошибок на эффекты, но только на те, которые были "локализованы" через `attach`.
Если оставить `onCreateEffect` как есть, без проверок, то лог ошибки будет задублирован.

```js
import { createDomain, attach, is } from 'effector'

const logFailuresDomain = createDomain()

logFailuresDomain.onCreateEffect((effect) => {
  if (is.attached(effect)) {
    effect.fail.watch(({ params, error }) => {
      console.warn(`Effect "${effect.compositeName.fullName}" failed`, params, error)
    })
  }
})

const baseRequestFx = logFailuresDomain.createEffect((path) => {
  throw new Error(`path ${path}`)
})

const loadDataFx = attach({
  mapParams: () => '/data',
  effect: baseRequestFx,
})

const loadListFx = attach({
  mapParams: () => '/list',
  effect: baseRequestFx,
})

loadDataFx()
loadListFx()
```

[Запустить пример](https://share.effector.dev/NxQseHOR)
