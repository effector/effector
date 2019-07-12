---
id: split
title: split
hide_title: true
---

# `split(event, cases)`
Pattern matching method, splits event into several, which fire upon source event matches its comparator function

#### Arguments

1. `event` _([_`Event`_](Event.md))_: Array of [_`units`_](Unit.md) to be merged.
1. `event` _(Object)_: Schema of cases, which uses names of resulting events as keys, and comparator function_((value) => Boolean)_ 

#### Returns

(Object) - Object, having keys, defined in `cases` argument, plus `__`(two underscores) - which stands for `default` (no mathes met) case.

#### Example

```javascript
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