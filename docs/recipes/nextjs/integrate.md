---
id: nextjs
title: Integrate Next.js with effector
---

# Integrate Next.js with effector

To do this, we will use the native [fork](/docs/api/effector/fork.md) method to create a [scope](/docs/api/effector/Scope.md)
This hook does that  and memoize our data. It also merges server and client states:

```js
import { fork, Scope, serialize } from 'effector';
import { useMemo } from 'react';

let scope;

const initScope = initialData => fork({ values: initialData });

const initializeScope = preloadedData => {
    let _scope = scope ?? initScope(preloadedData);

    // After navigating to a page with an initial scope state, merge that state
    // with the current state in the scope, and create a new scope
    if (preloadedData && scope) {
        _scope = initScope({
            ...serialize(scope, { onlyChanges: true }),
            ...preloadedData,
        });

        // Reset the current scope
        scope = undefined;
    }

    // For SSG and SSR always create a new scope
    if (typeof window === 'undefined') {
        return _scope;
    }

    // Create the scope once in the client
    if (!scope) {
        scope = _scope;
    }

    return _scope;
};

export const useScope = (initialState): Scope => {
    return useMemo(() => initializeScope(initialState), [initialState]);
};
```

In the __app.tsx_ file, we used our **useScope** and wrap the application in a provider from _effector-react/scope_

```js
import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from 'effector-react/scope';
import { fork, Scope, serialize } from 'effector';
import { useScope } from '../useScope'; // use your path to file

const App: FC<AppProps<{ initialState }>> = ({ Component, pageProps }) => {
    const scope = useScope(pageProps.initialState);

    return (
        <Provider
            key={scope?.graphite?.id || '0'}
            value={scope}
        >
            <Component {...pageProps} />
        </Provider>
    );
};

export default App;
```

Next, you need to add _.babelrc_ to the project root with the following content:

```js
{
    "plugins": [
        [
            "effector/babel-plugin", {
            "reactSsr": true,
        }
        ]
    ]
}
```
You also need to add an alias to _next.config.js_ to avoid build errors, when under the hood it imports, then cjs then mjs files.

```js
config.resolve.alias.effector = path.resolve(__dirname, './node_modules/effector/effector.cjs.js');
config.resolve.alias['effector-react/ssr'] = path.resolve(__dirname, './node_modules/effector-react/ssr.js');
config.resolve.alias['effector-react/scope'] = path.resolve(__dirname, './node_modules/effector-react/scope.js');
config.resolve.alias['effector-react'] = path.resolve(__dirname, './node_modules/effector-react/ssr.js');
```

For the convenience of development, we add the following rules to our eslint:

```js
module.exports = {
    root: true,
    extends: [ 
        'effector', 
        'plugin:effector/react', 
        'plugin:effector/scope', 
        'plugin:effector/future',
        'plugin:effector/patronum',
        'plugin:effector/recommended',
    ],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                paths: [
                    {
                        name: 'effector-react',
                        message: "Please import from 'effector-react/scope' instead.",
                    },
                ],
            },
        ],
    },
};
```