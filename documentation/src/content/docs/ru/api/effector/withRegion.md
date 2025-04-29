---
title: withRegion
lang: ru
---

```ts
import { withRegion } from "effector";
```

Метод основан на идее управления памятью на основе регионов (см. [Region-based memory management](https://en.wikipedia.org/wiki/Region-based_memory_management) для справки).

# Методы (#methods)

## `withRegion(unit, callback)` (#methods-withRegion)

:::info{title="Начиная с"}
[effector 20.11.0](https://changelog.effector.dev/#effector-20-11-0)
:::

Метод позволяет явно передать владение всеми юнитами (включая связи, созданные с помощью `sample`, `forward` и т.д.), определенными в callback, на `unit`. Как следствие, все созданные связи будут удалены, как только будет вызван `clearNode` на [_Unit_](/ru/explanation/glossary#unit).

### Формула (#methods-withRegion-unit-callback-formulae)

```ts
withRegion(unit: Unit<T> | Node, callback: () => void): void
```

### Аргументы (#methods-withRegion-unit-callback-arguments)

1. `unit`: _Unit_ | _Node_ — который будет служить "локальной областью" или "регионом", владеющим всеми юнитами, созданными внутри предоставленного callback. Обычно узел, созданный методом низкого уровня `createNode`, оптимален для этого случая.
2. `callback`: `() => void` — Callback, в котором должны быть определены все соответствующие юниты.

### Примеры (#methods-withRegion-unit-callback-examples)

```js
import { createNode, createEvent, restore, withRegion, clearNode } from "effector";

const first = createEvent();
const second = createEvent();
const $store = restore(first, "");
const region = createNode();

withRegion(region, () => {
  // Следующие связи, созданные с помощью `sample`, принадлежат предоставленному юниту `region`
  // и будут удалены, как только будет вызван `clearNode` на `region`.
  sample({
    clock: second,
    target: first,
  });
});

$store.watch(console.log);

first("привет");
second("мир");

clearNode(region);

second("не вызовет обновлений `$store`");
```
