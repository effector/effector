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
import {createEffect, createStore} from 'effector'

const fetchUserFx = createEffect({
  async handler({id}) {
    const res = await fetch(`https://example.com/users/${id}`)
    return res.json()
  },
})

const users = createStore([]) // Default state
  // add reducer for fetchUserFx.doneData event (triggered when handler resolved)
  .on(fetchUserFx.doneData, (users, user) => [...users, user])

// subscribe to handler resolve
fetchUserFx.done.watch(({result, params}) => {
  console.log(params) // => {id: 1}
  console.log(result) // => resolved value
})

// subscribe to handler reject or throw error
fetchUserFx.fail.watch(({error, params}) => {
  console.error(params) // => {id: 1}
  console.error(error) // => rejected value
})

// you can replace function anytime
fetchUserFx.use(anotherHandler)

// call effect with your params
fetchUserFx({id: 1})

// handle promise
const data = await fetchUserFx({id: 2})
```

[Try it](https://share.effector.dev/am85AiZf)

## Effect Methods

### `use(handler)`

Provides a function, which will be called when an effect is triggered.

It will replace the previous function inside (if any).

#### Arguments

1. `handler` (_Function_): Function, that receives the first argument passed to an effect call.

#### Returns

((_Effect_)[Effect.md]): The same effect

#### Example

```js try
const fetchUserReposFx = createEffect()

fetchUserReposFx.use(async params => {
  console.log('fetchUserReposFx called with', params)

  const url = `https://api.github.com/users/${params.name}/repos`
  const req = await fetch(url)
  return req.json()
})

fetchUserReposFx({name: 'zerobias'})
// => fetchUserRepos called with {name: 'zerobias'}
```

[Try it](https://share.effector.dev/TlYuDeve)

<hr />

### `watch(watcher)`

Subscribe to effect calls.

#### Arguments

1. `watcher` (_Function_): A function that receives `payload`.

#### Returns

([_Subscription_](../../glossary.md#subscription)): Unsubscribe function.

#### Example

```js try
import {createEffect} from 'effector'

const effectFx = createEffect({
  handler: value => value,
})

const unsubscribe = effectFx.watch(payload => {
  console.log('called with', payload)
  unsubscribe()
})

effectFx(10) // => called with 10
effectFx(20) // nothing, cause watcher unsubscribed
```

[Try it](https://share.effector.dev/qK7m6pt7)

<hr />

### `prepend(fn)`

Creates an event, upon trigger it does send transformed data into source event. Works kind of like reverse `.map`. In the case of `.prepend` data transforms **before the original event occurs** and in the case of `.map`, data transforms **after original event occurred**.

#### Arguments

1. `fn` (_Function_): A function that receives `payload`, should be **pure**.

#### Returns

([_Event_](Event.md)): New event.

<hr />

### `use.getCurrent()`

Returns current handler of effect. Useful for testing.

#### Returns

(_Function_): Current handler, defined by `handler` property or via `use` call.

#### Example

```js try
const handlerA = () => 'A'
const handlerB = () => 'B'

const fx = createEffect({handler: handlerA})

console.log(fx.use.getCurrent() === handlerA)
// => true

fx.use(handlerB)
console.log(fx.use.getCurrent() === handlerB)
// => true
```

[Try it](https://share.effector.dev/mtY4Ny0n)

<hr />

## Effect Properties

### `doneData`

([_Event_](Event.md)) triggered when _handler_ is _resolved_.

#### Arguments

Event triggered with result of effect execution:

1. `result` (_Done_): A result of the resolved handler

#### Example

```js try
import {createEffect} from 'effector'

const effectFx = createEffect({
  handler: value => Promise.resolve(value + 1),
})

effectFx.doneData.watch(result => {
  console.log('Done with result', result)
})

effectFx(2) // => Done with result 3
```

[Try it](https://share.effector.dev/KXoTVGju)

### `failData`

([_Event_](Event.md)) triggered when handler is rejected or throws error.

#### Arguments

Event triggered with error thrown by effect:

1. `error` (_Fail_): An error thrown by handler

#### Example

```js try
import {createEffect} from 'effector'

const effectFx = createEffect()

effectFx.use(value => Promise.reject(value - 1))

effectFx.failData.watch(error => {
  console.log('Fail with error', error)
})

effectFx(2) // => Fail with error 1
```

[Try it](https://share.effector.dev/DQFsvWqy)

### `done`

([_Event_](Event.md)) triggered when _handler_ is _resolved_.

#### Arguments

Event triggered with object of `params` and `result`:

1. `params` (_Params_): An argument passed to the effect call
2. `result` (_Done_): A result of the resolved handler

#### Example

```js try
import {createEffect} from 'effector'

const effectFx = createEffect({
  handler: value => Promise.resolve(value + 1),
})

effectFx.done.watch(({params, result}) => {
  console.log('Done with params', params, 'and result', result)
})

effectFx(2) // => Done with params 2 and result 3
```

[Try it](https://share.effector.dev/b4lNYXPs)

### `fail`

([_Event_](Event.md)) triggered when handler is rejected or throws error.

#### Arguments

Event triggered with object of `params` and `error`:

1. `params` (_Params_): An argument passed to effect call
2. `error` (_Fail_): An error catched from the handler

#### Example

```js try
import {createEffect} from 'effector'

const effectFx = createEffect()

effectFx.use(value => Promise.reject(value - 1))

effectFx.fail.watch(({params, error}) => {
  console.log('Fail with params', params, 'and error', error)
})

effectFx(2) // => Fail with params 2 and error 1
```

[Try it](https://share.effector.dev/UaHRvZrE)

### `finally`

Event triggered when handler is resolved, rejected or throws error.

#### Arguments

([_Event_](Event.md)) triggered with object of `status`, `params` and `error` or `result`:

1. `status` (_string_): A status of effect (`done` or `fail`)
2. `params` (_Params_): An argument passed to effect call
3. `error` (_Fail_): An error catched from the handler
4. `result` (_Done_): A result of the resolved handler

#### Example

```js try
import {createEffect} from 'effector'

const fetchApiFx = createEffect({
  handler: ms => new Promise(resolve => setTimeout(resolve, ms, `${ms} ms`)),
})

fetchApiFx.finally.watch(console.log)

fetchApiFx(100)
// if resolved
// => {status: 'done', result: '100 ms', params: 100}

// if rejected
// => {status: 'fail', error: Error, params: 100}
```

[Try it](https://share.effector.dev/x4NVEQc9)

### `pending`

([_Store_](Store.md)) will update when `done` or `fail` are triggered.
([_Store_](Store.md)) contains a `true` value until the effect is resolved or rejected.

#### Example

```js try
import React from 'react'
import {createEffect} from 'effector'
import {createComponent} from 'effector-react'

const fetchApiFx = createEffect({
  handler: ms => new Promise(resolve => setTimeout(resolve, ms)),
})

fetchApiFx.pending.watch(console.log)

const Loading = createComponent(
  fetchApiFx.pending,
  (props, pending) => pending && <div>Loading...</div>,
)

fetchApiFx(5000)

ReactDOM.render(<Loading />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/cnr4Z15t)

It's a shorthand for common use case

```js try
import {createEffect, createStore} from 'effector'

const fetchApiFx = createEffect()

//now you can use fetchApiFx.pending instead
const isLoading = createStore(false)
  .on(fetchApiFx, () => true)
  .on(fetchApiFx.done, () => false)
  .on(fetchApiFx.fail, () => false)
```

### `inFlight`

([_Store_](Store.md)) which show how many effect calls aren't settled yet. Useful for rate limiting.

#### Example

```js try
import {createEffect} from 'effector'

const fx = createEffect({
  handler: () => new Promise(rs => setTimeout(rs, 500)),
})

fx.inFlight.watch(amount => {
  console.log('in-flight requests:', amount)
})
// => 0

const req1 = fx()
// => 1

const req2 = fx()
// => 2

await Promise.all([req1, req2])

// => 1
// => 0
```

[Try it](https://share.effector.dev/tSAhu4Kt)
