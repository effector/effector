---
id: gate
title: Gate
---

_Gate_ is a hook for conditional rendering, based on current value (or values) in props. An example of a problem that a Gate can solve - you can put together all required data, when component was mounted. Or show another component, if there is not enough data in props. Gate also looks good for Routing or animation, ReactTransitionGroup like.

This allows you to send props back to _Store_ to create feedback loop interop.

Gate can have two states:

- **Open**, which means mounted
- **Closed**, which means unmounted

## Gate Methods

### `childGate(childName?)`

Returns child gate which won't render if parent gate is closed.

#### Returns

(Gate): Child gate

<hr>

## Gate Properties

### `isOpen`

#### Returns

(boolean)

<hr>

### `isTerminated`

#### Returns

(boolean)

<hr>

### `open`

### Returns

(Event)

<hr>

### `close`

### Returns

(Event)

<hr>

### `status`

### Returns

(Store)

<hr>

### `destructor`

### Returns

(Event)

<hr>

### `current`

### Returns

(Props)

<hr>

### `state`

### Returns

(Store)

<hr>
