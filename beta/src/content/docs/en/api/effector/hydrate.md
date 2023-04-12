---
title: hydrate
redirectFrom:
  - /api/effector/hydrate
  - /docs/api/effector/hydrate
---

A companion method for [_serialize_](/en/api/effector/serialize). Hydrates provided values into corresponding stores within a provided domain or scope. The main purpose is an application state hydration on the client side after SSR.

## Formulae {#hydrate-formulae}

```ts
hydrate(domainOrScope: Domain | Scope, { values: Map<Store<any>, any> | {[sid: string]: any} }): void
```

### Arguments {#hydrate-args}

1. `domainOrScope`: [domain](/en/api/effector/Domain) or [scope](/en/api/effector/Scope) which will be filled with given `values`
2. `values`: a mapping from store sids to store values or a Map where keys are [store](/en/api/effector/Store) objects and values contains initial store value

:::warning
You need to make sure that the store is created beforehand, otherwise, the hydration might fail. This could be the case, if you store initialization / hydration scripts separate from stores' creation.
:::

## Example {#hydrate-example}

Populate store with a predefined value

```js
import { createStore, createDomain, fork, serialize, hydrate } from "effector";

const domain = createDomain();
const $store = domain.createStore(0);

hydrate(domain, {
  values: {
    [$store.sid]: 42,
  },
});

console.log($store.getState()); // 42
```

[Try it](https://share.effector.dev/zZoQ5Ewm)
