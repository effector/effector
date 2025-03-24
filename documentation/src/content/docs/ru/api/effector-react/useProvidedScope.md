---
title: useProvidedScope
lang: ru
---

Низкоуровневый Реакт хук, который возвращает текущий [Scope](/ru/api/effector/Scope) из [Provider](/ru/api/effector-react/Provider).

:::warning{title="Это низкоуровневый API"}
Хук `useProvidedScope` это низкоуровневый API для разработчиков библиотек и не предназначен для использования в продакшен коде напрямую.

Для использования `effector-react` в продакшен коде используейте хук [`useUnit`](/ru/api/effector-react/useUnit).
:::

## `useProvidedScope()`

### Возвращает (#useProvidedScope-returns)

- [Scope](/ru/api/effector/Scope) или `null`, если `Scope` не передан.

### Пример (#useProvidedScope-example)

Этот хук может быть использован внутри библиотеки для обработки различных крайних случаев, где также необходимы `createWatch` и `scopeBind`.

Для продакшен кода используйте [`useUnit`](/ru/api/effector-react/useUnit) хук.

```tsx
const useCustomLibraryInternals = () => {
  const scope = useProvidedScope();

  // ...
};
```
