---
title: createWatch
redirectFrom:
  - /docs/api/effector/createwatch
---

```ts
import { createWatch } from "effector";
```

# Methods (#methods)

## `createWatch(config)` (#methods-createWatch-config)

Создает подписку на юнит (стор, ивент или эффект).

### Formulae (#methods-createWatch-config-formulae)

```ts
createWatch<T>(config: {
  unit: Unit<T>
  fn: (payload: T) => void
  scope?: Scope
}): Subscription
```

### Arguments (#methods-createWatch-config-arguments)

1. `config` (_Object_): Конфигурация
   - `unit` (_Unit_): Целевой юнит (стор, ивент или эффект), за которым нужно наблюдать
   - `fn` (_Function_): Функция, которая будет вызываться при каждом обновлении юнита. Accepts the unit's payload as the first argument.
   - `scope` ([_Scope_](/ru/api/effector/Scope)): Опциональный скоуп.

### Returns (#methods-createWatch-config-returns)

[_Subscription_](/ru/explanation/glossary#subscription): Функция отмены подписки

### Examples (#methods-createWatch-config-examples)

#### With scope (#methods-createWatch-config-examples-scope)

```js
import { createWatch, createEvent, fork, allSettled } from "effector";

const changeName = createEvent();

const scope = fork();

const unwatch = createWatch({ unit: changeName, scope, fn: console.log });

await allSettled(changeName, { scope, params: "Иван" }); // output: Иван
changeName("Иван"); // no output
```

#### Without scope (#methods-createWatch-config-examples-no-scope)

```js
import { createWatch, createEvent, fork, allSettled } from "effector";

const changeName = createEvent();

const scope = fork();

const unwatch = createWatch({ unit: changeName, fn: console.log });

await allSettled(changeName, { scope, params: "Иван" }); // output: Иван
changeName("Иван"); // output: Иван
```
