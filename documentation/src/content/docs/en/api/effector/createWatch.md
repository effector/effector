---
title: createWatch
redirectFrom:
  - /docs/api/effector/createwatch
---

# `createWatch(config)` {#createWatch-config}

Creates a subscription on unit (store, event or effect).

## Formulae {#createWatch-config-formulae}

```ts
createWatch<T>(config: {
  unit: Unit<T>
  fn: (payload: T) => void
  scope?: Scope
}): Subscription
```

## Arguments {#createWatch-config-arguments}

1. `config` (_Object_): Configuration
   - `unit` (_Unit_): Target unit (store, event of effect) that will be watched
   - `fn` (_Function_): Function that will be called when unit is triggered. Accepts unit payload as the first argument.
   - `scope` ([_Scope_](/en/api/effector/Scope)): An optional scope object (forked instance) to restrict watcher calls on particular scope.

## Returns {#createWatch-config-returns}

[_Subscription_](/en/explanation/glossary#subscription): Unsubscribe function

## Examples {#createWatch-config-examples}

### With scope {#createWatch-config-examples-scope}

```js
import { createWatch, createEvent, fork, allSettled } from "effector";

const changeName = createEvent();

const scope = fork();

const unwatch = createWatch({ unit: changeName, scope, fn: console.log });

await allSettled(changeName, { scope, params: "John" }); // output: John
changeName("John"); // no output
```

### Without scope {#createWatch-config-examples-no-scope}

```js
import { createWatch, createEvent, fork, allSettled } from "effector";

const changeName = createEvent();

const scope = fork();

const unwatch = createWatch({ unit: changeName, fn: console.log });

await allSettled(changeName, { scope, params: "John" }); // output: John
changeName("John"); // output: John
```
