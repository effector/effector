---
title: Domain
description: Domain, его методы и свойства
lang: ru
---

_Domain (домен)_ - это способ группировки и массовой обработки юнитов.

Домен может подписываться на создание события, эффекта, стора или вложенного домена, созданного с помощью методов `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain`.

Может использоваться для логирования или других сайд эффектов.

# Методы для создания юнитов

:::info{title="since"}
[effector 20.7.0](https://changelog.effector.dev/#effector-20-7-0)
:::

## `createEvent(name?)`

### Аргументы

1. `name`? (_string_): имя события

**Возвращает**

[_Event_](/ru/api/effector/Event): Новое событие

## `createEffect(handler?)`

Создает [эффект](/ru/api/effector/Effect) с переданным обработчиком

### Аргументы

1. `handler`? (_Function_): функция для обработки вызова эффектов, также может быть установленна с помощью [use(handler)](#use)

**Возвращает**

[_Effect_](/ru/api/effector/Effect): Контейнер для асинхронных функций.

:::info{title="since"}
[effector 21.3.0](https://changelog.effector.dev/#effector-21-3-0)
:::

## `createEffect(name?)`

### Аргументы

1. `name`? (_string_): имя эффекта

**Возвращает**

[_Effect_](/ru/api/effector/Effect): Контейнер для асинхронных функций.

## `createStore(defaultState)`

### Аргументы

1. `defaultState` (_State_): дефолтное состояние стора

**Возвращает**

[_Store_](/ru/api/effector/Store): Новый стор

## `createDomain(name?)`

### Аргументы

1. `name`? (_string_): имя домена

**Возвращает**

[_Domain_](/ru/api/effector/Domain): Новый домен

## `history`

Содержит изменяемый набор юнитов только для чтения внутри домена.

### Формула

```ts
const { stores, events, domains, effects } = domain.history;
```

- Когда любой из юнитов создается внутри домена, он появляется в наборе с именем типа в порядке создания.

:::info{title="since"}
[effector 20.3.0](https://changelog.effector.dev/#effector-20-3-0)
:::

```js
import { createDomain } from "effector";
const domain = createDomain();
const eventA = domain.event();
const $storeB = domain.store(0);
console.log(domain.history);
// => {stores: Set{storeB}, events: Set{eventA}, domains: Set, effects: Set}
```

[Запустить пример](https://share.effector.dev/flIV7Fja)

## Псевдонимы

### `event(name?)`

Псевдоним для [domain.createEvent](/ru/api/effector/Domain#createevent-name)

### `effect(name?)`

Псевдоним для [domain.createEffect](/ru/api/effector/Domain#createeffect-name)

### `store(defaultState)`

Псевдоним для [domain.createStore](/ru/api/effector/Domain#createstore-defaultstate)

### `domain(name?)`

Псевдоним для [domain.createDomain](/ru/api/effector/Domain#createdomain-name)

# Хуки доменов

## `onCreateEvent(hook)`

### Формула

```ts
domain.onCreateEvent((event) => {});
```

- Функция переданная в `onCreateEvent` вызывается каждый раз, когда создается новое событие в `domain`
- Первый аргумент вызываемой функции `event`
- Результат вызова функции игнорируется

### Аргументы

1. `hook` ([_Watcher_]): Функция, которая принимает [Event](/ru/api/effector/Event) и будет вызвана во время каждого вызова [domain.createEvent](/ru/api/effector/Domain#createeventname)

**Возвращает**

[_Subscription_]: Функция для отписки.

### Пример

```js
import { createDomain } from "effector";

const domain = createDomain();

domain.onCreateEvent((event) => {
  console.log("новое событие создано");
});

const a = domain.createEvent();
// => новое событие создано

const b = domain.createEvent();
// => новое событие создано
```

[Запустить пример](https://share.effector.dev/QCQpga6u)

## `onCreateEffect(hook)`

### Формула

```ts
domain.onCreateEffect((effect) => {});
```

- Функция переданная в `onCreateEffect` вызывается каждый раз, когда создается новый эффект в `domain`
- Первый аргумент вызываемой функции `effect`
- Результат вызова функции игнорируется

### Аргументы

1. `hook` ([_Watcher_]): Функция, которая принимает [Effect](/ru/api/effector/Effect) и будет вызвана во время каждого вызова [domain.createEffect](/ru/api/effector/Domain#createeffect-name)

**Возвращает**

[_Subscription_]: Функция для отписки.

### Пример

```js
import { createDomain } from "effector";

const domain = createDomain();

domain.onCreateEffect((effect) => {
  console.log("новый эффект создан");
});

const fooFx = domain.createEffect();
// => новый эффект создан

const barFx = domain.createEffect();
// => новый эффект создан
```

[Запустить пример](https://share.effector.dev/uT6f8vv9)

## `onCreateStore(hook)`

### Формула

```ts
domain.onCreateStore(($store) => {});
```

- Функция переданная в `onCreateStore` вызывается каждый раз, когда создается новый стор в `domain`
- Первый аргумент вызываемой функции `$store`
- Результат вызова функции игнорируется

### Аргументы

1. `hook` ([_Watcher_]): Функция, которая принимает [Store](/ru/api/effector/Store) и будет вызвана во время каждого вызова [domain.createStore](/ru/api/effector/Domain#createstore-defaultstate)

**Возвращает**

[_Subscription_]: Функция для отписки.

### Пример

```js
import { createDomain } from "effector";

const domain = createDomain();

domain.onCreateStore((store) => {
  console.log("новый стор создан");
});

const $a = domain.createStore(null);
// => новый стор создан
```

[Запустить пример](https://share.effector.dev/OGlYOtfz)

## `onCreateDomain(hook)`

### Формула

```ts
domain.onCreateDomain((domain) => {});
```

- Функция переданная в `onCreateDomain` вызывается каждый раз, когда создается новый поддомен в `domain`
- Первый аргумент вызываемой функции `domain`
- Результат вызова функции игнорируется

### Аргументы

1. `hook` ([_Watcher_]): Функция, которая принимает [Domain](/ru/api/effector/Domain) и будет вызвана во время каждого вызова [domain.createDomain](/ru/api/effector/Domain#createdomain-name)

**Возвращает**

[_Subscription_]: Функция для отписки.

### Пример

```js
import { createDomain } from "effector";

const domain = createDomain();

domain.onCreateDomain((domain) => {
  console.log("новый домен создан");
});

const a = domain.createDomain();
// => новый домен создан

const b = domain.createDomain();
// => новый домен создан
```

[Запустить пример](https://share.effector.dev/dvBLiwHf)

[_watcher_]: /ru/explanation/glossary#watcher
[_subscription_]: /ru/explanation/glossary#subscription
