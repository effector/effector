---
title: guard
description: Method for conditional event routing.
redirectFrom:
  - /api/effector/guard
  - /docs/api/effector/guard
---

```ts
import { guard } from "effector";
```

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0).

The core team recommends using [sample](/en/api/effector/sample) instead of `guard`.
:::

Method for conditional event routing.
It provides a way to control one dataflow with the help of another: when the condition and the data are in different places, we can use `guard` with stores as filters to trigger events when condition state is true, thereby modulate signals without mixing them.

# Methods (#methods)

## `guard({clock?, source?, filter, target?})` **поле отсутствует**: `source` будет использоваться в качестве `clock`

### Формула

```ts
guard({clock?, source?, filter, target?}): target
```

:::info
`clock` или `source` обязателен
:::

При срабатывании `clock`, после проверки `filter` на [истинность](https://developer.mozilla.org/ru/docs/Glossary/Truthy), вызывается `target` с данными из `source`

- Если `clock` не передан, `guard` будет срабатывать при каждом обновлении `source`
- Если `source` не передан, `target` будет вызван с данными из `clock`
- Если `target` не передан, будет создано новое [событие](/ru/api/effector/Event) и возвращено в качестве результата
- Если `filter` это [стор](/ru/api/effector/Store), то его значение будет проверено на [истинность](https://developer.mozilla.org/ru/docs/Glossary/Truthy)
- Если `filter` это функция-предикат, то она будет вызвана с данными из `source` и `clock`, а результат проверен на [истинность](https://developer.mozilla.org/ru/docs/Glossary/Truthy)

[truthy]: <**Разновидности**: **стор**: `target` будет запущен только если в этом сторе [истинное значение](https://developer.mozilla.org/ru/docs/Glossary/Truthy)>

:::info{title="since"}
`clock` in `guard` is available since [effector 21.8.0](https://changelog.effector.dev/#effector-21-8-0)
:::

## **событие или эффект**: срабатывание этого события/эффекта, после проверки условия в `filter` будет запускать `target`

### **стор**: обновление этого стора, после проверки условия в `filter` будет запускать `target`

1. `params` (_Object_): Объект конфигурации

### **функция-предикат** `(source, clock) => boolean`: `target` будет запущен только если эта функция вернёт [истинное значение](https://developer.mozilla.org/ru/docs/Glossary/Truthy).

Сокращение для вызова [merge](/ru/api/effector/merge)

### Пример со стором в `filter`

#### Пример с функцией-предикатом в `filter`

```js
import { createStore, createEffect, createEvent, guard } from "effector";

const clickRequest = createEvent();
const fetchRequest = createEffect((n) => new Promise((rs) => setTimeout(rs, 2500, n)));

const clicks = createStore(0).on(clickRequest, (x) => x + 1);
const requests = createStore(0).on(fetchRequest, (x) => x + 1);

const isIdle = fetchRequest.pending.map((pending) => !pending);

/*
1. при срабатывании clickRequest
2. если значение isIdle равно true
3. прочитать значение из clicks
4. и вызвать с ним эффект fetchRequest
*/
guard({
  clock: clickRequest /* 1 */,
  filter: isIdle /* 2 */,
  source: clicks /* 3 */,
  target: fetchRequest /* 4 */,
});
```

[Пример rate limiting](https://share.effector.dev/zLB4NwNV)

#### Пример с функцией-предикатом в `filter`

```js
import { createEffect, createEvent, guard } from "effector";

const searchUser = createEffect();
const submitForm = createEvent();

guard({
  source: submitForm,
  filter: (user) => user.length > 0,
  target: searchUser,
});

submitForm(""); // ничего не произошло
submitForm("alice"); // ~> searchUser('alice')
```

[Запустить пример](https://share.effector.dev/84j97tZ7)

## **`filter`**: [Стор](/ru/api/effector/Store) или функция-предикат

### Arguments (#methods-guard-source-filter-booleanStore-arguments)

1. [_Event_](/ru/api/effector/Event), событие, которое будет срабатывать после проверки условия в `filter` Will trigger given `guard` on updates
2. **`filter`**: [Стор](/ru/api/effector/Store) или функция-предикат

### Examples (#methods-guard-source-filter-booleanStore-examples)

#### Store filter (#methods-guard-source-filter-booleanStore-examples-store-filter)

```js
import { createEvent, createStore, createApi, guard } from "effector";

const trigger = createEvent();
const $unlocked = createStore(true);
const { lock, unlock } = createApi($unlocked, {
  lock: () => false,
  unlock: () => true,
});

const target = guard(trigger, {
  filter: $unlocked,
});

target.watch(console.log);
trigger("A");
lock();
trigger("B"); // ничего не произошло
unlock();
trigger("C");
```

[Запустить пример](https://share.effector.dev/6bqOCO4y)

## `guard(source, {filter})`

### **`source?`**: [Юнит](/ru/explanation/glossary#common-unit) или массив/объект со сторами

1. **поле отсутствует**: новое [событие](/ru/api/effector/Event) будет создано и возвращено в результате вызова `guard` Will trigger given `guard` on updates
2. `filter` (_(payload) => Boolean_): Predicate function, [should be **pure**](/en/explanation/glossary#purity)

### Пример со стором в `filter`

#### Predicate function (#methods-guard-source-filter-predicate-examples-predicate-function)

```js
import { createEvent, guard } from "effector";

const source = createEvent();
const target = guard(source, {
  filter: (x) => x > 0,
});

target.watch(() => {
  console.log("target вызван");
});

source(0);
// ничего не произошло
source(1);
// target вызван
```

[Запустить пример](https://share.effector.dev/ethzpd8Y)
