---
id: utility-types
title: Утилитарные типы
---

Эффектор предоставляет несколько утилитарных типов для облегчения получения типа значения юнита.

## `UnitValue<Type>`

Получение типа значения переданного [Unit](../glossary.md).

### Пример

```ts
import {
  createEffect,
  createStore,
  createDomain,
  createEvent,
  fork,
  UnitValue,
} from 'effector'

const event = createEvent<{id: string; name?: string} | {id: string}>()
const $store = createStore([false, true])
const effect = createEffect<{token: string}, any, string>(() => {})
const domain = createDomain()
const scope = fork()

type UnitEventType = UnitValue<typeof event>
// {id: string; name?: string | undefined} | {id: string}

type UnitStoreType = UnitValue<typeof store>
// boolean[]

type UnitEffectType = UnitValue<typeof effect>
// {token: string}

type UnitDomainType = UnitValue<typeof domain>
// any

type UnitScopeType = UnitValue<typeof scope>
// any
```

## `StoreValue<Type>`

Получение типа значения [Store](../api/effector/Store.md).

### Пример

```ts
import {createStore, StoreValue} from 'effector'

const $store = createStore(true)

type StoreValueType = StoreValue<typeof $store>
// boolean
```

## `EventPayload<Type>`

Получение типа значения переданного в [Event](../api/effector/Event.md).

### Пример

```ts
import {createEvent, EventPayload} from 'effector'

const event = createEvent<{id: string}>()

type EventPayloadType = EventPayload<typeof event>
// {id: string}
```

## `EffectParams<Type>`

Получение типа параметров [Effect](../api/effector/Effect.md).

### Пример

```ts
import {createEffect, EffectParams} from 'effector'

const fx = createEffect<
  {id: string},
  {name: string; isAdmin: boolean},
  {statusText: string; status: number}
>(() => ({name: 'Alice', isAdmin: false}))

type EffectParamsType = EffectParams<typeof fx>
// {id: string}
```

## `EffectResult<Type>`

Получение типа результата [Effect](../api/effector/Effect.md).

### Пример

```ts
import {createEffect, EffectResult} from 'effector'

const fx = createEffect<
  {id: string},
  {name: string; isAdmin: boolean},
  {statusText: string; status: number}
>(() => ({name: 'Alice', isAdmin: false}))

type EffectResultType = EffectResult<typeof fx>
// {name: string; isAdmin: boolean}
```

## `EffectError<Type>`

Получение типа ошибки [Effect](../api/effector/Effect.md).

### Пример

```ts
import {createEffect, EffectError} from 'effector'

const fx = createEffect<
  {id: string},
  {name: string; isAdmin: boolean},
  {statusText: string; status: number}
>(() => ({name: 'Alice', isAdmin: false}))

type EffectErrorType = EffectError<typeof fx>
// {statusText: string; status: number}
```
