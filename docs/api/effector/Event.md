---
id: event
title: Event
---

_Event_ is an intention to change the state. Let's imagine life situation, you enter a shop and, according to etiquette, you have to say "hello" - **intention**, then you say "hello" - **event**.

Event calls always return its payload:

```js
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

It is a function which allows you to watch the event or to create side-effects.

#### Formulae

```ts
const unwatch = event.watch(fn)
```

- Call `fn` on each `event` trigger, pass payload of `event` as argument to `fn`
- When `unwatch` is called, stop calling `fn` on each `event` trigger

<!--If you want to know, when watch is called, welcome to advanced section-->

#### Arguments

1. `watcher` ([_Watcher_](../../glossary.md#watcher)): A function that receives `payload`.

#### Returns

[_Subscription_](../../glossary.md#subscription): Unsubscribe function.

#### Example

```js
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

#### Formulae

```ts
const second = first.map(fn)
```

- When `first` is triggered, pass payload from `first` to `fn`
- Trigger `second` with the result of the `fn()` call as payload

#### Arguments

1. `fn` (_Function_): A function that receives `payload`, [should be **pure**](../../glossary.md#pureness).

#### Returns

[_Event_](Event.md): New event.

#### Example

```js
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

Let's assume a standard situation when you want to buy sneakers in the shop, but there is no size. You subscribe to a particular size of the sneakers model, and in addition, you want to receive a notification if they have it, and ignore any other notification. Therefore filtering can be helpful for that. Event filtering works in the same way. If filter returns `true`, the event will be called.

#### Formulae

```ts
const second = first.filter({fn})
```

- When `first` is triggered, pass payload from `first` to `fn`
- If `fn()` returns `true`, `second` will be triggered with payload from `first`

#### Arguments

1. `fn` (_Function_): A function that receives `payload`, [should be **pure**](../../glossary.md#pureness).

#### Returns

[_Event_](Event.md): New event.

:::note
Object form is used because `event.filter(fn)` was an alias for [event.filterMap](./Event.md#filtermapfn)
:::

:::note
[`guard`](./guard.md) method is the preferred filtering method
:::

#### Example

```js
import {createEvent, createStore} from 'effector'

const numbers = createEvent()

const positiveNumbers = numbers.filter({
  fn: ({x}) => x > 0,
})

const lastPositive = createStore(0).on(positiveNumbers, (n, {x}) => x)

lastPositive.watch(x => {
  console.log('last positive:', x)
})

// => last positive: 0

numbers({x: 0})
// no reaction

numbers({x: -10})
// no reaction

numbers({x: 10})
// => last positive: 10
```

[Try it](https://share.effector.dev/H2Iu4iJH)

<hr />

### `filterMap(fn)`

Creates a new event, which will be called after the original event is called if `fn` returns a value other than **undefined**.  
Imagine a situation, you come up to a grocery store and you have let's say a task: you need to buy 10 apples, but only those that are red, otherwise nothing.
Let's consider by steps:

1. Take one apple;
2. Have a look, is it red(put in a pack) or not(take another).

And you repeat this until you complete the task. Now think about it in the Effector terms and we consider the positive case:

1. Take an apple - event;
2. Have a look, red or no - filter;
3. You keep it - map;
4. Put in pack - event.
5. Pack - store

You may see that we united `filter()` and `map()` methods, the reason for creating was an impossibility to event filtering.

#### Formulae

```ts
const second = first.filterMap(fn)
```

- When `first` is triggered, call `fn` with payload from `first`
  - If `fn()` returned `undefined` do not trigger `second`
  - If `fn()` returned some data, trigger `second` with data from `fn()`

#### Arguments

1. `fn` (_Function_): A function that receives `payload`, [should be **pure**](../../glossary.md#pureness).

#### Returns

[_Event_](Event.md): New event.

#### Example

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {createEvent, createStore} from 'effector'

const openModal = createEvent()
const closeModal = createEvent()

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

[Try it](https://share.effector.dev/abn4EMNa)

<hr />

### `prepend(fn)`

Creates an event, upon trigger it sends transformed data into the source event. Works kind of like reverse `.map`. In case of `.prepend` data transforms **before the original event occurs** and in the case of `.map`, data transforms **after original event occurred**.

#### Formulae

```ts
const second = first.prepend(fn)
```

- When `second` event is triggered
- Call `fn` with payload from `second`
- Trigger `first` with result of `fn()`

#### Arguments

1. `fn` (_Function_): A function that receives `payload`, [should be **pure**](../../glossary.md#pureness).

#### Returns

[_Event_](Event.md): New event.

#### Example

```js
import {createEvent} from 'effector'

const nameChanged = createEvent()
nameChanged.watch(name => console.log(`Current name is: ${name}`))
/*
  Event nameChanged was created at this point
  in another  file or library and imported as is.
  So we can`t create maped version of it, 
  from inputChanged event, like this 👇
  
  const inputChanged = createEvent();
  const  nameChanged = inputChanged.map(e => e.target.value);
  
  But we can create prepended inputChanged from nameChanged!
*/
const inputChanged = nameChanged.prepend(e => e.target.value)
// event, which will be bound to DOM element

const input = document.createElement('input')
input.onchange = inputChanged

document.body.appendChild(input)
// input something in input, and press Enter
// => Current name is: something
```

[Try it](https://share.effector.dev/1rHlEeTy)
