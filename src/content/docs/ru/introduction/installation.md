---
title: Установка
description: Установка эффектора и сопутствующих пакетов
lang: ru
---

# Установка

## С помощью пакетного менеджера

Effector не требует использования какого-то одного пакетного менеджера, можете использовать любой на свой выбор.<br/>
Например: [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/).

```bash
npm add effector
```

### React

```bash
npm add effector effector-react
```

Вы можете начать использовать effector онлайн с помощью [шаблона Stackblitz](https://stackblitz.com/fork/github/effector/vite-react-template) внутри которого уже настроен [TypeScript](https://typescriptlang.org/), [ViteJS](https://vitejs.dev/) и [React](https://reactjs.org/).

### Vue

```bash
npm add effector effector-vue
```

### Solid

```bash
npm add effector effector-solid
```

### Svelte

Svelte работает с effector без установки дополнительных пакетов.

## Online playground

Все примеры в этой документации запускаются в [нашей онлайн песочнице](https://share.effector.dev). Она позволяет запускать, тестировать и распространять свои идеи бесплатно и без установки. React и синтаксис TypeScript поддерживаются без дополнительной настройки. [Репозиторий проекта](https://github.com/effector/repl).

## Deno

:::info{title="поддерживается с версии"}
[effector 21.0.0](https://changelog.effector.dev/#effector-21-0-0)
:::

Чтобы использовать просто импортируйте `effector.mjs` из любого CDN.

```typescript
import { createStore } from "https://cdn.jsdelivr.net/npm/effector/effector.mjs";
```

Примеры CDN:

- https://www.jsdelivr.com/package/npm/effector
- https://cdn.jsdelivr.net/npm/effector/effector.cjs.js
- https://cdn.jsdelivr.net/npm/effector/effector.mjs
- https://cdn.jsdelivr.net/npm/effector-react/effector-react.cjs.js
- https://cdn.jsdelivr.net/npm/effector-vue/effector-vue.cjs.js

## DevTools

Используйте [effector-logger](https://github.com/effector/logger) для вывода изменений сторов в консоль, вывода их значений в браузерный интерфейс и подключения к Redux Dev Tools.

Для рендеринга на сервере и написания тестов вам понадобятся плагины для компилятора:

### Babel

Плагин для Babel включен в поставку основного пакета `effector` и не требует установки.

[Читайте детали по ссылке](/ru/api/effector/babel-plugin).

### SWC

```bash
npm add --development @effector/swc-plugin @swc/core
```

[Документация плагина](https://github.com/effector/swc-plugin).

### Polyfills

You need to install polyfills for these objects:

- `Promise`
- `Object.assign`
- `Array.prototype.flat`
