---
title: useUnit
description: TODO
redirectFrom:
  - /docs/api/effector-vue/useUnit
---

Bind [_Stores_](../effector/Store) to Vue reactivity system or, in the case of [_Events_](../effector/Event)/[_Effects_](../effector/Effect) - bind to current [_Scope_](../effector/Scope) to use in DOM event handlers.

**Designed for Vue 3 and Composition API exclusively.**

:::info{title="Future"}
This API can completely replace the following APIs:

- [useStore(store)](./useStore)
- [useEvent(event)](./useEvent)

In the future, these APIs can be deprecated and removed.

:::

## `useUnit(unit)`

**Arguments**

1. `unit` ([_Event_](../effector/Event) or [_Effect_](../effector/Effect)): Event or effect which will be bound to current [_Scope_](../effector/Scope)

**Returns**

(Function): Function to pass to event handlers. Will trigger given unit in current scope

### Example

```js
// model.js
import {createEvent, createStore, fork} from 'effector'

const inc = createEvent()
const $count = createStore(0).on(inc, x => x + 1)
```

```html
// App.vue

<script setup>
import {useUnit} from 'effector-vue/composition'

import {inc, $count} from './model.js'

const onClick = useUnit(inc)
</script>

<template>
  <button @click="onClick">increment</button>
</template>
```

## `useUnit(store)`

**Arguments**

1. `store` ([_Store_](../effector/Store)): Store which will be bound to Vue reactivity system

**Returns**

Reactive value of given [_Store_](../effector/Store)

### Example

```js
// model.js
import {createEvent, createStore, fork} from 'effector'

const inc = createEvent()
const $count = createStore(0).on(inc, x => x + 1)
```

```html
// App.vue

<script setup>
import {useUnit} from 'effector-vue/composition'

import {$count} from './model.js'

const count = useUnit($count)
</script>

<template>
  <p>Count: {{ count }}</p>
</template>
```

## `useUnit(shape)`

**Arguments**

1. `shape` Object or array of ([_Events_](../effector/Event) or [_Effects_](../effector/Effect) or [_Stores_](../effector/Store)): Every unit will be processed by `useUnit` and returned as a reactive value in case of [_Store_](../effector/Store) or as a function to pass to event handlers in case of [_Event_](../effector/Event) or [_Effect_](../effector/Effect).

**Returns**

(Object or Array):

- if [_Event_](../effector/Event) or [_Effect_](../effector/Effect): functions with the same names or keys as argument to pass to event handlers. Will trigger given unit in current [_Scope_](../effector/Scope).
- if [_Store_](../effector/Store): reactive value of given [_Store_](../effector/Store) with the same names or keys as argument.

### Example

```js
// model.js
import {createEvent, createStore, fork} from 'effector'

const inc = createEvent()
const $count = createStore(0).on(inc, x => x + 1)
```

```html
// App.vue

<script setup>
import {useUnit} from 'effector-vue/composition'

import {$count, inc} from './model.js'

const {count, handleClick} = useUnit({count: $count, handleClick: inc})
</script>

<template>
  <p>Count: {{ count }}</p>
  <button @click="handleClick">increment</button>
</template>
```
