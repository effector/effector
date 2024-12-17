---
title: Тестирование в effector
description: Как писать тесты для проверки логики в effector
---

# Написание тестов

Тестирование логики управления состоянием — одна из сильных сторон Effector. Благодаря изолированным контекстам ([fork](/ru/api/effector/fork)) и контролируемым асинхронным процессам ([allSettled](/ru/api/effector/allSettled)), вы можете проверять поведение приложения без необходимости эмулировать весь его цикл работы.

:::info{title="Что делает fork?"}
При помощи вызова функции `fork` мы создаем [`scope`](/ru/api/effector/Scope), который можно рассматривать как независимый экземпляр нашего приложения Effector
:::

## Основы тестирования (#basics-of-testing)

Effector предоставляет встроенные инструменты для:

- Изоляции состояния: Каждое тестируемое состояние может быть создано в своём собственном контексте. Это предотвращает побочные эффекты.
- Асинхронного выполнения: Все эффекты и события могут быть выполнены и проверены с помощью allSettled.

### Тестирование хранилищ (#store-testing)

Хранилища в Effector тестируются очень просто, так как они представляют собой чистую функцию, управляющую состоянием.

```ts
// counter.js
import { createStore, createEvent } from "effector";

const counterIncremented = createEvent();

const $counter = createStore(0);

$counter.on(counterIncremented, (counter) => counter + 1);
```

```ts
// counter.test.js
import { counterIncremented, $counter } from "./counter.js";

test("счетчик должен увеличиться на 1", async () => {
  const scope = fork();

  expect(scope.getState($counter)).toEqual(0);

  await allSettled(counterIncremented, { scope });

  expect(scope.getState($counter)).toEqual(1);
});
```

Для изолированного тестирования логики состояния используется fork. Это позволяет тестировать хранилища и события **без влияния** на глобальное состояние.

### Тестирование эффектов (#effect-testing)

Эффекты можно тестировать, проверяя их успешное выполнение или обработку ошибок.
В случае unit тестирования мы не хотим, чтобы наши эффекты действительно отправляли запрос на сервер, чтобы избежать этого поведения мы можем передать в `fork` дополнительный объект параметр, где в свойство `handlers` добавить список пар `[эффект, замоканный обработчик]`.

```ts
// effect.js
import { createEffect } from "effector";

const getUserProjectsFx = async () => {
  const result = await fetch("/users/projects/2");

  return result.json();
};
```

```ts
// effect.test.js
import { fork, allSettled } from "effector";
import { getUserProjectsFx } from "./effect.js";

test("эффект выполняется корректно", async () => {
  const scope = fork({
    handlers: [
      // Список пар [эффект, замоканный обработчик]
      [getUserProjectsFx, () => "user projects data"],
    ],
  });

  const result = await allSettled(fetchData, { scope });

  expect(result.status).toBe("done");
  expect(result.value).toBe("user projects data");
});
```

## Полноценный пример тестирования

Например, у нас есть типичный счетчик, но с асинхронной проверкой через наш бэкэнд. Предположим, у нас следующие требования:

- Когда пользователь нажимает кнопку, мы проверяем, меньше ли текущий счетчик чем 100, и затем проверяем этот клик через наш API бэкэнда.
- Если валидация успешна, увеличиваем счетчик на 1.
- Если проверка не пройдена, нужно сбросить счетчик до нуля.

```ts
import { createEvent, createStore, createEffect, sample } from "effector";

export const buttonClicked = createEvent();

export const validateClickFx = createEffect(async () => {
  /* вызов внешнего api */
});

export const $clicksCount = createStore(0);

sample({
  clock: buttonClicked,
  source: $clicksCount,
  filter: (count) => count < 100,
  target: validateClickFx,
});

sample({
  clock: validateClickFx.done,
  source: $clicksCount,
  fn: (count) => count + 1,
  target: $clicksCount,
});

sample({
  clock: validateClickFx.fail,
  fn: () => 0,
  target: $clicksCount,
});
```

### Настройка тестов

Наш основной сценарий следующий:

1. Пользователь нажимает на кнопку.
2. Валидация заканчивается успешно.
3. Счетчик увеличивается на 1.

Давайте протестируем это:

1. Создадим новый экземпляр [Scope](/ru/api/effector/Scope) посредством вызова `fork`.
2. Проверим, что изначально счет равен `0`.
3. Затем сымитируем событие `buttonClicked` с использованием `allSettled` – этот промис будет разрешен после завершения всех вычислений.
4. Проверим, что в конце у нас имеется нужное состояние.

```ts
import { fork, allSettled } from "effector";

import { $clicksCount, buttonClicked, validateClickFx } from "./model";

test("main case", async () => {
  const scope = fork(); // 1

  expect(scope.getState($clicksCount)).toEqual(0); // 2

  await allSettled(buttonClicked, { scope }); // 3

  expect(scope.getState($clicksCount)).toEqual(1); // 4
});
```

Однако в этом тесте есть проблема — он использует реальный API бэкенда. Но поскольку это юнит тест, нам следует каким-то образом подменить этот запрос.

### Кастомные обработчики эффектов

Для того, чтобы нам избежать реального запроса на сервер, мы можем замокать ответ от сервера предоставив кастомный обработчик через конфигурацию `fork`.

```ts
test("main case", async () => {
  const scope = fork({
    handlers: [
      // Список пар [effect, mock handler]
      [validateClickFx, () => true],
    ],
  });

  expect(scope.getState($clicksCount)).toEqual(0);

  await allSettled(buttonClicked, { scope });

  expect(scope.getState($clicksCount)).toEqual(1);
});
```

### Кастомные значения стора

У нас есть еще один сценарий:

1. Счетчик уже больше 100.
2. Пользователь нажимает кнопку.
3. Должен отсутствовать вызов эффекта.

Для этого случая нам потребуется как-то подменить начальное состояние «больше 100» каким-то образом.

Мы также можем предоставить кастомное начальное значение через конфигурацию `fork`.

```ts
test("bad case", async () => {
  const MOCK_VALUE = 101;
  const mockFunction = testRunner.fn();

  const scope = fork({
    values: [
      // Список пар [store, mockValue]
      [$clicksCount, MOCK_VALUE],
    ],
    handlers: [
      // Список пар [effect, mock handler]
      [
        validateClickFx,
        () => {
          mockFunction();

          return false;
        },
      ],
    ],
  });

  expect(scope.getState($clicksCount)).toEqual(MOCK_VALUE);

  await allSettled(buttonClicked, { scope });

  expect(scope.getState($clicksCount)).toEqual(MOCK_VALUE);
  expect(mockFunction).toHaveBeenCalledTimes(0);
});
```

Вот так мы можем протестировать каждый случай использования, который хотим проверить.
