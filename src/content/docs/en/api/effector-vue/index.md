---
title: API Reference
---

# effector bindings for Vue

### Top-Level Exports

- [VueEffector(Vue, options?)](./VueEffector)
- [createComponent(ComponentOptions, store?)](./createComponent)

### ComponentOptions API

- [ComponentOptions\<V\>](./ComponentOptions)
  - [effector](./ComponentOptions#effector)

### Vue API

- [Vue](./Vue)
- [$watchAsStore](./Vue#$watchAsStore) _(deprecated)_
- [$store](./Vue#$store) _(deprecated)_

### Hooks

- [useStore(store)](./useStore)
- [useStoreMap({store, keys, fn})](./useStoreMap)
- [useVModel(store)](./useVModel)

### Gate API

- [Gate](./Gate)
- [createGate()](./createGate)
- [useGate(GateComponent, props)](./useGate)
