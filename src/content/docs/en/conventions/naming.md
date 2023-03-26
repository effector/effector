---
id: naming
title: Naming
description: Naming conventions for stores, events and effects
---

First of all, to avoid any misconceptions and get better developer experience for all of us. This document contains several pretty simple rules to keep consistency between different projects written on effector.

## Stores naming

Your stores should be distinguished by a `$`. The choice between prefix or postfix is mostly a matter of personal preference. This should be done to have a better search experience in your IDE.

```js
const $user = createStore({});
```

## Effect naming

It is recommended to add the `Fx` postfix to the end of your effects. It will let you differentiate your effects from the events.

```js
const fetchUserFx = createEffect(async () => {
  const res = await fetch("my pretty url");
  return res.json();
});
```

## Event naming

There are no any real preferred rules on that. But the proposal is to name events, which directly trigger store updates like it has already done in the past.

```js
const emailChanged = createEvent();

$user.on(emailChanged, (state, email) => ({
  ...state,
  email,
}));
```
