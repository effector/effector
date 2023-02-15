---
title: withRegion
---

# withRegion

:::info{title="since"}
[effector 20.11.0](https://changelog.effector.dev/#effector-20-11-0)
:::

## Formulae {#withRegion-formulae}

```ts
withRegion(unit: Unit<T> | Step, cb: () => void)
```

The method allow to explicitly transfer ownership of all units (including links created with sample, forward, etc...) defined in the callback `cb` to `unit`. As an implication all the created links will be erased as soon as [`clearNode`](./clearNode.md) will be called on [`Unit`](/explanation/glossary.md#unit).

The method based on the idea of region-based memory management (see [Region-based memory management](https://en.wikipedia.org/wiki/Region-based_memory_management) for reference)

### Arguments {#withRegion-arguments}

1. `unit`: Unit | Step which will serve as "local area" or "region" owned all the units created within provided callback `cb`
2. `cb`: () => void Callback where all the relevant units should be defined

## Example {#withRegion-example}

```js
import { createDomain, createEvent, restore, withRegion, clearNode } from "effector";

const first = createEvent();
const second = createEvent();
const $store = restore(first, "");
$store.watch(console.log);

const domain = createDomain();

withRegion(domain, () => {
  // Following links created with `forward` or `sample` are owned by provided unit `domain`
  // and will be disposed as soon as `clearNode` would be called on `domain`
  forward({
    from: second,
    to: first,
  });
});

first("hello");
second("world");

clearNode(domain);

second("will not trigger updates of `store`");
```
