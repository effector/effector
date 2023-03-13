---
title: Own your data principle
---

Effector will not force you to turn your data in abstract or custom entities - your data is your data and Effecor only provides infrastructure to handle it.

That means that you should not use Effector's entities (Store, Event, etc) to represent your data - only to describe the logic around it.

- Effector Store with an array of other Stores inside - antipattern, use key-value pattern instead (link to the recipe)
