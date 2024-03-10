---
title: launch
redirectFrom:
  - /api/effector/launch
  - /docs/api/effector/launch
---

```ts
import { launch, type Unit, type Node } from "effector";
```

:::info{title="since"}
[effector 20.10.0](https://changelog.effector.dev/#effector-20-10-0)
:::

# Methods (#methods)

## `launch({ target, params })` (#methods-launch-config)

Low level method for running computation in units (events, effects or stores). Mostly used by library developers for fine-grained control of computations.

### Formulae (#methods-launch-config-formulae)

```ts
launch({
  target,
  params,
  defer?: boolean,
  page?: any,
  scope?: Scope,
  meta?: Record<string, any>,
}): void
```

### Arguments (#methods-launch-config-arguments)

TBD

### Returns (#methods-launch-config-returns)

`void`

## `launch(unit, params)` (#methods-launch-unit-params)

### Formulae (#methods-launch-unit-params-formulae)

```ts
launch(unit: Unit | Node, params: T): void
```

### Returns (#methods-launch-unit-params-returns)

`void`
