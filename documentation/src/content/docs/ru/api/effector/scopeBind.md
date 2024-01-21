---
title: scopeBind
description: Метод привязки события или эффекта к scope для последующего вызова
lang: ru
---

Метод привязки события или эффекта к [scope](/ru/api/effector/Scope) для последующего вызова. <br/>

Иногда необходимо привязать события к scope явно, например, при вызове событий в рамках колбэков setTimeout/setInterval

## Формула

```ts
scopeBind<T>(event: Event<T>): (payload: T) => void
```

### Аргументы

1. **`event`**: [Событие](/ru/api/effector/Event) для привязки к scope

## Пример

Мы собираемся вызвать `changeLocation` внутри колбэка `history.listen`, поэтому у эффектора нет возможности связать событие с соответствующей областью видимости, и мы должны явно привязать событие к области видимости с помощью `scopeBind`

```js
const installHistory = app.createEvent<any>()
const changeLocation = app.createEvent<string>()

installHistory.watch(history => {

  const locationUpdate = scopeBind(changeLocation)
  history.listen(location => {
    locationUpdate(location.pathname)
  })
})
```

[Полный пример](https://github.com/effector/effector/blob/master/examples/react-ssr/src/app.tsx#L128)
