---
title: useProvidedScope
description: Effector React
redirectFrom:
  - ru
  - /docs/api/effector-react/useProvidedScope
---

```ts
import { useProvidedScope } from "effector-react";
```

Низкоуровневый Реакт хук, который возвращает текущий [Scope](/ru/api/effector/Scope) из [Provider](/ru/api/effector-react/Provider).

:::warning{title="This низкоуровневый API"}

Для использования `effector-react` в продакшен коде используейте хук [`useUnit`](/ru/api/effector-react/useUnit).
:::

# Methods (#methods)

## `useProvidedScope()`

### Formulae (#methods-useProvidedScope-formulae)

```ts
useProvidedScope(): Scope | null
```

### Возвращает (#useProvidedScope-returns)

[Scope](/ru/api/effector/Scope) или `null`, если `Scope` не передан.

### Пример (#useProvidedScope-example)

Этот хук может быть использован внутри библиотеки для обработки различных крайних случаев, где также необходимы `createWatch` и `scopeBind`.

Для продакшен кода используйте [`useUnit`](/ru/api/effector-react/useUnit) хук.

```tsx
const useCustomLibraryInternals = () => {
  const scope = useProvidedScope();

  // ...
};
```
