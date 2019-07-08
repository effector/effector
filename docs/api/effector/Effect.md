---
id: effect
title: Effect
---

_Effect_ is a container for async function.

It can be safely used in place of the original async function.

The only requirement for function:

- **Should** have zero or one argument

#### Arguments

1. `params` (_Params_): parameters passed to effect

#### Returns

(_`Future`_)

#### Example

```js
const getUser = createEffect('get user')

getUser.use(params => {
  return fetch(`https://example.com/get-user/${params.id}`)
    .then(res => res.json())
})

const users = createStore([]) // <-- Default state
  // add reducer for getUser.done event (fires when promise resolved)
  .on(getUser.done, (state, {result: user, params}) => [...state, user])

// subscribe to promise resolve
getUser.done.watch(({result, params}) => {
  console.log(params) // {id: 1}
  console.log(result) // resolved value
})

// subscribe to promise reject (or throw)
getUser.fail.watch(({error, params}) => {
  console.error(params) // {id: 1}
  console.error(error) // rejected value
})

// you can replace function anytime
getUser.use(() => promiseMock)

// call effect with your params
getUser({id: 1})

const data = await getUser({id: 2}) // handle promise
```

## Effect Methods

### `use(thunk)`

Provides a function, which will be called when an effect is triggered.

It will replace the previous function inside (if any).

#### Arguments


(_`thunk`_): Function, that receives the first argument passed to an effect call

#### Returns

(_`Effect`_): A container for async function.

#### Example

```js
const effect = createEffect("effect name")

effect.use((params) => {
  console.log("effect called with", params)
  return fetch("/some-resource")
})

effect(1) // >> effect called with 1
```

<hr>

### `watch(watcher)`

Subscribe to effect calls.

#### Arguments

(_`watcher`_): A function that receives `params` and `effect name`

#### Returns

(_`Subscription`_): A function that unsubscribes the watcher

#### Example

```js
const effect = createEffect("foo")

effect.watch((params, name) => {
  console.log(name, "called with", params)
})

effect(20) // > foo called with 20
```

<hr>

### `prepend(fn)`

#### Returns

(_`Event`_): An intention to change state.

<hr>

## Effect Properties

### `.done`

_Event_ triggered when promise from _thunk_ is *resolved*

#### Arguments

Event triggered with object of `params` and `result`:

(_`params`_): An argument passed to the effect call  
(_`result`_): A result of the resolved promise

#### Example

```js
const effect = createEffect()

effect.use((value) => Promise.resolve(value + 1))

effect.done.watch(({ params, result }) => {
  console.log("Done with params", params, "and result", result)
})

effect(2) // >> Done with params 2 and result 3
```


### `.fail`

_Event_ triggered when promise from _thunk_ is *rejected* or thunk throws.

#### Arguments

Event triggered with object of `params` and `error`:

(_`params`_): An argument passed to effect call  
(_`error`_): An error catched from the thunk

#### Example

```js
const effect = createEffect()

effect.use((value) => Promise.reject(value - 1))

effect.fail.watch(({ params, error }) => {
  console.log("Fail with params", params, "and error", error)
})

effect(2) // >> Fail with params 2 and error 1
```

### `.pending`

_Store_ will update when `.done` or `.fail` are triggered.
_Store_ contains a `true` value until the effect is resolved.

#### Example

```js
import {createEffect} from 'effector'
import {createComponent} from 'effector-react'
import React from 'react'
const fetchApi = createEffect({
  handler: n => new Promise(resolve => setTimeout(resolve, n)),
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

### `.finally`

_Event_ triggered when promise from _thunk_ is *resolved*, *rejected* or thunk throws.

#### Arguments

Event triggered with object of `status`, `params` and `error` or `result`:

(_`status`_): A status of thunk (`done` or `fail`)   
(_`params`_): An argument passed to effect call  
(_`error`_): An error catched from the thunk  
(_`result`_): A result of the resolved promise  

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
