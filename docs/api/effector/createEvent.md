---
id: createEvent
title: createEvent
hide_title: true
---

# `createEvent(name?)`

Creates an [event](Event.md)

#### Arguments

1. `name`? _(string)_: [Event](Event.md) name

#### Returns

([_`Event`_](Event.md)): An intention to change state.

#### Example

```js
const event = createEvent() // unnamed event
const onMessage = createEvent('message')

const socket = new WebSocket('wss://example.com:4000')
socket.onmessage = msg => onMessage(msg)

const data = onMessage.map(msg => msg.data).map(JSON.parse)

// Handle side effects
data.watch(console.log)
```
