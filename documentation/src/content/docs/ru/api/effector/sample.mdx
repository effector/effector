---
title: sample API
description: API reference для метода sample - композиция юнитов. Полная и короткая форма, формула использования, типы TypeScript, возвращаемые значения.
lang: ru
---

[units]: /ru/explanation/glossary#common-unit
[eventApi]: /ru/api/effector/Event
[storeApi]: /ru/api/effector/Store
[effectApi]: /ru/api/effector/Effect
[purity]: /ru/explanation/glossary/#purity

# `sample` API (#sample-api)

```ts
import { sample } from "effector";
```

Метод для связывания [юнитов](/ru/explanation/glossary#common-unit). Его главная задача - брать данные из одного места `source` и передавать их в другое место `target` при срабатывании определённого триггера `clock`.

Типичный вариант использования – когда необходимо обработать какое-либо событие используя данные из стора. Вместо использования `store.getState()`, которое может вызвать несогласованность состояния, лучше использовать метод `sample`.

:::tip{title="как работать с sample"}
Узнайте как [композировать юниты и работать с методом `sample`](/ru/essentials/unit-composition)
:::

## Алгоритм работы (#algorithm)

- При срабатывании `clock` прочитать значение из `source`
- Если указан `filter`, и результат функции вернул `true` или стор со значением `true`, то продолжить
- Если указан `fn`, то преобразовать данные
- И передать данные в `target`.

## Особенности работы `sample` (#sample-peculiarities)

- Если `clock` не передан, `sample` будет срабатывать при каждом обновлении `source`.
- Если `target` не передан, то `sample` создаст и вернёт новый производный [юнит](/ru/explanation/glossary#common-unit)

## Возвращаемый юнит и значение (#returned-value)

Если `target` не передан, то он будет создан при вызове. Тип создаваемого юнита описан в данной таблице:

| clock \ source                      | [_Store_](/ru/api/effector/Store) | [_Event_](/ru/api/effector/Event) | [_Effect_](/ru/api/effector/Effect) |
| ----------------------------------- | --------------------------------- | --------------------------------- | ----------------------------------- |
| [_Store_](/ru/api/effector/Store)   | `Store`                           | `Event`                           | `Event`                             |
| [_Event_](/ru/api/effector/Event)   | `Event`                           | `Event`                           | `Event`                             |
| [_Effect_](/ru/api/effector/Effect) | `Event`                           | `Event`                           | `Event`                             |

Использование таблицы:

1. Выбираем тип источника `clock`, это столбец
2. Тип `source` – это строка
3. Устанавливаем соответствие между столбцом и строкой

В случае, если `target` передан явно, то возвращаемым значением будет тот же самый `target`.

Например:

```ts
const event = createEvent();
const $store = createStore();
const $secondStore = createStore();

const $derivedStore = sample({
  clock: $store,
  source: $secondStore,
});
// Результатом будет производный стор,
// так как `source` и `clock` являются сторами

const derivedEvent = sample({
  clock: event,
  source: $store,
});
// Результатом будет производное событие, так как `clock` – событие
```

## Полная форма (#full-form)

- **Формула**

```ts
sample({
  clock?, // триггер
  source?, // источник данных
  filter?, // фильтр
  fn?, // функция-трансформатор
  target?, // целевой юнит
  batch?, // флаг батчинга
  name? // имя sample юнита
})
```

### `clock` (#clock-argument)

Аргумент `clock` является триггером, определяющий момент взятия данных из [`source`](/#source-argument).<br/>
Является опциональным.

- **Тип**

```ts
sample({
  clock?: Unit<T> | Unit<T>[],
})
```

Может иметь сигнатуру:

- [`Event<T>`][eventApi] - срабатывает при вызове события
- [`Store<T>`][storeApi] - срабатывает при изменении стора
- [`Effect<T, Done, Fail>`][effectApi] - срабатывает при вызове эффекта
- `Unit<T>[]`- массив [юнитов][units] срабатывает при активации любого из них

:::info{title="либо clock либо source"}
Хотя аргумент `clock` является опциональным, при использовании метода `sample` необходимо указать либо `clock`, либо [`source`](#source-argument).
:::

```ts
const clicked = createEvent();
const $store = createStore(0);
const fetchFx = createEffect();

// Event как clock
sample({
  source: $data,
  clock: clicked,
});

// Store как clock
sample({
  source: $data,
  clock: $store,
});

// Массив как clock
sample({
  source: $data,
  clock: [clicked, fetchFx.done],
});
```

---

### `source` (#source-argument)

Является источником данных, откуда берутся данные при срабатывании `clock`. Если `clock` не указан, тогда `source` используется как `clock`. <br/>
Является опциональным.

- **Тип**

```ts
sample({
  source?: Unit<T> | Unit<T>[] | {[key: string]: Unit<T>},
})
```

Может иметь сигнатуру:

- [`Store<T>`][storeApi] - данные берутся из текущего значения стора
- [`Event<T>`][eventApi] - возьмется последнее значение, с которым запускалось событие
- [`Effect<T, Done, Fail>`][effectApi] - возьмется последнее значение, с которым запускался эффект
- Объект с [юнитами][units] - для комбинирования нескольких источников
- Массив с [юнитами][units] - для комбинирования нескольких источников

:::info{title="либо source либо clock"}
Хотя аргумент `source` является опциональным, при использовании метода `sample` необходимо указать либо `source`, либо [`clock`](#clock-argument).
:::

---

### `filter` (#filter-argument)

Функция-предикат для фильтрации. Если возвращает `false` или стор со значением `false`, данные не будут переданы в `target`.<br/>
Является опциональным.

- **Тип**

```ts
sample({
  filter?: Store<boolean> | (source: Source, clock: Clock) => (boolean | Store<boolean>),
})
```

Может иметь сигнатуру:

- [`Store<boolean>`][storeApi] – стор с `boolean` значением, как производный так и базовый
- Функция-предикат – функция возвращающая `boolean` значение

```ts
const $isUserActive = createStore(false);

sample({
  clock: checkScore,
  source: $score,
  filter: (score) => score > 100,
  target: showWinnerFx,
});

sample({
  clock: action,
  source: $user,
  filter: $isUserActive,
  target: adminActionFx,
});
```

---

### `fn` (#fn-argument)

Функция для трансформации данных перед передачей в `target`. Функция [**должна быть чистой**][purity].<br/>
Является опциональным.

- **Тип**

```ts
sample({
  fn?: (source: Source, clock: Clock) => Target
})
```

:::info{title="возвращаемый тип данных"}
Тип возвращаемых данных должен совпадать с типом данных в `target`.
:::

```ts
const $user = createStore<User>({});
const saveUserFx = createEffect((user: User) => {
  // ...
});

sample({
  clock: updateProfile,
  source: $user,
  fn: (user, updates) => ({ ...user, ...updates }),
  target: saveUserFx,
});

sample({
  clock: submit,
  source: $form,
  fn: (form) => form.email,
  target: sendEmailFx,
});
```

---

### `target` (#target-argument)

Целевой юнит, который получит данные и будет вызван.<br/>
Является опциональным.

- **Тип**

```ts
sample({
  target?: Unit<T> | Unit<T>[],
})
```

Может иметь сигнатуру:

- [`EventCallable<T>`](/ru/essentials/typescript#event-types) - событие (не производное) будет вызвано с данными
- [`Effect<T, Done, Fail>`][effectApi] - эффект будет вызван с данными
- [`StoreWritable<T>`](/ru/essentials/typescript#store-types) - стор (не производный) будет обновлён данными
- Массив с [юнитами][units] - будет вызван каждый юнит в массиве

:::info{title="target без target"}
Если `target` не указан, `sample` [возвращает новый производный юнит](#returned-value).
:::

```ts
const targetEvent = createEvent<string>();
const targetFx = createEffect<string, void>();
const $targetStore = createStore("");

// Event как target
sample({
  source: $store,
  clock: trigger,
  target: targetEvent,
});

// Effect как target
sample({
  source: $store,
  clock: trigger,
  target: targetFx,
});

// Store как target
sample({
  source: $store,
  clock: trigger,
  target: $targetStore,
});
```

---

### `greedy` (#greedy-argument)

:::warning{title="Deprecated"}
Начиная с effector 23.0.0 свойство `greedy` устарело.

Используйте `batch` вместо `greedy`.
:::

---

### `batch` (#batch-argument)

Группирует обновления для лучшей производительности. По умолчанию `true`.<br/>
Является опциональным.

- **Тип**

```ts
sample({
  batch?: boolean // По умолчанию true
})
```

---

### `name` (#name-argument)

Свойство `name` позволяет задать имя создаваемому юниту. Это имя используется для отладки.<br/>
Является опциональным.

- **Тип**

```ts
sample({
  name?: string
})
```

## Краткая форма (#short-form)

- **Формула**

```ts
sample(source, clock, fn?): Unit
```

Альтернативная запись метода, всегда имеет неявный `target`.

Краткая форма также имеет несколько паттернов написания:

1. Все аргументы: `sample(source, clock, fn)` - с функцией-трансформером
2. `source` и `clock`: `sample(source, clock)` - без функции-трансформера
3. `source` и `fn`: `sample(source, fn)` - с функцией-трансформером, но без`clock`, тогда `source`ведет как`clock`
4. Один аргумент: `sample(source)` - только `source`, тогда `source` ведет как `clock`

- **Возвращаемое значение**

Возвращаемое значение зависит от переданных юнитов, а тип данных от [`fn`](#short-form-fn-argument), если присутствует, иначе от `source`.

### `source` (#short-form-source-argument)

Является источником данных, откуда берутся данные при срабатывании `clock`. Если `clock` не указан, тогда `source` используется как `clock`.

- **Тип**

```ts
sample(source?: Unit<T> | Unit<T>[])
```

Может иметь сигнатуру:

- [`Store<T>`][storeApi] - данные берутся из текущего значения стора
- [`Event<T>`][eventApi] - возьмется последнее значение, с которым запускалось событие
- [`Effect<T, Done, Fail>`][effectApi] - возьмется последнее значение, с которым запускался эффект
- `Unit<T>[]`- массив [юнитов][units] срабатывает при активации любого из них

:::info{title="поведение без clock"}
Если `clock` не указан, тогда `source` ведет себя как `clock` - то есть является триггером.
:::

---

### `clock` (#short-form-clock-argument)

Аргумент `clock` является триггером, определяющий момент взятия данных из [`source`](/#source-argument).<br/>
Является опциональным.

- **Тип**

```ts
sample(clock?: Unit<T> | Unit<T>[])
```

Может иметь сигнатуру:

- [`Event<T>`][eventApi] - срабатывает при вызове события
- [`Store<T>`][storeApi] - срабатывает при изменении стора
- [`Effect<T, Done, Fail>`][effectApi] - срабатывает при вызове эффекта
- `Unit<T>[]`- массив [юнитов][units] срабатывает при активации любого из них

```ts
const clicked = createEvent();
const $store = createStore(0);
const fetchFx = createEffect();

sample($data, clicked);

sample($data, $store);
```

---

### `fn` (#short-form-fn-argument)

Функция для трансформации данных перед передачей в `target`. Функция [**должна быть чистой**][purity].<br/> Является опциональным.

- **Тип**

```ts
sample(fn: (source: Source, clock: Clock) => result)
```

- **Пример**

```ts
const $userName = createStore("john");

const submitForm = createEvent();

const sampleUnit = sample(
  $userName /* 2 */,
  submitForm /* 1 */,
  (name, password) => ({ name, password }) /* 3 */,
);

submitForm(12345678);

// 1. при вызове submitForm с аргументом 12345678
// 2. прочитать значение из стора $userName ('john')
// 3. преобразовать значение из submitForm (1) и $userName (2) и вызвать sampleUnit
```

## Связанные API и статьи (#related-api-and-docs-to-sample)

- **API**
  - [`merge`](/ru/api/effector/merge) - Объединяет апдейты массива юнитов
  - [`Store`](/ru/api/effector/Store) - Описание стора, а также его методов и свойств
  - [`Event`](/ru/api/effector/Event) - Описание событий, а также его методов и свойств
  - [`Effect`](/ru/api/effector/Effect) - Описание эффектов, а также его методов и свойств
- **Статьи**
  - [Типизация юнитов и методов](/ru/essentials/typescript)
  - [Композиция юнитов и работа с методов `sample`](/ru/essentials/unit-composition)
