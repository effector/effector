---
title: attach
description: Wrapper for effect, which allows to map effect arguments and use data from stores.
redirectFrom:
  - /api/effector/attach
  - /docs/api/effector/attach
---

```ts
import { attach } from "effector";
```

:::info{title="since"}
Available since [effector 20.13.0](https://changelog.effector.dev/#effector-20-13-0).

Since [effector 22.4.0](https://changelog.effector.dev/#effector-encke-22-4-0), it is available to check whether effect is created via `attach` method — [is.attached](/en/api/effector/is#is-attached).
:::

Creates new [effects](/en/api/effector/Effect) based on the other effects, [stores](/en/api/effector/Store). Allows mapping params and handling errors.

Use cases: declarative way to pass values from stores to effects and argument preprocessing. Most useful case is `attach({ source, async effect })`.

:::tip
The attached effects are the same first-class citizens as the regular effects made by [createEffect](/en/api/effector/createEffect). You should place them in the same files as regular effects, also you can use the same naming strategy.
:::

# Methods (#methods)

## `attach({effect})` (#methods-attach-effect)

:::info{title="since"}
[effector 21.5.0](https://changelog.effector.dev/#effector-21-5-0)
:::

Create effect which will call `effect` with params as it is. That allows creating separate effects with shared behavior.

### Formulae (#methods-attach-effect-formulae)

```ts
const attachedFx = attach({ effect: originalFx });
```

- When `attachedFx` is triggered, then `originalFx` is triggered too
- When `originalFx` is finished (fail/done), then `attachedFx` must be finished with the same state.

### Arguments (#methods-attach-effect-arguments)

- `effect` ([_Effect_](/en/api/effector/Effect)): Wrapped effect

### Returns (#methods-attach-effect-returns)

[_Effect_](/en/api/effector/Effect): New effect

### Types (#methods-attach-effect-types)

```ts
const originalFx: Effect<Params, Done, Fail>;

const attachedFx: Effect<Params, Done, Fail> = attach({
  effect: originalFx,
});
```

In case of this simple variant of `attach`, types of `originalFx` and `attachedFx` will be the same.

### Examples (#methods-attach-effect-examples)

It allows to create _local_ copy of the effect, to react only on triggers emitted from the current _local_ code.

```ts
import { createEffect, attach } from "effector";

const originalFx = createEffect((word: string) => {
  console.info("Printed:", word);
});

const attachedFx = attach({ effect: originalFx });

originalFx.watch(() => console.log("originalFx"));
originalFx.done.watch(() => console.log("originalFx.done"));

attachedFx.watch(() => console.log("attachedFx"));
attachedFx.done.watch(() => console.log("attachedFx.done"));

originalFx("first");
// => originalFx
// => Printed: first
// => originalFx.done

attachedFx("second");
// => attachedFx
// => originalFx
// Printed: second
// => originalFx.done
// => attachedFx.done
```

[Try it](https://share.effector.dev/7Uhk4XfW)

## `attach({source, effect})` (#methods-attach-source-effect)

Create effect which will trigger given one with values from `source` stores.

### Formulae (#methods-attach-source-effect-formulae)

```ts
const attachedFx = attach({
  source,
  effect: originalFx,
});
```

- When `attachedFx` is triggered, read data from `source`, trigger with the data `originalFx`
- When `originalFx` is finished, pass the same resolution (done/fail) into `attachedFx` and finish it

### Arguments (#methods-attach-source-effect-arguments)

- `source` ([_Store_](/en/api/effector/Store) | `{[key: string]: Store}`): Store or object with stores, values of which will be passed to the second argument of `mapParams`
- `effect` ([_Effect_](/en/api/effector/Effect)): Original effect

### Returns (#methods-attach-source-effect-returns)

[_Effect_](/en/api/effector/Effect): New effect

### Types (#methods-attach-source-effect-types)

:::tip
You don't need to explicitly set types for each declaration. The purpose of the following example is to provide a clear understanding.
:::

In most userland code you will write code like this, without explicit types of the `let`/`const`:

```ts
const originalFx = createEffect<OriginalParams, SomeResult, SomeError>(async () => {});
const $store = createStore(initialValue);

const attachedFx = attach({
  source: $store,
  effect: originalFx,
});
```

#### Single store

```ts
const originalFx: Effect<T, Done, Fail>;
const $store: Store<T>;

const attachedFx: Effect<void, Done, Fail> = attach({
  source: $store,
  effect: originalFx,
});
```

[Try it](https://tsplay.dev/NBJDDN)

Types of the `source` store and `effect` params must be the same.
But the `attachedFx` will omit the type of params, it means the attached effect not requires any params at all.

#### Shape of stores

```ts
const originalFx: Effect<{ a: A; b: B }, Done, Fail>;
const $a: Store<A>;
const $b: Store<B>;

const attachedFx: Effect<void, Done, Fail> = attach({
  source: { a: $a, b: $b },
  effect: originalFx,
});
```

[Try it](https://tsplay.dev/mbE58N)

Types of the `source` object must be the same as `originalFx` params. But the `attachedFx` will omit the type of params, it means the attached effect not requires any params at all.

### Examples (#methods-attach-source-effect-examples)

```ts
const requestPageFx = createEffect<{ page: number; size: number }, string[]>(
  async ({ page, size }) => {
    console.log("Requested", page);
    return page * size;
  },
);

const $page = createStore(1);
const $size = createStore(20);

const requestNextPageFx = attach({
  source: { page: $page, size: $size },
  effect: requestPageFx,
});

$page.on(requestNextPageFx.done, (page) => page + 1);

requestPageFx.doneData.watch((position) => console.log("requestPageFx.doneData", position));

await requestNextPageFx();
// => Requested 1
// => requestPageFx.doneData 20

await requestNextPageFx();
// => Requested 2
// => requestPageFx.doneData 40

await requestNextPageFx();
// => Requested 3
// => requestPageFx.doneData 60
```

[Try it](https://share.effector.dev/FGqlrrnw)

## `attach({source, async effect})` (#methods-attach-source-async-effect)

:::info{title="since"}
[effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0)
:::

Creates effect which will call async function with values from the `source` stores.

### Formulae (#methods-attach-source-async-effect-formulae)

```ts
const attachedFx = attach({
  source,
  async effect(source, params) {},
});
```

- When `attachedFx` is triggered, read data from the `source`, call `effect` function.
- When `effect` function returns resolved `Promise`, finish `attachedFx` with the data from the function as `attachedFx.done`.
- When `effect` throws exception, or returns rejected `Promise`, finish `attachedFx` with the data from function as `attachedFx.fail`.

### Arguments (#methods-attach-source-async-effect-arguments)

- `effect` (_Function_): `(source: Source, params: Params) => Promise<Result> | Result`
- `source` ([_Store_](/en/api/effector/Store) | `{[key: string]: Store}`): Store or object with stores, values of which will be passed to the first argument of `effect`

### Returns (#methods-attach-source-async-effect-returns)

[_Effect_](/en/api/effector/Effect): New effect

### Usage with scope (#methods-attach-source-async-effect-scope)

Any effects called inside `async effect` function will propagate scope.

```ts
const outerFx = createEffect((count: number) => {
  console.log("Hit", count);
});

const $store = createStore(0);
const attachedFx = attach({
  source: $store,
  async effect(count, _: void) {},
});
```

**Scope is lost** if there are any asynchronous function calls made:

```ts
const attachedFx = attach({
  source: $store,
  async effect(source) {
    // Here is ok, the effect is called
    const resultA = await anotherFx();

    // Be careful:
    const resultB = await regularFunction();
    // Here scope is lost.
  },
});
```

To solve this case, you need to just wrap your `regularFunction` into effect:

```ts
const regularFunctionFx = createEffect(regularFunction);
```

### Types (#methods-attach-source-async-effect-types)

#### Single store (#methods-attach-source-async-effect-types-single-store)

```ts
const $store: Store<T>;

const attachedFx: Effect<Params, Done, Fail> = attach({
  source: $store,
  async effect(source, params: Params): Done | Promise<Done> {},
});
```

You need to type explicitly only `params` argument. All other types of arguments should be inferred automatically. Also, you may want to explicitly set the return type of the `effect` function.

If you want to remove any arguments from the `attachedFx` you need to just remove second argument from `effect` function:

```ts
const attachedFx: Effect<void, void, Fail> = attach({
  source: $store,
  async effect(source) {},
});
```

#### Multiple stores (#methods-attach-source-async-effect-types-multiple-stores)

:::tip
For details review [previous section of types](#methods-attach-source-async-effect-types). Here the same logic.
:::

```ts
// Userland example, without explicit type declarations
const $foo = createStore(100);
const $bar = createStore("demo");

const attachedFx = attach({
  source: { foo: $foo, bar: $bar },
  async effect({ foo, bar }, { baz }: { baz: boolean }) {
    console.log("Hit!", { foo, bar, baz });
  },
});

attachedFx({ baz: true });
// => Hit! { foo: 100, bar: "demo", baz: true }
```

[Try it](https://tsplay.dev/m3xjbW)

### Example (#methods-attach-source-async-effect-example)

:::warning{title="TBD"}
Please, open pull request via "Edit this page" link.
:::

## `attach({effect, mapParams})` (#methods-attach-effect-mapParams)

Creates effect which will trigger given one by transforming params by `mapParams` function.

### Formulae (#methods-attach-effect-mapParams-formulae)

```ts
const attachedFx = attach({
  effect: originalFx,
  mapParams,
});
```

- When `attachedFx` triggered, payload passed into `mapParams` function, then the result of it passed into `originalFx`
- When `originalFx` is finished, then `attachedFx` must be finished with the same resolution (done/fail).
- If `mapParams` throws an exception, then `attachedFx` must be finished with the error as `attachedFx.fail`. But `originalFx` will not be triggered at all.

### Arguments (#methods-attach-effect-mapParams-arguments)

- `effect` ([_Effect_](/en/api/effector/Effect)): Wrapped effect
- `mapParams` (`(newParams) => effectParams`): Function which receives new params and maps them to the params of the wrapped `effect`. Works mostly like [event.prepend](/en/api/effector/Event#prepend-fn). Errors happened in `mapParams` function will force attached effect to fail.

### Returns (#methods-attach-effect-mapParams-returns)

[_Effect_](/en/api/effector/Effect): New effect

### Types (#methods-attach-effect-mapParams-types)

```ts
const originalFx: Effect<A, Done, Fail>;

const attachedFx: Effect<B, Done, Fail> = attach({
  effect: originalFx,
  mapParams: (params: B): A {},
});
```

`mapParams` must return the same type `originalFx` receives as params.

If `attachedFx` must be called without any arguments, then `params` can be safely removed from the `mapParams`:

```ts
const attachedFx: Effect<void, Done, Fail> = attach({
  effect: originalFx,
  mapParams: (): A {},
});
```

[Try it](https://tsplay.dev/wXOYoW)

But if `mapParams` function throws an exception, it is on your own to check types compatibility, because of TypeScript.

```ts
const attachedFx: Effect<void, Done, Fail> = attach({
  effect: originalFx,
  mapParams: (): A {
    throw new AnyNonFailType(); // It can be noncompatible with `Fail` type
  },
});
```

### Examples (#methods-attach-effect-mapParams-examples)

#### Map arguments (#methods-attach-effect-mapParams-examples-map-arguments)

```ts
const originalFx = createEffect<{ input: number }, void>((a) => a);

const attachedFx = attach({
  effect: originalFx,
  mapParams(a: number) {
    return { input: a * 100 };
  },
});

originalFx.watch((params) => console.log("originalFx", params));

attachedFx(1);
// => originalFx { input: 100 }
```

[Try it](https://share.effector.dev/TFRlrmhm)

#### Handle exceptions (#methods-attach-effect-mapParams-examples-handle-exceptions)

```ts
const originalFx = createEffect<{ a: number }, void>((a) => a);

const attachedFx = attach({
  effect: originalFx,
  mapParams(a: number) {
    throw new Error("custom error");
    return { a };
  },
});

attachedFx.failData.watch((error) => console.log("attachedFx.failData", error));

attachedFx(1);
// => attachedFx.failData
// =>   Error: custom error
```

[Try it](https://share.effector.dev/VYvWQoOk)

## `attach({source, mapParams, effect})` (#methods-attach-source-mapParams-effect)

Creates effect which will read values from `source` stores, pass them with params to `mapParams` function and then call `effect` with the result.

### Formulae (#methods-attach-source-mapParams-effect-formulae)

:::tip{title="Note"}
This variant of `attach` mostly works like the [attach({effect, mapParams})](#methods-attach-effect-mapParams). The same things are omitted from this section.
:::

```ts
const attachedFx = attach({
  source,
  mapParams,
  effect: originalFx,
});
```

- When `attachedFx` triggered, payload passed into `mapParams` function with value from `source` store, then the result of it passed into `originalFx`
- When `originalFx` is finished, then `attachedFx` must be finished with the same resolution (done/fail).
- If `mapParams` throws an exception, then `attachedFx` must be finished with the error as `attachedFx.fail`. But `originalFx` will not be triggered at all.

### Arguments (#methods-attach-source-mapParams-effect-arguments)

- `source` ([_Store_](/en/api/effector/Store) | `{[key: string]: Store}`): Store or object with stores, values of which will be passed to the second argument of `mapParams`
- `mapParams` (`(newParams, values) => effectParams`): Function which receives new params and current value of `source` and combines them to the params of the wrapped `effect`. Errors happened in `mapParams` function will force attached effect to fail
- `effect` ([_Effect_](/en/api/effector/Effect)): Wrapped effect

### Returns (#methods-attach-source-mapParams-effect-returns)

[_Effect_](/en/api/effector/Effect): New effect

### Types (#methods-attach-source-mapParams-effect-types)

:::warning{title="TBD"}
Please, open pull request via "Edit this page" link.
:::

### Examples (#methods-attach-source-mapParams-effect-examples)

#### With factory (#methods-attach-source-mapParams-effect-example-with-factory)

```ts
// ./api/request.ts
import { createEffect, createStore } from "effector";

export const backendRequestFx = createEffect(async ({ token, data, resource }) => {
  return fetch(`https://example.com/api${resource}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
});

export const $requestsSent = createStore(0);

$requestsSent.on(backendRequestFx, (total) => total + 1);
```

```ts
// ./api/authorized.ts
import { attach, createStore } from "effector";

const $token = createStore("guest_token");

export const authorizedRequestFx = attach({
  effect: backendRequestFx,
  source: $token,
  mapParams: ({ data, resource }, token) => ({ data, resource, token }),
});

export function createRequest(resource) {
  return attach({
    effect: authorizedRequestFx,
    mapParams: (data) => ({ data, resource }),
  });
}
```

```ts
// ./api/index.ts
import { createRequest } from "./authorized";
import { $requestsSent } from "./request";

const getUserFx = createRequest("/user");
const getPostsFx = createRequest("/posts");

$requestsSent.watch((total) => {
  console.log(`client analytics: sent ${total} requests`);
});

const user = await getUserFx({ name: "alice" });
/*
POST https://example.com/api/user
{"name": "alice"}
Authorization: Bearer guest_token
*/

// => client analytics: sent 1 requests

const posts = await getPostsFx({ user: user.id });
/*
POST https://example.com/api/posts
{"user": 18329}
Authorization: Bearer guest_token
*/

// => client analytics: sent 2 requests
```

To allow factory works correct, add a path to a `./api/authorized` into `factories` option for Babel plugin:

```json5
// .babelrc
{
  plugins: [
    [
      "effector/babel-plugin",
      {
        factories: ["src/path-to-your-entity/api/authorized"],
      },
    ],
  ],
}
```

## Parameters (#attach-parameters)

`attach()` also receives extra parameters, you can use it when you need.

### `name` (#attach-parameters-name)

```ts
attach({ name: string });
```

It allows us to explicitly set the name of the created attached effect:

```ts
import { attach } from "effector";

const attachedFx = attach({
  name: "anotherUsefulName",
  source: $store,
  async effect(source, params: Type) {
    // ...
  },
});

attachedFx.shortName; // "anotherUsefulName"
```

This parameter exists in **any variant** of the `attach`.

### `domain` (#attach-parameters-domain)

```ts
attach({ domain: Domain });
```

It allows to create effect inside specified domain.

> Note: this property can only be used with a plain function `effect`.

```ts
import { createDomain, createStore, attach } from "effector";

const reportErrors = createDomain();
const $counter = createStore(0);

const attachedFx = attach({
  domain: reportErrors,
  source: $counter,
  async effect(counter) {
    // ...
  },
});
```
