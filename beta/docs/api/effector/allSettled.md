---
title: allSettled
description: Call provided unit in scope and wait for finishing all the triggered effects
lang: en-US
---

# allSettled

## Formulae {#allSettled-formulae}

```ts
allSettled<T>(unit: Event<T>, {scope: Scope, params?: T}): Promise<void>
allSettled<T>(unit: Effect<T, Done, Fail>, {scope: Scope, params?: T}): Promise<
  | {status: 'done'; value: Done}
  | {status: 'fail'; value: Fail}
>
allSettled<T>(unit: Store<T>, {scope: Scope, params?: T}): Promise<void>
```

Call provided unit in scope and wait for finishing all the triggered effects.

### Arguments {#allSettled-arguments}

1. `unit`: [_Event_](/api/effector/Event.md) or [_Effect_](/api/effector/Effect.md) to be called
2. `scope`: [_Scope_](/api/effector/Scope.md)
3. `params`: params passed to `unit`

::: info since
Return value for effect is supported since [effector 21.4.0](https://changelog.effector.dev/#effector-21-4-0)
:::

### Example {#allSettled-example}

::: tip Contribution
Please, [open PullRequest](https://github.com/effector/effector) and contribute examples for this section via "Edit this page" link below.
:::

## allSettled(scope) {#allSettled-scope-formulae}

```ts
allSettled<T>(scope): Promise<void>
```

Check for any ongoing computations in provided scope and wait for their finish.

### Arguments {#allSettled-scope-arguments}

1. `scope`: [_Scope_](./Scope.md)

::: info since
Supported since effector 22.5.0
:::

### Example {#allSettled-scope-example}

#### Usage in tests

E.g. tests for integration with some external reactive api

```ts
test('integration with externalSource', async () => {
  const scope = fork()

  const updated = createEvent()

  sample({
    clock: updated,
    target: someOtherLogicStart,
  })

  // 1. Subscribe event to external source
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
