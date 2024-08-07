---
title: Именование
description: Соглашения именований для сторов, событий и эффектов
redirectFrom:
  - /ru/docs/conventions/naming
  - /ru/conventions/naming
---

Прежде всего, для того, чтобы избежать каких-либо недоразумений и обеспечить лучший опыт разработки для всех нас. Этот документ содержит несколько довольно простых правил, которым следует придерживаться для поддержания согласованности между различными проектами, написанными с использованием effector.

## Названия для Сторов (Stores naming)

Ваши сторы должны содержать знак `$`. Выбор между префиксом или постфиксом в основном является вопросом личных предпочтений. Это необходимо для улучшения опыта поиска в вашей IDE.

```js
const $user = createStore({});
```

## Названия для Эффектов (Effect naming)

Рекомендуется добавлять постфикс `Fx` в конец ваших эффектов. Это позволит вам отличать ваши эффекты от событий.

```js
const fetchUserFx = createEffect(async () => {
  const res = await fetch("my pretty url");
  return res.json();
});
```

## Названия для Событий (Event naming)

Никаких конкретных правил для этого нет. Однако мы предлагаем вам называть события, которые напрямую запускают обновления сторов, как будто они уже произошли.

```js
const emailChanged = createEvent();

$user.on(emailChanged, (state, email) => ({
  ...state,
  email,
}));
```
