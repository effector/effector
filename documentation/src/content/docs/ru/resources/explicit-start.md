---
title: Явный запуск приложения
description: Рассказываем почему важно иметь явное событие для старта вашего приложения и как это помогает контролировать жизненный цикл приложения.
---

# Явный запуск приложения (#explicit-start)

В effector [события](/ru/api/effector/Event) не могут быть вызваны неявно. Это дает вам больше контроля над жизненным циклом приложения и помогает избежать непредвиденного поведения.

## Пример (#the-code)

Самый простой пример это вы можете создать что-то вроде события `appStarted` и вызвать его сразу после инициализации приложения. Давайте пройдемся по коду построчно и объясним, что здесь происходит.

1. Создаем `appStarted` событие.

Оно будет вызываться при запуске приложения.

```ts {3}
import { createEvent, fork, allSettled } from 'effector';

const appStarted = createEvent();

const scope = fork();

await allSettled(appStarted, { scope });
```

2. Создайте [изолированный контекст](/ru/advanced/work-with-scope) приложения с помощью `fork()`. Это позволит создать скоуп, который будет использоваться по всему приложению.

```ts {5}
import { createEvent, fork, allSettled } from 'effector';

const appStarted = createEvent();

const scope = fork();

await allSettled(appStarted, { scope });
```

3. Вызовите стартовое событие `appStarted` в изолированном контексте с помощью [`allSettled()`](/ru/api/effector/allSettled). Это гарантирует, что все вычисления, связанные с этим событием, будут завершены до продолжения выполнения кода.

```ts {7}
import { createEvent, fork, allSettled } from 'effector';

const appStarted = createEvent();

const scope = fork();

await allSettled(appStarted, { scope });
```

## Зачем это нужно ? (#reasons)

Основная цель такого подхода – это позволить нам контролировать жизненный цикл приложения. Это помогает избежать неожиданного поведения и сделать ваше приложение более предсказуемым. Допустим, у нас есть модуль со следующим кодом:

```ts
// app.ts
import { createStore, createEvent, sample, scopeBind } from 'effector';

const $counter = createStore(0);
const increment = createEvent();

const startIncrementationIntervalFx = createEffect(() => {
  const boundIncrement = scopeBind(increment, { safe: true });

  setInterval(() => {
    boundIncrement();
  }, 1000);
});

sample({
  clock: increment,
  source: $counter,
  fn: (counter) => counter + 1,
  target: $counter,
});

startIncrementationIntervalFx();
```

### Тесты (#tests)

Мы верим, что любое серьезное приложение должно быть покрыто тестами, поэтому мы должны изолировать жизненный цикл приложения внутри конкретного теста. В случае неявного старта (старта логики модели при выполнении модуля) будет невозможно протестировать поведение приложения в разных состояниях.

:::info{title="scopeBind"}
[`scopeBind`](/ru/api/effector/scopeBind) позволяет привязать [событие](/ru/api/effector/Event) к конкретному [скоупу](/ru/api/effector/Scope), больше деталей можете найти на странице [Изолированные контексты](/ru/advanced/work-with-scope), а также [Потеря скоупа](/ru/guides/scope-loss).
:::

Теперь, чтобы протестировать приложение нам нужно замокать функцию `setInterval` и проверить, что значение `$counter` корректно через определенное время.

```ts
// app.test.ts
import { $counter } from './app';

test('$counter should be 5 after 5 seconds', async () => {
  // ... test
});

test('$counter should be 10 after 10 seconds', async () => {
  // ... test
});
```

Но `$counter` будет увеличиваться сразу после загрузки модуля `app.ts` и у нас просто не будет возможности протестировать поведение приложения в разных состояниях.

### SSR (#ssr)

Еще одна причина использовать явный старт приложения – это серверный рендеринг (SSR). В этом случае нам нужно запускать логику приложения при каждом запросе пользователя, и это будет невозможно сделать с неявным стартом.

```ts
// server.ts
import * as app from './app';

function handleRequest(req, res) {
  // ...
}
```

Но опять же, счетчик начнет свое выполнения сразу же после выполнения модуля (инициализации приложения), и мы не сможем запускать логику приложения при каждом запросе пользователя.

### Добавим явный старт (#adding-explicit-start)

Теперь давайе перепишем код и добавим явный старт приложения:

```ts del={22} ins={24-28}
// app.ts
import { createStore, createEvent, sample, scopeBind } from 'effector';

const $counter = createStore(0);
const increment = createEvent();

const startIncrementationIntervalFx = createEffect(() => {
  const boundIncrement = scopeBind(increment, { safe: true });

  setInterval(() => {
    boundIncrement();
  }, 1000);
});

sample({
  clock: increment,
  source: $counter,
  fn: (counter) => counter + 1,
  target: $counter,
});

startIncrementationIntervalFx();

const appStarted = createEvent();
sample({
  clock: appStarted,
  target: startIncrementationIntervalFx,
});
```

Вот и все, теперь мы можем тестировать поведение приложения в разных состояниях и запускать логику приложения при каждом запросе пользователя.

:::tip{title="Не ограничивайтесь стартом"}
В реальных приложениях лучше добавлять не только явный старт приложения, но и явную остановку приложения. Это поможет избежать утечек памяти и непредвиденного поведения.
Также вы можете реализовывать такое поведение и для фич вашего приложения, чтобы контролировать жизненный цикл каждой фичи отдельно.
:::

В примерах выше мы использовали одно событие `appStarted` для запуска всей логики приложения. В реальных приложениях лучше использовать более гранулярные события для запуска конкретной части приложения.

## Связанные API и статьи (#related-api-and-docs)

- **API**

  - [`Scope`](/ru/api/effector/Scope) - Описание скоупа и его методов
  - [`scopeBind`](/ru/api/effector/scopeBind) - Метод для привязки юнита к скоупу
  - [`fork`](/ru/api/effector/fork) - Оператор для создания скоупа
  - [`allSettled`](/ru/api/effector/allSettled) - Метод для вызова юнита в предоставленном скоупе и ожидания завершения всей цепочки эффектов

- **Статьи**
  - [Что такое потеря скоупа и как исправить эту проблему](/ru/guides/scope-loss)
  - [Гайд по работе с SSR](/ru/guides/server-side-rendering)
  - [Гайд по тестированию](/ru/guides/testing)
  - [Как мыслить в парадигме Effector](/ru/resources/mindset)
