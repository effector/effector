---
title: inspect
lang: ru
---

```ts
import { inspect } from "effector/inspect";
```

Специальные методы API, предназначенные для обработки сценариев отладки и мониторинга, не предоставляя слишком много доступа к внутренностям вашего приложения.

Полезны для создания девтулз, мониторинга и наблюдения в production.

# Inspect API (#inspect-api)

Позволяет отслеживать любые вычисления, происходящие в ядре effector.

## `inspect()` (#inspect-api-inspect)

### Пример (#inspect-api-inspect-example)

```ts
import { inspect, type Message } from "effector/inspect";

import { someEvent } from "./app-code";

function logInspectMessage(m: Message) {
  const { name, value, kind } = m;

  return console.log(`[${kind}] ${name} ${value}`);
}

inspect({
  fn: (m) => {
    logInspectMessage(m);
  },
});

someEvent(42);
// выведет что-то вроде
// [event] someEvent 42
// [on] 42
// [store] $count 1337
// ☝️ допустим, что редьюсер добавляет 1295 к предоставленному числу
//
// и так далее, любые триггеры
```

[Scope](/ru/api/effector/Scope) ограничивает область, в которой можно отслеживать вычисления. Если scope не предоставлен — будут отслеживаться вычисления вне scope.

```ts
import { fork, allSettled } from "effector";
import { inspect, type Message } from "effector/inspect";

import { someEvent } from "./app-code";

function logInspectMessage(m: Message) {
  const { name, value, kind } = m;

  return console.log(`[${kind}] ${name} ${value}`);
}

const myScope = fork();

inspect({
  scope: myScope,
  fn: (m) => {
    logInspectMessage(m);
  },
});

someEvent(42);
// ☝️ Нет логов! Это потому, что отслеживание было ограничено myScope

allSettled(someEvent, { scope: myScope, params: 42 });
// [event] someEvent 42
// [on] 42
// [store] $count 1337
```

## Трассировка (#inspect-api-tracing)

Добавление настройки `trace: true` позволяет просматривать предыдущие вычисления, которые привели к текущему. Это полезно для отладки конкретной причины возникновения некоторых событий.

### Пример (#inspect-api-tracing-example)

```ts
import { fork, allSettled } from "effector";
import { inspect, type Message } from "effector/inspect";

import { someEvent, $count } from "./app-code";

function logInspectMessage(m: Message) {
  const { name, value, kind } = m;

  return console.log(`[${kind}] ${name} ${value}`);
}

const myScope = fork();

inspect({
  scope: myScope,
  trace: true, // <- явная настройка
  fn: (m) => {
    if (m.kind === "store" && m.sid === $count.sid) {
      m.trace.forEach((tracedMessage) => {
        logInspectMessage(tracedMessage);
        // ☝️ здесь мы логируем трассировку обновления конкретного store
      });
    }
  },
});

allSettled(someEvent, { scope: myScope, params: 42 });
// [on] 42
// [event] someEvent 42
// ☝️ трассировки предоставляются в обратном порядке, так как мы смотрим назад во времени
```

## Ошибки (#inspect-api-errors)

Effector не допускает исключений в чистых функциях. В таком случае вычисление ветви останавливается, и исключение логируется. Также в таком случае есть специальный тип сообщения:

### Пример (#inspect-api-errors-example)

```ts
inspect({
  fn: (m) => {
    if (m.type === "error") {
      // сделать что-то с этим
      console.log(`${m.kind} ${m.name} computation has failed with ${m.error}`);
    }
  },
});
```

# Inspect Graph (#inspect-graph)

Позволяет отслеживать объявления юнитов, [фабрик](/ru/api/effector/babel-plugin#factories) и [регионов](/ru/api/effector/withRegion).

## Пример (#inspect-graph-example)

```ts
import { createStore } from "effector";
import { inspectGraph, type Declaration } from "effector/inspect";

function printDeclaration(d: Declaration) {
  console.log(`${d.kind} ${d.name}`);
}

inspectGraph({
  fn: (d) => {
    printDeclaration(d);
  },
});

const $count = createStore(0);
// выведет "store $count" в консоль
```

## `withRegion` (#inspect-graph-withRegion)

Метаданные, предоставленные через корневой узел региона, доступны при объявлении.

### Пример (#inspect-graph-withRegion-example)

```ts
import { createNode, withRegion, createStore } from "effector";
import { inspectGraph, type Declaration } from "effector/inspect";

function createCustomSomething(config) {
  const $something = createStore(0);

  withRegion(createNode({ meta: { hello: "world" } }), () => {
    // какой-то код
  });

  return $something;
}
inspectGraph({
  fn: (d) => {
    if (d.type === "region") console.log(d.meta.hello);
  },
});

const $some = createCustomSomething({});
// выведет "world"
```
