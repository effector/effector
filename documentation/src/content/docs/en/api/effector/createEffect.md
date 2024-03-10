---
title: createEffect
description: Method for creating an effect
redirectFrom:
  - /api/effector/createEffect
  - /docs/api/effector/createEffect
---

```ts
import { createEffect, type Effect } from "effector";
```

Method for creating an [effect](/en/api/effector/Effect).

# Methods (#methods)

## `createEffect(handler)` (#methods-createEffect-handler)

Creates an effect with the given handler.

### Formulae (#methods-createEffect-handler-formulae)

```typescript
createEffect(handler?): Effect<Params, Done, Fail>
```

### Arguments (#methods-createEffect-handler-arguments)

1. `handler` (_Function_): Function to handle effect calls, can also be set using [`.use(handler)`](/en/api/effector/Effect#methods-use-handler).

### Returns (#methods-createEffect-handler-returns)

[_Effect_](/en/api/effector/Effect): A new effect.

:::tip{title="Reminder"}
You must provide a handler either in [`createEffect`](/en/api/effector/createEffect) or in [`.use`](/en/api/effector/Effect#methods-use-handler) method later; otherwise, the effect will throw with the `no handler used in _%effect name%_` error.
:::

:::info{title="since"}
[effector 21.3.0](https://changelog.effector.dev/#effector-21-3-0)
:::

### Examples (#methods-createEffect-handler-examples)

#### Create effect with handler (#methods-createEffect-handler-examples-create-effect-with-handler)

```js
import { createEffect } from "effector";

const fetchUserReposFx = createEffect(async ({ name }) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

fetchUserReposFx.done.watch(({ params, result }) => {
  console.log(result);
});

await fetchUserReposFx({ name: "zerobias" });
```

[Try it](https://share.effector.dev/7K23rdej)

#### Change state on effect completion (#methods-createEffect-handler-examples-change-state-on-effect-completion)

```js
import { createStore, createEffect } from "effector";

const fetchUserReposFx = createEffect(async ({ name }) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

const $repos = createStore([]).on(fetchUserReposFx.doneData, (_, repos) => repos);

$repos.watch((repos) => {
  console.log(`${repos.length} repos`);
});
// => 0 repos

await fetchUserReposFx({ name: "zerobias" });
// => 26 repos
```

[Try it](https://share.effector.dev/uAJFC1XM)

#### Set handler to effect after creating (#methods-createEffect-handler-examples-set-handler-to-effect-after-creating)

```js
import { createEffect } from "effector";

const fetchUserReposFx = createEffect();

fetchUserReposFx.use(async ({ name }) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

await fetchUserReposFx({ name: "zerobias" });
```

[Try it](https://share.effector.dev/e1QPH9Uq)

#### Watch effect status (#methods-createEffect-handler-examples-watch-effect-status)

```js
import { createEffect } from "effector";

const fetchUserReposFx = createEffect(async ({ name }) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

fetchUserReposFx.pending.watch((pending) => {
  console.log(`effect is pending?: ${pending ? "yes" : "no"}`);
});

fetchUserReposFx.done.watch(({ params, result }) => {
  console.log(params); // {name: 'zerobias'}
  console.log(result); // resolved value
});

fetchUserReposFx.fail.watch(({ params, error }) => {
  console.error(params); // {name: 'zerobias'}
  console.error(error); // rejected value
});

fetchUserReposFx.finally.watch(({ params, status, result, error }) => {
  console.log(params); // {name: 'zerobias'}
  console.log(`handler status: ${status}`);

  if (error) {
    console.error("handler rejected", error);
  } else {
    console.log("handler resolved", result);
  }
});

await fetchUserReposFx({ name: "zerobias" });
```

[Try it](https://share.effector.dev/LeurvtYA)

## `createEffect(config)` (#methods-createEffect-config)

Creates an effect with handler and name from a given config object.

### Formulae (#methods-createEffect-config-formulae)

```typescript
createEffect({ handler, name }): Effect<Params, Done, Fail>
```

### Arguments (#methods-createEffect-config-arguments)

1. `config?: {}` (_Object_): Effect configuration.
   - `handler` (_Function_): Function to handle effect calls, can also be set using [`.use(handler)`](#use).
   - `name?` (_string_): Optional effect name.

### Returns (#methods-createEffect-config-returns)

[_Effect_](/en/api/effector/Effect): A new effect.

### Examples (#methods-createEffect-config-examples)

#### Create named effect (#methods-createEffect-config-examples-create-named-effect)

```js
import { createEffect } from "effector";

const fetchUserReposFx = createEffect({
  name: "fetch user repositories",
  async handler({ name }) {
    const url = `https://api.github.com/users/${name}/repos`;
    const req = await fetch(url);
    return req.json();
  },
});

await fetchUserReposFx({ name: "zerobias" });
```

[Try it](https://share.effector.dev/GynSzKee)
