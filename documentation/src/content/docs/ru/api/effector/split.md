---
title: split
lang: ru
---

```ts
import { split } from "effector";
```

Выберите один из случаев по заданным условиям. Эта функция "разделяет" исходный юнит на несколько событий, которые срабатывают, когда полезная нагрузка соответствует их условиям. Работает как сопоставление с образцом для значений полезной нагрузки и внешних store'ов.

# Концепции (#concepts)

## Режим случая (#concepts-case-mode)

Режим, в котором целевой случай выбирается по имени его поля. Случай может быть выбран из данных в `source` с помощью [функции случая](/ru/api/effector/split#case-function) или из внешнего [хранилища случая](/ru/api/effector/split#case-store), которое хранит текущее имя случая. После выбора данные из `source` будут отправлены в соответствующий `cases[fieldName]` (если он есть), если ни одно из полей не совпадает, то данные будут отправлены в `cases.__` (если он есть).

**Смотрите также**:

- [хранилище случая](/ru/api/effector/split#case-store)
- [функция случая](/ru/api/effector/split#case-function)

## Режим сопоставления (#concepts-matching-mode)

Режим, в котором каждый случай последовательно сопоставляется с хранилищами и функциями в полях объекта `match`.
Если одно из полей получает `true` из значения хранилища или возврата функции, то данные из `source` будут отправлены в соответствующий `cases[fieldName]` (если он есть), если ни одно из полей не совпадает, то данные будут отправлены в `cases.__` (если он есть).

**Смотрите также**:

- [хранилище сопоставления](/ru/api/effector/split#matcher-store)
- [функция сопоставления](/ru/api/effector/split#matcher-function)

## Хранилище случая (#concepts-case-store)

Хранилище со строкой, которая будет использоваться для выбора случая по его имени. Размещается непосредственно в поле `match`.

```ts
split({
  source: Unit<T>
  // хранилище случая
  match: Store<'first' | 'second'>,
  cases: {
    first: Unit<T> | Unit<T>[],
    second: Unit<T> | Unit<T>[],
    __?: Unit<T> | Unit<T>[]
  }
})
```

## Функция случая (#concepts-case-function)

Функция, возвращающая строку, которая будет вызвана со значением из `source` для выбора случая по его имени. Размещается непосредственно в поле `match`, [должна быть **чистой**](/ru/explanation/glossary#purity).

```ts
split({
  source: Unit<T>
  // функция случая
  match: (value: T) => 'first' | 'second',
  cases: {
    first: Unit<T> | Unit<T>[],
    second: Unit<T> | Unit<T>[],
    __?: Unit<T> | Unit<T>[]
  }
})
```

## Хранилище сопоставления (#concepts-matcher-store)

Логическое хранилище, которое указывает, следует ли выбрать конкретный случай или попробовать следующий. Размещается в полях объекта `match`, может быть смешано с [функциями сопоставления](/ru/api/effector/split#matcher-function).

```ts
split({
  source: Unit<T>
  match: {
    // хранилище сопоставления
    first: Store<boolean>,
    second: Store<boolean>
  },
  cases: {
    first: Unit<T> | Unit<T>[],
    second: Unit<T> | Unit<T>[],
    __?: Unit<T> | Unit<T>[]
  }
})
```

## Функция сопоставления (#concepts-matcher-function)

:::info
Хранилище случая, функция случая и хранилище сопоставления поддерживаются с [effector 21.8.0](https://changelog.effector.dev/#effector-21-8-0)
:::

Функция, возвращающая логическое значение, которое указывает, следует ли выбрать конкретный случай или попробовать следующий. Размещается в полях объекта `match`, может быть смешано с [хранилищами сопоставления](/ru/api/effector/split#matcher-store), [должна быть **чистой**](/ru/explanation/glossary#purity).

```ts
split({
  source: Unit<T>
  match: {
    // функция сопоставления
    first: (value: T) => boolean,
    second: (value: T) => boolean
  },
  cases: {
    first: Unit<T> | Unit<T>[],
    second: Unit<T> | Unit<T>[],
    __?: Unit<T> | Unit<T>[]
  }
})
```

# Методы (#methods)

## `split({ source, match, cases })` (#methods-split-source-match-cases)

:::info{title="с"}
[effector 21.0.0](https://changelog.effector.dev/#effector-21-0-0)
:::

### Формула (#methods-split-source-match-cases-formulae)

```ts
split({ source, match, cases });
```

```ts
split({
  source: Unit<T>
  // функция случая
  match: (data: T) => 'a' | 'b',
  cases: {
    a: Unit<T> | Unit<T>[],
    b: Unit<T> | Unit<T>[],
    __?: Unit<T> | Unit<T>[]
  }
})
split({
  source: Unit<T>
  // хранилище случая
  match: Store<'a' | 'b'>,
  cases: {
    a: Unit<T> | Unit<T>[],
    b: Unit<T> | Unit<T>[],
    __?: Unit<T> | Unit<T>[]
  }
})
split({
  source: Unit<T>
  match: {
    // функция сопоставления
    a: (data: T) => boolean,
    // хранилище сопоставления
    b: Store<boolean>
  },
  cases: {
    a: Unit<T> | Unit<T>[],
    b: Unit<T> | Unit<T>[],
    __?: Unit<T> | Unit<T>[]
  }
})
```

### Аргументы (#methods-split-source-match-cases-arguments)

- `source`: [Юнит](/ru/explanation/glossary#common-unit), который будет запускать вычисления в `split`
- `match`: Одиночное [хранилище со строкой](/ru/api/effector/split#case-store), одиночная [функция, возвращающая строку](/ru/api/effector/split#case-function) или объект с [логическими хранилищами](/ru/api/effector/split#matching-store) и [функциями, возвращающими логическое значение](/ru/api/effector/split#matching-function)
- `cases`: Объект с [юнитами](/ru/explanation/glossary#common-unit) или массивами юнитов, в которые будут переданы данные из `source` после выбора случая

### Возвращает (#methods-split-source-match-cases-returns)

`void`

### Примеры (#methods-split-source-match-cases-examples)

#### Базовый (#methods-split-source-match-cases-examples-basic)

```js
import { split, createEffect, createEvent } from "effector";
const messageReceived = createEvent();
const showTextPopup = createEvent();
const playAudio = createEvent();
const reportUnknownMessageTypeFx = createEffect(({ type }) => {
  console.log("неизвестное сообщение:", type);
});

split({
  source: messageReceived,
  match: {
    text: (msg) => msg.type === "text",
    audio: (msg) => msg.type === "audio",
  },
  cases: {
    text: showTextPopup,
    audio: playAudio,
    __: reportUnknownMessageTypeFx,
  },
});

showTextPopup.watch(({ value }) => {
  console.log("новое сообщение:", value);
});

messageReceived({
  type: "text",
  value: "Привет",
});
// => новое сообщение: Привет
messageReceived({
  type: "image",
  imageUrl: "...",
});
// => неизвестное сообщение: image
```

[Попробуйте](https://share.effector.dev/W6VYZbfH)

#### Прямое сопоставление (#methods-split-source-match-cases-examples-direct-match)

Вы также можете сопоставлять напрямую с API хранилища:

```js
import { split, createStore, createEvent, createApi } from "effector";

const messageReceived = createEvent();

const $textContent = createStore([]);

split({
  source: messageReceived,
  match: {
    text: (msg) => msg.type === "text",
    audio: (msg) => msg.type === "audio",
  },
  cases: createApi($textContent, {
    text: (list, { value }) => [...list, value],
    audio: (list, { duration }) => [...list, `аудио ${duration} мс`],
    __: (list) => [...list, "неизвестное сообщение"],
  }),
});

$textContent.watch((messages) => {
  console.log(messages);
});

messageReceived({
  type: "text",
  value: "Привет",
});
// => ['Привет']
messageReceived({
  type: "image",
  imageUrl: "...",
});
// => ['Привет', 'неизвестное сообщение']
messageReceived({
  type: "audio",
  duration: 500,
});
// => ['Привет', 'неизвестное сообщение', 'аудио 500 мс']
```

[Попробуйте](https://share.effector.dev/32FNNk8H)

#### Случаи с массивами юнитов (#methods-split-source-match-cases-examples-cases-with-arrays-of-units)

```js
import { createEffect, createEvent, createStore, sample, split } from "effector";

const $verificationCode = createStore("12345");
const $error = createStore("");

const modalToInputUsername = createEvent();
const modalToAuthorizationMethod = createEvent();

const checkVerificationCodeFx = createEffect((code) => {
  throw "500";
});

sample({
  clock: verificationCodeSubmitted,
  source: $verificationCode,
  target: checkVerificationCodeFx,
});

split({
  source: checkVerificationCodeFx.failData,
  match: (value) => (["400", "410"].includes(value) ? "verificationCodeError" : "serverError"),
  cases: {
    verificationCodeError: $verificationCodeError,
    serverError: [$error, modalToAuthorizationMethod],
  },
});

$error.updates.watch((value) => console.log("ОШИБКА: " + value));
modalToAuthorizationMethod.watch(() =>
  console.log("Модальное окно с содержимым метода авторизации."),
);
// => ОШИБКА: 500
// => Модальное окно с содержимым метода авторизации.
```

## `split(source, match)` (#methods-split-source-match)

:::info{title="с"}
[effector 20.0.0](https://changelog.effector.dev/#effector-20-0-0)
:::

### Формула (#methods-split-source-match-formulae)

```ts
split(source, match);
```

### Аргументы (#methods-split-source-match-arguments)

1. `source`: [Юнит](/ru/explanation/glossary#common-unit), который будет запускать вычисления в `split`
2. `match` (_Объект_): Схема случаев, которая использует имена результирующих событий как ключи и функцию сопоставления*((value) => Boolean)*

### Возвращает (#methods-split-source-match-returns)

(Объект) – Объект, имеющий ключи, определенные в аргументе `match`, плюс `__`(два подчеркивания) – который обозначает случай по умолчанию (если ни одно из условий не выполнено).

### Примеры (#methods-split-source-match-examples)

#### Базовый (#methods-split-source-match-examples-basic)

```js
import { createEvent, split } from "effector";

const message = createEvent();

const messageByAuthor = split(message, {
  bob: ({ user }) => user === "bob",
  alice: ({ user }) => user === "alice",
});
messageByAuthor.bob.watch(({ text }) => {
  console.log("[bob]: ", text);
});
messageByAuthor.alice.watch(({ text }) => {
  console.log("[alice]: ", text);
});

message({ user: "bob", text: "Привет" });
// => [bob]: Привет
message({ user: "alice", text: "Привет, bob" });
// => [alice]: Привет, bob

/* случай по умолчанию, срабатывает, если ни одно из условий не выполнено */
const { __: guest } = messageByAuthor;
guest.watch(({ text }) => {
  console.log("[гость]: ", text);
});
message({ user: "незарегистрированный", text: "привет" });
// => [гость]: привет
```

[Попробуйте](https://share.effector.dev/QXZsR5yM)

:::info
Только первое выполненное сопоставление вызовет результирующее событие
:::

#### Другой пример (#methods-split-source-match-examples-another)

```js
import { createEvent, split } from "effector";

const message = createEvent();

const { short, long, medium } = split(message, {
  short: (m) => m.length <= 5,
  medium: (m) => m.length > 5 && m.length <= 10,
  long: (m) => m.length > 10,
});

short.watch((m) => console.log(`короткое сообщение '${m}'`));
medium.watch((m) => console.log(`среднее сообщение '${m}'`));
long.watch((m) => console.log(`длинное сообщение '${m}'`));

message("Привет, Боб!");
// => длинное сообщение 'Привет, Боб!'

message("Привет!");
// => короткое сообщение 'Привет!'
```

[Попробуйте](https://share.effector.dev/ke2tM78I)

## `split({ source, clock?, match, cases })` (#methods-split-source-clock-match-cases)

:::info{title="с"}
[effector 22.2.0](https://changelog.effector.dev/#effector-22-2-0)
:::

Работает так же, как [split с случаями](/ru/api/effector/split#methods-split-source-match-cases), однако вычисления в `split` будут запущены после срабатывания `clock`.

### Формула (#methods-split-source-clock-match-cases-formulae)

```js
split({source, clock?, match, cases})
```

### Аргументы (#methods-split-source-clock-match-cases-arguments)

TBD

### Примеры (#methods-split-source-clock-match-cases-examples)

```js
import { createStore, createEvent, createEffect, split } from "effector";

const options = ["save", "delete", "forward"];
const $message = createStore({ id: 1, text: "Принесите мне чашку кофе, пожалуйста!" });
const $mode = createStore("");
const selectedMessageOption = createEvent();
const saveMessageFx = createEffect(() => "save");
const forwardMessageFx = createEffect(() => "forward");
const deleteMessageFx = createEffect(() => "delete");

$mode.on(selectedMessageOption, (mode, opt) => options.find((item) => item === opt) ?? mode);

split({
  source: $message,
  clock: selectedMessageOption,
  match: $mode,
  cases: {
    save: saveMessageFx,
    delete: deleteMessageFx,
    forward: forwardMessageFx,
  },
});

selectedMessageOption("delet"); // ничего не происходит
selectedMessageOption("delete");
```

[Попробуйте](https://share.effector.dev/1fRuqN0o)
