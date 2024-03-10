---
title: createApi
redirectFrom:
  - /api/effector/createApi
  - /docs/api/effector/createApi
---

```ts
import { createApi } from "effector";
```

`createApi` is a shortcut for generating [events](/en/api/effector/Event) connected to a [store](/en/api/effector/Store) by supplying an object with [_reducers_](/en/explanation/glossary#reducer) for these events. If the source `store` is part of a [domain](/en/api/effector/Domain), then the newly created events will also be within that domain.

# Methods (#methods)

## `createApi(store, api)` (#methods-createApi-store-api)

### Formulae (#methods-createApi-store-api-formulae)

```ts
createApi(store, api): objectWithEvents
```

### Arguments (#methods-createApi-store-api-arguments)

1. `store` [_Store_](/en/api/effector/Store)
2. `api` (_Object_) An object with [_reducers_](/en/explanation/glossary#reducer)

### Returns (#methods-createApi-store-api-returns)

(_Object_) An object with [events](/en/api/effector/Event)

### Examples (#methods-createApi-store-api-examples)

```js
import { createStore, createApi } from "effector";

const $playerPosition = createStore(0);

// Creating events and attaching them to the store
const api = createApi($playerPosition, {
  moveLeft: (pos, offset) => pos - offset,
  moveRight: (pos, offset) => pos + offset,
});

$playerPosition.watch((pos) => {
  console.log("position", pos);
});
// => position 0

api.moveRight(10);
// => position 10
api.moveLeft(5);
// => position 5
```

[Try it](https://share.effector.dev/SjVy8dzF)
