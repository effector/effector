---
title: useStore
description: Hook function, which subscribes to watcher, that observes changes in store. Designed for vue 3
---

## `useStore(store)` {#useStore-store}

A hook function, which subscribes to watcher, that observes changes in the current **readonly**` store, so when recording results, the component will update automatically.
You can mutate this data **only via [createEvent](/en/api/effector/createEvent)**.

Designed for vue 3

### Arguments {#useStore-store-arguments}

1. `store` (_Store_)

### Returns {#useStore-store-returns}

_readonly(State)_

### Example {#useStore-store-example}

```js
import { createStore, createApi } from "effector";
import { useStore } from "effector-vue/composition";

const $counter = createStore(0);

const { increment, decrement } = createApi($counter, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1,
});

export default {
  setup() {
    const counter = useStore($counter);

    return {
      counter,
      increment,
      decrement,
    };
  },
};
```
