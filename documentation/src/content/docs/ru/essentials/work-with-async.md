---
title: Асинхронность в effector
description: Как эффекты помогают работать с асинхронностью в effector
---

# Асинхронность в effector с помощью эффектов (#async-operation-with-effects)

Асинхронность — это базовая часть любого современного приложения, и Effector предоставляет удобные инструменты для её обработки. С помощью эффектов ([createEffect](/ru/api/effector.createEffect)) можно построить предсказуемую логику работы с асинхронными данными.

:::tip{title="Наименование эффектов"}
Команда Effector рекомендует использовать `Fx` постфикс для названия эффектов, это не является обязательным требованием, а рекомендацией к использованию, [читать более подробно](/ru/extra/conventions).
:::

## Что такое эффекты? (#what-are-effects)

Эффекты ([createEffect](/ru/api/effector.createEffect)) — это инструмент Effector для работы с внешними api, или для сторонних эффектов вашего приложения, например:

- асинхронные запросы на сервер
- работа с `localStorage`/`indexedDB`
- Любые операции, которые могут либо выполниться либо выкинуть ошибку, или выполняться какое-то время

:::tip{title="полезно знать"}
Эффект может быть как асинхронный, так и синхронный.
:::

## Основные состояния эффектов (#main-effect-states)

Effector автоматически отслеживает состояние выполнения эффекта:

- `pending` — является [стором](/ru/api/effector/Store) указывает, выполняется ли эффект, полезно для отображения загрузки.
- `done` — является [событием](/ru/api/effector/Event), срабатывает при успешном завершении.
- `fail` — является [событием](/ru/api/effector/Event), срабатывает при ошибке.
- `finally` — является [событием](/ru/api/effector/Event), срабатывает когда эффект заверешен с ошибкой или успешно.

С полным api `effect` можно познакомиться [здесь](/ru/api/effector/Effect).

:::warning{title="Важная заметка"}
Не стоит вызывать события или модифицировать состояния эффекта в ручную, effector сам сделает это.
:::

```ts
const fetchUserFx = createEffect(() => {
  /* вызов внешнего api */
});

fetchUserFx.pending.watch((isPending) => console.log("Pending:", isPending));

fetchUserFx.done.watch(({ params, result }) => console.log(`Fetched user ${params}:`, result));

fetchUserFx.finally.watch((value) => {
  if (value.status === "done") {
    console.log("fetchUserFx resolved ", value.result);
  } else {
    console.log("fetchUserFx rejected ", value.error);
  }
});

fetchUserFx.fail.watch(({ params, error }) =>
  console.error(`Failed to fetch user ${params}:`, error),
);

fetchUserFx();
```

## Привязка эффектов к событиям и хранилищам (#binding-effects-to-events-and-stores)

### Заполнить стор данными при завершении эффекта (#update-store-when-effect-completes)

Допустим мы хотим, чтобы при завершении работы эффекта effector взял данные, которые вернул эффект, и обновил стор с новыми данными, сделать это довольно просто при помощи состояний эффекта.

```ts
import { createStore, createEffect } from "effector";

const fetchUserNameFx = createEffect(async (userId: string) => {
  const userData = await fetch(`/api/users/${userId}`);

  return userData.name;
});

const $error = createStore<string | null>(null);
const $userName = createStore("");
const $isLoading = fetchUserNameFx.pending.map((isPending) => isPending);

$error.reset(fetchUserNameFx.done);

$userName.on(fetchUserNameFx.done, (_, { params, result }) => result);
$error.on(fetchUserNameFx.fail, (_, { params, error }) => error.message);
// или
$userName.on(fetchUserNameFx.doneData, (_, result) => result);
$error.on(fetchUserNameFx.failData, (_, error) => error.message);

$isLoading.watch((loading) => console.log("Is loading:", loading));
```

`doneData` и `failData` являются событиями, которые идентичны `done` и `fail` соответственно, за исключением того, что они получают только `result` и `error` в свои параметры.

### Вызов эффекта при срабатывании события (#triggering-effect-on-events)

В большинстве случаев вы захотите вызвать эффект при срабатывании какого-нибудь события, например подтверждение формы, или нажатие на кнопку, в таких случаях вам поможет функция `sample`, которая вызовет `target`, при срабатывании `clock`.

:::info{title="Функция sample"}
Функция `sample` является ключевым элементом для связывания юнитов. Она позволяет вам гибко и легко настроить реактивную логику вашего приложения.
Прочитайте больше о `sample` [здесь](/ru/essentials/unit-composition)
:::

```ts
import { createEvent, sample } from "effector";

const userLoginFx = createEffect(() => {
  // какая-то логика
});

// Событие для загрузки данных
const formSubmitted = createEvent();

// Связываем событие с эффектом
sample({
  clock: formSubmitted, // Когда сработает
  target: userLoginFx, // Запусти это
});

// где-то в приложении
formSubmitted();
```

## Обработка ошибок в эффектах (#error-handing-in-effects)

Effector предоставляет надежные возможности обработки ошибок. Когда во время выполнения эффекта происходит ошибка, она автоматически перехватывается и обрабатывается через событие `fail`.

Чтобы типизировать ошибку в эффекте, необходимо передать определенный тип в generic третьим параметром функции `createEffect`:

```ts
import { createEffect } from "effector";

class CustomError extends Error {
  // реализация
}

const effect = createEffect<Params, ReturnValue, CustomError>(async () => {
  const response = await fetch(`/api/users/${userId}`);

  if (!response.ok) {
    // Вы можете выбрасывать ошибки, которые будут перехвачены обработчиком .fail
    throw new CustomError(`Не удалось загрузить пользователя: ${response.statusText}`);
  }

  return response.json();
});
```

Если вы выбросите ошибку другого типа, TypeScript покажет вам ошибку.

## Практический пример (#effects-practical-example)

Рассмотрим реальный пример, где пользователь вводит ID, а по нажатию кнопки загружаются данные о нём.

```ts
import { createStore, createEvent, createEffect, sample } from "effector";

// Эффект для загрузки данных
const fetchUserFx = createEffect(async (id: number) => {
  const response = await fetch(`/api/user/${id}`);

  if (!response.ok) {
    // можно модифицировать ошибку, прежде чем она попадет в fail/failData
    throw new Error("User not found");
  }

  return response.json();
});

const setId = createEvent<number>();
const submit = createEvent();

const $id = createStore(0);
const $user = createStore<{ name: string } | null>(null);
const $error = createStore<string | null>(null);
const $isLoading = fetchUserFx.pending;

$id.on(setId, (_, id) => id);
$user.on(fetchUserFx.doneData, (_, user) => user);
$error.on(fetchUserFx.fail, (_, { error }) => error.message);
$error.reset(fetchUserFx.done);

// Логика загрузки: запускаем fetchUserFx при submit
sample({
  clock: submit,
  source: $id,
  target: fetchUserFx,
});

// Использование
setId(1); // Устанавливаем ID
submit(); // Загружаем данные
```

О том, как тестировать эффекты вы можете прочитать на странице [Тестирование](/ru/essentials/testing)
