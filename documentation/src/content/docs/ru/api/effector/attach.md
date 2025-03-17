---
title: attach
description: Обертка для эффекта, которая позволяет маппить аргументы эффекта и использовать данные из сторов.
lang: ru
---

```ts
import { attach } from "effector";
```

:::info{title="Начиная с"}
[effector 20.13.0](https://changelog.effector.dev/#effector-20-13-0).

С версии [effector 22.4.0](https://changelog.effector.dev/#effector-encke-22-4-0) можно проверить, создан ли эффект через метод `attach` — [is.attached](/ru/api/effector/is#is-attached).
:::

Создает новые [эффекты](/ru/api/effector/Effect) на основе других эффектов и [сторов](/ru/api/effector/Store). Позволяет маппить параметры и обрабатывать ошибки.

Основные случаи использования: декларативный способ передачи значений из сторов в эффекты и предобработка аргументов. Наиболее полезный случай — `attach({ source, async effect })`.

:::tip{title="Примечание"}
Прикрепленные эффекты являются такими же полноценными объектами, как и обычные эффекты, созданные через [createEffect](/ru/api/effector/createEffect). Вы должны размещать их в тех же файлах, что и обычные эффекты, а также можете использовать ту же стратегию именования.
:::

# Методы (#methods)

## `attach({effect})` (#methods-attach-effect)

:::info{title="Начиная с"}
[effector 21.5.0](https://changelog.effector.dev/#effector-21-5-0)
:::

Создает эффект, который будет вызывать `effect` с переданными параметрами как есть. Это позволяет создавать отдельные эффекты с общим поведением.

### Формула (#methods-attach-effect-formulae)

```ts
const attachedFx = attach({ effect: originalFx });
```

- Когда `attachedFx` вызывается, `originalFx` также вызывается.
- Когда `originalFx` завершается (успешно/с ошибкой), `attachedFx` завершается с тем же состоянием.

### Аргументы (#methods-attach-effect-arguments)

- `effect` ([_Effect_](/ru/api/effector/Effect)): Обернутый эффект.

### Возвращает (#methods-attach-effect-returns)

[_Effect_](/ru/api/effector/Effect): Новый эффект.

### Типы (#methods-attach-effect-types)

```ts
const originalFx: Effect<Params, Done, Fail>;

const attachedFx: Effect<Params, Done, Fail> = attach({
  effect: originalFx,
});
```

В этом простом варианте `attach` типы `originalFx` и `attachedFx` будут одинаковыми.

### Примеры (#methods-attach-effect-examples)

Это позволяет создать _локальную_ копию эффекта, чтобы реагировать только на вызовы из текущего _локального_ кода.

```ts
import { createEffect, attach } from "effector";

const originalFx = createEffect((word: string) => {
  console.info("Напечатано:", word);
});

const attachedFx = attach({ effect: originalFx });

originalFx.watch(() => console.log("originalFx"));
originalFx.done.watch(() => console.log("originalFx.done"));

attachedFx.watch(() => console.log("attachedFx"));
attachedFx.done.watch(() => console.log("attachedFx.done"));

originalFx("первый");
// => originalFx
// => Напечатано: первый
// => originalFx.done

attachedFx("второй");
// => attachedFx
// => originalFx
// Напечатано: второй
// => originalFx.done
// => attachedFx.done
```

[Запустить пример](https://share.effector.dev/7Uhk4XfW)

## `attach({source, effect})` (#methods-attach-source-effect)

Создает эффект, который будет вызывать указанный эффект с данными из `source` стора.

### Формула (#methods-attach-source-effect-formulae)

```ts
const attachedFx = attach({
  source,
  effect: originalFx,
});
```

- Когда `attachedFx` вызывается, данные из `source` читаются, и `originalFx` вызывается с этими данными.
- Когда `originalFx` завершается, то же состояние (успех/ошибка) передается в `attachedFx`, и он завершается.

### Аргументы (#methods-attach-source-effect-arguments)

- `source` ([_Store_](/ru/api/effector/Store) | `{[key: string]: Store}`): Стор или объект с сторами, значения которых будут переданы во второй аргумент `mapParams`.
- `effect` ([_Effect_](/ru/api/effector/Effect)): Исходный эффект.

### Возвращает (#methods-attach-source-effect-returns)

[_Effect_](/ru/api/effector/Effect): Новый эффект.

### Типы (#methods-attach-source-effect-types)

:::tip{title="Примечание"}
Вам не нужно явно указывать типы для каждого объявления. Следующий пример предназначен для лучшего понимания.
:::

В большинстве случаев вы будете писать код так, без явных типов для `let`/`const`:

```ts
const originalFx = createEffect<OriginalParams, SomeResult, SomeError>(async () => {});
const $store = createStore(initialValue);

const attachedFx = attach({
  source: $store,
  effect: originalFx,
});
```

#### Один стор

```ts
const originalFx: Effect<T, Done, Fail>;
const $store: Store<T>;

const attachedFx: Effect<void, Done, Fail> = attach({
  source: $store,
  effect: originalFx,
});
```

[Попробуйте в песочнице TypeScript](https://tsplay.dev/NBJDDN)

Типы стора в `source` и параметров `effect` должны совпадать.
Но `attachedFx` будет опускать тип параметров, что означает, что прикрепленный эффект не требует никаких параметров.

#### Объект стора

```ts
const originalFx: Effect<{ a: A; b: B }, Done, Fail>;
const $a: Store<A>;
const $b: Store<B>;

const attachedFx: Effect<void, Done, Fail> = attach({
  source: { a: $a, b: $b },
  effect: originalFx,
});
```

[Попробуйте в песочнице TypeScript](https://tsplay.dev/mbE58N)

Типы объекта `source` должны совпадать с параметрами `originalFx`. Но `attachedFx` будет опускать тип параметров, что означает, что прикрепленный эффект не требует никаких параметров.

### Примеры (#methods-attach-source-effect-examples)

```ts
import { createEffect, createStore, attach } from "effector";

const requestPageFx = createEffect<{ page: number; size: number }, string[]>(
  async ({ page, size }) => {
    console.log("Запрошено", page);
    return page * size;
  },
);

const $page = createStore(1);
const $size = createStore(20);

const requestNextPageFx = attach({
  source: { page: $page, size: $size },
  effect: requestPageFx,
});

$page.on(requestNextPageFx.done, (page) => page + 1);

requestPageFx.doneData.watch((position) => console.log("requestPageFx.doneData", position));

await requestNextPageFx();
// => Запрошено 1
// => requestPageFx.doneData 20

await requestNextPageFx();
// => Запрошено 2
// => requestPageFx.doneData 40

await requestNextPageFx();
// => Запрошено 3
// => requestPageFx.doneData 60
```

[Запустить пример](https://share.effector.dev/CoHyLc0W)

## `attach({source, async effect})` (#methods-attach-source-async-effect)

:::info{title="Начиная с"}
[effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0)
:::

Создает эффект, который будет вызывать асинхронную функцию с данными из `source` стора.

### Формула (#methods-attach-source-async-effect-formulae)

```ts
const attachedFx = attach({
  source,
  async effect(source, params) {},
});
```

- Когда `attachedFx` вызывается, данные из `source` читаются, и вызывается функция `effect`.
- Когда функция `effect` возвращает успешный `Promise`, `attachedFx` завершается с данными из функции как `attachedFx.done`.
- Когда функция `effect` выбрасывает исключение или возвращает отклоненный `Promise`, `attachedFx` завершается с данными из функции как `attachedFx.fail`.

### Аргументы (#methods-attach-source-async-effect-arguments)

- `effect` (_Function_): `(source: Source, params: Params) => Promise<Result> | Result`
- `source` ([_Store_](/ru/api/effector/Store) | `{[key: string]: Store}`): Стор или объект с сторами, значения которых будут переданы в первый аргумент `effect`.

### Возвращает (#methods-attach-source-async-effect-returns)

[_Effect_](/ru/api/effector/Effect): Новый эффект.

### Использование с областью видимости (#methods-attach-source-async-effect-scope)

Любые эффекты, вызванные внутри функции `async effect`, будут распространять область видимости.

```ts
const outerFx = createEffect((count: number) => {
  console.log("Попадание", count);
});

const $store = createStore(0);
const attachedFx = attach({
  source: $store,
  async effect(count, _: void) {},
});
```

**Область видимости теряется**, если есть любые асинхронные вызовы функций:

```ts
const attachedFx = attach({
  source: $store,
  async effect(source) {
    // Здесь всё в порядке, эффект вызывается
    const resultA = await anotherFx();

    // Будьте осторожны:
    const resultB = await regularFunction();
    // Здесь область видимости потеряна.
  },
});
```

Чтобы решить эту проблему, просто оберните вашу `regularFunction` в эффект:

```ts
const regularFunctionFx = createEffect(regularFunction);
```

### Типы (#methods-attach-source-async-effect-types)

#### Один стор (#methods-attach-source-async-effect-types-single-store)

```ts
const $store: Store<T>;

const attachedFx: Effect<Params, Done, Fail> = attach({
  source: $store,
  async effect(source, params: Params): Done | Promise<Done> {},
});
```

Вам нужно явно указать только аргумент `params`. Все остальные типы аргументов должны быть выведены автоматически. Также вы можете явно указать тип возвращаемого значения функции `effect`.

Если вы хотите удалить любые аргументы из `attachedFx`, просто удалите второй аргумент из функции `effect`:

```ts
const attachedFx: Effect<void, void, Fail> = attach({
  source: $store,
  async effect(source) {},
});
```

#### Несколько сторов (#methods-attach-source-async-effect-types-multiple-stores)

:::tip{title="Примечание"}
Для подробностей ознакомьтесь с [предыдущим разделом типов](#methods-attach-source-async-effect-types). Здесь та же логика.
:::

```ts
// Пример пользовательского кода без явных объявлений типов
const $foo = createStore(100);
const $bar = createStore("demo");

const attachedFx = attach({
  source: { foo: $foo, bar: $bar },
  async effect({ foo, bar }, { baz }: { baz: boolean }) {
    console.log("Попадание!", { foo, bar, baz });
  },
});

attachedFx({ baz: true });
// => Попадание! { foo: 100, bar: "demo", baz: true }
```

[Попробуйте в песочнице TypeScript](https://tsplay.dev/m3xjbW)

### Пример (#methods-attach-source-async-effect-example)

:::warning{title="TBD"}
Пожалуйста, создайте pull request через ссылку "Edit this page".
:::

## `attach({effect, mapParams})` (#methods-attach-effect-mapParams)

Создает эффект, который будет вызывать указанный эффект, преобразуя параметры с помощью функции `mapParams`.

### Формула (#methods-attach-effect-mapParams-formulae)

```ts
const attachedFx = attach({
  effect: originalFx,
  mapParams,
});
```

- Когда `attachedFx` вызывается, параметры передаются в функцию `mapParams`, затем результат передается в `originalFx`.
- Когда `originalFx` завершается, `attachedFx` завершается с тем же состоянием (успех/ошибка).
- Если `mapParams` выбрасывает исключение, `attachedFx` завершается с ошибкой как `attachedFx.fail`. Но `originalFx` не будет вызван.

### Аргументы (#methods-attach-effect-mapParams-arguments)

- `effect` ([_Effect_](/ru/api/effector/Effect)): Обернутый эффект.
- `mapParams` (`(newParams) => effectParams`): Функция, которая принимает новые параметры и преобразует их в параметры для обернутого `effect`. Работает аналогично [event.prepend](/ru/api/effector/Event#prepend-fn). Ошибки в функции `mapParams` приведут к завершению прикрепленного эффекта с ошибкой.

### Возвращает (#methods-attach-effect-mapParams-returns)

[_Effect_](/ru/api/effector/Effect): Новый эффект.

### Типы (#methods-attach-effect-mapParams-types)

```ts
const originalFx: Effect<A, Done, Fail>;

const attachedFx: Effect<B, Done, Fail> = attach({
  effect: originalFx,
  mapParams: (params: B): A {},
});
```

`mapParams` должна возвращать тот же тип, который принимает `originalFx` в качестве параметров.

Если `attachedFx` должен вызываться без аргументов, то `params` можно безопасно удалить из `mapParams`:

```ts
const attachedFx: Effect<void, Done, Fail> = attach({
  effect: originalFx,
  mapParams: (): A {},
});
```

[Попробуйте в песочнице TypeScript](https://tsplay.dev/wXOYoW)

Но если функция `mapParams` выбрасывает исключение, вам нужно самостоятельно проверять совместимость типов, так как TypeScript не поможет.

```ts
const attachedFx: Effect<void, Done, Fail> = attach({
  effect: originalFx,
  mapParams: (): A {
    throw new AnyNonFailType(); // Это может быть несовместимо с типом `Fail`.
  },
});
```

### Примеры (#methods-attach-effect-mapParams-examples)

#### Преобразование аргументов (#methods-attach-effect-mapParams-examples-map-arguments)

```ts
import { createEffect, attach } from "effector";

const originalFx = createEffect((a: { input: number }) => a);

const attachedFx = attach({
  effect: originalFx,
  mapParams(a: number) {
    return { input: a * 100 };
  },
});

originalFx.watch((params) => console.log("originalFx started", params));

attachedFx(1);
// => originalFx { input: 100 }
```

[Запустить пример](https://share.effector.dev/CEGzfidC)

#### Обработка исключений (#methods-attach-effect-mapParams-examples-handle-exceptions)

```ts
import { createEffect, attach } from "effector";

const originalFx = createEffect((a: { a: number }) => a);

const attachedFx = attach({
  effect: originalFx,
  mapParams(a: number) {
    throw new Error("custom error");
    return { a };
  },
});

attachedFx.failData.watch((error) => console.log("attachedFx.failData", error));

attachedFx(1);
// => attachedFx.failData
// =>   Error: custom error
```

[Запустить пример](https://share.effector.dev/4ZjCRKAD)

## `attach({source, mapParams, effect})` (#methods-attach-source-mapParams-effect)

Создает эффект, который будет читать значения из `source` стора, передавать их с параметрами в функцию `mapParams`, а затем вызывать `effect` с результатом.

### Формула (#methods-attach-source-mapParams-effect-formulae)

:::tip{title="Примечание"}
Этот вариант `attach` работает аналогично [attach({effect, mapParams})](#methods-attach-effect-mapParams). Поэтому некоторые вещи опущены в этом разделе.
:::

```ts
const attachedFx = attach({
  source,
  mapParams,
  effect: originalFx,
});
```

- Когда `attachedFx` вызывается, параметры передаются в функцию `mapParams` вместе с данными из `source`, затем результат передается в `originalFx`.
- Когда `originalFx` завершается, `attachedFx` завершается с тем же состоянием (успех/ошибка).
- Если `mapParams` выбрасывает исключение, `attachedFx` завершается с ошибкой как `attachedFx.fail`. Но `originalFx` не будет вызван.

### Аргументы (#methods-attach-source-mapParams-effect-arguments)

- `source` ([_Store_](/ru/api/effector/Store) | `{[key: string]: Store}`): Стор или объект с сторами, значения которых будут переданы во второй аргумент `mapParams`.
- `mapParams` (`(newParams, values) => effectParams`): Функция, которая принимает новые параметры и текущее значение `source` и объединяет их в параметры для обернутого `effect`. Ошибки в функции `mapParams` приведут к завершению прикрепленного эффекта с ошибкой.
- `effect` ([_Effect_](/ru/api/effector/Effect)): Обернутый эффект.

### Возвращает (#methods-attach-source-mapParams-effect-returns)

[_Effect_](/ru/api/effector/Effect): Новый эффект.

### Типы (#methods-attach-source-mapParams-effect-types)

:::warning{title="TBD"}
Пожалуйста, создайте pull request через ссылку "Edit this page".
:::

### Примеры (#methods-attach-source-mapParams-effect-examples)

#### С фабрикой (#methods-attach-source-mapParams-effect-example-with-factory)

```ts
// ./api/request.ts
import { createEffect, createStore } from "effector";

export const backendRequestFx = createEffect(async ({ token, data, resource }) => {
  return fetch(`https://example.com/api${resource}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
});

export const $requestsSent = createStore(0);

$requestsSent.on(backendRequestFx, (total) => total + 1);
```

```ts
// ./api/authorized.ts
import { attach, createStore } from "effector";

const $token = createStore("guest_token");

export const authorizedRequestFx = attach({
  effect: backendRequestFx,
  source: $token,
  mapParams: ({ data, resource }, token) => ({ data, resource, token }),
});

export function createRequest(resource) {
  return attach({
    effect: authorizedRequestFx,
    mapParams: (data) => ({ data, resource }),
  });
}
```

```ts
// ./api/index.ts
import { createRequest } from "./authorized";
import { $requestsSent } from "./request";

const getUserFx = createRequest("/user");
const getPostsFx = createRequest("/posts");

$requestsSent.watch((total) => {
  console.log(`Аналитика клиента: отправлено ${total} запросов`);
});

const user = await getUserFx({ name: "alice" });
/*
POST https://example.com/api/user
{"name": "alice"}
Authorization: Bearer guest_token
*/

// => Аналитика клиента: отправлено 1 запросов

const posts = await getPostsFx({ user: user.id });
/*
POST https://example.com/api/posts
{"user": 18329}
Authorization: Bearer guest_token
*/

// => Аналитика клиента: отправлено 2 запросов
```

Чтобы фабрика работала корректно, добавьте путь к `./api/authorized` в опцию `factories` для Babel плагина:

```json5
// .babelrc
{
  plugins: [
    [
      "effector/babel-plugin",
      {
        factories: ["src/path-to-your-entity/api/authorized"],
      },
    ],
  ],
}
```

## Параметры (#attach-parameters)

`attach()` также принимает дополнительные параметры, которые можно использовать при необходимости.

### `name` (#attach-parameters-name)

```ts
attach({ name: string });
```

Позволяет явно задать имя созданного прикрепленного эффекта:

```ts
import { attach } from "effector";

const attachedFx = attach({
  name: "anotherUsefulName",
  source: $store,
  async effect(source, params: Type) {
    // ...
  },
});

attachedFx.shortName; // "anotherUsefulName"
```

Этот параметр доступен в **любом варианте** `attach`.

### `domain` (#attach-parameters-domain)

```ts
attach({ domain: Domain });
```

Позволяет создать эффект внутри указанного домена.

> Примечание: это свойство может использоваться только с обычной функцией `effect`.

```ts
import { createDomain, createStore, attach } from "effector";

const reportErrors = createDomain();
const $counter = createStore(0);

const attachedFx = attach({
  domain: reportErrors,
  source: $counter,
  async effect(counter) {
    // ...
  },
});
```
