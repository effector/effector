---
id: is
title: is
---

# is

Объект с валидаторами юнитов

## `is.store(value)`

Проверяет, является ли переданное значение [_стором_](Store.md)

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

Проверяет, является ли переданное значение [_событием_](Event.md)

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

Проверяет, является ли переданное значение [_эффектом_](Effect.md)

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

Проверяет, является ли переданное значение [_доменом_](Domain.md)

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

## `is.unit(value)`

Проверяет, является ли переданное значение [юнитом](../../glossary.md#unit): [стором](./Store.md), [эвентом](./Event.md), [эффектом](./Effect.md) или [доменом](./Domain.md)

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

[Запустить пример](https://share.effector.dev/1A3dObyT)
