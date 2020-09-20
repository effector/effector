---
id: attach
title: attach
---

:::note since
effector 20.13.0
:::
Wrapper for [_effect_](Effect.md), which allows to map effect arguments and use data from [_stores_](Store.md).

Use cases: declarative way to pass values from stores to effects and argument preprocessing.

## Formulae

```ts
attach({ effect, mapParams?, source?, name? }): newEffect
```

When `newEffect` is called, call `mapParams` with params of the `newEffect` and data from `source`, then call original `effect`

- If `attach` called without `source`, `mapParams` will be called only with params of the `newEffect`
- `attach()` always returns new [_Effect_](Effect.md)

### Short example

```js
import {createEffect, attach} from 'effector'

const original = createEffect(params => {
  console.log('Original effect called with', params)
})

const created = attach({
  effect: original,
  mapParams: params => {
    console.log('Created effect called with', params)
    return {wrapped: params}
  },
})

await created('HELLO')

// => Created effect called with "HELLO"
// => Original effect called with { wrapped: "HELLO" }
```

[Try it](https://share.effector.dev/MpAfRBRi)

### Short example with source

```js
import {createEffect, attach} from 'effector'

const original = createEffect(params => {
  console.log('Original effect called with', params)
})

const data = createStore(8900)

const created = attach({
  effect: original,
  source: data,
  mapParams: (params, data) => {
    console.log('Created effect called with', params, 'and data', data)
    return {wrapped: params, data}
  },
})

await created('HELLO')

// => Created effect called with "HELLO" and data 8900
// => Original effect called with {wrapped: "HELLO", data: 8900}
```

[Try it](https://share.effector.dev/3y20Z4I3)

### Long example

```js
import {createEffect, attach, createStore} from 'effector'

const backendRequest = createEffect(async ({token, data, resource}) => {
  return fetch(`https://example.com/api${resource}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
})

const requestsSend = createStore(0).on(backendRequest, total => total + 1)

requestsSend.watch(total => {
  console.log(`client analytics: sent ${total} requests`)
})

const token = createStore('guest_token')

const authorizedRequest = attach({
  effect: backendRequest,
  source: token,
  mapParams: ({data, resource}, token) => ({data, resource, token}),
})

const createRequest = resource =>
  attach({
    effect: authorizedRequest,
    mapParams: data => ({data, resource}),
  })

const getUser = createRequest('/user')
const getPosts = createRequest('/posts')

const user = await getUser({name: 'alice'})
/*
POST https://example.com/api/user
{"name": "alice"}
Authorization: Bearer guest_token
*/

// => client analytics: sent 1 requests

const posts = await getPosts({user: user.id})
/*
POST https://example.com/api/posts
{"user": 18329}
Authorization: Bearer guest_token
*/

// => client analytics: sent 2 requests
```

## `attach({effect, source})`

Create effect which will trigger given one with values from `source` stores

#### Arguments

- `effect` ([_Effect_](Effect.md)): Wrapped effect
- `source` ([_Store_](Store.md) | `{[key: string]: Store}`): Store or object with stores, values of which will be passed to the second argument of `mapParams`

#### Returns

[_Effect_](Effect.md): New effect

## `attach({effect, mapParams})`

Create effect which will trigger given one by transforming params by `mapParams` function

#### Arguments

- `effect` ([_Effect_](Effect.md)): Wrapped effect
- `mapParams` (`(newParams) => effectParams`): Function which receives new params and maps them to the params of the wrapped `effect`. Works like [event.prepend](Event.md#prependfn). Errors happened in `mapParams` function will force attached effect to fail

#### Returns

[_Effect_](Effect.md): New effect

## `attach({effect, mapParams, source})`

Create effect which will read values from `source` stores, pass them with params to `mapParams` function and call `effect` with result

#### Arguments

- `effect` ([_Effect_](Effect.md)): Wrapped effect
- `mapParams` (`(newParams, values) => effectParams`): Function which receives new params and current value of `source` and combines them to the params of the wrapped `effect`. Errors happened in `mapParams` function will force attached effect to fail
- `source` ([_Store_](Store.md) | `{[key: string]: Store}`): Store or object with stores, values of which will be passed to the second argument of `mapParams`

#### Returns

[_Effect_](Effect.md): New effect

:::note
If `mapParams` throw an error, it will trigger `fail` event and nested `effect` will not be called at all
:::
