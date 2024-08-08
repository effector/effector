---
title: Scope
description: Независимый изолированный инстанс приложения
lang: ru
---

```ts
import { type Scope } from "effector";
```

`Scope` - это полностью изолированный экземпляр приложения.
Основное назначение Scope включает SSR (Server-Side Rendering), но не ограничивается этим случаем использования. `Scope` содержит независимую копию всех юнитов (включая связи между ними) и основные методы для доступа к ним.

`Scope` можно создать с помощью [fork](/ru/api/effector/fork).

## Императивные вызовы эффектов с использованием scope (#scope-imperativeEffectCalls)

При выполнении императивных вызовов эффектов внутри обработчиков эффектов это поддерживается, но **не** внутри функций `watch`. Для обработчиков эффектов, которые вызывают другие эффекты, убедитесь, что вы вызываете только эффекты, а не обычные асинхронные функции. Кроме того, вызовы эффектов должны быть ожидаемыми:

**✅ Правильное использование эффекта без вложенных эффектов:**

```js
const delayFx = createEffect(async () => {
  await new Promise((resolve) => setTimeout(resolve, 80));
});
```

**✅ Правильное использование эффекта с вложенными эффектами:**

```js
const authUserFx = createEffect();
const sendMessageFx = createEffect();

const sendWithAuthFx = createEffect(async () => {
  await authUserFx();
  await delayFx();
  await sendMessageFx();
});
```

**❌ Неправильное использование эффекта с вложенными эффектами:**

```js
const sendWithAuthFx = createEffect(async () => {
  await authUserFx();

  // Неправильно! Это должно быть обернуто в эффект.
  await new Promise((resolve) => setTimeout(resolve, 80));

  // Контекст здесь теряется.
  await sendMessageFx();
});
```

Для сценариев, когда эффект может вызывать другой эффект или выполнять асинхронные вычисления, но не то и другое одновременно, рассмотрите использование метода [attach](/en/api/effector/attach) для более лаконичных императивных вызовов.

# Методы (#methods)

## `.getState($store)` (#methods-getState)

Возвращает значение хранилища в данном `Scope`.

### Формулы (#methods-getState-formulae)

```ts
const scope: Scope;
const $value: Store<T> | StoreWritable<T>;

const value: T = scope.getState($value);
```

### Возвращает (#methods-getState-returns)

`T` значение хранилища

### Примеры (#methods-getState-examples)

Создайте два экземпляра приложения, вызовите события в них и проверьте значение хранилища `$counter` в обоих экземплярах:

```js
import { createStore, createEvent, fork, allSettled } from "effector";

const inc = createEvent();
const dec = createEvent();
const $counter = createStore(0);

$counter.on(inc, (value) => value + 1);
$counter.on(dec, (value) => value - 1);

const scopeA = fork();
const scopeB = fork();

await allSettled(inc, { scope: scopeA });
await allSettled(dec, { scope: scopeB });

console.log($counter.getState()); // => 0
console.log(scopeA.getState($counter)); // => 1
console.log(scopeB.getState($counter)); // => -1
```

[Попробовать](https://share.effector.dev/0grlV3bA)
```
