---
title: Effect
keywords:
  - effect
  - side-effect
  - unit
  - эффект
  - сайд-эффект
  - юнит
description: Effect, его методы и свойства
lang: ru
---

_Effect (эффект)_ это контейнер для сайд-эффектов, возможно асинхронных. В комплекте имеет ряд заранее созданных эвентов и сторов, облегчающих стандартные действия. Является [юнитом](/ru/explanation/glossary#common-unit)

Эффекты можно вызывать как обычные функции (_императивный вызов_) а также подключать их и их свойства в различные методы api включая [sample](/ru/api/effector/sample), [guard](/ru/api/effector/guard) и [split](/ru/api/effector/split) (_декларативное подключение_). При императивном вызове принимают максимум один аргумент и всегда возвращают промис, отражающий ход выполнения сайд-эффекта


# Методы {#effect-methods}

## `use(handler)` {#effect-use-handler}

Определяет имплементацию эффекта: функцию, которая будет вызвана при срабатывании. Используется для случаев когда имплементация не установлена [при создании](/ru/api/effector/createEffect) или когда требуется изменение поведения эффекта при тестировании

Если на момент вызова эффект уже имел имплементацию, то она будет заменена на новую

:::tip{title="статья от автора"}
[Testing api calls with effects and stores](https://www.patreon.com/posts/testing-api-with-32415095)
:::

:::info
Нужно предоставить имплементацию либо через use, либо через [createEffect](/ru/api/effector/createEffect), иначе при вызове эффекта возникнет ошибка "no handler used in _%effect name%_"
:::

### Формула {#effect-use-handler-formulae}

```ts
declare const fx: Effect<T, S>;

fx.use(/*handler*/ (params: T) => S | Promise<S>);
```

### Аргументы {#effect-use-handler-arguments}

1. **`handler`**: `(params: T) => S | Promise<S>`

   Функция-имплементация эффекта. Может быть как синхронной, так и асинхронной

   **Аргументы**

    1. **`params`**: Данные, с которыми был вызван эффект

   **Возвращает**

   Результат выполнения эффекта в виде значения, либо в виде промиса со значением

### Возвращает {#effect-use-handler-return}

Текущий эффект

:::info
Если значение имплементации известно сразу, то оптимальнее использовать `createEffect(handler)`

`createEffect().use(handler)` это антипаттерн, который ухудшает вывод типов
:::

### Пример {#effect-use-handler-example}

```js
import { createEffect } from "effector";

const fetchUserReposFx = createEffect();

// ....

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

## `use.getCurrent()` {#effect-use-getCurrent}

Метод для получения текущей имплементации эффекта. Используется для тестирования

Если у эффекта ещё не была установлена имплементация, то будет возвращена функция по умолчанию, при срабатывании она [выбрасывает ошибку](https://share.effector.dev/8PBjt3TL)

### Формула {#effect-getCurrent-formulae}

```ts
declare const fx: Effect<P, D>

fx.use.getCurrent()
-> (params: P) => D
```

### Возвращает {#effect-getCurrent-return}

Функцию-имплементацию эффекта, которая была установлена через [createEffect](/ru/api/effector/createEffect) или с помощью метода [use](#use)

### Пример {#effect-getCurrent-example}

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

## `watch(watcher)` {#effect-watch-watcher}

Вызывает дополнительную функцию с сайд-эффектами при каждом срабатывании эффекта

:::info
По мере усложнения логики проекта оптимальнее заменить на комбинацию дополнительного эффекта и [sample](/ru/api/effector/sample)
:::

### Формула {#effect-watch-watcher-formulae}

```ts
declare const fx: Effect<T, any>

fx.watch(/*watcher*/ (data: T) => any)
-> Subscription
```

### Аргументы {#effect-watch-watcher-arguments}

1. **`watcher`**: `(data: T) => any`

   Функция с сайд-эффектами, в качестве первого аргумента получает значение с которым был вызван эффект. Возвращаемое значение не используется

### Возвращает {#effect-watch-watcher-return}

[_Subscription_](/ru/explanation/glossary#subscription): Функция отмены подписки, после её вызова `watcher` перестаёт получать обновления и удаляется из памяти. Повторные вызовы функции отмены подписки не делают ничего

### Пример {#effect-watch-watcher-example}

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

## `prepend(fn)` {#effect-prepend-fn}

Создаёт событие-триггер для преобразования данных _перед_ запуском эффекта. По сравнению с [map](#map), работает в обратном направлении

### Формула {#effect-prepend-fn-formulae}

```ts
declare const fx: Effect<S, any>

const trigger = fx.prepend(/*fn*/(data: T) => S)
-> Event<T>
```

При вызове события `trigger`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего `fx` будет вызван с результатом вычислений

```

    trigger -> fn -> fx

```

### Аргументы {#effect-prepend-fn-arguments}

1.  **`fn`**: `(data: T) => S`

    Функция-обработчик, которая будет вычислять данные для передачи в `fx` на основе данных события `trigger`. [Должна быть **чистой**](/ru/explanation/glossary#purity)

    **Аргументы**

    - **`data`**: Данные с которыми сработало событие `trigger`

    **Возвращает**

    Данные для передачи в `fx`

### Возвращает {#effect-prepend-fn-return}

Новое событие


## `map(fn)` {#effect-map-fn}

Создает производное событие на основе данных эффекта

### Формула {#effect-map-fn-formulae}

```ts
declare const fxA: Effect<T, any>

const eventB = fxA.map(/*fn*/(data: T) => S)
-> Event<S>
```

При вызове `fxA`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего производное событие `eventB` будет вызвано с результатом вычислений

```

    fxA -> fn -> eventB

```

### Аргументы {#effect-map-fn-arguments}

1.  **`fn`**: `(data: T) => S`

    Функция-обработчик, которая будет вычислять данные для передачи в производное событие `eventB` на основе данных из `fxA`. [Должна быть **чистой**](/ru/explanation/glossary#purity)

    **Аргументы**

    - **`data`**: Данные с которыми сработал эффект `fxA`

    **Возвращает**

    Данные для передачи в производное событие `eventB`

### Возвращает {#effect-map-fn-return}

Новое, производное событие

### Пример {#effect-map-fn-example}

```js
import { createEffect } from "effector";

const updateUserFx = createEffect(({ name, role }) => {});
const userNameUpdate = updateUserFx.map(({ name }) => name);
const userRoleUpdate = updateUserFx.map(({ role }) => role.toUpperCase());

userNameUpdate.watch((name) => {
  console.log(`Началось изменение имени пользователя на ${name}`);
});
userRoleUpdate.watch((role) => {
  console.log(`Началось изменение роли пользователя на ${role}`);
});

await updateUserFx({ name: "john", role: "admin" });
// => Началось изменение имени пользователя на john
// => Началось изменение роли пользователя на ADMIN
```

[Запустить пример](https://share.effector.dev/4UFLTo5p)

# Свойства {#effect-properties}

## `done` {#effect-done}

[Событие](/ru/api/effector/Event), которое срабатывает с результатом выполнения эффекта и аргументом, переданным при вызове

### Формула {#effect-done-formulae}

```ts
declare const fx: Effect<P, D>

fx.done
-> Event<{params: P; result: D}>
```

:::info{title="Вызов вручную запрещён"}
Это свойство управляется самим эффектом
:::

### Пример {#effect-done-example}

```js
import { createEffect } from "effector";

const fx = createEffect((value) => value + 1);

fx.done.watch(({ params, result }) => {
  console.log("Вызов с аргументом", params, "завершён со значением", result);
});

await fx(2);
// => Вызов с аргументом 2 завершён со значением 3
```

[Запустить пример](https://share.effector.dev/tnSg24Ca)


## `doneData` {#effect-doneData}

[Событие](/ru/api/effector/Event), которое срабатывает с результатом выполнения эффекта

### Формула {#effect-doneData-formulae}

```ts
declare const fx: Effect<any, D>

fx.doneData
-> Event<D>
```

:::info{title="Вызов вручную запрещён"}
Это свойство управляется самим эффектом
:::

:::info
Добавлено в effector 20.12.0
:::

### Пример {#effect-doneData-example}

```js
import { createEffect } from "effector";

const fx = createEffect((value) => value + 1);

fx.doneData.watch((result) => {
  console.log(`Эффект успешно выполнился, вернув ${result}`);
});

await fx(2);
// => Эффект успешно выполнился, вернув 3
```

[Запустить пример](https://share.effector.dev/KexWC7GO)

## `fail` {#effect-fail}

[Событие](/ru/api/effector/Event), которое срабатывает с ошибкой, возникшей при выполнении эффекта и аргументом, переданным при вызове

### Формула {#effect-fail-formulae}

```ts
declare const fx: Effect<P, any, E>

fx.fail
-> Event<{params: P; error: E}>
```

:::info{title="Вызов вручную запрещён"}
Это свойство управляется самим эффектом
:::

### Пример {#effect-fail-example}

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

[Запустить пример](https://share.effector.dev/5xHVmzIJ)

## `failData` {#effect-failData}

:::info
Добавлено в effector 20.12.0
:::

[Событие](/ru/api/effector/Event), которое срабатывает с ошибкой, возникшей при выполнении эффекта

### Формула {#effect-failData-formulae}

```ts
declare const fx: Effect<any, any, E>

fx.failData
-> Event<E>
```

:::info{title="Вызов вручную запрещён"}
Это свойство управляется самим эффектом
:::

### Пример {#effect-failData-example}

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

[Запустить пример](https://share.effector.dev/i5ktYSqM)

## `finally` {#effect-finally}

:::info
Добавлено в effector 20.0.0
:::

[Событие](/ru/api/effector/Event), которое срабатывает при завершении эффекта с подробной информацией об аргументах, результатах и статусе выполнения

### Формула {#effect-finally-formulae}

```ts
declare const fx: Effect<P, D, E>

fx.finally
-> Event<
  | {status: 'done'; params: P; result: D}
  | {status: 'fail'; params: P; error: E}
>
```

:::info{title="Вызов вручную запрещён"}
Это свойство управляется самим эффектом
:::

### Пример {#effect-finally-example}

```js
import { createEffect } from "effector";

const fetchApiFx = createEffect(async ({ time, ok }) => {
  await new Promise((resolve) => setTimeout(resolve, time));
  if (ok) return `${time} ms`;
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
// => Вызов с аргументом {time: 100, ok: true}
//    завершён со значением 100 ms

fetchApiFx({ time: 100, ok: false });
// => Вызов с аргументом {time: 100, ok: false}
//    завершён с ошибкой 100 ms
```

[Запустить пример](https://share.effector.dev/Oqvy2x35)


## `pending` {#effect-pending}

[Стор](/ru/api/effector/Store), который показывает, что эффект находится в процессе выполнения

### Формула {#effect-pending-formulae}

```ts
declare const fx: Effect<any, any>

fx.pending
-> Store<boolean>
```

Это свойство избавляет от необходимости писать подобный код:

```js
import { createEffect, createStore } from "effector";

const requestFx = createEffect();

const $isRequestPending = createStore(false)
  .on(requestFx, () => true)
  .on(requestFx.done, () => false)
  .on(requestFx.fail, () => false);
```

:::info{title="Изменение значения вручную запрещено"}
Это свойство управляется самим эффектом
:::

### Пример {#effect-pending-example}

#### Отображение индикатора загрузки с React {#effect-pending-example-react}

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { createEffect } from "effector";
import { useStore } from "effector-react";

const fetchApiFx = createEffect(async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
});

fetchApiFx.pending.watch(console.log);
// => false

const App = () => {
  const loading = useStore(fetchApiFx.pending);
  return <div>{loading ? "Загрузка..." : "Загрузка завершена"}</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));

fetchApiFx(1000);
// => true
// => false
```

[Запустить пример](https://share.effector.dev/e9y5uETf)

## `inFlight` {#effect-inFlight}

:::info
Добавлено в effector 20.11.0
:::

[Стор](/ru/api/effector/Store), который показывает число запущенных эффектов, которые находятся в процессе выполнения. Используется для ограничения числа одновременных запросов

### Формула {#effect-inFlight-formulae}

```ts
declare const fx: Effect<any, any>

fx.inFlight
-> Store<number>
```

Это свойство избавляет от необходимости писать подобный код:

```js
import { createEffect, createStore } from "effector";

const requestFx = createEffect();

const $requestsInFlight = createStore(0)
  .on(requestFx, (n) => n + 1)
  .on(requestFx.done, (n) => n - 1)
  .on(requestFx.fail, (n) => n - 1);
```

:::info{title="Изменение значения вручную запрещено"}
Это свойство управляется самим эффектом
:::

### Пример {#effect-inFlight-example}

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

[Запустить пример](https://share.effector.dev/ADD0M4NV)

## `shortName` {#effect-shortName}

Имя эффекта. Задаётся либо явно, через поле `name` в [createEffect](/ru/api/effector/createEffect), либо автоматически через [babel plugin](/ru/api/effector/babel-plugin). Используется для обработки сущностей программно, например при использовании [хуков домена](/ru/api/effector/Domain#onCreateEffect)

### Формула {#effect-shortName-formulae}

```ts
declare const fx: Effect<any, any>

fx.shortName
-> string
```

## `sid` {#effect-sid}

Стабильный идентификатор эффекта. Задаётся автоматически через [Babel plugin](/ru/api/effector/babel-plugin)

### Формула {#effect-sid-formulae}

```ts
declare const fx: Effect<any, any>

fx.sid
-> string | null
```