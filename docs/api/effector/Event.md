---
id: event
title: Event
---

_Event_ is an intention to change state.

### Event Methods

- [`watch(watcher)`](#watch)
- [`map(fn)`](#map)
- [`filter({fn})`](#filter)
- [`filter(fn)`](#filtermap)
- [`prepend(fn)`](#prepend)

## Event Methods

### <a id='watch'></a>[`watch(watcher)`](#watch)

#### Returns

(Subscription): Unsubscribe function

<hr>

### <a id='map'></a>[`map(fn)`](#map)

Сreates a new event, which will be called after the original event is called, applying the result of a `fn` as a payload.

#### Returns

(Event): New event

<hr>

### <a id='filter'></a>[`filter({fn})`](#filter)

Сreates a new event, which will be called after the original event is called, if `fn` returns true.

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

[try it](https://share.effector.dev/XHDQ3FDX)

#### Returns

(Event): New event

<hr>

### <a id='filtermap'></a>[`filter(fn)`](#filtermap)

Сreates a new event, which will be called after the original event is called, if `fn` returns **not undefined**.

#### Example

```javascript
import React from 'react'

import {createEvent, createStore} from 'effector'

const openModal = createEvent('open that modal')

const openModalUnboxed = openModal.filter(ref => {
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

[try it](https://share.effector.dev/axd5A0G5)

#### Returns

(Event): New event

<hr>

### <a id='prepend'></a>[`prepend(fn)`](#prepend)

#### Returns

(Event): New event

<hr>
