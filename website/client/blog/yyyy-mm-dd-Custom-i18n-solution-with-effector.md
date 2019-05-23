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

ok, we created the state for our i18n library. This state will store information about the current language and a set of translations.
Now we should to provide the language switching at runtime and dynamically adding the sets of the translates.  

I created two events in the file events.ts: 

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts 
export type AddTranslatesEventType = { language: string, translates: Dictionary<string, string> };

export const addTranslates = createEvent<AddTranslates>('@@i18n/translates/add');
export const setLanguage = createEvent<string>('@@i18n/language/set');
```

<!--END_DOCUSAURUS_CODE_TABS-->

Thereafter whe should to subscribe our stores to this events

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts  
// on.ts 

$translates.on(
    addTranslates,
    (state, payload) => {
         return {
            ...state, 
            [payload.language]: {
                ...state[payload.language], 
                ...payload.translates
            }
         }; 
    });

$language.on(
    setLanguage,
    (_, payload) => {
         return payload. 
    }); 
```

<!--END_DOCUSAURUS_CODE_TABS-->



Now we can switch the language in our application with the event call: 
<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts  
setLanguage('ru'); // set ru culture
setLanguage('en'); // set en culture
setLanguage('es'); // set es culture
```

<!--END_DOCUSAURUS_CODE_TABS-->

Now, when the basis of our app is almost finished, let's create React-Component, that allow us to use translations. We'll create the "translate.tsx" file.

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```tsx
type TranslateProps = {
    id: string,
    children?: ((props: string) => React.ReactNode) | string,
};

const _getTranslate = (
    id: string,
    value: string | undefined | null,
    children: string | undefined
) => {
    if (value) {
        return value;
    }

    if (children) {
        return children;
    }

    return `{{${id}}}`;
};

export const Translate =
    createComponent<TranslateProps, StoreTypes>(
        $localizeStore,
        (props, state) => {
            const { children, id } = props;
            const { translates, currentLanguage } = state;

            const translate = translates[currentLanguage][id];
            const value = _getTranslate(id, translate, typeof children !== 'function' ? children : undefined);

            return typeof children === 'function'
                ? children(value)
                : value;
        });

// and define translate function
export const getTranslate = (path: string): string => {
    const {
        currentLanguage,
        translates
    } = $localizeStore.getState()
    return _getTranslate(path, translates[currentLanguage][path], path);
}; 
```

<!--END_DOCUSAURUS_CODE_TABS-->

As you can see, creating such a thing didn't take long.
The benefits is that now we can subscribe to our localisation store and change translations even where it couldn't be done in the usual way. For example, we can create a helper class that allow us easy to interact with localisation in the app: 

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts  
// userCulture.ts
class UserCulture {
    private _userCulture: string | null;
    public set = (lang: string) => this._userCulture = lang;
    public getCurrentCulture = (): string => {
        const culture = this._userCulture;
        if (!!culture) {
            return culture;
        }

        throw new Error('culture is undefined');
    }

    public localize = (data: any) => {
        if (!!data.ru && this._isCulture('ru')) {
            return data.ru;
        }

        if (!!data.en && this._isCulture('en')) {
            return data.en;
        } 

        if (!!data.de && this._isCulture('de')) {
            return data.de;
        } 

        return data.en;
    } 

    private _isCulture = (culture: string) => {
        if (!!this._userCulture) {
            return this._userCulture.toLowerCase() === culture;
        }

        throw new Error('culture must be a set');
    }
}

export const { localize, set, getCurrentCulture } = new UserCulture();  
 

// store.ts
import {set} from './userCulture'; 

$language.watch((lang) => set(lang)); // !!side-effect!! set app culture on each store update 
```

<!--END_DOCUSAURUS_CODE_TABS-->

Here's example of using:

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts
// api.ts
import {getCurrentCulture} from './userCulture'; 
const url = `https://some.url/?age=20&culture=${getCurrentCulture()}`; 

// pluralize.ts
export const pluralizeWeeks = (value: number, language: string) => {
    return pluralizeInternal(value, language, "неделя", "недели", "недель", "week", "weeks", "semana", "semanas", "hafta", "hafta")
}; 

// store2.ts
// en 
// {value: 1, name: 'week'}
// {value: 10, name: 'weeks'}
// 
// ru
// {value: 1, name: 'неделя'}
// {value: 10, name: 'недель'}

export const $weeks = createStore<Array<{value: number, name: string}>([]); 

// on2.ts
$weeks.on(
    $language, 
    (state, culture) => {
        return state.map(({value}) => ({name: pluralizeWeeks(value, culture), value}); 
    }); 
```

<!--END_DOCUSAURUS_CODE_TABS-->
