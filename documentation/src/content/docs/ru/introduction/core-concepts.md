---
title: Основные концепции
lang: ru
description: Основные концепции - стор, эффект, событие и как все это работает вместе
redirectFrom:
  - /ru/essentials/reactivity
  - /ru/docs/reactivity
---

# Основные концепции (#core-concepts)

Effector – это библиотека для работы с состоянием приложения, которая позволяет разработчикам создавать масштабируемые и предсказуемые реактивные приложения.

В основе Effector лежит концепция **юнитов** - независимых строительных блоков приложения. Каждый юнит: [стор](/ru/essentials/manage-states), [событие](/ru/essentials/events) или [эффект](/ru/essentials/work-with-async), выполняет свою конкретную роль.
<br/>
Объединяя юниты, разработчики могут создавать сложные, но понятные потоки данных в приложении.

Разработка с effector строится по нескольким принципам:

- **Декларативность** – вы описываете _что_ должно произойти, а не _как_ это должно работать
- **Реактивность** – вам не нужно в ручную синхронизировать изменения, все работает автоматически
- [**Статическая инициализация**](/ru/resources/static-initialization) – вся логика работы с юнитами должна быть описана статично на уровне модуля

Effector использует умную систему отслеживания зависимостей, которая гарантирует, что при изменении данных обновятся только действительно зависимые части приложения.

## Юниты (#units)

Юнит - это базовое понятие в Effector. [Store](/ru/api/effector/Store), [Event](/ru/api/effector/Event) и [Effect](/ru/api/effector/Effect) – это все юниты, то есть базовые строительные блоки для создания бизнес-логики приложения. Каждый юнит представляет собой независимую сущность, которая может быть:

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
```

### Событие (##event)

Событие ([Event](/ru/api/effector/Event)) — Событие в Effector представляет собой точку входа в реактивный поток данных, проще говоря это способ сказать приложению "что-то произошло".

#### Особенности события (#event-features)

- Простота: События в Effector являются минималистичными и легко создаются с помощью [createEvent](/ru/api/effector/createEffect).
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

### Стор (#store)

Стор ([Store](/ru/api/effector/Store)) — это место, где живут данные вашего приложения. Он представляет собой реактивное значение, обеспечивающую строгий контроль над мутациями и потоком данных.

#### Особенности сторов (#store-features)

- У вас может быть столько сторов, сколько вам нужно
- Стор поддерживает реактивность — изменения автоматически распространяются на все подписанные компоненты
- Effector оптимизирует ререндеры компонентов, подписанных на сторы, минимизируя лишние обновления
- Данные в сторе иммутабельнные
- Здесь нет `setState`, изменение состояния происходит через события

```ts
import { createStore, createEvent } from "effector";

// Создаем событие
const superAdded = createEvent();

// Создаем стор
const $supers = createStore([
  {
    name: "Человек-паук",
    role: "hero",
  },
  {
    name: "Зеленый гоблин",
    role: "villain",
  },
]);

// Обновляем стор при срабатывании события
$supers.on(superAdded, (supers, newSuper) => [...supers, newSuper]);

// Вызываем событие
superAdded({
  name: "Носорог",
  role: "villain",
});
```

### Эффект (#effect)

Эффект ([Effect](/ru/api/effector/Effect)) — Эффекты предназначены для обработки побочных действий — то есть для взаимодействия с внешним миром, например с http запросами, или для работы с таймерами.<br/>

#### Особенности эффекта (#effect-features)

- У эффекта есть встроенные состояния `pending` и события `done`, `fail`, которые облегчают отслеживание выполнения операций.
- Логика, связанная с взаимодействием с внешним миром, вынесена за пределы основной логики приложения. Это упрощает тестирование и делает код более предсказуемым.
- Может быть как асинхронным, так и синхронным

```js
import { createEffect } from "effector";

const fetchUserFx = createEffect(async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  return response.json();
});

// Подписываемся на результат эффекта
fetchUserFx.done.watch(({ result }) => console.log("Данные пользователя:", result));
// Если эффект выкинет ошибку, то мы отловим ее при помощи события fail
fetchUserFx.fail.watch(({ error }) => console.log("Произошла ошибка! ", error));

// Запускаем эффект
fetchUserFx(1);
```

## Реактивность (#reactivity)

Как мы говорили в самом начале effector основан на принципах реактивности, где изменения **автоматически** распространяются через приложение. При этом вместо императивного подхода, где вы явно указываете как и когда обновлять данные, вы декларативно описываете связи между различными частями приложения.

### Как работает реактивность? (#how-reactivity-works)

Рассмотрим пример из части про сторы, где мы имеем стор с массивом суперлюдей. Допустим у нас появилось новое требование это выводить отдельно друг от друга героев и злодеев. Реализовать это будет очень просто при помощи производных сторов:

```ts
import { createStore, createEvent } from "effector";

// Создаем событие
const superAdded = createEvent();

// Создаем стор
const $supers = createStore([
  {
    name: "Человек-паук",
    role: "hero",
  },
  {
    name: "Зеленый гоблин",
    role: "villain",
  },
]);

// Создали производные сторы, которые зависят от $supers
const $superHeroes = $supers.map((supers) => supers.filter((sup) => sup.role === "hero"));
const $superVillains = $supers.map((supers) => supers.filter((sup) => sup.role === "villain"));

// Обновляем стор при срабатывании события
$supers.on(superAdded, (supers, newSuper) => [...supers, newSuper]);

// Добавляем супера
superAdded({
  name: "Носорог",
  role: "villain",
});
```

В этом примере мы создали производные сторы `$superHeroes` и `$superVillains`, которые будут зависеть от оригинального `$supers`. При этом изменяя оригинальный стор, у нас также будут изменяться и производные – это и есть реактивность!

## Как это все работает вместе? (#how-units-work-together)

А теперь давайте посмотрим как все это работает вместе.
Все наши концепции объединяются в мощный, реактивный поток данных:

1. **Событие** инициирует изменения (например, нажатие кнопки).
2. Эти изменения влияют на **стор**, обновляя состояние приложения.
3. При необходимости, **Эффекты** выполняют побочные действия, такие как взаимодействие с сервером.

Для примера мы все также возьмем код выше с суперами, однако немного изменим его добавив эффект с загрузкой первоначальных данных, как и в реальных приложениях:

```ts
import { createStore, createEvent, createEffect } from "effector";

// определяем наши сторы
const $supers = createStore([]);
const $superHeroes = $supers.map((supers) => supers.filter((sup) => sup.role === "hero"));
const $superVillains = $supers.map((supers) => supers.filter((sup) => sup.role === "villain"));

// создаем события
const superAdded = createEvent();

// создаем эффекты для получения данных
const getSupersFx = createEffect(async () => {
  const res = await fetch("/server/api/supers");
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  return data;
});

// создаем эффекты для получения данных
const saveNewSuperFx = createEffect(async (newSuper) => {
  // симуляция сохранения нового супера
  await new Promise((res) => setTimeout(res, 1500));
  return newSuper;
});

// когда загрузка завершилась успешно, устанавливаем данные
$supers.on(getSupersFx.done, ({ result }) => result);
// добавляем нового супера
$supers.on(superAdded, (supers, newSuper) => [...supers, newSuper]);

// вызываем загрузку данных
getSupersFx();
```

:::info{title="Почему $ и Fx?"}
Это рекомендации команды effector использовать `$` для сторов и `fx` для эффектов.
Более подробно об этом можно почитать [здесь](/ru/guides/best-practices#naming).
:::

### Связываем юниты в единый поток (#adding-sample)

Все что нам осталось сделать это как-то связать вызов события `superAdded` и его сохранение `saveNewSuperFx`, а также после успешного сохранения запросить свежие данные с сервера.
<br/>
Здесь нам на помощь приходит метод [`sample`](/ru/essentials/unit-composition). Если юниты это строительные блоки, то `sample` – это клей, который связывает ваши юниты вместе.

:::info{title="о sample"}
`sample` является основным методом работы с юнитами, который позволяет декларативно запустить цепочку действий.
:::

```ts ins={27-37}
import { createStore, createEvent, createEffect, sample } from "effector";

const $supers = createStore([]);
const $superHeroes = $supers.map((supers) => supers.filter((sup) => sup.role === "hero"));
const $superVillains = $supers.map((supers) => supers.filter((sup) => sup.role === "villain"));

const superAdded = createEvent();

const getSupersFx = createEffect(async () => {
  const res = await fetch("/server/api/supers");
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  return data;
});

const saveNewSuperFx = createEffect(async (newSuper) => {
  // симуляция сохранения нового супера
  await new Promise((res) => setTimeout(res, 1500));
  return newSuper;
});

$supers.on(getSupersFx.done, ({ result }) => result);
$supers.on(superAdded, (supers, newSuper) => [...supers, newSuper]);

// здесь мы говорим, при запуске clock вызови target и передай туда данные
sample({
  clock: superAdded,
  target: saveNewSuperFx,
});

// когда эффект saveNewSuperFx завершится успешно, то вызови getSupersFx
sample({
  clock: saveNewSuperFx.done,
  target: getSupersFx,
});

// вызываем загрузку данных
getSupersFx();
```

Вот так вот легко и незамысловато мы написали часть бизнес-логики нашего приложения, а часть с отображением этих данных оставили на UI фреймворк.
