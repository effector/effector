---
author: dpr-dev
authorURL: https://github.com/dpr-dev
title: Create custom i18n provider with effector and typescript
---

Today i will show your how to create your own i18n solution with effector and typescript and react.  

First of all, we should to design the state of our provider, consisting of two parts: 
- current language
- translates

Ok, let's do it. 

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts
/*
* state example
*
* {
*     en: {
*         'hello': 'world'
*     }, 
*     ru: {
*         'привет': 'мир'
*     }
* }
*
*/

type Translates = Dictionary<Dictionary<string, string>, string>; // type from ts-essentials

export const $language = createStore<string>('en'); 
export const $translates = createStore<Translates>({}); 
export const $localizedStore = createStoreObject({language: $language, translates: $translates}); 
```

<!--END_DOCUSAURUS_CODE_TABS-->



