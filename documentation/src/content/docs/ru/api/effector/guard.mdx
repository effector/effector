---
title: guard
description: Метод для запуска юнитов по условию, условием может быть функция-предикат или отдельный стор. Позволяет описывать бизнес-правила независимо от других сущностей
lang: ru
---

:::info
C effector 22.2.0 предпочтительнее использовать [sample](/ru/api/effector/sample)
:::

:::info
Добавлен в effector 20.4.0
:::

Метод для запуска юнитов по условию, условием может быть функция-предикат или отдельный стор. Позволяет описывать бизнес-правила независимо от других сущностей.
Типичный вариант использования – когда необходимо запускать события лишь когда в определённом сторе значение равно `true`. Тем самым обеспечивается управление потоками данных без их смешивания

## Формула

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

:::info
`clock` добавлен в effector 21.8.0
:::

## `guard({clock?, source?, filter, target?})`

Основная запись метода

**Аргументы**

`params` (_Object_): Объект конфигурации

- **`filter`**: [Стор](/ru/api/effector/Store) или функция-предикат

  **Разновидности**:

  - **стор**: `target` будет запущен только если в этом сторе [истинное значение](https://developer.mozilla.org/ru/docs/Glossary/Truthy)
  - **функция-предикат** `(source, clock) => boolean`: `target` будет запущен только если эта функция вернёт [истинное значение](https://developer.mozilla.org/ru/docs/Glossary/Truthy). Функция [должна быть **чистой**](/ru/explanation/glossary#purity)

- **`clock?`**: [Юнит](/ru/explanation/glossary#common-unit) или массив юнитов

  **Разновидности**:

  - **событие или эффект**: срабатывание этого события/эффекта, после проверки условия в `filter` будет запускать `target`
  - **стор**: обновление этого стора, после проверки условия в `filter` будет запускать `target`
  - **массив юнитов**: срабатывание любого из юнитов, после проверки условия в `filter` будет запускать `target`. Сокращение для вызова [merge](/ru/api/effector/merge)
  - **поле отсутствует**: `source` будет использоваться в качестве `clock`

- **`source?`**: [Юнит](/ru/explanation/glossary#common-unit) или массив/объект со сторами

  **Разновидности**:

  - **событие или эффект**: при срабатывании `clock` будет взято последнее значение с которым запускался этот юнит (перед этим он должен будет запуститься хотя бы раз)
  - **стор**: при срабатывании `clock` будет взято текущее значение этого стора
  - **массив или объект со сторами**: при срабатывании `clock` будут взяты текущие значения из заданных сторов, объединенных в объект или массив. Сокращение для вызова [combine](/ru/api/effector/combine)
  - **поле отсутствует**: `clock` будет использоваться в качестве `source`

- **`target?`**: [Юнит](/ru/explanation/glossary#common-unit) или массив юнитов

  **Разновидности**:

  - **событие или эффект**: при срабатывании `clock`, после проверки условия в `filter` будет вызван данный юнит
  - **стор**: при срабатывании `clock`, после проверки условия в `filter` состояние юнита будет обновлено
  - **массив юнитов**: при срабатывании `clock`, после проверки условия в `filter` будут запущены все юниты
  - **поле отсутствует**: новое [событие](/ru/api/effector/Event) будет создано и возвращено в результате вызова `guard`

**Возвращает**

[_Event_](/ru/api/effector/Event), событие, которое будет срабатывать после проверки условия в `filter`

### Пример со стором в `filter`

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

### Пример с функцией-предикатом в `filter`

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

## `guard(source, {filter})`

Альтернативная запись метода

**Аргументы**

- **`source`**: [Юнит](/ru/explanation/glossary#common-unit)
- **`filter`**: [Стор](/ru/api/effector/Store) или функция-предикат

  **Разновидности**:

  - **стор**: `target` будет запущен только если в этом сторе [истинное значение](https://developer.mozilla.org/ru/docs/Glossary/Truthy)
  - **функция-предикат** `(source) => boolean`: `target` будет запущен только если эта функция вернёт [истинное значение](https://developer.mozilla.org/ru/docs/Glossary/Truthy). Функция [должна быть **чистой**](/ru/explanation/glossary#purity)

#### Пример со стором в `filter`

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

#### Пример с функцией-предикатом в `filter`

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
