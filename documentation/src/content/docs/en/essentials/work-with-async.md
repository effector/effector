---
title: Asynchronous Operations in effector
description: How effects help work with asynchronous operations in effector
---

# Asynchronous Operations in effector using Effects (#async-operation-with-effects)

Asynchronous operations are a fundamental part of any modern application, and Effector provides convenient tools to handle them. Using effects ([createEffect](/en/api/effector.createEffect)), you can build predictable logic for working with asynchronous data.

:::tip{title="Effect naming"}
The Effector team recommends using the `Fx` postfix for naming effects. This is not a mandatory requirement but a usage recommendation, [read more](/en/extra/conventions).
:::

## What are Effects? (#what-are-effects)

Effects ([createEffect](/en/api/effector.createEffect)) are Effector's tool for working with external APIs or side effects in your application, for example:

- Asynchronous server requests
- Working with `localStorage`/`indexedDB`
- Any operations that might fail or take time to complete

## Main Effect States (#main-effect-states)

Effector automatically tracks the state of effect execution:

- `pending` — is a [store](/en/api/effector/Store) that indicates whether the effect is running, useful for displaying loading states
- `done` — is an [event](/en/api/effector/Event) that triggers on successful completion
- `fail` — is an [event](/en/api/effector/Event) that triggers on error
- `finally` — is an [event](/en/api/effector/Event) that triggers when the effect is completed, either with success or error

You can find the complete effect API [here](/en/api/effector/Effect).

:::warning{title="Important note"}
Don't call events or modify effect states manually, effector will handle this automatically.
:::

```ts
const fetchUserFx = createEffect(() => {
  /* external api call */
});

fetchUserFx.pending.watch((isPending) => console.log("Pending:", isPending));

fetchUserFx.done.watch(({ params, result }) => console.log(`Fetched user ${params}:`, result));

fetchUserFx.finally.watch((value) => {
  if (value.status === "done") {
    console.log("fetchUserFx resolved ", value.result);
  } else {
    console.log("fetchUserFx rejected ", value.error);
  }
});

fetchUserFx.fail.watch(({ params, error }) =>
  console.error(`Failed to fetch user ${params}:`, error),
);

fetchUserFx();
```

## Binding Effects to Events and Stores (#binding-effects-to-events-and-stores)

### Updating Store Data When Effect Completes (#update-store-when-effect-completes)

Let's say we want effector to take the data returned by the effect when it completes and update the store with new data. This can be done quite easily using effect states.

```ts
import { createStore, createEffect } from "effector";

const fetchUserNameFx = createEffect(async (userId: string) => {
  const userData = await fetch(`/api/users/${userId}`);
  return userData.name;
});

const $error = createStore<string | null>(null);
const $userName = createStore("");
const $isLoading = fetchUserNameFx.pending.map((isPending) => isPending);

$error.reset(fetchUserNameFx.done);

$userName.on(fetchUserNameFx.done, (_, { params, result }) => result);
$error.on(fetchUserNameFx.fail, (_, { params, error }) => error.message);
// or
$userName.on(fetchUserNameFx.doneData, (_, result) => result);
$error.on(fetchUserNameFx.failData, (_, error) => error.message);

$isLoading.watch((isLoading) => console.log("Is loading:", isLoading));
```

`doneData` and `failData` are events that are identical to `done` and `fail` respectively, except that they only receive result and error in their parameters.

### Triggering Effects on Event (#triggering-effect-on-events)

In most cases, you'll want to trigger an effect when some event occurs, like form submission or button click. In such cases, the sample function will help you, which will call target when clock triggers.

:::info{title="`sample` function"}
The sample function is a key function for connecting stores, effects, and events. It allows you to flexibly and easily configure the reactive logic of your application.
You can read more about `sample` [here](/en/essentials/unit-composition)
:::

```ts
import { createEvent, sample, createEffect } from "effector";

const userLoginFx = createEffect(() => {
  // some logic
});

// Event for data loading
const formSubmitted = createEvent();

// Connect event with effect
sample({
  clock: formSubmitted, // When this triggers
  target: userLoginFx, // Run this
});

// somewhere in application
formSubmitted();
```

## Error handling in Effects (#error-handing-in-effects)

Effects in Effector provide robust error handling capabilities. When an error occurs during effect execution, it's automatically caught and processed through the `fail` event.

To type an error in an effect you need to pass a specific type to the generic of the `createEffect` function:

```ts
import { createEffect } from "effector";

class CustomError extends Error {
  // implementation
}

const effect = createEffect<Params, ReturnValue, CustomError>(() => {
  const response = await fetch(`/api/users/${userId}`);

  if (!response.ok) {
    // You can throw custom errors that will be caught by .fail handler
    throw new CustomError(`Failed to fetch user: ${response.statusText}`);
  }

  return response.json();
});
```

If you throw an error of a different type, the typescript will show the error to you.

## Practical Example (#effects-practical-example)

```ts
import { createStore, createEvent, createEffect, sample } from "effector";

// Effect for data loading
const fetchUserFx = createEffect(async (id: number) => {
  const response = await fetch(`/api/user/${id}`);

  if (!response.ok) {
    // you can modify the error before it reaches fail/failData
    throw new Error("User not found");
  }

  return response.json();
});

const setId = createEvent<number>();
const submit = createEvent();

const $id = createStore(0);
const $user = createStore<{ name: string } | null>(null);
const $error = createStore<string | null>(null);
const $isLoading = fetchUserFx.pending;

$id.on(setId, (_, id) => id);
$user.on(fetchUserFx.doneData, (_, user) => user);
$error.on(fetchUserFx.fail, (_, { error }) => error.message);
$error.reset(fetchUserFx.done);

// Loading logic: run fetchUserFx on submit
sample({
  clock: submit,
  source: $id,
  target: fetchUserFx,
});

// Usage
setId(1); // Set ID
submit(); // Load data
```

You can read about how to test effects on the [Testing page](/en/essentials/testing).
