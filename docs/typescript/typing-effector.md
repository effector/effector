---
id: typing-effector
title: Typing effector
---

## createEffect

Typescript can infer effect result type from given handler, but argument should be defined either in handler argument or as generic type

```typescript
const sendMessageFx = createEffect(async (params: {text: string}) => {
  // ...
  return 'ok'
})
// sendMessageFx has type Effect<{text: string}, string>

const sendWarningFx = createEffect<{warn: string}, string>({
  async handler({warn}) {
    // ...
    return 'ok'
  },
})
// sendWarningFx has type Effect<{warn: string}, string>
```

## event.prepend

To add types to events, created by [event.prepend](../api/effector/Event.md#prependfn) you need to add type either to prepend function argument or as generic type

```typescript
const message = createEvent<string>()

const userMessage = message.prepend(({text}: {text: string}) => text)
// userMessage has type Event<{text: string}>

const warningMessage = message.prepend<{warn: string}>(({warn}) => warn)
// warningMessage has type Event<{warn: string}>
```

## attach

To allow typescript to infer types of created effect, add type to `mapParams` first argument, which will become effect `params` type

```typescript
const sendTextFx = createEffect<{text: string}, 'ok'>()

const sendWarningFx = attach({
  effect: sendTextFx,
  mapParams: ({warn}: {warn: string}) => ({text: warn}),
})
// sendWarningFx has type Effect<{warn: string}, 'ok'>
```

## split

[Typescript type predicates](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates) can be used to split common event type to several cases (hence the name)

```typescript
type UserMessage = {kind: 'user'; text: string}
type WarnMessage = {kind: 'warn'; warn: string}

const message = createEvent<UserMessage | WarnMessage>()

const {userMessage, warnMessage} = split(message, {
  userMessage: (msg): msg is UserMessage => msg.kind === 'user',
  warnMessage: (msg): msg is WarnMessage => msg.kind === 'warn',
})
// userMessage has type Event<UserMessage>
// warnMessage has type Event<WarnMessage>
```

## guard

[Typescript type predicates](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates) can be used to infer result type by `filter` function

```typescript
type UserMessage = {kind: 'user'; text: string}
type WarnMessage = {kind: 'warn'; warn: string}

const message = createEvent<UserMessage | WarnMessage>()

const userMessage = guard(message, {
  filter: (msg): msg is UserMessage => msg.kind === 'user',
})

// userMessage has type Event<UserMessage>
```

## createApi

To allow typescript to infer types of created events, add type to second argument of given reducers

```typescript
const $count = createStore(0)

const {add, sub} = createApi($count, {
  add: (x, add: number) => x + add,
  sub: (x, sub: number) => x - sub,
})

// add has type Event<number>
// sub has type Event<number>
```

## is

`is` methods can help to infer unit type (thereby `is` methods acts as [TypeScript type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)) which can help to write strongly-typed helper functions

```typescript
export function getUnitType(unit: unknown) {
  if (is.event(unit)) {
    // here unit has Event<any> type
    return 'event'
  }
  if (is.effect(unit)) {
    // here unit has Effect<any, any> type
    return 'effect'
  }
  if (is.store(unit)) {
    // here unit has Store<any> type
    return 'store'
  }
}
```
