---
title: SIDs
description: Stable IDentifiers
redirectFrom:
  - /en/explanation/sids
  - /explanation/sids
  - /docs/explanation/sids
---

The SID is a Stable IDentifier of effector unit. It can be used for different purposes, but the main use-case is a Server Side Rendering.

The SIDs have to important properites:

1. They are **unique** - each sid for each unit should be unique
2. They are **stable** between different environments - each sid of each unit in some environment (e.g. server code) should be equal to a sid of this unit in any other environment.

## How to add SIDs

The SIDs can be added both manually and automatically, but it is important, that SIDs are set before any bundling happened - otherwise there is no way to guarantee stability.

**Manual way**

```tsx
import { createStore } from "effector";

export const $myStore = createStore(42, { sid: "my-stable-id" });
```

It is important, that all sids are also **unique**. If you are usign the manual way, you have to guarantee that yourself.

**Automatic way**

For sure, manually creating unique ids is a quite boring job.

Thankfully, there are [`effector/babel-plugin`](/api/effector/babel-plugin) and [`@effector/swc-plugin`](https://github.com/effector/swc-plugin), which will provide SIDs automatically.

Because code-transpilation tools are working at the file-level and are run before bundling happens - it is possible to make SIDs **stable** for every environment.

## Why we need Stable Identifiers

Because of multi-store architecture, Effector code in the applications is written in atomic and distributed way, there is no central "store" or "controller".

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
import { createEvent, sample } from "effector";

import { fistNameModel } from "#src/features/first-name";
import { lastNameModel } from "#src/features/last-name";

export const formValuesFilled = createEvent();

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

But at the **serialization boundary** (this is a point, where state is stringified and added to the server response) we need to somehow collect states of all these stores, serialize them, add them to the server response.

And then we need to unpack these values at the client and add this "server-calucalted" state to a client-side instances of all these stores!

This is a hard problem and to solve this, `effector` needs a way to connect "server-calculated" state of some store with its client-side instance.

This where SIDs are required. Because SID is the same for the same store in any environment, `effector` can easily connect server-side values with client-side stores.

**Example**

This is a generic server side rendering handler. The `renderHtmlString` function is an implementation detail, which will depend on the framework you use.

```tsx
// src/server/handler.ts
import { fork, allSettled, serialize } from "effector";

import { formModel } from "#src/features/form";

async function handleServerRequest(req) {
  const scope = fork(); // creates isolated instance of the app

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

  return renderHtmlString({
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
Notice, that there is no direct imports of any stores of the application here - state is collected automatically and its serialized version already has all the information, which will be needed for hydration.

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

At this point, state of all stores in the `clientScope` is the same, as it was at the server.
