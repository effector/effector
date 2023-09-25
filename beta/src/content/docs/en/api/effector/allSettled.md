---
title: allSettled
description: Call provided unit in scope and wait for finishing all the triggered effects
redirectFrom:
  - /api/effector/allSettled
  - /docs/api/effector/allsettled
---

## `allSettled(unit, {scope, params?})` {#unit-scope-params}

### Formulae {#unit-scope-params-formulae}

```ts
allSettled<T>(unit: Event<T>, {scope: Scope, params?: T}): Promise<void>
allSettled<T>(unit: Effect<T, Done, Fail>, {scope: Scope, params?: T}): Promise<
  | {status: 'done'; value: Done}
  | {status: 'fail'; value: Fail}
>
allSettled<T>(unit: Store<T>, {scope: Scope, params?: T}): Promise<void>
```

Call the provided unit within the current scope and wait for all triggered effects to complete

### Arguments {#unit-scope-params-arguments}

1. `unit`: [_Event_](/en/api/effector/Event) or [_Effect_](/en/api/effector/Effect) to be called
2. `scope`: [_Scope_](/en/api/effector/Scope)
3. `params`: params passed to `unit`

:::info{title="since"}
Return value for effect is supported since [effector 21.4.0](https://changelog.effector.dev/#effector-21-4-0)
:::

### Example {#unit-scope-params-example}

:::tip{title="Contribution"}
Please, [open PullRequest](https://github.com/effector/effector) and contribute examples for this section via "Edit this page" link below.
:::

## `allSettled(scope)` {#scope-formulae}

```ts
allSettled<T>(scope): Promise<void>
```

Check the provided scope for any ongoing computations and wait for their completion.

### Arguments {#scope-arguments}

1. `scope`: [_Scope_](/en/api/effector/Scope)

:::info{title="since"}
Supported since effector 22.5.0
:::

### Example {#scope-example}

#### Usage in tests

For example, tests that validate the integration with an external reactive API

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
