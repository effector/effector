---
title: Unit Initialization
description: Explaining why units must be defined statically at the module level instead of being created at runtime.
---

# Unit initialization (#unit-init)

When working with effector, it is important to follow a key rule — create units statically at the module level, not at runtime, to avoid memory leaks in your application.

To understand why this happens, we need to look into the effector core and see how it works. At its foundation lies a [graph](<https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)>) model. Each unit is a node in the graph, and each node stores information about state, operations, and links to other units. For example, in the following code:

```ts
import { combine, createStore } from "effector";

const $store = createStore(0);
const $derivedStore = combine($store, (storeVal) => !!storeVal);
```

When `$store` is created, we add a new node to the effector graph that holds a reference to the store. For the derived store, another node is created along with a link to the original store. Since references to unit objects are preserved in the graph, [GC](https://javascript.info/garbage-collection) in JavaScript is not able to remove them from memory. This means that if you create units or connections between them inside a React component, they will be recreated on every component mount, while the old units will continue to live and work.

## What about dynamics? (#whats-with-dynamic)

Of course, the effector team understands how important dynamic behavior is, which is why [dynamic models](/en/essentials/dynamic-models) are now under active development and are expected in the next major release!
