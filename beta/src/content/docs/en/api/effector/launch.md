---
title: launch
redirectFrom:
  - /api/effector/launch
  - /docs/api/effector/launch
---

:::info{title="since"}
[effector 20.10.0](https://changelog.effector.dev/#effector-20-10-0)
:::

## Formulae {#launch-formulae}

```ts
launch({ target: unit, params });
```

Low level method for running computation in units (events, effects or stores). Mostly used by library developers for fine-grained control of computations.
