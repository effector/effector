---
id: useList
title: useList
---

Hook function for efficient rendering of list store.
Every item will be memoized and updated only when their data changes.

```ts
useList<T>(
  store: Store<T[]>,
  fn: (value: T, index: number) => React.ReactNode
): React.ReactNode
```

**Arguments**

1. `store` (_Store_): Store with array of items
2. `fn` (_Function_): Render function which will be called for every item in list

**Returns**

(_React.Node_)

```ts
useList<T>(
  store: Store<T[]>,
  config: {
    keys: any[]
    fn: (value: T, index: number) => React.ReactNode
    getKey?: (value: T) => React.Key
    placeholder?: React.ReactNode
  }
): React.ReactNode
```

Used when you need to pass dependencies to react (to update items when some of its dependencies are changed).

By default, `useList` rerenders only when some of its items were changed.
However, sometimes we need to update items when some external value (e.g. props field or state of another store) changes.
In such case, we need to tell react about our dependencies and pass keys explicitly.

**Arguments**

1. `store` (_Store_): Store with array of items
2. `keys` (_Array_): Array of dependencies, which will be passed to react by `useList`
3. `fn` (_Function_): Render function which will be called for every item in list
4. `getKey` (_(value) => React.Key_): Optional function to compute key for every item of list
5. `placeholder` (_ReactNode_): Optional react node to render instead of empty list

:::note
`getKey` option introduced in `effector-react@21.3.0`
:::

:::note
`placeholder` option introduced in `effector-react@22.1.0`
:::

## Examples

### Example 1

```js
import {createStore} from 'effector'
import {useList} from 'effector-react'

const $users = createStore([
  {id: 1, name: 'Yung'},
  {id: 2, name: 'Lean'},
  {id: 3, name: 'Kyoto'},
  {id: 4, name: 'Sesh'},
])

const App = () => {
  // we don't need keys here any more
  const list = useList($users, ({name}, index) => (
    <li>
      [{index}] {name}
    </li>
  ))

  return <ul>{list}</ul>
}
```

[Try it](https://share.effector.dev/dV9dmuz3)

### Example 2

```js
import {createStore, createEvent} from 'effector'
import {useList} from 'effector-react'

const addTodo = createEvent()
const toggleTodo = createEvent()

const $todoList = createStore([
  {text: 'write useList example', done: true},
  {text: 'update readme', done: false},
])
  .on(toggleTodo, (list, id) =>
    list.map((todo, i) => {
      if (i === id)
        return {
          ...todo,
          done: !todo.done,
        }
      return todo
    }),
  )
  .on(addTodo, (list, e) => [
    ...list,
    {
      text: e.currentTarget.elements.content.value,
      done: false,
    },
  ])

addTodo.watch(e => {
  e.preventDefault()
})

const TodoList = () =>
  useList($todoList, ({text, done}, i) => {
    const todo = done ? (
      <del>
        <span>{text}</span>
      </del>
    ) : (
      <span>{text}</span>
    )
    return <li onClick={() => toggleTodo(i)}>{todo}</li>
  })
const App = () => (
  <div>
    <h1>todo list</h1>
    <form onSubmit={addTodo}>
      <label htmlFor="content">New todo</label>
      <input type="text" name="content" required />
      <input type="submit" value="Add" />
    </form>
    <ul>
      <TodoList />
    </ul>
  </div>
)
```

[Try it](https://share.effector.dev/dUay9F3U)

### Example with config

```js
import ReactDOM from 'react-dom'
import {createEvent, createStore, restore} from 'effector'
import {useStore, useList} from 'effector-react'

const renameUser = createEvent()

const $user = restore(renameUser, 'alice')
const $friends = createStore(['bob'])

const App = () => {
  const user = useStore($user)

  return useList($friends, {
    keys: [user],
    fn: friend => (
      <div>
        {friend} is a friend of {user}
      </div>
    ),
  })
}

ReactDOM.render(<App />, document.getElementById('root'))
// => <div> bob is a friend of alice </div>

setTimeout(() => {
  renameUser('carol')
  // => <div> bob is a friend of carol </div>
}, 500)
```

[Try it](https://share.effector.dev/ijRS5TYh)
