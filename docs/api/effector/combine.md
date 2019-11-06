---
id: combine
title: combine
hide_title: true
---

# `combine(...stores, fn?)`

Creates a new [store](Store.md) that emits the set of latest store values from all input stores

#### Returns

([_`Store`_](Store.md)): An object that holds the state tree. There can be multiple stores.

#### Example

```js try
const balance = createStore(0)
const username = createStore('zerobias')

const greeting = combine(balance, username, (balance, username) => {
  return `Hello, ${username}. Your balance is ${balance}`
})

greeting.watch(data => console.log(data)) // => Hello, zerobias. Your balance is 0

const arrStores = combine(balance, username)
arrStore.watch(console.log) // => [0, 'zerobias']
```


# `combine({ A, B, C }, fn?)`
Creates a new [store](Store.md) that emits the set of latest store values from all input stores

#### Returns

([_`Store`_](Store.md)): An object that holds the state tree. There can be multiple stores.

#### Example
```js try
const r = createStore(255)
const g = createStore(0)
const b = createStore(255)

const color = combine({r, g, b})
color.watch(console.log) // => {r: 255, b: 0, b: 255}

const sum = combine({r, g, b}, ({r, g, b}) => r + g + b)
sum.watch(console.log) // => 510
```

# `combine([A, B, C], fn?)`


#### Returns

([_`Store`_](Store.md)): An object that holds the state tree. There can be multiple stores.

#### Example

```js try
const r = createStore(255)
const g = createStore(0)
const b = createStore(255)

const color = combine([r, g, b])
color.watch(console.log) // => [255, 0, 255]

const sum = combine({r, g, b}, ([r, g, b]) => r + g + b)
sum.watch(console.log) // => 510
```
