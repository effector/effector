---
title: Troubleshooting in Effector
description: Error Fixing
---

# Troubleshooting (#troubleshooting)

## Common Errors (#common-errors)

### `store: undefined is used to skip updates` (#store-undefined)

Error message: `store: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option` tells you that you're trying to pass `undefined` value to your store, which might be incorrect behavior.

If you really need to pass `undefined` value to your store, you need to pass an object with the property `skipVoid: false` as the second argument to `createStore`.

```ts
const $store = createStore(0, {
  skipVoid: false,
});
```

### `There is a store without sid in this scope, its value is omitted` (#store-without-sid)

This error is common when working with SSR, it's related to your store missing an `sid` (stable id), which is necessary for correct data hydration from server to client.
To fix this problem, you need to add this `sid`.<br/>
You can do this in several ways:

1. Use [babel](/en/api/effector/babel-plugin/) or [SWC](/en/api/effector/swc-plugin/) plugin
2. Add `sid` manually by passing an object with the `sid` property as the second argument to `createStore`:
   ```ts
   const $store = createStore(0, {
     sid: "unique id",
   });
   ```

Read more [about `sid`, how it works and why it's needed](/en/explanation/sids).

### `scopeBind: scope not found` (#scope-not-found)

This error happens when the scope is lost at some stage of execution and `scopeBind` cannot bind the event or effect to the needed execution scope.<br/>
This error could be caused by:

1. You're using 'scope-less' mode and don't have scopes in your application
2. Your [units were called outside of scope](#using-using-without-use-unit)

Possible solutions:

1. Use `scopeBind` inside effects:

   ```ts
   const event = createEvent();

   // ❌ - don't call scopeBind inside callbacks
   const effectFx = createEffect(() => {
     setTimeout(() => {
       scopeBind(event)();
     }, 1111);
   });

   // ✅ - use scopeBind inside the effect
   const effectFx = createEffect(() => {
     const scopeEvent = scopeBind(event);

     setTimeout(() => {
       scopeEvent();
     }, 1111);
   });
   ```

2. Your units should be called within scope:
   - When working with a framework, use `useUnit`
   - If you're calling an event or effect outside the framework, use `allSettled` and pass the needed `scope` as an argument

If your implementation requires it and you need to get rid of the error, you can pass the property `safe:true` as the second argument to the method.

```ts
const scopeEvent = scopeBind(event, {
  safe: true,
});
```

## Common Issues (#gotchas)

### My State Didn't Change (#my-state-not-changed)

Most likely you're working with scopes and at some point your unit's scope was lost, causing it to run in the global scope.<br/>
This happens when passing units (events or effects) to callbacks of external functions, such as:

- `setTimeout`/`setInterval`
- `addEventListener`
- `webSocket`

To fix this issue, bind your event or effect to the current scope using [`scopeBind`](/en/api/effector/scopeBind):

```ts
const event = createEvent();

// ❌ - this way your event will be called in the global scope
setTimeout(() => {
  event();
}, 1000);

// ✅ - this will work as expected
const scopeEvent = scopeBind(event);
setTimeout(() => {
  scopeEvent();
}, 1000);
```

#### Using Units Without `useUnit` (#using-units-without-use-unit)

You might be using events or effects in frameworks without using the `useUnit` hook, which can also affect proper scope handling.<br/>
To fix this behavior, pass the needed unit to the `useUnit` hook and use the returned value.

:::info{title="Information"}
[Using the `useUnit` hook is the recommended way](/en/guides/best-practices#use-unit) to work with units.
:::

[What is scope loss and why does it happen](/en/api/effector/Scope#scope-loss)

## Haven't Found Your Answer? (#no-answers)

If you haven't found an answer to your question, you can always ask the community:

- RU Telegram - https://t.me/effector_ru
- EN Telegram - https://t.me/effector_en
- Discord - https://discord.gg/t3KkcQdt
- Reddit — [reddit.com/r/effectorjs](https://www.reddit.com/r/effectorjs/)
