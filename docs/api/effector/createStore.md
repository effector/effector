---
id: createStore
title: createStore
hide_title: true
---

# `createStore(defaultState, config?)`

Creates a [store](Store.md).

#### Arguments

1. `defaultState` (_State_): Default state
2. `config` (_Config_): Optional configuration
    - `name` (_String_): Name for the store. Babel plugin can set it from variable name, if not passed explicitly in config.

#### Returns

([_`Store`_](Store.md)): An object that holds the state tree. There can be multiple stores.

#### Example

```js try
// Create events
const addTodo = createEvent()
const clearTodos = createEvent()

// Create store
const todos = createStore([]) // <-- Default state

todos
  // Add reducer
  .on(addTodo, (state, todo) => [...state, todo])
  // Will reset store to default state when clearTodos is fired
  .reset(clearTodos)

// Create derived store
const selectedTodos = todos.map(todos => {
  // Filter array inside store
  return todos.filter(todo => !!todo.selected)
})

// Handle side effects
todos.watch(state => console.log(state))
```
