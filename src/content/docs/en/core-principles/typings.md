---
title: Typings
redirectFrom:
  - /core-principles/typing
---

We believe that good type support is a necessary part of good DX.

## TypeScript

Effector is aiming to provide first-class support of TypeScript types.
Effector is written in TypeScript, and there are [a lot of type-tests in the codebase, including auto-generated ones.](https://github.com/effector/effector/tree/master/src/types)

However, TypeScript itself does not aim for [applying a sound or "provably correct" type system](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals#non-goals), instead it strikes a balance between correctness and productivity.
So, we cannot guarantee that all the types are correct, but we are going to do our best to provide the best possible type inference.

Public typings of effector are [located here](https://github.com/effector/effector/blob/master/packages/effector/index.d.ts), separate from the main code of the library.
