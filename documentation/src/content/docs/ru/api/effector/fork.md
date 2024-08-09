---
title: fork
lang: ru
---

```ts
import { fork, type Scope } from "effector";
```

# Методы (#methods)

## `fork()` (#methods-fork)

:::info{title="Время добавления"}

введен в [effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0)

:::

Создает изолированный экземпляр приложения.
Основные цели этого метода — SSR и тестирование.

### Формула (#methods-fork-formulae)

```ts
fork(): Scope
```

### Возвращает (#methods-fork-returns)

[_Scope_](/en/api/effector/Scope): Новый чистый scope

### Примеры (#methods-fork-examples)

#### Создание двух экземпляров с независимым состоянием счетчика (#methods-fork-examples-create-two-instances)

```js
import { createStore, createEvent, fork, allSettled } from "effector";

const inc = createEvent();
const dec = createEvent();
const $counter = createStore(0);

$counter.on(inc, (value) => value + 1);
$counter.on(dec, (value) => value - 1);

const scopeA = fork();
const scopeB = fork();

await allSettled(inc, { scope: scopeA });
await allSettled(dec, { scope: scopeB });

console.log($counter.getState()); // => 0
console.log(scopeA.getState($counter)); // => 1
console.log(scopeB.getState($counter)); // => -1
```

[Попробовать](https://share.effector.dev/dBSC59h8)

## `fork(options)` (#methods-fork-options)

Позволяет задать значения для stores в scope и заменить обработчики для effects.

:::info{title="Время добавления"}

поддержка массива кортежей в `values` и `handlers` введена в [effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0)

:::

### Формула (#methods-fork-options-formulae)

```ts
fork(options: { values?, handlers? }): Scope
```

### Аргументы (#methods-fork-options-arguments)

1. `options: { values?, handlers? }` — Объект с необязательными значениями и обработчиками

#### `values` (#methods-fork-options-arguments-values)

Опция для предоставления начальных состояний для stores.

Может использоваться тремя способами:

1.  Массив кортежей со stores и значениями:

```ts
fork({
  values: [
    [$user, "alice"],
    [$age, 21],
  ],
});
```

2.  Map со stores и значениями:

```ts
fork({
  values: new Map().set($user, "alice").set($age, 21),
});
```

3.  Обычный объект: `{[sid: string]: value}`

```ts
fork({
  values: {
    [$user.sid]: "alice",
    [$age.sid]: 21,
  },
});
```

<br />

:::info{title="Примечание"}
Такие объекты создаются с помощью [serialize](/en/api/effector/serialize), в коде приложения **предпочтителен массив кортежей**
:::

#### `handlers` (#methods-fork-options-arguments-handlers)

Опция для предоставления обработчиков для effects.

Может использоваться по-разному:

1.  Массив кортежей с effects и обработчиками:

```ts
fork({
  handlers: [
    [getMessageFx, (params) => ({ id: 0, text: "message" })],
    [getUserFx, async (params) => ({ name: "alice", age: 21 })],
  ],
});
```

2.  Map с effects и обработчиками:

```ts
fork({
  handlers: new Map()
    .set(getMessageFx, (params) => ({ id: 0, text: "message" }))
    .set(getUserFx, async (params) => ({ name: "alice", age: 21 })),
});
```

3.  Обычный объект: `{[sid: string]: handler}`

```ts
fork({
  handlers: {
    [getMessageFx.sid]: (params) => ({ id: 0, text: "message" }),
    [getUserFx.sid]: async (params) => ({ name: "alice", age: 21 }),
  },
});
```

<br />

:::warning{title="Устарело"}
Такие объекты устарели с [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) и будут удалены в будущих версиях. Предпочтителен массив кортежей.
:::

### Возвращает (#methods-fork-options-returns)

[_Scope_](/en/api/effector/Scope): Новый чистый scope

### Примеры (#methods-fork-options-examples)

#### Задание начального состояния для store и изменение обработчика для effect (#methods-fork-examples-set-initial-state-and-change-handler)

Это пример теста, который проверяет, что после запроса к серверу значение `$friends` заполняется.

```ts
import { createEffect, createStore, fork, allSettled } from "effector";

const fetchFriendsFx = createEffect<{ limit: number }, string[]>(async ({ limit }) => {
  /* получение данных на стороне клиента */
  return [];
});
const $user = createStore("guest");
const $friends = createStore([]);

$friends.on(fetchFriendsFx.doneData, (_, result) => result);

const testScope = fork({
  values: [[$user, "alice"]],
  handlers: [[fetchFriendsFx, () => ["bob", "carol"]]],
});

/* запускаем вычисления в scope и ожидаем завершения всех вызванных effects */
await allSettled(fetchFriendsFx, {
  scope: testScope,
  params: { limit: 10 },
});

/* проверяем значение store в scope */
console.log(testScope.getState($friends));
// => ['bob', 'carol']
```

[Попробовать](https://share.effector.dev/gnNbGZuu)

## `fork(domain, options?)` (#methods-fork-domain)

:::info{title="Время добавления"}

Введен в [effector 21.0.0](https://changelog.effector.dev/#effector-21-0-0)

:::

:::warning{title="Устарело"}

С [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0).

`fork` больше не требует `domain` в качестве аргумента, так как с [effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0) он может автоматически отслеживать все юниты.

:::

### Формула (#methods-fork-domain-formulae)

```ts
fork(domain: Domain, options?: { values?, handlers? }): Scope
```

### Аргументы (#methods-fork-domain-arguments)

1. `domain` ([_Domain_](/en/api/effector/Domain)): Необязательный domain для fork.
2. `options: { values?, handlers? }` — Объект с необязательными [values](#methods-fork-options-arguments-values) и [handlers](#methods-fork-options-arguments-handlers)

### Возвращает (#methods-fork-domain-returns)

[_Scope_](/en/api/effector/Scope): Новый чистый scope

### Примеры (#methods-fork-domain-examples)

TBD
