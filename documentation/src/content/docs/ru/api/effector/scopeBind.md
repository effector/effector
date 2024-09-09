---
title: scopeBind
description: scopeBind is a method to bind unit to scope
redirectFrom:
  - <br/>
  - Пример
---

```ts
import { scopeBind } from "effector";
```

Метод привязки события или эффекта к scope для последующего вызова Иногда необходимо привязать события к scope явно, например, при вызове событий в рамках колбэков setTimeout/setInterval

# Methods (#scopeBind-methods)

## Аргументы

### Formulae (#scopeBind-methods-scopeBind-event-formulae)

```ts
scopeBind<T>(event: Event<T>): (payload: T) => void
```

### Arguments (#scopeBind-methods-scopeBind-event-arguments)

1. Метод привязки события или эффекта к [scope](/ru/api/effector/Scope) для последующего вызова.
2. `options` (_Object_): Optional configuration.
   - **`event`**: [Событие](/ru/api/effector/Event) для привязки к scope
   - `safe` (_Boolean_): Flag for exception suppression if there is no scope.

### Returns (#scopeBind-methods-scopeBind-event-returns)

`(payload: T) => void` — A function with the same types as `event`.

### Examples (#scopeBind-methods-scopeBind-event-examples)

#### Basic Usage (#scopeBind-methods-scopeBind-event-examples-basic-usage)

Мы собираемся вызвать `changeLocation` внутри колбэка `history.listen`, поэтому у эффектора нет возможности связать событие с соответствующей областью видимости, и мы должны явно привязать событие к области видимости с помощью `scopeBind`

```ts
const installHistory = app.createEvent<any>()
const changeLocation = app.createEvent<string>()

installHistory.watch(history => {

  const locationUpdate = scopeBind(changeLocation)
  history.listen(location => {
    locationUpdate(location.pathname)
  })
})
```

[See full example](https://share.effector.dev/xtP8Zk8J)

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
Формула
```

### Arguments (#scopeBind-methods-scopeBind-callback-arguments)

1. `callback` (_Function_): Any function to be bound to the scope.
2. `options` (_Object_): Optional configuration.
   - ru
   - `safe` (_Boolean_): Flag for exception suppression if there is no scope.

### Returns (#scopeBind-methods-scopeBind-callback-returns)

`(payload: T) => void` — A function with the same types as `callback`.

### Examples (#scopeBind-methods-scopeBind-callback-examples)

```ts
[Полный пример](https://github.com/effector/effector/blob/master/examples/react-ssr/src/app.tsx#L128)
```
