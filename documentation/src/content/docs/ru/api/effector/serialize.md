---
title: serialize
description: Метод для сериализации состояний приложения в пределах scope
lang: ru
---

```ts
import { serialize, type Scope } from "effector";
```

# Методы (#methods)

## `serialize(scope, params)` (#methods-serialize)

Сопутствующий метод для [_fork_](/ru/api/effector/fork). Позволяет получить сериализованное значение всех store'ов в пределах [scope](/ru/api/effector/Scope). Основная цель — сериализация состояния приложения на стороне сервера во время SSR.

:::warning{title="Внимание"}
Для использования этого метода требуется [_Babel plugin_](/ru/api/effector/babel-plugin) или [_SWC plugin_](/ru/api/effector/swc-plugin), так как эти плагины предоставляют sid для store'ов, которые необходимы для стабильной сериализации состояния.

Подробное объяснение можно найти [здесь](/ru/explanation/sids).
:::

### Формула (#methods-serialize-formulae)

```ts
serialize(scope: Scope, { ignore?: Array<Store<any>>; onlyChanges?: boolean }): {[sid: string]: any}
```

### Аргументы (#methods-serialize-arguments)

1. `scope` [_Scope_](/ru/api/effector/Scope): объект scope (форкнутый экземпляр)
2. `ignore` Опциональный массив [_Store_](/ru/api/effector/Store), который будет пропущен при сериализации (добавлено в 20.14.0)
3. `onlyChanges` Опциональный флаг, чтобы игнорировать сторы, которые не изменились в форке (предотвращает передачу значений по умолчанию по сети)

:::warning{title="Устарело"}
Начиная с [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0), свойство `onlyChanges` устарело.
:::

### Возвращает (#methods-serialize-returns)

Объект со значениями store'ов, использующий sid в качестве ключей.

:::warning{title="Внимание"}
Если у store [нет sid'а](/ru/api/effector/babel-plugin#sid), его значение будет пропущено при сериализации.
:::

### Примеры (#methods-serialize-examples)

#### Сериализация состояния форкнутого экземпляра (#methods-serialize-examples-serializeForkedInstanceState)

```ts
import { createStore, createEvent, allSettled, fork, serialize } from "effector";

const inc = createEvent();
const $store = createStore(42);
$store.on(inc, (x) => x + 1);

const scope = fork();

await allSettled(inc, { scope });

console.log(serialize(scope)); // => {[sid]: 43}
```

[Запустить пример](https://share.effector.dev/Uqos144z)

#### Использование с `onlyChanges` (#methods-serialize-examples-usingWithOnlyChanges)

С `onlyChanges` этот метод будет сериализовать только те сторы, которые были изменены каким-либо триггером во время работы или определены в поле `values` с помощью [fork](/ru/api/effector/fork) или [hydrate(scope)](/ru/api/effector/hydrate). После изменения store останется помеченным как измененное в данном scope, даже если оно вернется к состоянию по умолчанию во время работы, иначе клиент не обновит этот store на своей стороне, что является неожиданным и непоследовательным.
Это позволяет нам гидрировать состояние клиента несколько раз, например, во время смены маршрутов в next.js.

```ts
import { createDomain, fork, serialize, hydrate } from "effector";

const app = createDomain();

/** store, который мы хотим гидрировать с сервера */
const $title = app.createStore("dashboard");

/** store, который не используется сервером */
const $clientTheme = app.createStore("light");

/** scope в клиентском приложении */
const clientScope = fork(app, {
  values: new Map([
    [$clientTheme, "dark"],
    [$title, "profile"],
  ]),
});

/** scope на стороне сервера для страницы чатов, созданный для каждого запроса */
const chatsPageScope = fork(app, {
  values: new Map([[$title, "chats"]]),
});

/** этот объект будет содержать только данные $title
 * так как $clientTheme никогда не изменялся в server scope */
const chatsPageData = serialize(chatsPageScope, { onlyChanges: true });
console.log(chatsPageData);
// => {'-l644hw': 'chats'}

/** таким образом, заполнение значений с сервера затронет только соответствующие сторы */
hydrate(clientScope, { values: chatsPageData });

console.log(clientScope.getState($clientTheme));
// => dark
```

[Запустить пример](https://share.effector.dev/BQhzISFV)
