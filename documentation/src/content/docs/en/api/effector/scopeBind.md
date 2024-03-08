---
title: scopeBind
description: scopeBind is a method to bind unit to scope
redirectFrom:
  - /api/effector/scopeBind
  - /docs/api/effector/scopeBind
---

# `scopeBind(event)` {#scopeBind-event}

A method to bind event or effect to a [Scope](/en/api/effector/Scope) to be called later. effector supports imperative event calling inside watchers, but sometimes you should bind events to the scope explicitly, e.g. when calling events within a setTimeout/setInterval callbacks.

## Formulae {#scopeBind-event-formulae}

```ts
scopeBind<T>(event: Event<T>): (payload: T) => void
scopeBind<T>(event: Event<T>, options?: {scope?: Scope, safe?: boolean }): (payload: T) => void
```

## Arguments {#scopeBind-event-arguments}

1. `event` [_EventCallable_](/en/api/effector/Event) or [_Effect_](/en/api/effector/Effect) to be bound to the scope
2. `options` (_Object_): Optional configuration
   - `scope` (_Scope_): scope binding event to
   - `safe` (_Boolean_): flag for exception suppression if there is no scope.

## Examples {#scopeBind-event-examples}

### Basic Usage {#scopeBind-event-examples-basic-usage}

We are going to call `changeLocation` inside `history.listen` callback so there is no way for effector to associate event with corresponding scope, and we should explicitly bind event to scope using `scopeBind`.

```ts
const $history = createStore(history);
const initHistory = createEvent();
const changeLocation = createEvent<string>();

const installHistoryFx = attach({
  source: $history,
  effect: (history) => {
    const locationUpdate = scopeBind(changeLocation);

    history.listen((location) => {
      locationUpdate(location);
    });
  },
});

sample({
  clock: initHistory,
  target: installHistoryFx,
});
```

[See full example](https://share.effector.dev/nJo1zRil)

# Arbitrary Callback in `scopeBind` {#scopeBind-callback}

Binds arbitrary callback to a scope to be called later.
The "Bounded" version of the function preserves all properties of the original - e.g., if the original would throw if called with some specific argument, then the bounded version will also throw, when called with this argument.

:::info{title="since"}
Feature is available since `effector 23.1.0` release.
:::

:::warning
Notice, that to be compatible with Fork API, callbacks **must** follow the same rules as `Effect` handlers:

- Synchronous can be used as is
- Asynchronous must follow [rules described in "Imperative Effect calls with scope"](/en/api/effector/scope/)

:::

## Formulae {#scopeBind-callback-formulae}

```ts
export function scopeBind<T extends Function>(
  fn: T,
  options?: { scope?: Scope; safe?: boolean },
): T;
```

## Arguments {#scopeBind-callback-arguments}

1. `fn` any function to be bound to the scope
2. `options` (_Object_): Optional configuration
   - `scope` (_Scope_): scope binding event to
   - `safe` (_Boolean_): flag for exception suppression if there is no scope.

## Examples {#scopeBind-callback-examples}

```ts
const locationChanged = createEvent();

const listenToHistoryFx = attach({
  source: $history,
  effect: (history) => {
    return history.listen(
      scopeBind((location) => {
        locationChanged(location);
      }),
    );
  },
});
```
