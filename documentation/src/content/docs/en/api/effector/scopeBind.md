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

1. `event` [_Event_](/en/api/effector/Event) to be bound to the scope
2. `options`  (_Object_): Optional configuration
   - `scope` (_Scope_): scope binding event to
   - `safe` (_Boolean_): flag for exception supression if there is no scope. (will return original event)

## Example {#scopeBind-example}

We are going to call `changeLocation` inside `history.listen` callback so there is no way for effector to associate event with corresponding scope, and we should explicitly bind event to scope using `scopeBind`.

```js
const installHistory = app.createEvent<any>()
const changeLocation = app.createEvent<string>()

installHistory.watch(history => {

  const locationUpdate = scopeBind(changeLocation)
  history.listen(location => {
    locationUpdate(location.pathname)
  })
})
```

[See full example](https://github.com/effector/effector/blob/master/examples/react-ssr/src/app.tsx#L128)
