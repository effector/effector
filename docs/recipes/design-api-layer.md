---
id: design-api-layer
title: Design API layer
hide_title: true
---

# Design API layer

Introduction:

1. This is an example for layer for API like REST
2. Each API method should have separated javascript method
3. We have two backends: main and reserved, and sometimes we can switch between them.

The API for this example:

- `GET /posts` — List of all posts
- `GET /post/:id` — Read single post by ID
- `POST /posts` — Create new post, **require authorization**
- `PUT /post/:id` — Edit created post, **require authorization**

Let's design API for JavaScript developers:

```ts
// First describe types which will be used in methods

interface Post {
  id: number
  title: string
  content: string
  authorId: number
}

interface PostForm {
  title: string
  content: string
}

// Next prototype javascript methods

export function postsList(): Promise<Post[]>

export function postRead(postId: number): Promise<Post>

export function postCreate(form: PostForm): Promise<Post>

export function postEdit(postId: number, form: PostForm): Promise<Post>
```

Okay toplevel API is done. Let's deep dive into underlevel.

### Attach and call it

We have two methods that requires authorization(`postCreate`, `postEdit`) and two simple(`postsList`, `postRead`).

How can we store authorization information? For example we should have some kind of authorization token

```ts
// If null, use don't have authorization token
export const $token = createStore<string | null>(null)

export const $isAuthorized = $token.map((token) => token !== null)
```

First of all we should define basic API methods, to call our backend:

```ts
import { $token } from 'features/session'

// 3 from introduction
const $backendUrl = createStore(RUNTIME_CONFIG.backend.main)

interface Request {
  uri: string

  method: 'POST' | 'GET' | 'PUT'

  // body is always javascript object, or nothing
  body?: object

  // Plain javascript object to pass custom headers
  headers?: Record<string, string>
}

const requestFx = createEffect<Request, any, Error>({
  handler: async ({ path, method, ...config }) => {
    const body = config.body ? JSON.stringify(config.body) : undefined
    const response = await fetch(path, { method, body, headers })

    if (!response.ok) {
      throw new NetworkError(await response.json())
    }

    return response.json()
  },
})
```

You can explicitly define `effect.done` type using something like [typed-contracts](https://github.com/bigslycat/typed-contracts#readme) to generate types from runtime validators. But here is not neccesary.
Also `NetworkError` and `AccessRestrictedError` are custom classes that extended from `Error`, that should be used to handle custom errors on different layers (you can use any paradigm).

Okay, `requestFx` can be used to request any data using `POST`, `GET` and `PUT` with body as json object. Now you need to define method, that use backend uri and token.

```ts
interface RequestInternal {
  // Will be appended to backend URL
  // Format: { path: "/posts" }
  path: string

  method: 'POST' | 'GET' | 'PUT'

  // body is always javascript object, or nothing
  body?: object

  // Plain javascript object to pass custom headers
  headers?: Record<string, string>
}

// Just attach backendUri to request
const requestInternalFx = attach({
  source: $backendUrl,
  effect: requestFx,
  mapParams: ({ path, ...config }: RequestInternal, backendUrl) => {
    // Here we need to construct params for requestFx
    const uri = `${backendUrl}${params.path}`

    return { ...config, uri }
  },
})

// Create effect that send only authorized requests
const requestAuthorizedFx = attach({
  source: $token,
  effect: requestInternalFx,
  mapParams: ({ headers, ...config }: RequestInternal, token) => {
    // Here we need to construct params for requestInternalFx

    // If no token, just throw an custom error
    if (!token) {
      throw new AccessRestrictedError('authorization token required')
    }

    const headersAuth = { ...headers, Authorization: `Bearer ${token}` }

    return { ...config, headers: headersAuth }
  },
})
```

Okay we have two service effects, to call non-authorized methods and authorized. Let's use it to create methods from introduction 2.

```ts
export const postsList: Effect<void, Post[], Error> = attach({
  effect: requestInternalFx,
  mapParams: () => ({ path: '/posts', method: 'GET' }),
})

export const postRead: Effect<number, Post, Error> = attach({
  effect: requestInternalFx,
  mapParams: (postId) => ({ path: `/post/${postId}`, method: 'GET' }),
})

export const postCreate: Effect<PostForm, Post, Error> = attach({
  effect: requestAuthorizedFx,
  mapParams: (newPost) => ({ path: '/posts', method: 'POST', body: newPost }),
})

export const postEdit: Effect<{ id: number; form: PostForm }> = attach({
  effect: requestAuthorizedFx,
  mapParams: ({ id, form }) => ({
    path: `/post/${id}`,
    method: 'PUT',
    body: form,
  }),
})
```

As you can see, original `postEdit` have two arguments, but effect can have only one. That's because we need to wrap arguments to object with explicit arguments names.

Now you can add listeners to `requestFx`, `requestInternalFx` and `requestAuthorizedFx` to handle all requests calls created with `attach()`. It can be handy when you creating some requests loader.
For example:

```ts
const $requestsInPendingState = requestFx.inFlight

$requestsInPendingState.watch((count) => {
  console.log('in pending', count)
})
// => 0

postsList() // => 1
postRead(5) // => 2

// => 1
// => 0
```
