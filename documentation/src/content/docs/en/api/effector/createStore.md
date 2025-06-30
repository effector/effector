---
title: createStore
description: createStore is a method for creating a store
redirectFrom:
  - /api/effector/createStore
  - /docs/api/effector/createStore
---

# createStore (#create-store)

```ts
import { createStore } from "effector";

const $store = createStore();
```

Method for creating [stores][storeApi].

## Formula (#createStore-formulae)

```ts
createStore(
  defaultState: State, // Initial store state
  config?: { // Configuration object with additional options
    skipVoid?: boolean; // Controls updates with undefined values
    name?: string; // Store name for debugging
    sid?: string // Stable identifier for SSR
    updateFilter?: (update: State, current: State) => boolean // Update filtering function
    serialize?: // Serialization configuration for SSR
    | 'ignore'
    | {
        write: (state: State) => SerializedState
        read: (json: SerializedState) => State
      }
    domain?: Domain; // Domain to which the store belongs
  },
): StoreWritable<State>
```

- **Arguments**

1. **`defaultState`**: Initial state
2. **`config`**: Optional configuration object

   - **`skipVoid`**: Optional argument. Determines whether the [store][storeApi] skips `undefined` values. Default is `true`. If you pass an `undefined` value to a store with `skipVoid: true`, you'll get [an error in the console][storeUndefinedError].<br/><br/>

   - **`name`**: Optional argument. Store name. [Babel-plugin][babel] can determine it from the store variable name if the name is not explicitly passed in the configuration.<br/><br/>
   - **`sid`**: Optional argument. Unique store identifier. [It's used to distinguish stores between different environments][storeSid]. When using [Babel-plugin][babel], it's set automatically.<br/><br/>
   - **`updateFilter`**:
     Optional argument. A [pure function][pureFn] that prevents store updates if it returns `false`. Should be used when the standard update prevention (if the value to be written to the store equals `undefined` or the current store value) is insufficient.

     <br/>

   - **`serialize`**: Optional argument responsible for store serialization.

     - `'ignore'`: excludes the store from serialization when calling [serialize][serialize].
     - Object with `write` and `read` methods for custom serialization. `write` is called when [serialize](/en/api/effector/serialize) is invoked and converts the store state to a JSON value – a primitive or simple object/array. `read` is called during [fork](/en/api/effector/fork) if the provided `values` are the result of calling [serialize][serialize].

- **Return value**

Returns a new [store][storeApi].

## Examples (#examples)

Basic store usage:

```js
import { createEvent, createStore } from "effector";

const addTodo = createEvent();
const clearTodos = createEvent();

const $todos = createStore([])
  .on(addTodo, (todos, newTodo) => [...todos, newTodo])
  .reset(clearTodos);

const $selectedTodos = $todos.map((todos) => {
  return todos.filter((todo) => !!todo.selected);
});

$todos.watch((todos) => {
  console.log("todos", todos);
});
```

[Run example](https://share.effector.dev/tquiUgdq)

Example with custom `serialize` configuration:

```ts
import { createEvent, createStore, serialize, fork, allSettled } from "effector";

const saveDate = createEvent();
const $date = createStore<null | Date>(null, {
  // Date objects are automatically converted to ISO date strings when calling JSON.stringify
  // but are not converted back to Date when calling JSON.parse – the result will be the same ISO date string
  // This will cause state mismatch when hydrating state on the client during server-side rendering
  //
  // Custom `serialize` configuration solves this problem
  serialize: {
    write: (dateOrNull) => (dateOrNull ? dateOrNull.toISOString() : dateOrNull),
    read: (isoStringOrNull) => (isoStringOrNull ? new Date(isoStringOrNull) : isoStringOrNull),
  },
}).on(saveDate, (_, p) => p);

const serverScope = fork();

await allSettled(saveDate, { scope: serverScope, params: new Date() });

const serverValues = serialize(serverScope);
// `serialize.write` for store `$date` was called

console.log(serverValues);
// => { nq1e2rb: "2022-11-05T15:38:53.108Z" }
// Date object from store saved as ISO date

const clientScope = fork({ values: serverValues });
// `serialize.read` for store `$date` was called

const currentDate = clientScope.getState($date);
console.log(currentDate);
// => Date 11/5/2022, 10:40:13 PM
// ISO date string converted back to Date object
```

[Run example](https://share.effector.dev/YFkUlqPv)

## Common Errors (#common-errors)

Below is a list of possible errors you may encounter when working with stores:

- [`store: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option`][storeUndefinedError].
- [`serialize: One or more stores dont have sids, their values are omitted`][serializeError].
- [`unit call from pure function is not supported, use operators like sample instead`][unitCallError].

## Related API and Articles (#related-api-and-docs-to-create-store)

- **API**
  - [`Store API`][storeApi] - Store API, its methods, properties and description
  - [`createApi`][createApi] - Creating a set of events for a store
  - [`combine`][combine] - Creating a new store based on other stores
  - [`sample`][sample] - Connecting stores with other units
- **Articles**
  - [How to manage state][storeGuide]
  - [Guide to working with SSR][ssr]
  - [What is SID and why stores need them][storeSid]
  - [How to type stores and other units][typescript]

[storeApi]: /en/api/effector/Store
[storeUndefinedError]: /en/guides/troubleshooting#store-undefined
[storeSid]: /en/explanation/sids
[ssr]: /en/guides/server-side-rendering
[storeGuide]: /en/essentials/manage-states
[combine]: /en/api/effector/combine
[sample]: /en/api/effector/sample
[createApi]: /en/api/effector/createApi
[serialize]: /en/api/effector/serialize
[typescript]: /en/essentials/typescript
[babel]: /en/api/effector/babel-plugin
[pureFn]: /en/explanation/glossary/#purity
[unitCallError]: /en/guides/troubleshooting#unit-call-from-pure-not-supported
[serializeError]: /en/guides/troubleshooting/#store-without-sid
