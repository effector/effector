---
title: Объединение юнитов
description: Как связывать юниты с помощью sample и attach
lang: ru
---

# Композиция юнитов в effector (#unit-composition)

В Effector есть два мощных инструмента для связывания юнитов между собой: `sample` и `attach`. Хотя они могут показаться похожими, у каждого из них есть свои особенности и сценарии использования.

## Sample: связь данных и событий (#sample)

`sample` - это универсальный инструмент для связывания юнитов. Его главная задача - брать данные из одного места `source` и передавать их в другое место `target` при срабатывании определённого триггера `clock`.

Общий паттерн работы метода `sample` следующий:

1. Сработай при вызове тригера `clock`
2. Возьми данные из `source`
3. Отфильтруй данные, если все корректно, то верни `true` и иди дальше по цепочке, иначе `false`
4. Преобразуй данные при помощи `fn`
5. Отдай данные в `target`.

### Базовое использование sample (#sample-basic-example)

```ts
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

:::tip{title="Универсальность sample"}
Если вы не укажете `clock`, то источником вызова также может послужить и `source`. Вы должны использовать хотя бы один из этих свойств аргумента!
:::

```ts
import { createStore, sample } from "effector";

const $currentUser = createStore({ name: "Bob", age: 25 });

// создает производный стор, который обновляется, когда source меняется
const $userAge = sample({
  source: $currentUser,
  fn: (user) => user.age,
});
// эквивалентно
const $userAgeViaMap = $currentUser.map((currentUser) => currentUser.age);
```

Как вы можете заметить метод `sample` очень гибкий и может использоваться в различных сценариях:

- Когда нужно взять данные из хранилища в момент события
- Для трансформации данных перед отправкой
- Для условной обработки через filter
- Для синхронизации нескольких источников данных
- Последовательная цепочка запуска юнитов

### Фильтрация данных (#sample-data-filtering)

Вам может потребоваться запустить цепочку вызова, при выполнение каких-то условий, для таких ситуаций метод `sample` позволяет фильтровать данные с помощью параметра `filter`:

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

При вызове `submitForm` мы берем данные из source, проверем в `filter` по условиям, если проверка прошла успешно, то возвращаем `true` и вызываем `target`, в ином случае `false` и ничего больше не делаем.

:::warning{title="Важная информация"}
Функции `fn` и `filter` **должны быть чистыми функциями**! Чистая функция - это функция, которая всегда возвращает один и тот же результат для одинаковых входных данных и не производит никаких побочных эффектов (не изменяет данные вне своей области видимости).
:::

### Трансформация данных (#sample-transform-data)

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

### Несколько источников данных (#sample-multiple-sources)

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

### Несколько источников вызова `sample` (#multiple-clocks-in-sample)

`sample` позволяет использовать массив событий в качестве `clock`, что очень удобно когда нам нужно обработать одинаковым образом несколько разных триггеров. Это помогает избежать дублирования кода и делает логику более централизованной.

```ts
import { createEvent, createStore, sample } from "effector";

// События для разных действий пользователя
const saveButtonClicked = createEvent();
const ctrlSPressed = createEvent();
const autoSaveTriggered = createEvent();

// Общее хранилище данных
const $formData = createStore({ text: "" });

// Эффект сохранения
const saveDocumentFx = createEffect((data: { text: string }) => {
  // Логика сохранения
});

// Единая точка сохранения документа, которая срабатывает от любого триггера
sample({
  // Все эти события будут вызывать сохранение
  clock: [saveButtonClicked, ctrlSPressed, autoSaveTriggered],
  source: $formData,
  target: saveDocumentFx,
});
```

<!-- todo add link to page about merge and add info block about sample using merge under the hood -->

### Массив `target` в sample (#multiple-targets-in-sample)

`sample` позволяет передавать массив юнитов в `target`, что полезно когда одни и те же данные нужно направить в несколько мест одновременно. В `target` можно передать массив любых юнитов - событий, эффектов или сторов.

```ts
import { createEvent, createStore, createEffect, sample } from "effector";

// Создаем юниты куда будут направляться данные
const userDataReceived = createEvent<User>();
const $lastUserData = createStore<User | null>(null);
const saveUserFx = createEffect<User, void>((user) => {
  // Сохраняем пользователя
});
const logUserFx = createEffect<User, void>((user) => {
  // Логируем действия с пользователем
});

const userUpdated = createEvent<User>();

// При обновлении пользователя:
// - Сохраняем данные через saveUserFx
// - Отправляем в систему логирования через logUserFx
// - Обновляем стор $lastUserData
// - Вызываем событие userDataReceived
sample({
  clock: userUpdated,
  target: [saveUserFx, logUserFx, $lastUserData, userDataReceived],
});
```

Важные моменты:

- Все юниты в target должны быть совместимы по типу с данными из `source`/`clock`
- Порядок выполнения целей гарантирован - они будут вызваны в порядке написания
- Можно комбинировать разные типы юнитов в массиве `target`

### Возвращаемое значение sample (#sample-return-value)

`sample` возвращает юнит, тип которого зависит от конфигурации:

#### С target (#sample-return-value-with-target)

Если указан `target`, `sample` вернёт этот же `target`:

```typescript
const $store = createStore(0);
const submitted = createEvent();
const sendData = createEvent<number>();

// result будет иметь тип EventCallable<number>
const result = sample({
  clock: submitted,
  source: $store,
  target: sendData,
});
```

#### Без target (#sample-return-value-without-target)

<!-- todo add link to Manage stores page about derived stores -->

Когда `target` не указан, то тип возвращаемого значения зависит от передаваемых параметров.<br/>
Если **НЕ** указан `filter`, а также `clock` и `source` **являются хранилищами**, то результат будет **производным [хранилищем](/ru/api/effector/Store)** с типом данных из `source`.<br/>

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

<!-- todo add link to Events page about derived events -->

В остальных же случаях возвращаемое значение будет **производным событием** с типом данных зависящий от `source`, которое нельзя вызвать самому, однако можно подписаться на него!

:::info{title="типизация sample"}
Метод `sample` полностью типизирован, и принимает тип в зависимости от передаваемых параметров!
:::

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

### Практический пример (#sample-example)

Давайте рассмотрим практический пример, когда при выборе id пользователя нам нужно проверить является ли он админом, сохранить выбранного пользователя в сторе, и на основе выбранного id создать производный стор с данными о пользователе

```ts
import { createStore, createEvent, sample } from "effector";

type User = {
  id: number;
  role: string;
};

const userSelected = createEvent<number>();

const $users = createStore<User[]>([]);

// Создаём производный стор, который будет хранить выбранного пользователя
const $selectedUser = sample({
  clock: userSelected,
  source: $users,
  fn: (users, id) => users.find((user) => user.id === id) || null,
});
// $selectedUser имеет тип Store<User | null>

// Создаём производное событие, которое будет срабатывать только для админов
// если выбранный пользователь админ, то событие сработает сразу
const adminSelected = sample({
  clock: userSelected,
  source: $users,
  // сработает только если пользователь найден и он админ
  filter: (users, id) => !!users.find((user) => user.id === id && user.role === "admin"),
  fn: (users, id) => users[id],
});
// adminSelected имеет тип Event<User>

userSelected(2);
```

[Полное API для `sample`](/ru/api/effector/sample)

## Attach: специализация эффектов (#attach)

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

[Полное API для `attach`](/ru/api/effector/attach)
