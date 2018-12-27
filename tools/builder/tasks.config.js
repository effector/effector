//@flow
import * as fs from 'fs-extra'
import {rollupEffector, rollupEffectorReact, rollupEffectorVue} from './rollup'
import packages from './packages.config'
import bsconfigs from './bsconfigs.config'
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
          'README.md',
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
      rollupEffectorReact,
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
              'effector-vue.bundle.js.flow',
            ],
          ],
        ]),
      rollupEffectorVue,
    ],
    'bs-effector': [
      () =>
        outputPackageJSON(
          'packages/bs-effector/package.json',
          packages['bs-effector'],
        ),
      () =>
        fs.outputJSON(
          'packages/bs-effector/bsconfig.json',
          bsconfigs['bs-effector'],
          {spaces: 2},
        ),
      () => massCopy('.', 'npm/bs-effector', ['LICENSE']),
      () =>
        massCopy('packages/bs-effector', 'npm/bs-effector', [
          'README.md',
          'package.json',
          'bsconfig.json',
          'src/Effector.re',
        ]),
    ],
    'bs-effector-react': [
      () =>
        outputPackageJSON(
          'packages/bs-effector-react/package.json',
          packages['bs-effector-react'],
        ),
      () =>
        fs.outputJSON(
          'packages/bs-effector-react/bsconfig.json',
          bsconfigs['bs-effector-react'],
          {spaces: 2},
        ),
      () => massCopy('.', 'npm/bs-effector-react', ['LICENSE']),
      () =>
        massCopy('packages/bs-effector-react', 'npm/bs-effector-react', [
          'README.md',
          'package.json',
          'bsconfig.json',
          'src/EffectorReact.re',
        ]),
    ],
  },
  hooks: {
    beforeAll: [() => fs.emptyDir(`${process.cwd()}/npm`)],
  },
})
