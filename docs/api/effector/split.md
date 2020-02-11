---
id: split
title: split
hide_title: true
---

# `split(trigger, cases)`

Pattern matching method, splits event into several, which fire upon source event matches its comparator function.

#### Arguments
1. `trigger` (_Event | Effect | Store_): [_`Event`_](Event.md), [_`Effect`_](Effect.md) or [_`Store`_](Store.md) unit-trigger.
2. `cases` (_Object_): Schema of cases, which uses names of resulting events as keys, and comparator function*((value) => Boolean)*

#### Returns

(Object) - Object, having keys, defined in `cases` argument, plus `__`(two underscores) - which stands for `default` (no matches met) case.

#### Example 1

```js try
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

> **Note:** the only first met match will trigger resulting event

#### Example 2

```js try
import {createEvent, split} from 'effector'

const message = createEvent();

const {short, long, medium} = split(message, {
  short: (m) => m.length <= 5,
  medium: (m) => m.length > 5 && m.length <= 10,
  long: (m) => m.length > 10,
});

short.watch((m) => console.log(`short message '${m}'`));
medium.watch((m) => console.log(`medium message '${m}'`));
long.watch((m) => console.log(`long message '${m}'`));

message("Hello, Bob!")
// => long message 'Hello, Bob!'

message("Hi!")
// => short message 'Hi!'
```

[Try it](https://share.effector.dev/ke2tM78I)
