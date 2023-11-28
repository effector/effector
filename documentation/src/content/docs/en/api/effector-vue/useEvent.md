---
title: useEvent
redirectFrom:
  - /api/effector-vue/useEvent
  - /docs/api/effector-vue/useEvent
---

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) `useEvent` is deprecated. Use [`useUnit`](./useUnit) instead.
:::

Bind event to current fork instance to use in dom event handlers. Used **only** with ssr, in application without forks `useEvent` will do nothing

## `useEvent(unit)` {#useEvent-unit}

### Arguments {#useEvent-unit-arguments}

1. `unit` ([_Event_](/en/api/effector/Event) or [_Effect_](/en/api/effector/Effect)): Event or effect which will be bound to current `scope`

### Returns {#useEvent-unit-returns}

(Function): Function to pass to event handlers. Will trigger a given unit in current scope

### Example {#useEvent-unit-example}

```js
import { createDomain } from "effector";
import { useEvent } from "effector-vue/ssr";

const app = createDomain();

const inc = app.createEvent();
const $count = app.createStore(0).on(inc, (x) => x + 1);

export default {
  setup() {
    const counter = useStore($count);
    const incFn = useEvent(inc);

    return {
      incFn,
      counter,
    };
  },
};
```
