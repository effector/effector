---
title: fork
redirectFrom:
  - /api/effector/fork
  - /docs/api/effector/fork
---

:::info{title="since"}

- `fork()` introduced in [effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0)
- `fork(domain)` introduced in [effector 21.0.0](https://changelog.effector.dev/#effector-21-0-0)
- support for array of tuples in `values` and `handlers` introduced in [effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0)

:::

Creates an isolated instance of application.
Primary purposes of this method are SSR and testing.

## Formulae {#fork-formulae}

```ts
fork(): Scope
fork(options: { values?, handlers? }): Scope
fork(domain: Domain, options?: { values?, handlers? }): Scope
```

### Arguments {#fork-args}

1. `domain` ([_Domain_](/en/api/effector/Domain)): Optional domain to fork
2. `values`: Option to provide initial states for stores

   Can be used in three ways:

   1. Array of tuples with stores and values:

      ```ts
      fork({
        values: [
          [$user, "alice"],
          [$age, 21],
        ],
      });
      ```

   2. Map with stores and values:

      ```ts
      fork({
        values: new Map().set($user, "alice").set($age, 21),
      });
      ```

   3. Plain object: `{[sid: string]: value}`

      ```ts
      fork({
        values: {
          [$user.sid]: "alice",
          [$age.sid]: 21,
        },
      });
      ```

      :::info{title="Explanation"}
      Such objects are created by [serialize](/en/api/effector/serialize), in application code **array of tuples is preferred**
      :::

3. `handlers`: Option to provide handlers for effects

   Can be used in different ways:

   1. Array of tuples with effects and handlers:

      ```ts
      fork({
        handlers: [
          [getMessageFx, (params) => ({ id: 0, text: "message" })],
          [getUserFx, async (params) => ({ name: "alice", age: 21 })],
        ],
      });
      ```

   2. Map with effects and handlers:

      ```ts
      fork({
        handlers: new Map()
          .set(getMessageFx, (params) => ({ id: 0, text: "message" }))
          .set(getUserFx, async (params) => ({ name: "alice", age: 21 })),
      });
      ```

4. Plain object: `{[sid: string]: handler}`
      ```ts
      fork({
        handlers: {
          [getMessageFx.sid]: (params) => ({ id: 0, text: "message" }),
          [getUserFx.sid]: async (params) => ({ name: "alice", age: 21 }),
        }
      });
      ```
      :::warning{title="deprecation"}
      Such objects are deprecated since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) and will be removed in future versions. Array of tuples is preferred.
      :::

### Returns {#fork-return}

[_Scope_](/en/api/effector/Scope)

## Examples {#fork-examples}

### Create two instances with independent counter state

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

### Set initial state for store and change handler for effect

This is an example of test, which ensures that after a request to the server, the value of `$friends` is filled

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
