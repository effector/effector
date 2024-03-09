---
title: createApi
redirectFrom:
  - /api/effector/createApi
  - /docs/api/effector/createApi
---

`createApi` is a shorthand for creating [events](/en/api/effector/Event) attached to [store](/en/api/effector/Store) by providing an object with [_reducers_](/en/explanation/glossary#reducer) for them. If source `store` belongs to some [domain](/en/api/effector/Domain) then new events will also belong to it

# `createApi(store, api)` {#createApi-store-api}

## Formulae {#createApi-store-api-formulae}

```ts
createApi(store, api): objectWithEvents
```

## Arguments {#createApi-store-api-arguments}

1. `store` [_Store_](/en/api/effector/Store)
2. `api` (_Object_) Object with [_reducers_](/en/explanation/glossary#reducer)

## Returns {#createApi-store-api-returns}

(_Object_) Object with [events](/en/api/effector/Event)

## Examples {#createApi-store-api-examples}

```js
import { createStore, createApi } from "effector";

const $playerPosition = createStore(0);

// create events and attach them to store
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
