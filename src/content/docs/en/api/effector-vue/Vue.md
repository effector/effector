---
title: Vue
---

Methods available on `Vue` prototype after you enable this plugin.

## `$watchAsStore(expOrFn, options?)` _(deprecated)_ {#watch-as-store}

### Arguments {#watch-as-store-arguments}

1. `expOrFn` (_string | Function_): Expression only accepts dot-delimited paths. For more complex expressions, use a function instead.
2. `options`? (_Object_)

- `deep`? (_boolean_)
- `immediate`? (_boolean_)

### Returns {#watch-as-store-returns}

(_`Store`_)

## `$store(expOrFn)` _(deprecated)_ {#store-fn}

### Arguments {#store-fn-arguments}

1. `expOrFn` (_string | Function_): Expression only accepts dot-delimited paths. For more complex expressions, use a function instead.

### Returns {#store-fn-returns}

(_`Store`_)
