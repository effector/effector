---
title: createEvent
description: createEvent is a method for creating an event
redirectFrom:
  - /api/effector/createEvent
  - /docs/api/effector/createEvent
---

# createEvent (#create-event)

```ts
import { createEvent } from "effector";

const event = createEvent();
```

Method for creating [events][eventApi].

## Formula (#formulae)

```ts
createEvent<E = void>(eventName?: string): EventCallable<E>
createEvent<E = void>(config: {
  name?: string
  sid?: string
  domain?: Domain
}): EventCallable<E>
```

- **Arguments**

  - `eventName`: Optional argument. Event name for debugging.
  - `config`: Optional argument. Configuration object.

    - `name`: Event name.
    - `sid`: Stable identifier for SSR.
    - `domain`: Domain for the event.

- **Return value**

Returns a new callable [event][eventTypes].

## Examples (#examples)

Updating state by calling an event:

```js
import { createStore, createEvent } from "effector";

const addNumber = createEvent();

const $counter = createStore(0);

$counter.on(addNumber, (state, number) => state + number);

$counter.watch((state) => {
  console.log("state", state);
});
// => 0

addNumber(10);
// => 10

addNumber(10);
// => 20

addNumber(10);
// => 30
```

[Run example](https://share.effector.dev/0OeoZMPc)

We created the `addNumber` event and the `$counter` store, then subscribed to store updates.<br/>
Notice the function call `addNumber(10)`. Every time you call `addNumber(10)`, you can check the console and see how the state changes.

Processing data with derived events:

```js
import { createEvent } from "effector";

const extractPartOfArray = createEvent();
const array = extractPartOfArray.map((arr) => arr.slice(2));

array.watch((part) => {
  console.log(part);
});
extractPartOfArray([1, 2, 3, 4, 5, 6]);
// => [3, 4, 5, 6]
```

[Run example](https://share.effector.dev/4lWsZr2k)

## Related API and Articles (#related-api-and-docs-to-create-event)

- **API**
  - [`Event API`][eventApi] - Event API, its methods, properties and description
  - [`createApi`][createApi] - Creating a set of events for a store
  - [`merge`][merge] - Method for combining an array of units into one new event
  - [`sample`][sample] - Connecting events with other units
- **Articles**
  - [How to work with events][eventGuide]
  - [How to think in effector and why events matter][mindset]
  - [Guide to typing events and other units][typescript]

[eventApi]: /en/api/effector/Event
[eventTypes]: /en/api/effector/Event#event-types
[merge]: /en/api/effector/merge
[eventGuide]: /en/essentials/events
[mindset]: /en/resources/mindset
[typescript]: /en/essentials/typescript
[sample]: /en/api/effector/sample
[createApi]: /en/api/effector/createApi
