---
id: store
title: Store
keywords:
  - store
  - unit
description: Store, его методы и свойства
---

# Store

_Store (стор)_ - это объект, который хранит значение состояния, то есть какие-либо данные. Стор обновляется при получении значения, которое не равно (`!==`) текущему и `undefined`. Является [юнитом](../../glossary.md#common-unit)

## Структура

- **Методы**

  - [**map**](#map): создает производный стор на основе данных из исходного
  - [**on**](#on): обновляет состояние стора с помощью функции-обработчика при срабатывании триггера
  - [**reset**](#reset): сбрасывает состояние стора к исходному значению при срабатывании триггера
  - [**watch**](#watch): вызывает функцию с сайд-эффектами при каждом обновлении стора

- **Свойства**

  - [**updates**](#updates): дочернее событие, представляющее обновления данного стора
  - [**defaultState**](#defaultState): начальное состояние стора
  - [**shortName**](#shortName): имя стора
  - [**sid**](#sid): стабильный идентификатор стора

## Примеры {#all-examples}

- **map** - [пример использования map](#map-usage-example)

- **on**

  - [Использование события для обновления состояния](#on-event-example)
  - [Использование массива юнитов в clock](#on-array-example)

- **reset**

  - [Использование события для сброса состояния](#reset-event-example)
  - [Использование массива юнитов в clock](#reset-array-example)

- **watch** - [логгирование значения стора](#watch-logging-example)
- **updates** - [вызов сайд-эффектов начиная с первого обновления](#updates-skip-init-example)
- **shortName** - [логгирование с помощью shortName](#shortName-logging-example)

## Методы {#methods}

### map {#map}

Создает производный стор на основе данных из исходного

#### Формула {#map-formulae}

```ts
declare const $first: Store<T> // исходный стор

let $second: Store<S> // производный стор

$second = $first.map(/*fn*/ (state: T) => S)
$second = $first.map(/*fn*/ (state: T, lastState?: S) => S)
```

При обновлении исходного стора `$first`, функция-обработчик `fn` будет вызвана с новым состоянием `$first` и последним состоянием `$second`, результат вычислений будет сохранён в производном сторе `$second`, то есть реактивно обновит его значение

:::note
С версии [effector 21.8.0](https://github.com/effector/effector/releases/tag/effector%4021.8.0) второй аргумент функции `fn` и `firstState` были депрекейтнуты, вместо этого используйте [`updateFilter`](./createStore.md) или создание нового стора с помощью `createStore`.
:::

#### Аргументы {#map-args}

1.  **`fn`**: `(state: T, lastState?: S) => S`

    Функция-обработчик, которая будет вычислять новое состояние производного стора `$second` на основе значения исходного стора `$first`. Генерирует в том числе и исходное состояние стора, поэтому в первый раз запускается в момент вызова `.map`, то есть ещё до создания производного стора. [Должна быть **чистой**](../../glossary.md#purity)

    **Аргументы**

    - **`state`**: Текущее состояние исходного стора `$first` на момент начала работы `fn`
    - **`lastState?`**: Текущее состояние производного стора `$second` на момент начала работы `fn`. Не существует при первом вызове `fn`

    **Возвращает**

    Новое значение для хранения в производном сторе `$second`. Если функция возвращает undefined или текущее состояние производного стора, то обновления не будет

#### Возвращает {#map-return}

Новый, производный стор

#### Примеры {#map-examples}

##### Пример использования map {#map-usage-example}

```js
import {createEvent, createStore} from 'effector'

const changed = createEvent()
const title = createStore('').on(changed, (_, newTitle) => newTitle)
const length = title.map((title) => title.length)

length.watch((length) => {
  console.log('длина строки', length)
})
// => длина строки 0

changed('hello')
// => длина строки 5

changed('world')
// ничего не произошло

changed('hello world')
// => длина строки 11
```

[Запустить пример](https://share.effector.dev/NmQAHZny)

### on {#on}

Обновляет состояние стора с помощью функции-обработчика при срабатывании триггера

#### Формула {#on-formulae}

```ts
declare const $store: Store<T> // обновляемый стор

declare const event: Event<S> // триггер обновления
declare const fx: Effect<S, any> // триггер обновления
declare const $storeB: Store<S> // триггер обновления

$store.on(/*clock*/ event, /*fn*/ (state: T, data: S) => T)
$store.on(/*clock*/ fx, /*fn*/ (state: T, data: S) => T)
$store.on(/*clock*/ $storeB, /*fn*/ (state: T, data: S) => T)
$store.on(/*clock*/ [event, fx, $storeB], /*fn*/ (state: T, data: S) => T)
```

#### Аргументы {#on-args}

1. **`clock`**: [Юнит](../../glossary.md#common-unit) или массив юнитов

   Триггер начала вычисления или несколько триггеров. Для каждого триггера последний установленный обработчик будет заменять предыдущие обработчики (полезно для динамического поведения)

   **Разновидности**:

   - **событие или эффект**: срабатывание этого события/эффекта будет запускать обновление `$store`
   - **стор**: обновление этого стора будет запускать обновление `$store`
   - **массив юнитов**: срабатывание любого из юнитов будет запускать обновление `$store`

2. **`fn`**: `(state: T, data: S) => T`

   Функция-обработчик, которая будет вычислять новое состояние `$store` на основе его предыдущего состояния и данных из `clock`, [должна быть **чистой**](../../glossary.md#purity)

   **Аргументы**

   - **`state`**: Текущее состояние стора на момент начала работы `fn`
   - **`data`**: Данные, принятые от сработавшего `clock`

     **Разновидности**, в зависимости от типа сработавшего `clock`:

     - **событие**: значение, с которым было вызвано событие
     - **эффект**: значение, с которым был вызван эффект
     - **стор**: новое значение стора

   **Возвращает**

   Новое значение для хранения в `$store`. Если функция возвращает undefined или текущее состояние стора, то обновления не будет

#### Возвращает {#on-return}

Текущий стор

:::note
Поддержка массивов в `clock` добавлена в effector 20.15.0
:::

#### Примеры {#on-examples}

##### Использование события для обновления состояния {#on-event-example}

```js
import {createEvent, createStore} from 'effector'

const store = createStore(0)
const trigger = createEvent()

store.on(trigger, (state, data) => state + data)

store.watch((value) => {
  console.log(value)
})
// => 0

trigger(2)
// => 2

trigger(2)
// => 4
```

[Запустить пример](https://share.effector.dev/HLeTYPlO)

##### Использование массива юнитов в clock {#on-array-example}

```js
import {createEvent, createStore} from 'effector'

const store = createStore(0)
const triggerA = createEvent()
const triggerB = createEvent()

store.on([triggerA, triggerB], (state, data) => state + data)

store.watch((value) => {
  console.log(value)
})
// => 0

triggerA(2)
// => 2

triggerB(2)
// => 4
```

[Запустить пример](https://share.effector.dev/KDmGet6T)

### reset

Сбрасывает состояние стора к [исходному значению](#defaultState) при срабатывании триггера

#### Формула {#reset-formulae}

```ts
declare const $store: Store<T> // обновляемый стор

declare const event: Event<any> // триггер обновления
declare const fx: Effect<any, any> // триггер обновления
declare const $storeB: Store<any> // триггер обновления

$store.reset(/*clock*/ event)
$store.reset(/*clock*/ fx)
$store.reset(/*clock*/ $storeB)
$store.reset(/*clock*/ [event, fx, $storeB])
$store.reset(/*clock*/ ...[event, fx, $storeB])
```

#### Аргументы {#reset-args}

- **`clock`**: [Юнит](../../glossary.md#common-unit) или массив юнитов

  Триггер запуска обновления стора или несколько триггеров. Если на момент срабатывания стор уже находится в исходном состоянии, то обновления не будет

  **Разновидности**:

  - **событие или эффект**: срабатывание этого события/эффекта будет запускать обновление `$store`
  - **стор**: обновление этого стора будет запускать обновление `$store`
  - **массив юнитов**: срабатывание любого из юнитов будет запускать обновление `$store`

#### Возвращает {#reset-return}

Текущий стор

:::note
Поддержка массивов в `clock` добавлена в effector 20.15.0
:::

#### Примеры {#reset-examples}

##### Использование события для сброса состояния {#reset-event-example}

```js
import {createEvent, createStore} from 'effector'

const store = createStore(0)
const increment = createEvent()
const resetTrigger = createEvent()

store.on(increment, (state) => state + 1)
store.reset(resetTrigger)

store.watch((state) => {
  console.log(state)
})
// => 0

increment()
// => 1

increment()
// => 2

resetTrigger()
// => 0

resetTrigger()
// ничего не произошло (стор уже находится в исходном состоянии)
```

[Запустить пример](https://share.effector.dev/Ms4nlZiJ)

##### Использование массива юнитов в clock {#reset-array-example}

```js
import {createEvent, createStore} from 'effector'

const store = createStore(0)
const increment = createEvent()
const triggerA = createEvent()
const triggerB = createEvent()

store.on(increment, (state) => state + 1)
store.reset([triggerA, triggerB])

store.watch((state) => {
  console.log(state)
})
// => 0

increment()
// => 1

increment()
// => 2

triggerA()
// => 0

triggerB()
// ничего не произошло (стор уже находится в исходном состоянии)
```

[Запустить пример](https://share.effector.dev/4pJEOFiM)

### watch {#watch}

Вызывает функцию с сайд-эффектами при каждом обновлении стора. В первый раз вызывается сразу же при создании, с текущим значением стора

:::note
По мере усложнения логики проекта оптимальнее заменить на комбинацию [эффекта](./Effect.md) и [сэмпла](./sample.md)
:::

#### Формула {#watch-formulae}

```ts
declare const $store: Store<T>

$store.watch(/*watcher*/ (state: T) => any)
-> Subscription
```

#### Аргументы {#watch-args}

- **`watcher`**: `(state: T) => any`

  Функция с сайд-эффектами, получает текущее состояние стора в качестве первого аргумента. Возвращаемое значение не используется

#### Возвращает {#watch-return}

[_Subscription_](../../glossary.md#subscription): Функция отмены подписки, после её вызова `watcher` перестаёт получать обновления и удаляется из памяти. Повторные вызовы функции отмены подписки не делают ничего

#### Примеры {#watch-examples}

##### Логгирование значения стора {#watch-logging-example}

```js
const add = createEvent()
const store = createStore(0).on(add, (state, payload) => state + payload)

store.watch((value) => {
  console.log(`текущее значение: ${value}`)
})
// => текущее значение: 0

add(4)
// => текущее значение: 4

add(3)
// => текущее значение: 7
```

[Запустить пример](https://share.effector.dev/AJzyxwnx)

<hr />

## Свойства {#properties}

### updates {#updates}

Дочернее событие стора, будет вызвано при каждом обновлении стора. Используется только для определения сайд-эффектов через _store.updates.watch_, где будут срабатывать начиная с первого обновления, в отличии от [_store.watch_](#watch), обработчики в котором запускаются при создании немедленно

:::caution Вызов вручную запрещён
Это свойство управляется самим стором.
:::

:::note
По мере усложнения логики проекта оптимальнее заменить на комбинацию эффекта и [сэмпла](./sample.md)
:::

#### Формула {#updates-formulae}

```ts
declare const $store: Store<T>

$store.updates
-> Event<T>
```

#### Примеры {#updates-examples}

##### Вызов сайд-эффектов начиная с первого обновления {#updates-skip-init-example}

```js
import {createStore, createEvent} from 'effector'

const click = createEvent()
const clicksAmount = createStore(0)

clicksAmount.on(click, (n) => n + 1)

clicksAmount.watch((amount) => {
  console.log('вызов с текущим состоянием, включая исходное', amount)
})

// => вызов с текущим состоянием, включая исходное 0

clicksAmount.updates.watch((amount) => {
  console.log(
    'вызов с текущим состоянием, начиная с первого обновления',
    amount,
  )
})

// ничего не произошло

click()
// => вызов с текущим состоянием, включая исходное 1
// => вызов с текущим состоянием, начиная с первого обновления 1
```

[Запустить пример](https://share.effector.dev/X6E8sJqo)

### shortName {#shortName}

Имя стора. Задаётся либо явно, через поле [`name` в createStore](./createStore.md), либо автоматически через [babel plugin](./babel-plugin.md). Используется для обработки сущностей программно, например при использовании [хуков домена](./Domain.md#onCreateStore)

#### Формула {#shortName-formulae}

```ts
declare const $store: Store<any>

$store.shortName
-> string
```

#### Примеры {#shortName-examples}

##### Логгирование с помощью shortName {#shortName-logging-example}

```js
import {createDomain, createEvent} from 'effector'

const increment = createEvent()

const storesDomain = createDomain()

storesDomain.onCreateStore((store) => {
  console.log(`создан стор '${store.shortName}'`)
  store.watch((value) => {
    console.log(`значение стора '${store.shortName}':`, value)
  })
})

const $foo = storesDomain.createStore(0, {name: 'foo'})
// => создан стор 'foo'
// => значение стора 'foo': 0
const $bar = storesDomain.createStore(0, {name: 'bar'})
// => создан стор 'bar'
// => значение стора 'bar': 0
$foo.on(increment, (n) => n + 1)

increment()
// => значение стора 'foo': 1
```

[Запустить пример](https://share.effector.dev/CspgMvEI)

### defaultState {#defaultState}

Начальное состояние стора, то, с которым он создавался. К этому состоянию будет возвращать метод [reset](./#reset)

#### Формула {#defaultState-formulae}

```ts
declare const $store: Store<T>

$store.defaultState
-> T
```

#### Примеры {#defaultState-examples}

##### Пример использования defaultState {#defaultState-usage-example}

```ts
const $store = createStore('DEFAULT')

console.log($store.defaultState === 'DEFAULT')
// => true
```

### sid {#sid}

Стабильный идентификатор стора. Задаётся автоматически через [babel-plugin](./babel-plugin.md)

#### Формула {#sid-formulae}

```ts
declare const $store: Store<any>

$store.sid
-> string | null
```

<hr />

## Дополнительные методы

### getState {#getState}

Возвращает текущее значение стора

:::caution getState порождает трудноотлаживаемый императивный код и состояния гонки данных

Оптимальнее использовать декларативные методы:

- [**sample**](sample.md) для использования данных из стора в других вычислениях
- [**attach**](attach.md) для передачи данных в эффекты

:::

#### Формула {#getState-formulae}

```ts
declare const $store: Store<T>

const currentValue: T = $store.getState()
```

#### Примеры {#getState-examples}

##### Пример использования getState {#getState-usage-example}

```js
import {createEvent, createStore} from 'effector'

const add = createEvent()

const $number = createStore(0)

$number.on(add, (state, data) => state + data)

$number.watch((n) => {
  console.log(n)
})
// => 0

add(2)
// => 2

add(3)
// => 5
```

[Запустить пример](https://share.effector.dev/YrnlMuRj)

### clock watch {#clock-watch}

Сокращённая запись для описания сайд-эффекта, который необходимо запускать только при срабатывании определённого триггера и в котором необходимо как состояние стора так и данные из триггера

:::note
По мере усложнения логики проекта оптимальнее заменить на [attach](./attach.md)
:::

#### Формула {#clock-watch-formulae}

```ts
declare const $store: Store<T>
declare const trigger: Event<S>

$store.watch(
  /*clock*/ trigger,
  /*fn*/ (state: T, data: S) => any,
)
-> Subscription
```

#### Аргументы {#clock-watch-args}

1. **`clock`**: [Юнит](../../glossary.md#common-unit)-триггер
2. **`fn`**: `(state: T, data: S) => any`

   Функция с сайд-эффектами. Возвращаемое значение не используется

   **Аргументы**

   - **`state`**: Текущее состояние стора на момент начала работы `fn`
   - **`data`**: Данные, принятые от сработавшего `clock`

#### Возвращает {#clock-watch-return}

[_Subscription_](../../glossary.md#subscription): Функция отмены подписки

#### Примеры {#clock-watch-examples}

##### Пример использования {#clock-watch-usage-example}

```js
import {createEvent, createStore} from 'effector'

const foo = createEvent()
const bar = createEvent()

const store = createStore(0)

store.watch(foo, (storeValue, eventValue) => {
  console.log(`triggered ${storeValue}, ${eventValue}`)
})

foo(1)
// => triggered 0, 1

bar(2)

foo(3)
// => triggered 0, 3
```

[Запустить пример](https://share.effector.dev/xEltaFyH)

### off {#off}

Удаляет обработчик для данного триггера, который был установлен через [.on](#on) или [.reset](#reset). Если для данного триггера не было обработчика, этот метод ничего не делает

```ts
declare const $store: Store<any> // обновляемый стор

declare const event: Event<any> // триггер обновления
declare const fx: Effect<any, any> // триггер обновления
declare const $storeB: Store<any> // триггер обновления

$store.off(/*clock*/ event)
$store.off(/*clock*/ fx)
$store.off(/*clock*/ $storeB)
```

#### Аргументы {#off-args}

- **`clock`**: [Юнит](../../glossary.md#common-unit)-триггер

#### Возвращает {#off-return}

Текущий стор

#### Примеры {#off-examples}

##### Пример использования off {#off-usage-example}

```js
import {createEvent, createStore} from 'effector'

const click = createEvent()
const $clicks = createStore(0)

$clicks.on(click, (n) => n + 1)

$clicks.watch((n) => {
  console.log(n)
})
// => 0

click()
// => 1

$clicks.off(click)

click()
// ничего не произошло
```

[Запустить пример](https://share.effector.dev/FeMrtQn3)

### thru {#thru}

Вызывает функцию с заданным стором и возвращает результат как есть. Используется для последовательных трансформаций заранее описанными функциями пока в javascript не добавлен [pipeline proposal](https://github.com/tc39/proposal-pipeline-operator)

#### Формула {#thru-formulae}

```ts
declare const $store: Store<T>

const result: S = $store.thru(/*fn*/ (store: Store<T>) => S)
```

#### Аргументы {#thru-args}

- **`fn`**: `(store: Store<T>) => S`

  Функция, которая получает сам стор в аргументы и возвращает некоторое значение, [должна быть **чистой**](../../glossary.md#purity)

#### Возвращает {#thru-return}

Любое значение, которое вернёт `fn`

#### Примеры {#thru-examples}

##### Пример использования thru {#thru-usage-example}

```js
import {createStore, createEvent} from 'effector'

const enhance = (fn) => (store) => store.map(fn)

const inc = createEvent()
const $num = createStore(1)

$num.on(inc, (n) => n + 1)

//prettier-ignore
const $result = $num
  .thru(enhance(x => x + 1))
  .thru(enhance(x => x * 10))

$num.watch((n) => {
  console.log('num', n)
})
// => num 1

$result.watch((n) => {
  console.log('result', n)
})
// => result 20

inc()
// => num 2
// => result 30
```

[Запустить пример](https://share.effector.dev/RRSyqVus)
