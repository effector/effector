---
id: nextjs
title: Integrate next js with effector
---

To do this, we will use the native [fork](https://effector.dev/docs/api/effector/fork) method.
In the __app.tsx_ file, we create our own [Scope](https://effector.dev/docs/api/effector/scope) and wrap the application in a provider from _effector-react/scope_

```js
import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from 'effector-react/scope';
import { fork, Scope, serialize } from 'effector';

let clientScope: Scope;

const App: FC<AppProps<{ initialState }>> = ({ Component, pageProps }) => {
    const scope = fork({
        values: {
            ...(clientScope && serialize(clientScope)),
            ...pageProps.initialState,
        },
    });

    if (typeof window !== 'undefined') {
        clientScope = scope;
    }

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
___
.babelrc
___

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