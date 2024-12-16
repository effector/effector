---
title: Объединение юнитов
description: Как связывать юниты с помощью sample и attach
---

# Объединение юнитов в effector

В Effector есть два мощных инструмента для связывания юнитов между собой: `sample` и `attach`. Хотя они могут показаться похожими, у каждого из них есть свои особенности и сценарии использования.

## Sample: связь данных и событий

`sample` - это универсальный инструмент для связывания юнитов. Его главная задача - брать данные из одного места `source` и передавать их в другое место `target` при срабатывании определённого триггера `clock`.

### Базовое использование sample

```typescript
import { createStore, createEvent, sample, createEffect } from "effector";

const buttonClicked = createEvent();

const $userName = createStore("Bob");

const fetchUserFx = createEffect((userName) => {
  // логика
});

// При клике на кнопку получаем текущее имя
sample({
  clock: buttonClicked,
  source: $userName,
  target: fetchUserFx,
});
```

Триггером в `sample` может также служить `source`.

```ts
import { createStore, sample } from "effector";

const $currentUser = createStore({ name: "Bob", age: 25 });

// создает производный стор, который обновляется, когда source меняется
const $userAge = sample({
  source: $currentUser,
  fn: (user) => user.age,
});
```

Когда использовать `sample`:

1. Когда нужно взять данные из хранилища в момент события
2. Для трансформации данных перед отправкой
3. Для условной обработки через filter
4. Для синхронизации нескольких источников данных

### Продвинутые возможности sample

#### Трансформация данных

Часто нужно не просто передать данные, но и преобразовать их. Для этого используется параметр `fn`:

```ts
import { createEvent, createStore, sample } from "effector";

const buttonClicked = createEvent();
const $user = createStore({ name: "Bob", age: 25 });
const $userInfo = createStore("");

sample({
  clock: buttonClicked,
  source: $user,
  fn: (user) => `${user.name} is ${user.age} years old`,
  target: $userInfo,
});
```

#### Фильтрация событий

`sample` позволяет фильтровать события с помощью параметра `filter`:

```ts
import { createEvent, createStore, sample, createEffect } from "effector";

type UserFormData = {
  username: string;
  age: number;
};

const submitForm = createEvent();

const $formData = createStore<UserFormData>({ username: "", age: 0 });

const submitToServerFx = createEffect((formData: UserFormData) => {
  // логика
});

sample({
  clock: submitForm,
  source: $formData,
  filter: (form) => form.age >= 18 && form.username.length > 0,
  target: submitToServerFx,
});

submitForm();
```

При вызове `submitForm` мы берем данные из source, проверем в filter по условиям, если проверка прошла успешно, то возвращаем `true`, в ином случае `false`. Если проверка прошла успешно, то вызывает `target`.

:::warning{title="Важная информация"}
Функции `fn` и `filter` **должны** быть чистыми функциями!
:::

#### Комбинирование нескольких источников

Можно использовать несколько сторов как источник данных:

```ts
import { createEvent, createStore, sample, createEffect } from "effector";

type SubmitSearch = {
  query: string;
  filters: Array<string>;
};

const submitSearchFx = createEffect((params: SubmitSearch) => {
  /// логика
});

const searchClicked = createEvent();

const $searchQuery = createStore("");
const $filters = createStore<string[]>([]);

sample({
  clock: searchClicked,
  source: {
    query: $searchQuery,
    filters: $filters,
  },
  target: submitSearchFx,
});
```

### Возвращаемое значение sample

`sample` возвращает юнит, тип которого зависит от конфигурации:

#### С target

Если указан `target`, `sample` вернёт этот же `target`:

```typescript
const $store = createStore(0);
const submitted = createEvent();
const sendData = createEvent<number>();

// result будет иметь тип Event<number>
const result = sample({
  clock: submitted,
  source: $store,
  target: sendData,
});
```

#### Без target

Когда `target` не указан, то тип возвращаемого значения зависит от передаваемых параметров.<br/>
Если **НЕ** указан `filter`, а также `clock` и `source` **являются хранилищами**, то результат будет также [хранилищем](/ru/api/effector/Store) с типом данных из `source`.<br/>

```ts
import { createStore, sample } from "effector";

const $store = createStore("");
const $secondStore = createStore(0);

const $derived = sample({
  clock: $secondStore,
  source: $store,
});
// $derived будет Store<string>

const $secondDerived = sample({
  clock: $secondStore,
  source: $store,
  fn: () => false,
});
// $secondDerived будет Store<boolean>
```

Если используется `fn`, то тип возвращаемого значения будет соответствовать результату функции.

В остальных же случаях возвращаемое значение будет событием с типом зависящий от `source`.

```ts
import { createStore, createEvent, sample } from "effector";

const $store = createStore(0);

const submitted = createEvent<string>();

const event = sample({
  clock: submitted,
  source: $store,
});
// event имеет тип Event<number>

const secondSampleEvent = sample({
  clock: submitted,
  source: $store,
  fn: () => true,
});
// Event<true>
```

### Практический пример

```ts
import { createStore, createEvent, sample } from "effector";

const userSelected = createEvent<number>();

const $users = createStore<User[]>([]);
const $selectedUserId = createStore<number | null>(null);
$selectedUserId.on(userSelected, (_, userId) => userId);

// Создаём производный стор, который будет хранить выбранного пользователя
const $selectedUser = sample({
  clock: $selectedUserId,
  source: $users,
  fn: (users, id) => users.find((user) => user.id === id) || null,
});
// $selectedUser имеет тип Store<User | null>

// Создаём событие, которое будет срабатывать только для админов
const adminSelected = sample({
  clock: userSelected,
  source: $users,
  fn: (users, id) => users.find((user) => user.id === id && user.role === "admin"),
  filter: Boolean, // сработает только если пользователь найден и он админ
});
// adminSelected имеет тип Event<User>
```

## Attach: специализация эффектов

`attach` - это инструмент для создания новых эффектов на основе существующих, с доступом к данным из сторов. Это особенно полезно когда нужно:

- Добавить контекст к эффекту
- Переиспользовать логику эффекта с разными параметрами
- Инкапсулировать доступ к стору

```ts
import { attach, createEffect, createStore } from "effector";

type SendMessageParams = { text: string; token: string };

// Базовый эффект для отправки данных
const baseSendMessageFx = createEffect<SendMessageParams, void>(async ({ text, token }) => {
  await fetch("/api/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
});

// Стор с токеном авторизации
const $authToken = createStore("default-token");

// Создаём специализированный эффект, который автоматически использует токен
const sendMessageFx = attach({
  effect: baseSendMessageFx,
  source: $authToken,
  mapParams: (text: string, token) => ({
    text,
    token,
  }),
});

// Теперь можно вызывать эффект только с текстом сообщения
sendMessageFx("Hello!"); // токен будет добавлен автоматически
```

Очень удобно использовать `attach` для переиспользования логики:

```ts
const fetchDataFx = createEffect<{ endpoint: string; token: string }, any>();

// Создаём специализированные эффекты для разных эндпоинтов
const fetchUsersFx = attach({
  effect: fetchDataFx,
  mapParams: (_, token) => ({
    endpoint: "/users",
    token,
  }),
  source: $authToken,
});

const fetchProductsFx = attach({
  effect: fetchDataFx,
  mapParams: (_, token) => ({
    endpoint: "/products",
    token,
  }),
  source: $authToken,
});
```
