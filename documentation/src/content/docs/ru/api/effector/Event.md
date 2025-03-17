---
title: Event
keywords:
  - event
  - unit
  - message
  - command
  - событие
  - юнит
  - сообщение
  - команда
description: Event, его методы и свойства
lang: ru
---

```ts
import { type Event, type EventCallable } from "effector";
```

**Event** в effector представляет действие пользователя, шаг в процессе приложения, команду к выполнению или намерение внести изменения и многое другое. Этот юнит предназначен для переноса информации/намерений/состояния в приложении, а не для хранения состояния.

# `EventCallable<T>` (#eventCallable)

## Создание (#eventCallable-construction)

Существует множество способов создания события:

- Самый распространенный [`createEvent`](/ru/api/effector/createEvent)
- С помощью [Domain `createEvent`](/ru/api/effector/Domain#unit-creators-createEvent-name)
- Через [методы Event](#eventCallable-methods) и его суперкласс [методы EventCallable](#eventCallable-methods)
- Некоторые [методы Effect](/ru/api/effector/Effect#methods) возвращают новые события и события только для чтения
- Операторы, такие как: [`createApi`](/ru/api/effector/createApi)

### Объявление типов (#eventCallable-declaringTypes)

Событие переносит данные, и в экосистеме TypeScript каждый набор данных должен иметь определенный тип. Когда событие создается явно с помощью [`createEvent`](/ru/api/effector/createEvent), тип аргумента должен быть указан в качестве дженерика:

```ts
import { createEvent } from "effector";

interface ItemAdded {
  id: string;
  title: string;
}

const itemAdded = createEvent<ItemAdded>();
```

В большинстве случаев нет необходимости использовать `void` вместе с другим типом (~~`Event<void | number>`~~). Используйте `void` только для объявления Event или EventCallable вообще без аргумента. Поэтому можно отправить данные из события с аргументом в событие без аргумента.

```ts
sample({
  clock: withData, // Event<number>
  target: withoutData, // Event<void>
});
```

Мы **настоятельно рекомендуем** использовать `null` для пустых значений, если это подразумевается:

```ts
import { createEvent } from "effector";

const maybeDataReceived = createEvent<Data | null>();
// maybeDataReceived: EventCallable<Data | null>
```

[Подробнее в разделе объяснений](/ru/explanation/events#typescript).

## Вызов как функция `event(argument)` (#eventCallable-call-argument)

Инициирует событие с переданным аргументом, который, в свою очередь, активирует всех зарегистрированных подписчиков.

[Подробнее в разделе объяснений](/ru/explanation/events#event-calling).

### Formulae (#eventCallable-call-argument-formulae)

```ts
const event: EventCallable<T>;
event(argument: T): T;
```

- `event`, вызываемый как функция, всегда возвращает свой `argument` как есть
- все подписчики события получают переданный аргумент
- когда `T` — это `void`, `event` можно вызывать без аргументов
- `T` по умолчанию — это `void`, поэтому дженерик можно опустить

:::warning{title="Важно"}

В Effector любое событие поддерживает только **один аргумент**.
Вызов события с двумя или более аргументами, как в случае `someEvent(first, second)`, невозможен.

Все аргументы, кроме первого, будут проигнорированы.
Основная команда внедрила это правило по специфическим причинам, связанным с проектированием и функциональностью.
:::

### Аргументы (#eventCallable-call-argument-arguments)

1. `argument` — значение типа `T`. Он необязателен, если событие определено как `EventCallable<void>`.

### Ошибки (#eventCallable-call-argument-throws)

#### eventCallable-call-argument-throws (#eventCallable-call-argument-throws-call-of-readonly-event)

:::info{title="с версии"}
[effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0-spacewatch)
:::

Когда пользователь попытался вызвать `Event`. В большинстве случаев это происходит, когда вы пытаетесь вызвать производное событие:

```ts
const numberReceived = createEvent<number>(); // EventCallable<number>
const stringifiedReceived = numberReceived.map((number) => String(number)); // Event<string>

stringifiedReceived("123"); // ВЫЗЫВАЕТ ОШИБКУ!
```

То же самое относится ко всем методам, возвращающим `Event`.

Корректное использование: создайте отдельное событие через `createEvent` и свяжите их с помощью `sample`:

```ts
const numberReceived = createEvent<number>();
const stringifiedReceived = createEvent<string>();

sample({
  clock: numberReceived,
  fn: (number) => String(number),
  target: stringifiedReceived,
});

stringifiedReceived("123"); // ОК
```

#### вызов юнита из чистой функции не поддерживается, используйте вместо этого операторы, такие как sample (#eventCallable-call-argument-throws-unit-call-from-pure)

:::info{title="с версии"}
[effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0-spacewatch)
:::

Происходит, когда события или эффекты вызываются из [чистых функций](/ru/glossary#purity), таких как мапперы:

```ts
const someHappened = createEvent<number>();
const another = createEvent();

const derived = someHappened.map((number) => {
  another(); // ВЫЗЫВАЕТ ОШИБКУ!
  return String(number);
});
```

Корректное использование: используйте `sample`:

```ts
const someHappened = createEvent<number>();
const another = createEvent();
const derived = createEvent<string>();

sample({
  clock: someHappened,
  target: another,
});

// То же самое, что и .map(), но с использованием `target`
sample({
  clock: someHappened,
  fn: (number) => String(number),
  target: derived,
});
```

### Возвращает (#eventCallable-call-argument-returns)

`T`: Представляет то же значение, которое передается в `event`.

### Типы (#eventCallable-call-argument-types)

```ts
import { createEvent, Event } from "effector";

const someHappened = createEvent<number>();
// someHappened: EventCallable<number>
someHappened(1);

const anotherHappened = createEvent();
// anotherHappened: EventCallable<void>
anotherHappened();
```

Событие может быть создано с одним дженериком. По умолчанию этот аргумент установлен в `void`, что означает, что событие не принимает параметры.

## Методы (#eventCallable-methods)

Поскольку фабрика `createEvent` создает `EventCallable` для вас, сначала будут описаны его методы, даже несмотря на то, что это расширение типа `Event`.

Все методы и свойства из [Event](#event-methods) также доступны на экземпляре `EventCallable`.

:::tip
Вы можете считать EventCallable и Event типом и его суперклассом:

`EventCallable<T> extends Event<T>`
:::

### `.prepend(fn)` (#eventCallable-methods-prepend-fn)

Создает новый `EventCallable`, который вызывается, при его срабатывании передает преобразованные данные в исходное событие.

Работает как обратный `.map`. В случае `.prepend` данные преобразуются **до срабатывания исходного события**, а в случае `.map` данные преобразуются **после срабатывания исходного события**.

Если исходное событие принадлежит какому-либо [домену](/ru/api/effector/Domain), то новое событие также будет ему принадлежать.

#### Formulae (#eventCallable-methods-prepend-fn-formulae)

```ts
const first: EventCallable<T>;
const second: EventCallable<T> = first.prepend(fn);
```

- Когда второе событие срабатывает
- Вызвать `fn` с аргументом второго события
- Вызвать первое событие с результатом `fn()`

#### Аргументы (#eventCallable-methods-prepend-fn-arguments)

1. `fn` (_Function_): Функция, которая получает `argument`, и должна быть **чистой**.

#### Ошибки (#eventCallable-methods-prepend-fn-throws)

##### unit call from pure function is not supported, use operators like sample instead (#eventCallable-methods-prepend-fn-throws-unit-call-from-pure)

:::info{title="с версии"}
[effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0-spacewatch)
:::

Происходит, когда события или эффекты вызываются из [чистых функций](/ru/glossary#purity), таких как мапперы:

```ts
const someHappened = createEvent<string>();
const another = createEvent<number>();

const reversed = someHappened.prepend((input: number) => {
  another(input); // ВЫЗЫВАЕТ ОШИБКУ!
  return String(input);
});
```

Корректное использование: используйте `sample`:

```ts
const someHappened = createEvent<string>();
const another = createEvent<number>();
const reversed = createEvent<number>();

// То же самое, что и .prepend(), но с использованием `sample`
sample({
  clock: reversed,
  fn: (input) => String(input),
  target: someHappened,
});

sample({
  clock: reversed,
  target: another,
});
```

#### Возвращает (#eventCallable-methods-prepend-fn-returns)

[`EventCallable<T>`](/ru/api/effector/Event): Новое событие.

#### Типы (#eventCallable-methods-prepend-fn-types)

TypeScript требует явного указания типа аргумента функции `fn`:

```ts
import { createEvent } from "effector";

const original = createEvent<{ input: string }>();

const prepended = original.prepend((input: string) => ({ input }));
//                                         ^^^^^^ здесь
```

Тип аргумента исходного события и результирующий тип функции `fn` должны совпадать.

#### Примеры (#eventCallable-methods-prepend-fn-examples)

##### Базовый пример (#eventCallable-methods-prepend-fn-examples-basic)

```js
import { createEvent } from "effector";

const userPropertyChanged = createEvent();

userPropertyChanged.watch(({ field, value }) => {
  console.log(`Свойство пользователя "${field}" изменилось на ${value}`);
});

const changeName = userPropertyChanged.prepend((name) => ({
  field: "name",
  value: name,
}));
const changeRole = userPropertyChanged.prepend((role) => ({
  field: "role",
  value: role.toUpperCase(),
}));

changeName("john");
// => Свойство пользователя "name" изменилось на john

changeRole("admin");
// => Свойство пользователя "role" изменилось на ADMIN

changeName("alice");
// => Свойство пользователя "name" изменилось на alice
```

[Открыть пример](https://share.effector.dev/XGxlG4LD)

##### Содержательный пример (#eventCallable-methods-prepend-fn-examples-meaningful)

Вы можете считать этот метод функцией-обёрткой. Допустим, у нас есть функция с неидеальным API, но нам нужно часто её вызывать:

```ts
import { sendAnalytics } from "./analytics";

export function reportClick(item: string) {
  const argument = { type: "click", container: { items: [arg] } };
  return sendAnalytics(argument);
}
```

Это именно то, как работает `.prepend()`:

```ts
import { sendAnalytics } from "./analytics";

export const reportClick = sendAnalytics.prepend((item: string) => {
  return { type: "click", container: { items: [arg] } };
});

reportClick("example");
// reportClick сработал "example"
// sendAnalytics сработал с { type: "click", container: { items: ["example"] } }
```

Ознакомьтесь со всеми другими методами в [Event](#event-methods).

# `Event<T>` (#event)

**Event** — это суперкласс `EventCallable` с иным подходом. Вызов Event не разрешен, и он не может быть использован в качестве `target` в операторе `sample` и т.д.

Основная цель Event — быть вызванным внутренним кодом в библиотеке effector или её экосистеме.
Например, метод `.map()` возвращает Event, который затем вызывается самим методом `.map()`.

:::info
Нет необходимости для кода пользователя напрямую вызывать такой Event.

Если вам необходимо вызвать Event, возможно, следует пересмотреть и реорганизовать логику вашего приложения.
:::

Все функции, предоставляемые Event, также поддерживаются в EventCallable.

## Создание (#event-construction)

Невозможно вручную создать Event, но некоторые методы и операторы возвращают производные события, они возвращают тип
`Event<T>`:

- Методы Event, такие как: [`.map(fn)`](#event-map-fn), [`.filter({fn})`](#event-methods-filterMap-fn) и т.д.
- Свойство Store: ['.updates'](/ru/api/effector/Store#updates)
- Методы и [свойства](/ru/api/effector/Effect#properties) Effect
- операторы, такие как: [`sample`](/ru/api/effector/sample), [`merge`](/ru/api/effector/merge)

## Ошибки (#event-throws)

- **Ошибки, связанные с некорректным использованием**: Подробнее в разделах, посвящённых конкретным методам.

## Объявление типов (#event-types)

Это становится необходимым в тех случаях, когда фабрика или библиотека требует события для подписки на его обновления, чтобы обеспечить надлежащую интеграцию и взаимодействие с предоставленным функционалом:

```ts
const event: Event<T>;
```

## Методы (#event-methods)

### `.map(fn)` (#event-methods-map-fn)

Создает новое производное событие, которое будет вызвано после того, как будет вызвано исходное событие, используя результат функции `fn` в качестве его аргумента. Эта специальная функция позволяет вам разбивать и управлять потоком данных, а также извлекать или преобразовывать данные в рамках вашей модели бизнес-логики.

#### Formulae (#event-methods-map-fn-formulae)

```ts
const first: Event<T> | EventCallable<T>;
const second: Event<F> = first.map(fn);
```

- Когда `first` срабатывает, передайте данные из `first` в `fn`.
- Вызовите `second` с результатом вызова `fn()` в качестве полезной нагрузки.
- Функция `fn` вызывается каждый раз, когда срабатывает `first`.
- Также `second` срабатывает каждый раз, когда срабатывает `first`.

#### Аргументы (#event-methods-map-fn-arguments)

1. `fn` (_Function_): Функция, получающая `argument`, и [должна быть **чистой**](/ru/explanation/glossary#purity).

#### Ошибки (#event-methods-map-fn-throws)

##### unit call from pure function is not supported, use operators like sample instead (#event-methods-map-fn-throws-unit-call-from-pure)

:::info{title="с версии"}
[effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0-spacewatch)
:::

Происходит, когда события или эффекты вызываются из [чистых функций](/ru/glossary#purity), таких как мапперы:

```ts
const someHappened = createEvent<number>();
const another = createEvent();

const derived = someHappened.map((number) => {
  another(); // ВЫЗЫВАЕТ ОШИБКУ!
  return String(number);
});
```

Корректное использование: используйте `sample`:

```ts
const someHappened = createEvent<number>();
const another = createEvent();
const derived = createEvent<string>();

sample({
  clock: someHappened,
  target: another,
});

// То же самое, что и .map(), но с использованием `target`
sample({
  clock: someHappened,
  fn: (number) => String(number),
  target: derived,
});
```

#### Возвращает (#event-methods-map-fn-returns)

[`Event<T>`](#event): Новое событие.

#### Типы (#event-methods-map-fn-types)

Результирующий тип функции `fn` будет использован для определения типа производного события.

```ts
import { createEvent } from "effector";

const first = createEvent<number>();
// first: Event<number>

const second = first.map((count) => count.toString());
// second: Event<string>
```

Событие `first` может быть представлено как `Event<T>`, так и `EventCallable<T>`. <br/>
Событие `second` всегда будет представлено как `Event<T>`.

#### Примеры (#event-methods-map-fn-examples)

```js
import { createEvent } from "effector";

const userUpdated = createEvent();

// вы можете разбить поток данных с помощью метода .map()
const userNameUpdated = userUpdated.map(({ user }) => name);

// либо преобразовать данные
const userRoleUpdated = userUpdated.map((user) => user.role.toUpperCase());

userNameUpdated.watch((name) => console.log(`Имя пользователя теперь [${name}]`));
userRoleUpdated.watch((role) => console.log(`Роль пользователя теперь [${role}]`));

userUpdated({ name: "john", role: "admin" });
// => Имя пользователя теперь [john]
// => Роль пользователя теперь [ADMIN]
```

[Открыть пример](https://share.effector.dev/duDut6nR)

### `.filter({ fn })` (#event-methods-filter-fn)

Этот метод генерирует новое производное событие, которое будет вызвано после исходного события, но только если функция `fn` вернет `true`. Эта специальная функция позволяет вам разбить поток данных на ветви и подписаться на них в рамках модели бизнес-логики.

:::tip
[sample](/ru/api/effector/sample) с аргументом `filter` является предпочтительным методом фильтрации.
:::

#### Formulae (#event-methods-filter-fn-formulae)

```ts
const first: Event<T> | EventCallable<T>;
const second: Event<T> = first.filter({ fn });
```

- Когда `first` срабатывает, передайте данные из `first` в `fn`.
- Событие `second` будет срабатывать только если `fn` вернет `true`, с аргументом из события `first`.
- Функция `fn` вызывается каждый раз, когда срабатывает `first`.
- Также событие `second` срабатывает каждый раз, когда срабатывает `first` и **fn** возвращает `true`.

#### Аргументы (#event-methods-filter-fn-arguments)

1. `fn` (_Function_): Функция, получающая `argument`, и [должна быть **чистой**](/ru/explanation/glossary#purity).

:::info{title="Примечание"}
По историческим причинам `fn` должен использовать объектную форму, потому что `event.filter(fn)` был псевдонимом для [Event filterMap](/ru/api/effector/Event#event-methods-filterMap-fn).

Используйте его всегда так `.filter({ fn })`.
:::

#### Ошибки (#event-methods-filter-fn-throws)

##### unit call from pure function is not supported, use operators like sample instead (#event-methods-filter-fn-throws-unit-call-from-pure)

:::info{title="с версии"}
[effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0-spacewatch)
:::

Происходит, когда события или эффекты вызываются из [чистых функций](/glossary#purity), таких как guards:

```ts
const countReceived = createEvent<number>();
const eachReceived = createEvent<number>();

const receivedEven = someHappened.filter({
  fn(count) {
    eachReceived(count); // ВЫЗЫВАЕТ ОШИБКУ!
    return count % 2 === 0;
  },
});
```

Корректное использование: используйте `sample` для вызова `eachReceived`:

```ts
const countReceived = createEvent<number>();
const eachReceived = createEvent<number>();

const receivedEven = someHappened.filter({
  fn(count) {
    return count % 2 === 0;
  },
});

sample({
  clock: someHappened,
  target: eachReceived,
});
```

#### Возвращает (#event-methods-filter-fn-returns)

[`Event<T>`](#event): Новое событие.

#### Типы (#event-methods-filter-fn-types)

Метод `.filter()` всегда возвращает Event. Также это событие будет иметь тот же тип, что и исходный:

```ts
import { createEvent } from "effector";

const numberReceived = createEvent<number>();
// numberReceived: Event<number>

const evenReceived = numberReceived.filter({
  fn: (number) => number % 2 === 0,
});
// evenReceived: Event<number>

evenReceived.watch(console.info);
numberReceived(5); // ничего
numberReceived(2); // => 2
```

#### Примеры (#event-methods-filter-fn-examples)

```js
import { createEvent, createStore } from "effector";

const numbers = createEvent();
const positiveNumbers = numbers.filter({
  fn: ({ x }) => x > 0,
});

const $lastPositive = createStore(0).on(positiveNumbers, (n, { x }) => x);

$lastPositive.watch((x) => {
  console.log("последнее положительное:", x);
});

// => последнее положительное: 0

numbers({ x: 0 });
// нет реакции

numbers({ x: -10 });
// нет реакции

numbers({ x: 10 });
// => последнее положительное: 10
```

[Открыть пример](https://share.effector.dev/H2Iu4iJH)

#### Содержательный пример (#event-methods-filter-fn-examples-meaningful)

Предположим стандартную ситуацию, когда вы хотите купить кроссовки в магазине, но нужного размера нет. Вы подписываетесь на конкретный размер модели кроссовок и, кроме того, хотите получать уведомления, если они появятся, и игнорировать любые другие уведомления. В таком случае фильтрация будет полезной. Фильтрация событий работает аналогично. Если `filter` возвращает `true`, событие будет вызвано.

```ts
const sneackersReceived = createEvent<Sneakers>();
const uniqueSizeReceived = sneackersReceived.filter({
  fn: (sneackers) => sneackers.size === 48,
});
```

### `.filterMap(fn)` (#event-methods-filterMap-fn)

:::info{title="с версии"}
[effector 20.0.0](https://changelog.effector.dev/#effector-20-0-0)
:::

Этот метод генерирует новое производное событие, которое **может быть вызвано** после исходного события, но с преобразованным аргументом. Этот специальный метод позволяет одновременно преобразовывать данные и фильтровать срабатывание события.

Этот метод похож на объединение `.filter()` и `.map()`. Это и есть причина его создания: невозможность фильтрации событий.

Этот метод наиболее полезен с API JavaScript, которые иногда возвращают `undefined`.

#### Formulae (#event-methods-filterMap-fn-formulae)

```ts
const first: Event<T> | EventCallable<T>;
const second: Event<F> = first.filterMap(fn);
```

- Когда `first` срабатывает, вызовите `fn` с полезной нагрузкой из `first`.
- Если `fn()` вернул `undefined`, не вызывайте `second`.
- Если `fn()` вернул какие-либо данные, вызовите `second` с данными из `fn()`.

#### Аргументы (#event-methods-filterMap-fn-arguments)

1. `fn` (_Function_): Функция, получающая `argument`, [должна быть **чистой**](/ru/explanation/glossary#purity).

Функция `fn` должна возвращать некоторые данные. Если возвращается `undefined`, обновление производного события будет пропущено.

#### Ошибки (#event-methods-filterMap-fn-throws)

##### unit call from pure function is not supported, use operators like sample instead (#event-methods-filterMap-fn-throws-unit-call-from-pure)

:::info{title="с версии"}
[effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0-spacewatch)
:::

Происходит, когда события или эффекты вызываются из [чистых функций](/ru/glossary#purity), таких как мапперы:

```ts
const countReceived = createEvent<number>();
const eachReceived = createEvent<number>();

const receivedEven = someHappened.filterMap((count) => {
  eachReceived(count); // ВЫЗЫВАЕТ ОШИБКУ!
  return count % 2 === 0 ? Math.abs(count) : undefined;
});
```

Корректное использование: используйте `sample` для вызова `eachReceived`:

```ts
const countReceived = createEvent<number>();
const eachReceived = createEvent<number>();

const receivedEven = someHappened.filterMap((count) => {
  return count % 2 === 0 ? Math.abs(count) : undefined;
});

sample({
  clock: someHappened,
  target: eachReceived,
});
```

#### Возвращает (#event-methods-filterMap-fn-returns)

[`Event<T>`](#event): Новое событие.

#### Типы (#event-methods-filterMap-fn-types)

Тип для производного события автоматически выводится из объявления функции `fn`.
Нет необходимости явно задавать тип для переменной или дженерика:

```ts
import { createEvent } from "effector";

const first = createEvent<number>();
// first: Event<number>

const second = first.filterMap((count) => {
  if (count === 0) return;
  return count.toString();
});
// second: Event<string>
```

Событие `first` может быть представлено как `Event<T>`, так и `EventCallable<T>`. <br/>
Событие `second` всегда будет представлено как `Event<T>`.

#### Примеры (#event-methods-filterMap-fn-examples)

```tsx
import { createEvent } from "effector";

const listReceived = createEvent<string[]>();

// Array.prototype.find() возвращает `undefined`, когда элемент не найден
const effectorFound = listReceived.filterMap((list) => list.find((name) => name === "effector"));

effectorFound.watch((name) => console.info("найден", name));

listReceived(["redux", "effector", "mobx"]); // => найден effector
listReceived(["redux", "mobx"]);
```

[Открыть пример](https://share.effector.dev/ARDanMAM)

#### Задача в терминах эффектора (#event-methods-filterMap-fn-examples-meaningful)

Рассмотрим сценарий, когда вы заходите в продуктовый магазин с конкретной задачей: вам нужно купить 10 яблок, но только если они красные. Если они не красные, вам не повезло.
Рассмотрим шаги:

1. Возьмите одно яблоко;
2. Посмотрите, красное ли оно (положите в пакет) или нет (возьмите другое).

И вы повторяете это, пока не выполните задачу

. Теперь подумайте об этом в терминах effector, и мы рассмотрим положительный случай:

1. Взять яблоко — событие;
2. Посмотреть, красное ли оно — фильтр;
3. Вы сохраняете его — маппинг;
4. Положить в пакет — событие.
5. Пакет — стор.

### `.watch(watcher)` (#event-methods-watch-watcher)

Этот метод позволяет вам вызывать обратный вызов при каждом срабатывании события с аргументом события.

:::tip{title="Помните"}
Метод `watch` не обрабатывает и не сообщает о исключениях, не управляет завершением асинхронных операций и не решает проблемы сгона данных.

Его основное предназначение — для краткосрочного отладки и логирования.
:::

[Подробнее в разделе объяснений](/ru/explanation/events#event-watch).

#### Formulae (#event-methods-watch-watcher-formulae)

```ts
const event: Event<T> | EventCallable<T>;
const unwatch: () => void = event.watch(fn);
```

- Функция `fn` будет вызвана при каждом срабатывании `event`, передав аргумент события в `fn`.
- Когда `unwatch` вызывается, перестаньте вызывать `fn` при каждом срабатывании `event`.

#### Аргументы (#event-methods-watch-watcher-arguments)

1. `watcher` ([_Watcher_](/ru/explanation/glossary#watcher)): Функция, получающая `argument` из события.

#### Возвращает (#event-methods-watch-watcher-returns)

[_Subscription_](/ru/explanation/glossary#subscription): Функция для отмены подписки.

#### Примеры (#event-methods-watch-watcher-examples)

```js
import { createEvent } from "effector";

const sayHi = createEvent();
const unwatch = sayHi.watch((name) => console.log(`${name}, привет!`));

sayHi("Питер"); // => Питер, привет!
unwatch();

sayHi("Дрю"); // => ничего не произошло
```

[Открыть пример](https://share.effector.dev/9YVgCl4C)

### `.subscribe(observer)` (#event-methods-subscribe-observer)

Это низкоуровневый метод для интеграции события со стандартным шаблоном `Observable`.

:::tip{title="Помните"}
Вам не нужно использовать этот метод самостоятельно. Он используется под капотом движками рендеринга и так далее.
:::

Подробнее:

- https://rxjs.dev/guide/observable
- https://github.com/tc39/proposal-observable

## Свойства (#event-properties)

Этот набор свойств в основном задается [`effector/babel-plugin`](/ru/api/effector/babel-plugin) или [`@effector/swc-plugin`](/ru/api/effector/swc-plugin). Таким образом, они существуют только при использовании Babel или SWC.

### `.sid` (#event-properties-sid)

Это уникальный идентификатор для каждого события.

Важно отметить, что SID не изменяется при каждом запуске приложения, он статически записывается в пакет вашего приложения для абсолютной идентификации юнитов.

Это может быть полезно для отправки событий между рабочими или
сервером/браузером: [examples/worker-rpc](https://github.com/effector/effector/tree/master/examples/worker-rpc).

Имеет тип `string | null`.

### `.shortName` (#event-properties-shortName)

Это свойство типа `string`, содержащее имя переменной, в которой объявлено событие.

```ts
import { createEvent } from "effector";

const demo = createEvent();
// demo.shortName === 'demo'
```

Но переопределение события в другую переменную ничего не изменит:

```ts
const another = demo;
// another.shortName === 'demo'
```

### `.compositeName` (#event-properties-compositeName)

Это свойство содержит полную внутреннюю цепочку юнитов. Например, событие может быть создано доменом, поэтому составное имя будет содержать имя домена внутри него.

:::tip{title="Помните"}
Обычно, если требуется длинное имя, лучше передать его явно в поле `name`.
:::

```ts
import { createEvent, createDomain } from "effector";

const first = createEvent();
const domain = createDomain();
const second = domain.createEvent();

console.log(first.compositeName);
// => { shortName: "first", fullName: "first", path: ["first"] }

console.log(second.compositeName);
// => { shortName: "second", fullName: "domain/second", path: ["domain", "second"] }
```

# Типы (#types)

```ts
import { type EventPayload } from "effector";
```

## `EventPayload<E>` (#types-EventPayload)

Извлекает тип полезной нагрузки из `Event` или `EventCallable`.

```ts
const event: Event<Payload>;
type Payload = EventPayload<typeof event>;
```
