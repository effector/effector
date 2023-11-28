---
id: createWatch
title: createWatch
---

Создает подписку на юнит (стор, ивент или эффект).

```ts
createWatch<T>(config: {
  unit: Unit<T>
  fn: (payload: T) => void
  scope?: Scope
}): Subscription
```

**Аргументы**

1. `config` (_Object_): Конфигурация
   - `unit` (_Unit_): Целевой юнит (стор, ивент или эффект), за которым нужно наблюдать
   - `fn` (_Function_): Функция, которая будет вызываться при каждом обновлении юнита. Первым аргументом получает содержимое обновления.
   - `scope` ([_Scope_](/ru/api/effector/Scope)): Опциональный скоуп. Если передан, то функция будет вызываться только при обновлении юнита именно на этом скоупе.

**Возвращает**

[_Subscription_](/ru/explanation/glossary#subscription): Функция отмены подписки

#### Пример (со скоупом)

```js
import { createWatch, createEvent, fork, allSettled } from "effector";

const changeName = createEvent();

const scope = fork();

const unwatch = createWatch({ unit: changeName, scope, fn: console.log });

await allSettled(changeName, { scope, params: "Иван" }); // output: Иван
changeName("Иван"); // no output
```

#### Пример (без скоупа)

```js
import { createWatch, createEvent, fork, allSettled } from "effector";

const changeName = createEvent();

const scope = fork();

const unwatch = createWatch({ unit: changeName, fn: console.log });

await allSettled(changeName, { scope, params: "Иван" }); // output: Иван
changeName("Иван"); // output: Иван
```
