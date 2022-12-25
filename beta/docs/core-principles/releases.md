---
title: Releases policy
lang: en-US
---

# Releases policy

The main goal of Effector is to **make developer experience better**, as a part of this strategy we are committing to some rules of Effector releases.

## No breaking changes without prior deprecation

Before each breaking change, the Effector must provide a deprecation warning for **at least a year before.**

For example:
- When version 22 was released, feature "A" was marked as deprecated. The library gives a warning to the console when it is used.
- A year later, in the version 23 release, feature "A" is removed.

## Release cycle

Major updates (i.e. with breaking changes) of the Effector are released **no more than once a year.**

Minor and patch updates (i.e., with fixes and new features) are released when ready. If a new feature requires breaking changes - it is also released in a major update.

This is necessary to allow developers to plan their work smoothly, taking into account possible changes in Effector.

It also obliges Effector maintainers to be extremely careful when designing new features and breaking changes to old library features, because the opportunity to remove or heavily modify something in the public API only appears once every two years.
