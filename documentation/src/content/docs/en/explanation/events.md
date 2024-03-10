---
title: Events
keywords:
  - event
  - unit
description: How events works, where to use
---

The **Event** in effector represents a user action, a step in the application process, a command to execute, or an intention to make modifications, among other things. This unit is designed to be a carrier of information/intention/state within the application, not the holder of a state.

In most situations, it is recommended to create events directly within the module, rather than placing them within conditional statements or classes, in order to maintain simplicity and readability. An exception to this recommendation is the use of factory functions; however, these should also be invoked at the root level of the module.

:::info
Event instances persist throughout the entire runtime of the application and inherently represent a portion of the business logic.

Attempting to delete instances and clear memory for the purpose of saving resources is not advised, as it may adversely impact the functionality and performance of the application.
:::

## Calling the event (#event-calling)

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

**You need to know:** In Effector, any event supports only **a single argument**.
It is not possible to call an event with two or more arguments, as in `someEvent(first, second)`.

All arguments beyond the first will be ignored.
The core team has implemented this rule for specific reasons related to the design and functionality.
This approach enables the argument to be accessed in any situation without adding types complexity.

If multiple arguments need to be passed, encapsulate them within an object:

```ts
import { createEvent } from "effector";
const requestReceived = createEvent<{ id: number; title: string }>();
requestReceived({ id: 1, title: "example" });
```

This rule also contributes to the clarity of each argument's meaning, both at the call side and subscription side. It promotes clean and organized code, making it easier to understand and maintain.

## Watching the event (#event-watch)

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

However, if your environment does not permit the addition of further dependencies, you may use the `.watch()` method with caution.

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

## Working with TypeScript (#typescript)

When an event is invoked, TypeScript will verify that the type of the argument passed matches the type defined in the event, ensuring consistency and type safety within the code.

This is also works for operators like `sample` or `split`:

```ts
import { sample, createEvent } from "effector";

const someHappened = createEvent<number>();
const anotherHappened = createEvent<string>();

sample({
  // @ts-expect-error error: "clock should extend target type"; targets: { clockType: number; targetType: string; }
  clock: someHappened,
  target: anotherHappened,
});
```

[Try it](https://tsplay.dev/WyoPKN)

To specify the argument type for an event, it is essential to first determine the intended purpose, what do you want to do with this event:

- If you intend to **invoke** an event or use it as a target, you should utilize the `EventCallable<T>` type.
- If your goal is to **subscribe** to updates, or use the event as a `clock` or `source`, you should employ the `Event<T>` type.

_Where `T` represents the type of the event's argument._

```ts
import { type Event, createStore, createEvent } from "effector";

function createCounter(counterChanged: Event<number>) {
  const $counter = createStore(0);
  sample({
    clock: $counter,
    target: counterChanged,
  });
}

const whenCounterChanged = createEvent<number>();
createCounter(whenCounterChanged);
```

## Using `Event` (#event-using)

A `Event` is a super type of `EventCallable` with different approach. Firstly, invoking a `Event` is not allowed, and it cannot be used as a target in the sample operator, and so on.

The primary purpose of a `Event` is to be triggered by internal code withing the effector library or ecosystem. For instance, the `.map()` method returns a `Event`, which is subsequently called by the `.map()` method itself.

To utilize the `Event` type, simply import it from the `"effector"` package and integrate it into your code as needed:

```ts
import { type Event, createStore, createEvent } from "effector";

function createCounter(increment: Event<void>) {
  const $counter = createStore(0);

  $counter.on(increment, (count) => count + 1);
}

const incrementCounter = createEvent<number>();
createCounter(incrementCounter);
incrementCounter();
```

It is allowed to pass `EventCallable<T>` into argument with type `Event<T>`. The primary purpose of Event is to accept any event type while explicitly signaling the code's intention to listen to the event, rather than invoking it.
