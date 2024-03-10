---
title: Effector Solid Gate
description: Effector Solid
redirectFrom:
  - /api/effector-solid/Gate
  - /docs/api/effector-solid/gate
---

_Gate_ is a hook for conditional rendering, based on current value (or values) in props.
An example of a problem that Gate can solve – you can put together all required data when component was mounted, or show another component if there is not enough data in props.
Gate also looks good for Routing or animation.

This allows you to send props back to _Store_ to create a feedback loop.

Gate can be used via the [useGate](/en/api/effector-solid/useGate) hook or as a component with props (`<Gate history={history} />`).
Gate stores and events can be used in the application as regular units.

Gate can have two states:

- **Open**, which means mounted
- **Closed**, which means unmounted

# Properties (#properties)

## `.state` Store (#properties-state)

:::warning{title="Important"}
Do not modify the `state` value! It is a [derived store](/en/api/effector/Store#readonly) and should be kept in a predictable state.
:::

`Store<Props>`: [Derived Store](/en/api/effector/Store#readonly) with the current state of the given gate. The state comes from the second argument of [useGate](/en/api/effector-solid/useGate) and from props when rendering the gate as a component.

## `.open` Event (#properties-open)

:::info{title="Important"}
Do not manually call this event. It is an event that depends on a Gate's state.
:::

[Event<Props>](/en/api/effector/Event): Event which will be called during the gate's mounting.

## `.close` Event (#properties-close)

:::info{title="Important"}
Do not manually call this event. It is an event that depends on a Gate's state.
:::

[Event<Props>](/en/api/effector/Event): Event which will be called during the gate's unmounting.

## `.status` Store (#properties-status)

:::warning{title="Important"}
Do not modify the `status` value! It is a [derived store](/en/api/effector/Store#readonly) and should be in a predictable state.
:::

`Store<boolean>`: Boolean [Derived Store](/en/api/effector/Store#readonly), which shows if the given gate is mounted.
