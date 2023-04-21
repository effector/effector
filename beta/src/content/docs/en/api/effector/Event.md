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
import { createEvent } from "effector";
const requestReceived = createEvent<{ id: number; title: string }>();
requestReceived({ id: 1, title: "example" });
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

- If you intend to **invoke** an event or use it as a target, you should utilize the `Event<T>` type.
- If your goal is to **subscribe** to updates, or use the event as a `clock` or `source`, you should employ the `ReadonlyEvent<T>` type.

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

In the most cases there is no reason to use `void` with the another type (~~`Event<void | number>`~~). Use `void` only to declare the Event or ReadonlyEvent without the argument at all.
That's why it is possible to send data from event with argument into event without argument.

```ts
sample({
  clock: withData, // Event<number>
  target: withoutData, // Event<void>
});
```

We're strongly recommends to use `null` for empty values when intended:

```ts
import { createEvent } from "effector";

const maybeDataReceived = createEvent<Data | null>();
// maybeDataReceived: Event<Data | null>
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

All the methods and properties from [ReadonlyEvent](#readonlyEvent-methods) is also available on `Event` instance.

:::tip
You can think of the Event and ReadonlyEvent as type and its super type:

`Event<T> extends ReadonlyEvent<T>`
:::

### `prepend(fn)` {#event-prepend-fn}

---

Check all other methods on [ReadonlyEvent](#readonlyEvent-methods).

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
import { type ReadonlyEvent, createStore, createEvent } from "effector";

function createCounter(increment: ReadonlyEvent<void>) {
  const $counter = createStore(0);

  $counter.on(increment, (count) => count + 1);
}

const incrementCounter = createEvent<number>();
createCounter(incrementCounter);
incrementCounter();
```

## Methods {#readonlyEvent-methods}

### `map(fn)` {#readonlyEvent-map-fn}

Creates a new derived ReadonlyEvent, which will be called after the original event is called, using the result of the fn function as its argument. This special function enables you to break down and manage data flow, as well as extract or transform data within your business logic model.

#### Formulae {#readonlyEvent-map-fn-formulae}

```ts
const second = first.map(fn);
```

- When `first` is triggered, pass payload from `first` to `fn`.
- Trigger `second` with the result of the `fn()` call as payload.
- The function `fn` is invoked each time the `first` event is triggered.
- Also, the `second` event triggered each time the `first` is triggered.

#### Arguments {#readonlyEvent-map-fn-arguments}

1. `fn` (_Function_): A function that receives `argument`, [should be **pure**](/en/explanation/glossary#purity).

#### Types {#readonlyEvent-map-fn-types}

The resulting type of the `fn` function will be utilized to define the type of the derived event.

```ts
import { createEvent } from "effector";

const first = createEvent<number>();
// first: Event<number>

const second = first.map((count) => count.toString());
// second: ReadonlyEvent<string>
```

The `first` event can be represented as either `Event<T>` or `ReadonlyEvent<T>`. <br/>
The `second` event will always be represented as `ReadonlyEvent<T>`.

#### Returns {#readonlyEvent-map-fn-returns}

[_ReadonlyEvent_](#readonlyEvent): The new event.

#### Example {#readonlyEvent-map-fn-example}

```js
import { createEvent } from "effector";

const userUpdated = createEvent();

// you may decompose dataflow with .map() method
const userNameUpdated = userUpdated.map(({ user }) => name);

// either way you can transform data
const userRoleUpdated = userUpdated.map((user) => user.role.toUpperCase());

userNameUpdated.watch((name) => console.log(`User's name is [${name}] now`));
userRoleUpdated.watch((role) => console.log(`User's role is [${role}] now`));

userUpdated({ name: "john", role: "admin" });
// => User's name is [john] now
// => User's role is [ADMIN] now
```

[Try it](https://share.effector.dev/duDut6nR)

### `filter({ fn })` {#readonlyEvent-filter-fn}

This method generates a new derived ReadonlyEvent that will be invoked after the original event, but only if the `fn` function returns a value of `true`. This special function enables you to break down data flow into a branches and subscribe on them within the business logic model.

:::tip
[sample](/en/api/effector/sample) operator with `filter` argument is the preferred filtering method.
:::

#### Formulae {#readonlyEvent-filter-fn-formulae}

```ts
const second = first.filter({ fn });
```

- When `first` is triggered, pass payload from `first` to `fn`.
- The `second` event will be triggered only if `fn` returns `true`, with the argument from `first` event.
- The function `fn` is invoked each time the `first` event is triggered.
- Also, the `second` event triggered each time the `first` is triggered, **and** the `fn` returned `true`.

#### Arguments {#readonlyEvent-filter-fn-arguments}

1. `fn` (_Function_): A function that receives `argument`, [should be **pure**](/en/explanation/glossary#purity).

:::info{title="Note"}
Here, due to legacy restrictions `fn` is required to use object form because `event.filter(fn)` was an alias for [Event filterMap](/en/api/effector/Event#readonlyEvent-filterMap-fn).

Use it always like this `.filter({ fn })`.
:::

#### Returns {#readonlyEvent-filter-fn-returns}

[_ReadonlyEvent_](#readonlyEvent): The new event

#### Types {#readonlyEvent-filter-fn-types}

Method `.filter()` always returns ReadonlyEvent. Also this event will have the same type as the original type:

```ts
import { createEvent } from "effector";

const numberReceived = createEvent<number>();
// numberReceived: Event<number>

const evenReceived = numberReceived.filter({
  fn: (number) => number % 2 === 0,
});
// evenReceived: ReadonlyEvent<number>

evenReceived.watch(console.info);
numberReceived(5); // nothing
numberReceived(2); // => 2
```

#### Example {#readonlyEvent-filter-fn-example}

```js
import { createEvent, createStore } from "effector";

const numbers = createEvent();
const positiveNumbers = numbers.filter({
  fn: ({ x }) => x > 0,
});

const $lastPositive = createStore(0).on(positiveNumbers, (n, { x }) => x);

$lastPositive.watch((x) => {
  console.log("last positive:", x);
});

// => last positive: 0

numbers({ x: 0 });
// no reaction

numbers({ x: -10 });
// no reaction

numbers({ x: 10 });
// => last positive: 10
```

[Try it](https://share.effector.dev/H2Iu4iJH)

#### Meaningful example

Let's assume a standard situation when you want to buy sneakers in the shop, but there is no size. You subscribe to the particular size of the sneakers' model, and in addition, you want to receive a notification if they have it, and ignore any other notification. Therefore, filtering can be helpful for that. Event filtering works in the same way. If `filter` returns `true`, the event will be called.

```ts
const sneackersReceived = createEvent<Sneakers>();
const uniqueSizeReceived = sneackersReceived.filter({
  fn: (sneackers) => sneackers.size === 48,
});
```

### `filterMap(fn)` {#readonlyEvent-filterMap-fn}

:::info{title="since"}
[effector 20.0.0](https://changelog.effector.dev/#effector-20-0-0)
:::

This methods generates a new derived ReadonlyEvent that **may be invoked** after the original event, but with the transformed argument. This special method enabled you to simultaneously transform data and filter out trigger of the event.

This method looks like the `.filter()` and `.map()` merged in the one. That's it. The reason for creating was an impossibility for event filtering.

This method is mostly useful with JavaScript APIs whose returns `undefined` sometimes.

#### Formulae {#readonlyEvent-filterMap-formulae}

```ts
const second = first.filterMap(fn);
```

- When `first` is triggered, call `fn` with payload from `first`
- If `fn()` returned `undefined` do not trigger `second`
- If `fn()` returned some data, trigger `second` with data from `fn()`

#### Arguments {#readonlyEvent-filterMap-arguments}

1. `fn` (_Function_): A function that receives `argument`, [should be **pure**](/en/explanation/glossary#purity).

The `fn` function should return some data. When `undefined` is returned, the update of derived event will be skipped.

#### Returns {#readonlyEvent-filterMap-returns}

[_ReadonlyEvent_](#readonlyEvent): The new event

#### Types {#readonlyEvent-filterMap-types}

The type for the derived event is automatically inferred from the `fn` declaration.
No need to explicitly set type for variable or generic type argument:

```ts
import { createEvent } from "effector";

const first = createEvent<number>();
// first: Event<number>

const second = first.filterMap((count) => {
  if (count === 0) return;
  return count.toString();
});
// second: ReadonlyEvent<string>
```

The `first` event can be represented as either `Event<T>` or `ReadonlyEvent<T>`. <br/>
The `second` event will always be represented as `ReadonlyEvent<T>`.

#### Example {#readonlyEvent-filterMap-example}

```tsx
import { createEvent } from "effector";

const listReceived = createEvent<string[]>();

// Array.prototype.find() returns `undefined` when no item is found
const effectorFound = listReceived.filterMap((list) => list.find((name) => name === "effector"));

effectorFound.watch((name) => console.info("found", name));

listReceived(["redux", "effector", "mobx"]); // => found effector
listReceived(["redux", "mobx"]);
```

[Try it](https://share.effector.dev/ARDanMAM)

#### Meaningful example

Consider a scenario where you walk into a grocery store with a specific task: you need to purchase 10 apples, but only if they're red. If they're not red, you're out of luck.
Let's consider by steps:

1. Take one apple;
2. Have a look, is it red(put in a pack) or not(take another).

And you repeat this until you complete the task. Now think about it in the effector terms, and we consider the positive case:

1. Take an apple – event;
2. Have a look, red or no – filter;
3. You keep it – map;
4. Put in pack – event.
5. Pack – store

### `watch(watcher)` {#readonlyEvent-watch-watcher}

This method enables you to call callback on each event trigger with the argument of the event.

:::tip{title="Keep in mind"}
The `watch` method neither handles nor reports exceptions, manages the completion of asynchronous operations, nor addresses data race issues.

Its primary intended use is for short-term debugging and logging purposes.
:::

#### Formulae {#readonlyEvent-watch-watcher-formulae}

```ts
const unwatch = event.watch(fn);
```

- The `fn` will be called on each `event` trigger, passed argument of the `event` to the `fn`.
- When `unwatch` is called, stop calling `fn` on each `event` trigger.

#### Arguments {#readonlyEvent-watch-watcher-arguments}

1. `watcher` ([_Watcher_](/en/explanation/glossary#watcher)): A function that receives `argument` from the event.

#### Returns {#readonlyEvent-watch-watcher-returns}

[_Subscription_](/en/explanation/glossary#subscription): Unsubscribe function.

#### Example {#readonlyEvent-watch-watcher-example}

```js
import { createEvent } from "effector";

const sayHi = createEvent();
const unwatch = sayHi.watch((name) => console.log(`${name}, hi there!`));

sayHi("Peter"); // => Peter, hi there!
unwatch();

sayHi("Drew"); // => nothing happened
```

[Try it](https://share.effector.dev/9YVgCl4C)

### `subscribe(observer)` {#readonlyEvent-subscribe-observer}

This is the low-level method to integrate event with the standard `Observable` pattern.

:::tip{title="Keep in mind"}
You don't need to use this method on your own. It is used under the hood by rendering engines or so on.
:::

Read more:

- https://rxjs.dev/guide/observable
- https://github.com/tc39/proposal-observable

## Properties {#readonlyEvent-properties}

### `sid` {#readonlyEvent-sid}

### `compositeName` {#readonlyEvent-compositeName}

### `shortName` {#readonlyEvent-shortName}
