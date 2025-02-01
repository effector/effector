---
title: scopeBind
description: Метод для привязки юнитов и функций к скоупу
lang: ru
---

```ts
import { scopeBind } from "effector";
```

`scopeBind` — метод для привязки юнита (эвента или эффекта) к [скоупу](/ru/api/effector/Scope), который может быть вызван позже. Эффектор поддерживает императивный вызов эвентов внутри обработчиков, однако существуют случаи, когда необходимо явно привязать эвенты к скоупу — например, при вызове эвентов из колбэков `setTimeout` или `setInterval`.

# Методы (#scopeBind-methods)

## `scopeBind(event, options?)` (#scopeBind-methods-scopeBind-event)

### Формула (#scopeBind-methods-scopeBind-event-formulae)

```ts
scopeBind<T>(event: EventCallable<T>): (payload: T) => void
scopeBind<T>(event: EventCallable<T>, options?: {scope?: Scope, safe?: boolean}): (payload: T) => void
```

### Аргументы (#scopeBind-methods-scopeBind-event-arguments)

1. `event` [_EventCallable_](/ru/api/effector/Event) или [_Effect_](/ru/api/effector/Effect) для привязки к скоупу.
2. `options` (_Object_): опциональные настройки
   - `scope` (_Scope_): скоуп, к которому нужно привязать эвент
   - `safe` (_Boolean_): флаг для подавления исключений, если скоуп отсутствует

### Возвращает (#scopeBind-methods-scopeBind-event-returns)

`(payload: T) => void` — функция с теми же типами, что и у `event`.

### Примеры (#scopeBind-methods-scopeBind-event-examples)

#### Базовый пример (#scopeBind-methods-scopeBind-event-examples-basic-usage)

Мы собираемся вызвать `changeLocation` внутри колбэка `history.listen`, поэтому нет способа для эффектора ассоциировать эвент с соответствующим скоупом. Нам нужно явно привязать эвент к скоупу, используя `scopeBind`.

```ts
import { createStore, createEvent, attach, scopeBind } from "effector";

const $history = createStore(history);
const initHistory = createEvent();
const changeLocation = createEvent<string>();

const installHistoryFx = attach({
  source: $history,
  effect: (history) => {
    const locationUpdate = scopeBind(changeLocation);

    history.listen((location) => {
      locationUpdate(location);
    });
  },
});

sample({
  clock: initHistory,
  target: installHistoryFx,
});
```

[Запустить пример](https://share.effector.dev/xtP8Zk8J)

## `scopeBind(callback, options?)` (#scopeBind-methods-scopeBind-callback)

Привязывает произвольный колбэк к скоупу, чтобы его можно было вызвать позже. Полученная привязанная версия функции сохраняет все свойства оригинала — например, если оригинальная функция выбрасывала ошибку при определённых аргументах, то привязанная версия также будет выбрасывать ошибку при тех же условиях.

:::info{title="since"}
Функциональность доступна, начиная с релиза `effector 23.1.0`.
Поддержка нескольких аргументов функции появилась в `effector 23.3.0`.
:::

:::warning
Чтобы быть совместимыми с Fork API, колбэки должны соблюдать те же правила, что и хендлеры эффектов:

- Синхронные функции можно использовать как есть.
- Асинхронные функции должны соответствовать [правилам](/ru/api/effector/scope/) при работе с скоупом.
:::

### Формула (#scopeBind-methods-scopeBind-callback-formulae)

```ts
scopeBind(callback: (...args: Args) => T, options?: { scope?: Scope; safe?: boolean }): (...args: Args) => T;
```

### Аргументы (#scopeBind-methods-scopeBind-callback-arguments)

1. `callback` (_Function_): любая функция, которую нужно привязать к скоупу.
2. `options` (_Object_): необязательные настройки.
   - `scope` (_Scope_): скоуп, к которому нужно привязать эвент.
   - `safe` (_Boolean_): флаг для подавления исключений, если скоуп отсутствует.

### Возвращает (#scopeBind-methods-scopeBind-callback-returns)

`(...args: Args) => T` — функция с теми же типами, что и у `callback`.

### Примеры (#scopeBind-methods-scopeBind-callback-examples)

```ts
import { createEvent, createStore, attach, scopeBind } from "effector";

const $history = createStore(history);
const locationChanged = createEvent();

const listenToHistoryFx = attach({
  source: $history,
  effect: (history) => {
    return history.listen(
      scopeBind((location) => {
        locationChanged(location);
      }),
    );
  },
});
```
