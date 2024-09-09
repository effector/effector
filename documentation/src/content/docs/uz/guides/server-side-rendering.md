---
title: Server Side Rendering
redirectFrom:
  - /guides/ssr
  - /guides/server-side-rendering
  - /en/guides/ssr
  - /en/guides/server-side-rendering
---

Server-side rendering (SSR) means that the content of your site is generated on the server and then sent to the browser – which these days is achieved in very different ways and forms.

:::info
Generally, if the rendering happens at the runtime – it is called SSR. If the rendering happens at the build-time – it is usually called Server Side Generation (SSG), which in fact is basically a subset of SSR.

This difference it is not important for this guide, everything said applies both to SSR and SSG.
:::

In this guide we will cover two main kinds of Server Side Rendering patterns and how effector should be used in these cases.

## Non-Isomorphic SSR

You don't need to do anything special to support non-isomorphic SSR/SSG workflow.

This way initial HTML is usually generated separately, by using some sort of template engine, which is quite often run with different (not JS) programming language.
The frontend code in this case works only at the client browser and **is not used in any way** to generate the server response.

This approach works for effector, as well as any javascript code. Any SPA application is basically an edge-case of it, as its HTML template does not contain any content, except for `<script src="my-app.js" />` link.

:::tip
If you have non-isomorphic SSR – just use effector the way you would for an SPA app.
:::

## Isomorphic SSR

When you have an isomorphic SSR application, **most of the frontend code is shared with server** and **is used to generate the response** HTML.

You can also think of it as an approach, where your app **starts at the server** – and then gets transferred over the network to the client browser, where it **continues** the work it started doing at the server.

That's where the name comes from – despite the fact, that the code is bundled for and run in different environments, its output remains (mostly) the same, if given the same input.

There are a lot of different frameworks, which are built upon this approach – e.g. Next.js, Remix.run, Razzle.js, Nuxt.js, Astro, etc

:::tip{title="Next.js"}
Next.js does SSR/SSG in the special way, which requires a bit of custom handling on the effector side.

This is done via dedicated [`@effector/next`](https://github.com/effector/next) package – use it, if you want to use effector with Next.js.
:::

For this guide we will not focus on any specific framework or server implementation – these details will be abstracted away.

### SIDs

To handle isomorphic SSR with effector we need a reliable way to [`serialize`](/en/api/effector/serialize/) state, to pass it over the network. This where we need to have Stable IDentifiers for each store in our app.

:::info
Deep-dive explanation about SIDs [can be found here](/en/explanation/sids).
:::

To add SIDs – [just use one of effector's plugins](/en/explanation/sids#how-to-add-sids-automatic).

### Common application code

The main feature of isomorphic SSR – the same code is used to both server render and client app.

For sake of example we will use a very simple React-based counter app – all of it will be contained in one module:

```tsx
// app.tsx
import React from "react";
import { createEvent, createStore, createEffect, sample, combine } from "effector";
import { useUnit } from "effector-react";

// model
export const appStarted = createEvent();
export const $pathname = createStore<string | null>(null);

const $counter = createStore<number | null>(null);

const fetchUserCounterFx = createEffect(async () => {
  await sleep(100); // in real life it would be some api request

  return Math.floor(Math.random() * 100);
});

const buttonClicked = createEvent();
const saveUserCounterFx = createEffect(async (count: number) => {
  await sleep(100); // in real life it would be some api request
});

sample({
  clock: appStarted,
  source: $counter,
  filter: (count) => count === null, // if count is already fetched - do not fetch it again
  target: fetchUserCounterFx,
});

sample({
  clock: fetchUserCounterFx.doneData,
  target: $counter,
});

sample({
  clock: buttonClicked,
  source: $counter,
  fn: (count) => count + 1,
  target: [$counter, saveUserCounterFx],
});

const $countUpdatePending = combine(
  [fetchUserCounterFx.pending, saveUserCounterFx.pending],
  (updates) => updates.some((upd) => upd === true),
);

const $isClient = createStore(typeof document !== "undefined", {
  /**
   * Here we're explicitly telling effector, that this store, which depends on the environment,
   * should be never included in serialization
   * as it's should be always calculated based on actual current env
   * 
   * This is not actually necessary, because only diff of state changes is included into serialization
   * and this store is not going to be changed.
   * 
   * But it is good to add this setting anyway - to highlight the intention
  */
  serialize: "ignore"
});

const notifyFx = createEffect((message: string) => {
  alert(message);
});

sample({
  clock: [
    saveUserCounterFx.done.map(() => "Counter update is saved successfully"),
    saveUserCounterFx.fail.map(() => "Could not save the counter update :("),
  ],
  // It is totally ok to have some splits in the app's logic based on current environment
  //
  // Here we want to trigger notification alert only at the client
  filter: $isClient,
  target: notifyFx,
});

// ui
export function App() {
  const clickButton = useUnit(buttonClicked);
  const { count, updatePending } = useUnit({
    count: $counter,
    updatePending: $countUpdatePending,
  });

  return (
    <div>
      <h1>Counter App</h1>
      <h2>{updatePending ? "Counter is updating" : `Current count is ${count ?? "unknown"}`}</h2>
      <button onClick={() => clickButton()}>Update counter</button>
    </div>
  );
}
```

This is our app's code which will be used to both server-side render and to handle client's needs.

:::tip
Notice, that it is important, that all of effector units – stores, events, etc – are "bound" to the react component via `useUnit` hook.

You can use the official eslint plugin of effector to validate that and to follow other best practices – checkout the [eslint.effector.dev](https://eslint.effector.dev/) website.
:::

## Server entrypoint

The way of the `<App />` to the client browsers starts at the server. For this we need to create **separate entrypoint** for the specific server-related code, which will also handle the server-side render part.

In this example we're not going to dive deep into various possible server implementations – we will focus on the request handler itself instead.

:::info
Alongside with basic SSR needs, like calculating the final state of the app and serializing it, effector also handles **the isolation of user's data between requests**.

It is very important feature, as Node.js servers usually handle more than one user request at the same moment of time.

Since JS-based platforms, including Node.js, usually have single "main" thread – all logical computations are happening in the same context, with the same memory available.
So, if state is not properly isolated, one user may receive the data, prepared for another user, which is very undesirable.

effector handles this problem automatically inside the `fork` feature. Read [the relevant docs for details](/en/api/effector/fork).
:::

This is the code for server request handler, which contains all server-specific stuff that need to be done.
Notice, that for meaningful parts of our app we are still using the "shared" `app.tsx` code.

```tsx
// server.tsx
import { renderToString } from "react-dom/server";
import { Provider } from "effector-react";
import { fork, allSettled, serialize } from "effector";

import { appStarted, App, $pathname } from "./app";

export async function handleRequest(req) {
  // 1. create separate instance of effector's state - special `Scope` object
  const scope = fork({
    values: [
      // some parts of app's state can be immediately set to relevant states,
      // before any computations started
      [$pathname, req.pathname],
    ],
  });

  // 2. start app's logic - all computations will be performed according to the model's logic,
  // as well as any required effects
  await allSettled(appStarted, {
    scope,
  });

  // 3. Serialize the calculated state, so it can be passed over the network
  const storesValues = serialize(scope);

  // 4. Render the app - also into some serializable version
  const app = renderToString(
    // by using Provider with the scope we tell the <App />, which state of the stores it should use
    <Provider value={scope}>
      <App />
    </Provider>,
  );

  // 5. prepare serialized HTML response
  //
  // This is serialization (or network) boundary
  // The point, where all state is stringified to be sent over the network
  //
  // effectors state is stored as a `<script>`, which will set the state into global object
  // `react`'s state is stored as a part of the DOM tree.
  return `
    <html>
      <head>
        <script>
          self._SERVER_STATE_ = ${JSON.stringify(storesValues)}
        </script>
        <link rel="stylesheet" href="styles.css" />
        <script defer src="app.js" />
      </head>
      <body>
        <div id="app">
          ${app}
        </div>
      </body>
    </html>
  `;
}
```

☝️ In this code we have created the HTML string, which user will receive over the network and which contains serialized state of the whole app.

## Client entrypoint

When the generated HTML string reaches the client browser, has been processed by the parser and all the required assets have been loaded – our application code starts working on the client.

At this point `<App />` needs to restore its past state (which was computed on the server), so that it doesn't start from scratch, but starts from the same point the work reached on the server.

The process of restoring the server state at the client is usually called **hydration** and this is what client entrypoint should actually do:

```tsx
// client.tsx
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { fork, allSettled } from "effector";
import { Provider } from "effector-react";

import { App, appStarted } from "./app";

/**
 * 1. Find, where the server state is stored and retrieve it
 *
 * See the server handler code to find out, where it was saved in the HTML
 */
const effectorState = globalThis._SERVER_STATE_;
const reactRoot = document.querySelector("#app");

/**
 * 2. Initiate the client scope of effector with server-calculated values
 */
const clientScope = fork({
  values: effectorState,
});

/**
 * 3. "Hydrate" React state in the DOM tree
 */
hydrateRoot(
  reactRoot,
  <Provider value={clientScope}>
    <App />
  </Provider>,
);

/**
 * 4. Call the same starting event at the client
 *
 * This is optional and actually depends on how your app's logic is organized
 */
allSettled(appStarted, { scope: clientScope });
```

☝️ At this point the App is ready to use!

## Recap

1. You don't need to do anything special for **non-isomorphic** SSR, all SPA-like patterns will work.
2. Isomorphic SSR requires a bit of special preparation – you will need [SIDs for stores](/en/explanation/sids).
3. Common code of the **isomorphic** SSR app handles all meaningful parts – how the UI should look, how state should be calculated, when and which effects should be run.
4. Server-specific code calculates and **serializes** all of the app's state into the HTML string.
5. Client-specific code retrieves this state and uses it to **"hydrate"** the app on the client.
