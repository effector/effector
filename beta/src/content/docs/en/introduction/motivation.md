---
title: Motivation
redirectFrom:
  - /docs/introduction/motivation
  - /introduction/motivation
---

Most applications have the logic for which they're created.
This logic itself can be very complex and based on reactive principles, we call it **business logic**.

In order for the user to benefit from the logic described above, it is necessary to create a user interface
and implement the logic for it; we call it **UI-logic**.

The easiest way to figure out what is what — is to remember what tasks your project manager comes to you with,
or what the product tasks look like.
There's no description of how buttons, dropdowns, and form fields should work internally or which api should be used.
There is only a description of how the user interacts with the application.
The users don't care what technologies and frameworks are used under the hood – it is up to the developers to decide, which tools to use to achieve required quality.

In most cases, the product requirements team doesn't think in terms of UI components; it thinks through user behavior scenarios.
More importantly for developers, the way frameworks like React, Angular, or Vue work often doesn't allow
the business logic to be described the way the product team described it. These frameworks are designed very differently
and have different operating principles, whereas business logic is always based on the same principles:

1. users can interact with the application through the interface
2. they can see changes on the page
3. they can notice how the application interacts with the outside world

Effector offers the possibility to describe the business logic in the same language as the product development team communicates,
using basic primitives: Event, Store, Effect respectively. At the same time, the UI logic remains the responsibility of the framework.
Let each framework solve its task as efficiently as possible.
