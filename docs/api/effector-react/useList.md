---
id: useList
title: useList
hide_title: true
---

# `useList(store, renderItem)`
Hook function for efficient rendering of list store.  
Every item will be memoized and updated only when their data changes.

#### Arguments

1. `store` _(Store)_ Store **should be array**
2. `renderItem` _(function)_ Render function which will be called for every item in list

#### Returns

(_React.Node_)

#### Example

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'effector'
import {useList} from 'effector-react'

const users = createStore([
  {id: 1, name: 'Yung'},
  {id: 2, name: 'Lean'},
  {id: 3, name: 'Kyoto'},
  {id: 4, name: 'Sesh'}
])

const Users = () => {
  // we don't need keys here any more
  const list = useList(users, ({name}, index) => (
    <li>
      [{index}] {name}
    </li>
  ))
  
  return (
    <ul>{list}</ul>  
  )
}

ReactDOM.render(<Users />, document.getElementById('root'))
```
[Playground](https://share.effector.dev/JZ35Jjyr)

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, createEvent} from 'effector'
import {useList} from 'effector-react'

const toggleTodo = createEvent()

const todoList = createStore([
  {text: 'write useList example', done: true},
  {text: 'update readme', done: false},
])
  .on(toggleTodo, (list, id) =>
    list.map((todo, i) => {
      if (i === id) return {
        ...todo,
        done: !todo.done,
      }
      return todo
    })
  )
const Todo = ({children, done}) => {
  const textFragment = (
    <span>{children}</span>
  )
  return done
    ? <del>{textFragment}</del>
    : textFragment
}
const TodoList = () => useList(todoList, ({text, done}, i) => (
  <li onClick={() => toggleTodo(i)}>
    <Todo done={done}>
      {text}
    </Todo>
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
[Playground](https://share.effector.dev/GQjYp0Bn)
