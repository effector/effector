---
title: Gate
lang: en-US
---

# Gate

_Gate_ is a hook for conditional rendering, based on current value (or values) in props. An example of a problem that Gate can solve - you can put together all required data, when component was mounted.

This allows you to send props back to _Store_ to create feedback loop.

Gate can be used via [useGate](/api/effector-vue/useGate.md) hook. Gate stores and events can be used in the application as regular units

Gate can have two states:

- **Open**, which means mounted
- **Closed**, which means unmounted

## Gate Properties {#Gate-properties}

## `state` {#Gate-state}

::: warning Important
Do not modify `state` value! It is [derived store](/api/effector/Store.md#derived-store) and should be in predictable state.
:::

`Store<Props>`: [`DerivedStore`](/api/effector/Store.md#derived-store) with current state of given gate. State came from second argument of [useGate](/api/effector-vue/useGate.md) and from props when rendering gate as component

## `open` {#Gate-open}

::: info Important
Do not manually call this event. It is event that depends on a Gate state.
:::

[`Event<Props>`](/api/effector/Event.md): Event which will be called during gate mounting

## `close` {#Gate-close}

::: info Important
Do not manually call this event. It is event that depends on a Gate state.
:::

[`Event<Props>`](/api/effector/Event.md): Event which will be called during gate unmounting.

## `status` {#Gate-status}

::: warning Important
Do not modify `status` value! It is [derived store](/api/effector/Store.md#derived-store) and should be in predictable state.
:::

`Store<boolean>`: Boolean [`DerivedStore`](/api/effector/Store.md#derived-store) which show if given gate is mounted.
