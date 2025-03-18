import {massCopy, publishScript} from 'Builder/utils'
import {
  rollupEffector,
  rollupEffectorReact,
  rollupEffectorVue,
  rollupEffectorDom,
  rollupEffectorSolid,
} from 'Builder/rollup'
import {copyLicense, generatePackageJSON} from './common'

export default {
  effector: [
    generatePackageJSON('effector'),
    copyLicense('effector'),
    () => massCopy('.', 'npm/effector', ['README.md']),
    () =>
      massCopy('packages/effector', 'npm/effector', [
        [
          'index.d.ts',
          [
            'index.d.ts',
            'effector.cjs.d.ts',
            'effector.mjs.d.ts',
            'compat.d.ts',
          ],
        ],
        'package.json',
        'inspect.d.ts',
      ]),
    () => massCopy('src/babel', 'npm/effector', ['babel-plugin.js']),
    rollupEffector,
    publishScript('effector'),
  ],
  'effector-react': [
    generatePackageJSON('effector-react'),
    copyLicense('effector-react'),
    () =>
      massCopy('packages/effector-react', 'npm/effector-react', [
        [
          'index.d.ts',
          [
            'index.d.ts',
            'effector-react.cjs.d.ts',
            'effector-react.mjs.d.ts',
            'compat.d.ts',
          ],
        ],
        'README.md',
        'package.json',
      ]),
    rollupEffectorReact,
    publishScript('effector-react'),
  ],
  'effector-solid': [
    generatePackageJSON('effector-solid'),
    copyLicense('effector-solid'),
    () =>
      massCopy('packages/effector-solid', 'npm/effector-solid', [
        [
          'index.d.ts',
          ['index.d.ts', 'effector-solid.cjs.d.ts', 'effector-solid.mjs.d.ts'],
        ],
        'README.md',
        'package.json',
      ]),
    rollupEffectorSolid,
    publishScript('effector-solid'),
  ],
  'effector-vue': [
    generatePackageJSON('effector-vue'),
    copyLicense('effector-vue'),
    () =>
      massCopy('packages/effector-vue', 'npm/effector-vue', [
        [
          'index.d.ts',
          [
            'index.d.ts',
            'effector-vue.cjs.d.ts',
            'effector-vue.mjs.d.ts',
            'compat.d.ts',
          ],
        ],
        [
          'composition.d.ts',
          ['composition.d.ts', 'composition.cjs.d.ts', 'composition.mjs.d.ts'],
        ],
        'README.md',
        'package.json',
      ]),
    rollupEffectorVue,
    publishScript('effector-vue'),
  ],
  forest: [
    generatePackageJSON('forest'),
    copyLicense('forest'),
    () =>
      Promise.all([
        massCopy('packages/forest', 'npm/forest', [
          ['index.d.ts', ['index.d.ts', 'forest.cjs.d.ts', 'forest.mjs.d.ts']],
          'server.d.ts',
        ]),
        massCopy('packages/forest', 'npm/forest', [
          'README.md',
          'package.json',
        ]),
      ]),
    () => rollupEffectorDom({name: 'forest'}),
    publishScript('forest'),
  ],
}
