---
title: Тестирование effector
redirectFrom:
  - /ru/guides/testing
---

Тесты для Effector обычно описывают с помощью [Fork API](/ru/api/effector/fork).

Fork создает независимый контекстный экземпляр, который мы можем использовать для эмуляции некоторых конкретных ситуаций или окружений.

## Пример счетчика

Например, у нас есть типичный счетчик, но с асинхронной проверкой через наш бэкэнд. Предположим, у нас следующие требования:

- Когда пользователь нажимает кнопку, мы проверяем, меньше ли текущий счетчик чем 100, и затем проверяем этот клик через наш API бэкэнда.
- Если валидация успешна, увеличиваем счетчик на 1.
- Если проверка не пройдена, нужно сбросить счетчик до нуля.

```ts
import {createEvent, createStore, createEffect, sample} from 'effector'

export const buttonClicked = createEvent()

export const validateClickFx = createEffect(async () => (/* some api call */))

export const $clicksCount = createStore(0)

sample({
  source: $clicksCount,
  clock: buttonClicked,
  filter: count => count < 100,
  target: validateClickFx,
})

sample({
  source: $clicksCount,
  clock: validateClickFx.done,
  fn: count => count + 1,
  target: $clicksCount,
})

sample({
  clock: validateClickFx.fail,
  fn: () => 0,
  target: $clicksCount,
})
```

### Настройка тестов

Наш основной сценарий следующий:

1. Пользователь нажимает на кнопку.
2. Валидация заканчивается успешно.
3. Счетчик увеличивается на 1.
   
Давайте протестируем это:

1. Создадим новый экземпляр [Scope](/ru/api/effector/Scope) посредством вызова `fork`. Мы можем рассматривать его как независимый экземпляр нашего приложения Effector.
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

### Кастомные обработчики эффектов

Однако в этом тесте есть проблема — он использует реальный API бэкенда. Но поскольку это юнит тест, нам следует каким-то образом подменить этот запрос.

Мы можем предоставить кастомный обработчик через конфигурацию `fork`.

```ts
test("main case", async () => {
  const scope = fork({
    handlers: [
      // Список пар [effect, mock handler]
      [validateClickFx, () => mockResponse],
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

          return mockResponse;
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
