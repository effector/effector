---
title: restore
redirectFrom:
  - /api/effector/restore
  - /docs/api/effector/restore
---

# `restore(event, defaultState)` {#restore-event-defaultState}

Creates a [_StoreWritable_](/en/api/effector/Store) from an [_Event_](/en/api/effector/Event).
It works like a shortcut for `createStore(defaultState).on(event, (_, payload) => payload)`

:::warning{title="It is not a derived store"}
Restore creates a new store. It is not a [DerivedStore](/en/api/effector/Store#readonly). That means you can modify its state via events, and use it as `target` in [sample](/en/api/effector/sample).
:::

## Formulae {#restore-event-defaultState-formulae}

```ts
restore(event, defaultState): StoreWritable
```

## Arguments {#restore-event-defaultState-arguments}

1. `event` [_Event_](/en/api/effector/Event)
2. `defaultState` (_Payload_)

## Returns {#restore-event-defaultState-returns}

[_StoreWritable_](/en/api/effector/Store): New store

## Examples {#restore-event-defaultState-examples}

### Basic Example {#restore-event-defaultState-examples-basic}

```js
import { createEvent, restore } from "effector";

const event = createEvent();
const $store = restore(event, "default");

$store.watch((state) => console.log("state: ", state));
// state: default

event("foo");
// state: foo
```

[Try it](https://share.effector.dev/MGGQnTlQ)

# `restore(effect, defaultState)` {#restore-effect-defaultState}

Creates a [_StoreWritable_](/en/api/effector/Store) out of successful results of an [_Effect_](/en/api/effector/Effect).
It works like a shortcut for `createStore(defaultState).on(effect.done, (_, {result}) => result)`

## Formulae {#restore-effect-defaultState-formulae}

```ts
restore(effect, defaultState): StoreWritable
```

## Arguments {#restore-effect-defaultState-arguments}

1. `effect` [_Effect_](/en/api/effector/Effect)
2. `defaultState` (_Done_)

## Returns {#restore-effect-defaultState-returns}

[_StoreWritable_](/en/api/effector/Store): New store

## Types {#restore-effect-defaultState-types}

Store will have the same type as `Done` from `Effect<Params, Done, Fail`>.
Also, `defaultState` should have `Done` type.

## Examples {#restore-effect-defaultState-examples}

### Effect Example {#restore-effect-defaultState-examples-effect}

```js
import { createEffect, restore } from "effector";

const fx = createEffect(() => "foo");
const $store = restore(fx, "default");

$store.watch((state) => console.log("state: ", state));
// => state: default

await fx();
// => state: foo
```

[Try it](https://share.effector.dev/tP6RQsri)

# `restore(shape)` {#restore-shape}

Creates an object with stores from an object with values

## Formulae {#restore-shape-formulae}

TBD

## Arguments {#restore-shape-arguments}

1. `shape` (_State_)

## Returns {#restore-shape-returns}

[_StoreWritable_](/en/api/effector/Store): New store.

## Examples {#restore-shape-examples}

### Object Example {#restore-shape-examples-object}

```js
import { restore } from "effector";

const { foo: $foo, bar: $bar } = restore({
  foo: "foo",
  bar: 0,
});

$foo.watch((foo) => {
  console.log("foo", foo);
});
// => foo 'foo'
$bar.watch((bar) => {
  console.log("bar", bar);
});
// => bar 0
```

[Try it](https://share.effector.dev/NQX0kotI)
