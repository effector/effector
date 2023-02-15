---
title: launch
lang: ru
---

Низкоуровневый метод для запуска вычислений в [юнитах](/ru/explanation/glossary#common-unit). В основном используется разработчиками библиотек для тонкого контроля вычислений

:::info
Добавлен в effector 20.10.0
:::

## Формула

```ts
declare const $store: Store<T>
declare const event: Event<T>
declare const fx: Effect<T, any>

launch({target: $store, params: T}): void
launch({target: event, params: T}): void
launch({target: fx, params: T}): void
```
