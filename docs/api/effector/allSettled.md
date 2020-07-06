---
id: allSettled
title: allSettled
hide_title: true
---

# allSettled

```ts
allSettled<T>(event: Event<T>, { scope: Scope, params?: T }): Promise<void>
```

Call provided event in scope and wait for finishing all the triggered effect.

### Arguments

1. `event`: a [_Event_](Event.md) to be called
2. `scope`: a [_Scope_](fork)
3. `params`: a params passed to `event`