---
title: useStoreMap
---

Function, which subscribes to [store](/api/effector/Store.md) and transforms its value with given function. Signal will update only when selector function result will change

## useStoreMap(store, fn) {#useStoreMap-fn}

Common use case: subscribe to changes in selected part of store only

```ts
useStoreMap<State, Result>(
  store: Store<State>,
  fn: (state: State) => Result
): Accessor<Result>
```

### Arguments {#useStoreMap-fn-arguments}

1. `store`: Source [store](/api/effector/Store.md)
2. `fn` (_(state) => result_): Selector function to receive part of source store

### Returns {#useStoreMap-fn-returns}

(_Result_)

## useStoreMap(config) {#useStoreMap-config}

```ts
useStoreMap({ store, keys, fn, updateFilter });
```

### Arguments {#useStoreMap-config-arguments}

1. `params` (_Object_): Configuration object
   - `store`: Source [store](/api/effector/Store.md)
   - `keys` (_Array_): Will be passed to fn selector
   - `fn` (_(state, keys) => result_): Selector function to receive part of source store
   - `updateFilter` (_(newResult, oldResult) => boolean_): _Optional_ function used to compare old and new updates to prevent unnecessary rerenders. Uses [createStore updateFilter](/api/effector/createStore.md) option under the hood

### Returns {#useStoreMap-config-returns}

(_Accessor<Result\>_)

### Example {#useStoreMap-config-example}

This hook is very useful for working with lists, especially with large ones

```js
import { createStore } from "effector";
import { useUnit, useStoreMap } from "effector-solid";
import { For } from "solid-js/web";

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
const $ids = createStore(data.map(({ id }) => id));

const User = ({ id }) => {
  const user = useStoreMap({
    store: $users,
    keys: [id],
    fn: (users, [userId]) => users.find(({ id }) => id === userId),
  });

  return (
    <div>
      <strong>[{user().id}]</strong> {user().name}
    </div>
  );
};

const UserList = () => {
  const ids = useUnit($ids);

  return <For each={ids()}>{(id) => <User key={id} id={id} />}</For>;
};
```
