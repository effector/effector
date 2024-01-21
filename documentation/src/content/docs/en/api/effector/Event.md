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

The **Event** in effector represents a user action, a step in the application process, a command to execute, or an
intention to make modifications, among other things. This unit is designed to be a carrier of
information/intention/state within the application, not the holder of a state.

There are two type of events provided by effector: [`Event`](#event) and [`EventCallable`](#callableEvent).

## Construction {#event-construction}

There are many ways to create event:

- the most common [`createEvent`](/en/api/effector/createEvent)
- using [Domain createEvent](/en/api/effector/Domain#createeventname)
- via [Event's methods](#event-methods) and it's supertype [EventCallable's methods](#callableEvent-methods)
- some [Effect's methods](/en/api/effector/Effect#methods) return new events and readonly events
- operators such as: [`createApi`](/en/api/effector/createApi)

## Declaring types

Event carries some data and in TypeScript ecosystem each data should have defined type.
When event is explicitly created by [`createEvent`](/en/api/effector/createEvent) type of the argument must be provided
as a Generic type argument:

```ts
import { createEvent } from "effector";

interface ItemAdded {
  id: string;
  title: string;
}

const itemAdded = createEvent<ItemAdded>();
```

In the most cases there is no reason to use `void` with the another type (~~`Event<void | number>`~~). Use `void` only
to declare the Event or EventCallable without the argument at all.
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
// maybeDataReceived: EventCallable<Data | null>
```

[Read more in the explanation section](/en/explanation/events#typescript).

## Methods {#eventCallable-methods}

Since the `createEvent` factory creates `EventCallable` for you, its methods will be described first, even though it is a extension of the `Event` type.

All the methods and properties from [Event](#event-methods) are also available on `EventCallable` instance.

:::tip
You can think of the Event and EventCallable as type and its super type:

`EventCallable<T> extends Event<T>`
:::

### `event(argument)` {#eventCallable-argument}

Initiates an event with the provided argument, which in turn activates any registered subscribers.

[Read more in the explanation section](/en/explanation/events#event-calling).

#### Formulae {#eventCallable-argument-formulae}

```ts
const event: EventCallable<T>;
event(argument: T): T;
```

- `event` called as a function always returns its argument as is
- all subscribers of event receives the `argument` passed into
- when `T` is `void`, `event` can be called without arguments
- `T` by default is `void`, so generic type argument can be omitted

:::warning{title="Important"}

In Effector, any event supports only **a single argument**.
It is not possible to call an event with two or more arguments, as in `someEvent(first, second)`.

All arguments beyond the first will be ignored.
The core team has implemented this rule for specific reasons related to the design and functionality.
:::

#### Arguments {#eventCallable-argument-arguments}

1. `event` is an instance of `EventCallable<T>`
2. `argument` is a value of `T`. It is optional, if event is defined as `Event<void>`.

#### Throws {#eventCallable-argument-throws}

<details>
<summary> <b>call of readonly event is not supported, use createEvent instead</b></summary>

> Since: effector 23.0.0

When user tried to call `Event`. In the most cases it happens when you tried to call derived event:

```ts
const numberReceived = createEvent<number>(); // EventCallable<number>
const stringifiedReceived = numberReceived.map((number) => String(number)); // Event<string>

stringifiedReceived("123"); // THROWS!
```

The same for all methods returning `Event`.

To fix it create separate event via `createEvent`, and connect them by `sample`:

```ts
const numberReceived = createEvent<number>();
const stringifiedReceived = createEvent<string>();

sample({
  clock: numberReceived,
  fn: (number) => String(number),
  target: stringifiedReceived,
});

stringifiedReceived("123"); // OK
```

</details>

<details>
<summary> <b>unit call from pure function is not supported, use operators like sample instead</b></summary>

> Since: effector 23.0.0

Happens when events or effects called from [pure functions](/en/glossary#purity), like mappers:

```ts
const someHappened = createEvent<number>();
const another = createEvent();

const derived = someHappened.map((number) => {
  another(); // THROWS!
  return String(number);
});
```

To fix this, use `sample`:

```ts
const someHappened = createEvent<number>();
const another = createEvent();
const derived = createEvent<string>();

sample({
  clock: someHappened,
  target: another,
});

// The same as .map(), but using `target`
sample({
  clock: someHappened,
  fn: (number) => String(number),
  target: derived,
});
```

</details>

#### Returns {#eventCallable-argument-returns}

_`T`_: Represents the same value that is passed into the `event`.

#### Types {#eventCallable-argument-types}

```ts
import { createEvent, Event } from "effector";

const someHappened = createEvent<number>();
// someHappened: EventCallable<number>
someHappened(1);

const anotherHappened = createEvent();
// anotherHappened: EventCallable<void>
anotherHappened();
```

An event can be specified with a single generic type argument. By default, this argument is set to void, indicating that
the event does not accept any parameters.

### `prepend(fn)` {#eventCallable-prepend-fn}

Creates a new `EventCallable`, that should be called, upon trigger it sends transformed data into the original event.

Works kind of like reverse `.map`. In case of `.prepend` data transforms **before the original event occurs** and in the
case of `.map`, data transforms **after original event occurred**.

If the original event belongs to some [domain](/en/api/effector/Domain), then a new event will belong to it as well.

#### Formulae {#eventCallable-prepend-fn-formulae}

```ts
const second = first.prepend(fn);
```

- When `second` event is triggered
- Call `fn` with argument from the `second` event
- Trigger `first` event with the result of `fn()`

#### Arguments {#eventCallable-prepend-fn-arguments}

1. `fn` (_Function_): A function that receives `argument`, [should be **pure**](/en/explanation/glossary#purity).

#### Throws {#eventCallable-prepend-fn-arguments}

<details>
<summary> <b>unit call from pure function is not supported, use operators like sample instead</b></summary>

> Since: effector 23.0.0

Happens when events or effects called from [pure functions](/en/glossary#purity), like mappers:

```ts
const someHappened = createEvent<string>();
const another = createEvent<number>();

const reversed = someHappened.prepend((input: number) => {
  another(input); // THROWS!
  return String(input);
});
```

To fix this, use `sample`:

```ts
const someHappened = createEvent<string>();
const another = createEvent<number>();
const reversed = createEvent<number>();

// The same as .prepend(), but using `sample`
sample({
  clock: reversed,
  fn: (input) => String(input),
  target: someHappened,
});

sample({
  clock: reversed,
  target: another,
});
```

</details>

#### Returns {#eventCallable-prepend-fn-arguments}

[_Event_](/en/api/effector/Event): New event.

#### Types {#eventCallable-prepend-fn-arguments}

There TypeScript requires explicitly setting type of the argument of `fn` function:

```ts
import { createEvent } from "effector";

const original = createEvent<{ input: string }>();

const prepended = original.prepend((input: string) => ({ input }));
//                                         ^^^^^^ here
```

Type of the `original` event argument and the resulting type of the `fn` must be the same.

#### Example {#eventCallable-prepend-fn-arguments}

```js
import { createEvent } from "effector";

const userPropertyChanged = createEvent();

userPropertyChanged.watch(({ field, value }) => {
  console.log(`User property "${field}" changed to ${value}`);
});

const changeName = userPropertyChanged.prepend((name) => ({
  field: "name",
  value: name,
}));
const changeRole = userPropertyChanged.prepend((role) => ({
  field: "role",
  value: role.toUpperCase(),
}));

changeName("john");
// => User property "name" changed to john

changeRole("admin");
// => User property "role" changed to ADMIN

changeName("alice");
// => User property "name" changed to alice
```

[Try it](https://share.effector.dev/XGxlG4LD)

#### Meaningful example {#eventCallable-prepend-fn-example-meaningful}

You can think of this method like a wrapper function. Let's assume we have function with not ideal API, but we want to
call it frequently:

```ts
import { sendAnalytics } from "./analytics";

export function reportClick(item: string) {
  const argument = { type: "click", container: { items: [arg] } };
  return sendAnalytics(argument);
}
```

This is exactly how `.prepend()` works:

```ts
import { sendAnalytics } from "./analytics";

export const reportClick = sendAnalytics.prepend((item: string) => {
  return { type: "click", container: { items: [arg] } };
});

reportClick("example");
// reportClick triggered "example"
// sendAnalytics triggered { type: "click", container: { items: ["example"] } }
```

---

Check all other methods on [Event](#event-methods).

<br/><br/>

# Event instance {#event}

A **Event** is a super type of `EventCallable` with different approach. Firstly, invoking a Event is not
allowed, and it cannot be used as a `target` in the `sample` operator, and so on.

The primary purpose of a Event is to be triggered by internal code withing the effector library or ecosystem.
For instance, the `.map()` method returns a Event, which is subsequently called by the `.map()` method itself.

:::info
There is no need for user code to directly invoke such a Event.

If you find yourself needing to call a Event, it may be necessary to reevaluate and restructure your
application's logic.
:::

All the functionalities provided by Event are also supported in a regular Event.

## Construction {#event-construction}

There is no way to manually create Event, but some methods and operators returns derived events, they are
have `Event<T>` type:

- Event's methods like: [`.map(fn)`](#event-map-fn), [`.filter({fn})`](#event-filterMap-fn), and so on
- Store's property: ['.updates'](/en/api/effector/Store#updates)
- Effect's [methods](/en/api/effector/Effect#effect) and [properties](/en/api/effector/Effect#properties)
- operators like: [`sample`](/en/api/effector/sample), [`merge`](/en/api/effector/merge)

## Throws {#event-throws}

It can throw some errors if used in surprising way: [More on this](#event-argument-throws)

## Declaring types {#event-types}

It becomes necessary in cases where a factory or library requires an event to subscribe to its updates, ensuring proper
integration and interaction with the provided functionality:

```ts
Event<T>;
```

_Where `T` represents the type of the event's argument._

[Read more in the explanation section](/en/explanation/events#event-using).

## Methods {#event-methods}

### `map(fn)` {#event-map-fn}

Creates a new derived Event, which will be called after the original event is called, using the result of the fn
function as its argument. This special function enables you to break down and manage data flow, as well as extract or
transform data within your business logic model.

#### Formulae {#event-map-fn-formulae}

```ts
const second = first.map(fn);
```

- When `first` is triggered, pass payload from `first` to `fn`.
- Trigger `second` with the result of the `fn()` call as payload.
- The function `fn` is invoked each time the `first` event is triggered.
- Also, the `second` event triggered each time the `first` is triggered.

#### Arguments {#event-map-fn-arguments}

1. `fn` (_Function_): A function that receives `argument`, [should be **pure**](/en/explanation/glossary#purity).

#### Throws {#event-map-fn-throws}

<details>
<summary> <b>unit call from pure function is not supported, use operators like sample instead</b></summary>

> Since: effector 23.0.0

Happens when events or effects called from [pure functions](/en/glossary#purity), like mappers:

```ts
const someHappened = createEvent<number>();
const another = createEvent();

const derived = someHappened.map((number) => {
  another(); // THROWS!
  return String(number);
});
```

To fix this, use `sample`:

```ts
const someHappened = createEvent<number>();
const another = createEvent();
const derived = createEvent<string>();

sample({
  clock: someHappened,
  target: another,
});

// The same as .map(), but using `target`
sample({
  clock: someHappened,
  fn: (number) => String(number),
  target: derived,
});
```

</details>

#### Returns {#event-map-fn-returns}

[_Event_](#event): The new event.

#### Types {#event-map-fn-types}

The resulting type of the `fn` function will be utilized to define the type of the derived event.

```ts
import { createEvent } from "effector";

const first = createEvent<number>();
// first: Event<number>

const second = first.map((count) => count.toString());
// second: Event<string>
```

The `first` event can be represented as either `Event<T>` or `Event<T>`. <br/>
The `second` event will always be represented as `Event<T>`.

#### Example {#event-map-fn-example}

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

### `filter({ fn })` {#event-filter-fn}

This method generates a new derived Event that will be invoked after the original event, but only if the `fn`
function returns a value of `true`. This special function enables you to break down data flow into a branches and
subscribe on them within the business logic model.

:::tip
[sample](/en/api/effector/sample) operator with `filter` argument is the preferred filtering method.
:::

#### Formulae {#event-filter-fn-formulae}

```ts
const second = first.filter({ fn });
```

- When `first` is triggered, pass payload from `first` to `fn`.
- The `second` event will be triggered only if `fn` returns `true`, with the argument from `first` event.
- The function `fn` is invoked each time the `first` event is triggered.
- Also, the `second` event triggered each time the `first` is triggered, **and** the `fn` returned `true`.

#### Arguments {#event-filter-fn-arguments}

1. `fn` (_Function_): A function that receives `argument`, [should be **pure**](/en/explanation/glossary#purity).

:::info{title="Note"}
Here, due to legacy restrictions `fn` is required to use object form because `event.filter(fn)` was an alias
for [Event filterMap](/en/api/effector/Event#event-filterMap-fn).

Use it always like this `.filter({ fn })`.
:::

#### Throws {#event-filter-fn-throws}

<details>
<summary> <b>unit call from pure function is not supported, use operators like sample instead</b></summary>

> Since: effector 23.0.0

Happens when events or effects called from [pure functions](/en/glossary#purity), like guards:

```ts
const countReceived = createEvent<number>();
const eachReceived = createEvent<number>();

const receivedEven = someHappened.filter({
  fn(count) {
    eachReceived(count); // THROWS!
    return count % 2 === 0;
  },
});
```

To fix this, use `sample` to call `eachReceived`:

```ts
const countReceived = createEvent<number>();
const eachReceived = createEvent<number>();

const receivedEven = someHappened.filter({
  fn(count) {
    return count % 2 === 0;
  },
});

sample({
  clock: someHappened,
  target: eachReceived,
});
```

</details>

#### Returns {#event-filter-fn-returns}

[_Event_](#event): The new event

#### Types {#event-filter-fn-types}

Method `.filter()` always returns Event. Also this event will have the same type as the original type:

```ts
import { createEvent } from "effector";

const numberReceived = createEvent<number>();
// numberReceived: Event<number>

const evenReceived = numberReceived.filter({
  fn: (number) => number % 2 === 0,
});
// evenReceived: Event<number>

evenReceived.watch(console.info);
numberReceived(5); // nothing
numberReceived(2); // => 2
```

#### Example {#event-filter-fn-example}

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

#### Meaningful example {#event-filter-fn-example-meaningful}

Let's assume a standard situation when you want to buy sneakers in the shop, but there is no size. You subscribe to the
particular size of the sneakers' model, and in addition, you want to receive a notification if they have it, and ignore
any other notification. Therefore, filtering can be helpful for that. Event filtering works in the same way. If `filter`
returns `true`, the event will be called.

```ts
const sneackersReceived = createEvent<Sneakers>();
const uniqueSizeReceived = sneackersReceived.filter({
  fn: (sneackers) => sneackers.size === 48,
});
```

### `filterMap(fn)` {#event-filterMap-fn}

:::info{title="since"}
[effector 20.0.0](https://changelog.effector.dev/#effector-20-0-0)
:::

This methods generates a new derived Event that **may be invoked** after the original event, but with the
transformed argument. This special method enabled you to simultaneously transform data and filter out trigger of the
event.

This method looks like the `.filter()` and `.map()` merged in the one. That's it. The reason for creating was an
impossibility for event filtering.

This method is mostly useful with JavaScript APIs whose returns `undefined` sometimes.

#### Formulae {#event-filterMap-fn-formulae}

```ts
const second = first.filterMap(fn);
```

- When `first` is triggered, call `fn` with payload from `first`
- If `fn()` returned `undefined` do not trigger `second`
- If `fn()` returned some data, trigger `second` with data from `fn()`

#### Arguments {#event-filterMap-fn-arguments}

1. `fn` (_Function_): A function that receives `argument`, [should be **pure**](/en/explanation/glossary#purity).

The `fn` function should return some data. When `undefined` is returned, the update of derived event will be skipped.

#### Throws {#event-filterMap-fn-throws}

<details>
<summary> <b>unit call from pure function is not supported, use operators like sample instead</b></summary>

> Since: effector 23.0.0

Happens when events or effects called from [pure functions](/en/glossary#purity), like mappers:

```ts
const countReceived = createEvent<number>();
const eachReceived = createEvent<number>();

const receivedEven = someHappened.filterMap((count) => {
  eachReceived(count); // THROWS!
  return count % 2 === 0 ? Math.abs(count) : undefined;
});
```

To fix this, use `sample` to call `eachReceived`:

```ts
const countReceived = createEvent<number>();
const eachReceived = createEvent<number>();

const receivedEven = someHappened.filterMap((count) => {
  return count % 2 === 0 ? Math.abs(count) : undefined;
});

sample({
  clock: someHappened,
  target: eachReceived,
});
```

</details>

#### Returns {#event-filterMap-fn-returns}

[_Event_](#event): The new event

#### Types {#event-filterMap-fn-types}

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
// second: Event<string>
```

The `first` event can be represented as either `Event<T>` or `Event<T>`. <br/>
The `second` event will always be represented as `Event<T>`.

#### Example {#event-filterMap-fn-example}

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

#### Meaningful example {#event-filterMap-fn-example-meaningful}

Consider a scenario where you walk into a grocery store with a specific task: you need to purchase 10 apples, but only
if they're red. If they're not red, you're out of luck.
Let's consider by steps:

1. Take one apple;
2. Have a look, is it red(put in a pack) or not(take another).

And you repeat this until you complete the task. Now think about it in the effector terms, and we consider the positive
case:

1. Take an apple – event;
2. Have a look, red or no – filter;
3. You keep it – map;
4. Put in pack – event.
5. Pack – store

### `watch(watcher)` {#event-watch-watcher}

This method enables you to call callback on each event trigger with the argument of the event.

:::tip{title="Keep in mind"}
The `watch` method neither handles nor reports exceptions, manages the completion of asynchronous operations, nor
addresses data race issues.

Its primary intended use is for short-term debugging and logging purposes.
:::

[Read more in the explanation section](/en/explanation/events#event-watch).

#### Formulae {#event-watch-watcher-formulae}

```ts
const unwatch = event.watch(fn);
```

- The `fn` will be called on each `event` trigger, passed argument of the `event` to the `fn`.
- When `unwatch` is called, stop calling `fn` on each `event` trigger.

#### Arguments {#event-watch-watcher-arguments}

1. `watcher` ([_Watcher_](/en/explanation/glossary#watcher)): A function that receives `argument` from the event.

#### Returns {#event-watch-watcher-returns}

[_Subscription_](/en/explanation/glossary#subscription): Unsubscribe function.

#### Example {#event-watch-watcher-example}

```js
import { createEvent } from "effector";

const sayHi = createEvent();
const unwatch = sayHi.watch((name) => console.log(`${name}, hi there!`));

sayHi("Peter"); // => Peter, hi there!
unwatch();

sayHi("Drew"); // => nothing happened
```

[Try it](https://share.effector.dev/9YVgCl4C)

### `subscribe(observer)` {#event-subscribe-observer}

This is the low-level method to integrate event with the standard `Observable` pattern.

:::tip{title="Keep in mind"}
You don't need to use this method on your own. It is used under the hood by rendering engines or so on.
:::

Read more:

- https://rxjs.dev/guide/observable
- https://github.com/tc39/proposal-observable

## Properties {#event-properties}

These set of property is mostly set by [`effector/babel-plugin`](/en/api/effector/babel-plugin)
or [`@effector/swc-plugin`](https://github.com/effector/swc-plugin). So they are exist only when babel or SWC is used.

### `sid` {#event-sid}

It is an unique identifier for each event.

It is important to note, SID is not changes on each app start, it is statically written inside your app bundle to
absolutely identify units.

It can be useful to send events between workers or
server/browser: [examples/worker-rpc](https://github.com/effector/effector/tree/master/examples/worker-rpc).

It has the `string | null` type.

### `shortName` {#event-shortName}

It is a `string` type property, contains the name of the variable event declared at.

```ts
import { createEvent } from "effector";

const demo = createEvent();
// demo.shortName === 'demo'
```

But reassign event to another variable changes nothing:

```ts
const another = demo;
// another.shortName === 'demo'
```

### `compositeName` {#event-compositeName}

This property contains the full internal chain of units. For example, event can be created by the domain, so the
composite name will contain a domain name inside it.

```ts
import { createEvent, createDomain } from "effector";

const first = createEvent();
const domain = createDomain();
const second = domain.createEvent();

console.log(first);
// => { shortName: "first", fullName: "first", path: ["first"] }

console.log(second);
// => { shortName: "second", fullName: "domain/second", path: ["domain", "second"] }
```
