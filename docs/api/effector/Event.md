---
id: event
title: Event
---

_Event_ is an intention to change state.

### Event Methods

- [`watch(watcher)`](#watch)
- [`map(fn)`](#map)
- [`filter(fn)`](#filter)
- [`prepend(fn)`](#prepend)

## Event Methods

### <a id='watch'></a>[`watch(watcher)`](#watch)

#### Returns

(Subscription): Unsubscribe function

<hr>

### <a id='map'></a>[`map(fn)`](#map)

Сreates a new event, which will be called after the original event is called, applying the result of a `fn` as a payload.

#### Returns

(Event): New event

<hr>

### <a id='filter'></a>[`filter(fn)`](#filter)

#### Returns

(Event): New event

<hr>

### <a id='prepend'></a>[`prepend(fn)`](#prepend)

#### Returns

(Event): New event

<hr>
