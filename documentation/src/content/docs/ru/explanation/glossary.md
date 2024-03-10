---
title: Глоссарий
description: Словарь основных понятий
lang: ru
---

## Event

_Event_ (_событие_, _ивент_) это функция, на вызовы которой можно подписаться. Она может обозначать намерение изменить состояния в приложении, указанием на то, что происходит в приложении, быть командой для управления сущностями, триггером вычислений и так далее.

[Event](/ru/api/effector/Event) в документации.

## Store

_Store_ (_состояние_, _стор_) это объект который хранит состояние. В приложении могут совместно существовать множество состояний

[Store](/ru/api/effector/Store) в документации.

## Effect

_Effect_ это контейнер для сайд-эффектов, возможно асинхронных. В комплекте имеет ряд заранее созданных эвентов и сторов, облегчающих стандартные действия

При императивном вызове всегда возвращает Promise с результатом.

Может иметь один аргумент или не иметь ни одного

[Effect](/ru/api/effector/Effect) в документации

## Domain

_Domain_ это способ группировки и применения массовых обработок к юнитам. Домены получают уведомления о создании событий, сторов, эффектов и вложенных доменов. Часто используются для логирования и SSR

[Domain](/ru/api/effector/Domain) в документации

## Unit (#unit)

Тип данных, используемый для описания бизнес-логики приложений. Большинство методов эффектора имеют дело с обработкой юнитов.
Существует пять типов юнитов: [_Store_](/ru/api/effector/Store), [Event](/ru/api/effector/Event), [Effect](/ru/api/effector/Effect), [Domain](/ru/api/effector/Domain) и [_Scope_](/ru/api/effector/Scope)

## Common unit (#common-unit)

Обычные юниты можно использовать для запуска обновлений других юнитов. Существует три типа обычных юнитов: [Store (стор)](/ru/api/effector/Store), [Event (событие)](/ru/api/effector/Event) и [Effect (эффект)](/ru/api/effector/Effect). **Когда метод принимает юниты, это означает, что он принимает события, эффекты и сторы** в качестве источника реактивных обновлений

## Purity (#purity)

Большинство функций, передаваемых в методы api не должны вызывать другие события или эффекты: легче рассуждать о потоке данных приложения, когда императивные триггеры сгруппированы внутри обработчиков эффектов, а не рассредоточены по всей бизнес-логике

**Правильно**, императивно:

```js
import { createStore, createEvent } from "effector";

const login = createStore("guest");

const loginSize = login.map((login) => login.length);

const submitLoginSize = createEvent();

loginSize.watch((size) => {
  submitLoginSize(size);
});
```

[Запустить пример](https://share.effector.dev/D5hV8C70)

`store.map` [в документации](/ru/api/effector/Store#map-fn)

`store.watch` [в документации](/ru/api/effector/Store#watch-watcher)

**Правильно**, декларативно:

```js
import { createStore, createEvent, forward } from "effector";

const login = createStore("guest");

const loginSize = login.map((login) => login.length);

const submitLoginSize = createEvent();

forward({
  from: loginSize,
  to: submitLoginSize,
});
```

[Запустить пример](https://share.effector.dev/it0gXQLI)

[forward in docs](/ru/api/effector/forward)

**Неправильно**:

```js
import { createStore, createEvent, forward } from "effector";

const submitLoginSize = createEvent();

const login = createStore("guest");
const loginSize = login.map((login) => {
  // лучше переместить этот вызов в watch или эффект
  submitLoginSize(login.length);
  return login.length;
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

_Watcher_ – функция с сайд-эффектами, для работы которых не нужны возможности по перехвату ошибок и уведомления подписчиков об завершении асинхронной работы. Используется в [event.watch](/ru/api/effector/Event#watch-watcher), [store.watch](/ru/api/effector/Store#watchwatcher) и [хуках домена](/ru/api/effector/Domain#oncreateeventhook). Возвращаемое значение игнорируется

## Subscription

```typescript
type Subscription = {
  (): void;
  unsubscribe(): void;
};
```

Функция отмены подписки, после её вызова [watcher](#watcher) перестаёт получать обновления и удаляется из памяти. Повторные вызовы функции отмены подписки не делают ничего

:::warning{title="Предупреждение"}
**Ручное управление подписками мешает сосредоточиться на управлении данными и бизнес-логикой**
<br/><br/>
Эффектор предоставляет широкий набор возможностей, чтобы свести необходимость удаления подписок к минимуму. Это отличает его от большинства других реактивных библиотек
:::

[effect]: /ru/api/effector/Effect
[store]: /ru/api/effector/Store
[event]: /ru/api/effector/Event
[domain]: /ru/api/effector/Domain
[scope]: /ru/api/effector/Scope
