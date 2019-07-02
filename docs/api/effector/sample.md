---
id: sample
title: sample
---

# `sample(store, trigger, fn?, greedy)`

_sample_ when the second argument is triggered, it takes the value from the first argument.

### Sample Methods

- [`watch(trigger, watcher) | watch(watcher)`](#watch)

#### Returns

(Event): New event

#### Arguments

- ([_`Store`_]): _`Store`_
- ([_`Trigger`_]): [_`Event`_](Event.md), [_`Effect`_](Effect.md), [_`Store`_](Store.md)
- ([_`Fn`_]): _`Function`_
- ([_`greedy`_]): _`Boolean`_

#### Example 1

```javascript
import {createEvent, createStore, sample} from 'effector'

const store = createStore('hello zerobias')
const event = createEvent()

const sampled = sample(store, event)
sampled.watch(data => console.log(data)) // hello zerobias

event()
```

#### Example 2

```javascript
const login = createStore('peter')
const sendMessage = createEvent()

const fullMessage = sample(login, sendMessage, (login, text) => ({login, text}))

fullMessage.watch(({login, text}) => {
  console.log(`[${login}]: ${text}`)
})

sendMessage('hello') // [peter]: hello
sendMessage('how r u?') // [peter]: how r u?
```

[try it](https://share.effector.dev/H8v43HFg)
