---
title: useStoreMap
redirectFrom:
  - /api/effector-solid/useStoreMap
  - /docs/api/effector-solid/useStoreMap
---

```ts
import { useStoreMap } from "effector-solid";
```

# Methods (#methods)

## `useStoreMap($store, fn)` (#methods-useStoreMap-store-fn)

Function, which subscribes to a [store](/en/api/effector/Store) and transforms its value with a given function. Signal will update only when the selector function result will change.

Common use case: subscribe to changes in selected part of store only.

### Formulae (#methods-useStoreMap-store-fn-formulae)

```ts
useStoreMap(
  $store: Store<State>,
  fn: (state: State) => Result,
): Accessor<Result>;
```

### Arguments (#methods-useStoreMap-store-fn-arguments)

1. `$store`: Source [`Store<T>`](/en/api/effector/Store)
2. `fn` (`(state: T) => Result`): Selector function to receive part of source store

### Returns (#methods-useStoreMap-store-fn-returns)

(`Result`)

### Examples (#methods-useStoreMap-store-fn-examples)

TBD

## `useStoreMap(config)` (#methods-useStoreMap-config)

### Formulae (#methods-useStoreMap-config-formulae)

```ts
useStoreMap({
  store: Store<State>,
  keys: any[],
  fn: (state: State, keys: any[]) => Result,
  updateFilter? (newResult, oldResult) => boolean,
}): Result;
```

### Arguments (#methods-useStoreMap-config-arguments)

1. `params` (_Object_): Configuration object
   - `store`: Source [store](/en/api/effector/Store)
   - `keys` (_Array_): Will be passed to `fn` selector
   - `fn` (_(state, keys) => result_): Selector function to receive part of the source store
   - `updateFilter` (_(newResult, oldResult) => boolean_): _Optional_ function used to compare old and new updates to prevent unnecessary rerenders. Uses [createStore updateFilter](/en/api/effector/createStore#methods-createStore-defaultState-config-formulae) option under the hood

### Returns (#methods-useStoreMap-config-returns)

(`Accessor<Result>`)

### Examples (#methods-useStoreMap-config-examples)

This hook is very useful for working with lists, especially large ones.

```jsx
import { createStore } from "effector";
import { useUnit, useStoreMap } from "effector-solid";
import { For } from "solid-js/web";

const usersRaw = [
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

const $users = createStore(usersRaw);
const $ids = createStore(usersRaw.map(({ id }) => id));

const User = ({ id }) => {
  const user = useStoreMap({
    store: $users,
    keys: [id],
    fn: (users, [userId]) => users.find(({ id }) => id === userId) ?? null,
  });

  return (
    <div>
      <strong>[{user()?.id}]</strong> {user()?.name}
    </div>
  );
};

const UserList = () => {
  const ids = useUnit($ids);

  return <For each={ids()}>{(id) => <User key={id} id={id} />}</For>;
};
```
