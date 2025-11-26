---
title: sample API
description: sample method API reference - unit composition. Full and short form, usage formula, TypeScript types, return values.
redirectFrom:
  - /api/effector/sample
  - /docs/api/effector/sample
---

[units]: /en/explanation/glossary#common-unit
[eventApi]: /en/api/effector/Event
[storeApi]: /en/api/effector/Store
[effectApi]: /en/api/effector/Effect
[purity]: /en/explanation/glossary/#purity

# `sample` API (#sample-api)

```ts
import { sample } from "effector";
```

The `sample` method is used to connect [units](/en/explanation/glossary#common-unit). Its main purpose is to take data from one place `source` and send it to another `target` when a certain trigger `clock` occurs.

A common use case is when you need to process an event using data from a store. Instead of using `store.getState()`, which can lead to inconsistent state, it's better to use `sample`.

:::tip{title="how to work with sample"}
Learn how to [compose units and use the `sample` method](/en/essentials/unit-composition)
:::

## How it works (#algorithm)

- When `clock` triggers, the value from `source` is read.
- If a `filter` is specified and returns `true`, or if it's a store with `true` value, processing continues.
- If a `fn` is provided, data is transformed.
- Data is then passed to the `target`.

## Special behavior of `sample` (#sample-behavior)

- If `clock` is not provided, `sample` will trigger on every update of `source`.
- If `target` is not provided, `sample` will create and return a new derived [unit][units].

## Returned unit and value (#returned-value)

If `target` is not provided, it will be created at runtime. The type of unit returned depends on this table:

| clock \ source                      | [_Store_](/en/api/effector/Store) | [_Event_](/en/api/effector/Event) | [_Effect_](/en/api/effector/Effect) |
| ----------------------------------- | --------------------------------- | --------------------------------- | ----------------------------------- |
| [_Store_](/en/api/effector/Store)   | `Store`                           | `Event`                           | `Event`                             |
| [_Event_](/en/api/effector/Event)   | `Event`                           | `Event`                           | `Event`                             |
| [_Effect_](/en/api/effector/Effect) | `Event`                           | `Event`                           | `Event`                             |

How to use this table:

1. Pick the type of `clock` (column).
2. Pick the type of `source` (row).
3. The intersecting cell shows the return type.

If `target` is explicitly provided, then that `target` is returned.

Example:

```ts
const event = createEvent();
const $store = createStore();
const $secondStore = createStore();

const $derivedStore = sample({
  clock: $store,
  source: $secondStore,
});
// Returns a derived store because both clock and source are stores

const derivedEvent = sample({
  clock: event,
  source: $store,
});
// Returns a derived event because the clock is an event
```

## Full form (#full-form)

- **Formula**

```ts
sample({
  clock?, // trigger
  source?, // data source
  filter?, // filter predicate
  fn?, // transformation function
  target?, // target unit
  batch?, // batching flag
  name? // unit name
})
```

### `clock` (#clock-argument)

A trigger unit that determines when to sample the [`source`](#source-argument).<br/>
Optional.

- **Type**

```ts
sample({
  clock?: Unit<T> | Unit<T>[],
})
```

Can be:

- [`Event<T>`][eventApi] — triggers on event call
- [`Store<T>`][storeApi] — triggers on store update
- [`Effect<T, Done, Fail>`][effectApi] — triggers on effect execution
- `Unit<T>[]` — triggers when any unit in the array is triggered

:::info{title="either clock or source required"}
Although the `clock` argument is optional, when using the `sample` method you must provide either `clock` or [`source`](#source-argument).
:::

```ts
const clicked = createEvent();
const $store = createStore(0);
const fetchFx = createEffect();

sample({
  source: $data,
  clock: clicked,
});

sample({
  source: $data,
  clock: $store,
});

sample({
  source: $data,
  clock: [clicked, fetchFx.done],
});
```

---

### `source` (#source-argument)

The data source to be read when the `clock` unit triggers.
If `clock` is not provided, then `source` is used as the `clock`.
Optional.

- **Type**

```ts
sample({
  source?: Unit<T> | Unit<T>[] | { [key: string]: Unit<T> },
})
```

Can be:

- [`Store<T>`][storeApi] — reads the current value of the store
- [`Event<T>`][eventApi] — takes the most recent payload from the event
- [`Effect<T, Done, Fail>`][effectApi] — takes the most recent payload from the effect call
- Object of [units][units] — for combining multiple sources
- Array of [units][units] — for combining multiple sources

:::info{title="either source or clock required"}
Although the `source` argument is optional, when using the `sample` method you must provide either `source` or [`clock`](#clock-argument).
:::

---

### `filter` (#filter-argument)

A predicate function or store used to filter the data. If it returns `false` (or is a store that holds `false`), the data will not be passed to `target`.
Optional.

- **Type**

```ts
sample({
  filter?: Store<boolean> | (source: Source, clock: Clock) => (boolean | Store<boolean>),
})
```

Can be:

- [`Store<boolean>`][storeApi] — a boolean store (either base or derived)
- Predicate function — returns a `boolean` value

```ts
const $isUserActive = createStore(false);

sample({
  clock: checkScore,
  source: $score,
  filter: (score) => score > 100,
  target: showWinnerFx,
});

sample({
  clock: action,
  source: $user,
  filter: $isUserActive,
  target: adminActionFx,
});
```

---

### `fn` (#fn-argument)

A function used to transform the data before passing it to the `target`.
The function **must be pure**.
Optional.

- **Type**

```ts
sample({
  fn?: (source: Source, clock: Clock) => Target
})
```

:::info{title="returned data type"}
The type of data returned must match the type of data in `target`.
:::

```ts
const $user = createStore<User>({});
const saveUserFx = createEffect((user: User) => {
  // ...
});

sample({
  clock: updateProfile,
  source: $user,
  fn: (user, updates) => ({ ...user, ...updates }),
  target: saveUserFx,
});

sample({
  clock: submit,
  source: $form,
  fn: (form) => form.email,
  target: sendEmailFx,
});
```

---

### `target` (#target-argument)

The destination unit that will receive the data and be triggered.
Optional.

- **Type**

```ts
sample({
  target?: Unit<T> | Unit<T>[],
})
```

Can be:

- [`EventCallable<T>`](/en/essentials/typescript#event-types) — a regular event (not derived) that will be called
- [`Effect<T, Done, Fail>`][effectApi] — an effect that will be triggered
- [`StoreWritable<T>`](/en/essentials/typescript#store-types) — a writable store that will be updated
- `Unit<T>[]` — all units in the array will be called

:::info{title="target without target"}
If `target` is not specified, `sample` [returns a new derived unit](#returned-value).
:::

```ts
const targetEvent = createEvent<string>();
const targetFx = createEffect<string, void>();
const $targetStore = createStore("");

// Event as target
sample({
  source: $store,
  clock: trigger,
  target: targetEvent,
});

// Effect as target
sample({
  source: $store,
  clock: trigger,
  target: targetFx,
});

// Store as target
sample({
  source: $store,
  clock: trigger,
  target: $targetStore,
});
```

---

### `greedy` (#greedy-argument)

:::warning{title="Deprecated"}
As of effector 23.0.0, the `greedy` property is deprecated.

Use `batch` instead of `greedy`.
:::

---

### `batch` (#batch-argument)

Enables batching of updates for better performance. Default is `true`.
Optional.

- **Type**

```ts
sample({
  batch?: boolean // Default: true
})
```

---

### `name` (#name-argument)

The `name` field allows you to assign a debug-friendly name to the created unit.
Optional.

- **Type**

```ts
sample({
  name?: string
})
```

## Short Form (#short-form)

- **Formula**

```ts
sample(source, clock, fn?): Unit
```

This is a shorthand version of the `sample` method, which always implicitly returns a `target`.

It supports multiple patterns:

1. All arguments: `sample(source, clock, fn)` — with a transformation function
2. Just `source` and `clock`: `sample(source, clock)` — no transformation function
3. `source` and `fn`: `sample(source, fn)` — no `clock`, so `source` acts as the trigger
4. One argument: `sample(source)` — only `source`, which acts as the trigger and the source

- **Return value**

The return type depends on the combination of units used and the return type of [`fn`](#short-form-fn-argument), if present. Otherwise, it falls back to the `source`.

---

### `source` (#short-form-source-argument)

Acts as the data source when the `clock` triggers.
If no `clock` is provided, `source` is used as the trigger.

- **Type**

```ts
sample(source?: Unit<T> | Unit<T>[])
```

Can be:

- [`Store<T>`][storeApi] — current value of the store
- [`Event<T>`][eventApi] — last triggered payload
- [`Effect<T, Done, Fail>`][effectApi] — last payload sent to the effect
- `Unit<T>[]` — array of [units][units] that triggers when any unit is activated

:::info{title="behavior without clock"}
If `clock` is not specified, then `source` behaves as `clock` - that is, it acts as the trigger.
:::

---

### `clock` (#short-form-clock-argument)

The unit that acts as the trigger to read from [`source`](#short-form-source-argument).
Optional.

- **Type**

```ts
sample(clock?: Unit<T> | Unit<T>[])
```

Can be:

- [`Event<T>`][eventApi] — triggered on event call
- [`Store<T>`][storeApi] — triggered on store update
- [`Effect<T, Done, Fail>`][effectApi] — triggered on effect execution
- `Unit<T>[]` — triggers on any unit in the array

```ts
const clicked = createEvent();
const $store = createStore(0);
const fetchFx = createEffect();

sample($data, clicked);

sample($data, $store);
```

---

### `fn` (#short-form-fn-argument)

A transformation function to be applied before sending the result to the implicit target.
The function must be [**pure**][purity].
Optional.

- **Type**

```ts
sample(fn: (source: Source, clock: Clock) => result)
```

- **Example**

```ts
const $userName = createStore("john");

const submitForm = createEvent();

const sampleUnit = sample(
  $userName /* 2 */,
  submitForm /* 1 */,
  (name, password) => ({ name, password }) /* 3 */,
);

submitForm(12345678);

// 1. submitForm is triggered with 12345678
// 2. $userName value is read ("john")
// 3. The values are transformed and passed to sampleUnit
```

---

## Related APIs and Articles (#related-api-and-docs-to-sample)

- **API**

  - [`merge`](/en/api/effector/merge) — Combines updates from an array of units
  - [`Store`](/en/api/effector/Store) — Store description with methods and properties
  - [`Event`](/en/api/effector/Event) — Event description with methods and properties
  - [`Effect`](/en/api/effector/Effect) — Effect description with methods and properties

- **Articles**

  - [Typing units and methods](/en/essentials/typescript)
  - [Unit composition and working with `sample`](/en/essentials/unit-composition)
