---
id: split
title: split
hide_title: true
---

:::note since
effector 20.0.0
:::

# split

Pattern matching method, splits trigger unit (event, effect or store) into several events, which fires when trigger matches its matching function

## `split({source, match, cases})`

#### Arguments

- `source` (_Event | Effect | Store_): [_Event_](Event.md), [_Effect_](Effect.md) or [_Store_](Store.md) unit-trigger.
- `match` (_Object_): Object with the functions-matches to which the data sent to the source will be sequentially matched. If one of the functions returns true, then the data will be sent to the corresponding `cases[fieldName]` (if there is one), if none of the functions returns true, then the data will be sent to `cases.__` (if there is one)
- `cases` (_Object_): An object with units ([_Event_](Event.md), [_Effect_](Effect.md) or [_Store_](Store.md)) to which data will be passed from `source` if the corresponding matching function returns true

#### Returns

void

#### Example 1

```js
import {split, createEffect, createEvent} from 'effector'
const messageReceived = createEvent()
const showTextPopup = createEvent()
const playAudio = createEvent()
const reportUnknownMessageType = createEffect({
  handler({type}) {
    console.log('unknown message:', type)
  },
})

split({
  source: messageReceived,
  match: {
    text: msg => msg.type === 'text',
    audio: msg => msg.type === 'audio',
  },
  cases: {
    text: showTextPopup,
    audio: playAudio,
    __: reportUnknownMessageType,
  },
})

showTextPopup.watch(({value}) => {
  console.log('new message:', value)
})

messageReceived({
  type: 'text',
  value: 'Hello',
})
// => new message: Hello
messageReceived({
  type: 'image',
  imageUrl: '...',
})
// => unknown message: image
```

[Try it](https://share.effector.dev/javsk7Hg)

#### Example 2

You can match directly to store api as well:

```js
import {split, createStore, createEvent, createApi} from 'effector'

const textContent = createStore([])

const messageReceived = createEvent()

split({
  source: messageReceived,
  match: {
    text: msg => msg.type === 'text',
    audio: msg => msg.type === 'audio',
  },
  cases: createApi(textContent, {
    text: (list, {value}) => [...list, value],
    audio: (list, {duration}) => [...list, `audio ${duration} ms`],
    __: list => [...list, 'unknown message'],
  }),
})

textContent.watch(messages => {
  console.log(messages)
})

messageReceived({
  type: 'text',
  value: 'Hello',
})
// => ['Hello']
messageReceived({
  type: 'image',
  imageUrl: '...',
})
// => ['Hello', 'unknown message']
messageReceived({
  type: 'audio',
  duration: 500,
})
// => ['Hello', 'unknown message', 'audio 500 ms']
```

[Try it](https://share.effector.dev/32FNNk8H)

## `split(source, cases)`

#### Arguments

1. `source` (_Event | Effect | Store_): [_Event_](Event.md), [_Effect_](Effect.md) or [_Store_](Store.md) unit-trigger.
2. `match` (_Object_): Schema of cases, which uses names of resulting events as keys, and matching function*((value) => Boolean)*

#### Returns

(Object) - Object, having keys, defined in `cases` argument, plus `__`(two underscores) - which stands for `default` (no matches met) case.

#### Example 1

```js
import {createEvent, split} from 'effector'

const message = createEvent()

const messageByAuthor = split(message, {
  bob: ({user}) => user === 'bob',
  alice: ({user}) => user === 'alice',
})
messageByAuthor.bob.watch(({text}) => {
  console.log('[bob]: ', text)
})
messageByAuthor.alice.watch(({text}) => {
  console.log('[alice]: ', text)
})

message({user: 'bob', text: 'Hello'})
// => [bob]: Hello
message({user: 'alice', text: 'Hi bob'})
// => [alice]: Hi bob

/* default case, triggered if no one condition met */
const {__: guest} = messageByAuthor
guest.watch(({text}) => {
  console.log('[guest]: ', text)
})
message({user: 'unregistered', text: 'hi'})
// => [guest]: hi
```

[Try it](https://share.effector.dev/QXZsR5yM)

:::note
Only the first met match will trigger resulting event
:::

#### Example 2

```js
import {createEvent, split} from 'effector'

const message = createEvent()

const {short, long, medium} = split(message, {
  short: m => m.length <= 5,
  medium: m => m.length > 5 && m.length <= 10,
  long: m => m.length > 10,
})

short.watch(m => console.log(`short message '${m}'`))
medium.watch(m => console.log(`medium message '${m}'`))
long.watch(m => console.log(`long message '${m}'`))

message('Hello, Bob!')
// => long message 'Hello, Bob!'

message('Hi!')
// => short message 'Hi!'
```

[Try it](https://share.effector.dev/ke2tM78I)
