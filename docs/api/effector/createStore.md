---
id: createStore
title: createStore
description: createStore is a method for creating a store
---

Method for creating a [store](./Store.md)

```ts
createStore<T>(defaultState: T): Store<T>
createStore<T>(defaultState: T, config: {
  name?: string
  updateFilter?: (update: T, current: T) => boolean
  serialize?: 'ignore'
}): Store<T>
```

**Arguments**

1. `defaultState` (_State_): Default state
2. `config` (_Object_): Optional configuration
   - `name` (_String_): Name for the store. Babel plugin can set it from the variable name, if not passed explicitly in config.
   - `updateFilter` (_Function_): Function that prevents store from updating when it returns `false`. Accepts updated state as the first argument and current state as the second argument. Redundant for most cases since store already ensures that update is not `undefined` and not equal (`!==`) to current state _(since `effector 21.8.0`)_
   - `serialize: 'ignore'`: Option to disable store serialization when [serialize](./serialize.md) is called _(since `effector 22.0.0`)_

**Returns**

[_Store_](Store.md): New store

#### Example

```js
import {createEvent, createStore} from 'effector'

const addTodo = createEvent()
const clearTodoList = createEvent()

const $todos = createStore([])
  // Will update store when addTodo is fired
  .on(addTodo, (list, todo) => [...list, todo])
  // Will reset store to default state when clearTodos is fired
  .reset(clearTodoList)

// Create mapped store
const $selectedTodos = $todos.map(todos => {
  return todos.filter(todo => todo.selected)
})

// Log initial store value and each change
$todos.watch(todos => {
  console.log('todos', todos)
})
// => todos []

addTodo('go shopping')
// => todos ['go shopping']

addTodo('go to the gym')
// => todos ['go shopping', 'go to the gym']

clearTodoList()
// => todos []

```

[Try it](https://share.effector.dev/MNibrAFC)
