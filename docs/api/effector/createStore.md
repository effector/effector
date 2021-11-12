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
  .on(addTodo, (todos, todo) => [...todos, todo])
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

#### Example with `updateFilter`

```js
import {createEvent, createStore, forward} from 'effector'

const punch = createEvent()
const veryStrongHit = createEvent()

const $lastPunchStrength = createStore(0, {
  // If store should be updated with strength less than 400 kg
  // update will be skipped
  updateFilter: strength => strength >= 400,
})

$lastPunchStrength.on(punch, (_, strength) => strength)

// Each store update should trigger event `veryStrongHit`
forward({from: $lastPunchStrength, to: veryStrongHit})

// Watch on store prints initial state
$lastPunchStrength.watch(strength => console.log('Strength: %skg', strength))
// => Strength: 0kg

veryStrongHit.watch(strength => {
  console.log('Wooow! It was very strong! %skg', strength)
})

punch(200) // updateFilter prevented update
punch(300) // Same here. Note: store don't updates, value is the same `0`
punch(500) // Yeeah! updateFilter allows to update store value
// => Strength: 500kg
// => Wooow! It was very strong! 500kg
punch(100) // Also nothing
```

[Try it](https://share.effector.dev/rtxfqObf)


#### Example with `serialize`

```js
import {createEvent, createStore, forward, serialize, fork, allSettled} from 'effector'

const readPackage = createEvent();

const $name = createStore('')
const $version = createStore(0, { serialize: 'ignore' })

$name.on(readPackage, (_, { name }) => name)
$version.on(readPackage, (_, { version }) => version)

// Watchers always called for scoped changes
$name.watch(name => console.log("name '%s'", name))
$version.watch(version => console.log("version %s", version))
// => name ''
// => version 0

// Please, note, `fork()` call doesn't trigger watches
// In the opposit of `hydrate()` call
const scope = fork()

// By default serialize saves value only for the changed stores
// Review `onlyChanges` option https://effector.dev/docs/api/effector/serialize
const values = serialize(scope);
console.log(values)
// => {}

// Let's change our stores
await allSettled(readPackage, {
  scope,
  params: { name: 'effector', version: 22 },
})
// => name 'effector'
// => version 22

const actualValues = serialize(scope);
console.log(actualValues)
// => {n74m6b: "effector"}
// This is because `$version` store has `serialize: ignore`
```

[Try it](https://share.effector.dev/PCX0QT6d)
