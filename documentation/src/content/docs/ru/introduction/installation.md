---
title: Установка
description: Установка эффектора и сопутствующих пакетов
lang: ru
---

## С помощью пакетного менеджера

Effector не требует использования какого-то одного пакетного менеджера, можете использовать любой на свой выбор.<br/>
Например: [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/).

```bash
npm install effector
```

### React

```bash
npm install effector effector-react
```

Вы можете начать использовать effector онлайн с помощью [шаблона Stackblitz](https://stackblitz.com/fork/github/effector/vite-react-template) внутри которого уже настроен [TypeScript](https://typescriptlang.org/), [ViteJS](https://vitejs.dev/) и [React](https://reactjs.org/).

### Vue

```bash
npm install effector effector-vue
```

### Solid

```bash
npm install effector effector-solid
```

### Svelte

Svelte работает с effector без установки дополнительных пакетов.

## Online playground

Все примеры в этой документации запускаются в [нашей онлайн песочнице](https://share.effector.dev). Она позволяет запускать, тестировать и распространять свои идеи бесплатно и без установки. React и синтаксис TypeScript поддерживаются без дополнительной настройки. [Репозиторий проекта](https://github.com/effector/repl).

## Deno

:::info{title="поддерживается с версии"}
[effector 21.0.0](https://changelog.effector.dev/#effector-21-0-0)
:::

Чтобы использовать effector, просто импортируйте `effector.mjs` из любого CDN.

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
npm install --development @effector/swc-plugin @swc/core
```

[Документация плагина](https://github.com/effector/swc-plugin).

## Совместимость

Для совместимости с устаревшими версиями браузеров до IE11 и Chrome 47 (версия браузера для Smart TV) используйте импорты из файлов: `effector/compat`, `effector-react/compat` и `effector-vue/compat`.

Вы можете заменить импорты вручную:

```diff
- import {createStore} from 'effector'
+ import {createStore} from 'effector/compat'
```

А также используя плагин [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver).
Примерная конфигурация в `.babelrc`:

```json
{
  "plugins": [
    [
      "babel-plugin-module-resolver",
      {
        "alias": {
          "^effector$": "effector/compat",
          "^effector-react$": "effector-react/compat"
        }
      }
    ]
  ]
}
```

### Polyfills

Effector использует некоторые глобальные объекты, в старых версиях браузеров их может не быть, поэтому вам может понадобиться установить их самостоятельно, если вы собираетесь поддерживать такие браузеры.

Вам может понадобиться установить следующие полифиллы:

- `Promise`
- `Object.assign`
- `Array.prototype.flat`
