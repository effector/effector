---
title: Motivation
description: Why should you choose and use effector in your project
redirectFrom:
  - /en/docs/introduction/motivation
  - /en/introduction/motivation
---

# Motivation

Modern web application development is becoming more complex every day. Multiple frameworks, complex business logic, different approaches to state management — all of this creates additional challenges for developers. Effector offers an elegant solution to these problems.

## Why Effector? (#why-effector)

Effector was designed to describe application business logic in a simple and clear language using three basic primitives:

- [Event](/en/api/effector/Event) — for describing events
- [Store](/en/api/effector/Store) — for state management
- [Effect](/en/api/effector/Effect) — for handling side effects

At the same time, user interface logic is handled by the framework.
Let each framework efficiently address its specific task.

### Separation of Concerns (#separation-of-concerns)

In modern development, business logic and user interface are clearly separated:

**Business Logic** — is the essence of your application, the reason it exists. It can be complex and based on reactive principles, but it defines how your product works.

**UI Logic** — is how users interact with business logic through the interface. These are buttons, forms, and other control elements.

## This is Why Effector! (#this-is-why-effector)

In real projects, tasks from product managers rarely contain interface implementation details. Instead, they describe user interaction scenarios with the system. Effector allows you to describe these scenarios in the same language that the development team uses:

- Users interact with the application → [Event](/en/api/effector/Event)
- See changes on the page → [Store](/en/api/effector/Store)
- Application interacts with the outside world → [Effect](/en/api/effector/Effect)

## Framework agnostic (#framework-agnostic)

Despite React, Angular, and Vue having different approaches to development, application business logic remains unchanged. Effector allows you to describe it uniformly, regardless of the chosen framework.
This means you can:

1. Focus on business logic, not framework specifics
2. Easily reuse code between different parts of the application
3. Create more maintainable and scalable solutions
