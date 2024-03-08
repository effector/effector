---
title: clearNode
description: Method for destroying stores, events, effects, subscriptions, and domains
redirectFrom:
  - /api/effector/clearNode
  - /docs/api/effector/clearnode
---

# Methods {#methods}

## `clearNode` {#clearNode}

### Formulae {#clearNode-formulae}

```ts
clearNode(unit, config?: {deep?: boolean}): void
```

Method for destroying stores, events, effects, subscriptions, and domains.

### Arguments {#clearNode-arguments}

1. `unit` ([_Store_](/en/api/effector/Store)/[_Event_](/en/api/effector/Event)/[_Effect_](/en/api/effector/Effect)/[_Domain_](/en/api/effector/Domain)/[_Scope_](/en/api/effector/Scope)): unit to be erased.
2. `config: ({deep?: boolean})` (optional): config object.
   - `deep: boolean` (optional): erase node _and_ all of its computed values.

### Returns {#clearNode-returns}

`void`

### Examples {#clearNode-examples}

#### Simple {#clearNode-examples-simple}

```js
import { createStore, createEvent, clearNode } from "effector";

const inc = createEvent();
const $store = createStore(0).on(inc, (x) => x + 1);

inc.watch(() => console.log("inc called"));
$store.watch((x) => console.log("store state: ", x));
// => store state: 0
inc();
// => inc called
// => store state: 1
clearNode($store);
inc();
// => inc called
```

[Try it](https://share.effector.dev/WjuSl6aN)

#### Deep clear {#clearNode-examples-deep}

```js
import { createStore, createEvent, clearNode } from "effector";

const inc = createEvent();
const trigger = inc.prepend(() => {});
const $store = createStore(0).on(inc, (x) => x + 1);

trigger.watch(() => console.log("trigger called"));
inc.watch(() => console.log("inc called"));
$store.watch((x) => console.log("store state: ", x));
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

[Try it](https://share.effector.dev/EkETZtKI)
