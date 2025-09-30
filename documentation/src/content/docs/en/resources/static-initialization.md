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

When creating a `$store`, a new node is added to Effector’s graph, which holds a reference to the store. For a derived store, a node is also created along with a connection to the source store. You can verify this by logging the source store to the console, expanding its `graphite.next` property (an array links to the next nodes), finding the node where `meta.op` is `combine`, and then expanding its `next` — that will be your derived store. Since references to unit objects are preserved in the graph, [GC](https://javascript.info/garbage-collection) in JavaScript is not able to remove them from memory. Therefore, for example, if you create units or connections between them inside a React component, they will be recreated on every component mount, while the old units will still remain alive and functioning.

## What about dynamics? (#whats-with-dynamic)

Of course, the effector team understands how important dynamic behavior is, which is why [dynamic models](/en/essentials/dynamic-models) are now under active development and are expected in the next major release!
