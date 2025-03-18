---
title: Babel плагин
lang: ru
---

Встроенный плагин для Babel может использоваться для SSR и отладки. Он добавляет имя [юнита](/ru/explanation/glossary#unit),
выведенное из имени переменной, и `sid` ([Стабильный Идентификатор](/ru/explanation/sids)), вычисленный из местоположения в исходном коде.

Например, в случае [эффектов без обработчиков](/ru/api/effector/Effect#use-handler), это улучшает сообщения об ошибках,
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

Стабильный хэш-идентификатор для событий, эффектов, сторов и доменов, сохраняемый между окружениями, для обработки взаимодействия клиент-сервер
в рамках одной кодовой базы.

Ключевое значение sid заключается в том, что он может быть автоматически сгенерирован `effector/babel-plugin` с конфигурацией по умолчанию, и он будет стабильным между сборками.

:::tip{title="Подробное объяснение"}
Если вам нужно подробное объяснение о том, зачем нужны SID и как они используются внутри, вы можете найти его, [перейдя по этой ссылке](/ru/explanation/sids)
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

Включите поддержку Hot Module Replacement (HMR) для очистки связей, подписок и побочных эффектов, управляемых Effector. Это предотвращает двойное срабатывание эффектов и наблюдателей.

:::warning{title="Экспериментально"}
Хотя опция и протестирована, она считается экспериментальной и может иметь неожиданные проблемы в разных сборщиках.
:::

### Формула (#configuration-hmr-formulae)

```json
"effector/babel-plugin",
  {
    "hmr": "es"
  }
]
```

- Тип: `"es"` | `"cjs"` | `"none"`
  - `"es"`: Использует API HMR `import.meta.hot` в сборщиках, соответствующих ESM, таких как Vite и Rollup
  - `"cjs"`: Использует API HMR `module.hot` в сборщиках, использующих CommonJS модули, таких как Webpack и Next.js
  - `"none"`: Отключает Hot Module Replacement.
- По умолчанию: `none`

:::info{title="Обратите внимание"}
При сборке для продакшена убедитесь, что задали опции `hmr` значение `"none"`, чтобы уменьшить размер бандла и улучшить производительность в runtime.
:::

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

Принимает массив имен модулей, экспорты которых рассматриваются как пользовательские фабрики, поэтому каждый вызов функции предоставляет уникальный префикс для [sids](/ru/api/effector/babel-plugin#sid) юнитов внутри них. Используется для
SSR ([серверный рендеринг](/ru/api/effector/Scope)) и не требуется для клиентских приложений.

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

Импорт `createEffectStatus` из `'./createEffectStatus'` рассматривался как фабричная функция, поэтому каждый стор, созданный ею,
имеет свой собственный [sid](/ru/api/effector/babel-plugin#sid) и будет обрабатываться [serialize](/ru/api/effector/serialize)
независимо, хотя без `factories` они будут использовать один и тот же `sid`.

## `addNames` (#configuration-addNames)

Добавляет имя к вызовам фабрик юнитов. Полезно для минификации и обфускации production сборок.

:::info{title="Начиная с"}
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

будет обработано как создатель стор и скомпилировано в

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
