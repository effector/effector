---
title: hydrate
redirectFrom:
  - /api/effector/hydrate
  - /docs/api/effector/hydrate
---

```ts
import { hydrate } from "effector";
```

A companion method for [_serialize_](/en/api/effector/serialize). Hydrates provided values into corresponding stores within a provided domain or scope. The main purpose is an application state hydration on the client side after SSR.

# Methods (#methods)

## `hydrate(domainOrScope, {values})` (#methods-hydrate-domainOrScope-values)

:::warning
You need to make sure that the store is created beforehand, otherwise, the hydration might fail. This could be the case if you keep store initialization/hydration scripts separate from stores' creation.
:::

### Formulae (#methods-hydrate-domainOrScope-values-formulae)

```ts
hydrate(domainOrScope: Domain | Scope, { values: Map<Store<any>, any> | {[sid: string]: any} }): void
```

### Arguments (#methods-hydrate-domainOrScope-values-arguments)

1. `domainOrScope`: [domain](/en/api/effector/Domain) or [scope](/en/api/effector/Scope) which will be filled with given `values`
2. `values`: a mapping from store sids to store values or a Map where keys are [store](/en/api/effector/Store) objects and values contain initial store value

### Returns (#methods-hydrate-domainOrScope-values-returns)

`void`

### Examples (#methods-hydrate-domainOrScope-values-examples)

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
