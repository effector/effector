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
// Create store
const playerPosition = createStore({x: 0, y: 0}) // <-- Default state


// Attach events to store and create them
const api = createApi(playerPosition, {
  moveLeft: ({x, y}, n) => ({x, y: y + n}),
  moveRight: ({x, y}, n) => ({x, y: y - n}),
})

api.moveLeft(10)
api.moveRight(5)
```
