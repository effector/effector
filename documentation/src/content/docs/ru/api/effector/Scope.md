---
title: Scope
description: Независимый изолированный инстанс приложения
lang: ru
---

Независимый изолированный инстанс приложения, содержит копию всех юнитов (включая связи между ними) и основные методы для доступа к ним.

Основные области применения – реализация SSR и тестирование приложения.

Scope может быть создан с помощью [fork](/ru/api/effector/fork)

## Формула

```ts
interface Scope {
  getState<T>(store: Store<T>): T;
}
```

## Методы (#methods)

### getState

Возвращает значение [стора](/ru/api/effector/Store) в данном scope

```ts
scope.getState<T>(store: Store<T>): T
```

#### Пример использования getState

Создание двух инстансов приложения, вызов событий в них и проверка сохранения значения стора `$counter` в каждом из них

```js
import { createStore, createEvent, createDomain, forward, fork, allSettled } from "effector";

const domain = createDomain();
const inc = domain.createEvent();
const dec = domain.createEvent();
const $counter = domain
  .createStore(0)
  .on(inc, (value) => value + 1)
  .on(dec, (value) => value - 1);

const scopeA = fork(domain);
const scopeB = fork(domain);

await allSettled(inc, { scope: scopeA });
await allSettled(dec, { scope: scopeB });

console.log($counter.getState()); // => 0
console.log(scopeA.getState($counter)); // => 1
console.log(scopeB.getState($counter)); // => -1
```

[Запустить пример](https://share.effector.dev/0grlV3bA)

## Императивные вызовы эффектов и scope

Если эффект вызывает другие эффекты, то он может вызывать **только** эффекты, а не обычные асинхронные функции, и вызовы эффектов должны иметь await:

**Правильно**, эффект без внутренних эффектов:

```js
const delayFx = app.createEffect(async () => {
  await new Promise((rs) => setTimeout(rs, 80));
});
```

**Правильно**, эффект с внутренними эффектами:

```js
const authUserFx = app.createEffect();
const sendMessageFx = app.createEffect();

const sendWithAuthFx = app.createEffect(async () => {
  await authUserFx();
  await delayFx();
  await sendMessageFx();
});
```

**Неправильно**, эффект с внутренними эффектами после обычных асинхронных вызовов:

```js
const sendWithAuthFx = app.createEffect(async () => {
  await authUserFx();
  //НЕ ПРАВИЛЬНО! этот код следует сделать отдельным эффектом delayFx
  await new Promise((rs) => setTimeout(rs, 80));
  //потеря контекста
  await sendMessageFx();
});
```

Таким образом, любой эффект может либо вызывать другой эффект, либо выполнять некоторые асинхронные вычисления, но не то и другое

:::tip
Вместо императивных вызовов оптимальнее использовать [attach](/ru/api/effector/attach)
:::

:::warning
Императивные вызовы эффектов поддерживаются только в обработчиках других эффектов, **не** в `watch` функциях
:::
