---
id: createEvent
title: createEvent
description: createEvent is a method for creating an event
---

Method for creating an [event](./Event.md)

```ts
createEvent<T>(name?): Event<T>
createEvent(name?): Event<void>
```

**Arguments**

1. `name`? (_string_): Event name

**Returns**

[_Event_](./Event.md): New event

#### Notes

[Event](./Event.md) - it is a function which allows to change state when called (see [example 1](#example-1)) also it can be a good way to extract data (see [example 2](#example-2)). Also it allows to send data to another event or effect via effector operators.

#### Example 1

```js
import {createStore, createEvent} from 'effector'

const addNumber = createEvent()

const $store = createStore(0)
	.on(addNumber, (state, number) => state + number)

$counter
  .on(incrementBy, (counter, number) => counter + number)
  .reset(resetCounter)

$counter.watch(counter => {
  console.log('counter is now', counter)
})
// => counter is now 0

incrementBy(10)
// => counter is now 10

incrementBy(10)
// => counter is now 20

incrementBy(10)
// => counter is now 30

resetCounter()
// => counter is now 0
```

[Try it](https://share.effector.dev/owiebt2H)

We created a store `$counter` and an event `incrementBy`, and started watching the store.<br/>
Notice the function call `incrementBy(10)`. Whenever you will call `incrementBy(10)`, you can look at the console and see how state of `$counter` changes.

#### Example 2

```js
import {createEvent} from 'effector'

const extractPartOfArray = createEvent()
const array = extractPartOfArray.map(arr => arr.slice(2))

array.watch(part => {
  console.log(part)
})

extractPartOfArray([1, 2, 3, 4, 5, 6])
// => [3, 4, 5, 6]
```

[Try it](https://share.effector.dev/5bhphBL7)
