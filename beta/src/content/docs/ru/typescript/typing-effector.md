---
title: Типизация с эффектором
description: Лучшие практики для написания хорошо типизированного кода
lang: ru
---

Лучшие практики для написания хорошо типизированного кода

## `createEvent`

По умолчанию этот метод возвращает `Event<void>`

```typescript
const event = createEvent();
// => Event<void>
event();
```

Тип события может быть указан как дженерик

```typescript
const event = createEvent<number>();
// => Event<number>
event(0);
```

## `createEffect`

TypeScript может вывести тип результата эффекта из заданного обработчика, но тип аргумента должен быть определен либо в аргументе обработчика, либо как дженерик

```typescript
const sendMessageFx = createEffect(async (params: { text: string }) => {
  // ...
  return "ok";
});
// => Effect<{text: string}, string>

const sendWarningFx = createEffect<{ warn: string }, string>(async ({ warn }) => {
  // ...
  return "ok";
});
// => Effect<{warn: string}, string>
```

## Типизация ошибок с `createEffect`

Некоторый код может выдать исключения только некоторых типов, например библиотека axios в качестве ошибок использует только `AxiosError`. В эффектах для описания типов ошибок используется дженерик `Fail`.

Для его указания, в случае, когда тип аргумента и тип результата задаётся явно (первым и вторым дженериком метода [createEffect](/ru/api/effector/createEffect) соответственно), используется третий дженерик метода:

```typescript
const sendWarningFx = createEffect<{ warn: string }, string, AxiosError>(async ({ warn }) => {
  // ...
  return "ok";
});
// => Effect<{warn: string}, string, AxiosError>
```

В случае, когда обработчик эффекта определен до самого эффекта, TypeScript может определить тип `Params` и `Done` используя `typeof handler` в первом generic, не указывая сами типы явно. В таком случае описание типа ошибок можно передать в опциональный второй дженерик метода:

```typescript
const sendMessage = async (params: { text: string }) => {
  // ...
  return "ok";
};

const sendMessageFx = createEffect<typeof sendMessage, AxiosError>(sendMessage);
// => Effect<{text: string}, string, AxiosError>
```

:::info
`Fail` в качестве второго дженерика добавлен в effector 21.6.0
:::

## `event.prepend`

Чтобы добавить типы к событиям, созданным с помощью [event.prepend](/ru/api/effector/Event#prepend-fn), необходимо добавить тип либо в аргумент функции prepend, либо как дженерик

```typescript
const message = createEvent<string>();

const userMessage = message.prepend(({ text }: { text: string }) => text);
// userMessage имеет тип Event<{text: string}>

const warningMessage = message.prepend<{ warn: string }>(({ warn }) => warn);
// warningMessage имеет тип Event<{warn: string}>
```

## `attach`

Чтобы позволить TypeScript выводить типы создаваемого эффекта, можно добавить тип к первому аргументу `mapParams`, который станет дженериком `Params` у результата

```typescript
const sendTextFx = createEffect<{ text: string }, "ok">();

const sendWarningFx = attach({
  effect: sendTextFx,
  mapParams: ({ warn }: { warn: string }) => ({ text: warn }),
});
// sendWarningFx имеет тип Effect<{warn: string}, 'ok'>
```

## `split`

[TypeScript type predicates](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates) можно использовать для разделения исходного типа события на несколько вариантов (отсюда и название)

```typescript
type UserMessage = { kind: "user"; text: string };
type WarnMessage = { kind: "warn"; warn: string };

const message = createEvent<UserMessage | WarnMessage>();

const { userMessage, warnMessage } = split(message, {
  userMessage: (msg): msg is UserMessage => msg.kind === "user",
  warnMessage: (msg): msg is WarnMessage => msg.kind === "warn",
});
// userMessage имеет тип Event<UserMessage>
// warnMessage имеет тип Event<WarnMessage>
```

## `guard`

[TypeScript type predicates](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates) можно использовать для вывода типа результата с помощью функции `filter`

```typescript
type UserMessage = { kind: "user"; text: string };
type WarnMessage = { kind: "warn"; warn: string };

const message = createEvent<UserMessage | WarnMessage>();

const userMessage = guard(message, {
  filter: (msg): msg is UserMessage => msg.kind === "user",
});

// userMessage имеет тип Event<UserMessage>
```

## `createApi`

Чтобы позволить TypeScript выводить типы создаваемых событий, можно добавить тип ко второму аргументу обработчиков

```typescript
const $count = createStore(0);

const { add, sub } = createApi($count, {
  add: (x, add: number) => x + add,
  sub: (x, sub: number) => x - sub,
});

// add имеет тип Event<number>
// sub имеет тип Event<number>
```

## `is`

Методы группы [is](/ru/api/effector/is) могут помочь вывести тип юнита, то есть они действуют как [TypeScript type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types). Это применяется в написании типизированных утилит

```typescript
export function getUnitType(unit: unknown) {
  if (is.event(unit)) {
    // здесь юнит имеет тип Event<any>
    return "event";
  }
  if (is.effect(unit)) {
    // здесь юнит имеет тип Effect<any, any>
    return "effect";
  }
  if (is.store(unit)) {
    // здесь юнит имеет тип Store<any>
    return "store";
  }
}
```
