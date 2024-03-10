---
title: fork
redirectFrom:
  - /api/effector/fork
  - /docs/api/effector/fork
---

```ts
import { fork, type Scope } from "effector";
```

# Methods (#methods)

## `fork()` (#methods-fork)

:::info{title="since"}

introduced in [effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0)

:::

Creates an isolated instance of application.
Primary purposes of this method are SSR and testing.

### Formulae (#methods-fork-formulae)

```ts
fork(): Scope
```

### Returns (#methods-fork-returns)

[_Scope_](/en/api/effector/Scope): New fresh scope

### Examples (#methods-fork-examples)

#### Create two instances with independent counter state (#methods-fork-examples-create-two-instances)

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

[Try it](https://share.effector.dev/dBSC59h8)

## `fork(options)` (#methods-fork-options)

Allows to set values for stores in scope and replace handlers for effects.

:::info{title="since"}

support for array of tuples in `values` and `handlers` introduced in [effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0)

:::

### Formulae (#methods-fork-options-formulae)

```ts
fork(options: { values?, handlers? }): Scope
```

### Arguments (#methods-fork-options-arguments)

1. `options: { values?, handlers? }` — Object with optional values and handlers

#### `values` (#methods-fork-options-arguments-values)

Option to provide initial states for stores.

Can be used in three ways:

1.  Array of tuples with stores and values:

```ts
fork({
  values: [
    [$user, "alice"],
    [$age, 21],
  ],
});
```

2.  Map with stores and values:

```ts
fork({
  values: new Map().set($user, "alice").set($age, 21),
});
```

3.  Plain object: `{[sid: string]: value}`

```ts
fork({
  values: {
    [$user.sid]: "alice",
    [$age.sid]: 21,
  },
});
```

<br />

:::info{title="Explanation"}
Such objects are created by [serialize](/en/api/effector/serialize), in application code **array of tuples is preferred**
:::

#### `handlers` (#methods-fork-options-arguments-handlers)

Option to provide handlers for effects.

Can be used in different ways:

1.  Array of tuples with effects and handlers:

```ts
fork({
  handlers: [
    [getMessageFx, (params) => ({ id: 0, text: "message" })],
    [getUserFx, async (params) => ({ name: "alice", age: 21 })],
  ],
});
```

2.  Map with effects and handlers:

```ts
fork({
  handlers: new Map()
    .set(getMessageFx, (params) => ({ id: 0, text: "message" }))
    .set(getUserFx, async (params) => ({ name: "alice", age: 21 })),
});
```

3.  Plain object: `{[sid: string]: handler}`

```ts
fork({
  handlers: {
    [getMessageFx.sid]: (params) => ({ id: 0, text: "message" }),
    [getUserFx.sid]: async (params) => ({ name: "alice", age: 21 }),
  },
});
```

<br />

:::warning{title="deprecation"}
Such objects are deprecated since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) and will be removed in future versions. Array of tuples is preferred.
:::

### Returns (#methods-fork-options-returns)

[_Scope_](/en/api/effector/Scope): New fresh scope

### Examples (#methods-fork-options-examples)

#### Set initial state for store and change handler for effect (#methods-fork-examples-set-initial-state-and-change-handler)

This is an example of test, which ensures that after a request to the server, the value of `$friends` is filled.

```ts
import { createEffect, createStore, fork, allSettled } from "effector";

const fetchFriendsFx = createEffect<{ limit: number }, string[]>(async ({ limit }) => {
  /* some client-side data fetching */
  return [];
});
const $user = createStore("guest");
const $friends = createStore([]);

$friends.on(fetchFriendsFx.doneData, (_, result) => result);

const testScope = fork({
  values: [[$user, "alice"]],
  handlers: [[fetchFriendsFx, () => ["bob", "carol"]]],
});

/* trigger computations in scope and await all called effects */
await allSettled(fetchFriendsFx, {
  scope: testScope,
  params: { limit: 10 },
});

/* check value of store in scope */
console.log(testScope.getState($friends));
// => ['bob', 'carol']
```

[Try it](https://share.effector.dev/gnNbGZuu)

## `fork(domain, options?)` (#methods-fork-domain)

:::info{title="since"}

introduced in [effector 21.0.0](https://changelog.effector.dev/#effector-21-0-0)

:::

### Formulae (#methods-fork-domain-formulae)

```ts
fork(domain: Domain, options?: { values?, handlers? }): Scope
```

### Arguments (#methods-fork-domain-arguments)

1. `domain` ([_Domain_](/en/api/effector/Domain)): Optional domain to fork.
2. `options: { values?, handlers? }` — Object with optional [values](#methods-fork-options-arguments-values) and [handlers](#methods-fork-options-arguments-handlers)

### Returns (#methods-fork-domain-returns)

[_Scope_](/en/api/effector/Scope): New fresh scope

### Examples (#methods-fork-domain-examples)

TBD
