---
id: allSettled
title: allSettled
description: Call provided unit in scope and wait for finishing all the triggered effects
---

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

1. `unit`: [_Event_](docs/api/effector/Event.md) or [_Effect_](docs/api/effector/Effect.md) to be called
2. `scope`: [_Scope_](docs/api/effector/Scope.md)
3. `params`: params passed to `unit`

:::note
Return value for effect is supported since effector 21.4.0
:::
