---
title: hydrate
lang: ru
---

```ts
import { hydrate } from "effector";
```

Сопутствующий метод для [**serialize**](/ru/api/effector/serialize). Гидрирует предоставленные значения в соответствующие сторы в рамках предоставленного домена или скоупа. Основная цель — гидрация состояния приложения на стороне клиента после SSR (Server-Side Rendering).

## Методы (#methods)

### `hydrate(domainOrScope, { values })` (#methods-hydrate-domainOrScope-values)

:::warning{title="Важно"}
Необходимо убедиться, что стор создан заранее, иначе гидрация может завершиться неудачей. Это может произойти, если вы разделяете скрипты инициализации/гидрации сторов от их создания.
:::

#### Формула (#methods-hydrate-domainOrScope-values-formulae)

```ts
hydrate(domainOrScope: Domain | Scope, { values: Map<Store<any>, any> | {[sid: string]: any} }): void
```

#### Аргументы (methods-hydrate-domainOrScope-values-arguments)

1. **`domainOrScope`**: [домен](/ru/api/effector/Domain) или [область видимости](/ru/api/effector/Scope), который будет заполнен предоставленными `values`.
2. **`values`**: отображение из sid (идентификаторов сторов) в значения сторов или `Map`, где ключи — это объекты [сторов](/ru/api/effector/Store), а значения содержат начальное значение стора.

#### Возвращает (#methods-hydrate-domainOrScope-values-returns)

`void`

#### Примеры (#methods-hydrate-domainOrScope-values-examples)

Заполнение стора предопределенным значением:

```js
import { createStore, createDomain, fork, serialize, hydrate } from "effector";

const domain = createDomain();
const $store = domain.createStore(0);

hydrate(domain, {
  values: {
    [$store.sid]: 42,
  },
});

console.log($store.getState()); // 42
```

[Запустить пример](https://share.effector.dev/zZoQ5Ewm)
