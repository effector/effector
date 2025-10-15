---
title: Explicit app start
description: Explains why having an explicit event to start your application is important and how it helps you control the application’s lifecycle.
---

# Explicit app start (#explicit-start)

In Effector [events](/en/api/effector/Event) can not be triggered implicitly. It gives you more control over the app's lifecycle and helps to avoid unexpected behavior.

## The code (#the-code)

In the simplest case, you can just create something like `appStarted` event and trigger it right after the app initialization. Let us pass through the code line by line and explain what's going on here.

1. Create start [event](/en/api/effector/Event)

This [event](/en/api/effector/Event) will be used to trigger the start of the app. For example, you can attach some global listeners after this it.

```ts ins={3}
import { createEvent, fork, allSettled } from 'effector';

const appStarted = createEvent();

const scope = fork();

await allSettled(appStarted, { scope });
```

2. Create [isolated scope](/en/advanced/work-with-scope)

Fork API allows you to create [scope](/en/api/effector/Scope) which will be used across the app. It helps you to prevent using global stateand avoid unexpected behavior.

```ts ins={5}
import { createEvent, fork, allSettled } from 'effector';

const appStarted = createEvent();

const scope = fork();

await allSettled(appStarted, { scope });
```

3. Trigger `appStarted` [event](/en/api/effector/Event) on the patricular [scope](/en/api/effector/Scope).

[`allSettled`](/en/api/effector/allSettled) function allows you to start an event on particular scope and wait until all computations will be finished.

```ts ins={7}
import { createEvent, fork, allSettled } from 'effector';

const appStarted = createEvent();

const scope = fork();

await allSettled(appStarted, { scope });
```

## The reasons (#reasons)

The main reason for this approach is it allows you to control the app's lifecycle. It helps you to avoid unexpected behavior and make your app more predictable in some cases. Let us say we have a module with the following code:

```ts
// app.ts
import { createStore, createEvent, sample, scopeBind } from 'effector';

const $counter = createStore(0);
const increment = createEvent();

const startIncrementationIntervalFx = createEffect(() => {
  const boundIncrement = scopeBind(increment, { safe: true });

  setInterval(() => {
    boundIncrement();
  }, 1000);
});

sample({
  clock: increment,
  source: $counter,
  fn: (counter) => counter + 1,
  target: $counter,
});

startIncrementationIntervalFx();
```

### Tests (#tests)

We believe that any serious application has to be testable, so we have to isolate application lifecycle inside particular test-case. In case of implicit start (start of model logic by module execution), it will be impossible to test the app's behavior in different states.

:::info{title="about scopeBind"}
[`scopeBind`](/en/api/effector/scopeBind) function allows you to bind an [event](/en/api/effector/Event) to particular [scope](/en/api/effector/Scope), more details you can find on the [Isolated scopes](/en/advanced/work-with-scope) page, as well as in [Scope loss](/en/guides/scope-loss).
:::

Now, to test the app's behavior, we have to mock `setInterval` function and check that `$counter` value is correct after particular time.

```ts
// app.test.ts
import { $counter } from './app';

test('$counter should be 5 after 5 seconds', async () => {
  // ... test
});

test('$counter should be 10 after 10 seconds', async () => {
  // ... test
});
```

But, counter will be started immediately after the module execution, and we will not be able to test the app's behavior in different states.

### SSR (#ssr)

In case of SSR, we have to start all application's logic on every user's request, and it will be impossible to do with implicit start.

```ts
// server.ts
import * as app from './app';

function handleRequest(req, res) {
  // ...
}
```

But, counter will be started immediately after the module execution (aka application initialization), and we will not be able to start the app's logic on every user's request.

### Add explicit start (#adding-explicit-start)

Let us rewrite the code and add explicit start of the app.

```ts del={22} ins={24-28}
// app.ts
import { createStore, createEvent, sample, scopeBind } from 'effector';

const $counter = createStore(0);
const increment = createEvent();

const startIncrementationIntervalFx = createEffect(() => {
  const boundIncrement = scopeBind(increment, { safe: true });

  setInterval(() => {
    boundIncrement();
  }, 1000);
});

sample({
  clock: increment,
  source: $counter,
  fn: (counter) => counter + 1,
  target: $counter,
});

startIncrementationIntervalFx();

const appStarted = createEvent();
sample({
  clock: appStarted,
  target: startIncrementationIntervalFx,
});
```

That is it! Now we can test the app's behavior in different states and start the app's logic on every user's request.

:::tip{title="Don’t stop at start"}
In real-world applications, it is better to add not only explicit start of the app, but also explicit stop of the app. It will help you to avoid memory leaks and unexpected behavior.
You can also apply the same principle to individual features to control each feature’s lifecycle separately.  
:::

In this recipe, we used application-wide `appStarted` [event](/en/api/effector/Event) to trigger the start of the app. However, in real-world applications, it is better to use more granular [events](/en/api/effector/Event) to trigger the start of the particular part of the app.

## Related APIs and Articles (#related-api-and-docs)

- **API**

  - [`Scope`](/en/api/effector/Scope) – Description of scope and its methods
  - [`scopeBind`](/en/api/effector/scopeBind) – Method for binding a unit to a scope
  - [`fork`](/en/api/effector/fork) – Operator for creating a scope
  - [`allSettled`](/en/api/effector/allSettled) – Method for running a unit in a given scope and waiting for the entire chain of effects to complete

- **Articles**
  - [What is scope loss and how to fix it](/en/guides/scope-loss)
  - [SSR guide](/en/guides/server-side-rendering)
  - [Testing guide](/en/guides/testing)
  - [How to Think in the Effector Paradigm](/en/resources/mindset)
