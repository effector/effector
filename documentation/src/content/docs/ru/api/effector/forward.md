---
title: forward
description: Метод для создания связи между юнитами в декларативной форме. Отправляет обновления из одного набора юнитов в другой
lang: ru
---

:::info{title="since"}
С версии [effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0) рекомендуется использовать [sample](/ru/api/effector/sample) вместо `forward`.
:::

Метод для создания связи между юнитами в декларативной форме. Отправляет обновления из одного набора юнитов в другой

## Формула

```ts
declare const a: Event<T>
declare const fxA: Effect<T, any>
declare const $a: Store<T>

declare const b: Event<T>
declare const fxB: Effect<T, any>
declare const $b: Store<T>

forward({from: a, to: b})
forward({
  from: fxA,
  to:   [b, fxB, $b]
})
forward({
  from: [a, fxA, $a],
  to:   fxB
})
forward({
  from: [a, fxA, $a],
  to:   [b, fxB, $b]
})
-> Subscription
```

```

    from -> to

```

### Аргументы (#args)

1. **`config`**: Объект конфигурации

   - **`from`**: [Юнит](/ru/explanation/glossary#common-unit) или массив юнитов

     **Разновидности**:

     - **событие или эффект**: срабатывание этого события/эффекта будет запускать юниты `to`
     - **стор**: обновление этого стора будет запускать юниты `to`
     - **массив юнитов**: срабатывание любого из юнитов будет запускать юниты `to`

   - **`to`**: [Юнит](/ru/explanation/glossary#common-unit) или массив юнитов

     **Разновидности**:

     - **событие или эффект**: при срабатывании `from` будет вызван данный юнит
     - **стор**: при срабатывании `from` состояние юнита будет обновлено
     - **массив юнитов**: при срабатывании `from` будут запущены все юниты

### Возвращает (#return)

[Subscription](/ru/explanation/glossary#subscription): Функция отмены подписки, после её вызова реактивная связь между `from` и `to` разрушается

:::info
Массивы юнитов поддерживаются с [effector 20.6.0](https://changelog.effector.dev/#effector-20-6-0)
:::

Для наилучшей типизации при использовании массивов юнитов, типы значений должны совпадать либо быть явно приведены к общему базису

## Примеры

### Сохранение в сторе данных из события

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

### Создание связи между массивами юнитов

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
