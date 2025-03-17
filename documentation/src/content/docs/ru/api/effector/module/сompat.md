---
title: effector/compat
description: Отдельный модуль Effector с поддержкой совместимости до IE11 и Chrome 47 (браузер для устройств Smart TV)
lang: ru
---

```ts
import {} from "effector/compat";
```

Библиотека предоставляет отдельный модуль с поддержкой совместимости до IE11 и Chrome 47 (браузер для устройств Smart TV).

:::warning{title="Бандлер, а не транспилятор"}
Поскольку сторонние библиотеки могут импортировать `effector` напрямую, вам **не следует** использовать транспиляторы, такие как Babel, для замены `effector` на `effector/compat` в вашем коде, так как по умолчанию Babel не преобразует сторонний код.

**Используйте бандлер**, так как он заменит `effector` на `effector/compat` во всех модулях, включая модули из сторонних библиотек.
:::

## Необходимые полифиллы (#required-polyfills)

Вам нужно установить полифиллы для этих объектов:

- `Promise`
- `Object.assign`
- `Array.prototype.flat`
- `Map`
- `Set`

В большинстве случаев бандлер может автоматически добавить полифиллы.

### Vite (#required-polyfills-vite)

<details>
<summary>Пример конфигурации Vite</summary>

```js
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    legacy({
      polyfills: ["es.promise", "es.object.assign", "es.array.flat", "es.map", "es.set"],
    }),
  ],
});
```

</details>

# Использование (#usage)

## Ручная замена (#usage-manual)

Вы можете использовать `effector/compat` вместо пакета `effector`, если вам нужно поддерживать старые браузеры.

```diff
- import {createStore} from 'effector'
+ import {createStore} from 'effector/compat'
```

## Автоматическая замена (#usage-automatic)

Однако вы можете настроить ваш бандлер для автоматической замены `effector` на `effector/compat` в вашем коде.

### Webpack (#usage-automatic-webpack)

<details>
<summary>Пример конфигурации Webpack</summary>

```js
module.exports = {
  resolve: {
    alias: {
      effector: "effector/compat",
    },
  },
};
```

</details>

### Vite (#usage-automatic-vite)

<details>
<summary>Пример конфигурации Vite</summary>

```js
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      effector: "effector/compat",
    },
  },
});
```

</details>
