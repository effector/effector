---
id: domain
title: Domain
description: Domain, iего методы и свойства
---

Домен - это пространство имен для ваших событий, сторов и эффектов.

Домен может подписаться на создание события, эффекта, стора или вложенного домена с помощью методов `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain`.

Он полезен при логировании или других побочных эффектах.

## Создание Unit-а

:::note since
effector 20.7.0
:::

### `createEvent(name?)`

**Аргументы**

1. `name`? (_string_): имя события

**Возвращает**

[_Event_](Event.md): новое событие

<hr />

### `createEffect(handler?)`

Создает новый [effect](Effect.md) с заданным обработчиком

**Аргументы**

1. `handler`? (_Function_): функция для обработки вызовов эффектов, также может быть установлена с помощью [`use(handler)`](#use)

**Возвращает**

[_Effect_](Effect.md): Контейнер для асинхронной функции.

:::note since
effector 21.3.0
:::

<hr />

### `createEffect(name?)`

**Аргументы**

1. `name`? (_string_): имя эффекта

**Возвращает**

[_Effect_](Effect.md): Контейнер для асинхронной функции.

<hr />

### `createStore(defaultState)`

**Аргументы**

1. `defaultState` (_State_): начальное состояние стора

**Возвращает**

[_Store_](Store.md): Новый стор

<hr />

### `createDomain(name?)`

**Аргументы**

1. `name`? (_string_): название домена

**Возвращает**

[_Domain_](Domain.md): новый домен

<hr />

### `history`

Содержит изменяемые только для чтения наборы единиц внутри домена.

#### Формула

```ts
const {stores, events, domains, effects} = domain.history
```

- Когда внутри домена создаются юниты любого типа, они появляются в наборе с именем типа (сторы, события, домены, эффекты) в том же порядке, в котором создавались

:::note since
effector 20.3.0
:::

```js
import {createDomain} from 'effector'
const domain = createDomain()
const eventA = domain.event()
const $storeB = domain.store(0)
console.log(domain.history)
// => {stores: Set{storeB}, events: Set{eventA}, domains: Set, effects: Set}
```

[Try it](https://share.effector.dev/flIV7Fja)

<hr />

### Псевдонимы

#### `event(name?)`

Псевдоним для [domain.createEvent](./Domain.md#createeventname)

<hr />

#### `effect(name?)`

Псевдоним для [domain.createEffect](./Domain.md#createeffectname)

<hr />

#### `store(defaultState)`

Псевдоним для [domain.createStore](./Domain.md#createstoredefaultstate)

<hr />

#### `domain(name?)`

Псевдоним для [domain.createDomain](./Domain.md#createdomainname)

<hr />

## Хуки

### `onCreateEvent(hook)`

#### Формула

```ts
domain.onCreateEvent(event => {})
```

- Функция, переданная в `onCreateEvent`, вызывается каждый раз, когда в `домене` создается новое событие
- Функция вызывается с `event` в качестве первого аргумента
- Результат вызова функции игнорируется

**Аргументы**

1. `hook` ([_Watcher_]): Функция, которая получает [Event](./Event.md) и будет вызываться во время каждого вызова [domain.createEvent](./Domain.md#createeventname)

**Возвращает**

[_Subscription_]: Функция отписки.

#### Пример

```js
import {createDomain} from 'effector'

const domain = createDomain()

domain.onCreateEvent(event => {
  console.log('new event created')
})

const a = domain.createEvent()
// => Новое событие создано

const b = domain.createEvent()
// => Новое событие создано
```

[Попробовать](https://share.effector.dev/QCQpga6u)

<hr />

### `onCreateEffect(hook)`

#### Формула

```ts
domain.onCreateEffect(effect => {})
```

- Функция, переданная в `onCreateEffect`, вызывается каждый раз, когда в `домене` создается новый эффект
- Функция вызывается с `effect` в качестве первого аргумента
- Результат вызова функции игнорируется

**Аргументы**

1. `hook` ([_Watcher_]): Функция, которая получает [Effect](./Effect.md) и будет вызываться во время каждого вызова [domain.createEffect](./Domain.md#createeffectname)

**Возвращает**

[_Subscription_]: Функция отписки.

#### Пример

```js
import {createDomain} from 'effector'

const domain = createDomain()

domain.onCreateEffect(effect => {
  console.log('new effect created')
})

const fooFx = domain.createEffect()
// => новый эффект создан

const barFx = domain.createEffect()
// => новый эффект создан
```

[Try it](https://share.effector.dev/uT6f8vv9)

<hr />

### `onCreateStore(hook)`

#### Формула

```ts
domain.onCreateStore($store => {})
```

- Функция, переданная в `onCreateStore`, вызывается каждый раз, когда в `домене` создается новый стор
- Функция вызывается с `$store` в качестве первого аргумента
- Результат вызова функции игнорируется

**Аргументы**

1. `hook` ([_Watcher_]): A function that receives [Store](./Store.md) and will be called during every [domain.createStore](./Domain.md#createstoredefaultstate) call

**Возвращает**

[_Subscription_]: Функция отписки.

#### Пример

```js
import {createDomain} from 'effector'

const domain = createDomain()

domain.onCreateStore(store => {
  console.log('new store created')
})

const $a = domain.createStore(null)
// => новый стор создан
```

[Попробовать](https://share.effector.dev/OGlYOtfz)

<hr />

### `onCreateDomain(hook)`

#### Формула

```ts
domain.onCreateDomain(domain => {})
```

- Функция, переданная в `onCreateDomain`, вызывается каждый раз, по мере создания поддомена в `domain`.
- Функция вызывается с `доменом` в качестве первого аргумента
- Результат вызова функции игнорируется

**Аргументы**

1. `hook` ([_Watcher_]): Функция, которая получает [Domain](./Domain.md) и будет вызываться во время каждого вызова [domain.createDomain](./Domain.md#createdomainname)

**Возвращает**

[_Subscription_]: Функция отписки.

#### Пример

```js
import {createDomain} from 'effector'

const domain = createDomain()

domain.onCreateDomain(domain => {
  console.log('new domain created')
})

const a = domain.createDomain()
// => новый домен создан

const b = domain.createDomain()
// => новый домен создан
```

[Попробовать](https://share.effector.dev/dvBLiwHf)

<hr />

[_watcher_]: ../../glossary.md#watcher
[_subscription_]: ../../glossary.md#subscription
