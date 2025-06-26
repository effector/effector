---
title: createEffect
description: Метод для создания эффекта
lang: ru
---

# createEffect (#create-effect)

```ts
import { createEffect } from "effector";

const effectFx = createEffect();
```

Метод для создания [эффектов](/ru/api/effector/Effect). Возвращает новый [эффект](/ru/api/effector/Effect).

## Способы создания эффектов (#how-to-create-effects)

Метод `createEffect` поддерживает несколько способов создания эффектов:

1. С обработчиком - это самый простой способ.
2. С конфигурацией.
3. А также без обработчика, его можно будет задать позже с помощью метода [`.use(handler)`](/ru/api/effector/Effect#use-method).

### С обработчиком (#create-with-handler)

- **Тип**

```ts
createEffect<Params, Done, Fail = Error>(
  handler: (params: Params) => Done | Promise<Done>,
): Effect<Params, Done, Fail>
```

- **Пример**

```ts
import { createEffect } from "effector";

const fetchUserReposFx = createEffect(async ({ name }) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

fetchUserReposFx.done.watch(({ params, result }) => {
  console.log(result);
});

await fetchUserReposFx({ name: "zerobias" });
```

### С конфигурацией (#create-with-config)

Поле `name` используется для улучшения сообщений об ошибках и отладки.

- **Тип**

```ts
export function createEffect<Params, Done, Fail = Error>(config: {
  name?: string;
  handler?: (params: Params) => Promise<Done> | Done;
}): Effect<Params, Done, Fail>;
```

- **Пример**

```ts
import { createEffect } from "effector";

const fetchUserReposFx = createEffect({
  name: "fetch user repositories",
  async handler({ name }) {
    const url = `https://api.github.com/users/${name}/repos`;
    const req = await fetch(url);
    return req.json();
  },
});

await fetchUserReposFx({ name: "zerobias" });
```

### Без обработчика (#create-without-handler)

Чаще всего используется для тестов. [Более подробная информация](/ru/api/effector/Effect#use-method).

:::warning{title="use - это антипаттерн"}
Старайтесь не использовать `.use()`, так как это является антипаттерном и ухудшает вывод типов.
:::

- **Пример**

```ts
import { createEffect } from "effector";

const fetchUserReposFx = createEffect();

fetchUserReposFx.use(async ({ name }) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

await fetchUserReposFx({ name: "zerobias" });
```

## Примеры (#examples)

- **Изменение состояния по завершению эффекта**:

```ts
import { createStore, createEffect } from "effector";

interface Repo {
  // ...
}

const $repos = createStore<Repo[]>([]);

const fetchUserReposFx = createEffect(async (name: string) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

$repos.on(fetchUserReposFx.doneData, (_, repos) => repos);

$repos.watch((repos) => {
  console.log(`${repos.length} repos`);
});
// => 0 репозиториев

await fetchUserReposFx("zerobias");
// => 26 репозиториев
```

[Запустить пример](https://share.effector.dev/uAJFC1XM)

- **Наблюдение за состоянием эффекта**:

```js
import { createEffect } from "effector";

const fetchUserReposFx = createEffect(async ({ name }) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

fetchUserReposFx.pending.watch((pending) => {
  console.log(`effect is pending?: ${pending ? "yes" : "no"}`);
});

fetchUserReposFx.done.watch(({ params, result }) => {
  console.log(params); // {name: 'zerobias'}
  console.log(result); // разрешенное значение, результат
});

fetchUserReposFx.fail.watch(({ params, error }) => {
  console.error(params); // {name: 'zerobias'}
  console.error(error); //  отклоненное значение, ошибка
});

fetchUserReposFx.finally.watch(({ params, status, result, error }) => {
  console.log(params); // {name: 'zerobias'}
  console.log(`handler status: ${status}`);

  if (error) {
    console.log("handler rejected", error);
  } else {
    console.log("handler resolved", result);
  }
});

await fetchUserReposFx({ name: "zerobias" });
```

[Запустить пример](https://share.effector.dev/LeurvtYA)

## Связанные API и статьи (#related-api-and-docs-to-create-effect)

- **API**
  - [`Effect API`](/ru/api/effector/Effect) - Описание эффектов, его методов и свойств
  - [`sample`](/ru/api/effector/sample) - Ключевой оператор для построения связей между юнитами
  - [`attach`](/ru/api/effector/attach) - Создает новые эффекты на основе других эффектов
- **Статьи**
  - [Работа с эффектами](/ru/essentials/work-with-async)
  - [Как типизировать эффекты и не только](/ru/essentials/typescript)
  - [Гайд по тестированию эффектов и других юнитов](/ru/guides/testing)
