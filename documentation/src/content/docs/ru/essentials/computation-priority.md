---
title: Чистые функции и порядок вычислений
description: Что такое чистые функции, где они используются в effector и как работает порядок вычислений
---

# Чистые функции и порядок вычислений (#pure-functions-and-computation)

Чистые функции и правильный порядок вычислений являются фундаментальными концепциями в effector, которые обеспечивают предсказуемость и надёжность приложения.

# Чистые функции (#pure-functions)

## Что такое чистая функция? (#what-is-pure-function)

Чистая функция - это функция, которая:

- При одинаковых входных данных всегда возвращает одинаковый результат
- Не имеет побочных эффектов (не изменяет данные за пределами своей области видимости)
- Не зависит от внешнего состояния

✅ Пример чистой функции:

```ts
const calculateTotal = (a: number, b: number) => {
  return a + b;
};
```

❌ Пример НЕ чистой функции:

```ts
let globalCounter = 0;

// Не чистая функция - зависит от внешнего состояния и изменяет его
const calculateTotalWithSideEffect = (items: Array<{ price: number }>) => {
  globalCounter++; // Побочный эффект!
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

В effector вы должны стараться использовать чистые функции везде, где можно, за исключением [эффектов](/ru/api/effector/Effect), который созданы для сайд эффектов.

### Почему это важно? (#why-pure-functions-matter)

1. Предсказуемость: Чистые функции всегда возвращают одинаковый результат для одних и тех же входных данных.
2. Тестируемость: Чистые функции легко тестировать, так как они не зависят от внешнего состояния
3. Отладка: При использовании чистых функций проще находить источник проблем.
4. Оптимизация: effector может оптимизировать выполнение чистых функций.

### Типичные ошибки (#common-pure-function-mistakes)

❌ Обращение к внешним переменным:

```ts
let globalValue = 0;

const $store = createStore(0);
// Неправильно - зависимость от внешней переменной
$store.map((value) => value + globalValue);
```

❌ Прямое изменение объектов:

```ts
const $users = createStore([]);
// Неправильно - мутация входных данных
$users.map((users) => {
  users.push({ id: 1 });
  return users;
});
```

✅ Правильные реализации:

```ts
const $store = createStore(0);
const $globalValue = createStore(0);

// Правильно - используем combine для доступа к другому стору
const $result = combine(
  $store,
  $globalValue,
  (storeValue, globalValue) => storeValue + globalValue,
);

const $users = createStore([]);
// Правильно - создаем новый массив
$users.map((users) => [...users, { id: 1 }]);
```

## Порядок вычислений (#computation-order)

### Приоритеты обновлений (#update-priorities)

effector выполняет обновления в определенном порядке:

1. Чистые вычисления (`map`, `filter`, `on` и др.)
2. Комбинация данных (`combine`, `sample`)
3. Побочные эффекты (`watch`, `effect`)

Это позволяет:

- Выполнить все чистые вычисления до побочных эффектов
- Гарантировать консистентное состояние при выполнении эффектов
- Оптимизировать вычисления

### Пример порядка вычислений (#computation-order-example)

```ts
import { createStore, createEvent, createEffect, sample } from "effector";

// Создаем простой эффект для демонстрации
const logFx = createEffect((msg: string) => {
  console.log("Effect executed:", msg);
});

const formSubmitted = createEvent();

const $user = createStore({
  name: "John",
  lastName: "Doe",
  age: 16,
});

const $isUserAdult = $user.map((user) => {
  console.log("MAP user age: ", user.age);
  return user.age >= 18;
});

const $fullName = combine($user, ({ name, lastName }) => {
  console.log("COMBINE executed"); // для демонстрации
  return `${name} ${lastName}`;
});

sample({
  clock: formSubmitted,
  source: $fullName,
  fn: (fullName) => {
    console.log("SAMPLE fn executed");
    return `Submitting: ${fullName}`;
  },
  target: logFx,
});

$isUserAdult.watch((isUserAdult) => console.log("isUserAdult watch: ", isUserAdult));

$fullName.watch((fullName) => {
  console.log("COMBINE WATCH fullName executed:", fullName);
});

formSubmitted.watch(() => {
  console.log("EVENT WATCH form submitted");
});

formSubmitted();

// MAP user age: 16
// COMBINE executed
// COMBINE WATCH fullName executed: John Doe
// SAMPLE fn executed
// EVENT WATCH form submitted
// Effect executed: Submitting: John Doe
```

В этом примере порядок выполнения будет следующим:

1. Сначала у нас вызовется `map` и `combine` при инициализации базового стора, а также вызывается `watch` для них.
2. Мы вызываем событие `formSubmitted`.
3. `sample` начинает свою работу, и отрабатывает `fn`.
4. После выполненной работы `sample` отрабатывает `formSubmitted.watch`.
5. И наконец наш эффект

Вы можете [поиграться с этим примером в песочнице](https://share.effector.dev/G8xaDjDZ), поменять местами вызов `map` и `combine` или `watch` для каждого из производных сторов и посмотреть как это повлияет на логи.

### Усложненный пример порядка вычислений (#advanced-computation-order-example)

В этом примере мы рассмотрим более сложный случай. Мы опустим имплементацию типов и реализацию кода, а сосредоточимся на порядке вычислений.

```ts
import { createEvent, sample, split, createEffect, createStore } from "effector";

const $selectedUser = createStore<User | null>(null);

const $selectedUserFullName = combine($selectedUser, (selectedUser) => {
  console.log("COMBINE called");
  if (!selectedUser) {
    return "";
  }
  return `${selectedUser.name} ${selectedUser.lastName}`;
});

const userSelected = createEvent<User>();

const { sigmaPersonSelected, basePersonSelected } = split(userSelected, {
  sigmaPersonSelected: (user) => {
    console.log("sigmaPersonSelected Inside split log called");
    return user.role === "sigma";
  },
  basePersonSelected: () => {
    console.log("basePersonSelected Inside split log called");
    return user?.role !== "sigma";
  },
});

const fetchUserDataPostsFx = createEffect((userId: number) => {
  console.log("EFFECT called");
  // logic
});

const $selectedUserId = $selectedUser.map((selectedUser) => {
  console.log("MAP $selectedUserId called with user", selectedUser);
  return selectedUser ? selectedUser.id : null;
});

sample({
  clock: userSelected,
  source: $selectedUserId,
  fn: (selectedUserId) => {
    console.log("FIRST SAMPLE fn WITH EFFECT called with ", selectedUserId);
    return selectedUserId;
  },
  target: fetchUserDataPostsFx,
});

sample({
  clock: userSelected,
  fn: (selectedUser) => {
    const newUser = { ...selectedUser };
    if (newUser.name === "Patrick" && newUser.lastName === "Bateman") {
      newUser.mentalIssues = ["psycho"];
    }

    console.log("SECOND SAMPLE fn called, modified data and will return ", newUser);
    return newUser;
  },
  target: $selectedUser,
});

$selectedUser.watch((selectedUser) => console.log("$selectedUser watch called: ", selectedUser));

$selectedUserId.watch((selectedUserId) =>
  console.log("$selectedUserId WATCH called", selectedUserId),
);

$selectedUserFullName.watch((selectedUserFullName) =>
  console.log("COMBINE watch called", selectedUserFullName),
);

sigmaPersonSelected.watch((user) => console.log("sigmaPersonSelected WATCH called:", user));
basePersonSelected.watch((user) => console.log("basePersonSelected WATCH called:", user));

userSelected.watch(() => console.log("userSelected EVENT WATCH called "));

$selectedUser.on(userSelected, (_, newSelectedUser) => {
  console.log("$selectedUser ON called: ", newSelectedUser);
  return newSelectedUser;
});

userSelected({
  id: 2,
  name: "Patrick",
  lastName: "Bateman",
  role: "sigma",
});
```

- У нас есть базовый стор `selectedUser` и производные сторы `selectedUserId`, `selectedUserFullName`.
- Событие `userSelected`, при вызове которого мы обновляем стор.
- Эффект `fetchUserDataPostsFx`, который фетчит данные по `userId`.
- Два `sample`, который начинают свою работу при вызове события `userSelected`.
- И `split`, который отрабатывает при вызове события `userSelected` и возвращает новые события, в зависимости от переданных данных.

И так, начнем разбор:
Сначала у нас произойдет инициализация сторов, и вызовется `combine` и `map`, а затем `watch`, в том порядке, в котором мы их вызвали, для каждого из сторов.

```ts
// ------Инициализация
// COMBINE called
// MAP $selectedUserId called with user null
// $selectedUser watch called:  null
// $selectedUserId WATCH called null
// COMBINE watch called ""
// --------------------------------------
```

Далее мы вызываем событие `userSelected`, на вызов этого события у нас 4 подписки

1. `split`, для разделения события на несколько других.
2. `on` для базового стора `selectedUser`.
3. `sample` с `target` эффектом.
4. `sample` с модификацией данных и последующем обновлением стора `selectedUser` через `target`.

Первым делом у нас произойдет вызов метода `split`, затем метод стора `on`, стор обновится, за которым последует обновление производного стора `selectedUserId` и `selectedUserFullName`. Дальше начнут работы методы `sample`, где произойдет вызов чистой функции `fn` друг за другом. Так как во втором `sample` мы модифицируем данные базового стора `selectedUser`, то это вызовет обновление производных сторов.

```ts
// ------Инициализация
// COMBINE called
// MAP $selectedUserId called with user null
// $selectedUser watch called:  null
// $selectedUserId WATCH called null
// COMBINE watch called ""
// --------------------------------------

// sigmaPersonSelected Inside split log called
// $selectedUser ON called: {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma"}
// MAP $selectedUserId called with user {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma"}
// COMBINE called
// FIRST SAMPLE fn WITH EFFECT called with 2
/* SECOND SAMPLE fn called, modified data and will return,
 {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma", mentalIssues: ['psycho']}
*/
// MAP $selectedUserId called with user {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma", mentalIssues: ['psycho']}
// COMBINE called
```

На этом этапе у нас все чистые функции выполнились, а это значит, что теперь начинают свою работу побочные методы. Так как первым вызовом во всем этом коде было событие `userSelected`, то сначала отработает `userSelected.watch`. В самом начале, после вызова события `userSelected`, у нас первым номером запустился метод `split`, поэтому после `userSelected.watch` у нас отработает `sigmaPersonSelected.watch`, по этой же логике дальше у нас вызовется `selectedUser.watch`, а также `selectedUserId.watch` и `selectedUserFullName.watch`, так как мы обновляли базовый стор дважды (при помощи `on` и `sample`), то `selectedUser.watch` вызовется еще раз, НО, обратите внимание, что у производных сторов `watch` второй раз не будет вызываться, потому что значение сторов осталось неизменным, эффектор оптимизирует это вычисление. И наконец у нас вызовется `fetchUserDataPostsFx`.

```ts
// ------Инициализация
// COMBINE called
// MAP $selectedUserId called with user null
// $selectedUser watch called:  null
// $selectedUserId WATCH called null
// COMBINE watch called ""
// --------------------------------------

// sigmaPersonSelected Inside split log called
// $selectedUser ON called: {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma"}
// MAP $selectedUserId called with user {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma"}
// FIRST SAMPLE fn WITH EFFECT called with 2
/* SECOND SAMPLE fn called, modified data and will return
 {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma", mentalIssues: ['psycho']}
*/
// MAP $selectedUserId called with user {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma", mentalIssues: ['psycho']}

// userSelected EVENT WATCH called
// sigmaPersonSelected WATCH called: {...}
// $selectedUser watch called:  {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma"}
// $selectedUserId WATCH called 2
// COMBINE watch called Patrick Bateman
/* $selectedUser watch called:
{id: 2, name: "Patrick", lastName: "Bateman", role: "sigma", mentalIssues: ['pshyco']}
/*
// EFFECT called
```

:::info{title="Обновление хранилища"}
В этом примере мы использовали разные способы обновления состояния, чтобы разложить по полочкам логику работы приоритета вызовов.
В своем проекте старайтесь использовать единый подход к обновлению хранилища, либо через `sample`, либо через `on`.
:::

Поиграть с этим примером можно [тут](https://share.effector.dev/bRj6J35P)

## На что стоит обратить внимание? (#watch-out)

1. Производные состояния `combine`, `map` выполняются сразу при инициализации и их `watch` обработчики сразу.
2. Собственные методы юнита (например `store.on`, `store.map`) вызываются в приоритете над `sample` или `combine`.
3. Эффектор оптимизирует вычисления производных сторов, и если видит, что данные не поменялись, то это не вызовет ререндер компонентов.
