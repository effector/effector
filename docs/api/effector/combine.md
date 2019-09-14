---
id: combine
title: combine
hide_title: true
---

# `combine(...stores, fn)`

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

greeting.watch(data => console.log(data)) // Hello, zerobias. Your balance is 0
```
