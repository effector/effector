---
id: createApi
title: createApi
hide_title: true
---

# `createApi(store, api)`

`createApi` is a short-hand for creating events attached to store

#### Arguments

1. `store` (_Store_)
2. `api` (_Object_)

### Returns

(_`Object`_)

#### Example

```js try
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
