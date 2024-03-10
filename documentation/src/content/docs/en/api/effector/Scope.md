---
title: Scope
redirectFrom:
  - /api/effector/Scope
  - /docs/api/effector/scope
---

```ts
import { type Scope } from "effector";
```

`Scope` is a fully isolated instance of application.
The primary purpose of scope includes SSR (Server-Side Rendering) but is not limited to this use case. A `Scope` contains an independent clone of all units (including connections between them) and basic methods to access them.

A `Scope` can be created using [fork](/en/api/effector/fork).

## Imperative effects calls with scope (#scope-imperativeEffectCalls)

When making imperative effect calls within effect handlers, it is supported but **not** within `watch` functions. For effect handlers that call other effects, ensure to only call effects, not common asynchronous functions. Furthermore, effect calls should be awaited:

**✅ Correct usage for an effect without inner effects:**

```js
const delayFx = createEffect(async () => {
  await new Promise((resolve) => setTimeout(resolve, 80));
});
```

**✅ Correct usage for an effect with inner effects:**

```js
const authUserFx = createEffect();
const sendMessageFx = createEffect();

const sendWithAuthFx = createEffect(async () => {
  await authUserFx();
  await delayFx();
  await sendMessageFx();
});
```

**❌ Incorrect usage for an effect with inner effects:**

```js
const sendWithAuthFx = createEffect(async () => {
  await authUserFx();

  // Incorrect! This should be wrapped in an effect.
  await new Promise((resolve) => setTimeout(resolve, 80));

  // Context is lost here.
  await sendMessageFx();
});
```

For scenarios where an effect might call another effect or perform asynchronous computations, but not both, consider utilizing the [attach](/en/api/effector/attach) method instead for more succinct imperative calls.

# Methods (#methods)

## `.getState($store)` (#methods-getState)

Returns the value of a store in a given `Scope`.

### Formulae (#methods-getState-formulae)

```ts
const scope: Scope;
const $value: Store<T> | StoreWritable<T>;

const value: T = scope.getState($value);
```

### Returns (#methods-getState-returns)

`T` the value of the store

### Examples (#methods-getState-examples)

Create two instances of an application, trigger events in them, and test the `$counter` store value in both instances:

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
