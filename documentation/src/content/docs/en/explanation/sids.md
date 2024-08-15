---
title: SIDs
description: Stable IDentifiers
redirectFrom:
  - /en/explanation/sids
  - /explanation/sids
  - /docs/explanation/sids
---

Effector is based on idea of atomic store. It means that any application does not have some centralized state controller or other entry point to collect all states in one place.

So, there is the question — how to distinguish units between different environments? For example, if we ran an application on the server and serialize its state to JSON, how do we know which part of the JSON should be filled in a particular store on the client?

Let's discuss how this problem solved by other state managers.

## Other state managers

### Single store

In the state manager with single store (e.g. Redux), this problem does not exist at all. It is a single store, which can be serialized and deserialized without any additional information.

:::info
Actually, single store forces you to create unique names of each part of it implicitly. In any object you won't be able to create duplicate keys, so the path to store slice is a unique identifier of this slice.
:::

```ts
// server.ts
import { createStore } from 'single-store-state-manager';

function handlerRequest() {
  const store = createStore({ initialValue: null });

  return {
    // It is possible to just serialize the whole store
    state: JSON.stringify(store.getState()),
  };
}

// client.ts
import { createStore } from 'single-store-state-manager';

// Let's assume that server put the state into the HTML
const serverState = readServerStateFromWindow();

const store = createStore({
  // Just parse the whole state and use it as client state
  initialValue: JSON.parse(serverState),
});
```

It's great that you do not need any additional tools for serialization and deserialization, but single store has a few problems:

- It does not support tree-shaking and code-splitting, you have to load the whole store anyway
- Because its architecture, it requires some additional tools for fixing performance (like `reselect`)
- It does not support any kind of micro-frontends and stuff which is getting bigger recently

### Multi stores

Unfortunately, state managers that built around idea of multi stores do not solve this problem good. Some tools offer single store like solutions (MobX), some does not try to solve this issue at all (Recoil, Zustand).

:::info
E.g., the common pattern to solve serialization problem in MobX is [Root Store Pattern](https://dev.to/ivandotv/mobx-root-store-pattern-with-react-hooks-318d) which is destroying the whole idea of multi stores.
:::

So, we are considering SSR as a first class citizen of modern web applications, and we are going to support code-splitting or micro-frontends.

## Unique identifiers for every store

Because of multi-store architecture, Effector requires a unique identifier for every store. It is a string that is used to distinguish stores between different environments. In Effector's world this kind of strings are called `sid`.

:::tip TL;DR

`sid` is a unique identifier of a store. It is used to distinguish stores between different environments.

:::

Let's add it to some stores:

```ts
const $name = createStore(null, { sid: 'name' });
const $age = createStore(null, { sid: 'age' });
```

Now, we can serialize and deserialize stores:

```ts
// server.ts
async function handlerRequest() {
  // create isolated instance of application
  const scope = fork();

  // fill some data to stores
  await allSettled($name, { scope, params: 'Igor' });
  await allSettled($age, { scope, params: 25 });

  const state = JSON.serialize(serialize(scope));
  // -> { "name": "Igor", "age": 25 }

  return { state };
}
```

After this code, we have a serialized state of our application. It is a plain object with stores' values. We can put it back to the stores on the client:

```ts
// Let's assume that server put the state into the HTML
const serverState = readServerStateFromWindow();

const scope = fork({
  // Just parse the whole state and use it as client state
  values: JSON.parse(serverState),
});
```

Of course, it's a lot of boring jobs to write `sid` for every store. Effector provides a way to do it automatically with code transformation plugins.

### Automatic way (#how-to-add-sids-automatic)

For sure, manually creating unique ids is a quite boring job.

Thankfully, there are [`effector/babel-plugin`](/api/effector/babel-plugin) and [`@effector/swc-plugin`](/en/api/effector/swc-plugin), which will provide SIDs automatically.

Because code-transpilation tools are working at the file level and are run before bundling happens – it is possible to make SIDs **stable** for every environment.

:::tip
It is preferable to use [`effector/babel-plugin`](/api/effector/babel-plugin) or [`@effector/swc-plugin`](/en/api/effector/swc-plugin) instead of adding SIDs manually.
:::

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

- `createQuery`, `createMutation` from [`farfetched`](https://ff.effector.dev/)
- `debounce`, `throttle`, etc from [`patronum`](https://patronum.effector.dev/)
- Any custom factory in your code, e.g. factory of a [feature-flag entity](https://ff.effector.dev/recipes/feature_flags.html)

:::tip
farfetched, patronum, @effector/reflect, atomic-router and @withease/factories are supported by default and doesn't need additional configuration
:::

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
### How `withFactory` works

`withFactory` is a helper that allows to create unique `sid`-s for inner units. It is a function that accepts an object with `sid` and `fn` properties. `sid` is a unique identifier of the factory, and `fn` is a function that creates units.

Internal implementation of `withFactory` is pretty simple, it puts received `sid` to the global scope before `fn` call, and removes it after. Any Effector's creator function tries to read this global value while creating and append its value to the `sid` of the unit.

```ts
let globalSid = null;

function withFactory({ sid, fn }) {
  globalSid = sid;

  const result = fn();

  globalSid = null;

  return result;
}

function createStore(initialValue, { sid }) {
  if (globalSid) {
    sid = `${globalSid}|${sid}`;
  }

  // ...
}
```

Because of single thread nature of JavaScript, it is safe to use global variables for this purpose.

:::info
Of course, the real implementation is a bit more complicated, but the idea is the same.
:::

## Summary

1. Any multi-store state manager requires unique identifiers for every store to distinguish them between different environments.
2. In Effector's world this kind of strings are called `sid`.
3. Plugins for code transformations add `sid`-s and meta-information to raw Effector's units creation, like `createStore` or `createEvent`.
4. Plugins for code transformations wrap custom factories with `withFactory` helper that allow to make `sid`-s of inner units unique as well.
