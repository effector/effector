---
id: attach
title: attach
hide_title: true
---

# attach

Wrapper for [_effect_](Effect.md) which allow to map effect arguments and use data from [_stores_](Store.md).

Use cases: declarative passing values from stores to effects and argument preprocessing.

```js
import {createEffect, attach, createStore} from 'effector'

const backendRequest = createEffect({
  async handler({token, data, resource}) {
    const req = fetch(`https://example.com/api${resource}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  },
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

## `attach({effect, mapParams})`

#### Arguments

- `effect` ([_Effect_](Effect.md)): Wrapped effect
- `mapParams` (`(newParams) => effectParams`): Function which receives new params and map them to params for wrapped `effect`, [should be **pure**](../../glossary.md#pureness). Works like [event.prepend](Event.md#prependfn)

#### Returns

[_Effect_](Effect.md): New effect

## `attach({effect, mapParams, source})`

#### Arguments

- `effect` ([_Effect_](Effect.md)): Wrapped effect
- `mapParams` (`(newParams, values) => effectParams`): Function which receives new params and current value of `source` and combine them to params for wrapped `effect`, [should be **pure**](../../glossary.md#pureness)
- `source` ([_Store_](Store.md) | `{[key: string]: Store}`): Store or object with stores which values will be passed to second argument of `mapParams`

#### Returns

[_Effect_](Effect.md): New effect
