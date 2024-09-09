---
title: forward
description: Метод для создания связи между юнитами в декларативной форме. Отправляет обновления из одного набора юнитов в другой
redirectFrom:
  - /api/effector/forward
  - /docs/api/effector/forward
---

```ts
import { forward, type Subscription } from "effector";
```

Метод для создания связи между юнитами в декларативной форме. Отправляет обновления из одного набора юнитов в другой

# Methods (#methods)

## `forward({ from, to })` (#methods-forward)

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0).

С версии [effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0) рекомендуется использовать [sample](/ru/api/effector/sample) вместо `forward`.
:::

### Формула

```ts
forward({
  from: Unit | Unit[],
  to: Unit | Unit[]
}): Subscription
```

### Аргументы (#args)

1. `from` ([Unit | Unit\[\]](/en/explanation/glossary#common-unit)): Source of updates. Forward will listen for changes of these units

   - if an [_Event_] is passed, `to` will be triggered on each event trigger and receives event argument
   - if a [_Store_] is passed, `to` will be triggered on each store **change** and receives new value of the store
   - if an [_Effect_] is passed, `to` will be triggered on each effect call and receives effect parameter
   - if an array of [units](/en/explanation/glossary#common-unit) is passed, `to` will be triggered when any unit in `from` array is triggered

2. `to` ([Unit | Unit\[\]](/en/explanation/glossary#common-unit)): Target for updates. `forward` will trigger these units with data from `from`
   - if passed an [_Event_], it will be triggered with data from `from` unit
   - if passed a [_Store_], data from `from` unit will be written to store and **trigger its update**
   - if passed an [_Effect_], it will be called with data from `from` unit as parameter
   - if `to` is an array of [units](/en/explanation/glossary#common-unit), each unit in that array will be triggered

### Возвращает (#return)

[Subscription](/ru/explanation/glossary#subscription): Функция отмены подписки, после её вызова реактивная связь между `from` и `to` разрушается It breaks connection between `from` and `to`. After call, `to` will not be triggered anymore.

:::info{title="since"}
Массивы юнитов поддерживаются с [effector 20.6.0](https://changelog.effector.dev/#effector-20-6-0)
:::

### Примеры

#### Send store updates to another store (#methods-forward-examples-send-store-updates)

```js
import { createStore, createEvent, forward } from "effector";

const $store = createStore(1);
const event = createEvent();

forward({
  from: event,
  to: $store,
});

$store.watch((state) => console.log("store changed: ", state));
// => store changed: 1

event(200);
// => store changed: 200
```

[Запустить пример](https://share.effector.dev/UeJbgRG9)

#### Forward between arrays of units (#methods-forward-examples-forward-between-arrays)

```js
import { createEvent, forward } from "effector";

const firstSource = createEvent();
const secondSource = createEvent();

const firstTarget = createEvent();
const secondTarget = createEvent();

forward({
  from: [firstSource, secondSource],
  to: [firstTarget, secondTarget],
});

firstTarget.watch((e) => console.log("first target", e));
secondTarget.watch((e) => console.log("second target", e));

firstSource("A");
// => first target A
// => second target A
secondSource("B");
// => first target B
// => second target B
```

[Запустить пример](https://share.effector.dev/8aVpg8nU)

[_effect_]: /en/api/effector/Effect
[_store_]: /en/api/effector/Store
[_event_]: /en/api/effector/Event
