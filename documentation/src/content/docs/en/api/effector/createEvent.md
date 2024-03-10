---
title: createEvent
description: createEvent is a method for creating an event
redirectFrom:
  - /api/effector/createEvent
  - /docs/api/effector/createEvent
---

```ts
import { createEvent } from "effector";
```

# Methods (#methods)

## `createEvent(name?)` (#methods-createEvent-name)

Method for creating an [event](/en/api/effector/Event).

### Formulae (#methods-createEvent-name-formulae)

```ts
createEvent<T>(name?): Event<T>
createEvent(name?): Event<void>
```

### Arguments (#methods-createEvent-name-arguments)

1. `name`? (_string_): Event name

### Returns (#methods-createEvent-name-returns)

[_EventCallable_](/en/api/effector/Event#eventCallable): New event

### Notes (#methods-createEvent-name-notes)

[Event](/en/api/effector/Event) – it is a function which allows to change state when called (see [simple example](#methods-createEvent-name-examples-simple)) also it can be a good way to extract data (see [map and watch example](#methods-createEvent-name-examples-map-watch)). Also, it allows us to send data to another event or effect via effector operators.

### Examples (#methods-createEvent-name-examples)

#### Simple (#methods-createEvent-name-examples-simple)

```js
import { createStore, createEvent } from "effector";

const incrementBy = createEvent();
const resetCounter = createEvent();
const $counter = createStore(0);

$counter.on(incrementBy, (counter, number) => counter + number).reset(resetCounter);

$counter.watch((counter) => {
  console.log("counter is now", counter);
});
// => counter is now 0

incrementBy(10);
// => counter is now 10

incrementBy(10);
// => counter is now 20

incrementBy(10);
// => counter is now 30

resetCounter();
// => counter is now 0
```

[Try it](https://share.effector.dev/oFkPG4yJ)

We created a store `$counter` and an event `incrementBy`, and started watching the store.<br/>
Notice the function call `incrementBy(10)`. Whenever you will call `incrementBy(10)`, you can look at the console and see how state of `$counter` changes.

#### Using `.map` and `.watch` (#methods-createEvent-name-examples-map-watch)

```js
import { createEvent } from "effector";

const fullNameReceived = createEvent();

const firstNameReceived = fullNameReceived.map((fullName) => fullName.split(" ")[0]);
const lastNameReceived = fullNameReceived.map((fullName) => fullName.split(" ")[1]);
const firstNameUppercaseReceived = firstNameReceived.map((firstName) => firstName.toUpperCase());

firstNameReceived.watch((firstName) => console.log("First name", firstName));
lastNameReceived.watch((lastName) => console.log("Last name", lastName));
firstNameUppercaseReceived.watch((firstName) => console.log("Upper case", firstName));

fullNameReceived("John Doe");
// => First name John
// => Last name Doe
// => Upper case JOHN
```

[Try it](https://share.effector.dev/TJWghQ2z)
