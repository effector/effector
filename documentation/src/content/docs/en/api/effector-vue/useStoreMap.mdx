---
title: useStoreMap
redirectFrom:
  - /api/effector-vue/useStoreMap
  - /docs/api/effector-vue/useStoreMap
---

```ts
import { useStoreMap } from "effector-vue/composition";
```

Function, which subscribes to [store](/en/api/effector/Store) and transforms its value with a given function. Signal will update only when the selector function result will change

# Methods (#methods)

## `useStoreMap($store, fn)` (#methods-useStoreMap-store-fn)

### Formulae (#methods-useStoreMap-store-fn-formulae)

```ts
useStoreMap(
  $store: Store<State>,
  fn: (state: State) => Result,
): ComputedRef<Result>;
```

### Arguments (#methods-useStoreMap-store-fn-arguments)

1. `$store`: Source [`Store<State>`](/en/api/effector/Store)
2. `fn` (_(state) => result_): Selector function to receive part of source store

### Returns (#methods-useStoreMap-store-fn-returns)

(`ComputedRef<Result>`)

## `useStoreMap(config)` (#methods-useStoreMap-config)

### Formulae (#methods-useStoreMap-config-formulae)

```ts
useStoreMap({
  store: Store<State>,
  keys?: () => Keys,
  fn: (state: State, keys: Keys) => Result,
  defaultValue?: Result,
}): ComputedRef<Result>;
```

### Arguments (#methods-useStoreMap-config-arguments)

1. `params` (_Object_): Configuration object
   - `store`: Source [store](/en/api/effector/Store)
   - `keys` (`() => Keys`): Will be passed to `fn` selector
   - `fn` (`(state: State, keys: Keys) => Result`): Selector function to receive part of source store
   - `defaultValue` (`Result`): Optional default value if `fn` returned `undefined`

### Returns (#methods-useStoreMap-config-returns)

(`ComputedRef<Result>`)

### Examples (#methods-useStoreMap-config-examples)

This hook is very useful for working with lists, especially with large ones

##### User.vue (#methods-useStoreMap-config-example-userVue)

```js
import { createStore } from "effector";
import { useUnit, useStoreMap } from "effector-vue/composition";

const $users = createStore([
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
]);

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

    return { user };
  },
};
```

```jsx
<div>
  <strong>[{user.id}]</strong> {user.name}
</div>
```

##### App.vue (#methods-useStoreMap-config-examples-appVue)

```js
const $ids = createStore(data.map(({ id }) => id));

export default {
  setup() {
    const ids = useStore($ids);

    return { ids };
  },
};
```

```jsx
<div>
  <User v-for="id in ids" :key="id" :id="id" />
</div>
```
