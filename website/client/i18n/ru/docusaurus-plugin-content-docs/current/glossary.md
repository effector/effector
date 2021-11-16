---
id: glossary
title: Словарь
description: Словарь основных понятий
---

# Словарь основных понятий

## Event

_Event_ (_событие_, _эвент_) это функция, на вызовы которой можно подписаться. Она может обозначать намерение изменить состояния в приложении, указанием на то, что происходит в приложении, быть командой для управления сущностями, триггером вычислений и так далее.

[Event](./api/effector/Event.md) в документации

## Store

_Store_ (_состояние_, _стор_) это объект который хранит состояние. В приложении могут совместно существовать множество состояний

[Store](./api/effector/Store.md) в документации

## Effect

_Effect_ это контейнер для сайд-эффектов, возможно асинхронных. В комплекте имеет ряд заранее созданных эвентов и сторов, облегчающих стандартные действия

При императивном вызове всегда возвращает Promise с результатом.

Может иметь один аргумент или не иметь ни одного

[Effect](./api/effector/Effect.md) в документации

## Domain

_Domain_ это способ группировки и применения массовых обработок к юнитам. Домены получают уведомления о создании событий, сторов, эффектов и вложенных доменов. Часто используются для логгирования и SSR

[Domain](./api/effector/Domain.md) в документации

## Unit {#unit}

Тип данных, используемый для описания бизнес-логики приложений. Большинство методов эффектора имеют дело с обработкой юнитов.
Существует пять типов юнитов: [store], [event], [effect], [domain] и [scope]

## Common unit {#common-unit}

Обычные юниты можно использовать для запуска обновлений других юнитов. Существует три типа обычных юнитов: [store (стор)](./api/effector/Store.md), [event (событие)](./api/effector/Event.md) и [effect (эффект)](./api/effector/Effect.md). **Когда метод принимает юниты, это означает, что он принимает события, эффекты и сторы** в качестве источника реактивных обновлений

## Purity {#purity}

Большинство функций, передаваемых в методы api не должны вызывать другие события или эффекты: легче рассуждать о потоке данных приложения, когда императивные триггеры сгруппированы внутри обработчиков эффектов, а не рассредоточены по всей бизнес-логике

**Правильно**, императивно:

```js
import {createStore, createEvent} from 'effector'

const login = createStore('guest')

const loginSize = login.map((login) => login.length)

const submitLoginSize = createEvent()

loginSize.watch((size) => {
  submitLoginSize(size)
})
```

[Запустить пример](https://share.effector.dev/D5hV8C70)

[store.map в документации](./api/effector/Store.md#map)

[store.watch в документации](./api/effector/Store.md#watch)

**Правильно**, декларативно:

```js
import {createStore, createEvent, forward} from 'effector'

const login = createStore('guest')

const loginSize = login.map((login) => login.length)

const submitLoginSize = createEvent()

forward({
  from: loginSize,
  to: submitLoginSize,
})
```

[Запустить пример](https://share.effector.dev/it0gXQLI)

[forward in docs](./api/effector/forward.md)

**Не правильно**:

```js
import {createStore, createEvent, forward} from 'effector'

const submitLoginSize = createEvent()

const login = createStore('guest')
const loginSize = login.map((login) => {
  // лучше переместить этот вызов в watch или эффект
  submitLoginSize(login.length)
  return login.length
})
```

## Reducer

```typescript
type StoreReducer<State, E> = (state: State, payload: E) => State | void
type EventOrEffectReducer<T, E> = (state: T, payload: E) => T
```

_Reducer_ вычисляет новое состояние, учитывая предыдущее состояние и данные из события. Для сторов, если reducer возвращает undefined или то же состояние (===), то обновления не будет

## Watcher

```typescript
type Watcher<T> = (update: T) => any
```

_Watcher_ - функция с сайд-эффектами, для работы которых не нужны возможности по перехвату ошибок и уведомления подписчиков об завершении асинхронной работы. Используется в [event.watch](./api/effector/Event.md#watchwatcher), [store.watch](./api/effector/Store.md#watchwatcher) и [хуках домена](./api/effector/Domain.md#oncreateeventhook). Возвращаемое значение игнорируется

## Subscription

```typescript
type Subscription = {
  (): void
  unsubscribe(): void
}
```

Функция отмены подписки, после её вызова [watcher](#watcher) перестаёт получать обновления и удаляется из памяти. Повторные вызовы функции отмены подписки не делают ничего

:::caution Ручное управление подписками мешает сосредоточиться на управлении данными и бизнес-логикой
Эффектор предоставляет широкий набор возможностей, чтобы свести необходимость удаления подписок к минимуму. Это отличает его от большинства других реактивных библиотек
:::

[effect]: ./api/effector/Effect.md
[store]: ./api/effector/Store.md
[event]: ./api/effector/Event.md
[domain]: ./api/effector/Domain.md
[scope]: ./api/effector/Scope.md
