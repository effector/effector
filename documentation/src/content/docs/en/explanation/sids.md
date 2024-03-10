---
title: SIDs
description: Stable IDentifiers
redirectFrom:
  - /en/explanation/sids
  - /explanation/sids
  - /docs/explanation/sids
---

The SID is a Stable IDentifier of an effector unit. It can be used for different purposes, but the main use case is Server Side Rendering.

The SIDs have two important properties:

1. They are **unique** – each SID for each unit should be unique.
2. They are **stable** between different environments – each SID of each unit in some environment (e.g. server code) should be equal to a SID of this unit in any other environment (e.g. client code).

## How to add SIDs (#how-to-add-sids)

The SIDs can be added manually and automatically, but it is important that they are set before any bundling happens — otherwise, there is no way to guarantee stability.

### Manual way (#how-to-add-sids-manual)

```tsx
import { createStore } from "effector";

export const $myStore = createStore(42, { sid: "my-stable-id" });
```

It is important, that all SIDs are also **unique**. If you are using the manual way, you have to guarantee that by yourself.

### Automatic way (#how-to-add-sids-automatic)

For sure, manually creating unique ids is a quite boring job.

Thankfully, there are [`effector/babel-plugin`](/api/effector/babel-plugin) and [`@effector/swc-plugin`](https://github.com/effector/swc-plugin), which will provide SIDs automatically.

Because code-transpilation tools are working at the file level and are run before bundling happens – it is possible to make SIDs **stable** for every environment.

:::tip
It is preferable to use [`effector/babel-plugin`](/api/effector/babel-plugin) or [`@effector/swc-plugin`](https://github.com/effector/swc-plugin) instead of adding SIDs manually.
:::

## Why do we need Stable Identifiers (#why-do-we-need-sids)

Because of **multi-store** architecture, Effector code in the applications is written in **atomic** and **distributed** way and there is no single central "root store" or "controller", which needs to be notified about all stores/reducers/etc, created anywhere in the app.

And since there is no central "root store" – no additional setup (like Reducer Manager, etc) is required to support micro-frontends and code-splitting, everything works out of the box.

**Code example**

Notice, that there is no central point at all – any event of any "feature" can be triggered from anywhere and the rest of them will react accordingly.

```tsx
// src/features/first-name/model.ts
import { createStore, createEvent } from "effector";

export const firstNameChanged = createEvent<string>();
export const $firstName = createStore("");

$firstName.on(firstNameChanged, (_, firstName) => firstName);

// src/features/last-name/model.ts
import { createStore, createEvent } from "effector";

export const lastNameChanged = createEvent<string>();
export const $lastName = createStore("");

$lastName.on(lastNameChanged, (_, lastName) => lastName);

// src/features/form/model.ts
import { createEvent, sample, combine } from "effector";

import { $firstName, firstNameChanged } from "@/features/first-name";
import { $lastName, lastNameChanged } from "@/features/last-name";

export const formValuesFilled = createEvent<{ firstName: string; lastName: string }>();

export const $fullName = combine($firstName, $lastName, (first, last) => `${first} ${last}`);

sample({
  clock: formValuesFilled,
  fn: (values) => values.firstName,
  target: firstNameChanged,
});

sample({
  clock: formValuesFilled,
  fn: (values) => values.lastName,
  target: lastNameChanged,
});
```

If this application was a SPA or any other kind of client-only app — this would be the end of the article.

### Serialization boundary (#serialization-boundary)

But in the case of Server Side Rendering, there is always a **serialization boundary** — a point, where all state is stringified, added to a server response, and sent to a client browser.

#### Problem (#serialization-boundary-problem)

And at this point we **still need to collect the states of all stores of the app** somehow!

Also, after the client browser has received a page — we need to "hydrate" everything back: unpack these values at the client and add this "server-calculated" state to client-side instances of all stores.

#### Solution (#serialization-boundary-solution)

This is a hard problem and to solve this, `effector` needs a way to connect the "server-calculated" state of some store with its client-side instance.

While **it could be** done by introducing a "root store" or something like that, which would manage store instances and their state for us, it would also bring to us all the downsides of this approach, e.g. much more complicated code-splitting – so this is still undesirable.

This is where SIDs will help us a lot.
Because SID is, by definition, the same for the same store in any environment, `effector` can simply rely on it to handle state serializing and hydration.

#### Example (#serialization-boundary-example)

This is a generic server-side rendering handler. The `renderHtmlToString` function is an implementation detail, which will depend on the framework you use.

```tsx
// src/server/handler.ts
import { fork, allSettled, serialize } from "effector";

import { formValuesFilled } from "@/features/form";

async function handleServerRequest(req) {
  const scope = fork(); // creates isolated container for application state

  // calculates the state of the app in this scope
  await allSettled(formValuesFilled, {
    scope,
    params: {
      firstName: "John",
      lastName: "Doe",
    },
  });

  // extract scope values to simple js object of `{[storeSid]: storeState}`
  const values = serialize(scope);

  const serializedState = JSON.stringify(values);

  return renderHtmlToString({
    scripts: [
      `
        <script>
            self._SERVER_STATE_ = ${serializedState}
        </script>
      `,
    ],
  });
}
```

Notice, that there are no direct imports of any stores of the application here.
The state is collected automatically and its serialized version already has all the information, which will be needed for hydration.

When the generated response arrives in a client browser, the server state must be hydrated to the client stores.
Thanks to SIDs, state hydration also works automatically:

```tsx
// src/client/index.ts
import { Provider } from "effector-react";

const serverState = window._SERVER_STATE_;

const clientScope = fork({
  values: serverState, // simply assign server state to scope
});

clientScope.getState($lastName); // "Doe"

hydrateApp(
  <Provider value={clientScope}>
    <App />
  </Provider>,
);
```

At this point, the state of all stores in the `clientScope` is the same, as it was at the server and there was **zero** manual work to do it.

## Unique SIDs (#unique-sids)

The stability of SIDs is ensured by the fact, that they are added to the code before any bundling has happened.

But since both `babel` and `swc` plugins are able "to see" contents of one file at each moment, there is a case, where SIDs will be stable, but **might not be unique**

To understand why, we need to dive a bit deeper into plugin internals.

Both `effector` plugins use the same approach to code transformation. Basically, they do two things:

1. Add `sid`-s and any other meta-information to raw Effector's factories calls, like `createStore` or `createEvent`.
2. Wrap any custom factories with `withFactory` helper that allows you to make `sid`-s of inner units unique as well.

### Built-in unit factories (#built-in-factories)

Let's take a look at the first case. For the following source code:

```ts
const $name = createStore(null);
```

The plugin will apply these transformations:

```ts
const $name = createStore(null, { sid: "j3l44" });
```

:::tip
Plugins create `sid`-s as a hash of the location in the source code of a unit. It allows making `sid`-s unique and stable.
:::

### Custom factories (#custom-factories)

The second case is about custom factories. These are usually created to abstract away some common pattern.

Examples of custom factories:

- `createQuery`, `createMutation` from [`farfetched`](https://farfetched.pages.dev/)
- `debounce`, `throttle`, etc from [`patronum`](https://patronum.effector.dev/)
- Any custom factory in your code, e.g. factory of a [feature-flag entity](https://farfetched.pages.dev/recipes/feature_flags.html)

For this explanation, we will create a very simple factory:

```ts
// src/shared/lib/create-name/index.ts
export function createName() {
  const updateName = createEvent();
  const $name = createStore(null);

  $name.on(updateName, (_, nextName) => nextName);

  return { $name };
}

// src/feature/persons/model.ts
import { createName } from "@/shared/lib/create-name";

const personOne = createName();
const personTwo = createName();
```

First, the plugin will add `sid` to the inner stores of the factory

```ts
// src/shared/lib/create-name/index.ts
export function createName() {
  const updateName = createEvent();
  const $name = createStore(null, { sid: "ffds2" });

  $name.on(updateName, (_, nextName) => nextName);

  return { $name };
}

// src/feature/persons/model.ts
import { createName } from "@/shared/lib/create-name";

const personOne = createName();
const personTwo = createName();
```

But it's not enough, because we can create two instances of `createName` and internal stores of both of these instances will have the same SIDs!
These SIDs will be stable, but not unique.

To fix it we need to inform the plugin about our custom factory:

```json
// .babelrc
{
  "plugins": [
    [
      "effector/babel-plugin",
      {
        "factories": ["@/shared/lib/create-name"]
      }
    ]
  ]
}
```

Since the plugin "sees" only one file at a time, we need to provide it with the actual import path used in the module.

:::tip
If relative import paths are used in the module, then the full path from the project root must be added to the `factories` list, so the plugin could resolve it.

If absolute or aliased (like in the example) paths are used, then specifically this aliased path must be added to the `factories` list.

Most of the popular ecosystem projects are already included in plugin's default settings.
:::

Now the plugin knows about our factory and it will wrap `createName` with the internal `withFactory` helper:

```ts
// src/shared/lib/create-name/index.ts
export function createName() {
  const updateName = createEvent();
  const $name = createStore(null, { sid: "ffds2" });

  $name.on(updateName, (_, nextName) => nextName);

  return { $name };
}

// src/feature/persons/model.ts
import { withFactory } from "effector";
import { createName } from "@/shared/lib/create-name";

const personOne = withFactory({
  sid: "gre24f",
  fn: () => createName(),
});
const personTwo = withFactory({
  sid: "lpefgd",
  fn: () => createName(),
});
```

Thanks to that `sid`-s of inner units of a factory are also unique, and we can safely serialize and deserialize them.

```ts
personOne.$name.sid; // gre24f|ffds2
personTwo.$name.sid; // lpefgd|ffds2
```
