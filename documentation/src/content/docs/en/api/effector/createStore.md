---
title: createStore
description: createStore is a method for creating a store
redirectFrom:
  - /api/effector/createStore
  - /docs/api/effector/createStore
---

```ts
import { createStore, type Store, type StoreWritable } from "effector";
```

# Methods (#methods)

## `createStore(defaultState)` (#methods-createStore-defaultState)

Method for creating a [store](/en/api/effector/Store).

### Formulae (#methods-createStore-defaultState-formulae)

```ts
createStore<T>(defaultState: T): StoreWritable<T>
```

### Arguments (#methods-createStore-defaultState-arguments)

1. `defaultState` (_State_): Default state

### Throws (#methods-createStore-defaultState-throws)

#### unit call from pure function is not supported, use operators like sample instead (#methods-createStore-defaultState-throws-unit-call-from-pure)

> Since: effector 23.0.0

Occurs when events or effects are called from [pure functions](/en/explanation/glossary#purity), like updateFilter:

```ts
const someHappened = createEvent<number>();
const $counter = createStore(0, {
  updateFilter(a, b) {
    someHappened(a); // THROWS!
    return a < b;
  },
});
```

To resolve this, use `sample`:

```ts
const someHappened = createEvent<number>();
const $counter = createStore(0, {
  updateFilter(a, b) {
    return a < b;
  },
});

sample({
  clock: $counter,
  target: someHappened,
});
```

### Returns (#methods-createStore-defaultState-returns)

[_Store_](/en/api/effector/Store): New store

### Examples (#methods-createStore-defaultState-examples)

#### Basic (#methods-createStore-defaultState-examples-basic)

```js
import { createEvent, createStore } from "effector";

const addTodo = createEvent();
const clearTodoList = createEvent();

const $todos = createStore([])
  // Will update store when addTodo is fired
  .on(addTodo, (list, todo) => [...list, todo])
  // Will reset store to default state when clearTodos is fired
  .reset(clearTodoList);

// Create mapped store
const $selectedTodos = $todos.map((todos) => {
  return todos.filter((todo) => todo.selected);
});

// Log initial store value and each change
$todos.watch((todos) => {
  console.log("todos", todos);
});
// => todos []

addTodo("go shopping");
// => todos ['go shopping']

addTodo("go to the gym");
// => todos ['go shopping', 'go to the gym']

clearTodoList();
// => todos []
```

[Try it](https://share.effector.dev/MNibrAFC)

## `createStore(defaultState, config)` (#methods-createStore-defaultState-config)

Method for creating a [store](/en/api/effector/Store) but with configuration.

### Formulae (#methods-createStore-defaultState-config-formulae)

```ts
createStore<T, SerializedState extends Json = Json>(defaultState: T, config: {
  name?: string
  updateFilter?: (update: T, current: T) => boolean
  skipVoid?: boolean
  serialize?: 'ignore' | {
          write: (state: State) => SerializedState
          read: (json: SerializedState) => State
        }
}): StoreWritable<T>
```

### Arguments (#methods-createStore-defaultState-config-arguments)

1. `defaultState` (_State_): Default state
2. `config` (_Object_): Optional configuration
   - `name` (_String_): Name for the store. Babel plugin can set it from the variable name, if not passed explicitly in config.
   - `updateFilter` (_Function_): Function that prevents store from updating when it returns `false`. Accepts updated state as the first argument and current state as the second argument. Redundant for most cases since store already ensures that update is not `undefined` and not equal (`!==`) to current state _(since `effector 21.8.0`)_
   - `serialize: 'ignore'`: Option to disable store serialization when [serialize](/en/api/effector/serialize) is called _(since `effector 22.0.0`)_
   - `serialize` (_Object_): Configuration object to handle store state serialization in custom way. `write` – called on [serialize](/en/api/effector/serialize), transforms value to JSON value – primitive type or plain object/array. `read` – parse store state from JSON value, called on [fork](/en/api/effector/fork), if provided `values` is the result of `serialize` call.
   - `domain`: (_Domain_): Domain to attach store to after creation.
   - `skipVoid`: (_boolean_): Flag to control how specifically store should handle `undefined` value _(since `effector 23.0.0`)_. If set to `false` - store will use `undefined` as a value. If set to `true` (deprecated), store will interpret `undefined` as a "skip update" command and will do nothing.

### Throws (#methods-createStore-defaultState-config-throws)

The same behaviour like for regular [`createStore(defaultState)`](#methods-createStore-defaultState-throws).

### Returns (#methods-createStore-defaultState-config-returns)

[_Store_](/en/api/effector/Store): New store

### Examples (#methods-createStore-defaultState-config-examples)

#### With `updateFilter` (#methods-createStore-defaultState-examples-updateFilter)

```js
import { createEvent, createStore, sample } from "effector";

const punch = createEvent();
const veryStrongHit = createEvent();

const $lastPunchStrength = createStore(0, {
  // If store should be updated with strength less than 400 kg
  // update will be skipped
  updateFilter: (strength) => strength >= 400,
});

$lastPunchStrength.on(punch, (_, strength) => strength);

// Each store update should trigger event `veryStrongHit`
sample({ clock: $lastPunchStrength, target: veryStrongHit });

// Watch on store prints initial state
$lastPunchStrength.watch((strength) => console.log("Strength: %skg", strength));
// => Strength: 0kg

veryStrongHit.watch((strength) => {
  console.log("Wooow! It was very strong! %skg", strength);
});

punch(200); // updateFilter prevented update
punch(300); // Same here, store doesn't update, value remains `0`
punch(500); // Yeeah! updateFilter allows store update
// => Strength: 500kg
// => Wooow! It was very strong! 500kg
punch(100); // No update as well
```

[Try it](https://share.effector.dev/rtxfqObf)

#### With `serialize: ignore` (#methods-createStore-defaultState-examples-serializeIgnore)

```js
import { createEvent, createStore, serialize, fork, allSettled } from "effector";

const readPackage = createEvent();

const $name = createStore("");
const $version = createStore(0, { serialize: "ignore" });

$name.on(readPackage, (_, { name }) => name);
$version.on(readPackage, (_, { version }) => version);

// Watchers always called for scoped changes
$name.watch((name) => console.log("name '%s'", name));
$version.watch((version) => console.log("version %s", version));
// => name ''
// => version 0

// Please, note, `fork()` call doesn't trigger watches
// In the opposit of `hydrate()` call
const scope = fork();

// By default serialize saves value only for the changed stores
// Review `onlyChanges` option https://effector.dev/api/effector/serialize
const values = serialize(scope);
console.log(values);
// => {}

// Let's change our stores
await allSettled(readPackage, {
  scope,
  params: { name: "effector", version: 22 },
});
// => name 'effector'
// => version 22

const actualValues = serialize(scope);
console.log(actualValues);
// => {n74m6b: "effector"}
// `$version` store has `serialize: ignore`, so it's not included
```

[Try it](https://share.effector.dev/aLKAHDOM)

#### Custom `serialize` configuration (#methods-createStore-defaultState-examples-customSerialize)

```ts
import { createEvent, createStore, serialize, fork, allSettled } from "effector";

const saveDate = createEvent();
const $date = createStore<null | Date>(null, {
  // Date object is automatically serialized to ISO date string by JSON.stringify
  // but it is not parsed to Date object by JSON.parse
  // which will lead to a mismatch during server side rendering
  //
  // Custom `serialize` config solves this issue
  serialize: {
    write: (dateOrNull) => (dateOrNull ? dateOrNull.toISOString() : dateOrNull),
    read: (isoStringOrNull) => (isoStringOrNull ? new Date(isoStringOrNull) : isoStringOrNull),
  },
}).on(saveDate, (_, p) => p);

const serverScope = fork();

await allSettled(saveDate, { scope: serverScope, params: new Date() });

const serverValues = serialize(serverScope);
// `serialize.write` of `$date` store is called

console.log(serverValues);
// => { nq1e2rb: "2022-11-05T15:38:53.108Z" }
// Date object saved as ISO string

const clientScope = fork({ values: serverValues });
// `serialize.read` of `$date` store is called

const currentValue = clientScope.getState($date);
console.log(currentValue);
// => Date 11/5/2022, 10:40:13 PM
// ISO date string is parsed back to Date object
```

[Try it](https://share.effector.dev/YFkUlqPv)
