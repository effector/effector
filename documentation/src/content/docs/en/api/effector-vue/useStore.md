---
title: useStore
description: Hook function, which subscribes to watcher, that observes changes in store. Designed for vue 3
redirectFrom:
  - /api/effector-vue/useStore
  - /docs/api/effector-vue/useStore
---

```ts
import { useStore } from "effector-vue/composition";
```

A hook function, which subscribes to watcher, that observes changes in the current **readonly** store, so when recording results, the component will update automatically. You can mutate the store value **only via [createEvent](/en/api/effector/createEvent)**. Designed for vue 3

## `useStore($store)` (#useStore-store)

### Arguments (#useStore-store-arguments)

1. `$store` ([`Store<State>`](/en/api/effector/Store))

### Returns (#useStore-store-returns)

(`readonly(State)`)

### Example (#useStore-store-example)

```js
import { createStore, createApi } from "effector";
import { useStore } from "effector-vue/composition";

const $counter = createStore(0);

const { incremented, decremented } = createApi($counter, {
  incremented: (count) => count + 1,
  decremented: (count) => count - 1,
});

export default {
  setup() {
    const counter = useStore($counter);

    return {
      counter,
      incremented,
      decremented,
    };
  },
};
```
