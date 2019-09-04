---
id: event
title: Event
---

_Event_ is an intention to change state.

## Event Methods

### `watch(watcher)`

#### Returns

(_`Subscription`_): Unsubscribe function

#### Example
```js
import { createEvent } from "effector";

const sayHi = createEvent();
const unwatch = sayHi.watch((name) => console.log(`${name}, hi there!`));
                            
sayHi("Peter"); // => Peter, hi there! 
unwatch();

sayHi("Drew"); // => nothing happened
```
[Try it](https://share.effector.dev/rcbKQbEn)

<hr>

### `map(fn)`

Сreates a new event, which will be called after the original event is called, applying the result of a `fn` as a payload.

#### Arguments

1. `fn` (_`Function`_): A function that receives `payload`, should be **pure**.

#### Returns

(_`Event`_): New event

#### Example
```js
import { createEvent } from "effector";

const userUpdated = createEvent();
const userNameUpdated = userUpdated.map(({name}) => name); // you may decompose dataflow with `.map` method
const userRoleUpdated = userUpdated.map(({role}) => role.toUpperCase()); // either way you can transform data

userNameUpdated.watch((name) => console.log(`User's name is [${name}] now`));
userRoleUpdated.watch((name) => console.log(`User's role is [${name}] now`));

userUpdated({name: "john", role: "admin"});
 // => User's name is [john] now 
 // => User's role is [ADMIN] now
```
[Try it](https://share.effector.dev/EM5OSZGM)
<hr>

### `filter({fn})`

Сreates a new event, which will be called after the original event is called, if `fn` returns true.

#### Arguments

1. `fn` (_`Function`_): A function that receives `payload`, should be **pure**.

#### Returns

(_`Event`_): New event

#### Example

```javascript
import {createEvent, createStore} from 'effector'

const numbers = createEvent('event with {x: number}')

const positiveNumbers = numbers.filter({
  fn: ({x}) => x > 0,
})

const lastPositive = createStore(0)
	.on(positiveNumbers, (n, {x}) => x)

```
[Try it](https://share.effector.dev/XHDQ3FDX)

<hr />

### `filterMap(fn)`

Сreates a new event, which will be called after the original event is called, if `fn` returns **not undefined**.

#### Arguments

1. `fn` (_`Function`_): A function that receives `payload`, should be **pure**.

#### Returns

(_`Event`_): New event


#### Example

```javascript
import React from 'react'

import {createEvent, createStore} from 'effector'

const openModal = createEvent('open that modal')

const openModalUnboxed = openModal.filterMap(ref => {
  if (ref.current) return ref.current
})

openModalUnboxed.watch(modal => modal.showModal())

const closeModal = createEvent('close that modal')

closeModal
  .filter(ref => {
    if (ref.current) return ref.current
  })
  .watch(modal => modal.close())

const modalRef = React.createRef()

const App = () => (
  <>
    <dialog ref={modalRef}>
      <form method='dialog'>
        <fieldset>
          <legend>Modal</legend>
          Tap to close
          <button type='submit' onSubmit={() => closeModal(modalRef)}>
            ❌
          </button>
        </fieldset>
      </form>
    </dialog>

    <button onClick={() => openModal(modalRef)}>Open modal</button>
  </>
)


```

[Try it](https://share.effector.dev/axd5A0G5)

<hr />

### `prepend(fn)`

Creates an event, upon trigger it does send transformed data into source event. Works kind of like reverse `.map`. In the case of `.prepend` data transforms **before the original event occurs** and in the case of `.map`, data transforms **after original event occurred**.

#### Arguments

1. `fn` (_`Function`_): A function that receives `payload`, should be **pure**.

#### Returns

(_`Event`_): New event

#### Example
```js
import { createEvent } from "effector";

const nameChanged = createEvent();
nameChanged.watch((name) => console.log(`Current name is: ${name}`));

const inputChanged = nameChanged.prepend((e) => e.target.value); // event, which will be bound to DOM element
const input = document.createElement("input");
input.onchange = inputChanged;

document.body.appendChild(input);
  // input something in input, and press Enter
  // => Current name is: something
```
[Try it](https://share.effector.dev/xv3E9OfR)
<hr>
