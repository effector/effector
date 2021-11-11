---
id: clearNode
title: clearNode
hide_title: true
description: Method for destroying stores, events, effects, subscriptions and domains
---

# clearNode

## `clearNode(unit, config?: {deep?: boolean}): void`


Method for destroying stores, events, effects, subscriptions and domains

**Arguments**

1. `unit` ([_Store_](Store.md)/[_Event_](Event.md)/[_Effect_](Effect.md)/[_Domain_](Domain.md)/[_Scope_](Scope.md)): unit to be erased
2. `config: ({deep?: boolean})` (optional): config object
   - `deep: boolean` (optional): erase node _and_ all of its' computed values

**Returns**

`void`

### Example 1

```js
import {createStore, createEvent, clearNode} from 'effector'

const increment = createEvent()
const $store = createStore(0).on(increment, x => x + 1)

increment.watch(() => console.log('increment called'))
$store.watch(x => console.log('$store state: ', x))
// => $store state: 0

increment()
// => increment called
// => $store state: 1
clearNode($store)
increment()
// => increment called
```

[Try it](https://share.effector.dev/G5pWntyA)

### Example 2 (with deep)

```js
import {createStore, createStoreObject, createEvent, clearNode} from 'effector'

const increment = createEvent()
const trigger = increment.prepend(() => {})

const $store = createStore(0).on(increment, x => x + 1)

trigger.watch(() => console.log('trigger called'))
increment.watch(() => console.log('increment called'))
$store.watch(x => console.log('$store state: ', x))

// => store state: 0
trigger()
// => trigger called
// => increment called
// => store state: 1
clearNode(trigger, {deep: true})
trigger()
// no reaction
increment()
// no reaction!
// all units, which depends on trigger, are erased
// including increment and store, because it depends on increment
```

[Try it](https://share.effector.dev/cLgjVXqJ)
