---
id: useList
title: useList
hide_title: true
---

# `useList(store, renderItem)`

Hook function for efficient rendering of list store.
Every item will be memoized and updated only when their data changes.

#### Arguments

1. `store` (_Store_): Store **should be array**
2. `renderItem` (_Function_): Render function which will be called for every item in list

#### Returns

(_React.Node_)

#### Example

```js try
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'effector'
import {useList} from 'effector-react'

const users = createStore([
  {id: 1, name: 'Yung'},
  {id: 2, name: 'Lean'},
  {id: 3, name: 'Kyoto'},
  {id: 4, name: 'Sesh'},
])

const Users = () => {
  // we don't need keys here any more
  const list = useList(users, ({name}, index) => (
    <li>
      [{index}] {name}
    </li>
  ))

  return <ul>{list}</ul>
}

ReactDOM.render(<Users />, document.getElementById('root'))
```

[try it](https://share.effector.dev/JZ35Jjyr)

```js try
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, createEvent} from 'effector'
import {useList} from 'effector-react'

const toggleTodo = createEvent()

const todoList = createStore([
  {text: 'write useList example', done: true},
  {text: 'update readme', done: false},
]).on(toggleTodo, (list, id) =>
  list.map((todo, i) => {
    if (i === id)
      return {
        ...todo,
        done: !todo.done,
      }
    return todo
  }),
)
const Todo = ({children, done}) => {
  const textFragment = <span>{children}</span>
  return done ? <del>{textFragment}</del> : textFragment
}
const TodoList = () =>
  useList(todoList, ({text, done}, i) => (
    <li onClick={() => toggleTodo(i)}>
      <Todo done={done}>{text}</Todo>
    </li>
  ))
const App = () => (
  <div>
    <h1>todo list</h1>
    <ul>
      <TodoList />
    </ul>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

[try it](https://share.effector.dev/GQjYp0Bn)

By default, useList rerenders only when some of its items were changed.
However, sometimes we need to update items when some external value (e.g. props field or state of another store) is changed.
In such cases, we need to tell react about our dependencies and pass keys explicitly.

#### Example 2

```js try
const renameUser = createEvent()
const user = restore(renameUser, 'alice')
const friends = createStore(['bob'])
const List = () => {
  const userName = useStore(user)
  return useList(friends, {
    keys: [userName],
    fn: friend => (
      <div>
        {friend} is a friend of {userName}
      </div>
    ),
  })
}
ReactDOM.render(<List />, document.getElementById('root'))
// => <div> bob is a friend of alice </div>
setTimeout(() => {
  renameUser('carol')
  // => <div> bob is a friend of carol </div>
}, 500)
```
