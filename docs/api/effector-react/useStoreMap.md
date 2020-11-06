---
id: useStoreMap
title: useStoreMap
---

React hook, which subscribes to [store](../effector/Store.md) and transforms its value with given funtion. Component will update only when selector function result will change. Common use case: subscribe to changes in selected part of store only

```ts
useStoreMap({store, keys, fn})
```

**Arguments**

1. `params` (_Object_): Configuration object
   - `store`: Source [store](../effector/Store.md)
   - `keys` (_Array_): This argument will be passed to React.useMemo to avoid unnecessary updates
   - `fn` (_(store, keys) => result_): Selector function to receive part of source store

**Returns**

(_State_)

#### Example

This hook is very useful for working with lists, especially with large ones.

```js
import {createStore} from 'effector'
import {useStore, useStoreMap} from 'effector-react'

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
      <strong>[{user.id}]</strong> {user.name}
    </div>
  )
}

const UserList = () => {
  const ids = useStore($ids)
  return ids.map(id => <User key={id} id={id} />)
}
```

[Try it](https://share.effector.dev/cAZWHCit)
