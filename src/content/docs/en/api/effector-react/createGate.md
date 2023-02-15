---
title: createGate
description: Creates a gate to consume data from view
---

## `createGate(config?: {defaultState?, domain?, name?})` {#createGate-config}

Creates a [_`Gate`_](/en/api/effector-react/Gate), if `defaultState` is defined, [Gate.state](/en/api/effector-react/Gate#state) will be created with passed value

### Arguments {#createGate-config-arguments}

`config` (_Object_): Optional configuration object

- `defaultState?`: Optional default state for [Gate.state](/en/api/effector-react/Gate#state)
- `domain?` ([_Domain_](/en/api/effector/Domain)): Optional domain which will be used to create gate units ([Gate.open](/en/api/effector-react/Gate#open) event, [Gate.state](/en/api/effector-react/Gate#state) store and so on)
- `name?` (_string_): Optional name which will be used as name of created react component

### Returns {#createGate-config-returns}

[_Gate_](/en/api/effector-react/Gate)

## `createGate(name?)` {#createGate-name}

Creates a [_`Gate`_](/en/api/effector-react/Gate)

### Arguments {#createGate-name-arguments}

1. `name`? (_string_): Optional name which will be used as name of created react component

### Returns {#createGate-name-returns}

[_Gate_](/en/api/effector-react/Gate)

## Example {#createGate-example}

```jsx
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
