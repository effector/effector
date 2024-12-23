---
title: Основные концепции эффектора
description: Основные концепции эффектора - хранилище, эффект, событие и как все это работает вместе
---

# Основные концепции (#core-concepts)

Effector включает три ключевых элемента, которые позволяют эффективно управлять состоянием и реагировать на изменения в приложении.

## Юниты (#units)

Юнит - это базовое понятие в Effector. [Store](/ru/api/effector/Store), [Event](/ru/api/effector/Event) и [Effect](/ru/api/effector/Effect) - это все юниты, то есть базовые строительные блоки для создания бизнес-логики приложения. Каждый юнит представляет собой независимую сущность, которая может быть:

- Связана с другими юнитами
- Подписана на изменения других юнитов
- Использована для создания новых юнитов

```ts
import { createStore, createEvent, createEffect, is } from "effector";

const $counter = createStore(0);
const event = createEvent();
const fx = createEffect(() => {});

// Проверка, является ли значение юнитом
is.unit($counter); // true
is.unit(event); // true
is.unit(fx); // true
is.unit({}); // false

// Все юниты можно связывать между собой
$counter.on(event, (counter) => counter + 1);

sample({
  clock: event,
  target: fx,
});
```

### Событие (##event)

Событие ([Event](/ru/api/effector/Event)) — Событие в Effector представляет собой точку входа в реактивный поток данных. Они представляют собой изменения или намерение что-то сделать: начать вычисления, отправить сообщение в другой юнит приложения, например, в хранилища и эффекты, или обновить состояние, обеспечивая гибкий и контролируемый поток работы с данными.

#### Особенности события (#event-features)

- Простота: События в Effector являются минималистичными и легко создаются с помощью [createEvent](/ru/api/effector/createEffect).
- Реактивность: Они обеспечивают мгновенное уведомление всех подписчиков при срабатывании.
- Композиция: Вы можете комбинировать события, фильтровать их, изменять данные и передавать их в другие обработчики или сторы.

```js
import { createEvent } from "effector";

// Создаем событие
const formSubmitted = createEvent();

// Подписываемся на событие
formSubmitted.watch(() => console.log("Форма отправлена!"));

formSubmitted();

// Вывод в консоль:
// "Форма отправлена!"
```

### Хранилище (#store)

Хранилище ([Store](/ru/api/effector/Store)) — это **ключевой элемент управления состоянием** в Effector. Он представляет собой реактивное значение, обеспечивающую строгий контроль над мутациями и потоком данных.

#### Особенности хранилища (#store-features)

- У вас может быть столько хранилищ, сколько вам нужно.
- Хранилище поддерживает реактивность — изменения автоматически распространяются на все подписанные компоненты.
- Effector оптимизирует ререндеры компонентов, подписанных на сторы, минимизируя лишние обновления.
- Данные хранилища иммутабельнные.

```js
import { createStore, createEvent } from "effector";

// Создаем событие
const userAdded = createEvent();

// Создаем хранилище и прозиводный стор
const $users = createStore([
  {
    id: 1,
    name: "Питер паркер",
    age: 16,
  },
]);
const $adultUsers = $users.map((users) => users.age >= 18);

// Обновляем стор при срабатывании события
$users.on(userAdded, (users, newUser) => [...users, newUser]);

// Подписываемся на изменения стора
$users.watch((users) => console.log(`Все пользователи: ${users}`));
$adultUsers.watch((adultUsers) => console.log(`Пользователи старше 18: ${adultUsers}`));

// Вывод:
// Все пользователи:  [{ id: 1, name: "Bob", age: 16 }]
// Пользователи старше 18: []

// Trigger the event
userAdded({
  id: 2,
  name: "Доктор октавиус",
  age: 19,
});

// Console output:
// Все пользователи:  [{ id: 1, name: "Питер паркер", age: 16 }, { id: 2, name: "Доктор октавиус", age: 19 }]
// Пользователи старше 18: [{ id: 2, name: "Доктор октавиус", age: 19 }]
```

### Эффект (#effect)

Эффект ([Effect](/ru/api/effector/Effect)) — Эффект в Effector предназначен для обработки побочных действий — операций, которые взаимодействуют с внешними системами. Эффект может быть как асинхронным, так и нет.

#### Особенности эффекта (#effect-features)

- У эффекта есть встроенные состояния `pending` и события `done`, `fail`, которые облегчают отслеживание выполнения операций.
- Логика, связанная с взаимодействием с внешними системами, вынесена за пределы основной логики приложения. Это упрощает тестирование и делает код более предсказуемым.

Эффекты помогают изолировать логику взаимодействия с внешними системами от остального кода, что делает приложение более предсказуемым и удобным для тестирования.
Вы всегда должны использовать эффекты в тех случаях, когда результат может быть как успешным, так и ошибкой.

```js
import { createEffect } from "effector";

const fetchUserFx = createEffect(async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  return response.json();
});

// Подписываемся на результат эффекта
fetchUserFx.done.watch(({ result }) => console.log("Данные пользователя:", result));
fetchUserFx.fail.watch(({ error }) => console.log("Произошла ошибка! ", error));

// Запускаем эффект
fetchUserFx(1);
```

## Чистота функций (#purity)

Большинство функций в API effector не должны вызывать другие события или эффекты напрямую. Это делает поток данных в приложении более понятным, когда императивные триггеры сгруппированы внутри обработчиков `watch` и effect, а не разбросаны по всей бизнес-логике.

Правильно, императивный подход:

```ts
import { createStore, createEvent } from "effector";

const submitLoginSize = createEvent();

const $login = createStore("guest");
const $loginSize = $login.map((login) => login.length);

$loginSize.watch((size) => {
  submitLoginSize(size);
});
```

✅ **Лучше**, декларативный подход:

```ts
import { createStore, createEvent, sample } from "effector";

const submitLoginSize = createEvent();

const $login = createStore("guest");
const $loginSize = $login.map((login) => login.length);

sample({
  clock: $loginSize,
  target: submitLoginSize,
});
```

❌ А вот так делать **НЕ** стоит:

```ts
import { createStore, createEvent } from "effector";

const submitLoginSize = createEvent();

const $login = createStore("guest");
// Так делать не надо!
const $loginSize = $login.map((login) => {
  // Не вызывайте события внутри map! Используйте sample вместо этого
  submitLoginSize(login.length);
  return login.length;
});
```

:::info{title="Важное замечание"}
Вызов событий или эффектов внутри функций преобразования (например, в `map`, `sample.filter` или обработчиках `on`) может привести к непредсказуемому поведению и усложняет отладку. Всегда используйте декларативный подход с помощью `sample` для таких случаев.
:::

## Как это все работает вместе? (#how-units-work-together)

Эти концепции объединяются в мощный, реактивный поток данных:

1. **Событие** инициирует изменения (например, нажатие кнопки).
2. Эти изменения влияют на **Хранилище**, обновляя состояние приложения.
3. При необходимости, **Эффекты** выполняют побочные действия, такие как взаимодействие с сервером.

```ts
import { createStore, createEvent, createEffect, sample } from "effector";

type Todo = {
  taskName: string;
  completed: boolean;
};

const $todos = createStore<Array<Todo>>([]);
const $error = createStore("");

const formSubmitted = createEvent<Todo>();
const setError = createEvent<string>();

const validateFormFx = createEffect((taskValues: Todo) => {
  // validate logic ...
  if (validationFailed) {
    const error = "validation failed";
    setError(error);
    throw new Error(error);
  }

  saveTodoFx(taskValues);
  return values;
});

const saveTodoFx = createEffect(async (newTask: Todo) => {
  // simulate api call
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { id: Date.now(), text: task, completed: false };
});

$todos.on(saveTodoFx.doneData, (todos, newTodo) => [...todos, newTodo]);
$todos.on(taskToggled, (todos, todoId) => {
  return todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }

    return todo;
  });
});

$error.on(setError, (_, error) => error);
$error.reset(validateFormFx.doneData);

formSubmitted({
  taskName: "Learn effector",
  completed: true,
});

formSubmitted.watch((newTask) => validateFormFx(newTask));

$todos.watch((todos) => console.log("Todos updated:", todos));
```

:::info{title="Почему $ и Fx?"}
Это рекомендации команды effector использовать `$` для сторов и `fx` для эффектов.
Более подробно об этом можно почитать [здесь](/ru/extra/conventions).
:::

### Добавляем `sample` для композиции (#adding-sample)

Осталось связать изменение стора и вызов эффекта, и здесь в игру вступает прекрасный метод [`sample`](/ru/api/effector/sample).
Функция `sample` — это инструмент для оркестрации реактивных зависимостей. Это основной способ связывать сторы, события и эффекты в Effector.

```ts
import { createStore, createEvent, createEffect, sample } from "effector";

type Todo = {
  taskName: string;
  completed: boolean;
};

const $todos = createStore<Array<Todo>>([]);
const $error = createStore("");

const formSubmitted = createEvent<Todo>();
const setError = createEvent<string>();

const validateFormFx = createEffect((taskValues: Todo) => {
  // validate logic ...
  if (validationFailed) {
    throw new Error("validation failed");
  }

  return values;
});

const saveTodoFx = createEffect(async (task: Todo) => {
  // simulate api call
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { id: Date.now(), text: task, completed: false };
});

sample({
  clock: formSubmitted,
  target: validateFormFx,
});

sample({
  clock: validateFormFx.doneData,
  target: saveTodoFx,
});

sample({
  clock: validateFormFx.failData,
  target: setError,
});

$todos.on(saveTodoFx.doneData, (todos, newTodo) => [...todos, newTodo]);
$todos.on(taskToggled, (todos, todoId) => {
  return todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }

    return todo;
  });
});

$error.on(setError, (_, error) => error);
$error.reset(validateFormFx.doneData);

formSubmitted({
  taskName: "Lean effector",
  completed: true,
});

$todos.watch((todos) => console.log("Todos updated:", todos));
```

В итоге всего за несколько строк кода мы создали рабочий, реактивный и предсказуемый поток данных, без капли бойлерплейта.

Effector позволяет сосредоточиться на логике приложения, а не на обработке состояния. Попробуйте, и вы оцените его мощь!
