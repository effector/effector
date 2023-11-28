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

const incrementBy = createEvent()
const resetCounter = createEvent()
const $counter = createStore(0)

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

[Try it](https://share.effector.dev/oFkPG4yJ)

We created a store `$counter` and an event `incrementBy`, and started watching the store.<br/>
Notice the function call `incrementBy(10)`. Whenever you will call `incrementBy(10)`, you can look at the console and see how state of `$counter` changes.

#### Example 2

```js
import {createEvent} from 'effector'

const fullNameReceived = createEvent()

const firstNameReceived = fullNameReceived.map(
  fullName => fullName.split(' ')[0]
)
const lastNameReceived = fullNameReceived.map(
  fullName => fullName.split(' ')[1]
)
const firstNameUppercaseReceived = firstNameReceived.map(
  firstName => firstName.toUpperCase()
)

firstNameReceived.watch(firstName => console.log('First name', firstName))
lastNameReceived.watch(lastName => console.log('Last name', lastName))
firstNameUppercaseReceived.watch(firstName =>
  console.log('Upper case', firstName)
)

fullNameReceived('John Doe')
// => First name John
// => Last name Doe
// => Upper case JOHN
```

[Try it](https://share.effector.dev/TJWghQ2z)
