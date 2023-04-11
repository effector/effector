---
title: useStoreMap
redirectFrom:
  - /api/effector-vue/useStoreMap
  - /docs/api/effector-vue/useStoreMap
---

Function, which subscribes to [store](/en/api/effector/Store) and transforms its value with a given function. Signal will update only when the selector function result will change

## useStoreMap(store, fn) {#useStoreMap-fn}

Common use case: subscribe to changes in selected part of store only

### Formulae {#useStoreMap-fn-formulae}

```ts
useStoreMap<State, Result>(
  store: Store<State>,
  fn: (state: State) => Result
): ComputedRef<Result>
```

### Arguments {#useStoreMap-fn-arguments}

1. `store`: Source [store](/en/api/effector/Store)
2. `fn` (_(state) => result_): Selector function to receive part of source store

### Returns {#useStoreMap-fn-returns}

(_Result_)

## useStoreMap(config) {#useStoreMap-config}

### Formulae {#useStoreMap-config-formulae}

```ts
useStoreMap({ store, keys, fn });
```

### Arguments {#useStoreMap-config-arguments}

1. `params` (_Object_): Configuration object
   - `store`: Source [store](/en/api/effector/Store)
   - `keys` (_Function_): Will be passed to `fn` selector
   - `fn` (_(state, keys) => result_): Selector function to receive part of source store

### Returns {#useStoreMap-config-returns}

(_ComputedRef<Result\>_)

### Example {#useStoreMap-config-example}

This hook is very useful for working with lists, especially with large ones

##### User.vue

```js
import { createStore } from "effector";
import { useUnit, useStoreMap } from "effector-vue/composition";

const data = [
  {
    id: 1,
    name: "Yung",
  },
  {
    id: 2,
    name: "Lean",
  },
  {
    id: 3,
    name: "Kyoto",
  },
  {
    id: 4,
    name: "Sesh",
  },
];

const $users = createStore(data);

export default {
  props: {
    id: Number,
  },
  setup(props) {
    const user = useStoreMap({
      store: $users,
      keys: () => props.id,
      fn: (users, userId) => users.find(({ id }) => id === userId),
    });
  },
};
```

```html
<div><strong>[{user.id}]</strong> {user.name}</div>
```

##### App.vue

```js
const $ids = createStore(data.map(({ id }) => id));

export default {
  setup() {
    const ids = useStore($ids);

    return { ids };
  },
};
```

```html
<div>
  <User v-for="id in ids" :key="id" :id="id" />
</div>
```
