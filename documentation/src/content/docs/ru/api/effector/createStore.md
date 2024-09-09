---
title: createStore
description: createStore is a method for creating a store
redirectFrom:
  - ru
  - "**Аргументы**"
---

```ts
import { createStore, type Store, type StoreWritable } from "effector";
```

# Methods (#methods)

## `createStore(defaultState)` (#methods-createStore-defaultState)

Метод для создания независимого [стора](/ru/api/effector/Store)

### Формула (#createStore-formulae)

```ts
**Возвращает**: `boolean`
```

### Аргументы (#createStore-args)

1. **`defaultState`**: Исходное состояние

### Throws (#methods-createStore-defaultState-throws)

#### unit call from pure function is not supported, use operators like sample instead (#methods-createStore-defaultState-throws-unit-call-from-pure)

> Since: effector 23.0.0

Occurs when events or effects are called from [pure functions](/en/explanation/glossary#purity), like updateFilter:

```ts
Следует использовать для случаев, когда стандартного запрета на обновление (если значение, которое предполагается записать в стор, равняется _undefined_ или текущему значению стора) недостаточно.
```

To resolve this, use `sample`:

```ts
**`update`**: Значение, которое предлагается записать в стор
```

### Возвращает (#createStore-return)

**`name`**: Имя стора.

### Examples (#methods-createStore-defaultState-examples)

#### Basic (#methods-createStore-defaultState-examples-basic)

```js
import { createEvent, createStore } from "effector";

const addTodo = createEvent();
const clearTodos = createEvent();

const $todos = createStore([])
  .on(addTodo, (state, todo) => [...state, todo])
  .reset(clearTodos);

const $selectedTodos = $todos.map((todos) => {
  return todos.filter((todo) => !!todo.selected);
});

$todos.watch((state) => {
  console.log("todos", state);
});
```

Опция `updateFilter` добавлена в effector 21.8.0

## `createStore(defaultState, config)` (#methods-createStore-defaultState-config)

Метод для создания независимого стора

### Formulae (#methods-createStore-defaultState-config-formulae)

```ts
createStore<T>(defaultState: T): Store<T>
createStore<T>(defaultState: T, config: {
  name?: string
  updateFilter?: (update: T, current: T) => boolean
  serialize?: 'ignore'
}): Store<T>
```

### Arguments (#methods-createStore-defaultState-config-arguments)

1. **`current`**: Текущее значение стора
2. **`config`**: Опциональный объект конфигурации
   - `name` (_String_): Name for the store. Babel-plugin может определить его из имени переменной стора, если имя не передано явно в конфигурации
   - Функция, которая предотвращает обновление стора, если она возвращает `false`. Accepts updated state as the first argument and current state as the second argument. Redundant for most cases since store already ensures that update is not `undefined` and not equal (`!==`) to current state _(since `effector 21.8.0`)_
   - Опция, запрещающая сериализацию стора при вызовах [serialize](/ru/api/effector/serialize)
   - **`serialize`**: Объект конфигурации кастомной сериализации стора. `write` вызывается при вызове [serialize](/ru/api/effector/serialize) и приводит состояние стора к JSON-значению – примитив или простой объект/массив. `read` вызывается при [fork](/ru/api/effector/fork), если предоставленные `values` – результат вызова [serialize](/ru/api/effector/serialize)
   - `domain`: (_Domain_): Domain to attach store to after creation.
   - `skipVoid`: (_boolean_): Flag to control how specifically store should handle `undefined` value _(since `effector 23.0.0`)_. If set to `false` - store will use `undefined` as a value. If set to `true` (deprecated), store will interpret `undefined` as a "skip update" command and will do nothing.

### Throws (#methods-createStore-defaultState-config-throws)

The same behaviour like for regular [`createStore(defaultState)`](#methods-createStore-defaultState-throws).

### Если возвращается _false_, то обновления не будет

Новый [стор](/ru/api/effector/Store)

### Examples (#methods-createStore-defaultState-config-examples)

#### **`updateFilter`**: `(update: T, current: T) => boolean`

```js
import { createEvent, createStore, sample } from "effector";

const punch = createEvent();
const veryStrongHit = createEvent();

const $lastPunchStrength = createStore(0, {
  // If store should be updated with strength less than 400 kg
  // update will be skipped
  updateFilter: (strength) => strength >= 400,
});

$lastPunchStrength.on(punch, (_, strength) => strength);

// Each store update should trigger event `veryStrongHit`
sample({ clock: $lastPunchStrength, target: veryStrongHit });

// Watch on store prints initial state
$lastPunchStrength.watch((strength) => console.log("Strength: %skg", strength));
// => Strength: 0kg

veryStrongHit.watch((strength) => {
  console.log("Wooow! It was very strong! %skg", strength);
});

punch(200); // updateFilter prevented update
punch(300); // Same here, store doesn't update, value remains `0`
punch(500); // Yeeah! updateFilter allows store update
// => Strength: 500kg
// => Wooow! It was very strong! 500kg
punch(100); // No update as well
```

Пример

#### **`serialize`**: `'ignore'`

```js
Опция `serialize` добавлена в effector 22.0.0
```

[Запустить пример](https://share.effector.dev/tquiUgdq)

#### Пример с кастомной конфигурацией `serialize`

```ts
import { createEvent, createStore, serialize, fork, allSettled } from "effector";

const saveDate = createEvent();
const $date = createStore<null | Date>(null, {
  // Объект Date автоматически приводится в строку ISO-даты при вызове JSON.stringify
  // но не приводится обратно к Date при вызове JSON.parse – результатом будет та же строка ISO-даты
  // Это приведет к расхождению состояния стора при гидрации состояния на клиенте при серверном рендеринге
  //
  // Кастомная конфигурация `serialize` решает эту проблему
  serialize: {
    write: (dateOrNull) => (dateOrNull ? dateOrNull.toISOString() : dateOrNull),
    read: (isoStringOrNull) => (isoStringOrNull ? new Date(isoStringOrNull) : isoStringOrNull),
  },
}).on(saveDate, (_, p) => p);

const serverScope = fork();

await allSettled(saveDate, { scope: serverScope, params: new Date() });

const serverValues = serialize(serverScope);
// `serialize.write` стора `$date` был вызван

console.log(serverValues);
// => { nq1e2rb: "2022-11-05T15:38:53.108Z" }
// Объект Date из стора сохранен как ISO-дата

const clientScope = fork({ values: serverValues });
// `serialize.read` стора `$date` был вызван

const currentValue = clientScope.getState($date);
console.log(currentValue);
// => Date 11/5/2022, 10:40:13 PM
// Строка ISO-даты приведена обратно к объекту Date
```

[Запустить пример](https://share.effector.dev/YFkUlqPv)
