---
id: combine
title: combine
hide_title: true
---

# combine

Store combinator

## `combine(...stores, fn)`

Creates a new [store](Store.md) that emits the set of latest store values from all input stores

#### Returns

[_Store_](Store.md): New store

#### Example

```js try
import {createStore, combine} from 'effector'

const balance = createStore(0)
const username = createStore('zerobias')

const greeting = combine(balance, username, (balance, username) => {
  return `Hello, ${username}. Your balance is ${balance}`
})

greeting.watch(data => console.log(data)) // => Hello, zerobias. Your balance is 0

const arrStores = combine([balance, username])
arrStores.watch(console.log) // => [0, 'zerobias']
```

[Try it](https://share.effector.dev/jyX3NCLt)

## `combine({ A, B, C }, fn?)`

Creates a new [store](Store.md) that emits the set of latest store values from all input stores

#### Returns

[_Store_](Store.md): New store

:::note
Formerly known as `createStoreObject`
:::

#### Example

```js try
import {createStore, combine} from 'effector'

const r = createStore(255)
const g = createStore(0)
const b = createStore(255)

const color = combine({r, g, b})
color.watch(console.log) // => {r: 255, b: 0, b: 255}

const sum = combine({r, g, b}, ({r, g, b}) => r + g + b)
sum.watch(console.log) // => 510
```

[Try it](https://share.effector.dev/9AckAVg7)

## `combine([A, B, C], fn?)`

#### Returns

[_Store_](Store.md): New store

#### Example

```js try
import {createStore, combine} from 'effector'

const r = createStore(255)
const g = createStore(0)
const b = createStore(255)

const color = combine([r, g, b])
color.watch(console.log)
// => [255, 0, 255]

const sum = combine([r, g, b], ([r, g, b]) => r + g + b)
sum.watch(console.log)
// => 510
```

[Try it](https://share.effector.dev/ch4CKPrX)
