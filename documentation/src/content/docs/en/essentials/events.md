---
title: Events in effector
keywords:
  - event
  - unit
description: How events works and how to use it
---

# Events (#events)

The **Event** in effector represents a user action, a step in the application process, a command to execute, or an intention to make modifications, among other things. This unit is designed to be a carrier of information/intention/state within the application, not the holder of a state.

In most situations, it is recommended to create events directly within the module, rather than placing them within conditional statements or classes, in order to maintain simplicity and readability. An exception to this recommendation is the use of factory functions; however, these should also be invoked at the root level of the module.

:::info{title="important information!"}
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

The **declarative** approach utilizes the event as a target for operators, such as `sample`, or as an argument when passed into factory functions:

```ts
import { createEvent, sample } from "effector";

const firstTriggered = createEvent<void>();
const secondTriggered = createEvent<void>();

sample({
  clock: firstTriggered,
  target: secondTriggered,
});
```

When the `firstTriggered` event is invoked, the `secondTriggered` event will be subsequently called, creating a sequence of events.

This method is employed to link various units within a single event chain. In most cases, the chain will have multiple branches, allowing for diverse interactions and processes within the application logic.

:::tip{title="Good to know"}
In Effector, any event supports only **a single argument**.
It is not possible to call an event with two or more arguments, as in `someEvent(first, second)`.
:::

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

This is also works for operators like [`sample`](/en/essentials/unit-composition) or `split`:

```ts
import { sample, createEvent } from "effector";

const someHappened = createEvent<number>();
const anotherHappened = createEvent<string>();

sample({
  // @ts-expect-error error:
  // "clock should extend target type";
  // targets: { clockType: number; targetType: string; }
  clock: someHappened,
  target: anotherHappened,
});
```

## Working with multiple events (#working-with-events)

Events in effector can be combined in various ways to create more complex logic. Let's look at the main approaches:

### Creating derivative events (#derived-events)

You can create a new event based on an existing one using the map method:

```ts
const userClicked = createEvent<{ id: number; name: string }>();
// Creating an event that will trigger only with the user's name
const userNameSelected = userClicked.map(({ name }) => name);
```

### Filtering events (#filtering-events)

The `filter` method allows creating a new event that triggers only when a certain condition is met:

```ts
const userClicked = createEvent<{ id: number; role: "admin" | "user" }>();

// Event will trigger only for admins
const adminClicked = userClicked.filter({
  fn: ({ role }) => role === "admin",
});

// Creating a type-safe filter
const adminClicked = userClicked.filter({
  fn: (user): user is { id: number; role: "admin" } => user.role === "admin",
});
```

:::tip{sample is better!}
Using the sample method and filter property is preferred over this method!
:::

### Merging multiple events (#merging-events)

To merge multiple events into one, you can use sample with an array in clock:

```ts
const buttonClicked = createEvent();
const linkClicked = createEvent();
const iconClicked = createEvent();

// Any of these events will trigger someActionHappened
sample({
  clock: [buttonClicked, linkClicked, iconClicked],
  target: someActionHappened,
});
```

### Conditional event triggering (#conditional-event-triggering)

The action chain when calling an event can trigger based on store states:

```ts
const buttonClicked = createEvent<void>();
const $isEnabled = createStore(true);

// Event will trigger only if $isEnabled is true
sample({
  clock: buttonClicked,
  filter: $isEnabled,
  target: actionExecuted,
});
```

:::tip{title="Tip"}
Combining events through `sample` is preferred over directly calling events inside `watch` or other handlers, as it makes the data flow more explicit and predictable.
:::
