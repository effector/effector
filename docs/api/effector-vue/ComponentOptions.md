---
id: component-options
title: ComponentOptions
---

## ComponentOptions Properties

### `effector`

**Returns**

(_`Function | Object | Store`_): `Store` or object of `Store`, or function which will be called with Component instance as `this`

#### Example

```js
import Vue from 'vue'
import {createStore} from 'effector'

const counter = createStore(0)

new Vue({
  data() {
    return {
      foo: 'bar',
    }
  },
  effector() {
    // would create `state` in template
    return combine(
      this.$store(() => this.foo),
      counter,
      (foo, counter) => `${foo} + ${counter}`,
    )
  },
})
```

```js
new Vue({
  effector: {
    counter, // would create `counter` in template
  },
})
```

```js
new Vue({
  effector: counter, // would create `state` in template
})
```
