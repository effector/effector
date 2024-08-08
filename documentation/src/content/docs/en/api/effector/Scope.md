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

## Loss of `scope` (#scope-loss)

**What are the risks of calling effects after asynchronous functions?** The state in which the application enters after such a call is called "loss of scope." This means that after completing the call of a regular asynchronous function, all subsequent actions will fall into the global mode (this is what works with a direct call to `$store.getState()`), meaning all data updates will **not** enter the scope in which the work was conducted. As a result, an inconsistent state will be sent to the client.

Imperative calls of effects are safe in this regard because effector remembers the scope in which the imperative call of the effect began and restores it after the call, allowing for another call in sequence.

You can call methods like `Promise.all([fx1(), fx2()])` and others from the standard JavaScript API because in these cases, the calls to effects still happen synchronously, and the scope is safely preserved.

All rules discussed for effects also apply to imperative calls of events.

**How to circumvent this limitation?** There are situations where calls outside the scope cannot be avoided; typical examples are `setInterval` and `history.listen`. To safely pass an effect (or event) to these functions, you can use the method [scopeBind](/en/api/effector/scopeBind). It creates a function bound to the scope in which the method was called, allowing it to be safely called later.

```js
const sendWithAuthFx = createEffect(async () => {
  // Now this function can be called safely
  // without adhering to the scope loss rules
  const sendMessage = scopeBind(sendMessageFx);

  await authUserFx();

  // There is no context inside setInterval, but our function is bound
  return setInterval(sendMessage, 500);
});
```

:::note
Remember to clear setInterval after finishing work with the scope to avoid memory leaks. You can clear setInterval with a separate effect by first returning its id from the first effect and storing it in a separate store.
:::

**Is there any way to circumvent the loss of scope? Is this an issue specific to effector?** This is a general principle of working with asynchrony in JavaScript. All technologies that face the need to maintain the context in which calls occur handle this difficulty in one way or another. The most prominent example is [zone.js](https://github.com/angular/angular/tree/main/packages/zone.js), which wraps all asynchronous global functions like `setTimeout` or `Promise.resolve` to maintain the context. Other solutions to this problem include using generators or `ctx.schedule(() => asyncCall())`.

**Will there be a universal solution to the context loss problem?** Yes. A new proposal in the language called [async context](https://github.com/tc39/proposal-async-context) aims to solve this problem once and for all. It will allow asynchronous logic to be run once, retrieving data from the context in all related calls, regardless of how they occur. Once the proposal is incorporated into the language and gains broad support, effector will definitely switch to this solution, and the rules for calling effects will become a thing of the past.

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
