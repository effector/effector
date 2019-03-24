//@flow

import {outputPackageJSON, massCopy, publishScript} from 'Builder/utils'
import {
  rollupEffector,
  rollupEffectorReact,
  rollupEffectorVue,
} from 'Builder/rollup'
import packages from 'Builder/packages.config'
import renderModulesGraph from 'Builder/moduleGraphGenerator'

export default {
  effector: [
    () =>
      outputPackageJSON('packages/effector/package.json', packages.effector),
    () => massCopy('.', 'npm/effector', ['LICENSE', 'README.md']),
    () =>
      massCopy('packages/effector', 'npm/effector', [
        'index.d.ts',
        'package.json',
        [
          'index.js.flow',
          [
            'index.js.flow',
            'effector.cjs.js.flow',
            'effector.es.js.flow',
            'effector.umd.js.flow',
          ],
        ],
      ]),
    rollupEffector,
    renderModulesGraph,
    publishScript('effector'),
  ],
  'effector-react': [
    () =>
      outputPackageJSON(
        'packages/effector-react/package.json',
        packages['effector-react'],
      ),
    () => massCopy('.', 'npm/effector-react', ['LICENSE']),
    () =>
      massCopy('packages/effector-react', 'npm/effector-react', [
        'index.d.ts',
        'README.md',
        'package.json',
        [
          'index.js.flow',
          [
            'index.js.flow',
            'effector-react.cjs.js.flow',
            'effector-react.es.js.flow',
            'effector-react.umd.js.flow',
          ],
        ],
      ]),
    rollupEffectorReact,
    publishScript('effector-react'),
  ],
  'effector-vue': [
    () =>
      outputPackageJSON(
        'packages/effector-vue/package.json',
        packages['effector-vue'],
      ),
    () => massCopy('.', 'npm/effector-vue', ['LICENSE']),
    () =>
      massCopy('packages/effector-vue', 'npm/effector-vue', [
        'index.d.ts',
        'README.md',
        'package.json',
        [
          'index.js.flow',
          [
            'index.js.flow',
            'effector-vue.cjs.js.flow',
            'effector-vue.es.js.flow',
            'effector-vue.umd.js.flow',
          ],
        ],
      ]),
    rollupEffectorVue,
    publishScript('effector-vue'),
  ],
}
