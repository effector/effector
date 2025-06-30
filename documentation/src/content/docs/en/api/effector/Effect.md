---
title: Effect API
description: Effect API methods, properties and their descriptions
redirectFrom:
  - /api/effector/Effect
  - /docs/api/effector/effect
---

[eventTypes]: /en/api/effector/Event#event-types
[storeTypes]: /en/essentials/typescript#store-types

# Effect API (#effect-api)

```ts
import { type Effect, createEffect } from "effector";

const effectFx = createEffect();
```

An Effect is a unit designed to handle side effects, whether synchronous or asynchronous. It includes a set of pre-built [events](/en/api/effector/Event) and [stores](/en/api/effector/Store) that streamline common operations. It is categorized as a [unit](/en/explanation/glossary#common-unit).

Effects can be called like regular functions (_imperative call_) and can also be connected along with their properties to various API methods including [sample](/api/effector/sample) and [split](/api/effector/split) (_declarative connection_).

:::tip{title="effective effect"}
If you're not familiar with effects and how to work with them, check out [Asynchronous Operations in effector using Effects](/en/essentials/work-with-async).
:::

## Effect Interface (#effect-interface)

Available methods and properties of effects:
| <div style="width:170px">Method/Property</div> | Description |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`use(handler)`](#use-method) | Replaces the effect's handler with a new `handler` function. |
| [`use.getCurrent()`](#use-getCurrent-method) | Returns the current effect handler. |
| [`watch(watcher)`](#watch-method) | Adds a listener that calls `watcher` on each effect invocation. |
| [`map(fn)`](#map-method) | Creates a new [derived event][eventTypes] that triggers when the effect is called with the result of calling `fn` on the effect's parameters. |
| [`prepend(fn)`](#prepend-method) | Creates a new [event][eventTypes] that transforms input data through `fn` before calling the effect. |
| [`filterMap(fn)`](#filterMap-method) | Creates a new [derived event][eventTypes] that triggers when the effect is called with the result of fn, if it didn't return `undefined`. |
| [`done`](#done-property) | [Derived event][eventTypes] that triggers when the effect completes successfully with params and result. |
| [`doneData`](#doneData-property) | [Derived event][eventTypes] with the result of successful effect execution with result. |
| [`fail`](#fail-property) | [Derived event][eventTypes] that triggers when the effect execution fails with params and error. |
| [`failData`](#failData-property) | [Derived event][eventTypes] with the effect's error data. |
| [`finally`](#finally-property) | [Derived event][eventTypes] that triggers on any effect completion. |
| [`pending`](#pending-property) | [Derived store][storeTypes] `Store<boolean>` with the effect execution status (`true` during execution). |
| [`inFlight`](#inFlight-property) | [Derived store][storeTypes] `Store<number>` with the count of active effect calls. |
| [`sid`](#sid-property) | Unique identifier of the [unit](/explanation/glossary#common-unit). |
| [`shortName`](#shortName-property) | String property containing the variable name in which the effect was declared. |
| [`compositeName`](#compositeName-property) | Composite effect name (including domain and short name) — useful for logging and tracing. |

## Effect Peculiarities (#effect-peculiarities)

1. When called imperatively, they always return a promise reflecting the side effect execution progress.
2. Effects accept only one argument, [just like events](/en/api/effector/Event#event-peculiarities).
3. They have built-in stores ([`pending`](#pending-property), [`inFlight`](#inFlight-property)) and events ([`done`](#done-property), [`fail`](#fail-property), [`finally`](#finally-property), etc.) for convenience.

## Effect Methods (#effect-methods)

### `.use(handler)` (#use-method)

:::warning{title="use is an anti-pattern"}
If the implementation value is known immediately, it's better to use `createEffect(handler)`.

The `use(handler)` method is an anti-pattern that degrades type inference.
:::

Defines the effect implementation: the function that will be called when the effect is triggered. Used for cases when the implementation is not set [during creation](/en/api/effector/createEffect) or when testing requires changing the effect's behavior.<br/>
Accepts a `params` argument, which is the data with which the effect was called.

:::info{title="use takes priority"}
If the effect already had an implementation at the time of call, it will be replaced with the new one.
:::

- **Formula**

```ts
const fx: Effect<Params, Done>;
fx.use(handler);
```

- **Type**

```ts
effect.use(handler: (params: Params) => Promise<Done> | Done): Effect<
  Params,
  Done,
  Fail
>
```

- **Examples**

```js
import { createEffect } from "effector";

const fetchUserReposFx = createEffect();

fetchUserReposFx.use(async ({ name }) => {
  console.log("fetchUserReposFx called for github user", name);

  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

await fetchUserReposFx({ name: "zerobias" });
// => fetchUserReposFx called for github user zerobias
```

[Run example](https://share.effector.dev/Vp8tPzBh)

- **Return value**

Returns the current effect.

---

### `.use.getCurrent()` (#use-getCurrent-method)

Method for getting the current effect implementation. Used for testing.

If the effect doesn't have an implementation set yet, a default function will be returned that [throws an error](https://share.effector.dev/8PBjt3TL) when called.

- **Formula**

```ts
const fx: Effect<Params, Done>;
const handler = fx.use.getCurrent();
```

- **Type**

```ts
effect.use.getCurrent(): (params: Params) => Promise<Done>
```

- **Examples**

```js
const handlerA = () => "A";
const handlerB = () => "B";

const fx = createEffect(handlerA);

console.log(fx.use.getCurrent() === handlerA);
// => true

fx.use(handlerB);
console.log(fx.use.getCurrent() === handlerB);
// => true
```

[Run example](https://share.effector.dev/CM6hgtOM)

- **Return value**

Returns the effect's implementation function that was set through [createEffect](/en/api/effector/createEffect) or using the [use](#use-method) method.

---

### `.watch(watcher)` (#watch-method)

Calls an additional function with side effects on each effect trigger. Shouldn't be used for logic, better to replace with [`sample`](/en/api/effector/sample).

- **Formula**

```ts
const fx: Effect<Params, Done>;
const unwatch = fx.watch(watcher);
```

- **Type**

```ts
effect.watch(watcher: (payload: Params) => any): Subscription
```

- **Examples**

```js
import { createEffect } from "effector";

const fx = createEffect((params) => params);

fx.watch((params) => {
  console.log("effect called with argument", params);
});

await fx(10);
// => effect called with argument 10
```

[Run example](https://share.effector.dev/iNb7YIdV)

- **Return value**

[Subscription cancellation function](/explanation/glossary#subscription), after calling it the `watcher` stops receiving updates and is removed from memory.

---

### `.map(fn)` (#map-method)

The map method creates a [derived event][eventTypes]. The event is triggered at the moment the effect is executed, using the same arguments as the effect and the result returned by the `fn` function. Works similarly to [`Event.map(fn)`](/en/api/effector/Event#event-methods-map-fn).

- **Formula**

```ts
const fx: Effect<Params, Done>;
const eventB = fx.map(fn);
```

- **Type**

```ts
effect.map<T>(fn: (params: Params) => T): Event<T>
```

- **Examples**

```ts
import { createEffect } from "effector";

interface User {
  // ...
}

const saveUserFx = createEffect(async ({ id, name, email }: User) => {
  // ...
  return response.json();
});

const userNameSaving = saveUserFx.map(({ name }) => {
  console.log("Starting user save: ", name);
  return name;
});

const savingNotification = saveUserFx.map(({ name, email }) => {
  console.log("Save notification");
  return `Saving user: ${name} (${email})`;
});

// When calling the effect, both derived events will trigger
await saveUserFx({ id: 1, name: "John", email: "john@example.com" });
// => Starting user save: John
// => Saving user: John (john@example.com)
```

[Run example](https://share.effector.dev/4UFLTo5p)

- **Return value**

Returns a new [derived event][eventTypes].

---

### `.prepend(fn)` (#prepend-method)

Creates a new event to transform data _before_ running the effect. Compared to [map](#effect-methods-map), it works in the opposite direction. Works similarly to [`Event.prepend(fn)`](/en/api/effector/Event#eventCallable-methods-prepend-fn).

- **Formula**

```ts
const fx: Effect<Params, Done>;
const trigger = fx.prepend(fn);
```

- **Type**

```ts
effect.prepend<Before>(fn: (_: Before) => Params): EventCallable<Before>
```

- **Examples**

```js
import { createEffect } from "effector";

const saveFx = createEffect(async (data) => {
  console.log("saveFx called with:", data);
  await api.save(data);
});

// create a trigger event for the effect
const saveForm = saveFx.prepend((form) => ({
  ...form,
  modified: true,
}));

saveForm({ name: "John", email: "john@example.com" });
// => saveFx called with: { name: "John", email: "john@example.com", modified: true }
```

- **Return value**

Returns a new [event][eventTypes].

---

### `.filterMap(fn)` (#filterMap-method)

The `filterMap` method creates a [derived event][eventTypes]. The `fn` function computation runs simultaneously with the effect, however if the function returns `undefined`, the event doesn't trigger. Works similarly to the [`.map(fn)`](#map-method) method, but with filtering by return value.

- **Formula**

```ts
const fx: Effect<Params, Done>;
const filtered = fx.filterMap(fn);
```

- **Type**

```ts
effect.filterMap<T>(fn: (payload: Params) => T | undefined): Event<T>
```

- **Examples**

```ts
import { createEffect } from "effector";

const validateAndSaveFx = createEffect(async (userData) => {
  if (!userData.isValid) {
    throw new Error("Invalid data");
  }

  return await saveToDatabase(userData);
});

// Create event only for valid data
const validDataProcessing = validateAndSaveFx.filterMap((userData) => {
  if (userData.isValid && userData.priority === "high") {
    return {
      id: userData.id,
      timestamp: Date.now(),
    };
  }
  // If data is invalid or priority is not high, the event won't trigger
});

validDataProcessing.watch(({ id, timestamp }) => {
  console.log(`Processing high-priority data ID: ${id} at ${timestamp}`);
});

// Example calls
await validateAndSaveFx({
  id: 1,
  isValid: true,
  priority: "high",
  role: "user",
});
// => Processing high-priority data ID: 1 at 1703123456789
```

- **Return value**

Returns a new [derived event][eventTypes].

## Effect Properties (#effect-properties)

### `.done` (#done-property)

[Derived event][eventTypes] that triggers with the result of effect execution and the argument passed during the call.

- **Type**

```ts
interface Effect<Params, Done> {
  done: Event<{ params: Params; result: Done }>;
}
```

- **Examples**

```js
import { createEffect } from "effector";

const fx = createEffect((value) => value + 1);

fx.done.watch(({ params, result }) => {
  console.log("Call with argument", params, "completed with value", result);
});

await fx(2);
// => Call with argument 2 completed with value 3
```

[Run example](https://share.effector.dev/tnSg24Ca).

---

### `.doneData` (#doneData-property)

[Derived event][eventTypes] that triggers with the result of successful effect execution.

- **Type**

```ts
interface Effect<any, Done> {
  doneData: Event<Done>;
}
```

- **Examples**

```js
import { createEffect } from "effector";

const fx = createEffect((value) => value + 1);

fx.doneData.watch((result) => {
  console.log(`Effect completed successfully, returning ${result}`);
});

await fx(2);
// => Effect completed successfully, returning 3
```

[Run example](https://share.effector.dev/KexWC7GO).

---

### `.fail` (#fail-property)

[Derived event][eventTypes] that triggers with the error that occurred during effect execution and the argument passed during the call.

- **Type**

```ts
interface Effect<Params, any, Fail> {
  fail: Event<{ params: Params; error: Fail }>;
}
```

- **Examples**

```js
import { createEffect } from "effector";

const fx = createEffect(async (value) => {
  throw Error(value - 1);
});

fx.fail.watch(({ params, error }) => {
  console.log("Call with argument", params, "failed with error", error.message);
});

fx(2);
// => Call with argument 2 failed with error 1
```

[Run example](https://share.effector.dev/5xHVmzIJ).

---

### `.failData` (#failData-property)

[Derived event][eventTypes] that triggers with the error that occurred during effect execution.

- **Type**

```ts
interface Effect<any, any, Fail> {
  failData: Event<Fail>;
}
```

- **Examples**

```js
import { createEffect } from "effector";

const fx = createEffect(async (value) => {
  throw Error(value - 1);
});

fx.failData.watch((error) => {
  console.log(`Call failed with error ${error.message}`);
});

fx(2);
// => Call failed with error 1
```

[Run example](https://share.effector.dev/i5ktYSqM).

---

### `.finally` (#finally-property)

[Derived event][eventTypes] that triggers on both success and failure of effect completion with detailed information about arguments, results, and execution status.

- **Type**

```ts
interface Effect<Params, Done, Fail> {
  finally: Event<
    | {
        status: "done";
        params: Params;
        result: Done;
      }
    | {
        status: "fail";
        params: Params;
        error: Fail;
      }
  >;
}
```

- **Examples**

```js
import { createEffect } from "effector";

const fetchApiFx = createEffect(async ({ time, ok }) => {
  await new Promise((resolve) => setTimeout(resolve, time));

  if (ok) {
    return `${time} ms`;
  }

  throw Error(`${time} ms`);
});

fetchApiFx.finally.watch((value) => {
  switch (value.status) {
    case "done":
      console.log("Call with argument", value.params, "completed with value", value.result);
      break;
    case "fail":
      console.log("Call with argument", value.params, "failed with error", value.error.message);
      break;
  }
});

await fetchApiFx({ time: 100, ok: true });
// => Call with argument {time: 100, ok: true} completed with value 100 ms

fetchApiFx({ time: 100, ok: false });
// => Call with argument {time: 100, ok: false} failed with error 100 ms
```

[Run example](https://share.effector.dev/Oqvy2x35).

---

### `.pending` (#pending-property)

[Derived store][storeTypes] that shows whether the effect is currently executing.

- **Type**

```ts
interface Effect<any, any> {
  pending: Store<boolean>;
}
```

- **Detailed description**

This property eliminates the need to write code like this:

```js
const $isRequestPending = createStore(false)
  .on(requestFx, () => true)
  .on(requestFx.done, () => false)
  .on(requestFx.fail, () => false);
```

- **Examples**

```jsx
import React from "react";
import { createEffect } from "effector";
import { useUnit } from "effector-react";

const fetchApiFx = createEffect(async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
});

fetchApiFx.pending.watch(console.log);
// => false

const App = () => {
  const loading = useUnit(fetchApiFx.pending);
  return <div>{loading ? "Loading..." : "Loading complete"}</div>;
};

fetchApiFx(1000);
// => true
// => false
```

[Run example](https://share.effector.dev/YX24VysD).

---

### `.inFlight` (#inFlight-property)

[Derived store][storeTypes] that shows the number of running effects that are currently executing. Can be used to limit the number of concurrent requests.

- **Type**

```ts
interface Effect<any, any> {
  inFlight: Store<number>;
}
```

- **Detailed description**

This property eliminates the need to write code like this:

```js
const $requestsInFlight = createStore(0)
  .on(requestFx, (n) => n + 1)
  .on(requestFx.done, (n) => n - 1)
  .on(requestFx.fail, (n) => n - 1);
```

- **Examples**

```js
import { createEffect } from "effector";

const fx = createEffect(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
});

fx.inFlight.watch((amount) => {
  console.log("requests in flight:", amount);
});
// => requests in flight: 0

const req1 = fx();
// => requests in flight: 1

const req2 = fx();
// => requests in flight: 2

await Promise.all([req1, req2]);

// => requests in flight: 1
// => requests in flight: 0
```

[Run example](https://share.effector.dev/ADD0M4NV).

---

### `.sid` (#sid-property)

Unique unit identifier. It's important to note that SID doesn't change on each application run, it's statically written into your application bundle for absolute unit identification. Set automatically through [Babel plugin](/en/api/effector/babel-plugin).

- **Type**

```ts
interface Effect<any, any> {
  sid: string | null;
}
```

---

### `.shortName` (#shortName-property)

String property containing the variable name in which the effect was declared. Effect name. Set either explicitly through the `name` field in [createEffect](/en/api/effector/createEffect), or automatically through [babel plugin](/en/api/effector/babel-plugin).

- **Type**

```ts
interface Effect<any, any> {
  shortName: string;
}
```

---

### `.compositeName` (#compositeName-property)

Composite effect name (including domain and short name) — useful for logging and tracing.

- **Type**

```ts
interface Effect<any, any> {
  compositeName: {
    shortName: string;
    fullName: string;
    path: Array<string>;
  };
}
```

- **Examples**

```ts
import { createEffect, createDomain } from "effector";

const first = createEffect();
const domain = createDomain();
const second = domain.createEffect();

console.log(first.compositeName);
// {
//     "shortName": "first",
//     "fullName": "first",
//     "path": [
//         "first"
//      ]
// }

console.log(second.compositeName);
// {
//     "shortName": "second",
//     "fullName": "domain/second",
//     "path": [
//         "domain",
//         "second"
//      ]
// }
```

## Related API and Articles (#related-api-and-docs-to-effect)

- **API**
  - [`createEffect`](/en/api/effector/createEffect) - Creating a new effect
  - [`Event API`](/en/api/effector/Event) - Description of events, their methods and properties
  - [`Store API`](/en/api/effector/Store) - Description of stores, their methods and properties
  - [`sample`](/en/api/effector/sample) - Key operator for building connections between units
  - [`attach`](/en/api/effector/attach) - Creates new effects based on other effects
- **Articles**
  - [Working with effects](/en/essentials/work-with-async)
  - [How to type effects and other units](/en/essentials/typescript)
  - [Guide to testing effects and other units](/en/guides/testing)
