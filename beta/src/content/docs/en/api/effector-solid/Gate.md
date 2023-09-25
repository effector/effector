---
title: Effector Solid Gate
description: Effector Solid
redirectFrom:
  - /api/effector-solid/Gate
  - /docs/api/effector-solid/gate
---

_Gate_ is a hook for conditional rendering, based on current value (or values) in props. An example of a problem that Gate can solve – you can put together all required data, when component was mounted. Or show another component if there is not enough data in props. Gate also looks good for Routing or animation.

This allows you to send props back to _Store_ to create feedback loop.

Gate can be used via [useGate](/en/api/effector-solid/useGate) hook or as component with props (`<Gate history={history} />`). Gate stores and events can be used in the application as regular units

Gate can have two states:

- **Open**, which means mounted
- **Closed**, which means unmounted

## Gate Properties {#Gate-properties}

## `state` {#Gate-state}

:::warning{title="Important"}
Do not modify `state` value! It is [derived store](/en/api/effector/Store#readonly) and should be in predictable state.
:::

`Store<Props>`: [DerivedStore](/en/api/effector/Store#readonly) with current state of the given gate. The state comes from the second argument of [useGate](/en/api/effector-solid/useGate) and from props when rendering gate as a component

## `open` {#Gate-open}

:::info{title="Important"}
Do not manually call this event. It is an event that depends on a Gate state.
:::

[Event<Props>](/en/api/effector/Event): Event which will be called during gate mounting

## `close` {#Gate-close}

:::info{title="Important"}
Do not manually call this event. It is an event that depends on a Gate state.
:::

[Event<Props>](/en/api/effector/Event): Event which will be called during a gate unmounting.

## `status` {#Gate-status}

:::warning{title="Important"}
Do not modify `status` value! It is [derived store](/en/api/effector/Store#readonly) and should be in predictable state.
:::

`Store<boolean>`: Boolean [DerivedStore](/en/api/effector/Store#readonly), which show if given gate is mounted.
