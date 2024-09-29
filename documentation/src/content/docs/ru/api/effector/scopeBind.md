---
title: scopeBind
description: scopeBind это метод привязки ивента или эффекта к scope для последующего вызова
redirectFrom:
  - /api/effector/scopeBind
  - /docs/api/effector/scopeBind
---

```ts
import { scopeBind } from "effector";
```

`scopeBind` это метод привязки юнита (ивента или эффекта) к [скоупу](/en/api/effector/Scope) для последующего вызова. Effector поддерживает императивные вызовы ивентов внутри наблюдателей, однако есть случаи, когда вы должны явно привязать ивенты к скоупу, например, при запуске ивентов из колбеков внутри `setTimeout` или `setInterval`.

# Методы (#scopeBind-methods)

## `scopeBind(event, options?)` (#scopeBind-methods-scopeBind-event)

### Формула (#scopeBind-methods-scopeBind-event-formulae)

```ts
scopeBind<T>(event: EventCallable<T>): (payload: T) => void
scopeBind<T>(event: EventCallable<T>, options?: {scope?: Scope, safe?: boolean}): (payload: T) => void
```

### Аргументы (#scopeBind-methods-scopeBind-event-arguments)

1. `event` [_EventCallable_](/en/api/effector/Event) или [_Effect_](/en/api/effector/Effect), который будет привязан к скоупу.
2. `options` (_Object_): Опциональная конфигурация.
   - `scope` (_Scope_): Скоуп, к которому будет привязан юнит.
   - `safe` (_Boolean_): Флаг, при включении которого не будет выбрасываться ошибка, если нет скоупа или он не передан.

### Возвращает (#scopeBind-methods-scopeBind-event-returns)

`(payload: T) => void` — A function with the same types as `event`.

### Примеры (#scopeBind-methods-scopeBind-event-examples)

#### Стандартное использование (#scopeBind-methods-scopeBind-event-examples-basic-usage)

Мы собираемся вызовать `changeLocation` внутри `history.listen`, но нет способа, с помощью которого effector мог бы ассоциировать определённый скоуп с этим ивентом, так что мы явно привяжем его к соответствующему скоупу с помощью `scopeBind`.

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

[Просмотреть полный пример](https://share.effector.dev/xtP8Zk8J)

## `scopeBind(callback, options?)` (#scopeBind-methods-scopeBind-callback)

Привязывает к скоупу колбек, который будет вызван позже. Привязанная версия функции имеет все свойства оригинальной, то есть если оригинальная функция выбросит ошибку, когда вызвана с определённым аргументом, то привязанная версия также выбросит ошибку при тех же обстоятельствах.

:::info{title="Начиная с"}
`effector 24` scopeBind может быть вызван без `scope` внутри `map`, `watch`, `combine`

```ts
const event = createEvent();

const $store = createStore(0);
const $combined = combine($store, () => scopeBind(event));
```

:::

:::warning{title="Внимание"}
Чтобы быть совместимым с Fork API, колбеки **обязаны** соответствовать некоторым правилам, которым следуют хендлеры `эффектов`:

- Синхронные функции могут использоваться точно также.
- Асинхонные функции должны следовать [правилам, описанным в "Императивные вызовы эффектов с использованием скоупа"](/ru/api/effector/scope/).

Фича доступна с релиза `effector 23.1.0`.
:::

### Формула (#scopeBind-methods-scopeBind-callback-formulae)

```ts
scopeBind(callback: T, options?: { scope?: Scope; safe?: boolean }): (payload: T) => void;
```

### Аргументы (#scopeBind-methods-scopeBind-callback-arguments)

1. `callback` (_Function_): Любая функция, которая должна быть привязана к скоупу.
2. `options` (_Object_): Опциональная конфигурация.
   - `scope` (_Scope_): Скоуп, к которому должен быть привязан колбек.
   - `safe` (_Boolean_): Флаг, при включении которого не будет выбрасываться ошибка, если нет скоупа или он не передан.

### Возвращает (#scopeBind-methods-scopeBind-callback-returns)

`(payload: T) => void` — Функцию с тем же типом, что и переданный `колбек`.

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
