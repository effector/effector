---
title: useStoreMap
redirectFrom:
  - /api/effector-solid/useStoreMap
  - /docs/api/effector-solid/useStoreMap
---

# `useStoreMap(store, fn)` {#useStoreMap-store-fn}

Function, which subscribes to a [store](/en/api/effector/Store) and transforms its value with a given function. Signal will update only when the selector function result will change.

Common use case: subscribe to changes in selected part of store only.

## Formulae {#useStoreMap-store-fn-formulae}

```ts
useStoreMap<State, Result>(
  store: Store<State>,
  fn: (state: State) => Result
): Accessor<Result>
```

## Arguments {#useStoreMap-store-fn-arguments}

1. `store`: Source [store](/en/api/effector/Store)
2. `fn` (_(state) => result_): Selector function to receive part of source store

## Throws {#useStoreMap-store-fn-throws}

TBD

## Returns {#useStoreMap-store-fn-returns}

(_Result_)

## Types {#useStoreMap-store-fn-types}

TBD

## Examples {#useStoreMap-store-fn-examples}

TBD

# `useStoreMap(config)` {#useStoreMap-config}

## Formulae {#useStoreMap-config-formulae}

```ts
useStoreMap({ store, keys, fn, updateFilter });
```

## Arguments {#useStoreMap-config-arguments}

1. `params` (_Object_): Configuration object
   - `store`: Source [store](/en/api/effector/Store)
   - `keys` (_Array_): Will be passed to `fn` selector
   - `fn` (_(state, keys) => result_): Selector function to receive part of the source store
   - `updateFilter` (_(newResult, oldResult) => boolean_): _Optional_ function used to compare old and new updates to prevent unnecessary rerenders. Uses [createStore updateFilter](/en/api/effector/createStore) option under the hood

## Throws {#useStoreMap-config-throws}

TBD

## Returns {#useStoreMap-config-returns}

`Accessor<Result>`

## Types {#useStoreMap-config-types}

TBD

## Examples {#useStoreMap-config-examples}

This hook is very useful for working with lists, especially large ones.

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
