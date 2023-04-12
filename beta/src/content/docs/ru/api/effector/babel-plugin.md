---
title: Babel plugin
lang: ru
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

## Использование

В простейшем случае его можно использовать без какой-либо настройки:

```json
// .babelrc
{
  "plugins": ["effector/babel-plugin"]
}
```

### sid

:::info
Добавлено в effector 20.2.0
:::

Стабильный идентификатор для событий, эффектов, сторов и доменов, сохраняемый между окружениями, для обработки клиент-серверного взаимодействия в рамках одной кодовой базы.
Ключевым преимуществом является то, что sid может быть автоматически сгенерирован через `effector/babel-plugin` с конфигурацией по умолчанию и будет стабилен между сборками.

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

## Конфигурация

### importName

- Type: `string | string[]`
- Default: `['effector', 'effector/compat']`

Имя импорта или имена импортов, которые(-й) будут(-ет) обрабатываться плагином.

### factories

:::info
Добавлено в effector 21.6.0
:::

- Type: `string[]`

Принимает массив имен модулей, экспорты которых будут рассматриваться как пользовательские фабрики, и каждый вызов таких фабрик будет иметь уникальный префикс для [сидов](/ru/api/effector/babel-plugin#sid) юнитов внутри них. Применяется для реализации SSR, для чисто клиентского приложения не требуется.

- Фабрики могут иметь любое количество аргументов
- Фабрики могут создавать любое количество юнитов
- Фабрики могут вызывать любые эффекторные методы
- Фабрики могут вызывать другие фабрики из других модулей
- Модули с фабриками могут экспортировать любое количество функций
- Фабрики должны быть скомпилированы с `effector/babel-plugin`, как и код, который их использует

#### Пример

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

### reactSsr

:::info
Добавлено в effector 21.5.0
:::

- Type: `boolean`
- Default: `false`

Заменяет импорты из `effector-react` на `effector-react/scope`. Полезно для создания серверных и клиентских сборок из одной и той же кодовой базы.

### addNames

:::info
Добавлено в effector 21.8.0
:::

- Type: `boolean`
- Default: `true`

Добавляет имена к вызовам фабрик юнитов. Отключение применяется для минификации и обфускации продакшн сборок.

### addLoc

- Type: `boolean`
- Default: `false`

Добавляет местоположение к вызовам методов. Используется инструментами для разработчиков, например, [effector-logger](https://github.com/effector/logger)

### debugSids

> `debugSids: boolean`

Добавляет в sid путь к файлу и имя переменной где объявлен unit. Очень полезно при отладке SSR.

### noDefaults

:::info
Добавлено в effector 20.2.0
:::

- Type: `boolean`
- Default: `false`

Опция для `effector/babel-plugin` для создания пользовательских фабрик юнитов с чистой конфигурацией, изначально не делающей ничего.

:::info
Оптимальнее использовать [factories](#factories)
:::

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
