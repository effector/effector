---
id: effect
title: Effect
---

**Effect** is a container for async function.

It can be safely used in place of the original async function.

#### Arguments

1. `params` (_Params_): parameters passed to effect

#### Returns

(_`Promise`_)

#### Example

```js try
const fetchUser = createEffect({
  handler: ({id}) => {
    return fetch(`https://example.com/users/${id}`).then(res => res.json())
  },
})

const users = createStore([]) // Default state
  // add reducer for fetchUser.done event (triggered when handler resolved)
  .on(fetchUser.done, (users, {result: user}) => [...users, user])

// subscribe to handler resolve
fetchUser.done.watch(({result, params}) => {
  console.log(params) // => {id: 1}
  console.log(result) // => resolved value
})

// subscribe to handler reject or throw error
fetchUser.fail.watch(({error, params}) => {
  console.error(params) // => {id: 1}
  console.error(error) // => rejected value
})

// you can replace function anytime
fetchUser.use(anotherHandler)

// call effect with your params
fetchUser({id: 1})

// handle promise
const data = await fetchUser({id: 2})
```

## Effect Methods

### `use(handler)`

Provides a function, which will be called when an effect is triggered.

It will replace the previous function inside (if any).

#### Arguments

1. `handler` (_Function_): Function, that receives the first argument passed to an effect call.

#### Returns

(_`Effect`_): A container for async function.

#### Example

```js try
const fetchUserRepos = createEffect()

fetchUserRepos.use(async params => {
  console.log('fetchUserRepos called with', params)

  const url = `https://api.github.com/users/${params.name}/repos`
  const req = await fetch(url)
  return req.json()
})

fetchUserRepos({name: 'zerobias'}) // => fetchUserRepos called with {name: 'zerobias'}
```

<hr />

### `watch(watcher)`

Subscribe to effect calls.

#### Arguments

1. `watcher` (_Function_): A function that receives `payload`.

#### Returns

(_`Subscription`_): A function that unsubscribes the watcher.

#### Example

```js try
const effect = createEffect({
  handler: value => value,
})

const unsubscribe = effect.watch(payload => {
  console.log('called with', payload)
  unsubscribe()
})

effect(10) // => called with 10
effect(20) // nothing, cause watcher unsubscribed
```

<hr />

### `prepend(fn)`

Creates an event, upon trigger it does send transformed data into source event. Works kind of like reverse `.map`. In the case of `.prepend` data transforms **before the original event occurs** and in the case of `.map`, data transforms **after original event occurred**.

#### Arguments

1. `fn` (_Function_): A function that receives `payload`, should be **pure**.

#### Returns

(_`Event`_): An intention to change state.

<hr />

## Effect Properties

### `done`

_Event_ triggered when _handler_ is _resolved_.

#### Arguments

Event triggered with object of `params` and `result`:

1. `params` (_Params_): An argument passed to the effect call
2. `result` (_Done_): A result of the resolved handler

#### Example

```js try
const effect = createEffect({
  handler: value => Promise.resolve(value + 1),
})

effect.done.watch(({params, result}) => {
  console.log('Done with params', params, 'and result', result)
})

effect(2) // => Done with params 2 and result 3
```

### `fail`

Event triggered when handler is rejected or throws error.

#### Arguments

Event triggered with object of `params` and `error`:

1. `params` (_Params_): An argument passed to effect call
2. `error` (_Fail_): An error catched from the handler

#### Example

```js try
const effect = createEffect()

effect.use(value => Promise.reject(value - 1))

effect.fail.watch(({params, error}) => {
  console.log('Fail with params', params, 'and error', error)
})

effect(2) // => Fail with params 2 and error 1
```

### `pending`

_Store_ will update when `done` or `fail` are triggered.
_Store_ contains a `true` value until the effect is resolved or rejected.

#### Example

```js try
import React from 'react'
import {createEffect} from 'effector'
import {createComponent} from 'effector-react'

const fetchApi = createEffect({
  handler: ms => new Promise(resolve => setTimeout(resolve, ms)),
})

fetchApi.pending.watch(console.log)

const Loading = createComponent(
  fetchApi.pending,
  (props, pending) => pending && <div>Loading...</div>,
)

fetchApi(5000)
```

It's a shorthand for common use case

```js try
import {createEffect, createStore} from 'effector'

const fetchApi = createEffect()

//now you can use fetchApi.pending instead
const isLoading = createStore(false)
  .on(fetchApi, () => true)
  .on(fetchApi.done, () => false)
  .on(fetchApi.fail, () => false)
```

### `finally`

Event triggered when handler is resolved, rejected or throws error.

#### Arguments

Event triggered with object of `status`, `params` and `error` or `result`:

1. `status` (_string_): A status of effect (`done` or `fail`)
2. `params` (_Params_): An argument passed to effect call
3. `error` (_Fail_): An error catched from the handler
4. `result` (_Done_): A result of the resolved handler

#### Example

```js try
import {createEffect} from 'effector'

const fetchApi = createEffect({
  handler: ms => new Promise(resolve => setTimeout(resolve, ms, `${ms} ms`)),
})

fetchApi.finally.watch(console.log)

fetchApi(100)
// if resolved
// => {status: 'done', result: '100 ms', params: 100}

// if rejected
// => {status: 'fail', error: Error, params: 100}
```
