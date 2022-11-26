---
id: attach
title: Attach
description: Wrapper for effect, which allows to map effect arguments and use data from stores.
sidebar_label: attach
---

:::note Начиная с
effector 20.13.0
:::
Обертка для [_effect_](Effect.md), которая позволяет преобразовывать аргументы эффектов и использовать данные из [_stores_](Store.md).

Примеры использования: декларативный способ передачи значений из сторов в эффекты и предварительная обработка аргументов.

С версии `22.4.0`, можно проверить создан ли эффект с помощью метода `attach` — [`is.attached`](./is.md#isattachedvalue).

## Формула

```ts
attach({ effect, mapParams?, source?, name? }): Новый эффект
```

Когда вызывается `Новый эффект`, вызовите `mapParams` с параметрами `Новый эффект` и данными из `source`, затем вызовите исходный `effect`.

- Если `attach` вызывается без `source`, `mapParams` будет вызываться только с параметрами `Новый эффект`.
- `attach` всегда возвращает новый [эффект](Effect.md)
- Если исходный `effect` принадлежит некоторому [домену](./Domain.md), то `Новый эффект` также будет принадлежать ему

### Короткий пример

```js
import {createEffect, attach} from 'effector'

const originalFx = createEffect(params => {
  console.log('Original effect called with', params)
})

const createdFx = attach({
  effect: originalFx,
  mapParams: params => {
    console.log('Created effect called with', params)
    return {wrapped: params}
  },
})

await createdFx('HELLO')

// => Созданный эффект будет вызван с параметром "HELLO"
// => Оригинальный эффект будет вызван с параметром { wrapped: "HELLO" }
```

[Попробовать](https://share.effector.dev/MpAfRBRi)

### Короткий пример с источником

```js
import {createEffect, attach} from 'effector'

const originalFx = createEffect(params => {
  console.log('Original effect called with', params)
})

const $store = createStore(8900)

const createdFx = attach({
  effect: originalFx,
  source: $store,
  mapParams: (params, data) => {
    console.log('Created effect called with', params, 'and data', data)
    return {wrapped: params, data}
  },
})

await createdFx('HELLO')

// => Созданный эффект будет вызван с параметром "HELLO" и данными 8900
// => Оригинальный эффект будет вызван с параметром {wrapped: "HELLO", data: 8900}
```

[Попробовать](https://share.effector.dev/3y20Z4I3)

### Длинный пример

```js
import {createEffect, attach, createStore} from 'effector'

const backendRequestFx = createEffect(async ({token, data, resource}) => {
  return fetch(`https://example.com/api${resource}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
})

const $requestsSent = createStore(0)
  .on(backendRequestFx, total => total + 1)

$requestsSent.watch(total => {
  console.log(`client analytics: sent ${total} requests`)
})

const $token = createStore('guest_token')

const authorizedRequestFx = attach({
  effect: backendRequestFx,
  source: $token,
  mapParams: ({data, resource}, token) => ({data, resource, token}),
})

const createRequestFx = resource =>
  attach({
    effect: authorizedRequestFx,
    mapParams: data => ({data, resource}),
  })

const getUserFx = createRequestFx('/user')
const getPostsFx = createRequestFx('/posts')

const user = await getUserFx({name: 'alice'})
/*
POST https://example.com/api/user
{"name": "alice"}
Authorization: Bearer guest_token
*/

// => client analytics: sent 1 requests

const posts = await getPostsFx({user: user.id})
/*
POST https://example.com/api/posts
{"user": 18329}
Authorization: Bearer guest_token
*/

// => client analytics: sent 2 requests
```

## `attach({effect, source})`

Создайте эффект, который будет вызывать заданный эффект со значениями из хранилищ `source`.

**Аргументы**

- `effect` ([_Effect_](Effect.md)):  Обернутый эффект
- `source` ([_Store_](Store.md) | `{[key: string]: Store}`): Стор или объект с сторами, значения которых будут переданы во второй аргумент `mapParams`.

**Возвращает**

[_Effect_](Effect.md): Новый эффект

## attach с помощью простой функции

:::note Начиная с
effector 22.0.0
:::

Создайте эффект, который будет вызывать асинхронную функцию со значениями из хранилищ `source`.

```ts
let resultFx: Effect<Params, Result>
resultFx = attach({
  source: Store<Source>,
  async effect(source: Source, params: Params): Result
})
```

**Аргументы**

- `effect` (_Function_): `(source: Source, params: Params) => Promise<Result> | Result`
- `source` ([_Store_](Store.md) | `{[key: string]: Store}`): Стор или объект со сторами, значения которых будут переданы в первый аргумент `effect`.

**Возвращает**

[_Effect_](Effect.md): Новый эффект

## `attach({effect, mapParams})`

Создайте эффект, который вызовет заданный эффект, преобразовав параметры с помощью функции `mapParams`.

**Аргументы**

- `effect` ([_Effect_](Effect.md)): Обернутый эффект
- `mapParams` (`(newParams) => effectParams`): Функция, которая получает новые параметры и сопоставляет их с параметрами обернутого `эффекта`. Работает как [event.prepend](Event.md#prependfn). Ошибки, произошедшие в функции `mapParams`, приведут к тому, что присоединенный эффект не сработает

**Возвращает**

[_Effect_](Effect.md): Новый эффект

## `attach({effect, mapParams, source})`

Создайте эффект, который будет читать значения из хранилищ `source`, передавать их с параметрами в функцию `mapParams` и вызывать `effect` с результатом

**Аргументы**

- `effect` ([_Effect_](Effect.md)): Обернутый эффект
- `mapParams` (`(newParams, values) => effectParams`): Функция, которая получает новые параметры и текущее значение `source` и объединяет их с параметрами обернутого `effect`. Ошибки, произошедшие в функции `mapParams`, приведут к тому, что присоединенный эффект не сработает
- `source` ([_Store_](Store.md) | `{[key: string]: Store}`): Стор или объект со сторами, значения которых будут переданы во второй аргумент `mapParams`.

**Возвращает**

[_Effect_](Effect.md): Новый эффект

:::note
Если `mapParams` выдаст ошибку, это вызовет событие `fail` и вложенный `effect` не будет вызван вообще
:::

## `attach({effect})`

Создайте эффект, который будет вызывать `effect` с параметрами как есть. Это позволяет создавать отдельные эффекты с общим поведением.

**Аргументы**

- `effect` ([_Effect_](Effect.md)): Обернутый эффект

**Возвращает**

[_Effect_](Effect.md): Новый эффект

:::note Начиная с
effector 21.5.0
:::

