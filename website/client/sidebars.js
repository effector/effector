const sidebar = {
  Introduction: [
    'introduction/installation',
    'introduction/core-concepts',
    'glossary',
    'introduction/prior-art',
  ],
  API: [
    {
      type: 'category',
      label: 'effector',
      items: [
        'api/effector/effector',
        {
          type: 'category',
          label: 'Unit creators',
          items: [
            'api/effector/createStore',
            'api/effector/createEvent',
            'api/effector/createEffect',
            'api/effector/createDomain',
          ],
        },
        {
          type: 'category',
          label: 'Unit definitions',
          items: [
            'api/effector/event',
            'api/effector/store',
            'api/effector/effect',
            'api/effector/domain',
          ],
        },
        'api/effector/combine',
        'api/effector/restore',
        'api/effector/createApi',
        'api/effector/sample',
        'api/effector/guard',
        'api/effector/attach',
        'api/effector/merge',
        'api/effector/split',
        'api/effector/forward',
        'api/effector/is',
        'api/effector/fromObservable',
        'api/effector/createStoreObject',
        'api/effector/clearNode',
      ],
    },
    {
      type: 'category',
      label: 'effector-react',
      items: [
        'api/effector-react/effector-react',
        {
          type: 'category',
          label: 'Hooks',
          items: [
            'api/effector-react/useStore',
            'api/effector-react/useStoreMap',
            'api/effector-react/useList',
            'api/effector-react/useGate',
          ],
        },
        'api/effector-react/createComponent',
        'api/effector-react/gate',
        'api/effector-react/createGate',
        'api/effector-react/createStoreConsumer',
      ],
    },
    {
      type: 'category',
      label: 'effector-vue',
      items: [
        'api/effector-vue/effector-vue',
        'api/effector-vue/vue-effector',
        'api/effector-vue/component-options',
        'api/effector-vue/vue',
      ],
    },
  ],
  Conventions: ['conventions/naming', 'conventions/best-practices'],
  Recipes: [
    'recipes/recipes',
    'recipes/countdown',
    'recipes/usage-with-typescript',
    {
      type: 'category',
      label: 'React',
      items: [
        'recipes/react/example',
        'recipes/react/example-effects',
        'recipes/react/example-forms',
        'recipes/react/gate',
        'recipes/react/todo-creator',
        'recipes/react/dynamic-form-schema',
        'recipes/countdown-timer',
      ],
    },
    {
      type: 'category',
      label: 'React Native',
      items: ['recipes/react-native/example'],
    },
  ],
  'Advanced guide': ['advanced-guide/Computation priority'],
  FAQ: ['faq'],
}

module.exports = {
  docs: sidebar,
  api: sidebar,
}
