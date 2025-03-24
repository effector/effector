---
title: Протокол @@unitShape
description: Повторное использование привязок UI-библиотек для ваших собственных библиотек на основе effector
lang: ru
---

:::info{title="Начиная с"}
[effector-react 22.4.0](https://changelog.effector.dev/#effector-react-22-4-0), effector-solid 0.22.7
:::

Effector предоставляет способ использования юнитов ([Store](/ru/api/effector/Store), [Event](/ru/api/effector/Event), [Effect](/ru/api/effector/Effect)) в UI-библиотеках с помощью специальных библиотек, таких как `effector-react`, `effector-solid` и т.д. Обычно они позволяют привязывать любые юниты к UI-фреймворку:

```ts
import { createStore } from "effector";
import { useUnit } from "effector-react";

const $value = createStore("Привет!");

const Component = () => {
  const { value } = useUnit({ value: $value });

  return <p>{value}</p>;
};
```

Но что, если вы хотите создать свою собственную библиотеку на основе effector с какими-то пользовательскими сущностями? Например, вы хотите создать библиотеку маршрутизации с пользовательской сущностью `Route`, и вы хотите позволить пользователям использовать её с привязками `effector-react`:

```ts
import { createRoute } from "my-router-library";
import { useUnit } from "effector-react";

const mainPageRoute = createRoute(/* ... */);

const Component = () => {
  const { params } = useUnit(mainPageRoute);

  return <p>{params.name}</p>;
};
```

Это возможно с помощью протокола `@@unitShape`. Он позволяет определить форму юнита в пользовательской сущности и затем использовать её в UI-библиотеках. Просто добавьте поле `@@unitShape` с функцией, которая возвращает форму юнитов, в вашу сущность:

```ts
function createRoute(/* ... */) {
  const $params = createStore(/* ... */);

  return {
    "@@unitShape": () => ({
      params: $params,
    }),
  };
}
```

## FAQ

---

**Вопрос**: Как часто вызывается функция `@@unitShape`?

**Ответ**: Столько же раз, сколько вызывается сам `useUnit` – это зависит от UI-библиотеки. Например, `effector-react` вызывает её как любой другой хук – один раз за рендер компонента, но `effector-solid` вызывает `useUnit` один раз за монтирование компонента.

---

**Вопрос**: Как я могу узнать, какая UI-библиотека используется для конкретного вызова `@@unitShape`?

**Ответ**: Вы не можете. `@@unitShape` должен быть универсальным для всех UI-библиотек или должен проверять, какая UI-библиотека используется внутри, с помощью методов UI-библиотеки (например, `Context` в React или Solid).
