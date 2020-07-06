---
id: scopeBind
title: scopeBind
hide_title: true
---

# scopeBind

```ts
scopeBind<T>(event: Event<T>): (payload: T) => void
```

A helper to call events within a scope (see [_fork_](fork)). Effector supports imperative event calling inside watchers but sometimes you should bind events to the scope explicitly, e.g. when calling events within a setTimeout/setInterval callbacks.

### Arguments

1. `event` [_Event_](Event.md) to be bound to the scope

### Example

We are going to call `changeLocation` inside `history.listen` callback so there is no way for effector to associate event with corresponding scope and we should explicitly bind event to scope using `scopeBind`

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

[See full example](https://github.com/zerobias/effector/blob/master/examples/react-ssr/src/app.tsx#L128)
