---
id: gate
title: Gate
---

_Gate_ is a hook for conditional rendering, based on current value (or values) in props. An example of a problem that Gate can solve - you can put together all required data, when component was mounted.

This allows you to send props back to _Store_ to create feedback loop.

Gate can be used via [useGate](./useGate.md) hook. Gate stores and events can be used in the application as regular units

Gate can have two states:

- **Open**, which means mounted
- **Closed**, which means unmounted

<hr />

## Gate Properties

### `state`

Store with current state of given gate. State came from second argument of [useGate](./useGate.md) and from props when rendering gate as component

#### Returns

(`Store<Props>`)

<hr />

### `open`

#### Returns

Event which will be called during gate mounting

(`Event<Props>`)

<hr />

### `close`

#### Returns

Event which will be called during gate unmounting.

(`Event<Props>`)

<hr />

### `status`

Boolean store which show if given gate is mounted.

#### Returns

(`Store<boolean>`)

<hr />
