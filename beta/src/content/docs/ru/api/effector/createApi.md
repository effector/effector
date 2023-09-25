---
title: createApi
description: Способ массового создания событий-команд для обновления стора
lang: ru
---

Способ массового создания событий-команд для обновления стора на основе объекта с функциями-обработчиками. Если стор принадлежит какому-либо [домену](/ru/api/effector/Domain), то новые события также будут принадлежать ему

## Формула

```ts
declare const $store: Store<T>; // управляемый стор

const api: {
  event1: Event<S>; // созданное событие-команда
  event2: Event<Q>; // созданное событие-команда
} = createApi(
  /*store*/ $store,
  /*handlers*/ {
    event1: /*handler*/ (state: T, data: S) => T,
    event2: /*handler*/ (state: T, data: Q) => T,
  },
);
```

### Аргументы

1. **`store`**: [Стор](/ru/api/effector/Store), чьим значением требуется управлять
2. **`handlers`**: Объект с функциями-обработчиками, на каждую функцию будет создано по событию

   **`handler`**: `(state: T, data: S) => T`

   Функция-обработчик, которая будет вычислять новое состояние `store` на основе его предыдущего состояния и данных, отправленных в полученное событие-команду, [должна быть **чистой**](/ru/explanation/glossary#purity)

   **Аргументы**

   - **`state`**: Текущее состояние стора
   - **`data`**: Значение, с которым было вызвано событие

   **Возвращает**

   Новое значение для хранения в `store`. Если функция возвращает undefined или текущее состояние стора, то обновления не будет

### Возвращает

Объект с событиями, по событию на каждый переданный обработчик

## Примеры

### Управление позицией игрока

```js
import { createStore, createApi } from "effector";

const playerPosition = createStore(0);

const api = createApi(playerPosition, {
  moveLeft: (pos, n) => pos - n,
  moveRight: (pos, n) => pos + n,
});

playerPosition.watch((pos) => {
  console.log("position", pos);
});
// => position 0

api.moveRight(10);
// => position 10

api.moveLeft(5);
// => position 5
```

[Запустить пример](https://share.effector.dev/1ujGqL37)
