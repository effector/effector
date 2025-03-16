---
title: Store
description: Store, его методы и свойства
lang: ru
---

```ts
import { type Store, type StoreWritable } from "effector";
```

_Store_ — это объект, который хранит значение состояния. Store обновляется, когда получает значение, которое не равно (`!==`) текущему и не равно `undefined`. Store является [Unit](/ru/explanation/glossary#common-unit). Некоторые stores могут быть [derived](#store-derived).

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

Так делать нельзя, обновления store **не произойдёт**

```ts
$items.on(addItem, (items, newItem) => {
  // ❌ ошибка! Ссылка на массив осталась та же, обновления store не произойдёт
  items.push(newItem);
  return items;
});
```

Обновление объектов происходит аналогичным образом

Store в effector должен быть размером как можно меньше, чтобы отвечать за конкретную часть в бизнес логике, в отличии от например redux, store которого имеет тенденцию к тому чтобы держать рядом всё и сразу. Когда состояние атомарное, то необходимости в спредах объектов становится меньше. Однако, если возникает потребность часто обновлять сильно вложенные данные, для обновления состояния допустимо применять [immer](https://immerjs.github.io/immer/produce) чтобы упростить повторяющийся код

# Методы Store (#methods)

## `.map(fn)` (#methods-map-fn)

Создает производный store. Он вызывает переданную функцию с состоянием, когда оригинальный store обновляется, и использует результат для обновления производного store.

### Формула (#methods-map-fn-formulae)

```ts
const $second = $first.map(fn);
```

### Аргументы (#methods-map-fn-arguments)

1. `fn` (_Function_): Функция, которая принимает `state` и возвращает новое состояние для производного store.
2. `config` (_Object_): Необязательная конфигурация.

### Возвращает (#methods-map-fn-returns)

[_DerivedStore_](/ru/api/effector/Store#readonly): Новый производный store.

### Примеры (#methods-map-fn-examples)

#### Основной пример (#methods-map-fn-examples-basic)

```js
import { createEvent, createStore } from "effector";

const changed = createEvent();
const $title = createStore("").on(changed, (_, newTitle) => newTitle);
const $length = $title.map((title) => title.length);

$length.watch((length) => {
  console.log("new length", length);
});

changed("hello");
changed("world");
changed("hello world");
```

[Попробовать](https://share.effector.dev/XGKGMvpF)

#### Пропускать пустые значения (#methods-map-fn-examples-skipVoid)

```js
const $length = $title.map((title) => title.length, { skipVoid: false });
```

## `.on(trigger, reducer)` (#methods-on-trigger-reducer)

Обновляет состояние, когда `trigger` срабатывает, используя [reducer](/ru/explanation/glossary#reducer).

### Формула (#methods-on-trigger-reducer-formulae)

```ts
$store.on(trigger, reducer);
```

### Аргументы (#methods-on-trigger-reducer-arguments)

1. `trigger`: _Event_, _Effect_ или другой _Store_.
2. `reducer`: _Reducer_: Функция, которая принимает `state` и `params` и возвращает новое состояние.

### Возвращает (#methods-on-trigger-reducer-returns)

[_Store_](/ru/api/effector/Store): Текущий store.

### Примеры (#methods-on-trigger-reducer-examples)

#### Основной пример (#methods-on-trigger-reducer-examples-basic)

```js
import { createEvent, createStore } from "effector";

const $store = createStore(0);
const changed = createEvent();

$store.on(changed, (value, incrementor) => value + incrementor);

$store.watch((value) => {
  console.log("updated", value);
});

changed(2);
changed(2);
```

[Попробовать](https://share.effector.dev/O0JnDtIl)

## `.watch(watcher)` (#methods-watch-watcher)

Вызывает функцию `watcher` каждый раз, когда store обновляется.

### Формула (#methods-watch-watcher-formulae)

```ts
const unwatch = $store.watch(watcher);
```

### Аргументы (#methods-watch-watcher-arguments)

1. `watcher`: [_Watcher_](/ru/explanation/glossary#watcher): Функция-наблюдатель, которая принимает текущее состояние store в качестве первого аргумента.

### Возвращает (#methods-watch-watcher-returns)

[_Subscription_](/ru/explanation/glossary#subscription): Функция для отмены подписки.

### Примеры (#methods-watch-watcher-examples)

#### Основной пример (#methods-watch-watcher-examples-basic)

```js
import { createEvent, createStore } from "effector";

const add = createEvent();
const $store = createStore(0).on(add, (state, payload) => state + payload);

$store.watch((value) => console.log(`current value: ${value}`));
add(4);
add(3);
```

[Попробовать](https://share.effector.dev/aj0A6OI4)

## `.reset(...triggers)` (#methods-reset-triggers)

Сбрасывает состояние store до значения по умолчанию.

### Формула (#methods-reset-triggers-formulae)

```ts
$store.reset(...triggers);
```

### Аргументы (#methods-reset-triggers-arguments)

1. `triggers`: (_(Event | Effect | Store)[]_): любое количество _Events_, _Effects_ или _Stores_.

### Возвращает (#methods-reset-triggers-returns)

[_Store_](/ru/api/effector/Store): Текущий store.

### Примеры (#methods-reset-triggers-examples)

#### Основной пример (#methods-reset-triggers-examples-basic)

```js
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

## `.off(trigger)` (#methods-off-trigger)

Удаляет reducer для указанного `trigger`.

### Формула (#methods-off-trigger-formulae)

```ts
$store.off(trigger);
```

### Аргументы (#methods-off-trigger-arguments)

1. `trigger`: _Event_, _Effect_ или _Store_.

### Возвращает (#methods-off-trigger-returns)

[_Store_](/ru/api/effector/Store): Текущий store.

### Примеры (#methods-off-trigger-examples)

#### Основной пример (#methods-off-trigger-examples-basic)

```js
import { createEvent, createStore, merge } from "effector";

const changedA = createEvent();
const changedB = createEvent();

const $store = createStore(0);
const changed = merge([changedA, changedB]);

$store.on(changed, (state, params) => state + params);
$store.off(changed);
```

[Попробовать](https://share.effector.dev/bzdoyLHm)

# Свойства Store (#properties)

## `.updates` (#properties-updates)

### Возвращает (#properties-updates-returns)

[_Event_](/ru/api/effector/Event): Событие, представляющее обновления данного store.

### Пример (#properties-updates-example)

```js
import { createStore, is } from "effector";

const $clicksAmount = createStore(0);
is.event($clicksAmount.updates); // true

$clicksAmount.updates.watch((amount) => {
  console.log(amount);
});
```

[Попробовать](https://share.effector.dev/F5L5kLTE)

## `.reinit` (#properties-reinit)

### Возвращает (#properties-reinit-returns)

[_EventCallable_](/ru/api/effector/Event#eventCallable): Событие, которое может реинициализировать store до значения по умолчанию.

### Пример (#properties-reinit-example)

```js
import { createStore, createEvent, sample, is } from "effector";

const $counter = createStore(0);
is.event($counter.reinit);

const increment = createEvent();

$counter.reinit();
console.log($counter.getState());
```

[Попробовать](https://share.effector.dev/vtJncyYn)

## `.shortName` (#properties-shortName)

### Возвращает (#properties-shortName-returns)

(_`string`_): ID или короткое имя store.

## `.defaultState` (#properties-defaultState)

### Возвращает (#properties-defaultState-returns)

(_`State`_): Значение состояния по умолчанию.

### Пример (#properties-defaultState-example)

```ts
const $store = createStore("DEFAULT");
console.log($store.defaultState === "DEFAULT");
```

# Вспомогательные методы (#utility-methods)

## `.getState()` (#utility-methods-getState)

Возвращает текущее состояние store.

### Возвращает (#utility-methods-getState-returns)

(_`State`_): Текущее состояние store.

### Пример (#utility-methods-getState-example)

```js
import { createEvent, createStore } from "effector";

const add = createEvent();

const $number = createStore(0).on(add, (state, data) => state + data);

add(2);
add(3);

console.log($number.getState());
```

[Попробовать](https://share.effector.dev/YrnlMuRj)

# Только для чтения store (#readonly)

TBD

# Типы (#types)

```ts
import { type StoreValue } from "effector";
```

## `StoreValue<S>` (#types-StoreValue)

Извлекает тип значения `Store` или `StoreWritable`.

```ts
const $store: Store<Value>;
type Value = StoreValue<typeof $store>;
```
