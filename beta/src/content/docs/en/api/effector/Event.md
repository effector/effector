---
title: Event
keywords:
  - event
  - unit
description: Event, its methods and properties
redirectFrom:
  - /api/effector/Event
  - /docs/api/effector/event
---

The **Event** in effector represents a user action, a step in the application process, a command to execute, or an intention to make modifications, among other things. This unit is designed to be a carrier of information/intention/state within the application, not the holder of a state.

There are two type of events provided by effector: [`Event`](#event) and [`ReadonlyEvent`](#readonlyEvent).

# Event instance {#event}

In most situations, it is recommended to create events directly within the module, rather than placing them within conditional statements or classes, in order to maintain simplicity and readability. An exception to this recommendation is the use of factory functions; however, these should also be invoked at the root level of the module.

:::info
Event instances persist throughout the entire runtime of the application and inherently represent a portion of the business logic.

Attempting to delete instances and clear memory for the purpose of saving resources is not advised, as it may adversely impact the functionality and performance of the application.
:::

## Construction {#event-construction}

There are many ways to create event:

- the most common [`createEvent`](/en/api/effector/createEvent)
- using [Domain createEvent](/en/api/effector/Domain#createeventname)
- via [Event's methods](#event-methods) and it's supertype [ReadonlyEvent's methods](#readonlyEvent-methods)
- some [Effect's methods](/en/api/effector/Effect#methods) return new events and readonly events
- operators such as: [`createApi`](/en/api/effector/createApi)

## Calling the event {#event-calling}

There are two ways to trigger event: imperative and declarative.

The **imperative** method involves invoking the event as if it were a function:

```ts
import { createEvent } from "effector";

const callHappened = createEvent<void>();

callHappened(); // event triggered
```

The **declarative** approach utilizes the event as a target for operators, such as sample, or as an argument when passed into factory functions:

```ts
import { createEvent, sample } from "effector";

const firstTriggered = createEvent<void>();
const secondTriggered = createEvent<void>();

sample({
  clock: firstTriggered,
  target: secondTriggered,
});
```

> When the `firstTriggered` event is invoked, the `secondTriggered` event will be subsequently called, creating a sequence of events.

This method is employed to link various units within a single event chain. In most cases, the chain will have multiple branches, allowing for diverse interactions and processes within the application logic.

:::warning{title="Important"}

In Effector, any event supports only **a single argument**.
It is not possible to call an event with two or more arguments, as in `someEvent(first, second)`.

All arguments beyond the first will be disregarded.
The core team has implemented this rule for specific reasons related to the design and functionality.
Read more in the explanation section.
:::

If multiple arguments need to be passed, encapsulate them within an object:

```ts
import { createEvent } from 'effector'
const requestReceived = createEvent<{ id: number; title: string }>()
requestReceived({ id: 1, title: "example" })
```

This rule also contributes to the clarity of each argument's meaning, both at the call site and subscription site. It promotes clean and organized code, making it easier to understand and maintain

## Declaring types

Event carriers some data, in TypeScript ecosystem each data should have defined type.
When event is explicitly created by [`createEvent`](/en/api/effector/createEvent) type of the argument must be provided as a Generic type argument:

```ts
import { ItemAdded } from "effector";

interface ItemAdded {
  id: string;
  title: string;
}

const itemAdded = createEvent<ItemAdded>();
```

When an event is invoked, TypeScript will verify that the type of the argument passed matches the type defined in the event, ensuring consistency and type safety within the code.

This is also works for operators like `sample` or `split`:

```ts
import { sample, createEvent } from 'effector'

const someHappened = createEvent<number>()
const anotherHappened = createEvent<string>()

sample({
  // @ts-expect-error error: "clock should extend target type"; targets: { clockType: number; targetType: string; }
  clock: someHappened,
  target: anotherHappened,
})
```

[Try it](https://tsplay.dev/WyoPKN)


To specify the argument type for an event, it is essential to first determine the intended purpose, what do you want to do with this event:
- If you intend to **invoke** an event or use it as a target, you should utilize the `Event<T>` type.
- If your goal is to **subscribe** to updates, or use the event as a `clock` or `source`, you should employ the `ReadonlyEvent<T>` type.

_Where `T` represents the type of the event's argument._

```ts
import { type Event, createStore, createEvent } from 'effector'

function createCounter(counterChanged: Event<number>) {
  const $counter = createStore(0)
  sample({
    clock: $counter,
    target: counterChanged,
  })
}

const whenCounterChanged = createEvent<number>()
createCounter(whenCounterChanged)
```

## Watching the event {#event-watch}

To ascertain when an event is called, effector and its ecosystem offer various methods with distinct capabilities. Debugging is the primary use case for this purpose, and we highly recommend using [`patronum/debug`](https://patronum.effector.dev/methods/debug/) to display when an event is triggered and the argument it carries.

```ts
import { createEvent, sample } from "effector";
import { debug } from "patronum";

const firstTriggered = createEvent<void>();
const secondTriggered = createEvent<void>();

sample({
  clock: firstTriggered,
  target: secondTriggered,
});

debug(firstTriggered, secondTriggered);

firstTriggered();
// => [event] firstTriggered undefined
// => [event] secondTriggered undefined
```

However, if your environment does not permit the addition of further dependencies, you may use the [`.watch()`](#readonlyEvent-watch-watcher) method with caution.

```ts
import { createEvent, sample } from "effector";

const firstTriggered = createEvent<void>();
const secondTriggered = createEvent<void>();

sample({
  clock: firstTriggered,
  target: secondTriggered,
});

firstTriggered.watch(() => console.info("[event] firstTriggered"));
secondTriggered.watch(() => console.info("[event] secondTriggered"));

firstTriggered();
// => [event] firstTriggered
// => [event] secondTriggered
```

:::tip{title="Keep in mind"}
The `watch` method neither handles nor reports exceptions, manages the completion of asynchronous operations, nor addresses data race issues.

Its primary intended use is for short-term debugging and logging purposes.
:::

## Formulae {#event-formulae}

```ts
const event = createEvent<T>()
event(argument: T): T
```

- `event` called as a function always returns its argument as is
- all subscribers of event receives the `argument` passed into
- when `T` is `void`, `event` can be called without arguments
- `T` by default is `void`, so generic type argument can be omitted

## Methods {#event-methods}

### `prepend(fn)` {#event-prepend-fn}

<br/><br/>

# ReadonlyEvent instance {#readonlyEvent}

A **ReadonlyEvent** is a super type of `Event` with different approach. Firstly, invoking a ReadonlyEvent is not allowed, and it cannot be used as a `target` in the `sample` operator, and so on.

The primary purpose of a ReadonlyEvent is to be triggered by internal code withing the effector library or ecosystem. For instance, the `.map()` method returns a ReadonlyEvent, which is subsequently called by the `.map()` method itself.

:::info
There is no need for user code to directly invoke such a ReadonlyEvent.


If you find yourself needing to call a ReadonlyEvent, it may be necessary to reevaluate and restructure your application's logic.
:::

All the functionalities provided by ReadonlyEvent are also supported in a regular Event.

## Construction {#readonlyEvent-construction}

There is no way to manually create ReadonlyEvent, but some methods and operators returns derived events, they are have `ReadonlyEvent<T>` type:

- Event's methods like: [`.map(fn)`](#event-map-fn), [`.filter({fn})`](#event-filterMap-fn), and so on
- Store's property: ['.updates'](/en/api/effector/Store#updates)
- Effect's [methods](/en/api/effector/Effect#effect) and [properties](/en/api/effector/Effect#properties)
- operators like: [`sample`](/en/api/effector/sample), [`merge`](/en/api/effector/merge)

## Declaring types

It becomes necessary in cases where a factory or library requires an event to subscribe to its updates, ensuring proper integration and interaction with the provided functionality:

```ts
ReadonlyEvent<T>;
```

_Where `T` represents the type of the event's argument._

To utilize the `ReadonlyEvent` type, simply import it from the `"effector"` package and integrate it into your code as needed:

```ts
import { type ReadonlyEvent, createStore, createEvent } from 'effector'

function createCounter(increment: ReadonlyEvent<void>) {
  const $counter = createStore(0)

  $counter.on(increment, (count) => count + 1)
}

const incrementCounter = createEvent<number>()
createCounter(incrementCounter)
incrementCounter()
```

## Methods {#readonlyEvent-methods}

### `map(fn)` {#readonlyEvent-map-fn}

### `filter({ fn })` {#readonlyEvent-filter-fn}

### `filterMap(fn)` {#readonlyEvent-filterMap-fn}

### `watch(watcher)` {#readonlyEvent-watch-watcher}

:::tip{title="Keep in mind"}
The `watch` method neither handles nor reports exceptions, manages the completion of asynchronous operations, nor addresses data race issues.

Its primary intended use is for short-term debugging and logging purposes.
:::

### `subscribe(observer)` {#readonlyEvent-subscribe-observer}

## Properties {#readonlyEvent-properties}

### `sid` {#readonlyEvent-sid}

### `compositeName` {#readonlyEvent-compositeName}

### `shortName` {#readonlyEvent-shortName}
