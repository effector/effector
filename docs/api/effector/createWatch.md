---
id: createWatch
title: createWatch
---

Creates a subscription on unit (store, event or effect).

```ts
createWatch<T>(config: {
  unit: Unit<T>
  fn: (payload: T) => void
  scope?: Scope
}): Subscription
```

**Arguments**

1. `config` (_Object_): Configuration
   - `unit` (_Unit_): Target unit (store, event of effect) that will be watched
   - `fn` (_Function_): Function that will be called when unit is triggered. Accepts unit payload as the first argument.
   - `scope` ([_Scope_](./Scope.md)): An optional scope object (forked instance) to restrict watcher calls on particular scope.

**Returns**

[_Subscription_](../../explanation/glossary.md#subscription): Unsubscribe function

#### Example (scope)

```js
import {createWatch, createEvent, fork, allSettled} from 'effector'

const changeName = createEvent()

const scope = fork()

const unwatch = createWatch({unit: changeName, scope, fn: console.log})

await allSettled(changeName, {scope, params: 'John'}) // output: John
changeName('John') // no output
```

#### Example (no scope)

```js
import {createWatch, createEvent, fork, allSettled} from 'effector'

const changeName = createEvent()

const scope = fork()

const unwatch = createWatch({unit: changeName, fn: console.log})

await allSettled(changeName, {scope, params: 'John'}) // output: John
changeName('John') // output: John
```
