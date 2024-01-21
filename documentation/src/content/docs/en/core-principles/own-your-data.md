---
title: Own your data principle
redirectFrom:
  - /core-principles/own-your-data
---

Effector will not force you to turn your data into abstract or custom entities – your data are your data and effector only provides infrastructure to handle it.

That means that you should not use effector's entities (Store, Event, etc) to represent your data – only to describe the surrounding logic.

- Effector Store with an array of other Stores inside – anti-pattern, use key-value pattern instead.
