---
title: createEffect
description: метод для создания эффекта
lang: ru
---

Метод для создания [эффектов](/ru/api/effector/Effect).

## createEffect с обработчиком событий

### Формула (#formulae_handler)

```typescript
createEffect(handler?)
```

**Аргументы**

1. `handler` (_Function_): Функция для обработки вызовов эффектов, также может быть задана с помощью [use(handler)](/ru/api/effector/Effect#use-handler)

**Возвращает**

[_Effect_](/ru/api/effector/Effect): Новый эффект

:::info
Вы должны задать обработчик в [createEffect](/ru/api/effector/createEffect) или же в [.use](/ru/api/effector/Effect#use-handler) методе позже, иначе эффект выбросит исключение "no handler used in _%effect name%_"
:::

:::info{title="since"}
[effector 21.3.0](https://changelog.effector.dev/#effector-21-3-0)
:::

### Примеры

#### Создание эффекта с обработчиком событий

```js
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

[Запустить пример](https://share.effector.dev/7K23rdej)

#### Изменение состояния по завершению эффекта

```js
import { createStore, createEffect } from "effector";

const fetchUserReposFx = createEffect(async ({ name }) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

const $repos = createStore([]).on(fetchUserReposFx.doneData, (_, repos) => repos);

$repos.watch((repos) => {
  console.log(`${repos.length} repos`);
});
// => 0 репозиториев

await fetchUserReposFx({ name: "zerobias" });
// => 26 репозиториев
```

[Запустить пример](https://share.effector.dev/uAJFC1XM)

#### Назначение обработчика для эффекта после его создания

```js
import { createEffect } from "effector";

const fetchUserReposFx = createEffect();

fetchUserReposFx.use(async ({ name }) => {
  const url = `https://api.github.com/users/${name}/repos`;
  const req = await fetch(url);
  return req.json();
});

await fetchUserReposFx({ name: "zerobias" });
```

[Запустить пример](https://share.effector.dev/e1QPH9Uq)

#### Наблюдение за состоянием эффекта

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

## createEffect с параметрами

Создает эффект с обработчиком событий и именем, которые заданы в объекте параметров

### Формула (#formulae_config)

```typescript
createEffect({ handler, name });
```

**Аргументы**

1. `config`? (_Params_): Эффект
   - `handler` (_Function_): Функция для обработки вызовов эффектов, также может быть назначена с [use(handler)](#use)
   - `name`? (_string_): Необязательное имя эффекта

**Возвращает**

[_Effect_](/ru/api/effector/Effect): Новый эффект

### Примеры

#### Создание эффекта с заданным именем

```js
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

[Запустить пример](https://share.effector.dev/GynSzKee)
