---
title: createGate
description: Creates a gate to consume data from view
---

# createGate

## `createGate(config?: {defaultState?, domain?, name?})` {#createGate-config}

Creates a [_`Gate`_](/api/effector-react/Gate.md), if `defaultState` is defined, [Gate.state](/api/effector-react/Gate.md#state) will be created with passed value

### Arguments {#createGate-config-arguments}

`config` (_Object_): Optional configuration object

- `defaultState?`: Optional default state for [Gate.state](/api/effector-react/Gate.md#state)
- `domain?` ([_Domain_](/api/effector/Domain.md)): Optional domain which will be used to create gate units ([Gate.open](/api/effector-react/Gate.md#open) event, [Gate.state](/api/effector-react/Gate.md#state) store and so on)
- `name?` (_string_): Optional name which will be used as name of created react component

### Returns {#createGate-config-returns}

[_Gate_](/api/effector-react/Gate.md)

## `createGate(name?)` {#createGate-name}

Creates a [_`Gate`_](/api/effector-react/Gate.md)

### Arguments {#createGate-name-arguments}

1. `name`? (_string_): Optional name which will be used as name of created react component

### Returns {#createGate-name-returns}

[_Gate_](/api/effector-react/Gate.md)

## Example {#createGate-example}

```js
import React from "react";
import ReactDOM from "react-dom";
import { createGate } from "effector-react";

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

ReactDOM.render(<App />, document.getElementById("root"));
// => current state {foo: 'bar'}

ReactDOM.unmountComponentAtNode(document.getElementById("root"));
// => current state {}
```

[Try it](https://share.effector.dev/mMZSQclh)
