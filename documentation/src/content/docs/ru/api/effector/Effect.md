---
title: Effect API
keywords:
  - effect
  - side-effect
  - unit
  - эффект
  - сайд-эффект
  - юнит
description: Эффект API, методы, свойства и их описание
lang: ru
---

[eventTypes]: /ru/api/effector/Event#event-types
[storeTypes]: /ru/essentials/typescript#store-types

# Effect API (#effect-api)

```ts
import { type Effect, createEffect } from "effector";

const effectFx = createEffect();
```

Эффект – это контейнер для сайд-эффектов, как синхронных, так и асинхронных. В комплекте имеет ряд заранее созданных [событий](/ru/api/effector/Event) и [сторов](/ru/api/effector/Store), облегчающих стандартные действия. Является [юнитом](/ru/explanation/glossary#common-unit).

Эффекты можно вызывать как обычные функции (_императивный вызов_) а также подключать их и их свойства в различные методы api включая [sample](/ru/api/effector/sample), и [split](/ru/api/effector/split) (_декларативное подключение_).

:::tip{title="эффективный эффект"}
Если вы не знакомы с эффектами и способами работы с ними, то вам сюда [Асинхронность в effector с помощью эффектов](/ru/essentials/work-with-async).
:::

## Интерфейс Effect (#effect-interface)

Доступные методы и свойства событий:
| <div style="width:170px">Метод/Свойство</div> | Описание |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`use(handler)`](#use-method) | Заменяет обработчик эффекта на новую функцию `handler`. |
| [`use.getCurrent()`](#use-getCurrent-method) | Возвращает текущий обработчик эффекта. |
| [`watch(watcher)`](#watch-method) | Добавляет слушатель, вызывающий `watcher` при каждом вызове эффекта. |
| [`map(fn)`](#map-method) | Создаёт новое [производное событие][eventTypes], срабатывает при вызове эффекта с результатом вызова `fn` для параметров эффекта. |
| [`prepend(fn)`](#prepend-method) | Создаёт новое [событие][eventTypes] , трансформирующее входные данные через `fn` перед вызовом эффекта. |
| [`filterMap(fn)`](#filterMap-method) | Создаёт новое [производное событие][eventTypes], срабатывает при вызове эффекта с результатом `fn`, если тот не вернул `undefined`. |
| [`done`](#done-property) | [Производное событие][eventTypes] `Event<{Params, Done}>`, срабатывающее при успешном завершении эффекта. |
| [`doneData`](#doneData-property) | [Производное событие][eventTypes] `Event<Done>` с результатом успешного выполнения эффекта. |
| [`fail`](#fail-property) | [Производное событие][eventTypes] `Event<{Params, Fail}>`, срабатывающее при ошибке выполнения эффекта. |
| [`failData`](#failData-property) | [Производное событие][eventTypes] `Event<Fail>` с данными ошибки эффекта. |
| [`finally`](#finally-property) | [Производное событие][eventTypes] `Event<{Params, status, Done?, Fail?}>`, срабатывающее при любом завершении эффекта. |
| [`pending`](#pending-property) | [Производный стор][storeTypes] `Store<boolean>` со статусом выполнения эффекта (`true` во время выполнения). |
| [`inFlight`](#inFlight-property) | [Производный стор][storeTypes] `Store<number>` с количеством активных вызовов эффекта. |
| [`sid`](#sid-property) | Уникальный идентификатор [юнита](/ru/explanation/glossary#common-unit). |
| [`shortName`](#shortName-property) | Свойство типа `string`, содержащее имя переменной, в которой объявлен эффект. |
| [`compositeName`](#compositeName-property) | Комплексное имя эффекта (включая домен и короткое имя) — удобно для логирования и трассировки. |

## Особенности эффекта (#effect-peculiarities)

1. При императивном вызове всегда возвращают промис, отражающий ход выполнения сайд-эффекта.
2. Эффекты принимают только один аргумент, [как и события](/ru/api/effector/Event#event-peculiarities).
3. Имеют встроенные сторы ([`pending`](#pending-property), [`inFlight`](#inFlight-property)) и события ([`done`](#done-property), [`fail`](#fail-property), [`finally`](#finally-property) и др.) для удобства работы.

## Методы эффектов (#effect-methods)

### `.use(handler)` (#use-method)

:::warning{title="use - это антипаттерн"}
Если значение имплементации известно сразу, то оптимальнее использовать `createEffect(handler)`.

Метод `use(handler)` – это антипаттерн, который ухудшает вывод типов.
:::

Определяет имплементацию эффекта: функцию, которая будет вызвана при срабатывании. Используется для случаев когда имплементация не установлена [при создании](/ru/api/effector/createEffect) или когда требуется изменение поведения эффекта при тестировании.<br/>
Принимает аргумент `params`, который является данные, с которыми был вызван эффект.

:::info{title="use в приоритете"}
Если на момент вызова эффект уже имел имплементацию, то она будет заменена на новую.
:::

- **Формула**

```ts
const fx: Effect<Params, Done>;
fx.use(handler);
```

- **Тип**

```ts
effect.use(handler: (params: Params) => Promise<Done> | Done): Effect<
  Params,
  Done,
  Fail
>
```

- **Примеры**

```js
import { createEffect } from "effector";

const fetchUserReposFx = createEffect();

fetchUserReposFx.use(async ({ name }) => {
  console.log("fetchUserReposFx вызван для github пользователя", name);

  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

await fetchUserReposFx({ name: "zerobias" });
// => fetchUserReposFx вызван для github пользователя zerobias
```

[Запустить пример](https://share.effector.dev/Vp8tPzBh)

- **Возвращаемое значение**

Возвращает текущий эффект.

---

### `.use.getCurrent()` (#use-getCurrent-method)

Метод для получения текущей имплементации эффекта. Используется для тестирования.

Если у эффекта ещё не была установлена имплементация, то будет возвращена функция по умолчанию, при срабатывании она [выбрасывает ошибку](https://share.effector.dev/8PBjt3TL).

- **Формула**

```ts
const fx: Effect<Params, Done>;
const handler = fx.use.getCurrent();
```

- **Тип**

```ts
effect.use.getCurrent(): (params: Params) => Promise<Done>
```

- **Примеры**

```js
const handlerA = () => "A";
const handlerB = () => "B";

const fx = createEffect(handlerA);

console.log(fx.use.getCurrent() === handlerA);
// => true

fx.use(handlerB);
console.log(fx.use.getCurrent() === handlerB);
// => true
```

[Запустить пример](https://share.effector.dev/CM6hgtOM)

- **Возвращаемое значение**

Возвращает функцию-имплементацию эффекта, которая была установлена через [createEffect](/ru/api/effector/createEffect) или с помощью метода [use](#use-method).

---

### `.watch(watcher)` (#watch-method)

Вызывает дополнительную функцию с сайд-эффектами при каждом срабатывании эффекта. Не стоит использовать для логики, лучше заменить на [`sample`](/ru/api/effector/sample).

- **Формула**

```ts
const fx: Effect<Params, Done>;
const unwatch = fx.watch(watcher);
```

- **Тип**

```ts
effect.watch(watcher: (payload: Params) => any): Subscription
```

- **Примеры**

```js
import { createEffect } from "effector";

const fx = createEffect((params) => params);

fx.watch((params) => {
  console.log("эффект вызван с аргументом", params);
});

await fx(10);
// => эффект вызван с аргументом 10
```

[Запустить пример](https://share.effector.dev/iNb7YIdV)

- **Возвращаемое значение**

[Функция отмены подписки](/ru/explanation/glossary#subscription), после её вызова `watcher` перестаёт получать обновления и удаляется из памяти.

---

### `.map(fn)` (#map-method)

Метод `map` создает [производное событие][eventTypes]. Событие вызывается в момент выполнения эффекта, с теми же аргументами, что и у эффекта, и результатом, возвращаемым функцией `fn`. Работает по аналогии с [`Event.map(fn)`](/ru/api/effector/Event#event-methods-map-fn).

- **Формула**

```ts
const fx: Effect<Params, Done>;
const eventB = fx.map(fn);
```

- **Тип**

```ts
effect.map<T>(fn: (params: Params) => T): Event<T>
```

- **Примеры**

```ts
import { createEffect } from "effector";

interface User {
  // ...
}

const saveUserFx = createEffect(async ({ id, name, email }: User) => {
  // ...
  return response.json();
});

const userNameSaving = saveUserFx.map(({ name }) => {
  console.log("Начинаем сохранение пользователя: ", name);
  return name;
});

const savingNotification = saveUserFx.map(({ name, email }) => {
  console.log("Оповещение о сохранении");
  return `Сохранение пользователя: ${name} (${email})`;
});

// При вызове эффекта сработают оба производных события
await saveUserFx({ id: 1, name: "Иван", email: "ivan@example.com" });
// => Начинаем сохранение пользователя: Иван
// => Сохранение пользователя: Иван (ivan@example.com)
```

[Запустить пример](https://share.effector.dev/4UFLTo5p)

- **Возвращаемое значение**

Возвращает новое [производное событие][eventTypes].

---

### `.prepend(fn)` (#prepend-method)

Создаёт новое событие для преобразования данных _перед_ запуском эффекта. По сравнению с [map](#effect-methods-map), работает в обратном направлении. Работает по аналогии с [`Event.prepend(fn)`](/ru/api/effector/Event#eventCallable-methods-prepend-fn).

- **Формула**

```ts
const fx: Effect<Params, Done>;
const trigger = fx.prepend(fn);
```

- **Тип**

```ts
effect.prepend<Before>(fn: (_: Before) => Params): EventCallable<Before>
```

- **Примеры**

```js
import { createEffect } from "effector";

const saveFx = createEffect(async (data) => {
  console.log('saveFx вызван с: 'data)
  await api.save(data);
});

// создаем событие-триггер для эффекта
const saveForm = saveFx.prepend((form) => ({
  ...form,
  modified: true
}));

saveForm({ name: "John", email: "john@example.com" });
// => saveFx вызван с : { name: "John", email: "john@example.com", modified: true }
```

- **Возвращаемое значение**

Возвращает новое [событие][eventTypes].

---

### `.filterMap(fn)` (#filterMap-method)

Метод `filterMap` создаёт [производное событие][eventTypes]. Вычисление функции `fn` запускается одновременно с эффектом, однако если функция возвращает `undefined`, событие не срабатывает. Работает аналогично методу [`.map(fn)`](#map-method), но с фильтрацией по возвращаемому значению.

- **Формула**

```ts
const fx: Effect<Params, Done>;
const filtered = fx.filterMap(fn);
```

- **Тип**

```ts
effect.filterMap<T>(fn: (payload: Params) => T | undefined): Event<T>
```

- **Примеры**

```ts
import { createEffect } from "effector";

const validateAndSaveFx = createEffect(async (userData) => {
  if (!userData.isValid) {
    throw new Error("Invalid data");
  }

  return await saveToDatabase(userData);
});

// Создаем событие только для валидных данных
const validDataProcessing = validateAndSaveFx.filterMap((userData) => {
  if (userData.isValid && userData.priority === "high") {
    return {
      id: userData.id,
      timestamp: Date.now(),
    };
  }
  // Если данные не валидны или приоритет не высокий, событие не сработает
});

validDataProcessing.watch(({ id, timestamp }) => {
  console.log(`Обработка высокоприоритетных данных ID: ${id} в ${timestamp}`);
});

// Примеры вызовов
await validateAndSaveFx({
  id: 1,
  isValid: true,
  priority: "high",
  role: "user",
});
// => Обработка высокоприоритетных данных ID: 1 в 1703123456789
```

- **Возвращаемое значение**

Возвращает новое [производное событие][eventTypes].

## Свойства эффектов (#effect-properties)

### `.done` (#done-property)

[Производное событие][eventTypes], которое срабатывает с результатом выполнения эффекта и аргументом, переданным при вызове.

- **Тип**

```ts
interface Effect<Params, Done> {
  done: Event<{ params: Params; result: Done }>;
}
```

- **Примеры**

```js
import { createEffect } from "effector";

const fx = createEffect((value) => value + 1);

fx.done.watch(({ params, result }) => {
  console.log("Вызов с аргументом", params, "завершён со значением", result);
});

await fx(2);
// => Вызов с аргументом 2 завершён со значением 3
```

[Запустить пример](https://share.effector.dev/tnSg24Ca).

---

### `.doneData` (#doneData-property)

[Производное событие][eventTypes], которое срабатывает с результатом успешного выполнения эффекта.

- **Тип**

```ts
interface Effect<any, Done> {
  doneData: Event<Done>;
}
```

- **Примеры**

```js
import { createEffect } from "effector";

const fx = createEffect((value) => value + 1);

fx.doneData.watch((result) => {
  console.log(`Эффект успешно выполнился, вернув ${result}`);
});

await fx(2);
// => Эффект успешно выполнился, вернув 3
```

[Запустить пример](https://share.effector.dev/KexWC7GO).

---

### `.fail` (#fail-property)

[Производное событие][eventTypes], которое срабатывает с ошибкой, возникшей при выполнении эффекта и аргументом, переданным при вызове.

- **Тип**

```ts
interface Effect<Params, any, Fail> {
  fail: Event<{ params: Params; error: Fail }>;
}
```

- **Примеры**

```js
import { createEffect } from "effector";

const fx = createEffect(async (value) => {
  throw Error(value - 1);
});

fx.fail.watch(({ params, error }) => {
  console.log("Вызов с аргументом", params, "завершился с ошибкой", error.message);
});

fx(2);
// => Вызов с аргументом 2 завершился с ошибкой 1
```

[Запустить пример](https://share.effector.dev/5xHVmzIJ).

---

### `.failData` (#failData-property)

[Производное событие][eventTypes], которое срабатывает с ошибкой, возникшей при выполнении эффекта.

- **Тип**

```ts
interface Effect<any, any, Fail> {
  failData: Event<Fail>;
}
```

- **Примеры**

```js
import { createEffect } from "effector";

const fx = createEffect(async (value) => {
  throw Error(value - 1);
});

fx.failData.watch((error) => {
  console.log(`Вызов завершился с ошибкой ${error.message}`);
});

fx(2);
// => Вызов завершился с ошибкой 1
```

[Запустить пример](https://share.effector.dev/i5ktYSqM).

---

### `.finally` (#finally-property)

[Производное событие][eventTypes], которое срабатывает как при успехе, так и в случае ошибки завершении эффекта с подробной информацией об аргументах, результатах и статусе выполнения.

- **Тип**

```ts
interface Effect<Params, Done, Fail> {
  finally: Event<
    | {
        status: "done";
        params: Params;
        result: Done;
      }
    | {
        status: "fail";
        params: Params;
        error: Fail;
      }
  >;
}
```

- **Примеры**

```js
import { createEffect } from "effector";

const fetchApiFx = createEffect(async ({ time, ok }) => {
  await new Promise((resolve) => setTimeout(resolve, time));

  if (ok) {
    return `${time} ms`;
  }

  throw Error(`${time} ms`);
});

fetchApiFx.finally.watch((value) => {
  switch (value.status) {
    case "done":
      console.log("Вызов с аргументом", value.params, "завершён со значением", value.result);
      break;
    case "fail":
      console.log("Вызов с аргументом", value.params, "завершён с ошибкой", value.error.message);
      break;
  }
});

await fetchApiFx({ time: 100, ok: true });
// => Вызов с аргументом {time: 100, ok: true} завершён со значением 100 ms

fetchApiFx({ time: 100, ok: false });
// => Вызов с аргументом {time: 100, ok: false} завершён с ошибкой 100 ms
```

[Запустить пример](https://share.effector.dev/Oqvy2x35).

---

### `.pending` (#pending-property)

[Производный стор][storeTypes], который показывает, что эффект находится в процессе выполнения.

- **Тип**

```ts
interface Effect<any, any> {
  pending: Store<boolean>;
}
```

- **Детальное описание**

Это свойство избавляет от необходимости писать подобный код:

```js
const $isRequestPending = createStore(false)
  .on(requestFx, () => true)
  .on(requestFx.done, () => false)
  .on(requestFx.fail, () => false);
```

- **Примеры**

```jsx
import React from "react";
import { createEffect } from "effector";
import { useUnit } from "effector-react";

const fetchApiFx = createEffect(async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
});

fetchApiFx.pending.watch(console.log);
// => false

const App = () => {
  const loading = useUnit(fetchApiFx.pending);
  return <div>{loading ? "Загрузка..." : "Загрузка завершена"}</div>;
};

fetchApiFx(1000);
// => true
// => false
```

[Запустить пример](https://share.effector.dev/YX24VysD).

---

### `.inFlight` (#inFlight-property)

[Производный стор][storeTypes], который показывает число запущенных эффектов, которые находятся в процессе выполнения. Может использоваться для ограничения числа одновременных запросов.

- **Тип**

```ts
interface Effect<any, any> {
  inFlight: Store<number>;
}
```

- **Детальное описание**

Это свойство избавляет от необходимости писать подобный код:

```js
const $requestsInFlight = createStore(0)
  .on(requestFx, (n) => n + 1)
  .on(requestFx.done, (n) => n - 1)
  .on(requestFx.fail, (n) => n - 1);
```

- **Примеры**

```js
import { createEffect } from "effector";

const fx = createEffect(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
});

fx.inFlight.watch((amount) => {
  console.log("выполняется запросов:", amount);
});
// => выполняется запросов: 0

const req1 = fx();
// => выполняется запросов: 1

const req2 = fx();
// => выполняется запросов: 2

await Promise.all([req1, req2]);

// => выполняется запросов: 1
// => выполняется запросов: 0
```

[Запустить пример](https://share.effector.dev/ADD0M4NV).

---

### `.sid` (#sid-property)

Уникальный идентификатор юнита. Важно отметить, что SID не изменяется при каждом запуске приложения, он статически записывается в пакет вашего приложения для абсолютной идентификации юнитов. Задаётся автоматически через [Babel plugin](/ru/api/effector/babel-plugin).

- **Тип**

```ts
interface Effect<any, any> {
  sid: string | null;
}
```

---

### `.shortName` (#shortName-property)

Свойство типа `string`, содержащее имя переменной, в которой объявлен эффект. Имя эффекта. Задаётся либо явно, через поле `name` в [createEffect](/ru/api/effector/createEffect), либо автоматически через [babel plugin](/ru/api/effector/babel-plugin).

- **Тип**

```ts
interface Effect<any, any> {
  shortName: string;
}
```

---

### `.compositeName` (#compositeName-property)

Комплексное имя эффекта (включая домен и короткое имя) — удобно для логирования и трассировки.

- **Тип**

```ts
interface Effect<any, any> {
  compositeName: {
    shortName: string;
    fullName: string;
    path: Array<string>;
  };
}
```

- **Примеры**

```ts
import { createEffect, createDomain } from "effector";

const first = createEffect();
const domain = createDomain();
const second = domain.createEffect();

console.log(first.compositeName);
// {
//     "shortName": "first",
//     "fullName": "first",
//     "path": [
//         "first"
//      ]
// }

console.log(second.compositeName);
// {
//     "shortName": "second",
//     "fullName": "domain/second",
//     "path": [
//         "domain",
//         "second"
//      ]
// }
```

## Связанные API и статьи (#related-api-and-docs-to-effect)

- **API**
  - [`createEffect`](/ru/api/effector/createEffect) - Создание нового эффекта
  - [`Event API`](/ru/api/effector/Event) - Описание событий, его методов и свойств
  - [`Store API`](/ru/api/effector/Store) - Описание сторов, его методов и свойств
  - [`sample`](/ru/api/effector/sample) - Ключевой оператор для построения связей между юнитами
  - [`attach`](/ru/api/effector/attach) - Создает новые эффекты на основе других эффектов
- **Статьи**
  - [Работа с эффектами](/ru/essentials/work-with-async)
  - [Как типизировать эффекты и не только](/ru/essentials/typescript)
  - [Гайд по тестированию эффектов и других юнитов](/ru/guides/testing)
