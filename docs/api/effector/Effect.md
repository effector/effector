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

// Unnamed effect without thunk
const effectA = createEffect()

// Named effect without thunk
const effectB = createEffect("name")

// Named effect with thunk
const effectC = createEffect("name", {
  handler: (params) => {},
})
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

Setup function to call when effect trigger.

Replaces previous function inside.

#### Arguments

(_`thunk`_): Function, that receive arguments passed to effect call

#### Returns

(_`Effect`_): A container for async function.

#### Example

```js
const effect = createEffect("effect name")

effect.use((params) => console.log("effect called with", params))

effect(1) // >> effect called with 1
```

<hr>

### <a id='watch'></a>[`watch(watcher)`](#watch)

Subscribe to effect calls.

#### Arguments

(_`watcher`_): Listener that receives `params` and `effect name`

#### Returns

(_`Subscription`_): Unsubscribe function

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

(_`params`_): Arguments passed to effect call
(_`result`_): Result of resolved promise

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

(_`params`_): Arguments passed to effect call
(_`error`_): Error catched from thunk

#### Example

```js
const effect = createEffect()

effect.use((value) => Promise.reject(value - 1))

effect.fail.watch(({ params, result }) => {
  console.log("Fail with params", params, "and result", result)
})

effect(2) // >> Fail with params 2 and result 1
```
