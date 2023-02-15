---
title: createDomain
description: createDomain is a method for creating a domain
---

Creates a [domain](/api/effector/Domain.md)

```typescript
createDomain(name?)
```

**Arguments**

1. `name`? (_string_): domain name

**Returns**

[_Domain_](/api/effector/Domain.md): New domain

### Example

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
