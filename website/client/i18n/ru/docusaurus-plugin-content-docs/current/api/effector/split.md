---
id: split
title: split
hide_title: true
---

Выбирает один из случаев по заданным условиям. Он "разбивает" исходный блок на несколько событий, которые срабатывают, когда полезная нагрузка соответствует их условиям. Работает как сопоставление шаблонов для значений полезной нагрузки и внешних хранилищ

## Концепции

### Case mode

Режим, в котором целевой случай выбирается по имени его поля. Кейс может быть выбран из данных в `source` с помощью [case function](./split.md#case-function) или из внешнего [case store](./split.md#case-store), который хранит текущее имя кейса. После выбора данные из `source` будут отправлены в соответствующий `cases[fieldName]` (если таковой имеется), если ни одно из полей не совпадает, то данные будут отправлены в `cases.__` (если таковой имеется).

**Смотрите так-же**:

- [case store](./split.md#case-store)
- [case function](./split.md#case-function)

### Matching mode

Режим, в котором каждый случай последовательно сопоставляется сторами и функциями в полях объекта `match`.
Если одно из полей получило `true` от значения стора или возврата функции, то данные из `source` будут отправлены в соответствующий `cases[fieldName]` (если таковой имеется), если ни одно из полей не совпадает, то данные будут отправлены в `cases.__` (если таковой имеется).

**Смотрите так-же**:

- [matching store](./split.md#matcher-store)
- [matching function](./split.md#matcher-function)

### Case store

Хранить со строкой, которая будет использоваться для выбора случая по его имени. Размещается непосредственно в поле `match`

```ts
split({
  source: Unit<T>
  // case store
  match: Store<'first' | 'second'>,
  cases: {
    first: Unit<T>,
    second: Unit<T>,
    __?: Unit<T>
  }
})
```

### Case function

Строка-возвращающая функция, которая будет вызвана со значением из `source` для выбора случая по его имени. Размещается непосредственно в поле `match`, [должно быть **чистым**](../../glossary.md#purity)

```ts
split({
  source: Unit<T>
  // case function
  match: (value: T) => 'first' | 'second',
  cases: {
    first: Unit<T>,
    second: Unit<T>,
    __?: Unit<T>
  }
})
```

### Matcher store

Булево хранилище, указывающее, следует ли выбрать конкретный случай или попробовать следующий. Размещается в полях объекта `match`, может смешиваться с [matcher functions](./split.md#matcher-function)

```ts
split({
  source: Unit<T>
  match: {
    // matcher store
    first: Store<boolean>,
    second: Store<boolean>
  },
  cases: {
    first: Unit<T>,
    second: Unit<T>,
    __?: Unit<T>
  }
})
```

### Matcher function

Функция с булевым возвратом, указывающая, следует ли выбрать конкретный случай или попробовать следующий. Размещается в полях объекта `match`, может смешиваться с [matcher stores](./split.md#matcher-store), [должны быть **чистыми**](../../glossary.md#purity)

```ts
split({
  source: Unit<T>
  match: {
    // matcher function
    first: (value: T) => boolean,
    second: (value: T) => boolean
  },
  cases: {
    first: Unit<T>,
    second: Unit<T>,
    __?: Unit<T>
  }
})
```

:::note
Case store, case function и matcher store поддерживаются начиная с версии effector 21.8.0
:::

## split со случаями

```ts
split({source, match, cases})
```

```ts
split({
  source: Unit<T>
  // case function
  match: (data: T) => 'a' | 'b',
  cases: {
    a: Unit<T>,
    b: Unit<T>,
    __?: Unit<T>
  }
})
split({
  source: Unit<T>
  // case store
  match: Store<'a' | 'b'>,
  cases: {
    a: Unit<T>,
    b: Unit<T>,
    __?: Unit<T>
  }
})
split({
  source: Unit<T>
  match: {
    // matcher function
    a: (data: T) => boolean,
    // matcher store
    b: Store<boolean>
  },
  cases: {
    a: Unit<T>,
    b: Unit<T>,
    __?: Unit<T>
  }
})
```

**Аргументы**

- `source`: [Unit](../../glossary.md#common-unit) что вызовет вычисления в `split`.
- `match`: Single [store with string](./split.md#case-store), одна [функция, возвращающая строку](./split.md#case-function) или объект с [булевыми хранилищами](./split.md#matching-store) и [функциями, возвращающими булевое значение](./split.md#matching-function)
- `cases`: Объект с [юнитами](../../glossary.md#common-unit) куда будут передаваться данные из `source` после выбора случая

**Возвращает**

```ts
void
```

:::note Начиная с
effector 21.0.0
:::

#### Пример 1

```js
import {split, createEffect, createEvent} from 'effector'
const messageReceived = createEvent()
const showTextPopup = createEvent()
const playAudio = createEvent()
const reportUnknownMessageTypeFx = createEffect(({type}) => {
  console.log('unknown message:', type)
})

split({
  source: messageReceived,
  match: {
    text: (msg) => msg.type === 'text',
    audio: (msg) => msg.type === 'audio',
  },
  cases: {
    text: showTextPopup,
    audio: playAudio,
    __: reportUnknownMessageTypeFx,
  },
})

showTextPopup.watch(({value}) => {
  console.log('new message:', value)
})

messageReceived({
  type: 'text',
  value: 'Hello',
})
// => new message: Hello
messageReceived({
  type: 'image',
  imageUrl: '...',
})
// => unknown message: image
```

[Попробовать](https://share.effector.dev/W6VYZbfH)

#### Пример 2

Вы также можете напрямую обращаться к стору api:

```js
import {split, createStore, createEvent, createApi} from 'effector'

const messageReceived = createEvent()

const $textContent = createStore([])

split({
  source: messageReceived,
  match: {
    text: (msg) => msg.type === 'text',
    audio: (msg) => msg.type === 'audio',
  },
  cases: createApi($textContent, {
    text: (list, {value}) => [...list, value],
    audio: (list, {duration}) => [...list, `audio ${duration} ms`],
    __: (list) => [...list, 'unknown message'],
  }),
})

$textContent.watch((messages) => {
  console.log(messages)
})

messageReceived({
  type: 'text',
  value: 'Hello',
})
// => ['Hello']
messageReceived({
  type: 'image',
  imageUrl: '...',
})
// => ['Hello', 'unknown message']
messageReceived({
  type: 'audio',
  duration: 500,
})
// => ['Hello', 'unknown message', 'audio 500 ms']
```

[Попробовать](https://share.effector.dev/32FNNk8H)

## split без явных случаев

```ts
split(source, match)
```

**Аргументы**

1. `source`: [Unit](../../glossary.md#common-unit) что вызовет вычисления в `split`.
2. `match` (_Object_): Схема случаев, в которой в качестве ключей используются имена результирующих событий, а в качестве функции соответствия*((value) => Boolean)*.

**Возвращает**

(Object) - Объект, имеющий ключи, определенные в аргументе `match`, плюс `__` (два подчеркивания) - который обозначает случай `default` (нет совпадений).

:::note Начиная с
effector 20.0.0
:::

#### Пример 1

```js
import {createEvent, split} from 'effector'

const message = createEvent()

const messageByAuthor = split(message, {
  bob: ({user}) => user === 'bob',
  alice: ({user}) => user === 'alice',
})
messageByAuthor.bob.watch(({text}) => {
  console.log('[bob]: ', text)
})
messageByAuthor.alice.watch(({text}) => {
  console.log('[alice]: ', text)
})

message({user: 'bob', text: 'Hello'})
// => [bob]: Hello
message({user: 'alice', text: 'Hi bob'})
// => [alice]: Hi bob

/* default case, triggered if no one condition met */
const {__: guest} = messageByAuthor
guest.watch(({text}) => {
  console.log('[guest]: ', text)
})
message({user: 'unregistered', text: 'hi'})
// => [guest]: hi
```

[Попробовать](https://share.effector.dev/QXZsR5yM)

:::note
Только первое встреченное совпадение вызовет результирующее событие
:::

#### Пример 2

```js
import {createEvent, split} from 'effector'

const message = createEvent()

const {short, long, medium} = split(message, {
  short: (m) => m.length <= 5,
  medium: (m) => m.length > 5 && m.length <= 10,
  long: (m) => m.length > 10,
})

short.watch((m) => console.log(`short message '${m}'`))
medium.watch((m) => console.log(`medium message '${m}'`))
long.watch((m) => console.log(`long message '${m}'`))

message('Hello, Bob!')
// => long message 'Hello, Bob!'

message('Hi!')
// => short message 'Hi!'
```

[Попробовать](https://share.effector.dev/ke2tM78I)

## split с clock

:::note Начиная с
effector 22.2.0
:::

Он работает так же, как [split with cases](./split.md#split-with-cases), однако вычисления в `split` будут запущены после срабатывания `clock`.

```js
split({source, clock?, match, cases})
```

#### Пример

```js
const options = ['save', 'delete', 'forward']
const $message = createStore({id: 1, text: 'Bring me a cup of coffee, please!'})
const $mode = createStore('')
const selectedMessageOption = createEvent()
const saveMessageFx = createEffect(() => 'save')
const forwardMessageFx = createEffect(() => 'forward')
const deleteMessageFx = createEffect(() => 'delete')

$mode.on(selectedMessageOption, (_, opt) =>
  options.find((item) => item === opt),
)

split({
  source: $message,
  clock: selectedMessageOption,
  match: $mode,
  cases: {
    save: saveMessageFx,
    delete: deleteMessageFx,
    forward: forwardMessageFx,
  },
})

selectedMessageOption('delet') // nothing happens
selectedMessageOption('delete')
```

[Попробовать](https://share.effector.dev/VJmD5KdN)
