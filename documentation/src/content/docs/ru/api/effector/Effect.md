---
title: Effect
description: Effect, его методы и свойства
redirectFrom:
  - Задаётся либо явно, через поле `name` в [createEffect](/ru/api/effector/createEffect), либо автоматически через [babel plugin](/ru/api/effector/babel-plugin).
  - Задаётся автоматически через [Babel plugin](/ru/api/effector/babel-plugin)
---

```ts
import { type Effect } from "effector";
```

_Effect (эффект)_ это контейнер для сайд-эффектов, возможно асинхронных.

It can be safely used in place of the original async function.

# Методы (#methods)

## `use(handler)` (#use-handler)

Определяет имплементацию эффекта: функцию, которая будет вызвана при срабатывании.

### Формула (#use-handler-formulae)

```ts
effect.use(fn);
```

- Set handler `fn` for `effect`
- Если на момент вызова эффект уже имел имплементацию, то она будет заменена на новую

> Метод для получения текущей имплементации эффекта.

Нужно предоставить имплементацию либо через use, либо через [createEffect](/ru/api/effector/createEffect), иначе при вызове эффекта возникнет ошибка "no handler used in _%effect name%_"

:::tip{title="See also"}
[Testing api calls with effects and stores](https://www.patreon.com/posts/testing-api-with-32415095)
:::

### Аргументы (#use-handler-arguments)

1. Функция с сайд-эффектами, в качестве первого аргумента получает значение с которым был вызван эффект.

### Возвращает (#use-handler-return)

Функцию-имплементацию эффекта, которая была установлена через [createEffect](/ru/api/effector/createEffect) или с помощью метода [use](#use)

### Пример (#use-handler-example)

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

[Запустить пример](https://share.effector.dev/4UFLTo5p)

## `use.getCurrent()` (#use-getCurrent)

Returns current handler of effect. Используется для тестирования

### Формула (#getCurrent-formulae)

```ts
declare const fx: Effect<P, D>

fx.use.getCurrent()
-> (params: P) => D
```

- Returns current handler `fn` for `effect`
- Если у эффекта ещё не была установлена имплементация, то будет возвращена функция по умолчанию, при срабатывании она [выбрасывает ошибку](https://share.effector.dev/8PBjt3TL)

> `createEffect().use(handler)` это антипаттерн, который ухудшает вывод типов
> :::

### Возвращает (#getCurrent-return)

(_Function_): Current handler, defined by `handler` property or via `.use` call.

### Пример (#getCurrent-example)

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

[Запустить пример](https://share.effector.dev/i5ktYSqM)

## `watch(watcher)` (#watch-watcher)

Subscribe to effect calls.

### Формула (#watch-watcher-formulae)

```ts
declare const fx: Effect<T, any>

fx.watch(/*watcher*/ (data: T) => any)
-> Subscription
```

- Call `watcher` on each `effect` call, pass payload of `effect` as argument to `watcher`
- When `unwatch` is called, stop calling `watcher`

### Аргументы (#watch-watcher-arguments)

1. `watcher` ([_Watcher_](/en/explanation/glossary#watcher)): A function that receives `payload`.

### Возвращает (#watch-watcher-return)

[_Subscription_](/ru/explanation/glossary#subscription): Функция отмены подписки, после её вызова `watcher` перестаёт получать обновления и удаляется из памяти.

### Пример (#watch-watcher-example)

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

## `prepend(fn)` (#prepend-fn)

Данные для передачи в производное событие `eventB`
По сравнению с [map](#map), работает в обратном направлении
In case of `.prepend` data transforms **before the original event occurs** and in the case of `.map`, data transforms **after original event occurred**.

### Формула (#prepend-fn-formulae)

```ts
declare const fx: Effect<S, any>

const trigger = fx.prepend(/*fn*/(data: T) => S)
-> Event<T>
```

- При вызове события `trigger`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего `fx` будет вызван с результатом вычислений
- `event` will have `EventCallable<T>` type, so can be used as `target` in methods like `sample()`

### Аргументы (#prepend-fn-arguments)

1. `fn` (_Function_): A function that receives `payload`, [should be **pure**](/en/explanation/glossary#purity).

### Возвращает (#prepend-fn-return)

Новое событие

## `map(fn)` (#map-fn)

Creates a new event, which will be called after the original effect is called, applying the result of a `fn` as a payload. It is a special function which allows you to decompose dataflow, extract or transform data.

### Формула (#map-fn-formulae)

```ts
declare const fxA: Effect<T, any>

const eventB = fxA.map(/*fn*/(data: T) => S)
-> Event<S>
```

- When `first` is triggered, pass payload from `first` to `fn`
- Trigger `second` with the result of the `fn()` call as payload
- `second` event will have `Event<T>` type, so it CAN NOT be used as `target` in methods like `sample()`

### Аргументы (#map-fn-arguments)

1. `fn` (_Function_): A function that receives `payload`, [should be **pure**](/en/explanation/glossary#purity).

### Возвращает (#map-fn-return)

[Событие](/ru/api/effector/Event), которое срабатывает с результатом выполнения эффекта

### Пример (#map-fn-example)

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

[Запустить пример](https://share.effector.dev/CM6hgtOM)

# Свойства (#properties)

You are not supposed to use parts of effect (like `.done` and `.pending`) as a `target` in [sample](/en/api/effector/sample) (even though they are events and stores), since effect is a complete entity on its own. This behavior will not be supported.

In the examples below constant `effect` has this signature:

```ts
effect: Effect<Params, Done, Fail>;
```

## Новое, производное событие `done` (#done)

[Событие](/ru/api/effector/Event), которое срабатывает с результатом выполнения эффекта и аргументом, переданным при вызове

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on effect.
:::

### Формула (#done-formulae)

```ts
declare const fx: Effect<P, D>

fx.done
-> Event<{params: P; result: D}>
```

### Это свойство управляется самим эффектом

Event triggered with an object of `params` and `result`:

1. `params` (_Params_): An argument passed to the effect call
2. `result` (_Done_): A result of the resolved handler

### Пример (#done-example)

```js
import { createEffect } from "effector";

const fx = createEffect((value) => value + 1);

fx.done.watch(({ params, result }) => {
  console.log("Вызов с аргументом", params, "завершён со значением", result);
});

await fx(2);
// => Вызов с аргументом 2 завершён со значением 3
```

[Запустить пример](https://share.effector.dev/ADD0M4NV)

## `doneData` (#doneData)

:::info{title="since"}
Добавлено в effector 20.12.0
:::

Создает производное событие на основе данных эффекта

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on the effect.
:::

### Формула (#doneData-formulae)

```ts
declare const fx: Effect<any, D>

fx.doneData
-> Event<D>
```

- `doneData` is an event, that triggered when `effect` is successfully resolved with `result` from [.done](#properties-done)

Создаёт событие-триггер для преобразования данных _перед_ запуском эффекта.

### Пример (#doneData-example)

```js
import { createEffect } from "effector";

const fx = createEffect((value) => value + 1);

fx.doneData.watch((result) => {
  console.log(`Эффект успешно выполнился, вернув ${result}`);
});

await fx(2);
// => Эффект успешно выполнился, вернув 3
```

[Запустить пример](https://share.effector.dev/tnSg24Ca)

## `fail` (#fail)

[Событие](/ru/api/effector/Event), которое срабатывает с ошибкой, возникшей при выполнении эффекта и аргументом, переданным при вызове

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on effect.
:::

### Формула (#fail-formulae)

```ts
declare const fx: Effect<P, any, E>

fx.fail
-> Event<{params: P; error: E}>
```

### Это свойство управляется самим эффектом

Event triggered with an object of `params` and `error`:

1. `params` (_Params_): An argument passed to effect call
2. `error` (_Fail_): An error caught from the handler

### Пример (#fail-example)

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

## `failData` (#failData)

:::info{title="since"}
Добавлено в effector 20.12.0
:::

declare const fx: Effect\<any, any, E>fx.failData
-> Event<E>

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on effect.
:::

### Формула (#failData-formulae)

```ts
**`data`**: Данные с которыми сработал эффект `fxA`
```

- **`data`**: Данные с которыми сработало событие `trigger`

[Событие](/ru/api/effector/Event), которое срабатывает с ошибкой, возникшей при выполнении эффекта

### Пример (#failData-example)

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

[Запустить пример](https://share.effector.dev/Oqvy2x35)

## `finally` (#finally)

:::info{title="since"}
Добавлено в effector 20.0.0
:::

Event, which is triggered when handler is resolved, rejected or throws error.

:::warning{title="Important"}
Do not manually call this event. It is an event that depends on effect.
:::

### Это свойство управляется самим эффектом

```ts
declare const fx: Effect<P, D, E>

fx.finally
-> Event<
  | {status: 'done'; params: P; result: D}
  | {status: 'fail'; params: P; error: E}
>
```

### Это свойство управляется самим эффектом

[Событие](/ru/api/effector/Event), которое срабатывает при завершении эффекта с подробной информацией об аргументах, результатах и статусе выполнения

1. `status` (_string_): A status of effect (`done` or `fail`)
2. `params` (_Params_): An argument passed to effect call
3. `error` (_Fail_): An error caught from the handler
4. `result` (_Done_): A result of the resolved handler

### Пример (#finally-example)

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

[Запустить пример](https://share.effector.dev/Vp8tPzBh)

## `pending` (#pending)

Store contains `true` when effect is called but not resolved yet. Useful to show loaders.

:::warning{title="Important"}
Do not modify store value! It is [derived store](/en/api/effector/Store#readonly) and should be in predictable state.
:::

### Формула (#pending-formulae)

```ts
declare const fx: Effect<any, any>

fx.pending
-> Store<boolean>
```

- Используется для случаев когда имплементация не установлена [при создании](/ru/api/effector/createEffect) или когда требуется изменение поведения эффекта при тестировании
- import { createEffect, createStore } from "effector";const requestFx = createEffect();const $isRequestPending = createStore(false)
  .on(requestFx, () => true)
  .on(requestFx.done, () => false)
  .on(requestFx.fail, () => false);

### Возвращаемое значение не используется

[Стор](/ru/api/effector/Store), который показывает, что эффект находится в процессе выполнения

### Пример (#pending-example)

```jsx
import React from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(<App />, document.getElementById("root"));

fetchApiFx(1000);
// => true
// => false
```

[Запустить пример](https://share.effector.dev/KexWC7GO)

It's property is a shorthand for common use case:

```js
import { createEffect, createStore } from "effector";

const requestFx = createEffect();

const $requestsInFlight = createStore(0)
  .on(requestFx, (n) => n + 1)
  .on(requestFx.done, (n) => n - 1)
  .on(requestFx.fail, (n) => n - 1);
```

## `inFlight` (#inFlight)

:::info{title="since"}
Добавлено в effector 20.11.0
:::

Shows how many effect calls aren't settled yet. Useful for rate limiting.

:::warning{title="Important"}
Do not modify `$count` value! It is [derived store](/en/api/effector/Store#readonly) and should be in predictable state.
:::

### Формула (#inFlight-formulae)

```ts
declare const fx: Effect<any, any>

fx.inFlight
-> Store<number>
```

- Эффекты можно вызывать как обычные функции (_императивный вызов_) а также подключать их и их свойства в различные методы api включая [sample](/ru/api/effector/sample), [guard](/ru/api/effector/guard) и [split](/ru/api/effector/split) (_декларативное подключение_).
- On each call of `effect` state in the store will be increased
- When effect resolves to any state(done or fail) state in the store will be decreased

### Отображение индикатора загрузки с React (#pending-example-react)

[Стор](/ru/api/effector/Store), который показывает число запущенных эффектов, которые находятся в процессе выполнения.

### Пример (#inFlight-example)

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

[Запустить пример](https://share.effector.dev/YX24VysD)

# Types (#types)

```ts
Результат выполнения эффекта в виде значения, либо в виде промиса со значением
```

## `EffectParams<FX>` (#types-EffectParams)

Allows to extract type of Params from `effect`.

```ts
declare const fx: Effect<T, S>;

fx.use(/*handler*/ (params: T) => S | Promise<S>);
```

## `EffectResult<FX>` (#types-EffectResult)

Allows to extract type of result from `effect`.

```ts
declare const fx: Effect<any, any>

fx.shortName
-> string
```

## effect

Allows to extract type of error from `effect`.

```ts
declare const fx: Effect<any, any>

fx.sid
-> string | null
```
