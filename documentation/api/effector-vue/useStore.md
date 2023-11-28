---
id: useStore
title: useStore
hide_title: true
description: Hook function, which subscribes to watcher, that observes changes in store. Designed for vue 3
---

# useStore

## `useStore(store)`

A hook function, which subscribes to watcher, that observes changes in the current **readonly**` store, so when recording results, the component will update automatically.
You can mutate this data **only from createEvent**.

Designed for vue 3

**Arguments**

1. `store` (_Store_)

**Returns**

_readonly(State)_

### Example

```js
import {createStore, createApi} from 'effector'
import {useStore} from 'effector-vue/composition'

const $counter = createStore(0)

const {increment, decrement} = createApi($counter, {
  increment: state => state + 1,
  decrement: state => state - 1,
})

export default {
  setup() {
    const counter = useStore($counter)

    return {
      counter,
      increment,
      decrement,
    }
  },
}
```
