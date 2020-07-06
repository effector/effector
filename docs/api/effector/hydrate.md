---
id: hydrate
title: hydrate
hide_title: true
---

# hydrate

```ts
hydrate(domain: Domain, { values: Map<Store<any>, any> | {[sid: string]: any} }): void
```

A companion method for [_serialize_](serialize). Hydrates provided values into corresponding stores within a provided domain. The main purpose is an application state hydration on the client side after SSR.

### Arguments

1. `domain`: a [_Domain_](Domain.md) object
2. `values`: a mapping from store sids to store values or a Map where keys are [_Store_](Store.md) objects and values contains initial store value

### Example

Populate store with a predefined value

```js
import {createStore, createDomain, fork, serialize, hydrate} from 'effector'

const domain = createDomain()
const store = domain.createStore(0)

hydrate(domain, {
  values: {
    [store.sid]: 42,
  },
})

console.log(store.getState()) // 42
```

[Try it](https://share.effector.dev/zZoQ5Ewm)
