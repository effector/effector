---
id: gate
title: Gate
---

_Gate_ is a hook to React rendering.

It allows you to send props back to effector context (store).

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

Returns child gate which won't render if parent gate is closed

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
