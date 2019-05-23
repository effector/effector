---
author: dpr-dev
authorURL: https://github.com/dpr-dev
title: Create custom i18n provider with effector and typescript
---

Today i will show your how to create your own i18n solution with effector and typescript and react.  

First of all, we should to design the state of our provider, consisting of two parts: 
- current language
- translates

Ok, let's do it. Create a file store.ts and write the following code:

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

Отлично, стейт мы создали. В нём будет хранится вся информация о переводах и текущем языке. Теперь необходимо добавить возможность динамического добавления переводов, а так же смену языка. 

Для этого в файле events.ts определим два события: 

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts 
export type AddTranslatesEventType = { language: string, translates: Dictionary<string, string> };

export const addTranslates = createEvent<AddTranslates>('@@i18n/translates/add');
export const setLanguage = createEvent<string>('@@i18n/language/set');
```

<!--END_DOCUSAURUS_CODE_TABS-->

После этого мы должны подписать наши сторы на эти события. Сделаем это в файле on.ts 

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts  
$translates.on(
    addTranslates,
    (state, payload) => {
         throw new Error('not implemented'); 
    });

$language.on(
    setLanguage,
    (_, payload) => {
         return payload. 
    }); 
```

<!--END_DOCUSAURUS_CODE_TABS-->



Теперь мы можем с лёгкостью сменить язык нашего приложения, вот так: 
<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts  
setLanguage('ru'); // set ru culture
setLanguage('en'); // set en culture
setLanguage('es'); // set es culture
```

<!--END_DOCUSAURUS_CODE_TABS-->
