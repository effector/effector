---
title: createEffect
description: Method for creating an effect
redirectFrom:
  - /api/effector/createEffect
  - /docs/api/effector/createEffect
---

# createEffect (#create-effect)

```ts
import { createEffect } from "effector";

const effectFx = createEffect();
```

Method for creating [effects](/en/api/effector/Effect). Returns a new [effect](/en/api/effector/Effect).

## How to Create Effects (#how-to-create-effects)

The `createEffect` method supports several ways to create effects:

1. With a handler - this is the simplest way.
2. With configuration.
3. Without a handler, which can be set later using the [`.use(handler)`](/en/api/effector/Effect#use-method) method.

### With Handler (#create-with-handler)

- **Type**

```ts
createEffect<Params, Done, Fail = Error>(
  handler: (params: Params) => Done | Promise<Done>,
): Effect<Params, Done, Fail>
```

- **Example**

```ts
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

### With Configuration (#create-with-config)

The `name` field is used to improve error messages and debugging.

- **Type**

```ts
export function createEffect<Params, Done, Fail = Error>(config: {
  name?: string;
  handler?: (params: Params) => Promise<Done> | Done;
}): Effect<Params, Done, Fail>;
```

- **Example**

```ts
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

### Without Handler (#create-without-handler)

Most commonly used for testing. [More detailed information](/en/api/effector/Effect#use-method).

:::warning{title="use is an anti-pattern"}
Try to avoid using `.use()`, as it's an anti-pattern and degrades type inference.
:::

- **Example**

```ts
import { createEffect } from "effector";

const fetchUserReposFx = createEffect();

fetchUserReposFx.use(async ({ name }) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

await fetchUserReposFx({ name: "zerobias" });
```

## Examples (#examples)

- **Updating state on effect completion**:

```ts
import { createStore, createEffect } from "effector";

interface Repo {
  // ...
}

const $repos = createStore<Repo[]>([]);

const fetchUserReposFx = createEffect(async (name: string) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

$repos.on(fetchUserReposFx.doneData, (_, repos) => repos);

$repos.watch((repos) => {
  console.log(`${repos.length} repos`);
});
// => 0 repos

await fetchUserReposFx("zerobias");
// => 26 repos
```

[Run example](https://share.effector.dev/uAJFC1XM)

- **Watching effect state**:

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
  console.log(result); // resolved value, result
});

fetchUserReposFx.fail.watch(({ params, error }) => {
  console.error(params); // {name: 'zerobias'}
  console.error(error); // rejected value, error
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

[Run example](https://share.effector.dev/LeurvtYA)

## Related API and Articles (#related-api-and-docs-to-create-effect)

- **API**
  - [`Effect API`](/en/api/effector/Effect) - Description of effects, their methods and properties
  - [`sample`](/en/api/effector/sample) - Key operator for building connections between units
  - [`attach`](/en/api/effector/attach) - Creates new effects based on other effects
- **Articles**
  - [Working with effects](/en/essentials/work-with-async)
  - [How to type effects and other units](/en/essentials/typescript)
  - [Guide to testing effects and other units](/en/guides/testing)
