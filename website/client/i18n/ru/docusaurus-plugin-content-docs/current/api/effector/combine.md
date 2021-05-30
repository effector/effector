---
id: combine
title: combine
---

# combine

Этот метод позволяет получить состояние из каждого переданного сторов и комбинировать их в одно значение, сохраняя в новом производном сторе.
Полученный стор будет обновляться каждый раз, как обновляется любой из переданных сторов

Если несколько сторов обновятся одновременно, то метод обработает их всех разом, то есть `combine` батчит обновления, что приводит к более эффективной работе без излишних вычислений

## Общая формула

```ts
declare const a: Store<A>
declare const b: Store<B>

$c = combine({a, b})
> Store<{a: A; b: B}>

$c = combine([a, b])
> Store<[A, B]>


$c = combine({a, b}, (values: {a: A; b: B}) => C)
> Store<C>

$c = combine([a, b], (values: [A, B]) => C)
> Store<C>

$c = combine(a, b, (a: A, b: B) => C)
> Store<C>
```

## Сочетание состояний

### _combine( { a, b } )_ {#combine-shape}

Комбинирует объект сторов в стор с объектом значений

#### Формула {#combine-shape-formulae}

```ts
declare const a: Store<A>
declare const b: Store<B>

$c = combine(/*shape*/ {a, b})
> Store<{a: A; b: B}>
```

#### Аргументы {#combine-shape-args}

- **`shape`**: Объект сторов

  Обновление любого из сторов означает изменение значения соответствующего поля в производном сторе <br/>
  Количество сторов не ограничено

#### Возвращает

Новый, производный стор

### _combine( \[ a, b \] )_ {#combine-list}

Комбинирует массив сторов в стор с массивом значений

#### Формула {#combine-list-formulae}

```ts
declare const a: Store<A>
declare const b: Store<B>

$c = combine(/*shape*/ [a, b])
> Store<[A, B]>
```

#### Аргументы {#combine-list-args}

- **`shape`**: Массив сторов

  Обновление любого из сторов означает изменение значения соответствующего элемента в производном сторе, <br/>
  количество сторов не ограничено

#### Возвращает {#combine-list-return}

Новый, производный стор

## Трансформация состояний

### _combine( { a, b }, ({ a, b }) => result )_ {#transform-shape}

Трансформирует объект сторов через функцию, принимающую объект значений

#### Формула {#transform-shape-formulae}

```ts
declare const a: Store<A>
declare const b: Store<B>

$c = combine(
  /*shape*/ {a, b},
  /*fn*/ (values: {a: A; b: B}) => C
)
> Store<C>
```

#### Аргументы {#transform-shape-args}

- **`shape`**: Объект сторов. Количество сторов не ограничено
- **`fn`**: `(values: {a: A; b: B}) => C`

  Функция-обработчик

  Преобразует данные перед отправлением в производный стор, <br/>
  [должна быть **чистой**](../../glossary.md#purity)

  **Аргументы**

  - **`values`**: Объект значений

  **Возвращает**: Новое значение для хранения в производном сторе <br/>
  Если функция возвращает undefined или текущее состояние производного стора, то обновления не будет

#### Возвращает {#transform-shape-return}

Новый, производный стор

### _combine( \[ a, b \], (\[ a, b \]) => result )_ {#transform-list}

Трансформирует массив сторов через функцию, принимающую массив значений

#### Формула {#transform-list-formulae}

```ts
declare const a: Store<A>
declare const b: Store<B>

$c = combine(
  /*stores*/ [a, b],
  /*fn*/ (values: [A, B]) => C
)
> Store<C>
```

#### Аргументы {#transform-list-args}

- **`stores`**: Массив сторов <br/>
  Количество используемых сторов не ограничено

- **`fn`**: `(values: [A, B]) => C`

  Функция-обработчик

  Преобразует данные перед отправлением в производный стор, <br/>
  [должна быть **чистой**](../../glossary.md#purity)

  **Аргументы**

  - **`values`**: Массив значений

  **Возвращает**: Новое значение для хранения в производном сторе <br/>
  Если функция возвращает undefined или текущее состояние производного стора, то обновления не будет

#### Возвращает {#transform-list-return}

Новый, производный стор

### _combine( a, b, ( a, b ) => result )_ {#transform-spread}

Трансформирует произвольное число сторов через функцию, принимающую соответствующее число значений в аргументах

#### Формула {#transform-spread-formulae}

```ts
declare const a: Store<A>
declare const b: Store<B>

$c = combine(
  /*...stores*/ a, b,
  /*fn*/ (a: A, b: B) => C
)
> Store<C>
```

#### Аргументы {#transform-spread-args}

- **`...stores`**: Аргументы со сторами, по одному стору на аргумент <br/>
  В типах максимальное количество используемых сторов - 12, при превышении числа рекомендуется использовать [вариант с массивом](#transform-list)

- **`fn`**: `(...values: [A, B]) => C`

  Функция-обработчик

  Преобразует данные перед отправлением в производный стор, <br/>
  число аргументов зависит от числа переданных сторов. <br/>
  [Должна быть **чистой**](../../glossary.md#purity)

  **Аргументы**

  - **`values`**: Аргументы со значениями, по одному аргументу от каждого стора

  **Возвращает**: Новое значение для хранения в производном сторе <br/>
  Если функция возвращает undefined или текущее состояние производного стора, то обновления не будет

#### Возвращает {#transform-spread-return}

Новый, производный стор

## Примеры

#### Пример

```js
import {createStore, combine} from 'effector'

const balance = createStore(0)
const username = createStore('zerobias')

const greeting = combine(balance, username, (balance, username) => {
  return `Hello, ${username}. Your balance is ${balance}`
})

greeting.watch(data => console.log(data)) // => Hello, zerobias. Your balance is 0

const arrStores = combine([balance, username])
arrStores.watch(console.log) // => [0, 'zerobias']
```

[Запустить пример](https://share.effector.dev/jyX3NCLt)

#### Пример

```js
import {createStore, combine} from 'effector'

const r = createStore(255)
const g = createStore(0)
const b = createStore(255)

const color = combine({r, g, b})
color.watch(console.log) // => {r: 255, b: 0, b: 255}

const sum = combine({r, g, b}, ({r, g, b}) => r + g + b)
sum.watch(console.log) // => 510
```

[Запустить пример](https://share.effector.dev/9AckAVg7)

#### Пример

```js
import {createStore, combine} from 'effector'

const r = createStore(255)
const g = createStore(0)
const b = createStore(255)

const color = combine([r, g, b])
color.watch(console.log)
// => [255, 0, 255]

const sum = combine([r, g, b], ([r, g, b]) => r + g + b)
sum.watch(console.log)
// => 510
```

[Запустить пример](https://share.effector.dev/ch4CKPrX)
