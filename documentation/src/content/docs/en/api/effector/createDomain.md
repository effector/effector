---
title: createDomain
description: createDomain is a method for creating a domain
redirectFrom:
  - /api/effector/createDomain
  - /docs/api/effector/createDomain
---

# `createDomain(name?)` {#createDomain-name}

Creates a [domain](/en/api/effector/Domain)

## Formulae {#createDomain-name-formulae}

```typescript
createDomain(name?): Domain
```

## Arguments {#createDomain-name-arguments}

1. `name`? (_string_): domain name. Useful for debugging

## Returns {#createDomain-name-returns}

[_Domain_](/en/api/effector/Domain): New domain

## Examples {#createDomain-name-examples}

```js
import { createDomain } from "effector";

const domain = createDomain(); // Unnamed domain
const httpDomain = createDomain("http"); // Named domain

const statusCodeChanged = httpDomain.createEvent();
const downloadFx = httpDomain.createEffect();
const apiDomain = httpDomain.createDomain(); // nested domain
const $data = httpDomain.createStore({ status: -1 });
```

[Try it](https://share.effector.dev/GMpjINHa)
