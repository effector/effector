---
title: scopeBind
description: scopeBind is a method to bind unit to scope
redirectFrom:
  - /api/effector/scopeBind
  - /docs/api/effector/scopeBind
---

```ts
import { scopeBind } from "effector";
```

`scopeBind` is a method to bind a unit (an Event or Effect) to a [Scope](/en/api/effector/Scope) to be called later. Effector supports imperative calling of events within watchers, however, there are instances where you must explicitly bind events to the scope, such as when triggering events from within `setTimeout` or `setInterval` callbacks.

# Methods (#scopeBind-methods)

## `scopeBind(event, options?)` (#scopeBind-methods-scopeBind-event)

### Formulae (#scopeBind-methods-scopeBind-event-formulae)

```ts
scopeBind<T>(event: EventCallable<T>): (payload: T) => void
scopeBind<T>(event: EventCallable<T>, options?: {scope?: Scope, safe?: boolean}): (payload: T) => void
```

### Arguments (#scopeBind-methods-scopeBind-event-arguments)

1. `event` [_EventCallable_](/en/api/effector/Event) or [_Effect_](/en/api/effector/Effect) to be bound to the scope.
2. `options` (_Object_): Optional configuration.
   - `scope` (_Scope_): Scope to bind event to.
   - `safe` (_Boolean_): Flag for exception suppression if there is no scope.

### Returns (#scopeBind-methods-scopeBind-event-returns)

`(payload: T) => void` — A function with the same types as `event`.

### Examples (#scopeBind-methods-scopeBind-event-examples)

#### Basic Usage (#scopeBind-methods-scopeBind-event-examples-basic-usage)

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

## `scopeBind(callback, options?)` (#scopeBind-methods-scopeBind-callback)

Binds arbitrary callback to a scope to be called later. The bound version of the function retains all properties of the original, e.g., if the original function would throw when called with a certain argument, the bound version will also throw under the same circumstances.

:::info{title="since"}
Feature is available since `effector 23.1.0` release.
:::

:::warning
To be compatible with the Fork API, callbacks **must** adhere to the same rules as `Effect` handlers:

- Synchronous functions can be used as they are.
- Asynchronous functions must follow the [rules described in "Imperative Effect calls with scope"](/en/api/effector/scope/).

:::

### Formulae (#scopeBind-methods-scopeBind-callback-formulae)

```ts
scopeBind(callback: T, options?: { scope?: Scope; safe?: boolean }): (payload: T) => void;
```

### Arguments (#scopeBind-methods-scopeBind-callback-arguments)

1. `callback` (_Function_): Any function to be bound to the scope.
2. `options` (_Object_): Optional configuration.
   - `scope` (_Scope_): Scope to bind the event to.
   - `safe` (_Boolean_): Flag for exception suppression if there is no scope.

### Returns (#scopeBind-methods-scopeBind-callback-returns)

`(payload: T) => void` — A function with the same types as `callback`.

### Examples (#scopeBind-methods-scopeBind-callback-examples)

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
