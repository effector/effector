---
title: SIDs
description: Stable IDentifiers
redirectFrom:
  - /en/explanation/sids
  - /explanation/sids
  - /docs/explanation/sids
---

The SID is a Stable IDentifier of effector unit. It can be used for different purposes, but the main use-case is a Server Side Rendering.

The SIDs have two important properties:

1. They are **unique** - each sid for each unit should be unique
2. They are **stable** between different environments - each sid of each unit in some environment (e.g. server code) should be equal to a sid of this unit in any other environment (e.g. client code)

## How to add SIDs {#how-to-add-sids}

The SIDs can be added both manually and automatically, but it is important, that SIDs are set before any bundling happened - otherwise there is no way to guarantee stability.

### Manual way {#how-to-add-sids-manual}

```tsx
import { createStore } from "effector";

export const $myStore = createStore(42, { sid: "my-stable-id" });
```

It is important, that all sids are also **unique**. If you are usign the manual way, you have to guarantee that yourself.

### Automatic way {#how-to-add-sids-automatic}

For sure, manually creating unique ids is a quite boring job.

Thankfully, there are [`effector/babel-plugin`](/api/effector/babel-plugin) and [`@effector/swc-plugin`](https://github.com/effector/swc-plugin), which will provide SIDs automatically.

Because code-transpilation tools are working at the file-level and are run before bundling happens - it is possible to make SIDs **stable** for every environment.

:::tip
It is preferable to use [`effector/babel-plugin`](/api/effector/babel-plugin) or [`@effector/swc-plugin`](https://github.com/effector/swc-plugin) instead of adding sids manually.
:::

## Why do we need Stable Identifiers {#why-do-we-need-sids}

Because of **multi-store** architecture, Effector code in the applications is written in **atomic** and **distributed** way and there is no single central "root store" or "controller", which needs to be notified about all stores/reducers/etc, created anywhere in the app.

And since there is no central "root store" - no additional setup (like Reducer Manager, etc) is required to support micro-frontends and code-splitting, everything works out of the box.

**Code example**

Notice, that there is no central point at all - any event of any "feature" can be triggered from anywhere and the rest of them will react accordingly.

```tsx
// src/features/first-name/model.ts
import { createStore, createEvent } from "effector";

export const firstNameChanged = createEvent();
export const $firstName = createStore("").on(firstNameChanged, (_, x) => x);

// src/features/last-name/model.ts
import { createStore, createEvent } from "effector";

export const lastNameChanged = createEvent();
export const $lastName = createStore("").on(lastNameChanged, (_, x) => x);

// src/features/form/model.ts
import { createEvent, sample, combine } from "effector";

import { fistNameModel } from "#src/features/first-name";
import { lastNameModel } from "#src/features/last-name";

export const formValuesFilled = createEvent();
export const $fullName = combine(
  firstNameModel.$firstName,
  lastNameModel.$lastName,
  (first, last) => `${first} ${last}`,
);

sample({
  clock: formValuesFilled,
  fn: (values) => values.firstName,
  target: firstNameModel.firstNameChanged,
});

sample({
  clock: formValuesFilled,
  fn: (values) => values.lastName,
  target: lastNameModel.lastNameChanged,
});
```

If this application was a SPA or any other kind of client-only app - this would be the end of the article.

### Serialization boundary {#serialization-boundary}

But in case of Server Side Rendering there is always a **serialization boundary** - a point, where all state is stringified, added to a server response and sent to a client browser.

#### Problem {#serialization-boundary-problem}

And at this point we **still need to collect states of all stores of the app** somehow!

Also, after client browser have received a page - we need to "hydrate" everything back: unpack these values at the client and add this "server-calucalted" state to a client-side instances of all stores.

#### Solution {#serialization-boundary-solution}

This is a hard problem and to solve this, `effector` needs a way to connect "server-calculated" state of some store with its client-side instance.

While **it could be** done by introducing "root store" or something like that, which would manage store instances and their state for us, it would also bring to us all the downsides of this approach, e.g. much more complicated code-splitting - so this is still undesirable.

This where SIDs will help us a lot.
Because SID is, by definition, the same for the same store in any environment, `effector` can simply rely on it to handle state serializing and hydration.

#### Example {#serialization-boundary-example}

This is a generic server side rendering handler. The `renderHtmlToString` function is an implementation detail, which will depend on the framework you use.

```tsx
// src/server/handler.ts
import { fork, allSettled, serialize } from "effector";

import { formModel } from "#src/features/form";

async function handleServerRequest(req) {
  const scope = fork(); // creates isolated container for application state

  // calculates the state of the app in this scope
  await allSettled(formModel.formValuesFilled, {
    scope,
    params: {
      firstName: "John",
      lastName: "Doe",
    },
  });

  // extract scope values to simple js object of `{ [storeSid]: storeState }`
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

Notice, that there is no direct imports of any stores of the application here.
State is collected automatically and its serialized version already has all the information, which will be needed for hydration.

When generated response arrives to a client browser, server state must be hydrated to the client stores.
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

At this point, state of all stores in the `clientScope` is the same, as it was at the server and there was **zero** manual work to do it.

## Unique SIDs {#unique-sids}

Stability of SIDs is ensured by the fact, that they are added to the code before any bundling has happened.

But since both `babel` and `swc` plugins are able "to see" contents of one file at each moment, there is a case, where SIDs will be stable, but **might not be unique**

To understand why, we need to dive a bit deeper into plugins internals.

Both `effector` plugins use the same approach to code transformation. Basically they do two things:

1. Add `sid`-s and any other meta-information to raw Effector's factories calls, like `createStore` or `createEvent`
2. Wrap any custom factories with `withFactory` helper that allow to make `sid`-s of inner units unique as well

### Built-in unit factories {#built-in-factories}

Let's take a look at the first case. For the following source code:

```ts
const $name = createStore(null);
```

Plugin will apply these transformations:

```ts
const $name = createStore(null, { sid: "j3l44" });
```

:::tip
Plugins create `sid`-s as a hash of the unit location in the source code. It allows making `sid`-s unique and stable.
:::

### Custom factories {#custom-factories}

The second case is about custom factories. These are usually created to abstract away some common pattern.

Examples of custom factories:

- `createQuery`, `createMutation` from [`farfetched`](https://farfetched.pages.dev/)
- `debounce`, `throttle`, etc from [`patronum`](https://patronum.effector.dev/)
- Any custom factory in your code, e.g. factory of a [feature-flag entity](https://farfetched.pages.dev/recipes/feature_flags.html)

For this explanation we will create a very simple factory:

```ts
// src/shared/lib/create-name/index.ts
export function createName() {
  const updateName = createEvent();
  const $name = createStore(null);

  $name.on(updateName, (_, nextName) => nextName);

  return { $name };
}

// src/feature/persons/model.ts
import { createName } from "#src/shared/lib/create-name";

const personOne = createName();
const personTwo = createName();
```

First, plugin will add `sid` to inner stors of the factory

```ts
// src/shared/lib/create-name/index.ts
export function createName() {
  const updateName = createEvent();
  const $name = createStore(null, { sid: "ffds2" });

  $name.on(updateName, (_, nextName) => nextName);

  return { $name };
}

// src/feature/persons/model.ts
import { createName } from "#src/shared/lib/create-name";

const personOne = createName();
const personTwo = createName();
```

But it's not enough, because we can create two instances of `createName` and internal stores of both of these instances will have the same SIDs!
These sids will be stable, but not unique.

To fix it we need to inform the plugin about our custom factory:

```json
// .babelrc
{
  "plugins": [
    [
      "effector/babel-plugin",
      {
        "factories": ["#src/shared/lib/create-name"]
      }
    ]
  ]
}
```

Since plugin "sees" only one file at the time, we need to provide it with actual import path used in the module.

:::tip
If relative import paths are used in the module, then full path from the project root must be added to the `factories` list, so plugin could resolve it.

If absoulte or aliased (like in the example) paths are used, then specifically this aliased path must be added to the `factories` list.

Most of the popular ecosystem projects are already included into plugins default settings.
:::

Now plugin knows about our factory and it will wrap `createName` with internal `withFactory` helper:

```ts
// src/shared/lib/create-name/index.ts
export function createName() {
  const updateName = createEvent();
  const $name = createStore(null, { sid: "ffds2" });

  $name.on(updateName, (_, nextName) => nextName);

  return { $name };
}

// src/feature/persons/model.ts
import { createName } from "#src/shared/lib/create-name";

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
