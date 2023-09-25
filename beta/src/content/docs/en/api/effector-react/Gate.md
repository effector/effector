---
title: Effector React Gate
redirectFrom:
  - /api/effector-react/Gate
  - /docs/api/effector-react/Gate
---

_Gate_ is a hook for conditional rendering, based on current value (or values) in props. An example of a problem that Gate can solve – you can put together all required data, when component was mounted. Or show another component if there is not enough data in props. Gate also looks good for Routing or animation, like ReactTransitionGroup.

This allows you to send props back to _Store_ to create feedback loop.

Gate can be used via [useGate](/en/api/effector-react/useGate) hook or as a component with props. Gate stores and events can be used in the application as regular units.

Gate can have two states:

- **Opened**, which means mounted
- **Closed**, which means unmounted

<br/>

**Example of using Gate as a component:**

```tsx
<Gate history={history} />
```

# Gate Properties {#Gate-properties}

## `state` {#Gate-state}

:::warning{title="Important"}
Do not modify `state` value! It is [derived store](/en/api/effector/Store#readonly) and should be in predictable state.
:::

`Store<Props>`: [DerivedStore](/en/api/effector/Store#readonly) with current state of the given gate. The state came from the second argument of [useGate](/en/api/effector-react/useGate) and from props when rendering gate as a component

### Example {#Gate-state-example}

```tsx
const Gate = createGate();

Gate.state.watch((state) => console.info("gate state updated", state));

function App() {
  useGate(Gate, { props: "yep" });
  return <div>Example</div>;
}

ReactDOM.render(<App />, root);
// => gate state updated { props: "yep" }
```

## `open` {#Gate-open}

:::info{title="Important"}
Do not manually call this event. It is an event that depends on a Gate state.
:::

[Event<Props>](/en/api/effector/Event): Event which will be called during gate mounting

## `close` {#Gate-close}

:::info{title=Important}
Do not manually call this event. It is an event that depends on a Gate state.
:::

[Event<Props>](/en/api/effector/Event): Event which will be called during a gate unmounting.

## `status` {#Gate-status}

:::warning{title="Important"}
Do not modify `status` value! It is [derived store](/en/api/effector/Store#readonly) and should be in predictable state.
:::

[Store<boolean>](/en/api/effector/Store): Boolean [DerivedStore](/en/api/effector/Store#readonly) which show if given gate is mounted.

### Example {#Gate-status-example}

```tsx
const Gate = createGate();

Gate.status.watch((opened) => console.info("is Gate opened?", opened));
// => is Gate opened? false

function App() {
  useGate(Gate);
  return <div>Example</div>;
}

ReactDOM.render(<App />, root);
// => is Gate opened? true
```
