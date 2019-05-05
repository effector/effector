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

### Effect Methods

- [`use(thunk)`](#use)
- [`watch(watcher)`](#watch)
- [`prepend(fn)`](#prepend)

### Effect Properties

- [`done`](#done)
- [`fail`](#fail)

## Effect Methods

### <a id='use'></a>[`use(thunk)`](#use)

Provides a function, which will be called when an effect is triggered.

It will replase the previous function inside if there is one,

#### Arguments

There can only be one argument and the function receives `params`

(_`thunk`_): Function, that receive arguments passed to effect call

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

### <a id='watch'></a>[`watch(watcher)`](#watch)

Subscribe to effect calls.

#### Arguments

(_`watcher`_): Function that receives `params` and `effect name`

#### Returns

(_`Subscription`_): Function that unsubscribes the watcher

#### Example

```js
const effect = createEffect("foo")

effect.watch((params, name) => {
  console.log(name, "called with", params)
})

effect(20) // > foo called with 20
```

<hr>

### <a id='prepend'></a>[`prepend(fn)`](#prepend)

#### Returns

(_`Event`_): An intention to change state.

<hr>

## Effect Properties

### <a id='done'></a>[`.done`](#done)

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


### <a id='fail'></a>[`.fail`](#fail)

_Event_ triggered when promise from _thunk_ is *rejected* or thunk throws.

#### Arguments

Event triggered with object of `params` and `error`:

(_`params`_): An argument passed to effect call
(_`error`_): An error catched from thunk

#### Example

```js
const effect = createEffect()

effect.use((value) => Promise.reject(value - 1))

effect.fail.watch(({ params, error }) => {
  console.log("Fail with params", params, "and error", error)
})

effect(2) // >> Fail with params 2 and error 1
```
