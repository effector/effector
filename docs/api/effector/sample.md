---
id: sample
title: sample
hide_title: true
---

# sample

## `sample({ source, clock, target }): target`

Formula:

When `clock` is triggered, read the value from `source` and trigger `target` with it.

- If the `fn` is passed, pass value from `source` through before passing to `target`
- If the `target` is not passed, create it and return from `sample()`

#### Type of the created `target`

If `target` is not passed to `sample()` call, it will be created inside. The type of the unit described in the table below:

| clock\source          | [_Store_](Store.md) | [_Event_](Event.md) | [_Effect_](Effect.md) |
| --------------------- | ------------------- | ------------------- | --------------------- |
| [_Store_](Store.md)   | `Store`             | `Event`             | `Event`               |
| [_Event_](Event.md)   | `Event`             | `Event`             | `Event`               |
| [_Effect_](Effect.md) | `Event`             | `Event`             | `Event`               |

How to read it:

1. You need to know type of the `source`, it is column
2. Type of the `clock` in the rows
3. Match the column and the row

For example:

```ts
const $store = sample($store, $store);
// Result will be store, because source and clock are stores.

const event = sample($store, event);
// Because not all arguments are storess
```

## `sample(sourceStore, clockEvent, fn?)`

Overall this method can be used in order to link two nodes, resulting the third one, which will fire only upon `clock` node trigger.

Passes current `sourceStore`'s state and `clockEvent`'s value to `fn` handler. Quite a common case when you need to handle some event with some store's state. Instead of using `store.getState()`, in body of effect, which may cause race conditions and inconsistency of state at the moment of effect's handler invocation, it is more appropriate to use `sample` method as described below.

#### Arguments

1. `sourceStore` ([_Store_](Store.md)): Source store
2. `clockEvent` ([_Event_](Event.md)): Clock(Trigger) event
3. `fn`? (_(source, clock) => result_): Optional combinator function, [should be **pure**](../../glossary.md#pureness). Since, this handler is supposed to organize data flow, you should avoid declaring side-effects here. It's more appropriate to place it in `watch` method for sampled node.

#### Returns

[_Event_](Event.md), which fires upon clock is triggered

#### Example 1

```js try
import {createStore, createEvent, sample} from 'effector'

const store = createStore('hello zerobias')
const event = createEvent()

const sampled = sample(store, event)
sampled.watch(console.log)

event() // => hello zerobias
```

[Try it](https://share.effector.dev/IMXnU270)

#### Example 2

```js try
import {createStore, createEvent, sample} from 'effector'

const login = createStore('peter')
const sendMessage = createEvent()

const fullMessage = sample(login, sendMessage, (login, text) => ({login, text}))

fullMessage.watch(({login, text}) => {
  console.log(`[${login}]: ${text}`)
})

sendMessage('hello')
// => [peter]: hello
sendMessage('how r u?')
// => [peter]: how r u?
```

[Try it](https://share.effector.dev/0ZP1xn8d)

## `sample(sourceEvent, clockEvent, fn?)`

Passes last `sourceEvent` invocation argument value and `clockEvent` value to `fn` handler.

#### Arguments

1. `sourceEvent` (_Event_): Source event
2. `clockEvent` (_Event_): Clock(Trigger) event
3. `fn`? (_(source, clock) => result_): Optional combinator function, [should be **pure**](../../glossary.md#pureness)

#### Returns

[_Event_](Event.md), which fires upon clock is triggered

#### Example

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

## `sample(event, store, fn?)`

Passes last `event` invocation argument value and `store`'s updated state to `fn` handler.

> **Note**: `event` must be invoked at least once.

#### Arguments

1. `event` (_Event_): Source event
2. `store` (_Store_): Triggers sampled unit upon store update
3. `fn`? (_(source, clock) => result_): Optional combinator function, [should be **pure**](../../glossary.md#pureness)

#### Returns

[_Event_](Event.md), which fires upon clock is triggered

#### Example

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

## `sample(sourceStore, clockStore, fn?)`

Passes last `sourceStore`'s current state and `clockStore`'s updated state to `fn` handler, upon `clockStore`'s update.

#### Arguments

1. `sourceStore` (_Store_): Source store
2. `clockStore` (_Store_): Triggers sampled unit upon store update
3. `fn`? (_(source, clock) => result_): Optional combinator function, [should be **pure**](../../glossary.md#pureness)

#### Returns

[_Store_](Store.md), which updates upon clock update

#### Example

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

[Try it](https://share.effector.dev/h3zED3yW)

## `sample({source, clock?, fn?, greedy?, target?})`

Object-like arguments passing, working exactly the same as examples above do.

`clock` - trigger node, if not passed the `source` is used as clock

`greedy` modifier defines, whether sampler will wait of resolving calculation result, and will batch all updates, resulting only one trigger, either will be triggered upon every linked node invocation, e.g. if `greedy` is `true`, `sampler` will fire, upon trigger of every node, linked to clock, whereas `non-greedy sampler(greedy: false)` will fire upon the last linked node trigger.

`target` - can contain Unit, which accepts payload - returned by `fn`. If target passed, result will be the target itself. In case, target not passed, it's created "under the hood" and being returned as result of the function.

#### Arguments

1. `params` (_Object_): Configuration object

#### Returns

([_Event_](Event.md)|[_Store_](Store.md)) - Unit, which fires/updates upon `clock` is trigged

#### Example 1

```js try
import {sample, createStore, createEffect, createEvent} from 'effector'

const $user = createStore({name: 'john', password: 'doe'})

const signInFx = createEffect({handler: console.log})
const submitForm = createEvent()

const submitted = sample({
  source: $user,
  clock: submitForm,
  fn: (user, params) => ({user, params}),
  target: signInFx,
})

console.log(submitted === signInFx) // units are equal

submitForm('foo')
```

[Try it](https://share.effector.dev/OPajzRNF)

#### Example 2

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

## `sample(sourceStore)`

Shorthand for `sample({ source: sourceStore, clock: sourceStore })`, it can be used to make updates of `sourceStore` non-greedy, thus batching updates of `sourceStore`.

This is especially useful if we are combining different stores, and resulting store switches its state multiple times within single update. `sample` ensures it will fire only upon the last state

#### Arguments

1. `sourceStore` ([_Store_](Store.md)): Source store

#### Returns

[_Store_](Store.md) - Non-greedy store

#### Example 1

```js try
import {createStore, createEffect, sample, combine} from 'effector'

const data = [{name: 'physics', id: 1}]

const fetchContentFx = createEffect({
  handler: () => new Promise(resolve => setTimeout(() => resolve(data), 0)),
})

const $lessonIndex = createStore(0)
const $allLessons = createStore([]).on(
  fetchContentFx.doneData,
  (_, result) => result,
)

const $lesson = combine(
  $lessonIndex,
  $allLessons,
  (idx, lessons) => lessons[idx],
)

const $modal = combine({
  isPending: fetchContentFx.pending,
  content: $lesson,
})

const $batchedModal = sample($modal)

$modal.updates.watch(v => console.log('modal update', v))
//=> modal update { isPending: true, content: undefined })
//=> modal update { isPending: false, content: undefined })
//=> modal update { isPending: false, content: Object })
// total 3 updates
$batchedModal.updates.watch(v => console.log('batchedModal update', v))
//=> batched modal update { isPending: true, content: undefined })
//=> batched modal update { isPending: false, content: Object })
// total 2 updates

fetchContentFx()
```

[Try it](https://share.effector.dev/htQpg1LY)

## Objects and arrays with stores in sample source

```js try
import {createStore, createEvent, sample, combine} from 'effector'
const trigger = createEvent()
const objectTarget = createEvent()
const arrayTarget = createEvent()
const a = createStore('A')
const b = createStore('B')
sample({
  source: {a, b},
  clock: trigger,
  target: objectTarget,
})
sample({
  source: [a, b],
  clock: trigger,
  target: arrayTarget,
})
objectTarget.watch(obj => {
  console.log('sampled object', obj)
  // => {a: 'A', b: 'B'}
})
arrayTarget.watch(array => {
  console.log('sampled array', array)
  // => ['A', 'B']
})
trigger()
/* old way to do this: */
sample({
  source: combine({a, b}),
  clock: trigger,
  target: objectTarget,
})
sample({
  source: combine([a, b]),
  clock: trigger,
  target: arrayTarget,
})
```

[Try it](https://share.effector.dev/D1l72gqC)
