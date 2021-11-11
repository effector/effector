---
id: sample
title: sample
---

This method can be used for linking two nodes, resulting the third one, which will fire only upon `clock` node trigger.

Quite a common case, when you need to handle some event with some store's state. Instead of using `store.getState()`, which may cause race conditions and inconsistency of state, it is more suitable to use `sample` method.

## Formulae

```ts
sample({ source?, clock?, fn?, target?}): target
```

When `clock` is triggered, read the value from `source` and trigger `target` with it.

- If the `clock` is not passed, sample will be trigged on every `source` update.
- If the `fn` is passed, pass value from `source` through before passing to `target`
- If the `target` is not passed, create it and return from `sample()`

## Schema

![](./images/sample-visualization.gif)

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
const $store = sample({clock: $store, source: $store})
// Result will be store, because source and clock are stores.

const event = sample({clock: event, source: $store})
// Because not all arguments are stores.
```

## `sample({clock?, source, fn?, target?, greedy?})`

**Arguments**

`params` (_Object_): Configuration object

- `clock?`: [Unit](../../glossary.md#common-unit) or array of units
  - If event or effect: trigger `target` upon event or effect is called
  - If store: trigger `target` upon store is updated
  - If array of units: trigger `target` upon any given unit is called or updated. Shorthand for inline [merge](./merge.md) call
  - If not passed: `source` is used as `clock`
- `source?`: [Unit](../../glossary.md#common-unit) or object/array with stores
  - If event or effect: take last invocation argument value. That event or effect must be invoked at least once
  - If store: take current state of given store
  - If array or object with stores: take values from given stores combined to object or array. Shorthand for inline [combine](./combine.md) call
  - If not passed: `clock` is used as `source`
- `target?`: [Unit](../../glossary.md#common-unit) or array of units
  - If event or effect: call given event or effect upon `clock` is triggered
  - If store: update given store upon `clock` is triggered
  - If array of units: trigger every given unit upon `clock` is triggered
  - If not passed: new unit will be created under the hood and will be returned as result of the `sample()` call. Type of created target is described [in table beyond](./sample.md#type-of-the-created-target)
- `fn?` (_(sourceData, clockData) => result_): Combinator function, which will transform data from `source` and `clock` before passing it to `target`, [should be **pure**](../../glossary.md#purity). If not passed, data from `source` will be passed to `target` as it is
- `greedy?` (boolean) Modifier defines whether sampler will wait for resolving calculation result, and will batch all updates, resulting only one trigger, or will be triggered upon every linked node invocation, e.g. if `greedy` is `true`, `sampler` will fire on trigger of every node, linked to clock, whereas `non-greedy sampler(greedy: false)` will fire only upon the last linked node trigger

:::note
Array of units in target are supported since effector 21.8.0
:::

**Returns**

([_Event_](Event.md) | [_Store_](Store.md)) - Unit, which fires/updates upon `clock` is trigged, if `source` is not passed.
[The type of returned unit depends on the types of clock and source.](#type-of-the-created-target).

#### Example

```js
const submitForm = createEvent()
const signInFx = createEffect(params => {
  console.log(params)
})

const $userName = createStore('john')

sample({
  clock: submitForm /* 1 */,
  source: $userName /* 2 */,
  fn: (name, password) => ({name, password}) /* 3 */,
  target: signInFx /* 4 */,
})

submitForm(12345678)
// 1. when submitForm is called with params (12345678)
// 2. take $userName store`s state ('john')
// 3. transform payload from event (1) and current store`s state (2)
// 4. trigger effect signInFx with params received at the step (3)
```

[Try it](https://share.effector.dev/8Ohtx2cq)

## `sample(sourceUnit, clockUnit, fn?)`

It is just another form of the `sample` invocation, with the same sense.

**Arguments**

- `sourceUnit`: Source [unit](../../glossary.md#common-unit)
  - If event or effect. Take last invocation argument value. That event or effect must be invoked at least once
  - If store. Take current store`s state
- `clockUnit`: Clock [unit](../../glossary.md#common-unit). If not passed, `source` is used as clock
  - If event or effect. Trigger sampled unit, upon event or effect is called
  - If store. Trigger sampled unit, upon store is updated
- `fn?` (_(sourceData, clockData) => result_): Optional combinator function, [should be **pure**](../../glossary.md#purity). Since, this handler is supposed to organize data flow, you should avoid declaring side-effects here. It's more appropriate to place it in `watch` method for sampled node.

**Returns**

([_Event_](Event.md) | [_Store_](Store.md)) - Unit, which fires/updates upon `clock` is trigged, if `source` is not passed.
[The type of returned unit depends on the types of clock and source.](#type-of-the-created-target).

#### Example

```js
import {createEvent, createEffect, createStore} from 'effector'

const submitForm = createEvent()
const signInFx = createEffect(params => {
  console.log(params)
})

const $userName = createStore('john')

const sampleUnit = sample(
  $userName /* 2 */,
  submitForm /* 1 */,
  (name, password) => ({name, password}) /* 3 */
)
/* 5 */
forward({
  from: sampleUnit,
  to: signInFx,
})

submitForm(12345678)
// 1. when submitForm is called with params (12345678)
// 2. take $userName store`s state ('john')
// 3. transform payload from event (1) and current store`s state (2)
// 4. when sampleUnit (event in this case) is trigered,
//    send it payload to effect signIn with params received at the step (3)
```

[Try it](https://share.effector.dev/lVtVtwrW)

## `sample({name?})`

:::note since
effector 20.4.0
:::

Every [unit](../../glossary.md#unit) in effector may have a name.  
You now can name sampled entities in the same manner as basic ones.

```js
import {createStore, sample} from 'effector'

const $store = createStore(null)

const sampled = sample({
  source: $store,
  name: 'sampled $store',
})

console.log(sampled.shortName) // 'sampled foo'
```

## Objects and arrays of _Store_ in `sample({ source })`

### Object of stores

:::note since
effector 20.8.0
:::
`sample` can be called with object of [_Store_](Store.md) as `source`:

```js
import {createStore, createEvent, sample} from 'effector'
const trigger = createEvent()

const $a = createStore('A')
const $b = createStore(1)

// Target has type `Event<{ a: string, b: number }>`
const target = sample({
  clock: trigger,
  source: {
    a: $a,
    b: $b,
  },
})

target.watch(obj => {
  console.log('sampled object', obj)
})

trigger()
// => sampled object {a: 'A', b: 1}
```

[Try it](https://share.effector.dev/tj0oiC01)

### Array of stores

:::note since
effector 20.8.0
:::
`sample` can be called with array of [_Store_](Store.md) as `source`:

```js
import {createStore, createEvent, sample} from 'effector'
const trigger = createEvent()

const $a = createStore('A')
const $b = createStore(1)

// Target has type `Event<[string, number]>`
const target = sample({
  clock: trigger,
  source: [$a, $b],
})

target.watch(obj => {
  console.log('sampled array', obj)
})

// You can easily destructure arguments to set explicit names
target.watch(([a, b]) => {
  console.log('explicit names', a, b)
})

trigger()
// => sampled array ["A", 1]
// => explicit names "A" 1
```

[Try it](https://share.effector.dev/M92jJXE9)

### Support array in clock

:::note since
effector 21.2.0
:::

Support for sample clock field which acts like a merge call

```js
import {createStore, createEvent, createEffect, sample, merge} from 'effector'

const showNotification = createEvent()
const trigger = createEvent()
const fx = createEffect()

const $store = createStore('')

// array of units in clock
sample({
  clock: [trigger, fx.doneData],
  source: $store,
  target: showNotification,
})

// merged unit in clock
sample({
  clock: merge([trigger, fx.doneData]),
  source: $store,
  target: showNotification,
})
```

[Try it](https://share.effector.dev/Z7NiG4Zn)

<!-- ## Other examples

### Example 2

```js
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
  clock: merge([clickButton, closeModal]),
  source: analyticReportsEnabled,
  fn: (isEnabled, data) => ({isEnabled, data}),
})

const greedySampling = sample({
  clock: merge([clickButton, closeModal]),
  source: analyticReportsEnabled,
  fn: (isEnabled, data) => ({isEnabled, data}),
  greedy: true,
})

commonSampling.watch(data => console.log('non greedy update', data))
greedySampling.watch(data => console.log('greedy update', data))

clickButton('click A')
clickButton('click B')
```

[Try it](https://share.effector.dev/RCo60EEK)

### Example `sample(sourceEvent, clockEvent, fn?)`

```js
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

```js
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

```js
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
