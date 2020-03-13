---
id: event
title: Event
---

_Event_ is an intention to change state. Let's imagine life situation, you come to a shop and on etiquette you should say "hello" - **intention**, then you say "hello" - **event**.

Event calls always returns its payload:

```js try
import {createEvent} from 'effector'

const event = createEvent()

console.log(event(1))
// => 1
console.log(event())
// => undefined
```

[Try it](https://share.effector.dev/iVBYDJjf)

## Event Methods

### `watch(watcher)`

It is a function which allows you to follow the event or to create side-effects.

<!--If you want to know, when watch is called, welcome to advanced section-->

#### Arguments

1. `watcher` (_Function_): A function that receives `payload`.

#### Returns

([_Subscription_](../../glossary.md#subscription)): Unsubscribe function.

#### Example

```js try
import {createEvent} from 'effector'

const sayHi = createEvent()
const unwatch = sayHi.watch(name => console.log(`${name}, hi there!`))

sayHi('Peter') // => Peter, hi there!
unwatch()

sayHi('Drew') // => nothing happened
```

[Try it](https://share.effector.dev/9YVgCl4C)

<hr/>

### `map(fn)`

Creates a new event, which will be called after the original event is called, applying the result of a `fn` as a payload. It is special function which allows you to decompose dataflow, extract or transform data.

#### Arguments

1. `fn` (_Function_): A function that receives `payload`, must be **pure**.

#### Returns

([_Event_](Event.md)): New event.

#### Example

```js try
import {createEvent} from 'effector'

const userUpdated = createEvent()
const userNameUpdated = userUpdated.map(({name}) => name) // you may decompose dataflow with .map() method
const userRoleUpdated = userUpdated.map(({role}) => role.toUpperCase()) // either way you can transform data

userNameUpdated.watch(name => console.log(`User's name is [${name}] now`))
userRoleUpdated.watch(role => console.log(`User's role is [${role}] now`))

userUpdated({name: 'john', role: 'admin'})
// => User's name is [john] now
// => User's role is [ADMIN] now
```

[Try it](https://share.effector.dev/duDut6nR)

<hr/>

### `filter({fn})`

Creates a new event, which will be called after the original event is called if `fn` returns `true`.

Let's assume a standard situation when you want to buy sneakers in the shop, but there is no size. You subscribe to the concrete size of the sneakers model, besides you want to receive a notification if there will have and don't receive others. Therefore filtering is needed for that. Event filtering works the same. If the filter returns `true`, the event will be called.

<!-- You may ask, why object as argument? If you are interesting, welcome to advanced section -->

#### Arguments

1. `fn` (_Function_): A function that receives `payload`, must be **pure**.

#### Returns

([_Event_](Event.md)): New event.

#### Example

```js try
import {createEvent, createStore} from 'effector'

const numbers = createEvent('event with {x: number}')

const positiveNumbers = numbers.filter({
  fn: ({x}) => x > 0,
})

const lastPositive = createStore(0).on(positiveNumbers, (n, {x}) => x)

numbers({x: 0}) // store won't triggered
numbers({x: -10}) // store won't triggered
numbers({x: 10}) // store will triggered
```

[Try it](https://share.effector.dev/rfTLL4bo)

<hr />

### `filterMap(fn)`

Creates a new event, which will be called after the original event is called if `fn` returns a value other than **undefined**.\
Imagine you come to the product shop and you have let's say a task: you should buy 10 apples, but only red otherwise nothing.
Let's consider by steps:

1. Take one apple;
2. Have a look red(put in a pack) or no(take another).

And you repeat this till no complete a task. Now think about it in Effector context and we consider the positive case:

1. Take an apple - event;
2. Have a look red or no - filter;
3. You keep it - map;
4. Put in pack - event.
5. Pack - store

You may see that we united `filter()` and `map()` methods, the reason for creating was an impossibility to event filtering.

#### Arguments

1. `fn` (_Function_): A function that receives `payload`, must be **pure**.

#### Returns

([_Event_](Event.md)): New event.

#### Example

```jsx try
import React from 'react'
import ReactDOM from 'react-dom'
import {createEvent, createStore} from 'effector'

const openModal = createEvent('open that modal')
const closeModal = createEvent('close that modal')

const openModalUnboxed = openModal.filterMap(ref => {
  if (ref.current) return ref.current
})

openModalUnboxed.watch(modal => modal.showModal())

closeModal
  .filter({
    fn: ref => {
      if (ref.current) return ref.current
    },
  })
  .watch(modal => modal.close())

const modalRef = React.createRef()

const App = () => (
  <>
    <dialog ref={modalRef}>
      <form method="dialog">
        <fieldset>
          <legend>Modal</legend>
          Tap to close
          <button type="submit" onSubmit={() => closeModal(modalRef)}>
            ❌
          </button>
        </fieldset>
      </form>
    </dialog>

    <button onClick={() => openModal(modalRef)}>Open modal</button>
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/IqDmMX3e)

<hr />

### `prepend(fn)`

Creates an event, upon trigger it does send transformed data into source event. Works kind of like reverse `.map`. In the case of `.prepend` data transforms **before the original event occurs** and in the case of `.map`, data transforms **after original event occurred**.

#### Arguments

1. `fn` (_Function_): A function that receives `payload`, must be **pure**.

#### Returns

([_Event_](Event.md)): New event.

#### Example

```js try
import {createEvent} from 'effector'

const nameChanged = createEvent()
nameChanged.watch(name => console.log(`Current name is: ${name}`))

const inputChanged = nameChanged.prepend(e => e.target.value) // event, which will be bound to DOM element
const input = document.createElement('input')
input.onchange = inputChanged

document.body.appendChild(input)
// input something in input, and press Enter
// => Current name is: something
```

[Try it](https://share.effector.dev/lVz4Wr1v)
