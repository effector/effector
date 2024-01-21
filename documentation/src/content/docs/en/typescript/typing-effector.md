---
title: Typing effector
description: Best practices for writing well-typed code
redirectFrom:
  - /docs/typescript/typing-effector
  - /typescript/typing-effector
---

Best practices for writing well-typed code

## `createEvent`

By default, this method returns `Event<void>`.

```typescript
const event = createEvent();
// event has type Event<void>
event();
```

Event type can be defined as generic

```typescript
const event = createEvent<number>();
// event has type Event<number>
event(0);
```

## `createEffect`

TypeScript can infer an effect result type from a given handler, but the argument type should be defined either in handler argument or as generic type

```typescript
const sendMessageFx = createEffect(async (params: { text: string }) => {
  // ...
  return "ok";
});
// sendMessageFx has type Effect<{text: string}, string>

const sendWarningFx = createEffect<{ warn: string }, string>(async ({ warn }) => {
  // ...
  return "ok";
});
// sendWarningFx has type Effect<{warn: string}, string>
```

## `createEffect` and custom errors

When you need custom error types (`Fail` type in `Effect`) you can define all generics explicitly:

```typescript
const sendWarningFx = createEffect<{ warn: string }, string, AxiosError>(async ({ warn }) => {
  // ...
  return "ok";
});
// sendWarningFx has type Effect<{warn: string}, string, AxiosError>
```

In case when effect's handler is defined before effect itself you can allow typescript to infer the type of `Params` and `Done` by using `typeof handler` in first generic and optionally provide `Fail` type as second one

```typescript
const sendMessage = async (params: { text: string }) => {
  // ...
  return "ok";
};

const sendMessageFx = createEffect<typeof sendMessage, AxiosError>(sendMessage);
// sendMessageFx has type Effect<{text: string}, string, AxiosError>
```

:::info{title="since"}
[effector 21.6.0](https://changelog.effector.dev/#effector-21-6-0)
:::

## `event.prepend`

To add types to events, created by [event.prepend](/en/api/effector/Event#prepend-fn), you need to add a type either by prepending function argument or as generic type

```typescript
const message = createEvent<string>();

const userMessage = message.prepend(({ text }: { text: string }) => text);
// userMessage has type Event<{text: string}>

const warningMessage = message.prepend<{ warn: string }>(({ warn }) => warn);
// warningMessage has type Event<{warn: string}>
```

## `attach`

To allow typescript to infer types of created effect, add a type to `mapParams` first argument, which will become effect `params` type

```typescript
const sendTextFx = createEffect<{ text: string }, "ok">();

const sendWarningFx = attach({
  effect: sendTextFx,
  mapParams: ({ warn }: { warn: string }) => ({ text: warn }),
});
// sendWarningFx has type Effect<{warn: string}, 'ok'>
```

## `split`

[TypeScript type predicates](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates) can be used to split a common event type to several cases (hence the name)

```typescript
type UserMessage = { kind: "user"; text: string };
type WarnMessage = { kind: "warn"; warn: string };

const message = createEvent<UserMessage | WarnMessage>();

const { userMessage, warnMessage } = split(message, {
  userMessage: (msg): msg is UserMessage => msg.kind === "user",
  warnMessage: (msg): msg is WarnMessage => msg.kind === "warn",
});
// userMessage has type Event<UserMessage>
// warnMessage has type Event<WarnMessage>
```

## `sample`

Since `effector@22.2.0` update `sample` also supports a `filter` field, which can also be a [TypeScript type predicate](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates).

```typescript
type UserMessage = { kind: "user"; text: string };
type WarnMessage = { kind: "warn"; warn: string };

const message = createEvent<UserMessage | WarnMessage>();
const userMessage = createEvent<UserMessage>();

sample({
  clock: message,
  filter: (msg): msg is UserMessage => msg.kind === "user",
  target: userMessage,
});
```

### `filter + fn`

However, `sample` also has a `fn` field to apply custom transformations.
There is a caveat with TypeScript type inference mechanic, which requires user to explicitly type `filter` arguments for type inference to work

```typescript
type UserMessage = { kind: "user"; text: string };
type WarnMessage = { kind: "warn"; warn: string };
type Message = UserMessage | WarnMessage;

const message = createEvent<Message>();
const userText = createEvent<string>();

sample({
  clock: message,
  // need to explicitly type `msg` as `Message` there
  filter: (msg: Message): msg is UserMessage => msg.kind === "user",
  // to get correct type inference here
  fn: (msg) => msg.text,
  target: userText,
});

// userMessage has type Event<string>
```

Otherwise, TypeScript will fall back to `any`.

However, TypeScript will not allow you to set an incorrect `filter` type

```typescript
const message = createEvent<Message>();
const userMessage = createEvent<UserMessage>();

sample({
  clock: message,
  // Type 'Message' is not assignable to type '{ kind: "user" | "wrong"; text: number; }'.
  filter: (msg: { kind: "user" | "wrong"; text: number }): msg is UserMessage =>
    msg.kind === "user",
  fn: (msg) => msg.text,
  target: userMessage,
});
```

## `createApi`

To allow TypeScript to infer types of created events, adding a type to second argument of given reducers

```typescript
const $count = createStore(0);

const { add, sub } = createApi($count, {
  add: (x, add: number) => x + add,
  sub: (x, sub: number) => x - sub,
});

// add has type Event<number>
// sub has type Event<number>
```

## `is`

`is` methods can help to infer a unit type (thereby `is` methods acts as [TypeScript type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)) which can help to write strongly-typed helper functions

```typescript
export function getUnitType(unit: unknown) {
  if (is.event(unit)) {
    // here unit has Event<any> type
    return "event";
  }
  if (is.effect(unit)) {
    // here unit has Effect<any, any> type
    return "effect";
  }
  if (is.store(unit)) {
    // here unit has Store<any> type
    return "store";
  }
}
```
