---
id: babel-plugin
title: Babel plugin
---

Встроенный плагин для babel, который можно использовать для ssr и отладки. Он вставляет имя юнита, выводимое из имени переменной, и `sid` (стабильный идентификатор), вычисляемый по расположению в исходном коде.

К примеру, в случае [эффектов без обработчиков](./Effect.md#usehandler), это улучшит сообщение об ошибке, четко показывая, в каком эффекте произошла ошибка

```js
import {createEffect} from 'effector'

const fetchFx = createEffect()

fetchFx()

// => no handler used in fetchFx
```

[Запустить пример](https://share.effector.dev/Yb8vQ1Ly)

## Использование

В простейшем случае его можно использовать без какой-либо настройки:

```json title=".babelrc"
{
  "plugins": ["effector/babel-plugin"]
}
```

### .sid

:::note
Добавлено в effector 20.2.0
:::

Стабильный идентификатор для событий, эффектов, сторов и доменов, сохраняемый между окружениями, для обработки клиент-серверного взаимодействия в рамках одной кодовой базы.
Ключевым примуществом является то, что sid может быть автоматически сгенерирован через `effector/babel-plugin` с конфигурацией по умолчанию и будет стабилен между сборками

[Пример проекта](https://github.com/effector/effector/tree/master/examples/worker-rpc)

```js title="common.js"
import {createEffect} from 'effector'

export const getUser = createEffect({sid: 'GET /user'})
console.log(getUsers.sid)
// => GET /user
```

```js title="worker.js"
import {getUsers} from './common.js'

getUsers.use(userID => fetch(userID))

getUsers.done.watch(({result}) => {
  postMessage({sid: getUsers.sid, result})
})

onmessage = async ({data}) => {
  if (data.sid !== getUsers.sid) return
  getUsers(data.userID)
}
```

```js title="client.js"
import {createEvent} from 'effector'
import {getUsers} from './common.js'

const onMessage = createEvent()

const worker = new Worker('worker.js')
worker.onmessage = onMessage

getUsers.use(
  userID =>
    new Promise(rs => {
      worker.postMessage({sid: getUsers.sid, userID})
      const unwatch = onMessage.watch(({data}) => {
        if (data.sid !== getUsers.sid) return
        unwatch()
        rs(data.result)
      })
    }),
)
```

## Конфигурация

### importName

> `importName: string | string[]`

Имя импорта, которые будут обрабатываться плагином. По умолчанию имеет значение `["effector", "effector/compat"]`

### addLoc

> `addLoc: boolean`

Добавляет местоположение к вызовам методов. Используется инструментами для разработчиков, например, [effector-logger](https://github.com/effector/logger)

### reactSsr

> `reactSsr: boolean`

:::note
Добавлено в effector 21.5.0
:::

Заменяет импорты из `effector-react` на `effector-react/ssr`. Полезно для создания серверных и клиентских сборок из одной и той же кодовой базы

### factories

> `factories: string[]`

:::note
Добавлено в effector 21.6.0
:::

Принимает массив имен модулей, экспорты которых будут рассматриваться как пользовательские фабрики, и каждый вызов таких фабрик будет иметь уникальный префикс для [сидов](./babel-plugin.md#sid) юнитов внутри них. Применяется для реализации SSR, для чисто клиентского приложения не требуется

- Фабрики могут иметь любое количество аргументов

- Фабрики могут создавать любое количество юнитов

- Фабрики могут вызывать любые эффекторные методы

- Фабрики могут вызывать другие фабрики из других модулей

- Модули с фабриками могут экспортировать любое количество функций

- Фабрики должны быть скомпилированы с `effector/babel-plugin`, как и код, который их использует

#### Пример

```json title=".babelrc"
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

```js title="./src/createEffectStatus.js"
import {rootDomain} from './rootDomain'

export function createEffectStatus(fx) {
  const $status = rootDomain
    .createStore('init')
    .on(fx.finally, (_, {status}) => status)
  return $status
}
```

```js title="./src/statuses.js"
import {createEffectStatus} from './createEffectStatus'
import {fetchUserFx, fetchFriendsFx} from './api'

export const $fetchUserStatus = createEffectStatus(fetchUserFx)
export const $fetchFriendsStatus = createEffectStatus(fetchFriendsFx)
```

Импорт `createEffectStatus` из `'./createEffectStatus'` рассматривается как фабричная функция, поэтому каждый созданный ею стор получит свой собственный [sid](./babel-plugin.md#sid) и будет обрабатываться [serialize](./serialize.md) независимо, в то время как без `factories` они все будут иметь один и тот же `sid`

### addNames

> `addNames: boolean`

:::note
Добавлено в effector 21.8.0
:::

Добавляет имена к вызовам фабрик юнитов. По умолчанию имеет значение `true`. Отключение применяется для минификации и обфускации производственных сборок

### noDefaults

> `noDefaults: boolean`

:::note
Добавлено в effector 20.2.0
:::

Опция для effector/babel-plugin для создания пользовательских фабрик юнитов с чистой конфигурацией, изначально не делающей ничего

:::note
Оптимальнее использовать [factories](#factories)
:::

```json title=".babelrc"
{
  "plugins": [
    ["effector/babel-plugin", {"addLoc": true}],
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

```js title="@lib/createInputField.js"
import {createStore} from 'effector'
import {resetForm} from './form'

export function createInputField(defaultState, {sid, name}) {
  return createStore(defaultState, {sid, name}).reset(resetForm)
}
```

```js title="src/state.js"
import {createInputField} from '@lib/createInputField'

const foo = createInputField('-')
/*

will be treated as store creator and compiled to

const foo = createInputField('-', {
  name: 'foo',
  sid: 'z&si65'
})

*/
```
