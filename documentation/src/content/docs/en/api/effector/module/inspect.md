---
title: effector/inspect
description: Separate module of Effector with Inspect API
---

Effector has special API methods designed to handle debugging and monitoring use cases without giving too much access to the internals of your actual app — [Inspect API](/en/api/effector/inspect).

## Why a Separate Module? (#why-a-separate-module)

Inspect API is designed to be disposable. By design, any feature that uses Inspect API can be removed from the production build without any side effects. To emphasize this, Inspect API is not included in the main module. Instead, it's available in a separate module `effector/inspect`.

## Usage (#usage)

Please refer to [Inspect API](/en/api/effector/inspect) docs for usage examples.
