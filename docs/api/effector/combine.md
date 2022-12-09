---
id: combine
title: combine
---

This method allows you to get state from each passed store and **combine** it to single value and save to single store, that updates every time like each passed store.

:::info Caution
Combine returns not just a common store. Instead, it returns [DerivedStore](./Store.md#derived-store), it cannot be modified by the events or used as `target` in [`sample`](./sample.md).
:::

## `combine(...stores, fn)`

#### Formulae

```ts
$result = combine(
  $first, $second, $third, ...,
  (first, second, third, ...) => result
)
```

- After call `combine`, state of each store is extracted and passed to function arguments, `result` of a function call will be state of store `$result`
- Any amount of stores can be passed to `combine`, but latest argument always should be function-reducer that returns new state
- If function returned the same `result` as previous, store `$result` will not be triggered
- If several stores updated at the same time (during one tick) there will be single call of function and single update of `$result` store

**Returns**

[_DerivedStore_](Store.md#derived-store): New derived store

#### Example

```js
import {createStore, combine} from 'effector'

const $balance = createStore(0)
const $username = createStore('zerobias')

const $greeting = combine($balance, $username, (balance, username) => {
  return `Hello, ${username}. Your balance is ${balance}`
})

$greeting.watch(data => console.log(data)) // => Hello, zerobias. Your balance is 0

const $arrStores = combine([$balance, $username])
$arrStores.watch(console.log) // => [0, 'zerobias']
```

[Try it](https://share.effector.dev/jyX3NCLt)

## `combine({ A, B, C }, fn?)`

:::note
Formerly known as `createStoreObject`
:::

#### Formulae

```ts
$result = combine({a: $first, b: $second, c: $third})
```

- Read state from stores `$first`, `$second`, `$third` and assign it to properties `a`, `b`, `c` accordingly, that object will be saved to `$result` store
- Store `$result` contain object `{a, b, c}` and will be updated on each update of passed stores
- If several stores updated at the same time (during one tick) there will be single update of `$result` store

#### Formulae with `fn`

```ts
$result = combine({a: $first, b: $second, c: $third}, ({a, b, c}) => result)
```

- Read state from stores `$first`, `$second`, `$third` and assign it to properties `a`, `b`, `c` accordingly, calls function with that object
- The `result` of the function call saved in `$result` store
- If function returned the same `result` as previous, store `$result` will not be triggered
- If several stores updated at the same time (during one tick) there will be single call of function and single update of `$result` store

**Returns**

[_DerivedStore_](Store.md#derived-store): New derived store

#### Example

```js
import {createStore, combine} from 'effector'

const $r = createStore(255)
const $g = createStore(0)
const $b = createStore(255)

const $color = combine({r: $r, g: $g, b: $b})
$color.watch(console.log) // => {r: 255, b: 0, b: 255}

const $sum = combine({r: $r, g: $g, b: $b}, ({r, g, b}) => r + g + b)
$sum.watch(console.log) // => 510
```

[Try it](https://share.effector.dev/9AckAVg7)

## `combine([A, B, C], fn?)`

#### Formulae

```ts
$result = combine([$first, $second, $third], ([A, B, C]) => result)
```

- Read state from stores `$first`, `$second`, `$third` and assign it to array with the same order as passed stores, calls function with that array
- The `result` of the function call saved in `$result` store
- If function returned the same `result` as previous, store `$result` will not be triggered
- If several stores updated at the same time (during one tick) there will be single call of function and single update of `$result` store

#### Formulae without `fn`

```ts
$result = combine([$first, $second, $third])
```

- Read state from stores `$first`, `$second`, `$third` and assign it to array with the same order as passed stores, that array will be saved to `$result` store
- Store `$result` will be updated on each update of passed stores
- If several stores updated at the same time (during one tick) there will be single update of `$result` store

**Returns**

[_DerivedStore_](Store.md#derived-store): New derived store

#### Example

```js
import {createStore, combine} from 'effector'

const $r = createStore(255)
const $g = createStore(0)
const $b = createStore(255)

const $color = combine([$r, $g, $b])
$color.watch(console.log)
// => [255, 0, 255]

const $sum = combine([r, g, b], ([r, g, b]) => r + g + b)
$sum.watch(console.log)
// => 510
```

[Try it](https://share.effector.dev/ch4CKPrX)

## `combine` with primitives and objects

It works the same as before. Now primitives and objects can be used in `combine`, and `combine` will not be triggered. Effector will not track mutations of objects and primitives.

#### Example

```js
const $a = createStore('a')
const b = 2
const c = [false]
const d = {value: 1}

const $resultUsingComa = combine($a, b, c, d)
const $resultUsingArray = combine([$a, b, c, d])
const $resultUsingObject = combine({$a, b, c, d})

const $withFn = combine($a, b, c, d, (a, b) => ({a, b}))

$resultUsingComa.watch(console.log)
// => ["a", 2, [false], {value: 1}]
$resultUsingArray.watch(console.log)
// => ["a", 2, [false], {value: 1}]
$resultUsingObject.watch(console.log)
// => {$a: "a", b: 2, c: [false], d: {value: 1}}
$withFn.watch(console.log)
// => {a: "a", b: 2}

// will not trigger combine, but object and array will be changed because of reference
// uncomment the code below to see changes
// c.push(true)
// d.value = 2
```

[Try it](https://share.effector.dev/XWk1lG4a)
