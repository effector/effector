---
title: ComponentOptions
redirectFrom:
  - /api/effector-vue/ComponentOptions
  - /docs/api/effector-vue/component-options
---

# ComponentOptions (#ComponentOptions)

## `effector` (#ComponentOptions-effector)

### Returns (#ComponentOptions-effector-returns)

(_`Function | Object | Store`_): `Store` or object of `Store`'s, or function which will be called with the Component instance as `this`.

### Examples (#ComponentOptions-effector-examples)

#### Basic Usage (#ComponentOptions-effector-examples-basic)

```js
import Vue from "vue";
import { createStore, combine } from "effector";

const counter = createStore(0);

new Vue({
  data() {
    return {
      foo: "bar",
    };
  },
  effector() {
    // would create `state` in template
    return combine(
      this.$store(() => this.foo),
      counter,
      (foo, counter) => `${foo} + ${counter}`,
    );
  },
});
```

#### Using Object Syntax (#ComponentOptions-effector-examples-object)

```js
import { counter } from "./stores";

new Vue({
  effector: {
    counter, // would create `counter` in template
  },
});
```

#### Using Store Directly (#ComponentOptions-effector-examples-direct)

```js
import { counter } from "./stores";

new Vue({
  effector: counter, // would create `state` in template
});
```
