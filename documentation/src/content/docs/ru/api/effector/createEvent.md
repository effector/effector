---
title: createEvent
description: Метод для создания событий
lang: ru
---

Метод для создания [событий](/ru/api/effector/Event)

## Формула (#formulae)

```ts
event = createEvent() > Event<void>;

event = createEvent<T>() > Event<T>;

event = createEvent(/*name*/ "eventName") > Event<void>;
```

### Аргументы (#args)

1. **`name?`**: _string_

   Опциональное имя события

### Возвращает (#return)

Новое [событие](/ru/api/effector/Event)

## Примеры (#examples)

### Обновление состояния с помощью вызова события

```js
import { createStore, createEvent } from "effector";

const addNumber = createEvent();
const $store = createStore(0).on(addNumber, (state, number) => state + number);

$store.watch((state) => {
  console.log("state", state);
});
// => 0

addNumber(10);
// => 10

addNumber(10);
// => 20

addNumber(10);
// => 30
```

[Запустить пример](https://share.effector.dev/0OeoZMPc)

Мы создали событие (addNumber) и стор $store, после чего подписались на обновления стора.<br/>
Обратите внимание на вызов функции `addNumber(10)`. Всякий раз, когда вы будете вызывать `addNumber(10)`, вы можете посмотреть в консоль и увидеть, как меняется состояние

### Обработка данных с помощью производных событий

```js
import { createEvent } from "effector";

const extractPartOfArray = createEvent();
const array = extractPartOfArray.map((arr) => arr.slice(2));

array.watch((part) => {
  console.log(part);
});
extractPartOfArray([1, 2, 3, 4, 5, 6]);
// => [3, 4, 5, 6]
```

[Запустить пример](https://share.effector.dev/4lWsZr2k)
