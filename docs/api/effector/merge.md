---
id: merge
title: merge
hide_title: true
---

# `merge([eventA, eventB])`

Creates an [event](merge.md), which fires when one of passed events has triggered

#### Arguments

1. `events` _(array)_: [events](Event.md) list

#### Returns

([_`Event`_](Event.md))

#### Example

```js
import { createEvent, merge } from 'effector'

const foo = createEvent()
const bar = createEvent()
const baz = merge([foo, bar])

baz.watch(value => console.log(`merged event triggered: ${value}`))

foo('foo') // => merged event triggered: foo
bar('bar') // => merged event triggered: bar

```

for example, we should set form submitting status to `false` after request sucessed or returned error.

```js
import { createStore, createEffect, merge } from 'effector'

const submit = createEffect('submit form', {
  handler: () => new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
})

const submitting = createStore(false)
    .on(submit, () => true)
    .on(merge([submit.done, submit.fail]), () => false)
    
submit()
```