---
id: serialize
title: serialize
hide_title: true
---

# Serialize

```ts
serialize(scope: Scope, { ignore?: Array<Store<any>> }): {[sid: string]: any}
```

A companion method for working with [_Scope_](fork.md). Allows to get a serialized value for all the store states within a forked domain. May be used in SSR to collect application state for example.

### Arguments

1. `scope` ([_Scope_](fork.md)): a scope object (forked instance)
2. `ignore` Optional array of [_Store_](Store.md) to be omited during serialization

### Returns
An object with store values using sids as a keys

### Example

Create two instances with indepented counter state

```js try
import { createStore, createDomain, fork, serialized } from 'effector'

const domain = createDomain()
const store = domain.createStore(42)
const scope = fork(domain)
console.log(serialize(scope)) // => {[sid]: 42}

```

[Try it](https://share.effector.dev/En5PT3KV)