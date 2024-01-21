---
title: Migration guide
redirectFrom:
  - /guides/migration-guide-v23
  - /guides/migration-guide
  - /en/guides/migration-guide
---

This guide covers the steps required to migrate to Effector 23 from a previous version.
Several features were declared deprecated in this release:

- `forward` and `guard` operators
- `greedy` option of `sample` was renamed into `batch`
- "derived" and "callable" unit types are officially separated now
- the ability to use `undefined` as a magic "skip" value in reducers

## Deprecation of `forward` and `guard`

Those operators are pretty old and lived through many releases of Effector.
But all of their use-cases are already covered by `sample` now, so it is their time to go. You will see a deprecation warning in console for every call of those operators in your code.

:::tip
You can migrate from both of them by using the official [Effector's ESLint plugin](https://eslint.effector.dev/), which has `no-forward` and `no-guard` rules with built-in [auto-fix feature](https://eslint.org/docs/latest/use/command-line-interface#fix-problems).
:::

## `greedy` to `batch`

The `sample` operator had `greedy` option to disable updates batching in rare edge-cases.
But the name "greedy" wasn't that obvious for the users, so it is renamed into `batch` and it's signature is reversed.

You will see a deprecation warning in console for every usage of `greedy` option in your code.

:::tip
You can migrate from one to the other by simply running "Find and Replace" from `greedy: true` to `batch: false` in your favorite IDE.
:::

## Separate types for derived and callable units

Derived units now fully separated from "callable/writable" ones:

- Main factories `createEvent` and `createStore` now return types `EventCallable` and `StoreWritable` (because you can call and write to these units at any moment).
- Methods and operators like `unit.map(...)` or `combine(...)` now return types `Event` and `Store`, which are "read-only" i.e. you can only use them as `clock` or `source`, but not as a `target`.
- `EventCallable` type is assignable to `Event`, but not the other way around, same for stores.
- There are also runtime exceptions for types mismatch.

Most likely you will not need to do anything, you will just get better types.

But you might have issues with external libraries, **which are not updated to Effector 23 yet**:

- Most of the libraries are just _accepting_ units as clocks and sources – those cases are ok.
- If some operator from the external library is accepting some unit as a `target`, you still will see an good-old `Event` type in this case, so you will not have a type error here even if there is actually an issue.
- If some _factory_ returns an event, which you are expected to call in your own code, then you will get a type error and you will need to typecast this event to `EventCallable`.

:::tip
If you run into any of these cases, just create an issue in the repo of this library with a request to support Effector 23 version.
Owners of the project will see relevant type errors in their own source code and tests, once they update Effector in their repo.
:::

If you have these issues in your own custom factories or libraries, then you should already see a relevant type errors in the source code of your library.
Just replace `Event` with `EventCallable`, `Store` with `StoreWritable` or `Unit` with `UnitTargetable` everywhere it is relevant (i.e. you are going to call or write into these units somehow).

## Magic `undefined` skip is deprecated

There is an old feature in Effector: `undefined` is used as a "magic" value to skip updates in reducers in rare cases, e.g.

```ts
const $value = createStore(0).on(newValueReceived, (_oldValue, newValue) => newValue);
```

☝️ if `newValue` is `undefined`, then update will be skipped.

The idea of making each mapper and reducer work as a sort of `filterMap` was considered useful in early Effector, but is very rarely used properly, and is confusing and distracting, so it should be deprecated and removed.

To do so each and every store factory now supports special `skipVoid` configuration setting, which controls, how specifically store should handle `undefined` value. If set to `false` – store will use `undefined` as a value.
If set to `true` (deprecated), store will read `undefined` as a "skip update" command and will do nothing.

You will see a warning for each return of undefined in your mappers or reducers in your code, with a requirement to provide an explicit `skipVoid` setting on your store.

:::tip
If you do want to skip store update in certain cases, then it is better to explicitly return previous state, when possible.
:::

It is recommended to use `{skipVoid: false}` at all times, so you are able to use an `undefined` as a normal value.

If you do need `undefined` as a "magic skip" value – then you can use `{skipVoid: true}` to preserve current behavior. You still will get a deprecation warning though, but only one for declaration instead of one for every such update.

The `skipVoid` setting is temporary and only needed as a way to properly deprecate this feature from Effector. In Effector 24 `skipVoid` itself will be deprecated and then removed.

## `useStore` and `useEvent` to `useUnit` in `effector-react`

We merged two old hooks into one, its advantage is that you can pass many units to it at once and it batches all the stores' updates into one single update.

It's safe to just swap the calls of the old hooks with the new one:

```ts
const Component = () => {
  const foo = useStore($foo)
  const bar = useStore($bar)
  const onSubmit = useEvent(triggerSubmit)
}
```
Becomes:
```ts
const Component = () => {
  const foo = useUnit($foo)
  const bar = useUnit($bar)
  const onSubmit = useUnit(triggerSubmit)
}
```
Or shorter:
```ts
const Component = () => {
  const [foo, bar, onSubmit] = useUnit([$foo, $bar, triggerSubmit])
}
```
