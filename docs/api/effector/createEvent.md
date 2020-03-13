---
id: createEvent
title: createEvent
hide_title: true
---

# `createEvent(name?)`

Creates an [Event](Event.md). In other words you create intention.<br/>
You can pass `name` if you want.

#### Arguments

1. `name`? (_string_): [Event](Event.md) name.

#### Returns

([_Event_](Event.md)): An intention to change state (see notes).

#### Notes

[Event](Event.md) - it is a function which called allow to change state, see Example 1 also it could be good opportunity to data extract, see Example 2 and we discuss it next section.

#### Example 1

```js try
import {createStore, createEvent} from 'effector'
const store = createStore(0)
const addNumber = createEvent()
store.on(addNumber, (state, number) => state + number)
store.watch(state => {
  console.log('state', state)
})
// => 0

addNumber(10)
// => 10

addNumber(10)
// => 20

addNumber(10)
// => 30
```

[Try it](https://share.effector.dev/BlvDKg17)

Let's talk about what happened. We created store and event (addNumber), and started to watch the store.<br/>
You should pay attention to `addNumber(10)`. Whenever you will call `addNumber(10)` you may see in console how state will change.

#### Example 2

```js try
import {createEvent} from 'effector'

const extractPartOfArray = createEvent()
const array = extractPartOfArray.map(arr => arr.slice(2))

array.watch(part => {
  console.log(part)
})
extractPartOfArray([1, 2, 3, 4, 5, 6])
// => [3, 4, 5, 6]
```

[Try it](https://share.effector.dev/4lWsZr2k)
