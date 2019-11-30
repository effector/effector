---
id: createStoreObject
title: createStoreObject
hide_title: true
---

# `createStoreObject(objectShape)`

An alias for `combine({field: storeA, another: storeB})`. See [_`combine`_](combine.md)

#### Arguments

1. `objectShape` (_Object_)

#### Returns

([_`Store`_](Store.md)): An object that holds the state tree. There can be multiple stores.

#### Example

```js try
const balance = createStore(0)
const username = createStore('zerobias')

const root = createStoreObject({balance, username})

root.watch(data => console.log(data)) // {balance: 0, username: 'zerobias'}
```
