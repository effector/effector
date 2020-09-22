---
id: createDomain
title: createDomain
hide_title: true
---

# `createDomain(name?)`

Creates a [domain](Domain.md)

#### Arguments

1. `name`? (_string_): [Domain](Domain.md) name

#### Returns

[_Domain_](Domain.md): New domain

#### Example

```js
import {createDomain} from 'effector'

const domain = createDomain() // Unnamed domain
const httpDomain = createDomain('http') // Named domain

const statusCodeChanged = httpDomain.createEvent()
const downloadFx = httpDomain.createEffect()
const apiDomain = httpDomain.createDomain() // nested domain
const $data = httpDomain.createStore({status: -1})
```

[Try it](https://share.effector.dev/GMpjINHa)
