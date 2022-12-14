---
title: connect
lang: en-US
---

# connect

::: info since
[effector-react 21.0.6](https://changelog.effector.dev/#effector-21-0-6)
:::

Wrapper for [useStore](/api/effector-react/useStore.md) to use during migration from redux and class-based projects. Will merge store value fields to component props.

::: danger Recommendation
Consider using [hooks api](/api/effector-react/index.md#hooks) in modern projects.
:::

## `connect(Store)(Component)` {#connect-store-component}

### Formulae {#connect-store-component-formulae}

```ts
connect(Store)(Component): Component
```

### Arguments {#connect-arguments}

1. `Store` ([Store](/api/effector/Store.md)): store or object with stores

### Returns {#connect-store-component-returns}

`(Component) => Component`: Function, which accepts react component and return component with store fields merged in props

## `connect(Component)(Store)` {#connect-component-store}

### Formulae {#connect-component-store-formulae}

```ts
connect(Component)(Store): Component
```

### Arguments {#connect-component-store-arguments}

1. `Component` (React.ComponentType): react component

### Returns {#connect-component-store-returns}

`(Store) => Component`: Function, which accepts a store and return component with store fields merged in props
