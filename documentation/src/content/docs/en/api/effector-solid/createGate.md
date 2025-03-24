---
title: createGate
description: Creates a gate to consume data from view
redirectFrom:
  - /api/effector-solid/createGate
  - /docs/api/effector-solid/createGate
---

# Methods (#methods)

## `createGate(config)` (#methods-createGate-config)

### Formulae (#methods-createGate-config-formulae)

```ts
createGate(config): Gate
```

### Arguments (#methods-createGate-config-arguments)

`config` (_Object_): Optional configuration object

- `defaultState?`: Optional default state for [Gate.state](/en/api/effector-solid/Gate#state)
- `domain?` ([_Domain_]/apieffector/Domain)): Optional domain which will be used to create gate units ([Gate.open](/en/api/effector-solid/Gate#open) event, [Gate.state](/en/api/effector-solid/Gate#state) store and so on)
- `name?` (_string_): Optional name which will be used as name of a created Solid component

### Returns (#methods-createGate-config-returns)

[_Gate_](/en/api/effector-solid/Gate)

### Examples (#methods-createGate-config-examples)

TBD

## `createGate(name?)` (#methods-createGate-name)

### Formulae (#methods-createGate-name-formulae)

```ts
createGate(name): Gate
```

### Arguments (#methods-createGate-name-arguments)

1. `name?` (_string_): Optional name which will be used as name of a created Solid component

### Returns (#methods-createGate-name-returns)

[_Gate_](/en/api/effector-solid/Gate)

### Examples (#methods-createGate-name-examples)

#### Basic usage (#methods-createGate-name-examples-basic)

```js
import { createGate } from "effector-solid";
import { render } from "solid-js/web";

const Gate = createGate("gate with props");

const App = () => (
  <section>
    <Gate foo="bar" />
  </section>
);

Gate.state.watch((state) => {
  console.log("current state", state);
});
// => current state {}

const unmount = render(() => <App />, document.getElementById("root"));
// => current state {foo: 'bar'}

unmount();
// => current state {}
```
