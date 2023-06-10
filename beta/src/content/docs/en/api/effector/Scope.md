---
title: Scope
redirectFrom:
  - /api/effector/Scope
  - /docs/api/effector/scope
---

`Scope` is a fully isolated instance of application.
The primary purpose of scope includes SSR (but is not limited to). Scope contains independent clone of all the units (including connections between them) and basic methods to access them.

Scope can be created by [fork](/en/api/effector/fork).

```ts
interface Scope {
  getState<T>(store: Store<T>): T;
}
```

## Imperative effects calls with scope

Imperative effects calls are supported in effect handlers but **not** in `watch` functions.

When effect calls other effects, then it should call only effects, not common async functions and effect calls should have awaited:

**Correct**, effect without inner effects:

```js
const delayFx = createEffect(async () => {
  await new Promise((rs) => setTimeout(rs, 80));
});
```

**Correct**, effect with inner effects:

```js
const authUserFx = createEffect();
const sendMessageFx = createEffect();

const sendWithAuthFx = createEffect(async () => {
  await authUserFx();
  await delayFx();
  await sendMessageFx();
});
```

**Incorrect**, effect with inner effects:

```js
const sendWithAuthFx = createEffect(async () => {
  await authUserFx();

  // WRONG! wrap that in effect
  await new Promise((rs) => setTimeout(rs, 80));

  // context lost
  await sendMessageFx();
});
```

So, any effect might either call another effect or perform some async computations but not both.

:::tip
Consider using [attach](/en/api/effector/attach) instead of imperative call.
:::

<br/><br/>

# Scope methods

## `getState`

Returns store value in given scope

### Example

Create two instances of application, call events in them and test `$counter` store value in both

```js
import { createStore, createEvent, fork, allSettled } from "effector";

const inc = createEvent();
const dec = createEvent();
const $counter = createStore(0);

$counter.on(inc, (value) => value + 1);
$counter.on(dec, (value) => value - 1);

const scopeA = fork();
const scopeB = fork();

await allSettled(inc, { scope: scopeA });
await allSettled(dec, { scope: scopeB });

console.log($counter.getState()); // => 0
console.log(scopeA.getState($counter)); // => 1
console.log(scopeB.getState($counter)); // => -1
```

[Try it](https://share.effector.dev/0grlV3bA)
