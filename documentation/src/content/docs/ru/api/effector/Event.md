---
title: Event
keywords:
  - event
  - unit
description: Event, его методы и свойства
redirectFrom:
  - событие
  - Задаётся либо явно, через поле `name` [в createEvent](/ru/api/effector/createEvent), либо автоматически через [Babel plugin](/ru/api/effector/babel-plugin).
---

```ts
import { type Event, type EventCallable } from "effector";
```

The **Event** in effector represents a user action, a step in the application process, a command to execute, or an intention to make modifications, among other things.
This unit is designed to be a carrier of information/intention/state within the application, not the holder of a state.

# `EventCallable<T>` (#eventCallable)

## Construction (#eventCallable-construction)

There are many ways to create an event:

- The most common [`createEvent`](/en/api/effector/createEvent)
- Используется для обработки сущностей программно, например при использовании [хуков домена](/ru/api/effector/Domain#onCreateEvent)
- Via [Event's methods](#eventCallable-methods) and it's supertype [EventCallable's methods](#eventCallable-methods)
- Some [Effect's methods](/en/api/effector/Effect#methods) return new events and readonly events
- Operators such as: [`createApi`](/en/api/effector/createApi)

### Declaring types (#eventCallable-declaringTypes)

Event carries some data and in a TypeScript ecosystem each data should have a defined type. When an event is explicitly created by [`createEvent`](/en/api/effector/createEvent), type of the argument must be provided as a Generic type argument:

```ts
import { createEvent } from "effector";

interface ItemAdded {
  id: string;
  title: string;
}

const itemAdded = createEvent<ItemAdded>();
```

In most cases, there is no reason to use `void` with another type (~~`Event<void | number>`~~). Use `void` only to declare the Event or EventCallable without the argument at all. That's why it is possible to send data from an event with an argument into an event without an argument.

```ts
sample({
  clock: withData, // Event<number>
  target: withoutData, // Event<void>
});
```

We **strongly recommend** using `null` for empty values when intended:

```ts
Данные для передачи в исходное событие `targetEvent`
```

[Read more in the explanation section](/en/explanation/events#typescript).

## Call as function `event(argument)` (#eventCallable-call-argument)

Initiates an event with the provided argument, which in turn activates any registered subscribers.

[Read more in the explanation section](/en/explanation/events#event-calling).

### Формула (#shortName-formulae)

```ts
**`fn`**: `(data: T) => boolean`
```

- `event` called as a function always returns its `argument` as is
- all subscribers of event receives the `argument` passed into
- when `T` is `void`, `event` can be called without arguments
- `T` by default is `void`, so generic type argument can be omitted

:::warning{title="Important"}

In Effector, any event supports only **a single argument**.
It is not possible to call an event with two or more arguments, as in `someEvent(first, second)`.

All arguments beyond the first will be ignored.
The core team has implemented this rule for specific reasons related to the design and functionality.
:::

### Создает производное событие с возможностью отмены вызова

1. `argument` is a value of `T`. It's optional if the event is defined as `EventCallable<void>`.

### Throws (#eventCallable-call-argument-throws)

#### call of readonly event is not supported, use createEvent instead (#eventCallable-call-argument-throws-call-of-readonly-event)

:::info{title="since"}
[Статья в MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) про _showModal_
:::
:::

When user tried to call `Event`. In the most cases it happens when you tried to call derived event:

```ts
const numberReceived = createEvent<number>(); // EventCallable<number>
const stringifiedReceived = numberReceived.map((number) => String(number)); // Event<string>

stringifiedReceived("123"); // THROWS!
```

The same for all methods returning `Event`.

To fix it create separate event via `createEvent`, and connect them by `sample`:

```ts
const numberReceived = createEvent<number>();
const stringifiedReceived = createEvent<string>();

sample({
  clock: numberReceived,
  fn: (number) => String(number),
  target: stringifiedReceived,
});

stringifiedReceived("123"); // OK
```

#### unit call from pure function is not supported, use operators like sample instead (#eventCallable-call-argument-throws-unit-call-from-pure)

:::info{title="since"}
По мере усложнения логики проекта оптимальнее заменить на комбинацию [эффекта](/ru/api/effector/Effect) и [sample](/ru/api/effector/sample)
:::

Happens when events or effects called from [pure functions](/en/glossary#purity), like mappers:

```ts
Новое, производное событие
```

To fix this, use `sample`:

```ts
Функция-обработчик, которая будет вычислять данные для передачи в исходное событие `targetEvent` на основе данных эвента `trigger`.
```

### При императивном вызове принимают максимум один аргумент и всегда возвращают переданные данные

`T`: Represents the same value that is passed into the `event`.

### Types (#eventCallable-call-argument-types)

```ts
Данные для передачи в производное событие `eventB` либо _undefined_, если вызов `eventB` не требуется
```

An event can be specified with a single generic type argument. By default, this argument is set to void, indicating that the event does not accept any parameters.

## Методы (#methods)

Since the `createEvent` factory creates `EventCallable` for you, its methods will be described first, even though it is a extension of the `Event` type.

События можно вызывать как обычные функции (_императивный вызов_) а также подключать в различные методы api включая [sample](/ru/api/effector/sample), [guard](/ru/api/effector/guard) и [split](/ru/api/effector/split) (_декларативное подключение_).

:::tip
You can think of the EventCallable and Event as type and its super type:

**`data`**: Данные с которыми сработало событие `trigger`

### `prepend(fn)` (#prepend-fn)

Создаёт событие-триггер для преобразования данных _перед_ запуском исходного эвента.

По сравнению с [map](#map), работает в обратном направлении **`data`**: Данные с которыми сработало исходное событие `eventA`

If the original event belongs to some [domain](/en/api/effector/Domain), then a new event will belong to it as well.

#### Формула (#prepend-fn-formulae)

```ts
Функция-предикат, которая определяет необходимость вызова производного события `eventB` возвращая [истинное значение](https://developer.mozilla.org/ru/docs/Glossary/Truthy),[должна быть **чистой**](/ru/explanation/glossary#purity)
```

- When `second` event is triggered
- Call `fn` with argument from the `second` event
- При вызове события `trigger`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего эвент `targetEvent` будет вызван с результатом вычислений

#### Аргументы (#prepend-fn-arguments)

1. `fn` (_Function_): A function that receives `argument`, and should be **pure**.

#### Throws (#eventCallable-methods-prepend-fn-throws)

##### unit call from pure function is not supported, use operators like sample instead (#eventCallable-methods-prepend-fn-throws-unit-call-from-pure)

:::info{title="since"}
Если требуется только фильтрация вызовов без трансформации данных, то оптимальнее использовать [guard](/ru/api/effector/guard)
:::

Happens when events or effects called from [pure functions](/en/glossary#purity), like mappers:

```ts
const someHappened = createEvent<string>();
const another = createEvent<number>();

const reversed = someHappened.prepend((input: number) => {
  another(input); // THROWS!
  return String(input);
});
```

To fix this, use `sample`:

```ts
const someHappened = createEvent<string>();
const another = createEvent<number>();
const reversed = createEvent<number>();

// The same as .prepend(), but using `sample`
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

#### Возвращает (#prepend-fn-returns)

[`EventCallable<T>`](/en/api/effector/Event): New event.

#### Types (#eventCallable-methods-prepend-fn-types)

There TypeScript requires explicitly setting type of the argument of `fn` function:

```ts
Создает производное событие на основе данных из исходного
```

Type of the `original` event argument and the resulting type of the `fn` must be the same.

#### Пример (#prepend-fn-example)

##### Создает производное событие на основе данных из исходного с возможностью отмены вызова

```js
import { createEvent } from "effector";

const userPropertyChanged = createEvent();

userPropertyChanged.watch(({ field, value }) => {
  console.log(`Свойство пользователя "${field}" изменено на ${value}`);
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
// => Свойство пользователя "name" изменено на john

changeRole("admin");
// => Свойство пользователя "role" изменено на ADMIN

changeName("alice");
// => Свойство пользователя "name" изменено на alice
```

[Запустить пример](https://share.effector.dev/ets1GxTA)

##### Пример использования (#prepend-fn-examples-usage)

You can think of this method like a wrapper function. Let's assume we have function with not ideal API, but we want to
call it frequently:

```ts
import { sendAnalytics } from "./analytics";

export function reportClick(item: string) {
  const argument = { type: "click", container: { items: [arg] } };
  return sendAnalytics(argument);
}
```

This is exactly how `.prepend()` works:

```ts
import { sendAnalytics } from "./analytics";

export const reportClick = sendAnalytics.prepend((item: string) => {
  return { type: "click", container: { items: [arg] } };
});

reportClick("example");
// reportClick triggered "example"
// sendAnalytics triggered { type: "click", container: { items: ["example"] } }
```

Check all other methods on [Event](#event-methods).

# `Event<T>` (#event)

A **Event** is a super type of `EventCallable` with different approach. Firstly, invoking a Event is not
allowed, and it cannot be used as a `target` in the `sample` operator, and so on.

The primary purpose of a Event is to be triggered by internal code withing the effector library or ecosystem.
For instance, the `.map()` method returns a Event, which is subsequently called by the `.map()` method itself.

:::info
There is no need for user code to directly invoke such an Event.

If you find yourself needing to call a Event, it may be necessary to reevaluate and restructure your
application's logic.
:::

All the functionalities provided by an Event are also supported in an EventCallable.

## Construction (#event-construction)

There is no way to manually create Event, but some methods and operators returns derived events, they are return
`Event<T>` type:

- Объектная форма аргумента используется потому что _event.filter(fn)_ был сокращённой формой [_filterMap_](#filterMap)
- Store's property: ['.updates'](/en/api/effector/Store#updates)
- Effect's [methods](/en/api/effector/Effect#effect) and [properties](/en/api/effector/Effect#properties)
- operators like: [`sample`](/en/api/effector/sample), [`merge`](/en/api/effector/merge)

## Throws (#event-throws)

- **Errors related to incorrect usage**: More details in specific method sections.

## Declaring types (#event-types)

It becomes necessary in cases where a factory or library requires an event to subscribe to its updates, ensuring proper
integration and interaction with the provided functionality:

```ts
**`fn`**: `(data: T) => S | void`
```

## Имя события.

### `map(fn)` (#map-fn)

При вызове исходного события `eventA`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего производный эвент `eventB` будет вызван с результатом вычислений This special function enables you to break down and manage data flow, as well as extract or
transform data within your business logic model.

#### Формула (#sid-formulae)

```ts
declare const eventA: Event<T>

const eventB = eventA.map(/*fn*/(data: T) => S)
-> Event<S>
```

- When `first` is triggered, pass payload from `first` to `fn`.
- Trigger `second` with the result of the `fn()` call as payload.
- The function `fn` is invoked each time the `first` event is triggered.
- Also, the `second` event triggered each time the `first` is triggered.

#### Аргументы (#map-fn-arguments)

1. `fn` (_Function_): A function that receives `argument`, and [should be **pure**](/en/explanation/glossary#purity).

#### Throws (#event-methods-map-fn-throws)

##### unit call from pure function is not supported, use operators like sample instead (#event-methods-map-fn-throws-unit-call-from-pure)

:::info{title="since"}
[Запустить пример](https://share.effector.dev/FeEWVUbj)
:::

Happens when events or effects called from [pure functions](/en/glossary#purity), like mappers:

```ts
**`data`**: Данные с которыми сработало исходное событие `eventA`
```

To fix this, use `sample`:

```ts
Новое, производное событие
```

#### Возвращает (#map-fn-returns)

[`Event<T>`](#event): The new event.

#### Types (#event-methods-map-fn-types)

При вызове исходного события `eventA`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего, если функция вернула не _undefined_, производный эвент `eventB` будет вызван с результатом вычислений

```ts
Функция с сайд-эффектами, в качестве первого аргумента получает значение с которым было вызвано событие.
```

The `first` event can be represented as either `Event<T>` or `Event<T>`. <br/>
The `second` event will always be represented as `Event<T>`.

#### Пример (#map-fn-example)

```js
import { createEvent } from "effector";

const updateUser = createEvent();
const userNameUpdated = updateUser.map(({ name }) => name);
const userRoleUpdated = updateUser.map(({ role }) => role.toUpperCase());

userNameUpdated.watch((name) => console.log(`Имя пользователя изменено на ${name}`));
userRoleUpdated.watch((role) => console.log(`Роль пользователя изменена на ${role}`));

updateUser({ name: "john", role: "admin" });
// => Имя пользователя изменено на john
// => Роль пользователя изменена на ADMIN
```

[Запустить пример](https://share.effector.dev/NjKNAxmz)

### ```
eventA -> fn -> eventB
```

При вызове исходного события `eventA`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего, если функция вернула [истинное значение](https://developer.mozilla.org/ru/docs/Glossary/Truthy), производный эвент `eventB` будет вызван с теми же данными This special function enables you to break down data flow into a branches and
subscribe on them within the business logic model.

:::tip
Более гибким способом фильтрации является [sample](/ru/api/effector/sample), рекомендуется использовать именно его.
:::

#### Формула (#filter-fn-formulae)

```ts
declare const eventA: Event<T>

const eventB = eventA.filter(/*config*/ {fn: (data: T) => boolean})
-> Event<T>
```

- When `first` is triggered, pass payload from `first` to `fn`.
- The `second` event will be triggered only if `fn` returns `true`, with the argument from `first` event.
- The function `fn` is invoked each time the `first` event is triggered.
- Also, the `second` event triggered each time the `first` is triggered, **and** the `fn` returned `true`.

#### Аргументы (#filter-fn-arguments)

1. `fn` (_Function_): A function that receives `argument`, and [should be **pure**](/en/explanation/glossary#purity).

:::info{title="Note"}
Here, due to legacy restrictions `fn` is required to use object form because `event.filter(fn)` was an alias
for [Event filterMap](/en/api/effector/Event#event-methods-filterMap-fn).

`filter({fn})` (#filter-fn)
:::

#### Throws (#event-methods-filter-fn-throws)

##### unit call from pure function is not supported, use operators like sample instead (#event-methods-filter-fn-throws-unit-call-from-pure)

:::info{title="since"}
Вызывает функцию с сайд-эффектами при каждом срабатывании события
:::

Happens when events or effects called from [pure functions](/en/glossary#purity), like guards:

```ts
_Event (событие, эвент)_ это декларация намерения сделать что-либо: запустить вычисления, отправить сообщение другой секции приложения или обновить состояния в приложении.
```

To fix this, use `sample` to call `eachReceived`:

```ts
declare const event: Event<T>

event.watch(/*watcher*/ (data: T) => any)
-> Subscription
```

#### Возвращает (#filter-fn-returns)

Новое, производное событие

#### Types (#event-methods-filter-fn-types)

Method `.filter()` always returns Event. Also this event will have the same type as the original type:

```ts
Данные для передачи в производное событие `eventB`
```

#### Пример (#filter-fn-example)

```js
import { createEvent, createStore } from "effector";

const numbers = createEvent();

const positiveNumbers = numbers.filter({
  fn: ({ x }) => x > 0,
});

const $lastPositive = createStore(0).on(positiveNumbers, (n, { x }) => x);

$lastPositive.watch((x) => {
  console.log("последнее положительное значение:", x);
});

// => последнее положительное значение: 0

numbers({ x: 0 });
// ничего не произошло

numbers({ x: -10 });
// ничего не произошло

numbers({ x: 10 });
// => последнее положительное значение: 10
```

[Запустить пример](https://share.effector.dev/U3w3dlbO)

#### ```
eventA -> fn -> eventB
```

Let's assume a standard situation when you want to buy sneakers in the shop, but there is no size. You subscribe to the
particular size of the sneakers' model, and in addition, you want to receive a notification if they have it, and ignore
any other notification. Therefore, filtering can be helpful for that. Event filtering works in the same way. If `filter`
returns `true`, the event will be called.

```ts
const sneackersReceived = createEvent<Sneakers>();
const uniqueSizeReceived = sneackersReceived.filter({
  fn: (sneackers) => sneackers.size === 48,
});
```

### `filterMap(fn)` (#filterMap-fn)

:::info{title="since"}
Метод добавлен в effector 20.0.0
:::

This methods generates a new derived Event that **may be invoked** after the original event, but with the
transformed argument. This special method enabled you to simultaneously transform data and filter out trigger of the
event.

Является [юнитом](/ru/explanation/glossary#common-unit) That's it. The reason for creating was an
impossibility for event filtering.

This method is mostly useful with JavaScript APIs whose returns `undefined` sometimes.

#### Формула (#map-fn-formulae)

```ts
declare const eventA: Event<T>

const eventB = eventA.filterMap(
  /*fn*/ (data: T) => S | void
)
-> Event<S>
```

- When `first` is triggered, call `fn` with payload from `first`
- If `fn()` returned `undefined` do not trigger `second`
- If `fn()` returned some data, trigger `second` with data from `fn()`

#### Аргументы (#filterMap-fn-arguments)

1. **`fn`**: `(data: T) => S` [Должна быть **чистой**](/ru/explanation/glossary#purity)

The `fn` function should return some data. When `undefined` is returned, the update of derived event will be skipped.

#### ```
trigger -> fn -> targetEvent
```

##### Использование с методами JavaScript возвращающими undefined (#filterMap-fn-example-usage-with-functions-returning-undefined)

:::info{title="since"}
**`watcher`**: `(data: T) => any`
:::

Happens when events or effects called from [pure functions](/en/glossary#purity), like mappers:

```ts
Функция-обработчик, которая будет вычислять данные для передачи в производное событие `eventB` на основе данных из исходного эвента `eventA`.
```

To fix this, use `sample` to call `eachReceived`:

```ts
Функция-обработчик, которая будет вычислять данные для передачи в производное событие `eventB` на основе данных из исходного эвента `eventA`.
```

#### Возвращает (#filterMap-fn-returns)

Новое событие

#### Формула (#filterMap-formulae)

The type for the derived event is automatically inferred from the `fn` declaration.
No need to explicitly set type for variable or generic type argument:

```ts
import React from "react";
import { createEvent, createStore } from "effector";

const openModal = createEvent();
const closeModal = createEvent();

const openModalUnboxed = openModal.filterMap((ref) => {
  if (ref.current) return ref.current;
});
const closeModalUnboxed = closeModal.filterMap((ref) => {
  if (ref.current) return ref.current;
});

openModalUnboxed.watch((modal) => modal.showModal());
closeModalUnboxed.watch((modal) => modal.close());

const App = () => {
  const modalRef = React.useRef(null);
  return (
    <>
      <dialog ref={modalRef}>
        <form method="dialog">
          <fieldset>
            <legend>Модальное окно</legend>
            Нажмите для закрытия
            <button onSubmit={() => closeModal(modalRef)} type="submit">
              ❌
            </button>
          </fieldset>
        </form>
      </dialog>

      <button onClick={() => openModal(modalRef)}>Открыть модальное окно</button>
    </>
  );
};
```

The `first` event can be represented as either `Event<T>` or `EventCallable<T>`. <br/>
The `second` event will always be represented as `Event<T>`.

#### Пример (#filterMap-fn-example)

```tsx
const listReceived = createEvent<string[]>()
const effectorFound = listReceived.filterMap(list => list.find(name => name === 'effector'))

effectorFound.watch(name => console.info("found", name))
listReceived(["redux", "effector", "mobx"]) // found effector
listReceived(["redux", "mobx"])
```

[Запустить пример](https://share.effector.dev/ARDanMAM)

#### Использование c nullable React ref (#filterMap-fn-example-usage-with-nullable-ref)

Consider a scenario where you walk into a grocery store with a specific task: you need to purchase 10 apples, but only
if they're red. If they're not red, you're out of luck.
Let's consider by steps:

1. Take one apple;
2. Have a look, is it red(put in a pack) or not(take another).

And you repeat this until you complete the task. Now think about it in the effector terms, and we consider the positive
case:

1. Take an apple – event;
2. Have a look, red or no – filter;
3. You keep it – map;
4. Put in pack – event.
5. Pack – store

### `watch(watcher)` (#watch-watcher)

This method enables you to call callback on each event trigger with the argument of the event.

:::tip{title="Keep in mind"}

Its primary intended use is for short-term debugging and logging purposes.
:::

[Read more in the explanation section](/en/explanation/events#event-watch).

#### Формула (#watch-watcher-formulae)

```ts
declare const targetEvent: Event<S>

const trigger = targetEvent.prepend(/*fn*/(data: T) => S)
-> Event<T>
```

- The `fn` will be called on each `event` trigger, passed argument of the `event` to the `fn`.
- When `unwatch` is called, stop calling `fn` on each `event` trigger.

#### Аргументы (#watch-watcher-arguments)

1. `watcher` ([_Watcher_](/en/explanation/glossary#watcher)): A function that receives `argument` from the event.

#### Возвращает (#watch-watcher-returns)

[_Subscription_](/ru/explanation/glossary#subscription): Функция отмены подписки, после её вызова `watcher` перестаёт получать обновления и удаляется из памяти.

#### Пример (#watch-watcher-example)

```js
import { createEvent } from "effector";

const sayHi = createEvent();
const stop = sayHi.watch((name) => {
  console.log(`Привет, ${name}!`);
});

sayHi("Боб");
// => Привет, Боб!

stop();

sayHi("Алиса");
// => ничего не произошло
```

[Запустить пример](https://share.effector.dev/OzA9AbpY)

### `.subscribe(observer)` (#event-methods-subscribe-observer)

This is the low-level method to integrate event with the standard `Observable` pattern.

:::tip{title="Keep in mind"}
You don't need to use this method on your own. It is used under the hood by rendering engines or so on.
:::

Read more:

- https://rxjs.dev/guide/observable
- https://github.com/tc39/proposal-observable

## Свойства (#properties)

Задаётся автоматически через [Babel plugin](/ru/api/effector/babel-plugin) So they are exist only when babel or SWC is used.

### `sid` (#sid)

Стабильный идентификатор события.

It is important to note, SID is not changes on each app start, it is statically written inside your app bundle to
absolutely identify units.

It can be useful to send events between workers or
server/browser: [examples/worker-rpc](https://github.com/effector/effector/tree/master/examples/worker-rpc).

It has the `string | null` type.

### `shortName` (#shortName)

It is a `string` type property, contains the name of the variable event declared at.

```ts
declare const event: Event<any>

event.shortName
-> string
```

But reassign event to another variable changes nothing:

```ts
const another = demo;
// another.shortName === 'demo'
```

### `.compositeName` (#event-properties-compositeName)

This property contains the full internal chain of units. For example, event can be created by the domain, so the
composite name will contain a domain name inside it.

:::tip{title="Keep in mind"}
Usually, if long name is needed, is better to pass it explicitly to `name` field
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

# Types (#types)

```ts
import { type EventPayload } from "effector";
```

## `EventPayload<E>` (#types-EventPayload)

Extracts type of payload from `Event` or `EventCallable`.

```ts
declare const event: Event<any>

event.sid
-> string | null
```
