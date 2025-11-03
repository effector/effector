---
title: Scope API
description: Scope API methods and peculiarities
redirectFrom:
  - /api/effector/Scope
  - /docs/api/effector/scope
---

# Scope API (#scope)

```ts
import { type Scope, fork } from "effector";

const scope = fork();
```

`Scope` is a fully isolated instance of application.
The primary purpose of scope includes SSR (Server-Side Rendering) but is not limited to this use case. A `Scope` contains an independent clone of all units (including connections between them) and basic methods to access them.

:::tip{title="scope matters"}
If you want to get deeper about scopes then check out great article about [isolated scopes](/en/advanced/work-with-scope).<br/>
We also have few related guides:

- [How to fix lost scope](/en/guides/scope-loss)
- [Using scopes with SSR](/en/guides/server-side-rendering)
- [Writing test for units](/en/guides/testing)

:::

## Scope peculiarities (#scope-peculiarities)

1. [There are a few rules that must be followed to work successfully with scope](/en/advanced/work-with-scope#scope-rules).
2. [Your scope can be lost to avoid this use `scopeBind`](/en/guides/scope-loss).

## Scope methods (#methods)

### `.getState($store)` (#methods-getState)

Returns the value of a store in a given scope:

- **Formula**

```ts
const scope: Scope;
const $value: Store<T> | StoreWritable<T>;

const value: T = scope.getState($value);
```

- **Type**

```ts
scope.getState<T>(store: Store<T>): T;
```

- **Returns**

The value of the store.

- **Examples**

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

[Try it](https://share.effector.dev/0grlV3bA).

## Related API and Articles (#related-api-and-docs-to-create-effect)

- **API**
  - [`scopeBind`](/en/api/effector/scopeBind) – Method for binding a unit to a scope
  - [`fork`](/en/api/effector/fork) – Operator for creating a scope
  - [`allSettled`](/en/api/effector/allSettled) – Method for running a unit in a given scope and waiting for the entire chain of effects to complete
  - [`serialize`](/en/api/effector/serialize) – Method for obtaining serialized store values
  - [`hydrate`](/en/api/effector/hydrate) – Method for hydrating serialized data
- **Articles**
  - [How to lose scope and fix it](/en/guides/scope-loss)
  - [Using scopes with SSR](/en/guides/server-side-rendering)
  - [How to test units](/en/guides/testing)
