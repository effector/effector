---
title: FAQ
description: Frequent questions and answers about effector
redirectFrom:
  - /en/FAQ
  - /en/docs/faq
---

# FAQ

## Why do we need babel/swc plugin for SSR?

Effector plugins inserts special tags - SIDs - into the code, it help to automate serialization and deserialization of stores, so users doesn't have to think about it. See [article about sids](/en/explanation/sids) for more info.

## Why do we need to give names to events, effects etc. ?

This will help in the future, in the development of the effector devtools, and now it is used in the [playground](https://share.effector.dev) on the left sidebar.
If you don't want to do it, you can use the [babel plugin](https://www.npmjs.com/package/@effector/babel-plugin). It will automatically generate the name for events and effects from the variable name.
