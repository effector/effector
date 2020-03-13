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

[_Store_](Store.md): New store

#### Example

```js try
import {createStore, createStoreObject} from 'effector'

const balance = createStore(0)
const username = createStore('zerobias')

const root = createStoreObject({balance, username})

root.watch(data => console.log(data)) // {balance: 0, username: 'zerobias'}
```
