---
id: allSettled
title: allSettled
description: Call provided unit in scope and wait for finishing all the triggered effects
---

## allSettled

```ts
allSettled<T>(unit: Event<T>, {scope: Scope, params?: T}): Promise<void>
allSettled<T>(unit: Effect<T, Done, Fail>, {scope: Scope, params?: T}): Promise<
  | {status: 'done'; value: Done}
  | {status: 'fail'; value: Fail}
>
allSettled<T>(unit: Store<T>, {scope: Scope, params?: T}): Promise<void>
```

Call provided unit in scope and wait for finishing all the triggered effects.

**Arguments**

1. `unit`: [_Event_](Event.md) or [_Effect_](./Effect.md) to be called
2. `scope`: [_Scope_](./Scope.md)
3. `params`: params passed to `unit`

:::note
Return value for effect is supported since effector 21.4.0
:::

## allSettled(scope)

```ts
allSettled<T>(scope): Promise<void>
```

Check for any ongoing computations in provided scope and wait for their finish.

**Arguments**

1. `scope`: [_Scope_](./Scope.md)

:::note
Supported since effector 22.5.0
:::

**Example**

E.g. tests for integration with some external reactive api

```ts
test('integration with externalSource', async () => {
  const scope = fork()

  const updated = createEvent()

  sample({
    clock: updated,
    target: someOtherLogicStart,
  })

  // 1. Subscribe event to some external source
  const externalUpdated = scopeBind(updated, {scope})
  externalSource.listen(() => externalUpdates())

  // 2. Trigger update of external source
  externalSource.trigger()

  //3. Wait for all triggered computations in effector's scope, even though these were not triggered by effector itself
  await allSettled(scope)

  // 4. Check anything as usual
  expect(...).toBe(...)
})
```
