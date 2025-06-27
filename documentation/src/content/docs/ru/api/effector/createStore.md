---
title: createStore
description: Метод для создания стора
lang: ru
---

# createStore (#create-store)

```ts
import { createStore } from "effector";

const $store = createStore();
```

Метод для создания [стора][storeApi].

## Формула (#createStore-formulae)

```ts
createStore(
  defaultState: State, // Исходное состояние стора
  config?: { // Объект конфигурации с дополнительными опциями
    skipVoid?: boolean; // Контролирует обновления со значением undefined
    name?: string; // Имя стора для отладки
    sid?: string // Стабильный идентификатор для SSR
    updateFilter?: (update: State, current: State) => boolean // Функция фильтрации обновлений
    serialize?: // Конфигурация сериализации для SSR
    | 'ignore'
    | {
        write: (state: State) => SerializedState
        read: (json: SerializedState) => State
      }
    domain?: Domain; // Домен, к которому принадлежит стор
  },
): StoreWritable<State>
```

- **Аргументы**

1. **`defaultState`**: Исходное состояние
2. **`config`**: Опциональный объект конфигурации

   - **`skipVoid`**: Опциональный аргумент. Определяет пропускает ли [стор][storeApi] `undefined` значения. По умолчанию `true`. В случае если передать в стор, у которого `skipVoid:true`, значение `undefined`, тогда вы получите [ошибку в консоль][storeUndefinedError].<br/><br/>

   - **`name`**: Опциональный аргумент. Имя стора. [Babel-plugin][babel] может определить его из имени переменной стора, если имя не передано явно в конфигурации.<br/><br/>
   - **`sid`**: Опциональный аргумент. Уникальный идентификатор стора. [Он используется для различения сторов между разными окружениями][storeSid]. При использовании [Babel-plugin][babel] проставляется автоматически.<br/><br/>
   - **`updateFilter`**:
     Опциональный аргумент. [Чистая функция][pureFn], которая предотвращает обновление стора, если она возвращает `false`. Следует использовать для случаев, когда стандартного запрета на обновление (если значение, которое предполагается записать в стор, равняется `undefined` или текущему значению стора) недостаточно. Если вызывать юниты внутри, то можно столкнуться с [ошибкой][unitCallError].

     <br/>

   - **`serialize`**: Опциональный аргумент отвечающий за сериализацию стора.

     - `'ignore'`: исключает стор из сериализации при вызовах [serialize][serialize].
     - Объект с методами `write` и `read` для кастомной сериализации. `write` вызывается при вызове [serialize](/ru/api/effector/serialize) и приводит состояние стор к JSON-значению – примитив или простой объект/массив. `read` вызывается при [fork](/ru/api/effector/fork), если предоставленные `values` – результат вызова [serialize][serialize].

- **Возвращаемое значение**

Возвращает новый [стор][storeApi].

## Примеры (#examples)

Базовое использование стора:

```js
import { createEvent, createStore } from "effector";

const addTodo = createEvent();
const clearTodos = createEvent();

const $todos = createStore([])
  .on(addTodo, (todos, newTodo) => [...todos, newTodo])
  .reset(clearTodos);

const $selectedTodos = $todos.map((todos) => {
  return todos.filter((todo) => !!todo.selected);
});

$todos.watch((todos) => {
  console.log("todos", todos);
});
```

[Запустить пример](https://share.effector.dev/tquiUgdq)

Пример с кастомной конфигурацией `serialize`:

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
// `serialize.write` стор `$date` был вызван

console.log(serverValues);
// => { nq1e2rb: "2022-11-05T15:38:53.108Z" }
// Объект Date из стора сохранен как ISO-дата

const clientScope = fork({ values: serverValues });
// `serialize.read` стор `$date` был вызван

const currentDate = clientScope.getState($date);
console.log(currentDate);
// => Date 11/5/2022, 10:40:13 PM
// Строка ISO-даты приведена обратно к объекту Date
```

[Запустить пример](https://share.effector.dev/YFkUlqPv)

## Типичные ошибки (#common-errors)

Ниже приведен список возможных ошибок, с которыми вы можете столкнуться при работе со сторами:

- [`store: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option`][storeUndefinedError].
- [`serialize: One or more stores dont have sids, their values are omitted`][serializeError].
- [`unit call from pure function is not supported, use operators like sample instead`][unitCallError].

## Связанные API и статьи (#related-api-and-docs-to-create-store)

- **API**
  - [`Store API`][storeApi] - API стора, его методы, свойства и описание
  - [`createApi`][createApi] - Создание набора событий для стора
  - [`combine`][combine] - Создание нового стора на основе других сторов
  - [`sample`][sample] - Связывание сторов с другими юнитами
- **Статьи**
  - [Как управлять состоянием][storeGuide]
  - [Гайд по работе с SSR][ssr]
  - [Что такое SID и зачем они нужны сторам][storeSid]
  - [Как типизировать сторы и другие юниты][typescript]

[storeApi]: /ru/api/effector/Store
[storeUndefinedError]: /ru/guides/troubleshooting#store-undefined
[storeSid]: /ru/explanation/sids
[ssr]: /ru/guides/server-side-rendering
[storeGuide]: /ru/essentials/manage-states
[combine]: /ru/api/effector/combine
[sample]: /ru/api/effector/sample
[createApi]: /ru/api/effector/createApi
[serialize]: /ru/api/effector/serialize
[typescript]: /ru/essentials/typescript
[babel]: /ru/api/effector/babel-plugin
[pureFn]: /ru/explanation/glossary/#purity
[unitCallError]: /ru/guides/troubleshooting#unit-call-from-pure-not-supported
[serializeError]: /ru/guides/troubleshooting/#store-without-sid
