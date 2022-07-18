---
id: useStoreMap
title: useStoreMap
---

Function, which subscribes to [store](../effector/Store.md) and transforms its value with given function. Signal will update only when selector function result will change

Common use case: subscribe to changes in selected part of store only

```ts
useStoreMap<State, Result>(
  store: Store<State>,
  fn: (state: State) => Result
): Accessor<Result>
```

**Arguments**

1. `store`: Source [store](../effector/Store.md)
2. `fn` (_(state) => result_): Selector function to receive part of source store

**Returns**

(_Result_)

```ts
useStoreMap({store, keys, fn, updateFilter?})
```

**Arguments**

1. `params` (_Object_): Configuration object
    - `store`: Source [store](../effector/Store.md)
    - `keys` (_Array_): Will be passed to fn selector
    - `fn` (_(state, keys) => result_): Selector function to receive part of source store
    - `updateFilter` (_(newResult, oldResult) => boolean_): _Optional_ function used to compare old and new updates to prevent unnecessary rerenders. Uses [createStore updateFilter](../effector/createStore.md) option under the hood

**Returns**

(_Accessor<Result\>_)

#### Example

This hook is very useful for working with lists, especially with large ones

```js
import {createStore} from 'effector'
import {useUnit, useStoreMap} from 'effector-solid'
import {For} from 'solid-js/web'

const data = [
  {
    id: 1,
    name: 'Yung',
  },
  {
    id: 2,
    name: 'Lean',
  },
  {
    id: 3,
    name: 'Kyoto',
  },
  {
    id: 4,
    name: 'Sesh',
  },
]

const $users = createStore(data)
const $ids = createStore(data.map(({id}) => id))

const User = ({id}) => {
  const user = useStoreMap({
    store: $users,
    keys: [id],
    fn: (users, [userId]) => users.find(({id}) => id === userId),
  })

  return (
    <div>
      <strong>[{user().id}]</strong> {user().name}
    </div>
  )
}

const UserList = () => {
  const ids = useUnit($ids)
  
  return (
    <For each={ids()}>
       {(id) => <User key={id} id={id} />}
    </For>
  )
}
```
