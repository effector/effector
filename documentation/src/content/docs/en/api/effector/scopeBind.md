---
title: scopeBind
description: scopeBind is a method to bind unit to scope
redirectFrom:
  - /api/effector/scopeBind
  - /docs/api/effector/scopeBind
---

## Formulae {#scopeBind-formulae}

```ts
scopeBind<T>(event: Event<T>): (payload: T) => void
scopeBind<T>(event: Event<T>, options?: {scope?: Scope, safe?: boolean }): (payload: T) => void
```

A method to bind event or effect to a [Scope](/en/api/effector/Scope) to be called later. effector supports imperative event calling inside watchers, but sometimes you should bind events to the scope explicitly, e.g. when calling events within a setTimeout/setInterval callbacks.

### Arguments {#scopeBind-arguments}

1. `event` [_EventCallable_](/en/api/effector/Event) or [_Effect_](/en/api/effector/Effect) to be bound to the scope
2. `options`  (_Object_): Optional configuration
   - `scope` (_Scope_): scope binding event to
   - `safe` (_Boolean_): flag for exception supression if there is no scope.

## Example {#scopeBind-example}

We are going to call `changeLocation` inside `history.listen` callback so there is no way for effector to associate event with corresponding scope, and we should explicitly bind event to scope using `scopeBind`.

```ts
const $history = createStore(history)
const initHistory = createEvent()
const changeLocation = createEvent<string>()

const installHistoryFx = attach({
 source: $history,
 effect: (history) => {
  const locationUpdate = scopeBind(changeLocation)

  history.listen(location => {
    locationUpdate(location)
  })
 }
})

sample({
 clock: initHistory,
 target: installHistoryFx,
})

```

[See full example](https://share.effector.dev/nJo1zRil)

## Arbitrary сallback in scopeBind

Binds arbitary callback to a scope to be called later.
The "Bounded" version of the function preserves all properties of the original - e.g. if original would throw if called with some specific argument, then bounded version will also throw, when called with this argument.

```ts
export function scopeBind<T extends Function>(fn: T, options?: {scope?: Scope; safe?: boolean}): T
```

### Arguments {#scopeBind-arbitary-arguments}

1. `fn` any function to be bound to the scope
2. `options`  (_Object_): Optional configuration
   - `scope` (_Scope_): scope binding event to
   - `safe` (_Boolean_): flag for exception supression if there is no scope.

### Example {$scopeBind-arbitary-example}

```ts
const installHistoryFx = attach({
 source: $history,
 effect: (history) => {
  history.listen(scopeBind((location) => {
    changeLocation(location)
  }))
 }
})
```
