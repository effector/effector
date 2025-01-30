---
title: SIDs
description: Stable IDentifiers
lang: ru
redirectFrom:
  - /ru/explanation/sids
  - /ru/docs/explanation/sids
---

# Хранилища и их SID

Effector основан на идее атомарного store. Это означает, что в приложении нет централизованного контроллера состояния или другой точки входа для сбора всех состояний в одном месте.

Итак, возникает вопрос — как отличать юниты между разными окружениями? Например, если мы запускаем приложение на сервере и сериализуем его состояние в JSON, как узнать, какая часть этого JSON должна быть помещена в конкретный store на клиенте?

Давайте обсудим, как эта проблема решается другими менеджерами состояний.

## Другие менеджеры состояний

### Один store

В менеджере состояний с одним store (например, Redux) этой проблемы вообще не существует. Это один store, который можно сериализовать и десериализовать без какой-либо дополнительной информации.

:::info
Фактически, один store принуждает вас к созданию уникальных имен для каждой его части неявным образом. В любом объекте вы не сможете создать дублирующие ключи, так что путь к части store — это уникальный идентификатор этой части.
:::

```ts
// server.ts
import { createStore } from "single-store-state-manager";

function handlerRequest() {
  const store = createStore({ initialValue: null });

  return {
    // Можно просто сериализовать весь store
    state: JSON.stringify(store.getState()),
  };
}

// client.ts
import { createStore } from "single-store-state-manager";

// Предположим, что сервер поместил состояние в HTML
const serverState = readServerStateFromWindow();

const store = createStore({
  // Просто парсим все состояние и используем его как состояние клиента
  initialValue: JSON.parse(serverState),
});
```

Это здорово, что не нужно никаких дополнительных инструментов для сериализации и десериализации, но у одного store есть несколько проблем:

- Он не поддерживает tree-shaking и code-splitting, вам все равно придется загружать весь store
- Из-за своей архитектуры он требует дополнительных инструментов для исправления производительности (например, `reselect`)
- Он не поддерживает микрофронтенды и другие вещи, которые становятся все более популярными

### Множественные stores

К сожалению, менеджеры состояний, построенные вокруг идеи множественных stores, плохо решают эту проблему. Некоторые инструменты предлагают решения, подобные одному store (MobX), некоторые вообще не пытаются решить эту проблему (Recoil, Zustand).

:::info
Например, общий паттерн для решения проблемы сериализации в MobX — это [Root Store Pattern](https://dev.to/ivandotv/mobx-root-store-pattern-with-react-hooks-318d), который разрушает всю идею множественных stores.
:::

Мы рассматриваем SSR как первоклассного гражданина современных веб-приложений и собираемся поддерживать code-splitting или микрофронтенды.

## Уникальные идентификаторы для каждого store

Из-за архитектуры с множественными stores, Effector требует уникального идентификатора для каждого store. Это строка, которая используется для различения stores между разными окружениями. В мире Effector такие строки называются `sid`.

:::tip TL;DR

`sid` — это уникальный идентификатор store. Он используется для различения stores между разными окружениями.

:::

Давайте добавим его в некоторые stores:

```ts
const $name = createStore(null, { sid: "name" });
const $age = createStore(null, { sid: "age" });
```

Теперь мы можем сериализовать и десериализовать stores:

```ts
// server.ts
async function handlerRequest() {
  // создаем изолированный экземпляр приложения
  const scope = fork();

  // заполняем stores данными
  await allSettled($name, { scope, params: "Igor" });
  await allSettled($age, { scope, params: 25 });

  const state = JSON.serialize(serialize(scope));
  // -> { "name": "Igor", "age": 25 }

  return { state };
}
```

После этого кода у нас есть сериализованное состояние нашего приложения. Это простой объект со значениями stores. Мы можем вернуть его обратно в stores на клиенте:

```ts
// Предположим, что сервер поместил состояние в HTML
const serverState = readServerStateFromWindow();

const scope = fork({
  // Просто парсим все состояние и используем его как состояние клиента
  values: JSON.parse(serverState),
});
```

Конечно, написание `sid` для каждого store — это скучная работа. Effector предоставляет способ сделать это автоматически с помощью плагинов для трансформации кода.

### Автоматический способ (#how-to-add-sids-automatic)

Безусловно, создание уникальных идентификаторов вручную — это довольно скучная работа.

К счастью, существуют [`effector/babel-plugin`](/api/effector/babel-plugin) и [`@effector/swc-plugin`](/api/effector/swc-plugin), которые автоматически создадут SIDs.

Поскольку инструменты трансляции кода работают на уровне файла и запускаются до этапа сборки, возможно сделать SIDs **стабильными** для каждого окружения.

:::tip
Предпочтительно использовать [`effector/babel-plugin`](/api/effector/babel-plugin) или [`@effector/swc-plugin`](/api/effector/swc-plugin) вместо добавления SIDs вручную.
:::

**Пример кода**

Обратите внимание, что здесь нет никакой центральной точки — любое событие любой "фичи" может быть вызвано из любого места, и остальные части будут реагировать соответствующим образом.

```tsx
// src/features/first-name/model.ts
import { createStore, createEvent } from "effector";

export const firstNameChanged = createEvent<string>();
export const $firstName = createStore("");

$firstName.on(firstNameChanged, (_, firstName) => firstName);

// src/features/last-name/model.ts
import { createStore, createEvent } from "effector";

export const lastNameChanged = createEvent<string>();
export const $lastName = createStore("");

$lastName.on(lastNameChanged, (_, lastName) => lastName);

// src/features/form/model.ts
import { createEvent, sample, combine } from "effector";

import { $firstName, firstNameChanged } from "@/features/first-name";
import { $lastName, lastNameChanged } from "@/features/last-name";

export const formValuesFilled = createEvent<{ firstName: string; lastName: string }>();

export const $fullName = combine($firstName, $lastName, (first, last) => `${first} ${last}`);

sample({
  clock: formValuesFilled,
  fn: (values) => values.firstName,
  target: firstNameChanged,
});

sample({
  clock: formValuesFilled,
  fn: (values) => values.lastName,
  target: lastNameChanged,
});
```

Если это приложение было бы SPA или каким-либо другим клиентским приложением, на этом статья была бы закончена.

### Граница сериализации (#serialization-boundary)

Но в случае с рендерингом на стороне сервера всегда есть **граница сериализации** — точка, где все состояние преобразуется в строку, добавляется в ответ сервера и отправляется в браузер клиента.

#### Проблема (#serialization-boundary-problem)

И в этот момент нам **все еще нужно собрать состояния всех stores приложения** каким-то образом!

Кроме того, после того как клиентский браузер получил страницу, нам нужно "гидрировать" все обратно: распаковать эти значения на клиенте и добавить это "серверное" состояние в клиентские экземпляры всех stores.

#### Решение (#serialization-boundary-solution)

Это сложная проблема, и для ее решения effector нужен способ связать "серверное" состояние какого-то store с его клиентским экземпляром.

Хотя **это можно было бы** сделать путем введения "корневого store" или чего-то подобного, что управляло бы экземплярами stores и их состоянием за нас, это также принесло бы нам все минусы этого подхода, например, гораздо более сложный code-splitting — поэтому это все еще нежелательно.

Здесь нам очень помогут SIDs. Поскольку SID, по определению, одинаков для одного и того же store в любом окружении, effector может просто полагаться на него для обработки сериализации состояния и гидрации.

#### Пример (#serialization-boundary-example)

Это универсальный обработчик рендеринга на стороне сервера. Функция `renderHtmlToString` — это деталь реализации, которая будет зависеть от используемого вами фреймворка.

```tsx
// src/server/handler.ts
import { fork, allSettled, serialize } from "effector";

import { formValuesFilled } from "@/features/form";

async function handleServerRequest(req) {
  const scope = fork(); // создает изолированный контейнер для состояния приложения

  // вычисляем состояние приложения в этом scope
  await allSettled(formValuesFilled, {
    scope,
    params: {
      firstName: "John",
      lastName: "Doe",
    },
  });

  // извлекаем значения scope в простой js объект `{[storeSid]: storeState}`
  const values = serialize(scope);

  const serializedState = JSON.stringify(values);

  return renderHtmlToString({
    scripts: [
      `
        <script>
            self._SERVER_STATE_ = ${serializedState}
        </script>
      `,
    ],
  });
}
```

Обратите внимание, что здесь нет прямого импорта каких-либо stores приложения.
Состояние собирается автоматически, и его сериализованная версия уже содержит всю информацию, которая понадобится для гидрации.

Когда сгенерированный ответ поступает в браузер клиента, серверное состояние должно быть гидрировано в клиентские stores.
Благодаря SIDs, гидрация состояния также работает автоматически:

```tsx
// src/client/index.ts
import { Provider } from "effector-react";

const serverState = window._SERVER_STATE_;

const clientScope = fork({
  values: serverState, // просто назначаем серверное состояние на scope
});

clientScope.getState($lastName); // "Doe"

hydrateApp(
  <Provider value={clientScope}>
    <App />
  </Provider>,
);
```

На этом этапе состояние всех stores в `clientScope` такое же, как было на сервере, и для этого не потребовалось **никакой** ручной работы.

## Уникальные SIDs (#unique-sids)

Стабильность SIDs обеспечивается тем, что они добавляются в код до того, как произойдет какая-либо сборка.

Но поскольку оба плагина, и `babel`, и `swc`, могут "видеть" содержимое только одного файла в каждый момент времени, есть случай, когда SIDs будут стабильными, но **могут быть не уникальными**.

Чтобы понять почему, нам нужно углубиться немного дальше во внутренности плагинов.

Оба плагина `effector` используют один и тот же подход к трансформации кода. По сути, они делают две вещи:

1. Добавляют `sid` и любую другую мета-информацию к вызовам фабрик Effector, таким как `createStore` или `createEvent`.
2. Оборачивают любые кастомные фабрики с помощью вспомогательной функции `withFactory`, которая позволяет сделать `sid` внутренних юнитов также уникальными.

### Встроенные фабрики юнитов (#built-in-factories)

Рассмотрим первый случай. Для следующего исходного кода:

```ts
const $name = createStore(null);
```

Плагин применит следующие трансформации:

```ts
const $name = createStore(null, { sid: "j3l44" });
```

:::tip
Плагины создают `sid` как хэш от местоположения юнита в исходном коде. Это позволяет сделать `sid` уникальными и стабильными.
:::

### Кастомные фабрики (#custom-factories)

Второй случай касается кастомных фабрик. Эти фабрики обычно создаются для абстрагирования какого-то общего паттерна.

Примеры кастомных фабрик:

- `createQuery`, `createMutation` из [`farfetched`](https://ff.effector.dev/)
- `debounce`, `throttle` и т.д. из [`patronum`](https://patronum.effector.dev/)
- Любая кастомная фабрика в вашем коде, например фабрика сущности [feature-flag](https://ff.effector.dev/recipes/feature_flags.html)

:::tip
farfetched, patronum, @effector/reflect, atomic-router и @withease/factories поддерживаются по умолчанию и не требуют дополнительной настройки.
:::

Для этого объяснения мы создадим очень простую фабрику:

```ts
// src/shared/lib/create-name/index.ts
export function createName() {
  const updateName = createEvent();
  const $name = createStore(null);

  $name.on(updateName, (_, nextName) => nextName);

  return { $name };
}

// src/feature/persons/model.ts
import { createName } from "@/shared/lib/create-name";

const personOne = createName();
const personTwo = createName();
```

Сначала плагин добавит `sid` во внутренние stores фабрики:

```ts
// src/shared/lib/create-name/index.ts
export function createName() {
  const updateName = createEvent();
  const $name = createStore(null, { sid: "ffds2" });

  $name.on(updateName, (_, nextName) => nextName);

  return { $name };
}

// src/feature/persons/model.ts
import { createName } from "@/shared/lib/create-name";

const personOne = createName();
const personTwo = createName();
```

Но этого недостаточно, потому что мы можем создать два экземпляра `createName`, и внутренние stores обоих этих экземпляров будут иметь одинаковые SIDs!
Эти SIDs будут стабильными, но не уникальными.

Чтобы исправить это, нам нужно сообщить плагину о нашей кастомной фабрике:

```json
// .babelrc
{
  "plugins": [
    [
      "effector/babel-plugin",
      {
        "factories": ["@/shared/lib/create-name"]
      }
    ]
  ]
}
```

Поскольку плагин "видит" только один файл за раз, нам нужно предоставить ему фактический путь импорта, используемый в модуле.

:::tip
Если в модуле используются относительные пути импорта, то полный путь от корня проекта должен быть добавлен в список `factories`, чтобы плагин мог его разрешить.

Если используются абсолютные или псевдонимы путей (как в примере), то именно этот псевдонимный путь должен быть добавлен в список `factories`.

Большинство популярных проектов экосистемы уже включены в настройки плагина по умолчанию.
:::

Теперь плагин знает о нашей фабрике, и он обернет `createName` внутренней функцией `withFactory`:

```ts
// src/shared/lib/create-name/index.ts
export function createName() {
  const updateName = createEvent();
  const $name = createStore(null, { sid: "ffds2" });

  $name.on(updateName, (_, nextName) => nextName);

  return { $name };
}

// src/feature/persons/model.ts
import { withFactory } from "effector";
import { createName } from "@/shared/lib/create-name";

const personOne = withFactory({
  sid: "gre24f",
  fn: () => createName(),
});
const personTwo = withFactory({
  sid: "lpefgd",
  fn: () => createName(),
});
```

Благодаря этому SIDs внутренних юнитов фабрики также уникальны, и мы можем безопасно сериализовать и десериализовать их.

```ts
personOne.$name.sid; // gre24f|ffds2
personTwo.$name.sid; // lpefgd|ffds2
```

### Как работает `withFactory`

`withFactory` — это вспомогательная функция, которая позволяет создавать уникальные `sid` для внутренних юнитов. Это функция, которая принимает объект с `sid` и `fn` свойствами. `sid` — это уникальный идентификатор фабрики, а `fn` — функция, которая создает юниты.

Внутренняя реализация `withFactory` довольно проста: она помещает полученный `sid` в глобальную область видимости перед вызовом `fn` и удаляет его после. Любая функция создателя Effector пытается прочитать это глобальное значение при создании и добавляет его значение к `sid` юнита.

```ts
let globalSid = null;

function withFactory({ sid, fn }) {
  globalSid = sid;

  const result = fn();

  globalSid = null;

  return result;
}

function createStore(initialValue, { sid }) {
  if (globalSid) {
    sid = `${globalSid}|${sid}`;
  }

  // ...
}
```

Из-за однопоточной природы JavaScript, использование глобальных переменных для этой цели безопасно.

:::info
Конечно, реальная реализация немного сложнее, но идея остается той же.
:::

## Резюме

1. Любой менеджер состояний с множественными stores требует уникальных идентификаторов для каждого store, чтобы различать их между разными окружениями.
2. В мире Effector такие строки называются `sid`.
3. Плагины для трансформации кода добавляют `sid` и мета-информацию к созданию юнитов Effector, таких как `createStore` или `createEvent`.
4. Плагины для трансформации кода оборачивают кастомные фабрики вспомогательной функцией `withFactory`, которая позволяет сделать `sid` внутренних юнитов уникальными.
