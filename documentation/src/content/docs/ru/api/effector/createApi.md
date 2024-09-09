---
title: createApi
redirectFrom:
  - /api/effector/createApi
  - /docs/api/effector/createApi
---

```ts
import { createApi } from "effector";
```

`createApi` is a shortcut for generating [events](/en/api/effector/Event) connected to a [store](/en/api/effector/Store) by supplying an object with [_reducers_](/en/explanation/glossary#reducer) for these events. Если стор принадлежит какому-либо [домену](/ru/api/effector/Domain), то новые события также будут принадлежать ему

# Methods (#methods)

## `createApi(store, api)` (#methods-createApi-store-api)

### Formulae (#methods-createApi-store-api-formulae)

```ts
declare const $store: Store<T>; // управляемый стор

const api: {
  event1: Event<S>; // созданное событие-команда
  event2: Event<Q>; // созданное событие-команда
} = createApi(
  /*store*/ $store,
  /*handlers*/ {
    event1: /*handler*/ (state: T, data: S) => T,
    event2: /*handler*/ (state: T, data: Q) => T,
  },
);
```

### Arguments (#methods-createApi-store-api-arguments)

1. **`store`**: [Стор](/ru/api/effector/Store), чьим значением требуется управлять
2. `api` (_Object_) An object with [_reducers_](/en/explanation/glossary#reducer)

### Returns (#methods-createApi-store-api-returns)

(_Object_) An object with [events](/en/api/effector/Event)

### Examples (#methods-createApi-store-api-examples)

```js
import { createStore, createApi } from "effector";

const playerPosition = createStore(0);

const api = createApi(playerPosition, {
  moveLeft: (pos, n) => pos - n,
  moveRight: (pos, n) => pos + n,
});

playerPosition.watch((pos) => {
  console.log("position", pos);
});
// => position 0

api.moveRight(10);
// => position 10

api.moveLeft(5);
// => position 5
```

[Запустить пример](https://share.effector.dev/1ujGqL37)
