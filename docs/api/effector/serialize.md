---
id: serialize
title: serialize
hide_title: true
---

# serialize

```ts
serialize(scope: Scope, { ignore?: Array<Store<any>> }): {[sid: string]: any}
```

A companion method for [_hydrate_](hydrate). Allows to get a serialized value for all the store states within a forked domain. The main purpose is an application state serialization on the server side during SSR.

### Arguments

1. `scope` [_Scope_](fork): a scope object (forked instance)
2. `ignore` Optional array of [_Store_](Store.md) to be omited during serialization

### Returns
An object with store values using sids as a keys

### Example

Serialize forked instance state

```js try
import { createStore, createDomain, fork, serialize } from 'effector'

const domain = createDomain()
const store = domain.createStore(42)
const scope = fork(domain)
console.log(serialize(scope)) // => {[sid]: 42}

```

[Try it](https://share.effector.dev/Qb2ywYqo)