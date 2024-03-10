---
title: Effect
description: Effect, its methods and properties
redirectFrom:
  - /api/effector/Effect
  - /docs/api/effector/effect
---

```ts
import { type Effect } from "effector";
```

**Effect** is a container for async function or any throwing function.

It can be safely used in place of the original async function.

# Methods (#methods)

## `.use(handler)` (#methods-use-handler)

Provides a function, which will be called when the effect is triggered.

### Formulae (#methods-use-handler-formulae)

```ts
effect.use(fn);
```

- Set handler `fn` for `effect`
- If effect already had an implementation at the time of the call, it will be replaced by a new one

> Hint: current handler can be extracted with [effect.use.getCurrent()](#methods-use-getCurrent).

You must provide a handler either through [.use](#methods-use-handler) method or `handler` property in [createEffect](/en/api/effector/createEffect), otherwise effect will throw with `no handler used in _%effect name%_` error when effect will be called.

:::tip{title="See also"}
[Testing api calls with effects and stores](https://www.patreon.com/posts/testing-api-with-32415095)
:::

### Arguments (#methods-use-handler-arguments)

1. `handler` (_Function_): Function, that receives the first argument passed to an effect call.

### Returns (#methods-use-handler-returns)

([_Effect_](/en/api/effector/Effect)): The same effect

### Examples (#methods-use-handler-examples)

```js
const fetchUserReposFx = createEffect();

fetchUserReposFx.use(async (params) => {
  console.log("fetchUserReposFx called with", params);

  const url = `https://api.github.com/users/${params.name}/repos`;
  const req = await fetch(url);
  return req.json();
});

fetchUserReposFx({ name: "zerobias" });
// => fetchUserRepos called with {name: 'zerobias'}
```

[Try it](https://share.effector.dev/TlYuDeve)

## `.use.getCurrent()` (#methods-use-getCurrent)

Returns current handler of effect. Useful for testing.

### Formulae (#methods-use-getCurrent-formulae)

```ts
fn = effect.use.getCurrent();
```

- Returns current handler `fn` for `effect`
- If no handler was assigned to `effect`, default handler will be returned ([that throws an error](https://share.effector.dev/8PBjt3TL))

> Hint: to set a new handler use [effect.use(handler)](#methods-use-handler)

### Returns (#methods-use-getCurrent-returns)

(_Function_): Current handler, defined by `handler` property or via `.use` call.

### Examples (#methods-use-getCurrent-examples)

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

[Try it](https://share.effector.dev/CM6hgtOM)

## `.watch(watcher)` (#methods-watch-watcher)

Subscribe to effect calls.

### Formulae (#methods-watch-watcher-formulae)

```ts
const unwatch = effect.watch(watcher);
```

- Call `watcher` on each `effect` call, pass payload of `effect` as argument to `watcher`
- When `unwatch` is called, stop calling `watcher`

### Arguments (#methods-watch-watcher-arguments)

1. `watcher` ([_Watcher_](/en/explanation/glossary#watcher)): A function that receives `payload`.

### Returns (#methods-watch-watcher-returns)

[_Subscription_](/en/explanation/glossary#subscription): Unsubscribe function.

### Examples (#methods-watch-watcher-examples)

```js
import { createEffect } from "effector";

const fx = createEffect((params) => params);

fx.watch((params) => {
  console.log("effect called with value", params);
});

await fx(10);
// => effect called with value 10
```

[Try it](https://share.effector.dev/VN1ef0TZ)

## `.prepend(fn)` (#methods-prepend-fn)

Creates an event, upon trigger it sends transformed data into the source event.
Works kind of like reverse `.map`.
In case of `.prepend` data transforms **before the original event occurs** and in the case of `.map`, data transforms **after original event occurred**.

### Formulae (#methods-prepend-fn-formulae)

```ts
const event = effect.prepend(fn);
```

- When `event` is triggered, call `fn` with payload from `event`, then trigger `effect` with the result of `fn()`
- `event` will have `EventCallable<T>` type, so can be used as `target` in methods like `sample()`

### Arguments (#methods-prepend-fn-arguments)

1. `fn` (_Function_): A function that receives `payload`, [should be **pure**](/en/explanation/glossary#purity).

### Returns (#methods-prepend-fn-returns)

[_Event_](/en/api/effector/Event): New event.

## `.map(fn)` (#methods-map-fn)

Creates a new event, which will be called after the original effect is called, applying the result of a `fn` as a payload. It is a special function which allows you to decompose dataflow, extract or transform data.

### Formulae (#methods-map-fn-formulae)

```ts
const second = first.map(fn);
```

- When `first` is triggered, pass payload from `first` to `fn`
- Trigger `second` with the result of the `fn()` call as payload
- `second` event will have `Event<T>` type, so it CAN NOT be used as `target` in methods like `sample()`

### Arguments (#methods-map-fn-arguments)

1. `fn` (_Function_): A function that receives `payload`, [should be **pure**](/en/explanation/glossary#purity).

### Returns (#methods-map-fn-returns)

[_Event_](/en/api/effector/Event): New event.

### Examples (#methods-map-fn-examples)

```js
import { createEffect } from "effector";

const userUpdate = createEffect(({ name, role }) => {
  console.log(name, role);
});
const userNameUpdated = userUpdate.map(({ name }) => name); // you may decompose dataflow with .map() method
const userRoleUpdated = userUpdate.map(({ role }) => role.toUpperCase()); // either way you can transform data

userNameUpdated.watch((name) => console.log(`User's name is [${name}] now`));
userRoleUpdated.watch((role) => console.log(`User's role is [${role}] now`));

await userUpdate({ name: "john", role: "admin" });
// => User's name is [john] now
// => User's role is [ADMIN] now
// => john admin
```

[Try it](https://share.effector.dev/MmBBKXZe)

# Properties (#properties)

You are not supposed to use parts of effect (like `.done` and `.pending`) as a `target` in [sample](/en/api/effector/sample) (even though they are events and stores), since effect is a complete entity on its own. This behavior will not be supported.

In the examples below constant `effect` has this signature:

```ts
effect: Effect<Params, Done, Fail>;
```

## `.done` Event (#properties-done)

[_Event_](/en/api/effector/Event), which is triggered when _handler_ is _resolved_.

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on effect.
:::

### Formulae (#properties-done-formulae)

```ts
effect.done: Event<{ params: Params; done: Done }>;
```

### Properties (#properties-done-properties)

Event triggered with an object of `params` and `result`:

1. `params` (_Params_): An argument passed to the effect call
2. `result` (_Done_): A result of the resolved handler

### Examples (#properties-done-examples)

```js
import { createEffect } from "effector";

const fx = createEffect((value) => value + 1);

fx.done.watch(({ params, result }) => {
  console.log("Call with params", params, "resolved with value", result);
});

await fx(2);
// => Call with params 2 resolved with value 3
```

[Try it](https://share.effector.dev/VogsNaDn)

## `.doneData` Event (#properties-doneData)

:::info{title="since"}
[effector 20.12.0](https://changelog.effector.dev/#effector-20-12-0)
:::

Event, which is triggered by the result of the effect execution.

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on the effect.
:::

### Formulae (#properties-doneData-formulae)

```ts
effect.doneData: Event<Done>;
```

- `doneData` is an event, that triggered when `effect` is successfully resolved with `result` from [.done](#properties-done)

[_Event_](/en/api/effector/Event) triggered when _handler_ is _resolved_.

### Examples (#properties-doneData-examples)

```js
import { createEffect } from "effector";

const fx = createEffect((value) => value + 1);

fx.doneData.watch((result) => {
  console.log(`Effect was successfully resolved, returning ${result}`);
});

await fx(2);
// => Effect was successfully resolved, returning 3
```

[Try it](https://share.effector.dev/rNesMDtw)

## `.fail` Event (#properties-fail)

[_Event_](/en/api/effector/Event), which is triggered when handler is rejected or throws error.

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on effect.
:::

### Formulae (#properties-fail-formulae)

```ts
effect.fail: Event<{ params: Params; error: Fail }>;
```

### Properties (#properties-fail-properties)

Event triggered with an object of `params` and `error`:

1. `params` (_Params_): An argument passed to effect call
2. `error` (_Fail_): An error caught from the handler

### Examples (#properties-fail-examples)

```js
import { createEffect } from "effector";

const fx = createEffect(async (value) => {
  throw Error(value - 1);
});

fx.fail.watch(({ params, error }) => {
  console.log("Call with params", params, "rejected with error", error.message);
});

fx(2);
// => Call with params 2 rejected with error 1
```

[Try it](https://share.effector.dev/hCPCHQ5N)

## `.failData` Event (#properties-failData)

:::info{title="since"}
[effector 20.12.0](https://changelog.effector.dev/#effector-20-12-0)
:::

Event, which is triggered with error thrown by the effect.

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on effect.
:::

### Formulae (#properties-failData-formulae)

```ts
effect.failData: Event<Fail>;
```

- `failData` is an event, that triggered when `effect` is rejected with `error` from [.fail](#properties-fail)

[_Event_](/en/api/effector/Event) triggered when handler is rejected or throws error.

### Examples (#properties-failData-examples)

```js
import { createEffect } from "effector";

const fx = createEffect(async (value) => {
  throw Error(value - 1);
});

fx.failData.watch((error) => {
  console.log(`Execution failed with error ${error.message}`);
});

fx(2);
// => Execution failed with error 1
```

[Try it](https://share.effector.dev/rNU3tqEx)

## `.finally` Event (#properties-finally)

:::info{title="since"}
[effector 20.0.0](https://changelog.effector.dev/#effector-20-0-0)
:::

Event, which is triggered when handler is resolved, rejected or throws error.

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on effect.
:::

### Properties (#properties-finally-properties)

```ts
type Success = { status: 'done'; params: Params; result: Done }
type Failure = { status: 'fail'; params: Params; error: Fail }

effect.finally: Event<Success | Failure>;
```

### Properties (#properties-finally-properties)

[_Event_](/en/api/effector/Event), which is triggered with an object of `status`, `params` and `error` or `result`:

1. `status` (_string_): A status of effect (`done` or `fail`)
2. `params` (_Params_): An argument passed to effect call
3. `error` (_Fail_): An error caught from the handler
4. `result` (_Done_): A result of the resolved handler

### Examples (#properties-finally-examples)

```js
import { createEffect } from "effector";

const fetchApiFx = createEffect(async ({ time, ok }) => {
  await new Promise((resolve) => setTimeout(resolve, time));
  if (ok) return `${time} ms`;
  throw Error(`${time} ms`);
});

fetchApiFx.finally.watch((value) => {
  switch (value.status) {
    case "done":
      console.log("Call with params", value.params, "resolved with value", value.result);
      break;
    case "fail":
      console.log("Call with params", value.params, "rejected with error", value.error.message);
      break;
  }
});

await fetchApiFx({ time: 100, ok: true });
// => Call with params {time: 100, ok: true}
//    resolved with value 100 ms

fetchApiFx({ time: 100, ok: false });
// => Call with params {time: 100, ok: false}
//    rejected with error 100 ms
```

[Try it](https://share.effector.dev/f90vETOc)

## `.pending` Store (#properties-pending)

Store contains `true` when effect is called but not resolved yet. Useful to show loaders.

:::warning{title="Important"}
Do not modify store value! It is [derived store](/en/api/effector/Store#readonly) and should be in predictable state.
:::

### Formulae (#properties-pending-formulae)

```ts
effect.pending: Store<boolean>;
```

- [Store](/en/api/effector/Store) will update when `done` or `fail` are triggered
- [Store](/en/api/effector/Store) contains `true` value until the effect is resolved or rejected

### Returns (#properties-pending-returns)

[_DerivedStore_](/en/api/effector/Store#readonly): Store that represents current state of the effect

### Examples (#properties-pending-examples)

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { createEffect } from "effector";
import { useUnit } from "effector-react";

const fetchApiFx = createEffect((ms) => new Promise((resolve) => setTimeout(resolve, ms)));

fetchApiFx.pending.watch(console.log);

const Loading = () => {
  const loading = useUnit(fetchApiFx.pending);

  return <div>{loading ? "Loading..." : "Load complete"}</div>;
};

ReactDOM.render(<Loading />, document.getElementById("root"));

fetchApiFx(3000);
```

[Try it](https://share.effector.dev/wDMQKqhl)

It's property is a shorthand for common use case:

```js
import { createEffect, createStore } from "effector";

const fetchApiFx = createEffect();

// now you can use fetchApiFx.pending instead
const $isLoading = createStore(false)
  .on(fetchApiFx, () => true)
  .on(fetchApiFx.done, () => false)
  .on(fetchApiFx.fail, () => false);
```

## `.inFlight` Store (#properties-inFlight)

:::info{title="since"}
[effector 20.11.0](https://changelog.effector.dev/#effector-20-11-0)
:::

Shows how many effect calls aren't settled yet. Useful for rate limiting.

:::warning{title="Important"}
Do not modify `$count` value! It is [derived store](/en/api/effector/Store#readonly) and should be in predictable state.
:::

### Formulae (#properties-inFlight-formulae)

```ts
effect.inFlight: Store<number>;
```

- The [store](/en/api/effector/Store) will be `0` if no calls of `effect` in pending state, its default state
- On each call of `effect` state in the store will be increased
- When effect resolves to any state(done or fail) state in the store will be decreased

### Returns (#properties-inFlight-returns)

[_DerivedStore_](/en/api/effector/Store#readonly): Store that represents count of the running effects

### Examples (#properties-inFlight-examples)

```js
import { createEffect } from "effector";

const fx = createEffect(() => new Promise((rs) => setTimeout(rs, 500)));

fx.inFlight.watch((amount) => {
  console.log("in-flight requests:", amount);
});
// => 0

const req1 = fx();
// => 1

const req2 = fx();
// => 2

await Promise.all([req1, req2]);

// => 1
// => 0
```

[Try it](https://share.effector.dev/XsM8fZXa)

# Types (#types)

```ts
import { type EffectParams, type EffectResult, type EffectError } from "effector";
```

## `EffectParams<FX>` (#types-EffectParams)

Allows to extract type of Params from `effect`.

```ts
const effect: Effect<Params, Done, Fail>;
type Params = EffectParams<typeof effect>;
```

## `EffectResult<FX>` (#types-EffectResult)

Allows to extract type of result from `effect`.

```ts
const effect: Effect<Params, Done, Fail>;
type Done = EffectResult<typeof effect>;
```

## `EffectError<FX>` (#types-EffectError)

Allows to extract type of error from `effect`.

```ts
const effect: Effect<Params, Done, Fail>;
type Fail = EffectError<typeof effect>;
```
