---
title: Чистые функции и порядок вычислений
description: Что такое чистые функции, где они используются в effector и как работает порядок вычислений
redirectFrom:
  - /en/advanced-guide/computation-priority
  - /explanation/computation-priority
  - /docs/advanced-guide/computation-priority
  - /docs/explanation/computation-priority
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

1. Чистые вычисления (`map`, `filter`)
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

const $firstName = createStore("John");
const $lastName = createStore("Doe");

const $fullName = combine($firstName, $lastName, (first, last) => {
  console.log("1. Combine executed"); // для демонстрации
  return `${first} ${last}`;
});

sample({
  clock: formSubmitted,
  source: $fullName,
  fn: (fullName) => {
    console.log("2. Sample fn executed");
    return `Submitting: ${fullName}`;
  },
  target: logFx,
});

$fullName.watch((fullName) => {
  console.log("3. Watch executed:", fullName);
});

formSubmitted.watch(() => {
  console.log("form submitted");
});

formSubmitted();

// В консоли увидим:
// 1. Combine executed
// 2. Sample fn executed
// 3. Watch executed: John Doe
// Effect executed: Submitting: John Doe
```

В этом примере порядок выполнения будет следующим:

1. Сначала мы вызываем событие
2. `sample` начинает свою работу и отрабатывает `$fullName`
3. Затем `fn` начинает свою работу
4. Дальше в очереди у нас `$fullName.watch`
5. И наконец наш эффект
