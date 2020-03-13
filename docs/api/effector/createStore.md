---
id: createStore
title: createStore
hide_title: true
---

# `createStore(defaultState, config?)`

Creates a [store](Store.md).

#### Arguments

1. `defaultState` (_State_): Default state
2. `config` (_Object_): Optional configuration
   - `name` (_String_): Name for the store. Babel plugin can set it from variable name, if not passed explicitly in config.

#### Returns

[_Store_](Store.md): New store

#### Example

```js try
import {createEvent, createStore} from 'effector'

const addTodo = createEvent()
const clearTodos = createEvent()

const todos = createStore([])
todos
  // Add reducer
  .on(addTodo, (state, todo) => [...state, todo])
  // Will reset store to default state when clearTodos is fired
  .reset(clearTodos)

// Create derived store
const selectedTodos = todos.map(todos => {
  return todos.filter(todo => !!todo.selected)
})
// Handle side effects
todos.watch(state => {
  console.log(state)
})
```

[Try it](https://share.effector.dev/dFRb1kxi)
