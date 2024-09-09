---
title: Глоссарий
description: Словарь основных понятий
redirectFrom:
  - /docs/glossary
  - /docs/explanation/glossary
  - /explanation/glossary
  - /en/glossary
---

В комплекте имеет ряд заранее созданных эвентов и сторов, облегчающих стандартные действия

## Event

_Event_ (_событие_, _ивент_) это функция, на вызовы которой можно подписаться. It can be an intention to change the store, indication of something happening in the application, a command to be executed, aggregated analytics trigger and so on.

[Event](/ru/api/effector/Event) в документации.

## Store

_Store_ (_состояние_, _стор_) это объект который хранит состояние.
There can be multiple stores.

[Store](/ru/api/effector/Store) в документации.

## Effect

_Effect_ это контейнер для сайд-эффектов, возможно асинхронных.
It exposes special events and stores, such as `.pending`, `.done`, `.fail`, `.finally`, etc...

It can be safely used in place of the original async function.

It returns promise with the result of a function call.

The only requirement for the function:

- Может иметь один аргумент или не иметь ни одного

[Effect](/ru/api/effector/Effect) в документации

## Domain

_Domain_ is a namespace for your events, stores and effects.

Домены получают уведомления о создании событий, сторов, эффектов и вложенных доменов.

It is useful for logging or other side effects.

[Domain](/ru/api/effector/Domain) в документации

## Unit (#unit)

Тип данных, используемый для описания бизнес-логики приложений. Большинство методов эффектора имеют дело с обработкой юнитов.
Существует пять типов юнитов: [_Store_](/ru/api/effector/Store), [Event](/ru/api/effector/Event), [Effect](/ru/api/effector/Effect), [Domain](/ru/api/effector/Domain) и [_Scope_](/ru/api/effector/Scope)

## Common unit (#common-unit)

Common units can be used to trigger updates of other units. Существует три типа обычных юнитов: [Store (стор)](/ru/api/effector/Store), [Event (событие)](/ru/api/effector/Event) и [Effect (эффект)](/ru/api/effector/Effect). **Когда метод принимает юниты, это означает, что он принимает события, эффекты и сторы** в качестве источника реактивных обновлений

## Purity (#purity)

Большинство функций, передаваемых в методы api не должны вызывать другие события или эффекты: легче рассуждать о потоке данных приложения, когда императивные триггеры сгруппированы внутри обработчиков эффектов, а не рассредоточены по всей бизнес-логике

**Правильно**, императивно:

```js
import { createStore, createEvent } from "effector";

const submitLoginSize = createEvent();

const login = createStore("guest");
const loginSize = login.map((login) => {
  // лучше переместить этот вызов в watch или эффект
  submitLoginSize(login.length);
  return login.length;
});
```

[Запустить пример](https://share.effector.dev/D5hV8C70)

`store.map` [в документации](/ru/api/effector/Store#map-fn)

**Правильно**, декларативно:

```js
import { createStore, createEvent, sample } from "effector";

const login = createStore("guest");

const loginSize = login.map((login) => login.length);

const submitLoginSize = createEvent();

sample({
  clock: loginSize,
  target: submitLoginSize,
});
```

[Запустить пример](https://share.effector.dev/6WyFNlCK)

[sample в документации](/ru/api/effector/sample)

**Неправильно**:

```js
import { createStore, createEvent } from "effector";

const login = createStore("guest");

const loginSize = login.map((login) => login.length);

const submitLoginSize = createEvent();

loginSize.watch((size) => {
  submitLoginSize(size);
});
```

## Reducer

```typescript
type StoreReducer<State, E> = (state: State, payload: E) => State | void;
type EventOrEffectReducer<T, E> = (state: T, payload: E) => T;
```

_Reducer_ вычисляет новое состояние, учитывая предыдущее состояние и данные из события. Для сторов, если reducer возвращает undefined или то же состояние (===), то обновления не будет

## Watcher

```typescript
type Watcher<T> = (update: T) => any;
```

_Watcher_ is used for **side effects**. Используется в [event.watch](/ru/api/effector/Event#watch-watcher), [store.watch](/ru/api/effector/Store#watchwatcher) и [хуках домена](/ru/api/effector/Domain#oncreateeventhook). Возвращаемое значение игнорируется

## Subscription

```ts
import { type Subscription } from "effector";
```

Looks like:

```typescript
type Subscription = {
  (): void;
  unsubscribe(): void;
};
```

`store.watch` [в документации](/ru/api/effector/Store#watch-watcher) Used for cancelling a subscription. After the first call, subscription will do nothing.

:::warning
**Ручное управление подписками мешает сосредоточиться на управлении данными и бизнес-логикой** <br/><br/>
Эффектор предоставляет широкий набор возможностей, чтобы свести необходимость удаления подписок к минимуму. Это отличает его от большинства других реактивных библиотек
:::

[effect]: /ru/api/effector/Effect
[store]: /ru/api/effector/Store
[event]: /ru/api/effector/Event
[domain]: /ru/api/effector/Domain
[scope]: /ru/api/effector/Scope
