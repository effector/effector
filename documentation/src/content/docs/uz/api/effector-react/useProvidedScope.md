---
title: useProvidedScope
description: Effector React
redirectFrom:
  - /api/effector-react/useProvidedScope
  - /docs/api/effector-react/useProvidedScope
---

```ts
import { useProvidedScope } from "effector-react";
```

Low-level React Hook, which returns current [Scope](/api/effector/Scope) from [Provider](/api/effector-react/Provider).

:::warning{title="This is a Low-Level API"}

For production `effector-react` usage, see the [`useUnit`](/api/effector-react/useUnit) hook.
:::

# Methods (#methods)

## `useProvidedScope()` (#methods-useProvidedScope)

### Formulae (#methods-useProvidedScope-formulae)

```ts
useProvidedScope(): Scope | null
```

### Returns (#methods-useProvidedScope-returns)

([`Scope | null`](/api/effector/Scope)) — if no Scope provided, returns `null`.

### Examples (#methods-useProvidedScope-examples)

This hook can be used in library internals to handle various edge-cases, where `createWatch` and `scopeBind` APIs are also needed.

For production code usage, see the [`useUnit`](/api/effector-react/useUnit) hook instead.

```tsx
const useCustomLibraryInternals = () => {
  const scope = useProvidedScope();

  // ...
};
```
