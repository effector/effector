---
title: createDomain
description: createDomain is a method for creating a domain
redirectFrom:
  - /api/effector/createDomain
  - /docs/api/effector/createDomain
---

Метод для создания [доменов](/ru/api/effector/Domain)

```typescript
createDomain(name?)
```

**Аргументы**

1. `name`? (_string_): имя домена

**Возвращает**

[_Domain_](/ru/api/effector/Domain): Новый домен

### Пример

```js
import { createDomain } from "effector";

const domain = createDomain(); // безимянный домен
const httpDomain = createDomain("http"); // именованный домен

const statusCodeChanged = httpDomain.createEvent();
const downloadFx = httpDomain.createEffect();
const apiDomain = httpDomain.createDomain(); // вложенный домен
const $data = httpDomain.createStore({ status: -1 });
```

[Запустить пример](https://share.effector.dev/GMpjINHa)
