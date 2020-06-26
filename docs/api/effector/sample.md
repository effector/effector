---
id: sample
title: sample
hide_title: true
---

# sample

This method can be used for linking two nodes, resulting the third one, which will fire only upon `clock` node trigger.

Quite a common case, when you need to handle some event with some store's state. Instead of using `store.getState()`, which may cause race conditions and inconsistency of state, it is more suitable to use `sample` method.


## Formulae

```ts
sample({ source, clock?, fn?, target?}): target
```

When `clock` is triggered, read the value from `source` and trigger `target` with it.

- If the `clock` is not passed, sample will be trigged on every `source` update.
- If the `fn` is passed, pass value from `source` through before passing to `target`
- If the `target` is not passed, create it and return from `sample()`

## Schema
![](https://s7.gifyu.com/images/ezgif.com-video-to-gif855ab4c69b9b103c.gif)

## Type of the created `target`

If `target` is not passed to `sample()` call, it will be created internally. The type of the unit is described in the table below:

| clock\source          | [_Store_](Store.md) | [_Event_](Event.md) | [_Effect_](Effect.md) |
| --------------------- | ------------------- | ------------------- | --------------------- |
| [_Store_](Store.md)   | `Store`             | `Event`             | `Event`               |
| [_Event_](Event.md)   | `Event`             | `Event`             | `Event`               |
| [_Effect_](Effect.md) | `Event`             | `Event`             | `Event`               |

How to read it:

1. You need to know type of the `source`, it is a column
2. Type of the `clock` in the rows
3. Match the column and the row

For example:

```ts
const $store = sample({ source: $store, clock: $store });
// Result will be store, because source and clock are stores.

const event = sample({ source: $store, clock: event });
// Because not all arguments are stores.
```

## `sample({source, clock?, fn?, target?, greedy?})`

#### Arguments

`params` (_Object_): Configuration object

   * `source` ([_Event_](Event.md) | [_Effect_](Effect.md) | [_Store_](Store.md)): Source unit.
     * If event. Take last event invocation argument value. Event must be invoked at least once.
     * If effect. Take last effect invocation argument value. Effect must be invoked at least once.
     * If store. Take current store`s state.
   * `clock?` ([_Event_](Event.md) | [_Effect_](Effect.md) | [_Store_](Store.md)): Clock unit. If not  passed, the `source` is used as clock.
     * If event. Triger sampled unit, upon event is called.
     * If effect. Triger sampled unit, upon effect is called.
     * If store. Triger sampled unit, upon store is updated.
   * `fn?` (_(sourceData, clockData) => result_): Optional combinator function, [should be **pure**](../../glossary.md#pureness). Since, this handler is supposed to organize data flow, you should avoid declaring side-effects here. It's more appropriate to place it in `watch` method for sampled node.
   * `target?` ([_Event_](Event.md) | [_Effect_](Effect.md) | [_Store_](Store.md)): can contain Unit, which accepts payload returned by `fn`. In case if target is not passed, it's created "under the hood" and being returned as result of the `sample()` call.
   * `greedy?` (true | false) Modifier defines whether sampler will wait for resolving calculation result, and will batch all updates, resulting only one trigger, or will be triggered upon every linked node invocation, e.g. if `greedy` is `true`, `sampler` will fire on trigger of every node, linked to clock, whereas `non-greedy sampler(greedy: false)` will fire only upon the last linked node trigger.

#### Returns

([_Event_](Event.md) | [_Store_](Store.md)) - Unit, which fires/updates upon `clock` is trigged, if `source` is not passed.
[The type of returned unit depends on the types of clock and source.](#type-of-the-created-target).

#### Example

```js try
const $userName = createStore('john')
const signIn = createEffect({handler: console.log})
const submitForm = createEvent()

sample({
  source: $userName, /* 2 */
  clock: submitForm, /* 1 */
  fn: (name, password) => ({name, password}), /* 3 */
  target: signIn, /* 4 */
})

submitForm(12345678)
// 1. when submitForm is called with params (12345678)
// 2. take $userName store`s state ('john')
// 3. transform payload from event (1) and current store`s state (2)
// 4. triger effect signIn with params received at the step (3)
```

[Try it](https://share.effector.dev/vAV3tMKV)

## `sample(sourceUnit, clockUnit, fn?)`

It is just another form of the `sample` invocation, with the same sense.

#### Arguments

* `sourceUnit` ([_Event_](Event.md) | [_Effect_](Effect.md) | [_Store_](Store.md)): Source unit.
    * If event. Take last event invocation argument value. Event must be invoked at least once.
    * If effect. Take last effect invocation argument value. Effect must be invoked at least once.
    * If store. Take current store`s state.
* `clockUnit` ([_Event_](Event.md) | [_Effect_](Effect.md) | [_Store_](Store.md)): Clock unit. If not  passed, the `source` is used as clock.
    * If event. Triger sampled unit, upon event is called.
    * If effect. Triger sampled unit, upon effect is called.
    * If store. Triger sampled unit, upon store is updated.
* `fn?` (_(sourceData, clockData) => result_): Optional combinator function, [should be **pure**](../../glossary.md#pureness). Since, this handler is supposed to organize data flow, you should avoid declaring side-effects here. It's more appropriate to place it in `watch` method for sampled node.

#### Returns

([_Event_](Event.md) | [_Store_](Store.md)) - Unit, which fires/updates upon `clock` is trigged, if `source` is not passed.
[The type of returned unit depends on the types of clock and source.](#type-of-the-created-target).

#### Example

```js try
const $userName = createStore('john')
const signIn = createEffect({handler: console.log})
const submitForm = createEvent()

const sampleUnit = sample(
  $userName /* 2 */,
  submitForm /* 1 */,
  (name, password) => ({name, password}) /* 3 */
)
/* 5 */
forward({
  from: sampleUnit,
  to: signIn,
})

submitForm(12345678)
// 1. when submitForm is called with params (12345678)
// 2. take $userName store`s state ('john')
// 3. transform payload from event (1) and current store`s state (2)
// 4. when sampleUnit (event in this case) is trigered,
//    send it payload to effect signIn with params received at the step (3)
```
[Try it](https://share.effector.dev/rPupnEQS)

## Objects and arrays of _Store_ in `sample({ source })`

### Object of stores

`sample` can be called with object of [_Store_](Store.md) as `source`:

```js try
import { createStore, createEvent, sample } from 'effector'
const trigger = createEvent()

const a = createStore('A')
const b = createStore(1)

// Target has type `Event<{ a: string, b: number }>`
const target = sample({
  source: { a, b },
  clock: trigger,
})

target.watch((obj) => {
  console.log('sampled object', obj)
  // => {a: 'A', b: 1}
})
```

[Try it](https://share.effector.dev/hiGwHrX4)

### Array of stores

`sample` can be called with array of [_Store_](Store.md) as `source`:

```js try
import { createStore, createEvent, sample } from 'effector'
const trigger = createEvent()

const a = createStore('A')
const b = createStore(1)

// Target has type `Event<[string, number]>`
const target = sample({
  source: [a, b],
  clock: trigger,
})

target.watch((obj) => {
  console.log('sampled array', obj)
  // => ["A", 1]
})

// You can easily destructure arguments to set explicit names
target.watch(([a, b]) => {
  console.log('Explicit names', a, b)
  // => "A" 1
})
```

[Try it](https://share.effector.dev/aQPLBJ2j)


<!-- ## Other examples

### Example 2

```js try
import {createEvent, createStore, sample} from 'effector'

const clickButton = createEvent()
const closeModal = clickButton.map(() => 'close modal')

const lastEvent = createStore(null)
  .on(clickButton, (_, data) => data)
  .on(closeModal, () => 'modal')

lastEvent.updates.watch(data => {
  // here we need everything
  //console.log(`sending important analytics event: ${data}`)
})

lastEvent.updates.watch(data => {
  //here we need only final value
  //console.log(`render <div class="yourstatus">${data}</div>`)
})

const analyticReportsEnabled = createStore(false)

const commonSampling = sample({
  source: analyticReportsEnabled,
  clock: merge([clickButton, closeModal]),
  fn: (isEnabled, data) => ({isEnabled, data}),
})

const greedySampling = sample({
  source: analyticReportsEnabled,
  clock: merge([clickButton, closeModal]),
  fn: (isEnabled, data) => ({isEnabled, data}),
  greedy: true,
})

commonSampling.watch(data => console.log('non greedy update', data))
greedySampling.watch(data => console.log('greedy update', data))

clickButton('click A')
clickButton('click B')
```

[Try it](https://share.effector.dev/yI70z0nd)

### Example `sample(sourceEvent, clockEvent, fn?)`

```js try
import {createEvent, sample} from 'effector'

const event1 = createEvent()
const event2 = createEvent()

const sampled = sample(event1, event2, (a, b) => `${a} ${b}`)
sampled.watch(console.log)

event1('Hello')
event2('World') // => Hello World
event2('effector!') // => Hello effector!

sampled('Can be invoked too!') // => Can be invoked too!
```

[Try it](https://share.effector.dev/vXKWDhwL)

### Example `sample(event, store, fn?)`

```js try
import {createEvent, createStore, sample} from 'effector'

const event = createEvent()
const inc = createEvent()
const count = createStore(0).on(inc, state => state + 1)

const sampled = sample(
  event,
  count,
  (c, i) => `Current count is ${i}, last event invocation: ${c}`,
)
sampled.watch(console.log)

inc() // => nothing

event('foo')
inc() // => Current count is 2, last event invocation: foo

event('bar')
inc() // => Current count is 3, last event invocation: bar
```

[Try it](https://share.effector.dev/L4nbGjxM)

### Example `sample(sourceStore, clockStore, fn?)`

```js try
import {createEvent, createStore, sample} from 'effector'

const inc = createEvent()
const setName = createEvent()

const name = createStore('John').on(setName, (_, v) => v)

const clock = createStore(0).on(inc, i => i + 1)

const sampled = sample(name, clock, (name, i) => `${name} has ${i} coins`)
sampled.watch(console.log)
// => John has 0 coins (initial store update triggered sampled store)

setName('Doe')
inc() // => Doe has 1 coins
```

[Try it](https://share.effector.dev/h3zED3yW) -->
