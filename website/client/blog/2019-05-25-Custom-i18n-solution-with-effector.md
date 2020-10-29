---
slug: сreate-custom-i18n-provider-with-effector-and-typescript
title: Create custom i18n provider with effector and typescript
author: dpr-dev
authorURL: https://github.com/dpr-dev 
author_image_url: https://avatars1.githubusercontent.com/u/23157659?v=4
tags: [effector, i18n, typescript]
---

Today I will show you how to create your own i18n solution with effector, typescript and react.

codesandbox https://codesandbox.io/s/react-i18n-with-effector-and-ts-gtet4

<!--truncate-->

First of all, we should design the state of our provider, consisting of two parts: 
- current language
- translations

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
export const $i18n = combine({language: $language, translates: $translates}); 
```

<!--END_DOCUSAURUS_CODE_TABS-->

Ok, we created the state for our i18n library. This state will store information about the current language and a set of translations.
Now we should provide the language switching at runtime and dynamically adding the sets of the translates.  

I created two events in the file events.ts: 

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts 
export type AddTranslates = { language: string, translates: Dictionary<string, string> };

export const addTranslates = createEvent<AddTranslates>('@@i18n/translates/add');
export const setLanguage = createEvent<string>('@@i18n/language/set');
```

<!--END_DOCUSAURUS_CODE_TABS-->

There after we should subscribe our stores to this events

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

export type StoreType = {
  language: string;
  translates: Dictionary<Dictionary<string, string>>;
};

export const Translate =
    createComponent<TranslateProps, StoreType>(
        $i18n,
        (props, state) => {
            const { children, id } = props;
            const { translates, language } = state;

            const translate = translates[language][id];
            const value = _getTranslate(id, translate, typeof children !== 'function' ? children : undefined);

            return typeof children === 'function'
                ? children(value)
                : value;
        }); 
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
    private _translations: Dictionary<string, string>; 
    
    public set = (lang: string) => this._userCulture = lang;
    public setTranslations = (value: Dictionary<string, string>) => this._translations = value; 
    
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
    
    public translate = (key: string) => {
        if(!!this._translations) {
            if(!!key) {
                return this._translations[key]; 
            }
            
            throw new Error('invalid resource key'); 
        }
        
        throw new Error('translations must be a set');
    }

    private _isCulture = (culture: string) => {
        if (!!this._userCulture) {
            return this._userCulture.toLowerCase() === culture;
        }

        throw new Error('culture must be a set');
    }
}

export const { localize, set, getCurrentCulture, translate, setTranslations } = new UserCulture();  
 

// store.ts
import {set, setTranslations} from './userCulture'; 

// !!side-effect!! set app culture on each store update 
$language.watch((lang) => set(lang)); 

// !!side-effect!! update the translations set in our culture manager on each culture switching
$i18n.watch(state => {
  setTranslations(state.translates[state.language]);
});
```

<!--END_DOCUSAURUS_CODE_TABS-->

Then we can define the *translate function* and call it from anywhere in our code. 

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```tsx
// translate.tsx, put this code after Translate component
// import {translate} from './userCulture'; 
export const getTranslate = (path: string): string => { 
    return _getTranslate(path, translate(path), path);
}; 

```

<!--END_DOCUSAURUS_CODE_TABS-->

Here's example of using:

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts
// api.ts
import {getCurrentCulture} from './userCulture'; 
const url = `https://some.url/?age=20&culture=${getCurrentCulture()}`;  

// store2.ts
// en 
// {value: 1, name: 'week'}
// {value: 10, name: 'weeks'}
// 
// ru
// {value: 1, name: 'неделя'}
// {value: 10, name: 'недель'}


export const weeks = (n: number, lang: string) => {
  return pluralize(n, "неделя", "недели", "недель", "week", "weeks")[lang];
};

const numbers = Array.from({ length: 10 }).map((_, item) => item + 1);

export const $weeks = $language.map(lang => {
  return numbers.map(value => {
    return {
      value: value,
      name: weeks(value, lang)
    };
  });
});
```

<!--END_DOCUSAURUS_CODE_TABS-->

And at the end i will show some simple, but very useful components



<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts 
// CultureRenderer
type CultureRendererProps = {
    children: ((props: string) => React.ReactNode),
    cultures: Array<string>
};

export type Store = {
  language: string;
  translates: Dictionary<Dictionary<string, string>>;
};

export const CultureRenderer =
    createComponent<CultureRendererProps, Store>(
        $i18n,
        (props, state) => {
            const langInLower = state.language.toLowerCase();
            const hasCulture = props.cultures.some((c) => {
                if (!!c && c.toLowerCase() === langInLower) {
                    return true;
                }

                return false;
            })

            return hasCulture
                ? props.children(langInLower)
                : null;
        }); 
        
        
// usage

<CultureRenderer cultures={["ru"]}>
    {culture => <h4>info for {culture} culture</h4>}
</CultureRenderer>

<CultureRenderer cultures={["en"]}>
    {culture => <h4>info for {culture} culture</h4>}
</CultureRenderer>

<CultureRenderer cultures={["en", "ru"]}>
    {culture => <h4>info for all cultures, current = {culture}</h4>}
</CultureRenderer>
```

<!--END_DOCUSAURUS_CODE_TABS-->


#### Thank you for reading!
