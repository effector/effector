---
title: Реактивность в effector
description: Разберем как работает реактивность в эффекторе
---

# Реактивность в effector (#reactivity-in-effector)

Реактивность — это фундаментальная концепция в Effector, которая позволяет автоматически обновлять данные при изменении их зависимостей. Вместо ручного управления обновлениями, вы описываете связи между различными частями вашего приложения, а Effector сам заботится об их синхронизации.

## Что такое реактивность? (#what-is-reactivity)

В основе реактивности лежит принцип автоматического распространения изменений. Когда меняется значение одного стора, все зависящие от него части приложения обновляются автоматически.

```ts
import { createStore, createEvent } from "effector";

// Создаем стор и событие
const $name = createStore("John");
const nameChanged = createEvent<string>();

// Связываем их
$name.on(nameChanged, (_, newName) => newName);

// При каждом изменении $name, это изменение
// автоматически отразится во всех подписчиках
$name.watch((name) => console.log(`Name changed: ${name}`));

// Вызов события приведет к обновлению стора и всех подписчиков
nameChanged("Bob"); // Name changed: Bob
```

## Что делает Effector реактивным? (#what-makes-effector-is-reactive)

1. Автоматическое распространение изменений. Когда значение стора меняется, Effector автоматически уведомляет все зависимые юниты:

```ts
import { createStore } from "effector";

const $users = createStore<User[]>([]);
const $userCount = $users.map((users) => users.length);
const $hasUsers = $users.map((users) => users.length > 0);

// $userCount и $hasUsers автоматически обновятся
// при любом изменении $users
```

2. Декларативные связи. Вместо императивного описания что и когда должно произойти, мы декларативно описываем связи между данными:

```ts
import { sample, createStore, createEvent, createEffect } from "effector";

const formSubmitted = createEvent();
const $formData = createStore({ name: "", email: "" });
const submitToServerFx = createEffect(({ name, email }: { name: string; email: string }) => {
  // logic
});

sample({
  clock: formSubmitted,
  source: $formData,
  target: submitToServerFx,
});
```

3. Предсказуемость обновлений. Обновления в Effector всегда происходят в определенном порядке, что делает поведение приложения предсказуемым:

```ts
import { createStore, createEvent, sample, createEffect } from "effector";

const $a = createStore(1);
const $b = createStore(2);
const updated = createEvent();

const updateFirstFx = createEffect(() => {
  // logic
});

const updateSecondFx = createEffect(() => {
  // logic
});

// Обновления будут происходить в порядке объявления
sample({
  clock: updated,
  source: $a,
  target: updateFirstFx,
});

sample({
  clock: updateFirstFx.done,
  source: $b,
  target: updateSecondFx,
});
```

## Как работают связи между юнитами (#how-units-communicate)

Effector управляет зависимостями между юнитами (сторами, событиями и эффектами), обеспечивая правильный порядок обновлений. Когда одни юниты зависят от других, Effector гарантирует, что изменения распространяются предсказуемо:

```ts
import { createStore, createEvent, sample, createEffect } from "effector";

const fetchDataFx = createEffect(async () => {
  // вызов api
});

// Создаем юниты
const buttonClicked = createEvent();
const $isLoading = createStore(false);
const $error = createStore<Error | null>(null);

// Создаем зависимости
$isLoading
  .on(buttonClicked, () => true)
  // Сброс состояния при завершении загрузки
  .reset([fetchDataFx.done, fetchDataFx.fail]);

// При клике запускаем загрузку
sample({
  clock: buttonClicked,
  target: fetchDataFx,
});

buttonClicked();
```

## Пример из реальной жизни (#effector-reactivity-example-1)

Рассмотрим пример поисковой строки с автоматическим обновлением результатов:

```ts
import { createStore, createEvent, createEffect, sample } from "effector";

// События и эффекты
const searchQueryChanged = createEvent<string>();

// 4
const searchFx = createEffect(async (query: string) => {
  const response = await fetch(`/api/search?q=${query}`);

  return response.json();
});

// Состояния
const $searchQuery = createStore("");
const $searchResults = createStore([]);
const $isSearching = searchFx.pending;

// Связи
$searchQuery.on(searchQueryChanged, (_, query) => query); // 2
// Обновляем результаты при успешном поиске
// 5
$searchResults.on(searchFx.doneData, (_, results) => results);

// Запускаем поиск при изменении запроса
// 3
sample({
  clock: searchQueryChanged,
  source: $searchQuery,
  target: searchFx,
});

searchQueryChanged("qwerty"); // 1
```

1. Где-то в приложении вызвали `searchQueryChanged`.
2. Обновляем стор `$searchQuery`.
3. При помощи `sample` мы декларативно вызываем `target` (`searchFx`) с данными из `source`.
4. Эффект `searchFx` выполняется.
5. В случае успешного эффекта `searchFx` мы обновляем данные в сторе `searchResults`
