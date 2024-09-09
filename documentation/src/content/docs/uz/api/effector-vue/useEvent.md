---
title: useEvent
redirectFrom:
  - /api/effector-vue/useEvent
  - /docs/api/effector-vue/useEvent
---

```ts
import { useEvent } from "effector-vue/ssr";
```

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) `useEvent` is deprecated. Use [`useUnit`](./useUnit#useUnit) instead.
:::

Bind event to current fork instance to use in dom event handlers. Used **only** with ssr, in application without forks `useEvent` will do nothing

# Methods (#methods)

## `useEvent(unit)` (#methods-useEvent-unit)

### Arguments (#methods-useEvent-unit-arguments)

1. `unit` ([_Event_](/en/api/effector/Event) or [_Effect_](/en/api/effector/Effect)): Event or effect which will be bound to current `scope`

### Returns (#methods-useEvent-unit-returns)

(`Function`): Function to pass to event handlers. Will trigger a given unit in current scope

### Examples (#methods-useEvent-unit-examples)

#### Basic (#methods-useEvent-unit-examples-basic)

```js
import { createStore, createEvent } from "effector";
import { useEvent } from "effector-vue/ssr";

const incremented = createEvent();
const $count = createStore(0);

$count.on(incremented, (x) => x + 1);

export default {
  setup() {
    const counter = useStore($count);
    const onIncrement = useEvent(incremented);

    return {
      onIncrement,
      counter,
    };
  },
};
```
