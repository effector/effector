---
id: gate
title: Gate
---

_Gate_ is a hook for conditional rendering, based on current value (or values) in props. An example of a problem that a Gate can solve - you can put together all required data, when component was mounted. Or show another component, if there is not enough data in props. Gate also looks good for Routing or animation, ReactTransitionGroup like.

This allows you to send props back to _Store_ to create feedback loop interop.

Gate can have two states:

- **Open**, which means mounted
- **Closed**, which means unmounted

### Gate Methods

- [`childGate(childName?)`](#childGate)

### Gate Properties

- [`isOpen`](#isOpen)
- [`isTerminated`](#isTerminated)
- [`open`](#open)
- [`close`](#close)
- [`status`](#status)
- [`destructor`](#destructor)
- [`current`](#current)
- [`state`](#state)

## Gate Methods

### <a id='childGate'></a>[`childGate(childName?)`](#childGate)

Returns child gate which won't render if parent gate is closed.

#### Returns

(Gate): Child gate

<hr>

## Gate Properties

### <a id='isOpen'></a>[`isOpen`](#isOpen)

#### Returns

(boolean)

<hr>

### <a id='isTerminated'></a>[`isTerminated`](#isTerminated)

#### Returns

(boolean)

<hr>

### <a id='open'></a>[`open`](#open)

### Returns

(Event)

<hr>

### <a id='close'></a>[`close`](#close)

### Returns

(Event)

<hr>

### <a id='status'></a>[`status`](#status)

### Returns

(Store)

<hr>

### <a id='destructor'></a>[`destructor`](#destructor)

### Returns

(Event)

<hr>

### <a id='current'></a>[`current`](#current)

### Returns

(Props)

<hr>

### <a id='state'></a>[`state`](#state)

### Returns

(Store)

<hr>
