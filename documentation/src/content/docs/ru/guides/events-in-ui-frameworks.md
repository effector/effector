---
title: Как реагировать на события модели в UI
description: Рассказываем как в UI реагировать на вызов событий модели данных
---

# Как реагировать на события модели в UI (#events-in-ui-frameworks)

Иногда у вас может возникнуть необходимость что-то сделать на уровне UI фреймворка при вызове [события](/ru/api/effector/Event) в модели данных. Например, вы хотите показать оповещение когда запрос на получение данных завершился ошибкой.

## Описание проблемы (#the-problem)

:::tip{title="Выбор UI фреймворка"}
В этой статье мы будем использовать [React](https://reactjs.org/) в качестве примера UI фреймворка. Однако те же принципы могут быть применены к любому другому UI фреймворку.
:::

Давайте представим, что у нас есть приложение, которое использует [Ant Design](https://ant.design/) и его [систему оповещений](https://ant.design/components/notification). Показать оповещение на уровне UI достаточно просто:

```tsx
import { notification } from "antd";

function App() {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = () => {
    api.info({
      message: "Hello, React",
      description: "Notification from UI-layer",
    });
  };

  return (
    <>
      {contextHolder}
      <button onClick={showNotification}>Show notification</button>
    </>
  );
}
```

Но, мы хотим показывать оповещение когда запрос на получение данных завершился ошибкой. При этом, весь поток данных приложения не должен быть доступен на уровне UI. Нам нужно найти способ реагировать на вызов [событий](/ru/api/effector/Event) в модели данных не раскрывая всю модель.

Давайте представим, что у нас есть [событие](/ru/api/effector/Event), которое отвечает за ошибку при загрузке данных:

```ts
// model.ts
import { createEvent } from "effector";

const dataLoadingFailed = createEvent<{ reason: string }>();
```

Наше приложение вызывает это событие каждый раз, когда запрос на получение данных завершается ошибкой.

## Решение проблемы (#the-solution)

Нам как-то нужно связать `dataLoadingFailed` и `notification.useNotification`.

Давай посмотрим на идеальное решение этой проблемы, а также на пару не очень хороших решений.

### Сохранить `notification` инстанс в стор (#ideal-solution)

Лучший способ - сохранить API-инстанс `notification` в [стор](/ru/api/effector/Store) и использовать его через [эффект](/ru/api/effector/Effect). Давайте создадим пару новых юнитов для этого.

```ts
// notifications.ts
import { createEvent, createStore, sample } from "effector";

// Мы будем использовать инстанс из этого стора в приложении
const $notificationApi = createStore(null);

// Это событие должно вызываться каждый раз, когда создается новый инстанс notification API
export const notificationApiChanged = createEvent();

// Сохраняем новый инстанс в стор
sample({
  clock: notificationApiChanged,
  target: $notificationApi,
});
```

Теперь нам нужно вызывать `notificationApiChanged`, чтобы сохранить инстанс `notification` API в [стор](/ru/api/effector/Store) `$notificationApi`.

```tsx {8-15}
import { notification } from "antd";
import { useEffect } from "react";
import { useUnit } from "effector-react";

import { notificationApiChanged } from "./notifications";

function App() {
  // Используем useUnit чтобы получить событие из модели
  const onNewApiInstance = useUnit(notificationApiChanged);
  const [api, contextHolder] = notification.useNotification();

  // вызываем onNewApiInstance на каждое изменение api
  useEffect(() => {
    onNewApiInstance(api);
  }, [api]);

  return (
    <>
      {contextHolder}
      {/* ...остальное приложение */}
    </>
  );
}
```

После этого мы имеем валидный [стор](/ru/api/effector/Store) `$notificationApi` с инстансом `notification` API. Мы можем использовать его в любом месте приложения. Давайте создадим пару [эффектов](/ru/api/effector/Effect), чтобы удобно с ним работать.

```ts
// notifications.ts
import { attach } from "effector";

// ...

export const showWarningFx = attach({
  source: $notificationApi,
  effect(api, { message, description }) {
    if (!api) {
      throw new Error("Notification API is not ready");
    }

    api.warning({ message, description });
  },
});
```

:::tip{title="чуть-чуть об attach"}
[`attach`](/ru/api/effector/attach) - это функция, которая позволяет привязать конкретный [стор](/ru/api/effector/Store) к [эффекту](/ru/api/effector/Effect). Это значит, что мы можем использовать `notificationApi` в `showWarningFx` без передачи его в качестве параметра.
:::

Теперь [эффект](/ru/api/effector/Effect) `showWarningFx` можно использовать в любом месте приложения без дополнительной возни.

```ts {8-13}
// model.ts
import { createEvent, sample } from "effector";

import { showWarningFx } from "./notifications";

const dataLoadingFailed = createEvent<{ reason: string }>();

// Вызываем showWarningFx когда происходит dataLoadingFailed
sample({
  clock: dataLoadingFailed,
  fn: ({ reason }) => ({ message: reason }),
  target: showWarningFx,
});
```

Теперь у нас есть валидное решение для обработки [событий](/ru/api/effector/Event) на уровне UI без раскрытия всего потока данных. Такой подход вы можете использовать для любых UI API, даже положить инстанс роутера в стор и управлять им из модели данных.

Однако , если вы хотите узнать, почему другие (возможно более очевидные) решения не так хороши, вы можете прочитать о них ниже.

### Плохое решение №1 (#bad-solution)

Плохое решение номер один - использовать глобальный инстанс `notification`.
Ant Design позволяет использовать глобальный инстанс notification.

```ts {7-17}
// model.ts
import { createEvent, createEffect, sample } from "effector";
import { notification } from "antd";

const dataLoadingFailed = createEvent<{ reason: string }>();

// Создаем эффект для показа оповещения
const showWarningFx = createEffect((params: { message: string }) => {
  notification.warning(params);
});

// Вызываем showWarningFx когда происходит dataLoadingFailed
sample({
  clock: dataLoadingFailed,
  fn: ({ reason }) => ({ message: reason }),
  target: showWarningFx,
});
```

В этом решение невозможно использовать какие-либо настройки Ant из React Context, потому что у него нет доступа к React вообще. Это значит, что оповещения не будут стилизованы должным образом и могут выглядеть иначе, чем остальная часть приложения.

**Так что, это не решение.**

### Плохое решение №2 (#bad-solution-2)

Второй плохое решение – использовать метод `.watch` [события](/ru/api/effector/Event) в компоненте.
Можно вызвать метод `.watch` [события](/ru/api/effector/Event)

```tsx {9-17}
import { useEffect } from "react";
import { notification } from "antd";

import { dataLoadingFailed } from "./model";

function App() {
  const [api, contextHolder] = notification.useNotification();

  useEffect(
    () =>
      dataLoadingFailed.watch(({ reason }) => {
        api.warning({
          message: reason,
        });
      }),
    [api],
  );

  return (
    <>
      {contextHolder}
      {/* ...остальное приложение */}
    </>
  );
}
```

Но в этом решении мы не соблюдаем [правила для scope](/ru/advanced/work-with-scope#scope-rules), а это значит, что у нас могут быть утечки памяти, проблемы с тестовой средой и инструментами типа Storybook.

**Так что, это не решение.**

## Связанные API и статьи (#related-api-and-docs)

- **API**

  - [`Scope`](/en/api/effector/Scope) – Описание скоупа и его методов
  - [`Event`](/en/api/effector/Event) – Описание события и его методов
  - [`Store`](/en/api/effector/Store) – Описание стора и его методов

- **Статьи**

  - [Почему вам нужно явное событие запуска приложения](/en/resources/explicit-start)
  - [Методы и правила работы со скоупом](/en/advanced/work-with-scope)
  - [Гайд по тестированию](/en/guides/testing)
