---
title: Store API
description: Store, его методы и свойства
lang: ru
---

# Store API (#store-unit)

```ts
import { type Store, type StoreWritable, createStore } from "effector";

const $store = createStore();
```

_Store_ — это объект, который хранит значение состояния. Обновление стора происходит когда новое значение не равно (`!==`) текущему, а также когда не равно `undefined` (если в конфигурации стора не указан `skipVoid:false`). Стор является [Unit](/ru/explanation/glossary#common-unit). Некоторые сторы могут быть [производными](#store-derived).

:::tip{title="Кто такой этот ваш стор?"}
Если вы еще не знакомы как работать со стором, то добро пожаловать [сюда](/ru/essentials/manage-states).
:::

## Интерфейс стора (#store-interface)

Доступные методы и свойства стора:

| Метод/Свойство                                         | Описание                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------- |
| [`map(fn)`](#methods-map-fn)                           | Создает новый производный стор                                |
| [`on(trigger, reducer)` ](#methods-on-trigger-reducer) | Обновление стейта c помощью `reducer`, когда вызван `trigger` |
| [`watch(watcher)`](#methods-watch-watcher)             | Вызывает функцию `watcher` каждый раз, когда стор обновляется |
| [`reset(...triggers)`](#methods-reset-triggers)        | Метод для сброса к начальному состоянию                       |
| [`off(trigger)`](#methods-off-trigger)                 | Удаляет подписку на указанный триггер                         |
| [`updates()`](#properties-updates)                     | Событие срабатывающие при обновление стора                    |
| [`reinit()`](#properties-reinit)                       | Событие для реинициализации стора                             |
| [`shortName`](#properties-shortName)                   | ID или короткое имя store                                     |
| [`defaultState`](#properties-defaultState)             | Начальное состояние стора                                     |
| [`getState()`](#utility-methods-getState)              | Возвращает текущий стейт                                      |

## Иммутабельность (#immutability)

Store в effector иммутабелен. Это значит, что обновления в нём будут происходить только если в функции-обработчике (например `combine`, `sample` или `on`) вернуть новый объект

Например, прежде чем использовать методы массива, нужно создать новую ссылку на него. Как правильно:

```ts
$items.on(addItem, (items, newItem) => {
  const updatedItems = [...items];
  // ✅ метод .push вызывается на новом массиве
  updatedItems.push(newItem);
  return updatedItems;
});
```

Так делать нельзя, обновления стора **не произойдёт**

```ts
$items.on(addItem, (items, newItem) => {
  // ❌ ошибка! Ссылка на массив осталась та же, обновления стора не произойдёт
  items.push(newItem);
  return items;
});
```

Обновление объектов происходит аналогичным образом

Сторы в effector должен быть размером как можно меньше, чтобы отвечать за конкретную часть в бизнес логике, в отличии от например redux стора, который имеет тенденцию к тому чтобы держать рядом всё и сразу. Когда состояние атомарное, то необходимости в спредах объектов становится меньше. Однако, если возникает потребность часто обновлять сильно вложенные данные, для обновления состояния допустимо применять [immer](https://immerjs.github.io/immer/produce) чтобы упростить повторяющийся код

## Методы стора (#methods)

### `.map(fn)` (#methods-map-fn)

Принимает функцию `fn` и возвращает производный стор, который автоматически обновляется, когда исходный стор изменяется.

- **Формула**

```ts
$source.map(fn, config?);
```

- **Тип**

```ts
const $derived = $source.map<T>(
  fn: (value: SourceValue) => T,
  config?: {
    skipVoid?: boolean
  }
): Store<T>
```

- **Примеры**

Базовое использование:

```ts
import { createEvent, createStore } from "effector";

const changed = createEvent<string>();

const $title = createStore("");
const $titleLength = $title.map((title) => title.length);

$title.on(changed, (_, newTitle) => newTitle);

$titleLength.watch((length) => {
  console.log("new length", length);
});

changed("hello");
changed("world");
changed("hello world");
```

[Попробовать](https://share.effector.dev/XGKGMvpF)

Вторым аргументом можно передать объект конфига со значением `skipVoid:false`, тогда стор сможет принимать `undefined` значения:

```js
const $titleLength = $title.map((title) => title.length, { skipVoid: false });
```

- **Детальное описание**

Метод `map` вызывает переданную функцию `fn` с состоянием исходного стора в аргументе, каждый раз когда оригинальный стор обновляется.<br/>
Результат выполнения функции используется как значение стора.

- **Возвращаемое значение**

Возвращает новый [производный стор](/ru/api/effector/Store#readonly).

### `.on(trigger, reducer)` (#methods-on-trigger-reducer)

Обновляет состояние используя [reducer](/ru/explanation/glossary#reducer), при срабатывании `trigger`.

- **Формула**

```ts
$store.on(trigger, reducer);
```

- **Тип**

```ts
$store.on<T>(
  trigger: Unit<T> | Unit<T>[]
  reducer: (state: State, payload: T) => State | void
): this
```

- **Примеры**

```ts
import { createEvent, createStore } from "effector";

const $counter = createStore(0);
const incrementedBy = createEvent<number>();

$counter.on(incrementedBy, (value, incrementor) => value + incrementor);

$counter.watch((value) => {
  console.log("updated", value);
});

incrementedBy(2);
incrementedBy(2);
```

[Попробовать](https://share.effector.dev/O0JnDtIl)

- **Возвращаемое значение**

Возвращает [текущий стор](/ru/api/effector/Store).

### `.watch(watcher)` (#methods-watch-watcher)

Вызывает функцию `watcher` каждый раз, когда стор обновляется.

- **Формула**

```ts
const unwatch = $store.watch(watcher);
```

- **Тип**

```ts
$store.watch(watcher: (state: State) => any): Subscription
```

- **Примеры**

```ts
import { createEvent, createStore } from "effector";

const add = createEvent<number>();
const $store = createStore(0);

$store.on(add, (state, payload) => state + payload);

$store.watch((value) => console.log(`current value: ${value}`));

add(4);
add(3);
```

[Попробовать](https://share.effector.dev/aj0A6OI4)

- **Возвращаемое значение**

Возвращает [функцию для отмены подписки](/ru/explanation/glossary#subscription).

### `.reset(...triggers)` (#methods-reset-triggers)

Сбрасывает состояние стора до значения по умолчанию при срабатывании любого `trigger`.

- **Формула**

```ts
$store.reset(...triggers);
```

- **Тип**

```ts
$store.reset(...triggers: Array<Unit<any>>): this
```

- **Примеры**

```ts
import { createEvent, createStore } from "effector";

const increment = createEvent();
const reset = createEvent();

const $store = createStore(0)
  .on(increment, (state) => state + 1)
  .reset(reset);

$store.watch((state) => console.log("changed", state));

increment();
increment();
reset();
```

[Попробовать](https://share.effector.dev/7W8m2Zdg)

- **Возвращаемое значение**

Возвращает текущий стор.

### `.off(trigger)` (#methods-off-trigger)

Удаляет reducer для указанного `trigger`.

- **Формула**

```ts
$store.off(trigger);
```

- **Тип**

```ts
$store.off(trigger: Unit<any>): this
```

- **Примеры**

```ts
import { createEvent, createStore, merge } from "effector";

const changedA = createEvent();
const changedB = createEvent();

const $store = createStore(0);
const changed = merge([changedA, changedB]);

$store.on(changed, (state, params) => state + params);
$store.off(changed);
```

[Попробовать](https://share.effector.dev/bzdoyLHm)

- **Возвращаемое значение**

Возвращает текущий стор.

## Свойства стора (#properties)

### `.updates` (#properties-updates)

Событие срабатывающие при обновление стора.

- **Примеры**

```ts
import { createStore, is } from "effector";

const $clicksAmount = createStore(0);
is.event($clicksAmount.updates); // true

$clicksAmount.updates.watch((amount) => {
  console.log(amount);
});
```

[Попробовать](https://share.effector.dev/F5L5kLTE)

- **Возвращаемое значение**

[Производное событие](/ru/api/effector/Event#event), представляющее обновления данного стора.

### `.reinit` (#properties-reinit)

Событие для реинициализации стора.

- **Примеры**

```ts
import { createStore, createEvent, sample, is } from "effector";

const $counter = createStore(0);
is.event($counter.reinit);

const increment = createEvent();

$counter.reinit();
console.log($counter.getState());
```

[Попробовать](https://share.effector.dev/vtJncyYn)

- **Возвращаемое значение**

[Событие](/ru/api/effector/Event#eventCallable), которое может реинициализировать стор до значения по умолчанию.

### `.shortName` (#properties-shortName)

Cтроковое свойство, которое содержит ID или короткое имя стора.

- **Примеры**

```ts
const $store = createStore(0, {
  name: "someName",
});

console.log($store.shortName); // someName
```

[Попробовать](https://share.effector.dev/vtJncyYn)

- **Возвращаемое значение**

ID или короткое имя store.

### `.defaultState` (#properties-defaultState)

Свойство, которое содержит значение состояния по умолчанию стора.

- **Пример**

```ts
const $store = createStore("DEFAULT");

console.log($store.defaultState === "DEFAULT"); // true
```

- **Возвращаемое значение**

Значение состояния по умолчанию.

## Вспомогательные методы (#utility-methods)

### `.getState()` (#utility-methods-getState)

Метод, который возвращает текущее состояние стора.

:::warning{title="Осторожно!"}
`getState()` не рекомендуется использовать в бизнес-логике - лучше передавать данные через `sample`.
:::

- **Примеры**

```ts
import { createEvent, createStore } from "effector";

const add = createEvent<number>();

const $number = createStore(0).on(add, (state, data) => state + data);

add(2);
add(3);

console.log($number.getState());
```

[Попробовать](https://share.effector.dev/YrnlMuRj)

- **Возвращаемое значение**

Текущее состояние стора.

## Связанные API (#related-api)

- [`createStore`](/ru/api/effector/createStore) - Создает новый стор
- [`combine`](/ru/api/effector/combine) - Комбинирует несколько сторов и возращает новый производный стор
- [`sample`](/ru/api/effector/sample) - Ключевой оператор для построения связей между юнитами
- [`createEvent`](/ru/api/effector/createEvent) - Создает события
- [`createEffect`](/ru/api/effector/createEffect) - Создает эффекты
