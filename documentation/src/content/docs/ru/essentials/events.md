---
title: События в эффекторе
keywords:
  - event
  - unit
  - событие
  - юнит
description: Как работают события и как их использовать
---

# События (#events)

Событие в effector представляет собой действие пользователя, шаг в процессе работы приложения, команду для выполнения или намерение внести изменения. Этот юнит спроектирован как переносчик информации/намерения/состояния внутри приложения, а не как хранилище состояния.

В большинстве случаев рекомендуется создавать события непосредственно внутри модуля, а не размещать их внутри условных операторов или классов, чтобы сохранить простоту и читаемость кода. Исключением из этой рекомендации является использование фабричных функций, однако они также должны вызываться на корневом уровне модуля.

:::warning{title="Важная информация!"}
Экземпляры событий существуют на протяжении всего времени работы приложения и по своей сути представляют часть бизнес-логики.
Попытки удалить экземпляры и очистить память с целью экономии ресурсов не рекомендуются, так как это может негативно повлиять на функциональность и производительность приложения.
:::

## Вызов события (#event-calling)

Существует два способа вызвать событие: императивный и декларативный.
**Императивный** метод подразумевает вызов события как функции:

```ts
import { createEvent } from "effector";

const callHappened = createEvent<void>();

callHappened(); // событие вызвано
```

**Декларативный** подход использует событие как цель для операторов, таких как sample, или как аргумент при передаче в фабричные функции:

```ts
import { createEvent, sample } from "effector";

const firstTriggered = createEvent<void>();
const secondTriggered = createEvent<void>();

sample({
  clock: firstTriggered,
  target: secondTriggered,
});
```

Когда вызывается событие `firstTriggered`, событие `secondTriggered` будет вызвано следом, создавая последовательность событий.<br/>
[Помните, что не стоит вызывать события в чистых функциях](/ru/introduction/core-concepts#purity), это не поддерживается!

Этот метод используется для связывания различных юнитов в единую цепочку событий. В большинстве случаев цепочка будет иметь несколько ветвей, позволяя создавать разнообразные взаимодействия и процессы внутри логики приложения.

:::tip{title="Полезно знать"}
В Effector любое событие поддерживает только один аргумент.
Невозможно вызвать событие с двумя или более аргументами, как в `someEvent(first, second)`.
:::

Все аргументы после первого будут проигнорированы.
Команда разработчиков реализовала это правило по определенным причинам, связанным с дизайном и функциональностью.
Такой подход позволяет получить доступ к аргументу в любой ситуации без усложнения типизации.

Если необходимо передать несколько аргументов, объедините их в объект:

If multiple arguments need to be passed, encapsulate them within an object:

```ts
import { createEvent } from "effector";

const requestReceived = createEvent<{ id: number; title: string }>();

requestReceived({ id: 1, title: "example" });
```

This rule also contributes to the clarity of each argument's meaning, both at the call side and subscription side. It promotes clean and organized code, making it easier to understand and maintain.

:::tip{title="Наименование событий"}
Мы предлагаем вам называть события, которые напрямую запускают обновления сторов, как будто они уже произошли, например userChang**ed**.
Это улучшает читабельность кода.
:::

## Отслеживание события (#event-watch)

Для определения момента вызова события effector и его экосистема предлагают различные методы с разными возможностями. Отладка является основным случаем использования, и мы настоятельно рекомендуем использовать [`patronum/debug`](https://patronum.effector.dev/methods/debug/) для отображения момента вызова события и передаваемого им аргумента.

```ts
import { createEvent, sample } from "effector";
import { debug } from "patronum";

const firstTriggered = createEvent<void>();
const secondTriggered = createEvent<void>();

sample({
  clock: firstTriggered,
  target: secondTriggered,
});

debug(firstTriggered, secondTriggered);

firstTriggered();
// => [event] firstTriggered undefined
// => [event] secondTriggered undefined
```

Однако, если ваша среда не позволяет добавлять дополнительные зависимости, вы можете с осторожностью использовать метод `watch()`:

```ts
import { createEvent, sample } from "effector";

const firstTriggered = createEvent<void>();
const secondTriggered = createEvent<void>();

sample({
  clock: firstTriggered,
  target: secondTriggered,
});

firstTriggered.watch(() => console.info("[event] firstTriggered"));
secondTriggered.watch(() => console.info("[event] secondTriggered"));

firstTriggered();
// => [event] firstTriggered
// => [event] secondTriggered
```

:::info{title="Имейте в виду"}
Метод `watch` не обрабатывает и не сообщает об исключениях, не управляет завершением асинхронных операций и не решает проблемы гонки данных.
Его основное предназначение - краткосрочная отладка и логирование.
:::

## Работа с TypeScript (#typescript)

Когда событие вызывается, TypeScript проверяет, что тип переданного аргумента соответствует типу, определенному в событии, обеспечивая согласованность и безопасность типов в коде.

```ts
import { sample, createEvent } from "effector";

const someHappened = createEvent<number>();
const anotherHappened = createEvent<string>();

sample({
  // @ts-expect-error error:
  // "clock should extend target type";
  // targets: { clockType: number; targetType: string; }
  clock: someHappened,
  target: anotherHappened,
});
```

## Working with multiple events (#working-with-events)

События в effector можно комбинировать разными способами для создания более сложной логики. Рассмотрим основные способы:

### Создание производных событий (#derived-events)

Вы можете создать новое событие на основе существующего с помощью метода `map`:

```ts
const userClicked = createEvent<{ id: number; name: string }>();
// Создаем событие, которое будет срабатывать только с именем пользователя
const userNameSelected = userClicked.map(({ name }) => name);

// Примеры использования
userClicked({ id: 1, name: "John" });
// userNameSelected получит значение 'John'
```

### Фильтрация событий (#filtering-events)

Метод `filter` позволяет создать новое событие, которое срабатывает только при выполнении определенного условия:

```ts
const userClicked = createEvent<{ id: number; role: "admin" | "user" }>();

// Событие сработает только для админов
const adminClicked = userClicked.filter({
  fn: ({ role }) => role === "admin",
});

// Создаем типобезопасный фильтр
const adminClicked = userClicked.filter({
  fn: (user): user is { id: number; role: "admin" } => user.role === "admin",
});
```

:::tip{sample лучше!}
Использование метода `sample` и свойства `filter` предпочительнее этого метода!
:::

### Объединение нескольких событий (#merging-events)

Для объединения нескольких событий в одно можно использовать `sample` с массивом в `clock`:

```ts
const buttonClicked = createEvent();
const linkClicked = createEvent();
const iconClicked = createEvent();

// Любое из этих событий вызовет someActionHappened
sample({
  clock: [buttonClicked, linkClicked, iconClicked],
  target: someActionHappened,
});
```

### Условное срабатывание событий (#conditional-event-triggering)

Цепочка действий при вызове события может срабатывать на основе состояния сторов:

```ts
const buttonClicked = createEvent<void>();
const $isEnabled = createStore(true);

// Событие сработает только если $isEnabled равно true
sample({
  clock: buttonClicked,
  filter: $isEnabled,
  target: actionExecuted,
});
```

:::tip{title="Совет"}
Использование событий через `sample` предпочтительнее прямого вызова событий внутри `watch` или других обработчиков, так как это делает поток данных более явным и предсказуемым.
:::
