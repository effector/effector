---
title: useStoreMap
redirectFrom:
  - /api/effector-react/useStoreMap
  - /docs/api/effector-react/useStoreMap
---

```ts
import { useStoreMap } from "effector-react";
```

:::info{title="since"}
`useStoreMap` introduced in [effector-react 19.1.2](https://changelog.effector.dev/#effector-react-19-1-2)
:::

React hook, which subscribes to a [store](/en/api/effector/Store) and transforms its value with a given function. The component will update only when the selector function result will change.

You can read the motivation in the [issue](https://github.com/effector/effector/issues/118).

# Methods (#methods)

## `useStoreMap($store, fn)` (#methods-useStoreMap-store-fn)

:::info{title="since"}
Short version of `useStoreMap` introduced in [effector-react@21.3.0](https://changelog.effector.dev/#effector-react-21-3-0)
:::

Common use case: subscribe to changes in selected part of store only

### Formulae (#methods-useStoreMap-store-fn-formulae)

```ts
useStoreMap(
  $store: Store<State>,
  fn: (state: State) => Result,
): Result
```

### Arguments (#methods-useStoreMap-store-fn-arguments)

1. `$store`: Source [`Store<State>`](/en/api/effector/Store)
2. `fn` (`(state: State) => Result`): Selector function to receive part of source store

### Returns (#methods-useStoreMap-store-fn-returns)

(`Result`): Value from the `fn` function call.

### Examples (#methods-useStoreMap-store-fn-examples)

TBD

## `useStoreMap(config)` (#methods-useStoreMap-config)

Overload used when you need to pass dependencies to react (to update items when some of its dependencies are changed)

### Formulae (#methods-useStoreMap-config-formulae)

```ts
useStoreMap({
  store: Store<State>,
  keys: any[],
  fn: (state: State, keys: any[]) => Result,
  updateFilter?: (newResult: Result, oldResult: Result) => boolean,
  defaultValue?: Result,
}): Result;
```

### Arguments (#methods-useStoreMap-config-arguments)

1. `config` (_Object_): Configuration object
   - `store`: Source [`Store<State>`](/en/api/effector/Store)
   - `keys` (_Array_): This argument will be passed to React.useMemo to avoid unnecessary updates
   - `fn` (`(state: State, keys: any[]) => Result`): Selector function to receive part of source store
   - `updateFilter` (`(newResult, oldResult) => boolean`): _Optional_ function used to compare old and new updates to prevent unnecessary rerenders. Uses [createStore updateFilter](/en/api/effector/createStore) option under the hood
   - `defaultValue`: Optional default value, used whenever `fn` returns undefined

:::info{title="since"}
`updateFilter` option introduced in [effector-react@21.3.0](https://changelog.effector.dev/#effector-react-21-3-0)
:::

:::info{title="since"}
`defaultValue` option introduced in [effector-react@22.1.0](https://changelog.effector.dev/#effector-react-22-1-0)
:::

### Returns (#methods-useStoreMap-config-returns)

(`Result`): Value from the `fn` function call, or the `defaultValue`.

### Examples (#methods-useStoreMap-config-examples)

#### Basic (#methods-useStoreMap-config-examples-basic)

This hook is useful for working with lists, especially with large ones

```jsx
import { createStore } from "effector";
import { useList, useStoreMap } from "effector-react";

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
      <strong>[{user.id}]</strong> {user.name}
    </div>
  );
};

const UserList = () => {
  return useList($ids, (id) => <User id={id} />);
};
```

[Try it](https://share.effector.dev/cAZWHCit)
