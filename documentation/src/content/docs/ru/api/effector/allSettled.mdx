---
title: allSettled
description: Вызывает предоставленный юнит в скоупе и ожидает завершения всех запущенных юнитов
lang: ru
---

# Методы (#methods)

## `allSettled(unit, {scope, params?})` (#methods-allSettled-unit-scope-params)

Вызывает предоставленный юнит в переданном скоупе и ожидает завершения всех запущенных юнитов.

### Формула (#methods-allSettled-unit-scope-params-formulae)

```ts
allSettled<T>(unit: Event<T>, {scope: Scope, params?: T}): Promise<void>
allSettled<T>(unit: Effect<T, Done, Fail>, {scope: Scope, params?: T}): Promise<
  | {status: 'done'; value: Done}
  | {status: 'fail'; value: Fail}
>
allSettled<T>(unit: Store<T>, {scope: Scope, params?: T}): Promise<void>
```

### Аргументы (#methods-allSettled-unit-scope-params-arguments)

1. `unit`: [_Event_](/ru/api/effector/Event) или [_Effect_](/ru/api/effector/Effect), который нужно вызвать.
2. `scope`: [_Scope_](/ru/api/effector/Scope) — скоуп.
3. `params`: параметры, передаваемые в `unit`.

:::info{title="Обратите внимание"}
Возвращаемое значение для эффекта поддерживается с версии [effector 21.4.0](https://changelog.effector.dev/#effector-21-4-0).
:::

### Примеры (#methods-allSettled-unit-scope-params-examples)

```ts
const scope = fork();
const event = createEvent<number>();

event.watch(console.log);

await allSettled(event, { scope, params: 123 }); // в консоль выведется 123
```

```ts
const scopeA = fork();
const scopeB = fork();

const $store = createStore(0);
const inc = createEvent<number>();

await allSettled($store, { scope: scopeA, params: 5 });
await allSettled($store, { scope: scopeB, params: -5 });

$store.watch(console.log);

await allSettled(inc, { scope: scopeA, params: 2 }); // в консоль выведется 7
await allSettled(inc, { scope: scopeB, params: 2 }); // в консоль выведется -3
```

## `allSettled(scope)` (#methods-allSettled-scope)

Проверяет предоставленный скоуп на наличие текущих вычислений и ожидает их завершения.

### Формула (#methods-allSettled-scope-formulae)

```ts
allSettled<T>(scope): Promise<void>
```

### Аргументы (#methods-allSettled-scope-arguments)

1. `scope`: [_Scope_](/ru/api/effector/Scope) — скоуп.

:::info{title="Начиная с"}
effector 22.5.0.
:::

### Примеры (#methods-allSettled-scope-examples)

#### Использование в тестах (#methods-allSettled-scope-examples-tests)

Тесты, которые проверяют интеграцию с внешним реактивным API.

```ts
import {createEvent, sample, fork, scopeBind, allSettled} from 'effector'

test('интеграция с externalSource', async () => {
  const scope = fork()

  const updated = createEvent()

  sample({
    clock: updated,
    target: someOtherLogicStart,
  })

  // 1. Подписываем событие на внешний источник
  const externalUpdated = scopeBind(updated, {scope})
  externalSource.listen(() => externalUpdates())

  // 2. Запускаем обновление внешнего источника
  externalSource.trigger()

  // 3. Ожидаем завершения всех запущенных вычислений в области видимости effector, даже если они были запущены не самим effector
  await allSettled(scope)

  // 4. Проверяем что-либо как обычно
  expect(...).toBe(...)
})
```
