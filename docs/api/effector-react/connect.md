---
id: connect
title: connect
---

Wrapper for [useStore](./useStore.md) to use during migration from redux and class-based projects. Will merge store value fields to component props

:::danger
Consider using [hooks api](./index.md#hooks) in modern projects
:::

## `connect(Store)(Component): Component`

:::note since
effector-react 21.0.6
:::

**Arguments**

1. `Store` ([Store](../effector/Store.md)): store or object with stores

**Returns**

`(Component) => Component`: Function, which accepts react component and return component with store fields merged in props

## `connect(Component)(Store): Component`

**Arguments**

1. `Component` (React.ComponentType): react component

**Returns**

`(Store) => Component`: Function, which accepts a store and return component with store fields merged in props
