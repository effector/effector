---
title: Babel плагин
lang: ru
---
Встроенный плагин для Babel может использоваться для SSR и отладки. Он добавляет имя [юнита](/en/explanation/glossary#unit),
выведенное из имени переменной, и `sid` ([Стабильный Идентификатор](/en/explanation/sids)), вычисленный из местоположения в исходном коде.

Например, в случае [эффектов без обработчиков](/en/api/effector/Effect#use-handler), это улучшает сообщения об ошибках,
показывая, в каком именно эффекте произошла ошибка.

```js
import { createEffect } from "effector";

const fetchFx = createEffect();

fetchFx();

// => no handler used in fetchFx
```

[Запустить пример](https://share.effector.dev/Yb8vQ1Ly)

# Использование (#usage)

В простейшем случае его можно использовать без какой-либо конфигурации:

```json
// .babelrc
{
  "plugins": ["effector/babel-plugin"]
}
```

# SID (#sid)

:::info{title="Начиная с"}
[effector 20.2.0](https://changelog.effector.dev/#effector-20-2-0)
:::

Стабильный хэш-идентификатор для событий, эффектов, хранилищ и доменов, сохраняемый между окружениями, для обработки взаимодействия клиент-сервер
в рамках одной кодовой базы.

Ключевое значение sid заключается в том, что он может быть автоматически сгенерирован `effector/babel-plugin` с конфигурацией по умолчанию, и он будет стабильным между сборками.

:::tip{title="Подробное объяснение"}
Если вам нужно подробное объяснение о том, зачем нужны SID и как они используются внутри, вы можете найти его, [перейдя по этой ссылке](/en/explanation/sids)
:::

Смотрите [пример проекта](https://github.com/effector/effector/tree/master/examples/worker-rpc)

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

# Конфигурация (#configuration)

## `hmr` (#configuration-hmr)

:::info{title="Начиная с"}
[effector 23.4.0](https://changelog.effector.dev/#effector-23.4.0)
:::

Горячая замена модулей для сборщиков, использующих API `module.hot`, `import.meta.webpackHot` или `import.meta.hot`.

### Формула (#configuration-hmr-formulae)

```json
"effector/babel-plugin",
  {
    "hmr": true
  }
]
```

- Тип: `boolean`
- По умолчанию: `false`

## `importName` (#configuration-importName)

Указание имени или имен импорта для обработки плагином. Импорт должен использоваться в коде как указано.

### Формула (#configuration-importName-formulae)

```json
[
  "effector/babel-plugin",
  {
    "importName": ["effector"]
  }
]
```

- Тип: `string | string[]`
- По умолчанию: `['effector', 'effector/compat']`

## `factories` (#configuration-factories)

Принимает массив имен модулей, экспорты которых рассматриваются как пользовательские фабрики, поэтому каждый вызов функции предоставляет уникальный префикс для [sids](/en/api/effector/babel-plugin#sid) юнитов внутри них. Используется для
SSR([Серверный рендеринг](/en/api/effector/Scope)) и не требуется для клиентских приложений.

:::info{title="с"}
[effector 21.6.0](https://changelog.effector.dev/#effector-21-6-0)
:::

### Формула (#configuration-factories-formulae)

```json
[
  "effector/babel-plugin",
  {
    "factories": ["path/here"]
  }
]
```

- Тип: `string[]`
- Фабрики могут иметь любое количество аргументов.
- Фабрики могут создавать любое количество юнитов.
- Фабрики могут вызывать любые методы effector.
- Фабрики могут вызывать другие фабрики из других модулей.
- Модули с фабриками могут экспортировать любое количество функций.
- Фабрики должны быть скомпилированы с `effector/babel-plugin`, как и код, который их использует.

### Примеры (#configuration-factories-examples)

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

Импорт `createEffectStatus` из `'./createEffectStatus'` рассматривался как фабричная функция, поэтому каждое хранилище, созданное ею,
имеет свой собственный [sid](/en/api/effector/babel-plugin#sid) и будет обрабатываться [serialize](/en/api/effector/serialize)
независимо, хотя без `factories` они будут использовать один и тот же `sid`.

## `reactSsr` (#configuration-reactSsr)

Заменяет импорты из `effector-react` на `effector-react/scope`. Полезно для сборки как серверных, так и клиентских
сборок из одной кодовой базы.

:::warning{title="Устарело"}
С [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) команда разработчиков рекомендует удалить эту опцию из конфигурации `babel-plugin`, потому что [effector-react](/en/api/effector-react) поддерживает SSR по умолчанию.
:::

### Формула (#configuration-reactSsr-formulae)

```json
[
  "effector/babel-plugin",
  {
    "reactSsr": false
  }
]
```

- Тип: `boolean`
- По умолчанию: `false`

## `addNames` (#configuration-addNames)

Добавляет имя к вызовам фабрик юнитов. Полезно для минификации и обфускации production сборок.

:::info{title="с"}
[effector 21.8.0](https://changelog.effector.dev/#effector-21-8-0)
:::

### Формула (#configuration-addNames-formulae)

```json
[
  "effector/babel-plugin",
  {
    "addNames": true
  }
]
```

- Тип: `boolean`
- По умолчанию: `true`

## `addLoc` (#configuration-addLoc)

Добавляет местоположение к вызовам методов. Используется devtools, например [effector-logger](https://github.com/effector/logger).

### Формула (#configuration-addLoc-formulae)

```json
[
  "effector/babel-plugin",
  {
    "addLoc": false
  }
]
```

- Тип: `boolean`
- По умолчанию: `false`

## `debugSids` (#configuration-debugSids)

Добавляет путь к файлу и имя переменной определения юнита к sid. Полезно для отладки SSR.

### Формула (#configuration-debugSids-formulae)

```json
[
  "effector/babel-plugin",
  {
    "debugSids": false
  }
]
```

- Тип: `boolean`
- По умолчанию: `false`

## `noDefaults` (#configuration-noDefaults)

Опция для `effector/babel-plugin` для создания пользовательских фабрик юнитов с чистой конфигурацией.

:::info{title="с"}
[effector 20.2.0](https://changelog.effector.dev/#effector-20-2-0)
:::

### Формула (#configuration-noDefaults-formulae)

```json
[
  "effector/babel-plugin",
  {
    "noDefaults": false
  }
]
```

- Тип: `boolean`
- По умолчанию: `false`

### Примеры (#configuration-noDefaults-examples)

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

будет обработано как создатель хранилища и скомпилировано в

const foo = createInputField('-', {
  name: 'foo',
  sid: 'z&si65'
})

*/
```

# Использование со сборщиками (#bundlers)

## Vite + React (SSR) (#bundlers-ViteReactSSR)

Для использования с `effector/babel-plugin`, необходимо выполнить следующие шаги:

1. Установите пакет `@vitejs/plugin-react`.
2. `vite.config.js` должен выглядеть следующим образом:

> Примечание: `effector/babel-plugin` не является отдельным пакетом, он входит в состав `effector`

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["effector/babel-plugin"],
        // Использовать .babelrc файлы
        babelrc: true,
        // Использовать babel.config.js файлы
        configFile: true,
      },
    }),
  ],
});
```