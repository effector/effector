---
id: createDomain
title: Создание домена
description: createDomain is a method for creating a domain
sidebar_label: createDomain
---

Метод для создания [доменов](./Domain.md)

```typescript
createDomain(name?)
```

**Аргументы**

1. `name`? (_string_): название домена

**Возвращает**

[_Domain_](./Domain.md): Новый домен

#### Пример

```js
import {createDomain} from 'effector'

const domain = createDomain() // неименованный домен
const httpDomain = createDomain('http') // именованный домен

const statusCodeChanged = httpDomain.createEvent()
const downloadFx = httpDomain.createEffect()
const apiDomain = httpDomain.createDomain() // вложенный домен
const $data = httpDomain.createStore({status: -1})
```

[Попробовать](https://share.effector.dev/GMpjINHa)
