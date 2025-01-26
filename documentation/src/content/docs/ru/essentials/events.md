---
title: События в эффекторе
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

:::tip{title="Полезно знать"}
В Effector любое событие поддерживает только один аргумент.
Невозможно вызвать событие с двумя или более аргументами, как в `someEvent(first, second)`.
:::

Все аргументы после первого будут проигнорированы.
Команда разработчиков реализовала это правило по определенным причинам, связанным с дизайном и функциональностью.
Такой подход позволяет получить доступ к аргументу в любой ситуации без усложнения типизации.

Если необходимо передать несколько аргументов, объедините их в объект:

```ts
import { createEvent } from "effector";

const requestReceived = createEvent<{ id: number; title: string }>();

requestReceived({ id: 1, title: "example" });
```

Это правило также способствует ясности значения каждого аргумента как на стороне вызова, так и на стороне подписки. Оно способствует чистоте и организованности кода, облегчая его понимание и сопровождение.

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

Однако, если ваша среда не позволяет добавлять дополнительные зависимости, вы можете использовать метод `createWatch`, который в аргумент принимает объект со значениями

- `unit` — юнит или массив юнитов, за которым вы хотите начать следить
- `fn` — функция, которая вызывается при изменениях юнита, принимает обновленное значение в аргументе
- `scope` — [изолированный контекст](/ru/api/effector/Scope), инстанс [fork](/ru/api/effector/fork)'а, для изолированного выполнения

```ts
import { createEvent, sample, createWatch } from "effector";

const firstTriggered = createEvent<void>();
const secondTriggered = createEvent<void>();

sample({
  clock: firstTriggered,
  target: secondTriggered,
});

userClicked("value");

const unwatch = createWatch({
  unit: [firstTriggered, secondTriggered],
  fn: (payload) => {
    console.log("[event] triggered");
  },
});

firstTriggered();

// => [event] triggered
// => [event] triggered
```

:::info{title="Имейте в виду"}
Метод `createWatch` не обрабатывает и не сообщает об исключениях, не управляет завершением асинхронных операций и не решает проблемы гонки данных.
Его основное предназначение - краткосрочная отладка и логирование, или для тестирования, чтобы убедиться, что какой-нибудь юнит был задействован.
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

## Работа с несколькими событиями (#working-with-events)

События в effector можно комбинировать разными способами для создания более сложной логики. Рассмотрим основные способы:

### Создание производных событий (#derived-events)

Вы можете создать новое событие на основе существующего с помощью метода `map`, которое вызовется после того, как оригинальное событие было вызвано:

```ts
import { createEvent, createStore } from "effector";

const userClicked = createEvent<{ id: number; name: string }>();
// Создаем событие, которое будет срабатывать только с именем пользователя
const userNameSelected = userClicked.map(({ name }) => name);
const $userName = createStore("").on(userNameSelected, (_, newName) => newName);

// Примеры использования
userClicked({ id: 1, name: "John" });
// userNameSelected получит значение 'John'
```

:::info{title="Производные события"}
Вы не можете вызывать производные события сами, но вы все еще можете подписываться на них для имзенений состояния или триггера других юнитов.
:::

### Фильтрация событий (#filtering-events)

Метод `filter` позволяет создать новое событие, которое срабатывает только при выполнении определенного условия:

```ts
import { sample, createEvent } from "effector";

type User = { id: number; role: "admin" | "user" };
type Admin = { id: number; role: "admin" };

const userClicked = createEvent<User>();

// Событие вызовется только для admin
const adminClicked = sample({
  clock: userClicked,
  filter: ({ role }) => role === "admin",
});

// Создаем типизированное событие
const typeSafeAdminClicked = sample({
  clock: userClicked,
  filter: (user): user is Admin => user.role === "admin",
});
```

### Объединение нескольких событий (#merging-events)

Вы можете использовать метод `merge`, который объединяет массив юнитов в одно событие, которое будет тригерится при вызове одного из элементов массива:

```ts
const buttonClicked = createEvent();
const linkClicked = createEvent();
const iconClicked = createEvent();

// Любое из этих событий вызовет someActionHappened
const anyClicked = merge([buttonClicked, linkClicked, iconClicked]);

sample({
  clock: anyClicked,
  target: someActionHappened,
});
```

Либо можно использовать `sample` с массивом в `clock`, который под капотом также обрабатывает массив с помощью `merge`:

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

### Создание пред-обработчика события (#create-prepend)

`event.prepend` - это метод, который создает новое событие, которое будет триггерить исходное событие с предварительным преобразованием данных.

Предположим у вас происходят разные ошибки в приложении с разной структурой, но обработка этих ошибок должна происходить централизованно:

```ts
import { createEvent } from "effector";

// Основное событие обработки ошибок
const showError = createEvent<string>();

// Подписываемся на показ ошибок
sample({
  clock: showError,
  target: processErrorFx, // упустим реализацию эффекта
});

// Создаем специальные события для разных типов ошибок
const showNetworkError = showError.prepend((code: number) => `Ошибка сети: ${code}`);

const showValidationError = showError.prepend((field: string) => `Поле ${field} заполнено неверно`);

// Использование
showNetworkError(404); // 🔴 Ошибка: Ошибка сети: 404
showValidationError("email"); // 🔴 Ошибка: Поле email заполнено неверно
```

В этом примере:

1. Мы имеем основное событие для обработки ошибок, которое принимает строку
2. Используя `prepend` мы создаем два новых события, каждое из которых:

- Принимает свой тип данных
- Преобразовывает эти данные к строке
- Отдает результат основному событию

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

[Ознакомиться с полным API для Event](/ru/api/effecor/Event).
