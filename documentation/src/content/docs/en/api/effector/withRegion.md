---
title: withRegion
redirectFrom:
  - /api/effector/withRegion
  - /docs/api/effector/withRegion
---

```ts
import { withRegion } from "effector";
```

The method is based on the idea of region-based memory management (see [Region-based memory management](https://en.wikipedia.org/wiki/Region-based_memory_management) for reference).

# Methods (#methods)

## `withRegion(unit, callback)` (#methods-withRegion)

:::info{title="since"}
[effector 20.11.0](https://changelog.effector.dev/#effector-20-11-0)
:::

The method allows to explicitly transfer ownership of all units (including links created with `sample`, `forward`, etc...) defined in the callback to `unit`. As an implication, all the created links will be erased as soon as `clearNode` is called on [_Unit_](/en/explanation/glossary#unit).

### Formulae (#methods-withRegion-unit-callback-formulae)

```ts
withRegion(unit: Unit<T> | Step, callback: () => void): void
```

### Arguments (#methods-withRegion-unit-callback-arguments)

1. `unit`: _Unit_ | _Step_ — which will serve as "local area" or "region" owning all the units created within the provided callback.
2. `callback`: `() => void` — The callback where all the relevant units should be defined.

### Examples (#methods-withRegion-unit-callback-examples)

```js
import { createDomain, createEvent, restore, withRegion, clearNode } from "effector";

const first = createEvent();
const second = createEvent();
const $store = restore(first, "");
const domain = createDomain();

withRegion(domain, () => {
  // Following links created with `forward` or `sample` are owned by the provided unit `domain`
  // and will be disposed as soon as `clearNode` is called on `domain`.
  forward({
    from: second,
    to: first,
  });
});

$store.watch(console.log);

first("hello");
second("world");

clearNode(domain);

second("will not trigger updates of `$store`");
```
