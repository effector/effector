---
id: effect
title: Effect
---

_Effect_ is a container for async function.

It can be safely used in place of the original async function.

The only requirement for function:

- **Should** have zero or one argument

#### Arguments

1. `params` (_Params_): parameters

#### Returns

(_`Future`_)

### Effect Methods

- [`use(fn)`](#use)
- [`watch(watcher)`](#watch)
- [`prepend(fn)`](#prepend)

### Effect Properties

- [`done`](#done)
- [`fail`](#fail)

## Effect Methods

### <a id='use'></a>[`use(fn)`](#use)

#### Returns

(_`Effect`_): A container for async function.

<hr>

### <a id='watch'></a>[`watch(watcher)`](#watch)

#### Returns

(_`Subscription`_): Unsubscribe function

<hr>

### <a id='prepend'></a>[`prepend(fn)`](#prepend)

#### Returns

(_`Event`_): An intention to change state.

<hr>

## Effect Properties
