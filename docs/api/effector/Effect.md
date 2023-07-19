---
id: effect
title: Effect
description: Effect, its methods and properties
---

**Effect** is a container for async function.

It can be safely used in place of the original async function.

**Arguments**

1. `params` (_Params_): parameters passed to effect

**Returns**

(_`Promise`_)

#### Example

```js
import {createEffect, createStore} from 'effector'

const fetchUserFx = createEffect(async ({id}) => {
  const res = await fetch(`https://example.com/users/${id}`)
  return res.json()
})

const $users = createStore([]) // Default state
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
fetchUserFx.use(function anotherHandler() {})

// call effect with your params
fetchUserFx({id: 1})

// handle promise
const data = await fetchUserFx({id: 2})
```

[Try it](https://share.effector.dev/7sfYga4o)

## Effect Methods

### `use(handler)`

Provides a function, which will be called when effect is triggered.

#### Formulae

```ts
effect.use(fn)
```

- Set handler `fn` for `effect`
- If effect already had an implementation at the time of the call, it will be replaced by a new one

Hint: current handler can be extracted with [`effect.use.getCurrent()`](#usegetcurrent).

You must provide a handler either through [`.use`](./Effect.md#usehandler) method or `handler` property in [createEffect](./createEffect.md), otherwise effect will throw with `no handler used in _%effect name%_` error when effect will be called.

:::tip See also
[Testing api calls with effects and stores](https://www.patreon.com/posts/testing-api-with-32415095)
:::

**Arguments**

1. `handler` (_Function_): Function, that receives the first argument passed to an effect call.

**Returns**

([_Effect_](./Effect.md)): The same effect

#### Example

```js
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

#### Formulae

```ts
const unwatch = effect.watch(fn)
```

- Call `fn` on each `effect` call, pass payload of `effect` as argument to `fn`
- When `unwatch` is called, stop calling `fn`

**Arguments**

1. `watcher` ([_Watcher_](../../explanation/glossary.md#watcher)): A function that receives `payload`.

**Returns**

[_Subscription_](../../explanation/glossary.md#subscription): Unsubscribe function.

#### Example

```js
import {createEffect} from 'effector'

const fx = createEffect(params => params)

fx.watch(params => {
  console.log('effect called with value', params)
})

await fx(10)
// => effect called with value 10
```

[Try it](https://share.effector.dev/VN1ef0TZ)

<hr />

### `prepend(fn)`

Creates an event, upon trigger it sends transformed data into the source event. Works kind of like reverse `.map`. In case of `.prepend` data transforms **before the original event occurs** and in the case of `.map`, data transforms **after original event occurred**.

#### Formulae

```ts
const event = effect.prepend(fn)
```

- When `event` is triggered, call `fn` with payload from `event`, then trigger `effect` with result of `fn()`

**Arguments**

1. `fn` (_Function_): A function that receives `payload`, [should be **pure**](../../explanation/glossary.md#purity).

**Returns**

[_Event_](Event.md): New event.

<hr />

### `map(fn)`

Creates a new event, which will be called after the original effect is called, applying the result of a `fn` as a payload. It is special function which allows you to decompose dataflow, extract or transform data.

#### Formulae

```ts
const second = first.map(fn)
```

- When `first` is triggered, pass payload from `first` to `fn`
- Trigger `second` with the result of the `fn()` call as payload

**Arguments**

1. `fn` (_Function_): A function that receives `payload`, [should be **pure**](../../explanation/glossary.md#purity).

**Returns**

[_Event_](Event.md): New event.

#### Example

```js
import {createEffect} from 'effector'

const userUpdate = createEffect(({name, role}) => {
  console.log(name, role)
})
const userNameUpdated = userUpdate.map(({name}) => name) // you may decompose dataflow with .map() method
const userRoleUpdated = userUpdate.map(({role}) => role.toUpperCase()) // either way you can transform data

userNameUpdated.watch(name => console.log(`User's name is [${name}] now`))
userRoleUpdated.watch(role => console.log(`User's role is [${role}] now`))

await userUpdate({name: 'john', role: 'admin'})
// => User's name is [john] now
// => User's role is [ADMIN] now
// => john admin
```

[Try it](https://share.effector.dev/MmBBKXZe)

<hr />

### `use.getCurrent()`

Returns current handler of effect. Useful for testing.

#### Formulae

```ts
fn = effect.use.getCurrent()
```

- Returns current handler for `effect`
- If no handler was assigned to `effect`, default handler will be returned ([that throws an error](https://share.effector.dev/8PBjt3TL))
- Hint: to set a new handler use [`effect.use(handler)`](#usehandler)

**Returns**

(_Function_): Current handler, defined by `handler` property or via `use` call.

#### Example

```js
const handlerA = () => 'A'
const handlerB = () => 'B'

const fx = createEffect(handlerA)

console.log(fx.use.getCurrent() === handlerA)
// => true

fx.use(handlerB)
console.log(fx.use.getCurrent() === handlerB)
// => true
```

[Try it](https://share.effector.dev/CM6hgtOM)

<hr />

## Effect Properties

You are not supposed to use parts of effect (like `.done` and `.pending`) as a target in [sample](./sample.md) or [forward](./forward.md) (even though they are events and stores), since effect is a complete entity on its own. This behavior will not be supported.

### `doneData`

:::note since
effector 20.12.0
:::

Event, which is triggered with result of the effect execution:

#### Formulae

```ts
event = effect.doneData
```

- `doneData` is an event, that triggered when `effect` is successfully resolved with `result` from [`.done`](#done)

:::caution Important
Do not manually call this event. It is event that depends on effect.
:::

[_Event_](Event.md) triggered when _handler_ is _resolved_.

#### Example

```js
import {createEffect} from 'effector'

const fx = createEffect(value => value + 1)

fx.doneData.watch(result => {
  console.log(`Effect was successfully resolved, returning ${result}`)
})

await fx(2)
// => Effect was successfully resolved, returning 3
```

[Try it](https://share.effector.dev/rNesMDtw)

### `failData`

:::note since
effector 20.12.0
:::

Event, which is triggered with error thrown by the effect

#### Formulae

```ts
event = effect.failData
```

- `failData` is an event, that triggered when `effect` is rejected with `error` from [`.fail`](#fail)

:::caution Important
Do not manually call this event. It is event that depends on effect.
:::

[_Event_](Event.md) triggered when handler is rejected or throws error.

#### Example

```js
import {createEffect} from 'effector'

const fx = createEffect(async value => {
  throw Error(value - 1)
})

fx.failData.watch(error => {
  console.log(`Execution failed with error ${error.message}`)
})

fx(2)
// => Execution failed with error 1
```

[Try it](https://share.effector.dev/rNU3tqEx)

### `done`

[_Event_](Event.md), which is triggered when _handler_ is _resolved_.

:::caution Important
Do not manually call this event. It is event that depends on effect.
:::

#### Properties

Event triggered with object of `params` and `result`:

1. `params` (_Params_): An argument passed to the effect call
2. `result` (_Done_): A result of the resolved handler

#### Example

```js
import {createEffect} from 'effector'

const fx = createEffect(value => value + 1)

fx.done.watch(({params, result}) => {
  console.log('Call with params', params, 'resolved with value', result)
})

await fx(2)
// => Call with params 2 resolved with value 3
```

[Try it](https://share.effector.dev/VogsNaDn)

### `fail`

[_Event_](Event.md), which is triggered when handler is rejected or throws error.

:::caution Important
Do not manually call this event. It is event that depends on effect.
:::

#### Properties

Event triggered with object of `params` and `error`:

1. `params` (_Params_): An argument passed to effect call
2. `error` (_Fail_): An error caught from the handler

#### Example

```js
import {createEffect} from 'effector'

const fx = createEffect(async value => {
  throw Error(value - 1)
})

fx.fail.watch(({params, error}) => {
  console.log('Call with params', params, 'rejected with error', error.message)
})

fx(2)
// => Call with params 2 rejected with error 1
```

[Try it](https://share.effector.dev/hCPCHQ5N)

### `finally`

:::note since
effector 20.0.0
:::

Event, which is triggered when handler is resolved, rejected or throws error.

:::caution Important
Do not manually call this event. It is event that depends on effect.
:::

#### Properties

[_Event_](Event.md), which is triggered with object of `status`, `params` and `error` or `result`:

1. `status` (_string_): A status of effect (`done` or `fail`)
2. `params` (_Params_): An argument passed to effect call
3. `error` (_Fail_): An error caught from the handler
4. `result` (_Done_): A result of the resolved handler

#### Example

```js
import {createEffect} from 'effector'

const fetchApiFx = createEffect(async ({time, ok}) => {
  await new Promise(resolve => setTimeout(resolve, time))
  if (ok) return `${time} ms`
  throw Error(`${time} ms`)
})

fetchApiFx.finally.watch(value => {
  switch (value.status) {
    case 'done':
      console.log(
        'Call with params',
        value.params,
        'resolved with value',
        value.result,
      )
      break
    case 'fail':
      console.log(
        'Call with params',
        value.params,
        'rejected with error',
        value.error.message,
      )
      break
  }
})

await fetchApiFx({time: 100, ok: true})
// => Call with params {time: 100, ok: true}
//    resolved with value 100 ms

fetchApiFx({time: 100, ok: false})
// => Call with params {time: 100, ok: false}
//    rejected with error 100 ms
```

[Try it](https://share.effector.dev/f90vETOc)

### `pending`

#### Formulae

```ts
$store = effect.pending
```

- [`$store`](Store.md) will update when `done` or `fail` are triggered
- [`$store`](Store.md) contains `true` value until the effect is resolved or rejected

:::caution Important
Do not modify `$store` value! It is [derived store](./Store.md#derived-store) and should be in predictable state.
:::

**Returns**

[_DerivedStore_](./Store.md#derived-store): Store that represents current state of the effect

#### Example

```jsx
import React from 'react'
import {createEffect} from 'effector'
import {useStore} from 'effector-react'

const fetchApiFx = createEffect(
  ms => new Promise(resolve => setTimeout(resolve, ms)),
)

fetchApiFx.pending.watch(console.log)

const Loading = () => {
  const loading = useStore(fetchApiFx.pending)

  return <div>{loading ? 'Loading...' : 'Load complete'}</div>
}

ReactDOM.render(<Loading />, document.getElementById('root'))

fetchApiFx(3000)
```

[Try it](https://share.effector.dev/wDMQKqhl)

It's a shorthand for common use case

```js
import {createEffect, createStore} from 'effector'

const fetchApiFx = createEffect()

//now you can use fetchApiFx.pending instead
const $isLoading = createStore(false)
  .on(fetchApiFx, () => true)
  .on(fetchApiFx.done, () => false)
  .on(fetchApiFx.fail, () => false)
```

### `inFlight`

:::note since
effector 20.11.0
:::

Shows how many effect calls aren't settled yet. Useful for rate limiting.

#### Formulae

```ts
$count = effect.inFlight
```

- [Store](Store.md) `$count` will be `0` if no calls of `effect` in pending state, its default state
- On each call of `effect` state in `$count` store will be increased
- When effect resolves to any state(done or fail) state in `$count` store will be decreased

:::caution Important
Do not modify `$count` value! It is [derived store](./Store.md#derived-store) and should be in predictable state.
:::

**Returns**

[_DerivedStore_](./Store.md#derived-store): Store that represents count of the ran effects

#### Example

```js
import {createEffect} from 'effector'

const fx = createEffect(() => new Promise(rs => setTimeout(rs, 500)))

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

[Try it](https://share.effector.dev/XsM8fZXa)
