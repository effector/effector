---
id: useStoreMap
title: useStoreMap
hide_title: true
---

# `useStoreMap({ store, keys, fn })`

Creates hook function, which observes changes in selected part of store. Component will be updated only when selector function result will changed.

#### Arguments

1. `params` (_Object_): Configuration object
   - `store` (_Store_): Source store
   - `keys` (_Array_): This argument will be passed to React.useMemo to avoid unnecessary updates
   - `fn` (_(store, keys) => result_): Selector function to receive part of source store

#### Returns

(_State_)

#### Example

This hook is very useful for working with lists, especially with large ones.

```js try
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'effector'
import {createComponent, useStoreMap} from 'effector-react'

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

const UserList = createComponent($ids, (_, ids) =>
  ids.map(id => <User key={id} id={id} />),
)

ReactDOM.render(<UserList />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/Y0bu6bPv)
