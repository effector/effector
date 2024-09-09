---
title: clearNode
description: Method for destroying stores, events, effects, subscriptions, and domains
redirectFrom:
  - /api/effector/clearNode
  - /docs/api/effector/clearnode
---

```ts
import { clearNode } from "effector";
```

Method for destroying stores, events, effects, subscriptions, and domains.

# Methods (#methods)

## Низкоуровневый метод для уничтожения юнитов и их связей

### Formulae (#methods-clearNode-unit-config-formulae)

```ts
clearNode(unit: Unit): void
clearNode(unit: Unit, config: {deep?: boolean}): void
```

### Arguments (#methods-clearNode-unit-config-arguments)

1. **`unit`**: Любой [юнит](/ru/explanation/glossary#unit) включая [домены](/ru/api/effector/Domain) и [scope](/ru/api/effector/Scope).
2. **`config?`**: Объект конфигурации
   - **`deep?`**: _boolean_

### Returns (#methods-clearNode-unit-config-returns)

_void_

### Examples (#methods-clearNode-unit-config-examples)

#### Simple (#methods-clearNode-unit-config-examples-simple)

```js
import { createStore, createEvent, clearNode } from "effector";

const inc = createEvent();
const store = createStore(0).on(inc, (x) => x + 1);
inc.watch(() => console.log("inc called"));
store.watch((x) => console.log("store state: ", x));
// => store state: 0
inc();
// => inc called
// => store state: 1
clearNode(store);
inc();
// => inc called
```

[Запустить пример](https://share.effector.dev/WjuSl6aN)

#### Deep clear (#methods-clearNode-unit-config-examples-deep)

```js
import { createStore, createEvent, clearNode } from "effector";

const inc = createEvent();
const trigger = inc.prepend(() => {});
const store = createStore(0).on(inc, (x) => x + 1);
trigger.watch(() => console.log("trigger called"));
inc.watch(() => console.log("inc called"));
store.watch((x) => console.log("store state: ", x));
// => store state: 0
trigger();
// => trigger called
// => inc called
// => store state: 1
clearNode(trigger, { deep: true });
trigger();
// no reaction
inc();
// no reaction!
// all units, which depend on trigger, are erased
// including inc and store, because it depends on inc
```

[Запустить пример](https://share.effector.dev/EkETZtKI)
