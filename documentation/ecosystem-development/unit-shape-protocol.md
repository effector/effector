---
id: unit-shape-protocol
title: Protocol @@unitShape
description: Re-use UI-library bindings for your own Effector based libraries
---

:::note since
[effector-react 22.4.0](https://changelog.effector.dev/#effector-react-22-4-0), effector-solid 0.22.7
:::

Effector provides a way to use units ([Stores](/api/effector/Store.md), [Events](/api/effector/Event.md), [Effects](/api/effector/Effect.md)) in UI libraries with a special bindings like `effector-react`, `effector-solid`, etc. Normally, they allow to bind any shape of units to a UI-framework:

```ts
import {createStore} from 'effector'
import {useUnit} from 'effector-react'

const $value = createStore('Hello!')

const Component = () => {
  const {value} = useUnit({value: $value})

  return <p>{value}</p>
}
```

But what if you want to create your own library on top of Effector with some custom entities? For example, you want to create a router library with a custom `Route` entity, and you want to allow users to use it with `effector-react` bindings:

```ts
import {createRoute} from 'my-router-library'
import {useUnit} from 'effector-react'

const mainPageRoute = createRoute(/* ... */)

const Component = () => {
  const {params} = useUnit(mainPageRoute)

  return <p>{params.name}</p>
}
```

It is possible with the `@@unitShape` protocol. It allows to define a shape of a unit in your custom entity, and then use it in UI libraries. Just add field `@@unitShape` with a function that return shape of units to your entity:

```ts
function createRoute(/* ... */) {
  const $params = createStore(/* ... */)

  return {
    '@@unitShape': () => ({
      params: $params,
    }),
  }
}
```

## FAQ

---

Q: How frequently `@@unitShape`-function is called?

A: As many times as `useUnit` itself is called - it depends on a UI-library. For example, `effector-react` calls it as any other hook - once per component render, but `effector-solid` calls `useUnit` once per component mount.

---

Q: How can I know what UI-library is used for particular `@@unitShape` call?

A: You cannot. `@@unitShape` has to be universal for all UI-libraries either has to check what UI-library is used inside by UI-library methods (like `Context` in React or Solid).
