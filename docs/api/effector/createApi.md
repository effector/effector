---
id: createApi
title: createApi
---

`createApi` is a shorthand for creating [events](./Event.md) attached to [store](./Store.md) by providing object with [_reducers_](../../glossary.md#reducer) for them. If source `store` belongs to some [domain](./Domain.md) then new events will belong to it as well

## Formulae

```ts
createApi(store, api): objectWithEvents
```

**Arguments**

1. `store` [_Store_](Store.md)
2. `api` (_Object_) Object with [_reducers_](../../glossary.md#reducer)

**Returns**

(_`Object`_) Object with [events](Event.md)

### Example

```js
import {createStore, createApi} from 'effector'

const playerPosition = createStore(0)

// create events and attach them to store
const api = createApi(playerPosition, {
  moveLeft: (pos, n) => pos - n,
  moveRight: (pos, n) => pos + n,
})

playerPosition.watch(pos => {
  console.log('position', pos)
})
// => position 0

api.moveRight(10)
// => position 10
api.moveLeft(5)
// => position 5
```

[Try it](https://share.effector.dev/SjVy8dzF)
