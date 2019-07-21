---
id: effect
title: Effect
---

**Effect** is a container for async function.

It can be safely used in place of the original async function.

#### Arguments

1. `params` (_Params_): parameters passed to effect

#### Returns

(_`Future`_)

#### Example

```js
const fetchUser = createEffect('get user', {
  handler: ({ id }) => {
    return fetch(`https://example.com/users/${id}`).then(res => res.json())
  }
})

const users = createStore([]) // <= Default state
  // add reducer for getUser.done event (triggered when handler resolved)
  .on(fetchUser.done, (users, {result: user}) => [...users, user])

// subscribe to handler resolve
fetchUser.done.watch(({result, params}) => {
  console.log(params) // {id: 1}
  console.log(result) // resolved value
})

// subscribe to handler reject or throw error
fetchUser.fail.watch(({error, params}) => {
  console.error(params) // {id: 1}
  console.error(error) // rejected value
})

// you can replace function anytime
fetchUser.use(() => promiseMock)

// call effect with your params
fetchUser({id: 1})

const data = await fetchUser({id: 2}) // handle promise
```

## Effect Methods

### `use(handler)`

Provides a function, which will be called when an effect is triggered.

It will replace the previous function inside (if any).

#### Arguments


(_`handler`_): Function, that receives the first argument passed to an effect call.


#### Returns

(_`Effect`_): A container for async function.

#### Example

```js
const effect = createEffect("effect name", {
  handler: (params) => {
    console.log("effect called with", params)
    return fetch("/some-resource")
  }
})

effect(1) // >> effect called with 1
```

<hr />

### `watch(watcher)`

Subscribe to effect calls.

#### Arguments

(_`watcher`_): A function that receives `payload`.

#### Returns


(_`Subscription`_): A function that unsubscribes the watcher.


#### Example

```js
const effect = createEffect("foo", {
  handler: value => value
})

effect.watch(payload => {
  console.log("called with", payload)
})

effect(20) // > called with 20
```

<hr />

### `prepend(fn)`

#### Returns

(_`Event`_): An intention to change state.

<hr />

## Effect Properties

### `done`


_Event_ triggered when promise from _thunk_ is *resolved*.


#### Arguments

Event triggered with object of `params` and `result`:

(_`params`_): An argument passed to the effect call
(_`result`_): A result of the resolved handler

#### Example

```js
const effect = createEffect({
  handler: (value) => Promise.resolve(value + 1)
})

effect.done.watch(({ params, result }) => {
  console.log("Done with params", params, "and result", result)
})

effect(2) // >> Done with params 2 and result 3
```


### `fail`

Event triggered when handler is rejected or throws error.

#### Arguments

Event triggered with object of `params` and `error`:

(_`params`_): An argument passed to effect call
(_`error`_): An error catched from the handler

#### Example

```js
const effect = createEffect()

effect.use((value) => Promise.reject(value - 1))

effect.fail.watch(({ params, error }) => {
  console.log("Fail with params", params, "and error", error)
})

effect(2) // >> Fail with params 2 and error 1
```

### `pending`

_Store_ will update when `done` or `fail` are triggered.
_Store_ contains a `true` value until the effect is resolved or rejected.

#### Example

```js
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

```js
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

(_`status`_): A status of effect (`done` or `fail`)
(_`params`_): An argument passed to effect call
(_`error`_): An error catched from the handler
(_`result`_): A result of the resolved handler

#### Example

```js
import {createEffect} from 'effector'

const fetchApi = createEffect({
  handler: ms =>  new Promise(resolve => setTimeout(resolve, ms, `${ms} ms`)),
})

fetchApi.finally.watch(console.log)

fetchApi(100)
// if resolved
// => {status: 'done', result: '100 ms', params: 100}

// if rejected
// => {status: 'fail', error: Error, params: 100}

```
