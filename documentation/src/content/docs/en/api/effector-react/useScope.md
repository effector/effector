---
title: useScope
description: Effector React
redirectFrom:
  - /api/effector-react/useScope
  - /docs/api/effector-react/useScope
---

Low-level React Hook, which returns current [Scope](/api/effector/Scope) from [Provider](/api/effector-react/Provider).

:::warning{title="This is a Low-Level API"}
The `useScope` hook is a low-level API for a library developers and **is not intended to be used in production code** directly.

For production `effector-react` usage see the [`useUnit`](/api/effector-react/useUnit) hook.
:::

## `useScope()`

### Returns {#useScope-returns}

- [Scope](/api/effector/Scope) or `null`, if no `Scope` provided.

### Example {#useScope-example}

This hook can be used in library internals to handle various edge-cases, where `createWatch` and `scopeBind` APIs are also needed.

For production code usage see the [`useUnit`](/api/effector-react/useUnit) hook instead.

```tsx
const useCustomLibraryInternals = () => {
  const scope = useScope();

  // ...
};
```
