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

Окей, теперь, когда основа нашего приложения почти готова, давайте создадим реакт-компонент, который позволит использовать нам переводы. Создадим файл Translate.tsx

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

Как видите, создание подобной штуки не заняло много времени. Бонусом является то, что мы можем подписаться на стор локализаций и изменять переводы даже там, где это нельзя было бы сделать обычным способом. Например, мы можем создать класс-хелпер, позволяющий удобно работать с локализацией в приложении: 

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
        if (data.ru !== null && this._isRu()) {
            return data.ru;
        }

        if (data.en !== null && this._isEn()) {
            return data.en;
        } 

        if (data.de !== null && this._isDe()) {
            return data.de;
        } 

        return data.en;
    }

    private _isRu = () => {
        return this._isCulture('ru');
    }

    private _isEn = () => {
        return this._isCulture('en');
    } 

    private _isDe = () => {
        return this._isCulture('de');
    } 

    private _isCulture = (culture: string) => {
        if (!!this._userCulture) {
            return this._userCulture.toLowerCase() === culture;
        }

        throw new Error('culture must be a set');
    }
}

export const { localize, set, getCurrentCulture } = new UserCulture();  
```

<!--END_DOCUSAURUS_CODE_TABS-->

и пример использования 

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->

```ts  

// store.ts
import {set} from './userCulture'; 

$language.watch((lang) => set(lang)); // update app culture

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
