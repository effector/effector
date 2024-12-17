---
title: TypeScript в effector
description: Использование TypeScript с effector и примеры типизации
---

# TypeScript в effector

Effector предоставляет первоклассную поддержку TypeScript из коробки, что дает вам надежную типизацию и отличный developer experience при работе с библиотекой. В этом разделе мы рассмотрим как базовые концепции типизации, так и продвинутые техники работы с типами в effector.

## Базовая типизация (#basic-typing)

### События (#typing-events)

События в effector могут быть типизированы при помощи передачи типа в дженерик функции:

```ts
import { createEvent } from "effector";

// Событие без параметров
const clicked = createEvent();
// Event<void>

// Событие с параметром
const userNameChanged = createEvent<string>();
// Event<string>

// Событие со сложным параметром
const formSubmitted = createEvent<{
  username: string;
  password: string;
}>();
```

:::info{title="Автоматический вывод типов"}
Если вы не указываете тип явно, TypeScript автоматически выведет тип Event<void> для события без параметров.
:::

### Сторы (#typing-stores)

Сторы также можно типизировать при помощи передачи типа в дженерик функции:

```ts
import { createStore } from "effector";

// Базовый стор с примитивным значением
const $counter = createStore(0);
// Store<number>

// Стор со сложным объектным типом
interface User {
  id: number;
  name: string;
  role: "admin" | "user";
}

const $user = createStore<User>({
  id: 1,
  name: "Bob",
  role: "user",
});

// Стор с generic типом
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
}

const $users = createStore<PaginatedResponse<User>>({
  data: [],
  total: 0,
  page: 1,
});
```

### Эффекты (#typing-effects)

Эффекты поддерживают типизацию входных параметров, возвращаемого результата и ошибок:

```ts
import { createEffect } from "effector";
// Базовый эффект
const fetchUserFx = createEffect<string, User>(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);

  return response.json();
});
// Effect<string, User>

// Эффект с обработкой ошибок
interface ApiError {
  code: number;
  message: string;
}

const fetchUserFx = createEffect<string, User, ApiError>(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);

  if (!response.ok) {
    throw (await response.json()) as ApiError;
  }

  return response.json();
});
```

#### Типизация ошибок с `createEffect` (#typing-errors-in-createEffect)

Некоторый код может выдать исключения только некоторых типов, например библиотека axios в качестве ошибок использует только `AxiosError`. В эффектах для описания типов ошибок используется дженерик `Fail`.

Для его указания, в случае, когда тип аргумента и тип результата задаётся явно (первым и вторым дженериком метода [createEffect](/ru/api/effector/createEffect) соответственно), используется третий дженерик метода:

```ts
const fetchUserFx = createEffect<string, User, AxiosError>(async ({ warn }) => {
  // ...
  return "ok";
});
// => Effect<string, User, AxiosError>
```

В случае, когда обработчик эффекта определен до самого эффекта, TypeScript может определить тип `Params` и `Done` используя `typeof handler` в первом generic, не указывая сами типы явно. В таком случае описание типа ошибок можно передать в опциональный второй дженерик метода:

```ts
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

## Продвинутые техники типизации (#advanced-typing)

### Комбинированные и производные юниты (#typing-derived-units)

#### Типизация `event.prepend` (#typing-event-prepend)

Чтобы добавить типы к событиям, созданным с помощью [event.prepend](/ru/api/effector/Event#prepend-fn), необходимо добавить тип либо в аргумент функции prepend, либо как дженерик

```typescript
const message = createEvent<string>();

const userMessage = message.prepend(({ text }: { text: string }) => text);
// userMessage имеет тип Event<{text: string}>

const warningMessage = message.prepend<{ warn: string }>(({ warn }) => warn);
// warningMessage имеет тип Event<{warn: string}>
```

#### Типизация `attach` (#typing-attach)

Чтобы позволить TypeScript выводить типы создаваемого эффекта, можно добавить тип к первому аргументу `mapParams`, который станет дженериком `Params` у результата

```ts
const sendTextFx = createEffect<{ text: string }, "ok">();

const sendWarningFx = attach({
  effect: sendTextFx,
  mapParams: ({ warn }: { warn: string }) => ({ text: warn }),
});
// sendWarningFx имеет тип Effect<{warn: string}, 'ok'>
```

#### Типизация `split` (#typing-split)

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

### Утилиты для типов (#type-utilities)

Effector предоставляет набор утилитных типов для работы с типами юнитов:

#### UnitValue (#type-utilities-unit-values)

Тип `UnitValue` служит для извлечение типа данных из юнитов:

```ts
import { UnitValue, createEffect, createStore, createEvent } from "effector";

const event = createEvent<{ id: string; name?: string } | { id: string }>();
type UnitEventType = UnitValue<typeof event>;
// {id: string; name?: string | undefined} | {id: string}

const $store = createStore([false, true]);
type UnitStoreType = UnitValue<typeof $store>;
// boolean[]

const effect = createEffect<{ token: string }, any, string>(() => {});
type UnitEffectType = UnitValue<typeof effect>;
// {token: string}

const scope = fork();
type UnitScopeType = UnitValue<typeof scope>;
// any
```

#### StoreValue (#type-utilities-store-value)

`StoreValue` по своей сути похож на `UnitValue`, но работает только со стором:

```ts
import { createStore, StoreValue } from "effector";

const $store = createStore(true);

type StoreValueType = StoreValue<typeof $store>;
// boolean
```

#### EventPayload (#type-utilities-event-payload)

Извлекает тип данных из событий.
Похож на `UnitValue`, но только для [событий](/ru/api/effector/Event)

```ts
import { createEvent, EventPayload } from "effector";

const event = createEvent<{ id: string }>();

type EventPayloadType = EventPayload<typeof event>;
// {id: string}
```

#### EffectParams (#type-utilities-effect-params)

Принимает тип эффекта в параметры дженерика, позволяет получить тип параметров [эффекта](/ru/api/effector/Effect).

```ts
import { createEffect, EffectParams } from "effector";

const fx = createEffect<
  { id: string },
  { name: string; isAdmin: boolean },
  { statusText: string; status: number }
>(() => {
  // ...
  return { name: "Alice", isAdmin: false };
});

type EffectParamsType = EffectParams<typeof fx>;
// {id: string}
```

#### EffectResult (#type-utilities-effect-results)

Принимает тип эффекта в параметры дженерика, позволяет получить тип возвращаемого значения [эффекта](/ru/api/effector/Effect).

```ts
import { createEffect, EffectResult } from "effector";

const fx = createEffect<
  { id: string },
  { name: string; isAdmin: boolean },
  { statusText: string; status: number }
>(() => ({ name: "Alice", isAdmin: false }));

type EffectResultType = EffectResult<typeof fx>;
// {name: string; isAdmin: boolean}
```

#### EffectError (#type-utilities-effect-error)

Принимает тип эффекта в параметры дженерика, позволяет получить тип ошибки [эффекта](/ru/api/effector/Effect).

```ts
import { createEffect, EffectError } from "effector";

const fx = createEffect<
  { id: string },
  { name: string; isAdmin: boolean },
  { statusText: string; status: number }
>(() => ({ name: "Alice", isAdmin: false }));

type EffectErrorType = EffectError<typeof fx>;
// {statusText: string; status: number}
```
