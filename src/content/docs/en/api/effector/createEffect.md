---
title: createEffect
description: Method for creating an effect
---

Method for creating an [effect](/en/api/effector/Effect)

## createEffect with handler {#createEffect-handler}

Creates an effect with given handler

```typescript
createEffect(handler?)
```

### Arguments {#createEffect-handler-arguments}

1. `handler` (_Function_): function to handle effect calls, also can be set with [`use(handler)`](/en/api/effector/Effect#use)

### Returns {#createEffect-handler-returns}

[_Effect_](/en/api/effector/Effect): New effect

:::tip{title="Reminder"}
You must provide a handler either in [createEffect](/en/api/effector/createEffect) or in [`.use`](/en/api/effector/Effect#use) method later, otherwise effect will throw with `no handler used in _%effect name%_` error.
:::

:::info{title="since"}
[effector 21.3.0](https://changelog.effector.dev/#effector-21-3-0)
:::

### Examples {#createEffect-handler-examples}

#### Create effect with handler

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

#### Change state on effect completion

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

#### Set handler to effect after creating

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

#### Watch effect status

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
    console.log("handler rejected", error);
  } else {
    console.log("handler resolved", result);
  }
});

await fetchUserReposFx({ name: "zerobias" });
```

[Try it](https://share.effector.dev/LeurvtYA)

## createEffect with config {#createEffect-config}

Creates an effect with handler and name from given config object

```typescript
createEffect({ handler, name });
```

### Arguments {#createEffect-config-arguments}

1. `config`? (_Params_): effect
   - `handler` (_Function_): function to handle effect calls, also can be set with [`use(handler)`](#use)
   - `name`? (_string_): Optional effect name

### Returns {#createEffect-config-returns}

[_Effect_](/en/api/effector/Effect): New effect

### Examples {#createEffect-config-examples}

#### Create named effect

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
