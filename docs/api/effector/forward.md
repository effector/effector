---
id: forward
title: forward
hide_title: true
---

# `forward({from, to})`

Sends data from one entity to another

#### Arguments

1. `config` (_{from: Unit\<T\>, to: Unit\<T\>}_)

#### Returns

(_`Subscription`_)

#### Example

Send event data to store

```js
import {forward, createEvent, createStore} from 'effector'

const event = createEvent()
const proxy = createStore(-1)

proxy.watch(data => console.log('data: ', data))
// data: -1
// data: 1

forward({
  from: event,
  to: proxy,
})

event(1)
event(1)
```
