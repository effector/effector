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
