---
id: createGate
title: createGate
hide_title: true
---

# `createGate(name?)`

Creates a [_`Gate`_](Gate.md)

#### Arguments

1. `name`? (_string_)

#### Returns

(_`Gate`_)

#### Example

```js
const Gate = createGate('gate with props')
const App = () => (
  <section>
    <Gate foo="bar" />
  </section>,
)
ReactDOM.render(<App />, document.getElementById('app'))

Gate.state.getState()
// {foo: 'bar'}
Gate.current
// {foo: 'bar'}

ReactDOM.unmountComponentAtNode(document.getElementById('app'))

Gate.state.getState()
// {}
Gate.current
// {}
```
