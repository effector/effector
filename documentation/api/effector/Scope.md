---
id: scope
title: Scope
---

`Scope` is a fully isolated instance of application.
The primary purpose of scope includes SSR (but is not limited to). Scope contain independent clone of all the units (including connections between them) and basic methods to access them.
Scope can be created by [fork](./fork.md)

```ts
interface Scope {
  getState<T>(store: Store<T>): T
}
```

## Imperative effects calls with scope

Imperative effects calls are supported in effect handlers but **not** in `watch` functions.

When effect call another effects then it should call only effects, not common async functions and effect calls should have awaited:

**Correct**, effect without inner effects:

```js
const delayFx = app.createEffect(async () => {
  await new Promise(rs => setTimeout(rs, 80))
})
```

**Correct**, effect with inner effects:

```js
const authUserFx = app.createEffect()
const sendMessageFx = app.createEffect()

const sendWithAuthFx = app.createEffect(async () => {
  await authUserFx()
  await delayFx()
  await sendMessageFx()
})
```

**Incorrect**, effect with inner effects:

```js
const sendWithAuthFx = app.createEffect(async () => {
  await authUserFx()
  //WRONG! wrap that in effect
  await new Promise(rs => setTimeout(rs, 80))
  //context lost
  await sendMessageFx()
})
```

So, any effect might either call another effects or perform some async computations but not both.

:::tip
Consider using [attach](./attach.md) instead of imperative call
:::

## Scope methods

### `getState`

Returns store value in given scope

#### Example

Create two instances of application, call events in them and test `$counter` store value in both

```js
import {
  createStore,
  createEvent,
  createDomain,
  forward,
  fork,
  allSettled,
} from 'effector'

const domain = createDomain()
const inc = domain.createEvent()
const dec = domain.createEvent()

const $counter = domain
  .createStore(0)
  .on(inc, value => value + 1)
  .on(dec, value => value - 1)

const scopeA = fork(domain)
const scopeB = fork(domain)

await allSettled(inc, {scope: scopeA})
await allSettled(dec, {scope: scopeB})

console.log($counter.getState()) // => 0
console.log(scopeA.getState($counter)) // => 1
console.log(scopeB.getState($counter)) // => -1
```

[Try it](https://share.effector.dev/0grlV3bA)
