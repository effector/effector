const sidebar = {
  'Getting started': [
    'introduction/motivation',
    'introduction/community',
    'introduction/installation',
    'ecosystem',
    'introduction/examples',
  ],
  Conventions: ['conventions/naming'],
  'TypeScript guide': [
    'typescript/typing-effector',
    'typescript/usage-with-effector-react',
    'typescript/utility-types',
  ],
  Recipes: [
    'recipes/countdown',
    {
      type: 'category',
      label: 'React',
      items: [
        'recipes/react/counter',
        'recipes/react/example-effects',
        'recipes/react/example-forms',
        'recipes/react/gate',
        'recipes/react/todo-creator',
        'recipes/react/dynamic-form-schema',
        'recipes/react/todo-with-validation',
        'recipes/react/slots',
      ],
    },
    'recipes/react-native/example',
  ],
  Explanation: [
    'explanation/glossary',
    'explanation/computation-priority',
    'explanation/prior-art',
  ],
  API: [
    {
      type: 'category',
      label: 'effector',
      link: {
        type: 'doc',
        id: 'api/effector/effector',
      },
      items: [
        {
          type: 'category',
          label: 'Unit types',
          items: [
            'api/effector/event',
            'api/effector/store',
            'api/effector/effect',
            'api/effector/domain',
          ],
        },
        'api/effector/createStore',
        'api/effector/createEvent',
        'api/effector/createEffect',
        'api/effector/createDomain',
        'api/effector/attach',
        'api/effector/combine',
        'api/effector/createApi',
        'api/effector/forward',
        'api/effector/fromObservable',
        'api/effector/guard',
        'api/effector/is',
        'api/effector/merge',
        'api/effector/restore',
        'api/effector/sample',
        'api/effector/split',
        {
          type: 'category',
          label: 'Fork',
          items: [
            'api/effector/scope',
            'api/effector/fork',
            'api/effector/serialize',
            'api/effector/hydrate',
            'api/effector/allSettled',
            'api/effector/scopeBind',
          ],
        },
        {
          type: 'category',
          label: 'Low level api',
          items: [
            'api/effector/clearNode',
            'api/effector/withRegion',
            'api/effector/launch',
            'api/effector/inspect'
          ],
        },
      ],
    },
    'api/effector/babel-plugin',
    {
      type: 'category',
      label: 'effector-react',
      link: {
        type: 'doc',
        id: 'api/effector-react/effector-react',
      },
      items: [
        'api/effector-react/useStore',
        'api/effector-react/useStoreMap',
        'api/effector-react/useList',
        'api/effector-react/useUnit',
        'api/effector-react/createGate',
        'api/effector-react/useGate',
        'api/effector-react/gate',
        'api/effector-react/createComponent',
        'api/effector-react/createStoreConsumer',
        'api/effector-react/connect',
        {
          type: 'category',
          label: 'Scoped (SSR)',
          items: ['api/effector-react/useEvent'],
        },
      ],
    },
    {
      type: 'category',
      label: 'effector-solid',
      link: {
        type: 'doc',
        id: 'api/effector-solid/effector-solid',
      },
      items: [
        'api/effector-solid/useUnit',
        'api/effector-solid/useStoreMap',
        'api/effector-solid/gate',
        'api/effector-solid/createGate',
        'api/effector-solid/useGate',
      ],
    },
    {
      type: 'category',
      label: 'effector-vue',
      link: {
        type: 'doc',
        id: 'api/effector-vue/effector-vue',
      },
      items: [
        'api/effector-vue/vue-effector',
        'api/effector-vue/component-options',
        'api/effector-vue/gate',
        'api/effector-vue/createGate',
        'api/effector-vue/useGate',
        'api/effector-vue/useStore',
        'api/effector-vue/useVModel',
        'api/effector-vue/useStoreMap',
        {
          type: 'category',
          label: 'Scoped (SSR)',
          items: ['api/effector-vue/useEvent', 'api/effector-vue/VueSSRPlugin'],
        },
        'api/effector-vue/vue',
      ],
    },
  ],
  'For ecosystem developers': ['ecosystem-development/unit-shape-protocol'],
}

module.exports = {
  docs: sidebar,
  api: sidebar,
}
