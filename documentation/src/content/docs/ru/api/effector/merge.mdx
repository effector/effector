---
title: merge
description: метод для объединения апдейтов массива юнитов в новое событие, которое будет срабатывать при запуске любой из переданных сущностей
lang: ru
---

Объединяет апдейты массива [юнитов](/ru/explanation/glossary#common-unit) в новое событие, которое будет срабатывать при запуске любой из переданных сущностей

:::info
Добавлено в effector 20.0.0
:::

## Формула

```ts
declare const $store: Store<T>; // триггер
declare const event: Event<T>; // триггер
declare const fx: Effect<T, any>; // триггер

const result: Event<T> = merge(/*clock*/ [$store, event, fx]);
```

### Аргументы

- **`clock`**: Массив [юнитов](/ru/explanation/glossary#common-unit) для объединения

### Возвращает

[_Event_](/ru/api/effector/Event): Новое событие

:::tip
В случае передачи стора, итоговое событие будет срабатывать при обновлении этого стора
:::

## Примеры

#### Пример 1

```js
import { createEvent, merge } from "effector";

const foo = createEvent();
const bar = createEvent();
const baz = merge([foo, bar]);
baz.watch((v) => console.log("merged event triggered: ", v));

foo(1);
// => merged event triggered: 1
bar(2);
// => merged event triggered: 2
```

[Запустить пример](https://share.effector.dev/WxUgr6dZ)

#### Пример 2

```js
import { createEvent, createStore, merge } from "effector";

const setFoo = createEvent();
const setBar = createEvent();

const $foo = createStore(0).on(setFoo, (_, v) => v);

const $bar = createStore(100).on(setBar, (_, v) => v);

const anyUpdated = merge([$foo, $bar]);
anyUpdated.watch((v) => console.log(`state changed to: ${v}`));

setFoo(1); // => state changed to: 1
setBar(123); // => state changed to: 123
```

[Запустить пример](https://share.effector.dev/Rp9wuRvl)

#### Пример 3

```js
import { createEvent, createStore, merge } from "effector";

const setFoo = createEvent();
const otherEvent = createEvent();

const $foo = createStore(0).on(setFoo, (_, v) => v);

const merged = merge([$foo, otherEvent]);

merged.watch((v) => console.log(`merged event payload: ${v}`));

setFoo(999);
// => merged event payload: 999

otherEvent("bar");
// => merged event payload: bar
```

[Запустить пример](https://share.effector.dev/pKkiyhVQ)
