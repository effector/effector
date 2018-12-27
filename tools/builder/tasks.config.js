//@flow
import * as fs from 'fs-extra'
import {rollupEffector} from './rollup'
import packages from './packages.config'
import {taskList, massCopy, outputPackageJSON} from './utils'

export default taskList({
  tasks: {
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
              'effector.bundle.js.flow',
            ],
          ],
        ]),
      rollupEffector,
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
          'package.json',
          [
            'index.js.flow',
            [
              'index.js.flow',
              'effector-react.cjs.js.flow',
              'effector-react.es.js.flow',
              'effector-react.bundle.js.flow',
            ],
          ],
        ]),
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
          'package.json',
          [
            'index.js.flow',
            [
              'index.js.flow',
              'effector-vue.cjs.js.flow',
              'effector-vue.es.js.flow',
              'effector-vue.bundle.js.flow',
            ],
          ],
        ]),
    ],
  },
  hooks: {
    beforeAll: [() => fs.emptyDir(`${process.cwd()}/npm`)],
  },
})
