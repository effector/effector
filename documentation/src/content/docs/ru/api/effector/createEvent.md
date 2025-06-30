---
title: createEvent
description: Метод для создания событий
lang: ru
---

# createEvent (#create-event)

```ts
import { createEvent } from "effector";

const event = createEvent();
```

Метод для создания [событий][eventApi].

## Формула (#formulae)

```ts
createEvent<E = void>(eventName?: string): EventCallable<E>
createEvent<E = void>(config: {
  name?: string
  sid?: string
  domain?: Domain
}): EventCallable<E>
```

- **Аргументы**

  - `eventName`: Опциональный аргумент. Имя события для отладки.
  - `config`: Опциональный аргумент. Объект конфигурации.

    - `name`: Имя события.
    - `sid`: Стабильный идентификатор для SSR.
    - `domain`: Домен для события.

- **Возвращаемое значение**

Возвращает новое вызываемое [событие][eventTypes].

## Примеры (#examples)

Обновление состояния с помощью вызова события:

```js
import { createStore, createEvent } from "effector";

const addNumber = createEvent();

const $counter = createStore(0);

$counter.on(addNumber, (state, number) => state + number);

$counter.watch((state) => {
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

Мы создали событие `addNumber` и стор `$counter`, после чего подписались на обновления стора.<br/>
Обратите внимание на вызов функции `addNumber(10)`. Всякий раз, когда вы будете вызывать `addNumber(10)`, вы можете посмотреть в консоль и увидеть, как меняется состояние.

Обработка данных с помощью производных событий:

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

## Связанные API и статьи (#related-api-and-docs-to-create-event)

- **API**
  - [`Event API`][eventApi] - API стора, его методы, свойства и описание
  - [`createApi`][createApi] - Создание набора событий для стора
  - [`merge`][merge] - Метод для объединения массива юнитов в одно новое событие
  - [`sample`][sample] - Связывание событий с другими юнитами
- **Статьи**
  - [Как работать с событиями][eventGuide]
  - [Как мыслить в effector и почему события важны][mindset]
  - [Гайд по типизации событий и других юнитов][typescript]

[eventApi]: /ru/api/effector/Event
[eventTypes]: /ru/api/effector/Event#event-types
[merge]: /ru/api/effector/merge
[eventGuide]: /ru/essentials/events
[mindset]: /ru/resources/mindset
[mindset]: /ru/resources/mindset
[typescript]: /ru/essentials/typescript
[sample]: /ru/api/effector/sample
[createApi]: /ru/api/effector/createApi
