---
title: createApi
lang: en-US
---

# createApi

`createApi` is a shorthand for creating [events](/api/effector/Event.md) attached to [store](/api/effector/Store.md) by providing object with [_reducers_](/explanation/glossary.md#reducer) for them. If source `store` belongs to some [domain](/api/effector/Domain.md) then new events will also belong to it

## Formulae

```ts
createApi(store, api): objectWithEvents
```

**Arguments**

1. `store` [_Store_](/api/effector/Store.md)
2. `api` (_Object_) Object with [_reducers_](/explanation/glossary.md#reducer)

**Returns**

(_`Object`_) Object with [events](/api/effector/Event.md)

### Example

```js
import {createStore, createApi} from 'effector'

const $playerPosition = createStore(0)

// create events and attach them to store
const api = createApi($playerPosition, {
  moveLeft: (pos, offset) => pos - offset,
  moveRight: (pos, offset) => pos + offset,
})

$playerPosition.watch(pos => {
  console.log('position', pos)
})
// => position 0

api.moveRight(10)
// => position 10
api.moveLeft(5)
// => position 5
```

[Try it](https://share.effector.dev/SjVy8dzF)
