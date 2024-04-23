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

_Event (событие, эвент)_ это декларация намерения сделать что-либо: запустить вычисления, отправить сообщение другой секции приложения или обновить состояния в приложении. Одна из основных управляющих сущностей, при срабатывании запускает цепочки реактивных вычислений в приложении. Является [юнитом](/ru/explanation/glossary#common-unit)

События можно вызывать как обычные функции (_императивный вызов_) а также подключать в различные методы api включая [sample](/ru/api/effector/sample), [guard](/ru/api/effector/guard) и [split](/ru/api/effector/split) (_декларативное подключение_). При императивном вызове принимают максимум один аргумент и всегда возвращают переданные данные

# Методы (#methods)

## `map(fn)` (#map-fn)

Создает производное событие на основе данных из исходного

### Формула (#map-fn-formulae)

```ts
declare const eventA: Event<T>

const eventB = eventA.map(/*fn*/(data: T) => S)
-> Event<S>
```

При вызове исходного события `eventA`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего производный эвент `eventB` будет вызван с результатом вычислений

```

    eventA -> fn -> eventB

```

### Аргументы (#map-fn-arguments)

1.  **`fn`**: `(data: T) => S`

    Функция-обработчик, которая будет вычислять данные для передачи в производное событие `eventB` на основе данных из исходного эвента `eventA`. [Должна быть **чистой**](/ru/explanation/glossary#purity)

    **Аргументы**

    - **`data`**: Данные с которыми сработало исходное событие `eventA`

    **Возвращает**

    Данные для передачи в производное событие `eventB`

### Возвращает (#map-fn-returns)

Новое, производное событие

### Пример (#map-fn-example)

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

[Запустить пример](https://share.effector.dev/U3w3dlbO)

## `prepend(fn)` (#prepend-fn)

Создаёт событие-триггер для преобразования данных _перед_ запуском исходного эвента. По сравнению с [map](#map), работает в обратном направлении

### Формула (#prepend-fn-formulae)

```ts
declare const targetEvent: Event<S>

const trigger = targetEvent.prepend(/*fn*/(data: T) => S)
-> Event<T>
```

При вызове события `trigger`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего эвент `targetEvent` будет вызван с результатом вычислений

```

    trigger -> fn -> targetEvent

```

### Аргументы (#prepend-fn-arguments)

1.  **`fn`**: `(data: T) => S`

    Функция-обработчик, которая будет вычислять данные для передачи в исходное событие `targetEvent` на основе данных эвента `trigger`. [Должна быть **чистой**](/ru/explanation/glossary#purity)

    **Аргументы**

    - **`data`**: Данные с которыми сработало событие `trigger`

    **Возвращает**

    Данные для передачи в исходное событие `targetEvent`

### Возвращает (#prepend-fn-returns)

Новое событие

### Пример (#prepend-fn-example)

##### Пример использования (#prepend-fn-examples-usage)

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

## `filterMap(fn)` (#filterMap-fn)

Создает производное событие на основе данных из исходного с возможностью отмены вызова

:::info
Метод добавлен в effector 20.0.0
:::

### Формула (#filterMap-formulae)

```ts
declare const eventA: Event<T>

const eventB = eventA.filterMap(
  /*fn*/ (data: T) => S | void
)
-> Event<S>
```

При вызове исходного события `eventA`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего, если функция вернула не _undefined_, производный эвент `eventB` будет вызван с результатом вычислений

```

    eventA -> fn -> eventB

```

:::info
Если требуется только фильтрация вызовов без трансформации данных, то оптимальнее использовать [guard](/ru/api/effector/guard)
:::

### Аргументы (#filterMap-fn-arguments)

1.  **`fn`**: `(data: T) => S | void`

    Функция-обработчик, которая будет вычислять данные для передачи в производное событие `eventB` на основе данных из исходного эвента `eventA`. [Должна быть **чистой**](/ru/explanation/glossary#purity)

    **Аргументы**

    - **`data`**: Данные с которыми сработало исходное событие `eventA`

    **Возвращает**

    Данные для передачи в производное событие `eventB` либо _undefined_, если вызов `eventB` не требуется

### Возвращает (#filterMap-fn-returns)

Новое, производное событие

### Пример (#filterMap-fn-example)

#### Использование с методами JavaScript возвращающими undefined (#filterMap-fn-example-usage-with-functions-returning-undefined)

```jsx
const listReceived = createEvent<string[]>()
const effectorFound = listReceived.filterMap(list => list.find(name => name === 'effector'))

effectorFound.watch(name => console.info("found", name))
listReceived(["redux", "effector", "mobx"]) // found effector
listReceived(["redux", "mobx"])
```

[Запустить пример](https://share.effector.dev/ARDanMAM)

#### Использование c nullable React ref (#filterMap-fn-example-usage-with-nullable-ref)

:::info
Методы _modal.showModal_ и _modal.close_ – стандартные возможности dom-элемента `<dialog>`

[Статья в MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) про _showModal_
:::

```jsx
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

[Запустить пример](https://share.effector.dev/OzA9AbpY)

## `filter({fn})` (#filter-fn)

Создает производное событие с возможностью отмены вызова

:::tip
Более гибким способом фильтрации является [sample](/ru/api/effector/sample), рекомендуется использовать именно его.
:::

### Формула (#filter-fn-formulae)

```ts
declare const eventA: Event<T>

const eventB = eventA.filter(/*config*/ {fn: (data: T) => boolean})
-> Event<T>
```

При вызове исходного события `eventA`, функция-обработчик `fn` будет вызвана с поступившими данными, после чего, если функция вернула [истинное значение](https://developer.mozilla.org/ru/docs/Glossary/Truthy), производный эвент `eventB` будет вызван с теми же данными

### Аргументы (#filter-fn-arguments)

1. **`config`**: Объект конфигурации

   - **`fn`**: `(data: T) => boolean`

     Функция-предикат, которая определяет необходимость вызова производного события `eventB` возвращая [истинное значение](https://developer.mozilla.org/ru/docs/Glossary/Truthy),[должна быть **чистой**](/ru/explanation/glossary#purity)

### Возвращает (#filter-fn-returns)

Новое, производное событие

:::info
Объектная форма аргумента используется потому что _event.filter(fn)_ был сокращённой формой [_filterMap_](#filterMap)
:::

### Пример (#filter-fn-example)

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

[Запустить пример](https://share.effector.dev/NjKNAxmz)


## `watch(watcher)` (#watch-watcher)

Вызывает функцию с сайд-эффектами при каждом срабатывании события

:::info
По мере усложнения логики проекта оптимальнее заменить на комбинацию [эффекта](/ru/api/effector/Effect) и [sample](/ru/api/effector/sample)
:::

### Формула (#watch-watcher-formulae)

```ts
declare const event: Event<T>

event.watch(/*watcher*/ (data: T) => any)
-> Subscription
```

### Аргументы (#watch-watcher-arguments)

1. **`watcher`**: `(data: T) => any`

   Функция с сайд-эффектами, в качестве первого аргумента получает значение с которым было вызвано событие. Возвращаемое значение не используется

### Возвращает (#watch-watcher-returns)

[_Subscription_](/ru/explanation/glossary#subscription): Функция отмены подписки, после её вызова `watcher` перестаёт получать обновления и удаляется из памяти. Повторные вызовы функции отмены подписки не делают ничего

### Пример (#watch-watcher-example)

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

[Запустить пример](https://share.effector.dev/FeEWVUbj)

# Свойства (#properties)

## `shortName` (#shortName)

Имя события. Задаётся либо явно, через поле `name` [в createEvent](/ru/api/effector/createEvent), либо автоматически через [Babel plugin](/ru/api/effector/babel-plugin). Используется для обработки сущностей программно, например при использовании [хуков домена](/ru/api/effector/Domain#onCreateEvent)

### Формула (#shortName-formulae)

```ts
declare const event: Event<any>

event.shortName
-> string
```

## `sid` (#sid)

Стабильный идентификатор события. Задаётся автоматически через [Babel plugin](/ru/api/effector/babel-plugin)

### Формула (#sid-formulae)

```ts
declare const event: Event<any>

event.sid
-> string | null
```
