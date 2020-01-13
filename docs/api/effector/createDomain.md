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

([_`Domain`_](Domain.md)): Namespace for your events, stores and effects.

#### Example

```js try
import {createDomain} from 'effector'

const domain = createDomain() // Unnamed domain
const httpDomain = createDomain('http') // Named domain

const statusCode = httpDomain.event('status code')
const download = httpDomain.effect('download')
const apiDomain = httpDomain.domain('api') // nested domain
const data = httpDomain.store({status: -1})
```

[Try it](https://share.effector.dev/lSgrvzGL)
