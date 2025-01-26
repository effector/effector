---
title: createDomain
description: createDomain это метод для создания домена
lang: ru
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

const domain = createDomain(); // безымянный домен
const httpDomain = createDomain("http"); // именованный домен

const statusCodeChanged = httpDomain.createEvent();
const downloadFx = httpDomain.createEffect();
const apiDomain = httpDomain.createDomain(); // вложенный домен
const $data = httpDomain.createStore({ status: -1 });
```

[Запустить пример](https://share.effector.dev/GMpjINHa)
