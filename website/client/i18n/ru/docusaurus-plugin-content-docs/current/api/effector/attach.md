---
id: attach
title: attach
description: Wrapper for effect, which allows to map effect arguments and use data from stores.
---

:::note since
effector 20.13.0
:::
Wrapper for [_effect_](Effect.md), which allows to map effect arguments and use data from [_stores_](Store.md).

Use cases: declarative way to pass values from stores to effects and argument preprocessing.

С версии `22.4.0`, можно проверить создан ли эффект с помощью метода `attach` — [`is.attached`](./is.md#isattachedvalue).

## Formulae

```ts
attach({ effect, mapParams?, source?, name? }): newEffect
```

When `newEffect` is called, call `mapParams` with params of the `newEffect` and data from `source`, then call original `effect`

- If `attach` called without `source`, `mapParams` will be called only with params of the `newEffect`
- `attach` always returns new [effect](Effect.md)
- If original `effect` belongs to some [domain](./Domain.md) then `newEffect` will belong to it as well

### Short example

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

// => Created effect called with "HELLO"
// => Original effect called with { wrapped: "HELLO" }
```

[Try it](https://share.effector.dev/MpAfRBRi)

### Short example with source

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

// => Created effect called with "HELLO" and data 8900
// => Original effect called with {wrapped: "HELLO", data: 8900}
```

[Try it](https://share.effector.dev/3y20Z4I3)

### Long example

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

Create effect which will trigger given one with values from `source` stores

**Arguments**

- `effect` ([_Effect_](Effect.md)): Wrapped effect
- `source` ([_Store_](Store.md) | `{[key: string]: Store}`): Store or object with stores, values of which will be passed to the second argument of `mapParams`

**Returns**

[_Effect_](Effect.md): New effect

## attach with plain function

:::note since
effector 22.0.0
:::

Create effect which will call async function with values from `source` stores

```ts
let resultFx: Effect<Params, Result>
resultFx = attach({
  source: Store<Source>,
  async effect(source: Source, params: Params): Result
})
```

**Arguments**

- `effect` (_Function_): `(source: Source, params: Params) => Promise<Result> | Result`
- `source` ([_Store_](Store.md) | `{[key: string]: Store}`): Store or object with stores, values of which will be passed to the first argument of `effect`

**Returns**

[_Effect_](Effect.md): New effect

## `attach({effect, mapParams})`

Create effect which will trigger given one by transforming params by `mapParams` function

**Arguments**

- `effect` ([_Effect_](Effect.md)): Wrapped effect
- `mapParams` (`(newParams) => effectParams`): Function which receives new params and maps them to the params of the wrapped `effect`. Works like [event.prepend](Event.md#prependfn). Errors happened in `mapParams` function will force attached effect to fail

**Returns**

[_Effect_](Effect.md): New effect

## `attach({effect, mapParams, source})`

Create effect which will read values from `source` stores, pass them with params to `mapParams` function and call `effect` with result

**Arguments**

- `effect` ([_Effect_](Effect.md)): Wrapped effect
- `mapParams` (`(newParams, values) => effectParams`): Function which receives new params and current value of `source` and combines them to the params of the wrapped `effect`. Errors happened in `mapParams` function will force attached effect to fail
- `source` ([_Store_](Store.md) | `{[key: string]: Store}`): Store or object with stores, values of which will be passed to the second argument of `mapParams`

**Returns**

[_Effect_](Effect.md): New effect

:::note
If `mapParams` throw an error, it will trigger `fail` event and nested `effect` will not be called at all
:::

## `attach({effect})`

Create effect which will call `effect` with params as it is. That allow to create separate effects with shared behavior.

**Arguments**

- `effect` ([_Effect_](Effect.md)): Wrapped effect

**Returns**

[_Effect_](Effect.md): New effect

:::note since
effector 21.5.0
:::

