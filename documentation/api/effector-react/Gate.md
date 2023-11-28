---
id: gate
title: Gate
---

_Gate_ is a hook for conditional rendering, based on current value (or values) in props. An example of a problem that Gate can solve - you can put together all required data, when component was mounted. Or show another component, if there is not enough data in props. Gate also looks good for Routing or animation, like ReactTransitionGroup.

This allows you to send props back to _Store_ to create feedback loop.

Gate can be used via [useGate](./useGate.md) hook or as component with props (`<Gate history={history} />`). Gate stores and events can be used in the application as regular units

Gate can have two states:

- **Open**, which means mounted
- **Closed**, which means unmounted

## Gate Properties

## `state`

`Store<Props>`: [`DerivedStore`](../effector/Store.md#derived-store) with current state of given gate. State came from second argument of [useGate](./useGate.md) and from props when rendering gate as component

## `open`

[`Event<Props>`](../effector/Event.md): Event which will be called during gate mounting

## `close`

[`Event<Props>`](../effector/Event.md): Event which will be called during gate unmounting.

## `status`

`Store<boolean>`: Boolean [`DerivedStore`](../effector/Store.md#derived-store) which show if given gate is mounted.
