---
title: Effector React Gate
redirectFrom:
  - /api/effector-react/Gate
  - /docs/api/effector-react/Gate
---

_Gate_ is a hook for conditional rendering, based on the current value (or values) in props. It can solve problems such as compiling all required data when a component mounts, or showing an alternative component if there is insufficient data in props. Gate is also useful for routing or animations, similar to ReactTransitionGroup.

This enables the creation of a feedback loop by sending props back to a _Store_.

Gate can be integrated via the [useGate](/en/api/effector-react/useGate) hook or as a component with props. Gate stores and events function as standard units within an application.

Gate has two potential states:

- **Opened**, indicating the component is mounted.
- **Closed**, indicating the component is unmounted.

<br/>

**Example of using Gate as a component:**

```tsx
<Gate history={history} />
```

# Properties (#properties)

## `.state` Store (#properties-state)

:::warning{title="Important"}
Do not modify the `state` value! It is a [derived store](/en/api/effector/Store#readonly) and should remain in a predictable state.
:::

`Store<Props>`: [DerivedStore](/en/api/effector/Store#readonly) containing the current state of the gate. This state derives from the second argument of [useGate](/en/api/effector-react/useGate) and from props when rendering the gate as a component.

### Example (#properties-state-example)

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

## `.open` Event (#properties-open)

:::info{title="Important"}
Do not manually invoke this event. It is an event that is triggered based on the gate's state.
:::

[Event<Props>](/en/api/effector/Event): Event fired upon gate mounting.

## `.close` Event (#properties-close)

:::info{title=Important}
Do not manually invoke this event. It is an event that is triggered based on the gate's state.
:::

[Event<Props>](/en/api/effector/Event): Event fired upon gate unmounting.

## `.status` Store (#properties-status)

:::warning{title="Important"}
Do not modify the `status` value! It is a [derived store](/en/api/effector/Store#readonly) and should remain in a predictable state.
:::

[Store<boolean>](/en/api/effector/Store): Boolean [DerivedStore](/en/api/effector/Store#readonly) indicating whether the gate is mounted.

### Example (#properties-status-example)

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
