---
id: useUnit
title: useUnit
---

Bind [_Stores_](../effector/Store.md) to Vue reactivity system or, in the case of [_Events_](../effector/Event.md)/[_Effects_](../effector/Effect.md) - bind to current [_Scope_](../effector/Scope.md) to use in DOM event handlers.

**Designed for Vue 3 and Composition API exclusively.**

:::note Future
This API can completely replace the following APIs:

- [useStore(store)](./useStore.md)
- [useEvent(event)](./useEvent.md)

In the future, these APIs can be deprecated and removed.

:::

## `useUnit(unit)`

**Arguments**

1. `unit` ([_Event_](../effector/Event.md) or [_Effect_](../effector/Effect.md)): Event or effect which will be bound to current [_Scope_](../effector/Scope.md)

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

1. `store` ([_Store_](../effector/Store.md)): Store which will be bound to Vue reactivity system

**Returns**

Reactive value of given [_Store_](../effector/Store.md)

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

1. `shape` Object or array of ([_Events_](../effector/Event.md) or [_Effects_](../effector/Effect.md) or [_Stores_](../effector/Store.md)): Every unit will be processed by `useUnit` and returned as a reactive value in case of [_Store_](../effector/Store.md) or as a function to pass to event handlers in case of [_Event_](../effector/Event.md) or [_Effect_](../effector/Effect.md).

**Returns**

(Object or Array):

- if [_Event_](../effector/Event.md) or [_Effect_](../effector/Effect.md): functions with the same names or keys as argument to pass to event handlers. Will trigger given unit in current [_Scope_](../effector/Scope.md).
- if [_Store_](../effector/Store.md): reactive value of given [_Store_](../effector/Store.md) with the same names or keys as argument.

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
