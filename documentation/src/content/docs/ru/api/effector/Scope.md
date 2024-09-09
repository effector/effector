---
title: Scope
redirectFrom:
  - /api/effector/Scope
  - /docs/api/effector/scope
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

Для сценариев, когда эффект может вызывать другой эффект или выполнять асинхронные вычисления, но не то и другое одновременно, рассмотрите использование метода [attach](/ru/api/effector/attach) для более лаконичных императивных вызовов.

## Потеря `scope` (#scope-loss)

Это проблема именно эффектора?\*\*. **Чем грозит вызов эффектов после асинхронных функций?** Состояние, в которое попадает приложение после подобного вызова называется "потеря скоупа", это означает, что после завершения вызова обычной асинхронной функции, все последующие действия попадут в глобальный режим (это то, что работает при прямом вызове `$store.getState()`), то есть все обновления данных **не попадут** в scope в котором велась работа, и как следствие, клиенту отправится неконсистентное состояние As a result, an inconsistent state will be sent to the client.

Императивные вызовы эффектов в этом плане безопасны, потому что effector запоминает scope в котором начинался императивный вызов эффекта и при завершении вызова восстанавливает его обратно, что позволяет сделать ещё один вызов подряд

Можно вызывать методы `Promise.all([fx1(), fx2()])` и прочие из стандартного api javascript, потому что в этих случаях вызовы эффектов по прежнему происходят синхронно и скоуп безопасно сохраняется

Все правила рассказанные для эффектов так же относятся и к императивным вызовам эвентов

Есть ситуации, когда вызова вне scope избежать нельзя, типичные примеры это `setInterval` и `history.listen`. Для того, чтобы безопасно передать в эти функции эффект (или эвент) можно воспользоваться методом [scopeBind](/ru/api/effector/scopeBind), он создаёт функцию, привязанную к скоупу в котором метод был вызван, позволяя безопасно вызывать её в дальнейшем It creates a function bound to the scope in which the method was called, allowing it to be safely called later.

```js
const sendWithAuthFx = createEffect(async () => {
  // Теперь эту функцию можно безопасно вызывать
  // без соблюдения правил потери скоупа
  const sendMessage = scopeBind(sendMessageFx);

  await authUserFx();

  // Контекста внутри setInterval нет, но наша функция привязана
  return setInterval(sendMessage, 500);
});
```

:::tip{title="Keep помнить"}
Не забывайте очищать setInterval после завершения работы со скоупом во избежания утечек памяти. Очищать setInterval можно отдельным эффектом, предварительно вернув из первого эффекта его id и сохранив в отдельный стор
:::

**Можно ли как-то обойти потерю скоупа? Is this an issue specific to effector?** This is a general principle of working with asynchrony in JavaScript. Это общий принцип работы с асинхронностью в JavaScript, все технологии, которые сталкиваются с необходимостью сохранения контекста в котором происходят вызовы так или иначе обходят это затруднение. Самый характерный пример это [zone.js](https://github.com/angular/angular/tree/main/packages/zone.js), который для сохранения контекста оборачивает все асинхронные глобальные функции вроде `setTimeout` или `Promise.resolve`. Также способами решения этой проблемы бывает использование генераторов или `ctx.schedule(() => asyncCall())`.

**Будет ли общее для всех решение проблемы потери контекста?** Да. Новый proposal в язык под названием [async context](https://github.com/tc39/proposal-async-context) призван решить эту проблему один раз и для всех, он позволит запустив асинхронную логику один раз, получать данные из контекста во всех связанных с ней вызовах, как бы они не происходили. Независимый изолированный инстанс приложения Как только предложение войдёт в язык и получит широкую поддержку, effector обязательно переключится на это решение и правила вызовов эффектов уйдут в прошлое

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
