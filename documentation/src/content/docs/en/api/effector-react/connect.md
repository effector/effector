---
title: connect
redirectFrom:
  - /api/effector-react/connect
  - /docs/api/effector-react/connect
---

```ts
import { connect } from "effector-react";
```

:::warning{title="Deprecated"}
since [effector-react 23.0.0](https://changelog.effector.dev/#effector-react-23-0-0).

Consider using [hooks api](/en/api/effector-react/index#hooks) in modern projects.
:::

Wrapper for [useStore](/en/api/effector-react/useStore) to use during migration from redux and class-based projects. Will merge store value fields to component props.

# Methods (#methods)

## `connect($store)(Component)` (#methods-connect-store-component)

### Formulae (#methods-connect-store-component-formulae)

```ts
connect($store: Store<T>)(Component): Component
```

### Arguments (#methods-connect-store-component-arguments)

1. `$store` ([Store](/en/api/effector/Store)): store or object with stores

### Returns (#methods-connect-store-component-returns)

`(Component) => Component`: Function, which accepts react component and return component with store fields merged into props

## `connect(Component)($store)` (#methods-connect-component-store)

### Formulae (#methods-connect-component-store-formulae)

```ts
connect(Component)($store: Store<T>): Component
```

### Arguments (#methods-connect-component-store-arguments)

1. `Component` (React.ComponentType): react component

### Returns (#methods-connect-component-store-returns)

`($store: Store<T>) => Component`: Function, which accepts a store and returns component with store fields merged into props
