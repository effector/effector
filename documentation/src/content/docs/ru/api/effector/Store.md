---
title: Store
description: Store, его методы и свойства
lang: ru
---

_Store (стор)_ – это объект, который хранит значение состояния, то есть какие-либо данные. Стор обновляется при получении значения, которое не равно (`!==`) текущему и `undefined`. Является [юнитом](/ru/explanation/glossary#common-unit)

<br />
<br />

# Методы (#methods)

## `map(fn)` (#map-fn)

Создает производный стор на основе данных из исходного

### Формула (#map-fn-formulae)

```ts
declare const $first: Store<T>; // исходный стор

let $second: Store<S>; // производный стор

$second = $first.map(/*fn*/ (state: T) => S);
```

При обновлении исходного стора `$first`, функция-обработчик `fn` будет вызвана с новым состоянием `$first` и последним состоянием `$second`, результат вычислений будет сохранён в производном сторе `$second`, то есть реактивно обновит его значение

:::info
С версии [effector 21.8.0](https://github.com/effector/effector/releases/tag/effector%4021.8.0) второй аргумент функции `fn` и `firstState` были депрекейтнуты, вместо этого используйте [updateFilter](/ru/api/effector/createStore) или создание нового стора с помощью `createStore`.
:::

### Аргументы (#map-fn-arguments)

1.  **`fn`**: `(state: T) => S`

    Функция-обработчик, которая будет вычислять новое состояние производного стора `$second` на основе значения исходного стора `$first`. Функция также генерирует и исходное состояние стора, поэтому в первый раз запускается в момент вызова `.map`, то есть ещё до создания производного стора. [Должна быть **чистой**](/ru/explanation/glossary#purity)

    **Аргументы**

    - **`state`**: Текущее состояние исходного стора `$first` на момент начала работы `fn`

    **Возвращает**

    Новое значение для хранения в производном сторе `$second`. Если функция возвращает undefined или текущее состояние производного стора, то обновления не будет

### Возвращает (#map-fn-returns)

Новый, производный стор

### Пример (#map-fn-example)

```js
import { createEvent, createStore } from "effector";

const changed = createEvent();
const title = createStore("").on(changed, (_, newTitle) => newTitle);
const length = title.map((title) => title.length);

length.watch((length) => {
  console.log("длина строки", length);
});
// => длина строки 0

changed("hello");
// => длина строки 5

changed("world");
// ничего не произошло

changed("hello world");
// => длина строки 11
```

[Запустить пример](https://share.effector.dev/NmQAHZny)

## `on(trigger, reducer)` (#on-trigger-reducer)

Обновляет состояние стора с помощью функции-обработчика при срабатывании триггера

### Формула (#on-trigger-reducer-formulae)

```ts
declare const $store: Store<T>; // обновляемый стор

declare const event: Event<S>; // триггер обновления
declare const fx: Effect<S, any>; // триггер обновления
declare const $storeB: Store<S>; // триггер обновления

$store.on(/*clock*/ event, /*fn*/ (state: T, data: S) => T);
$store.on(/*clock*/ fx, /*fn*/ (state: T, data: S) => T);
$store.on(/*clock*/ $storeB, /*fn*/ (state: T, data: S) => T);
$store.on(/*clock*/ [event, fx, $storeB], /*fn*/ (state: T, data: S) => T);
```

### Аргументы (#on-trigger-reducer-arguments)

1. **`trigger`**: [Юнит](/ru/explanation/glossary#common-unit) или массив юнитов

   Триггер начала вычисления или несколько триггеров. Для каждого триггера последний установленный обработчик будет заменять предыдущие обработчики (полезно для динамического поведения)

   **Разновидности**:

   - **событие или эффект**: срабатывание этого события/эффекта будет запускать обновление `$store`
   - **стор**: обновление этого стора будет запускать обновление `$store`
   - **массив юнитов**: срабатывание любого из юнитов будет запускать обновление `$store`

2. **`reducer`**: `(state: T, data: S) => T`

   Функция-обработчик, которая будет вычислять новое состояние `$store` на основе его предыдущего состояния и данных из `trigger`, [должна быть **чистой**](/ru/explanation/glossary#purity)

   **Аргументы**

   - **`state`**: Текущее состояние стора на момент начала работы `fn`
   - **`data`**: Данные, принятые от сработавшего `trigger`

     **Разновидности**, в зависимости от типа сработавшего `trigger`:

     - **событие**: значение, с которым было вызвано событие
     - **эффект**: значение, с которым был вызван эффект
     - **стор**: новое значение стора

   **Возвращает**

   Новое значение для хранения в `$store`. Если функция возвращает undefined или текущее состояние стора, то обновления не будет

### Возвращает (#on-trigger-reducer-returns)

Текущий стор

:::info
Поддержка массивов в `trigger` добавлена в effector 20.15.0
:::

### Пример (#on-trigger-reducer-example)

```js
import { createEvent, createStore } from "effector";

const store = createStore(0);
const trigger = createEvent();

store.on(trigger, (state, data) => state + data);

store.watch((value) => {
  console.log(value);
});
// => 0

trigger(2);
// => 2

trigger(2);
// => 4
```

[Запустить пример](https://share.effector.dev/HLeTYPlO)

##### Использование массива юнитов в `trigger` (#on-trigger-reducer-example-trigger-array)

```js
import { createEvent, createStore } from "effector";

const store = createStore(0);
const triggerA = createEvent();
const triggerB = createEvent();

store.on([triggerA, triggerB], (state, data) => state + data);

store.watch((value) => {
  console.log(value);
});
// => 0

triggerA(2);
// => 2

triggerB(2);
// => 4
```

[Запустить пример](https://share.effector.dev/KDmGet6T)

## `watch(watcher)` (#watch-watcher)

Вызывает функцию с сайд-эффектами при каждом обновлении стора. В первый раз вызывается сразу же при создании, с текущим значением стора

:::info
По мере усложнения логики проекта оптимальнее заменить на комбинацию [эффекта](/ru/api/effector/Effect) и [sample](/ru/api/effector/sample)
:::

### Формула (#watch-watcher-formulae)

```ts
declare const $store: Store<T>

$store.watch(/*watcher*/ (state: T) => any)
-> Subscription
```

### Аргументы (#watch-watcher-arguments)

- **`watcher`**: `(state: T) => any`

  Функция с сайд-эффектами, получает текущее состояние стора в качестве первого аргумента. Возвращаемое значение не используется

### Возвращает (#watch-watcher-returns)

[_Subscription_](/ru/explanation/glossary#subscription): Функция отмены подписки, после её вызова `watcher` перестаёт получать обновления и удаляется из памяти. Повторные вызовы функции отмены подписки не делают ничего

### Пример (#watch-watcher-example)

```js
const add = createEvent();
const store = createStore(0).on(add, (state, payload) => state + payload);

store.watch((value) => {
  console.log(`текущее значение: ${value}`);
});
// => текущее значение: 0

add(4);
// => текущее значение: 4

add(3);
// => текущее значение: 7
```

[Запустить пример](https://share.effector.dev/AJzyxwnx)

## `reset(...triggers)` (#reset-triggers)

Сбрасывает состояние стора к [исходному значению](#defaultState) при срабатывании триггера

### Формула (#reset-triggers-formulae)

```ts
declare const $store: Store<T>; // обновляемый стор

declare const event: Event<any>; // триггер обновления
declare const fx: Effect<any, any>; // триггер обновления
declare const $storeB: Store<any>; // триггер обновления

$store.reset(/*clock*/ event);
$store.reset(/*clock*/ fx);
$store.reset(/*clock*/ $storeB);
$store.reset(/*clock*/ [event, fx, $storeB]);
$store.reset(/*clock*/ ...[event, fx, $storeB]);
```

### Аргументы (#reset-triggers-arguments)

- **`trigger`**: [Юнит](/ru/explanation/glossary#common-unit) или массив юнитов

  Триггер запуска обновления стора или несколько триггеров. Если на момент срабатывания стор уже находится в исходном состоянии, то обновления не будет

  **Разновидности**:

  - **событие или эффект**: срабатывание этого события/эффекта будет запускать обновление `$store`
  - **стор**: обновление этого стора будет запускать обновление `$store`
  - **массив юнитов**: срабатывание любого из юнитов будет запускать обновление `$store`

### Возвращает (#reset-triggers-returns)

Текущий стор

:::info
Поддержка массивов в `trigger` добавлена в effector 20.15.0
:::

### Пример (#reset-triggers-example)

```js
import { createEvent, createStore } from "effector";

const store = createStore(0);
const increment = createEvent();
const resetTrigger = createEvent();

store.on(increment, (state) => state + 1);
store.reset(resetTrigger);

store.watch((state) => {
  console.log(state);
});
// => 0

increment();
// => 1

increment();
// => 2

resetTrigger();
// => 0

resetTrigger();
// ничего не произошло (стор уже находится в исходном состоянии)
```

[Запустить пример](https://share.effector.dev/Ms4nlZiJ)

##### Использование массива юнитов в `trigger` (#reset-triggers-example-triggers-array)

```js
import { createEvent, createStore } from "effector";

const store = createStore(0);
const increment = createEvent();
const triggerA = createEvent();
const triggerB = createEvent();

store.on(increment, (state) => state + 1);
store.reset([triggerA, triggerB]);

store.watch((state) => {
  console.log(state);
});
// => 0

increment();
// => 1

increment();
// => 2

triggerA();
// => 0

triggerB();
// ничего не произошло (стор уже находится в исходном состоянии)
```

[Запустить пример](https://share.effector.dev/4pJEOFiM)

## `off(trigger)` (#off-trigger)

Удаляет обработчик для данного триггера, который был установлен через [.on](#on) или [.reset](#reset). Если для данного триггера не было обработчика, этот метод ничего не делает

```ts
declare const $store: Store<any>; // обновляемый стор

declare const event: Event<any>; // триггер обновления
declare const fx: Effect<any, any>; // триггер обновления
declare const $storeB: Store<any>; // триггер обновления

$store.off(/*clock*/ event);
$store.off(/*clock*/ fx);
$store.off(/*clock*/ $storeB);
```

### Аргументы (#off-trigger-arguments)

- **`trigger`**: [Юнит](/ru/explanation/glossary#common-unit)-триггер

### Возвращает (#off-trigger-returns)

Текущий стор

### Пример (#off-trigger-example)

```js
import { createEvent, createStore } from "effector";

const click = createEvent();
const $clicks = createStore(0);

$clicks.on(click, (n) => n + 1);

$clicks.watch((n) => {
  console.log(n);
});
// => 0

click();
// => 1

$clicks.off(click);

click();
// ничего не произошло
```

[Запустить пример](https://share.effector.dev/FeMrtQn3)

## `thru(fn)` (#thru-fn)

Вызывает функцию с заданным стором и возвращает результат как есть. Используется для последовательных трансформаций заранее описанными функциями пока в javascript не добавлен [pipeline proposal](https://github.com/tc39/proposal-pipeline-operator)

### Формула (#thru-fn-formulae)

```ts
declare const $store: Store<T>;

const result: S = $store.thru(/*fn*/ (store: Store<T>) => S);
```

### Аргументы (#thru-fn-arguments)

- **`fn`**: `(store: Store<T>) => S`

  Функция, которая получает сам стор в аргументы и возвращает некоторое значение, [должна быть **чистой**](/ru/explanation/glossary#purity)

### Возвращает (#thru-fn-returns)

Любое значение, которое вернёт `fn`

### Пример (#thru-fn-example)

```js
import { createStore, createEvent } from "effector";

const enhance = (fn) => (store) => store.map(fn);

const inc = createEvent();
const $num = createStore(1);

$num.on(inc, (n) => n + 1);

//prettier-ignore
const $result = $num
  .thru(enhance(x => x + 1))
  .thru(enhance(x => x * 10))

$num.watch((n) => {
  console.log("num", n);
});
// => num 1

$result.watch((n) => {
  console.log("result", n);
});
// => result 20

inc();
// => num 2
// => result 30
```

[Запустить пример](https://share.effector.dev/RRSyqVus)

# Свойства (#properties)

## `updates` (#updates)

Дочернее событие стора, будет вызвано при каждом обновлении стора. Используется только для определения сайд-эффектов через _store.updates.watch_, где будут срабатывать начиная с первого обновления, в отличие от [_store.watch_](#watch), обработчики в котором запускаются при создании немедленно

:::warning{title="Вызов вручную запрещён"}
Это свойство управляется самим стором.
:::

:::info
По мере усложнения логики проекта оптимальнее заменить на комбинацию эффекта и [sample](/ru/api/effector/sample)
:::

### Формула (#updates-formulae)

```ts
declare const $store: Store<T>

$store.updates
-> Event<T>
```

### Пример (#updates-example)

##### Вызов сайд-эффектов начиная с первого обновления (#updates-skip-init-example)

```js
import { createStore, createEvent } from "effector";

const click = createEvent();
const clicksAmount = createStore(0);

clicksAmount.on(click, (n) => n + 1);

clicksAmount.watch((amount) => {
  console.log("вызов с текущим состоянием, включая исходное", amount);
});

// => вызов с текущим состоянием, включая исходное 0

clicksAmount.updates.watch((amount) => {
  console.log("вызов с текущим состоянием, начиная с первого обновления", amount);
});

// ничего не произошло

click();
// => вызов с текущим состоянием, включая исходное 1
// => вызов с текущим состоянием, начиная с первого обновления 1
```

[Запустить пример](https://share.effector.dev/X6E8sJqo)

## `shortName` (#shortName)

Имя стора. Задаётся либо явно, через поле `name` в [createStore](/ru/api/effector/createStore), либо автоматически через [Babel plugin](/ru/api/effector/babel-plugin). Используется для обработки сущностей программно, например при использовании [хуков домена](/ru/api/effector/Domain#onCreateStore)

### Формула (#shortName-formulae)

```ts
declare const $store: Store<any>

$store.shortName
-> string
```

### Пример (#shortName-example)

```js
import { createDomain, createEvent } from "effector";

const increment = createEvent();

const storesDomain = createDomain();

storesDomain.onCreateStore((store) => {
  console.log(`создан стор '${store.shortName}'`);
  store.watch((value) => {
    console.log(`значение стора '${store.shortName}':`, value);
  });
});

const $foo = storesDomain.createStore(0, { name: "foo" });
// => создан стор 'foo'
// => значение стора 'foo': 0
const $bar = storesDomain.createStore(0, { name: "bar" });
// => создан стор 'bar'
// => значение стора 'bar': 0
$foo.on(increment, (n) => n + 1);

increment();
// => значение стора 'foo': 1
```

[Запустить пример](https://share.effector.dev/CspgMvEI)

## `defaultState` (#defaultState)

Начальное состояние стора, то, с которым он создавался. К этому состоянию будет возвращать метод [reset](#reset-triggers)

### Формула (#defaultState-formulae)

```ts
declare const $store: Store<T>

$store.defaultState
-> T
```

### Пример (#defaultState-example)

```ts
const $store = createStore("DEFAULT");

console.log($store.defaultState === "DEFAULT");
// => true
```

## `sid` (#sid)

Стабильный идентификатор стора. Задаётся автоматически через [Babel plugin](/ru/api/effector/babel-plugin)

### Формула (#sid-formulae)

```ts
declare const $store: Store<any>

$store.sid
-> string | null
```

# Дополнительные методы

## `getState()` (#getState)

Возвращает текущее значение стора

:::warning{title="Опасно использовать в своем коде"}

`.getState` **порождает трудноотлаживаемый императивный код и состояния гонки данных**

Оптимальнее использовать декларативные методы:

- [**sample**](/ru/api/effector/sample) для использования данных из стора в других вычислениях
- [**attach**](/ru/api/effector/attach) для передачи данных в эффекты

:::

### Формула (#getState-formulae)

```ts
declare const $store: Store<T>;

const currentValue: T = $store.getState();
```

### Пример (#getState-example)

```js
import { createEvent, createStore } from "effector";

const add = createEvent();

const $number = createStore(0);

$number.on(add, (state, data) => state + data);

$number.watch((n) => {
  console.log(n);
});
// => 0

add(2);
// => 2

add(3);
// => 5
```

[Запустить пример](https://share.effector.dev/YrnlMuRj)

## `watch(trigger, watcher)` (#watch-trigger-watcher)

Сокращённая запись для описания сайд-эффекта, который необходимо запускать только при срабатывании определённого триггера и в котором необходимо как состояние стора так и данные из триггера

:::info
По мере усложнения логики проекта оптимальнее заменить на [attach](/ru/api/effector/attach)
:::

### Формула (#watch-trigger-watcher-formulae)

```ts
declare const $store: Store<T>
declare const trigger: Event<S>

$store.watch(
  /*clock*/ trigger,
  /*fn*/ (state: T, data: S) => any,
)
-> Subscription
```

### Аргументы (#watch-trigger-watcher-arguments)

1. **`trigger`**: [Юнит](/ru/explanation/glossary#common-unit)-триггер
2. **`fn`**: `(state: T, data: S) => any`

   Функция с сайд-эффектами. Возвращаемое значение не используется

   **Аргументы**

   - **`state`**: Текущее состояние стора на момент начала работы `fn`
   - **`data`**: Данные, принятые от сработавшего `trigger`

### Возвращает (#watch-trigger-watcher-returns)

[_Subscription_](/ru/explanation/glossary#subscription): Функция отмены подписки

### Пример (#watch-trigger-watcher-example)

```js
import { createEvent, createStore } from "effector";

const foo = createEvent();
const bar = createEvent();

const store = createStore(0);

store.watch(foo, (storeValue, eventValue) => {
  console.log(`triggered ${storeValue}, ${eventValue}`);
});

foo(1);
// => triggered 0, 1

bar(2);

foo(3);
// => triggered 0, 3
```

[Запустить пример](https://share.effector.dev/xEltaFyH)
