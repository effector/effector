---
title: Babel plugin
redirectFrom:
  - Добавлено в effector 21.8.0
  - Добавлено в effector 20.2.0
---

Встроенный плагин для babel, который можно использовать для ssr и отладки. Он вставляет имя юнита, выводимое из имени переменной, и `sid` (стабильный идентификатор), вычисляемый по расположению в исходном коде.

К примеру, в случае [эффектов без обработчиков](/ru/api/effector/Effect#use-handler), это улучшит сообщение об ошибке, четко показывая, в каком эффекте произошла ошибка.

```js
import { createEffect } from "effector";

const fetchFx = createEffect();

fetchFx();

// => no handler used in fetchFx
```

[Запустить пример](https://share.effector.dev/Yb8vQ1Ly)

# Использование

В простейшем случае его можно использовать без какой-либо настройки:

```json
// .babelrc
{
  "plugins": ["effector/babel-plugin"]
}
```

# SID (#sid)

:::info{title="since"}
[effector 20.2.0](https://changelog.effector.dev/#effector-20-2-0)
:::

Стабильный идентификатор для событий, эффектов, сторов и доменов, сохраняемый между окружениями, для обработки клиент-серверного взаимодействия в рамках одной кодовой базы.

Ключевым преимуществом является то, что sid может быть автоматически сгенерирован через `effector/babel-plugin` с конфигурацией по умолчанию и будет стабилен между сборками.

:::tip{title="Deep dive explanation"}
If you need the detailed deep-dive explanation about why we need SIDs and how they are used internally, you can find it by [following this link](/en/explanation/sids)
:::

[Пример проекта](https://github.com/effector/effector/tree/master/examples/worker-rpc)

```js
// common.js
import { createEffect } from "effector";

export const getUser = createEffect({ sid: "GET /user" });
console.log(getUsers.sid);
// => GET /user
```

```js
// worker.js
import { getUsers } from "./common.js";

getUsers.use((userID) => fetch(userID));

getUsers.done.watch(({ result }) => {
  postMessage({ sid: getUsers.sid, result });
});

onmessage = async ({ data }) => {
  if (data.sid !== getUsers.sid) return;
  getUsers(data.userID);
};
```

```js
// client.js
import { createEvent } from "effector";
import { getUsers } from "./common.js";

const onMessage = createEvent();

const worker = new Worker("worker.js");
worker.onmessage = onMessage;

getUsers.use(
  (userID) =>
    new Promise((rs) => {
      worker.postMessage({ sid: getUsers.sid, userID });
      const unwatch = onMessage.watch(({ data }) => {
        if (data.sid !== getUsers.sid) return;
        unwatch();
        rs(data.result);
      });
    }),
);
```

# Конфигурация

## importName

Имя импорта или имена импортов, которые(-й) будут(-ет) обрабатываться плагином. Import should be used in the code as specified.

### Formulae (#configuration-importName-formulae)

```json
[
  "effector/babel-plugin",
  {
    "importName": ["effector"]
  }
]
```

- Type: `string | string[]`
- Default: `['effector', 'effector/compat']`

## `factories` (#configuration-factories)

Принимает массив имен модулей, экспорты которых будут рассматриваться как пользовательские фабрики, и каждый вызов таких фабрик будет иметь уникальный префикс для [сидов](/ru/api/effector/babel-plugin#sid) юнитов внутри них. Применяется для реализации SSR, для чисто клиентского приложения не требуется.

:::info{title="since"}
Добавлено в effector 21.6.0
:::

### Formulae (#configuration-factories-formulae)

```json
[
  "effector/babel-plugin",
  {
    "factories": ["path/here"]
  }
]
```

- Type: `string[]`

- Фабрики могут иметь любое количество аргументов

- Фабрики могут создавать любое количество юнитов

- Фабрики могут вызывать любые эффекторные методы

- Фабрики могут вызывать другие фабрики из других модулей

- Модули с фабриками могут экспортировать любое количество функций

- Фабрики должны быть скомпилированы с `effector/babel-plugin`, как и код, который их использует

### Examples (#configuration-factories-examples)

```json
// .babelrc
{
  "plugins": [
    [
      "effector/babel-plugin",
      {
        "factories": ["src/createEffectStatus", "~/createCommonPending"]
      }
    ]
  ]
}
```

```js
// ./src/createEffectStatus.js
import { rootDomain } from "./rootDomain";

export function createEffectStatus(fx) {
  const $status = rootDomain.createStore("init").on(fx.finally, (_, { status }) => status);
  return $status;
}
```

```js
// ./src/statuses.js
import { createEffectStatus } from "./createEffectStatus";
import { fetchUserFx, fetchFriendsFx } from "./api";

export const $fetchUserStatus = createEffectStatus(fetchUserFx);
export const $fetchFriendsStatus = createEffectStatus(fetchFriendsFx);
```

Импорт `createEffectStatus` из `'./createEffectStatus'` рассматривается как фабричная функция, поэтому каждый созданный ею стор получит свой собственный [sid](/ru/api/effector/babel-plugin#sid) и будет обрабатываться [serialize](/ru/api/effector/serialize) независимо, в то время как без `factories` они все будут иметь один и тот же `sid`.

## `reactSsr` (#configuration-reactSsr)

Заменяет импорты из `effector-react` на `effector-react/scope`. Полезно для создания серверных и клиентских сборок из одной и той же кодовой базы.

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) the core team recommends deleting this option from `babel-plugin` configuration because [effector-react](/en/api/effector-react) supports SSR by default.
:::

### Formulae (#configuration-reactSsr-formulae)

```json
reactSsr
```

- Type: `boolean`
- Default: `false`

## addNames

Добавляет имена к вызовам фабрик юнитов. Useful for minification and obfuscation of production builds.

:::info{title="since"}
Добавлено в effector 21.5.0
:::

### Formulae (#configuration-addNames-formulae)

```json
[
  "effector/babel-plugin",
  {
    "addNames": true
  }
]
```

- Type: `boolean`
- Default: `true`

## `addLoc` (#configuration-addLoc)

Добавляет местоположение к вызовам методов. Используется инструментами для разработчиков, например, [effector-logger](https://github.com/effector/logger)

### Formulae (#configuration-addLoc-formulae)

```json
[
  "effector/babel-plugin",
  {
    "addLoc": false
  }
]
```

- Type: `boolean`
- Default: `false`

## `debugSids` (#configuration-debugSids)

Добавляет в sid путь к файлу и имя переменной где объявлен unit. Очень полезно при отладке SSR.

### Formulae (#configuration-debugSids-formulae)

```json
[
  "effector/babel-plugin",
  {
    "debugSids": false
  }
]
```

- Type: `boolean`
- Default: `false`

## noDefaults

Опция для `effector/babel-plugin` для создания пользовательских фабрик юнитов с чистой конфигурацией, изначально не делающей ничего.

:::info{title="since"}
[effector 20.2.0](https://changelog.effector.dev/#effector-20-2-0)
:::

### Formulae (#configuration-noDefaults-formulae)

```json
[
  "effector/babel-plugin",
  {
    "noDefaults": false
  }
]
```

- Type: `boolean`
- Default: `false`

### Examples (#configuration-noDefaults-examples)

```json
// .babelrc
{
  "plugins": [
    ["effector/babel-plugin", { "addLoc": true }],
    [
      "effector/babel-plugin",
      {
        "importName": "@lib/createInputField",
        "storeCreators": ["createInputField"],
        "noDefaults": true
      },
      "createInputField"
    ]
  ]
}
```

```js
// @lib/createInputField.js
import { createStore } from "effector";
import { resetForm } from "./form";

export function createInputField(defaultState, { sid, name }) {
  return createStore(defaultState, { sid, name }).reset(resetForm);
}
```

```js
// src/state.js
import { createInputField } from "@lib/createInputField";

const foo = createInputField("-");
/*

will be treated as store creator and compiled to

const foo = createInputField('-', {
  name: 'foo',
  sid: 'z&si65'
})

*/
```

# Usage with Bundlers (#bundlers)

## Vite + React (SSR) (#bundlers-ViteReactSSR)

Добавлено в effector 20.2.0

1. Install `@vitejs/plugin-react` package.
2. `vite.config.js` should be follows:

> Note: `effector/babel-plugin` is not a package, it is bundled with `effector`

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["effector/babel-plugin"],
        // Use .babelrc files
        babelrc: true,
        // Use babel.config.js files
        configFile: true,
      },
    }),
  ],
});
```
