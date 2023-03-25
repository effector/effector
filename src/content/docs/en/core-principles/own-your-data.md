---
title: Own your data principle
---

Effector will not force you to turn your data in abstract or custom entities - your data is your data and Effector only provides infrastructure to handle it.

That means that you should not use Effector's entities (Store, Event, etc) to represent your data - only to describe the surrounding logic.

- Effector Store with an array of other Stores inside – anti-pattern, use key-value pattern instead.
