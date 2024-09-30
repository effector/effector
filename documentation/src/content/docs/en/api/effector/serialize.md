---
title: serialize
description: serialize is a method for serializing application states within a scope
redirectFrom:
  - /api/effector/serialize
  - /docs/api/effector/serialize
---

```ts
import { serialize, type Scope } from "effector";
```

# Methods (#methods)

## `serialize(scope, params)` (#methods-serialize)

A companion method for [_fork_](/en/api/effector/fork). It allows us to get a serialized value for all the store states within a [scope](/en/api/effector/Scope). The main purpose is an application state serialization on the server side during SSR.

:::warning{title="Requirements"}
[_Babel plugin_](/en/api/effector/babel-plugin) or [_SWC plugin_](/en/api/effector/swc-plugin) is required for using this method, as these plugins provide the SIDs for stores, which are required for stable state serialization.

You can find deep-dive [explanation here](/en/explanation/sids)
:::

### Formulae (#methods-serialize-formulae)

```ts
serialize(scope: Scope, { ignore?: Array<Store<any>> }): {[sid: string]: any}
```

### Arguments (#methods-serialize-arguments)

1. `scope` [_Scope_](/en/api/effector/Scope): a scope object (forked instance)
2. `ignore` Optional array of [_Store_](/en/api/effector/Store) to be omitted during serialization (added 20.14.0)

### Returns (#methods-serialize-returns)

An object with store values using sids as a keys

:::warning{title="Reminder"}
If a store [does not have a sid](/en/api/effector/babel-plugin#sid), its value will be omitted during serialization.
:::
