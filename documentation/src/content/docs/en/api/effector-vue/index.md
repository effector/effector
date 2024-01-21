---
title: effector-vue
redirectFrom:
  - /api/effector-vue
  - /docs/api/effector-vue
---

Effector binginds for Vue.

### Top-Level Exports

- [VueEffector(Vue, options?)](/en/api/effector-vue/VueEffector)
- [createComponent(ComponentOptions, store?)](/en/api/effector-vue/createComponent)
- [EffectorScopePlugin({scope, scopeName?})](/en/api/effector-vue/EffectorScopePlugin)

### ComponentOptions API

- [ComponentOptions\<V\>](/en/api/effector-vue/ComponentOptions)
  - [effector](/en/api/effector-vue/ComponentOptions#effector)

### Hooks

- [useUnit(shape)](/en/api/effector-vue/useUnit)
- [useStore(store)](/en/api/effector-vue/useStore)
- [useStoreMap({store, keys, fn})](/en/api/effector-vue/useStoreMap)
- [useVModel(store)](/en/api/effector-vue/useVModel)

### Gate API

- [Gate](/en/api/effector-vue/Gate)
- [createGate()](/en/api/effector-vue/createGate)
- [useGate(GateComponent, props)](/en/api/effector-vue/useGate)

## Import map

Package `effector-vue` provides couple different entry points for different purposes:

- [effector-vue/composition](/en/api/effector-vue/module/composition)
- [effector-vue/ssr](/en/api/effector-vue/module/ssr)
