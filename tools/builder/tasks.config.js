//@flow
import * as fs from 'fs-extra'
//$todo
import execa from 'execa'
import {
  rollupEffector,
  rollupEffectorReact,
  rollupEffectorVue,
  renderModulesGraph,
} from './rollup'
import packages from './packages.config'
import bsconfigs from './bsconfigs.config'
import {taskList, massCopy, outputPackageJSON} from './utils'

const publishScript = name => async() => {
  const args = process.argv.slice(2)
  if (args.length < 2) return
  const command = args.shift()
  const argument = args.shift()
  if (command === 'publish') {
    if (argument === 'next') {
      const {stdout, stderr} = await execa(
        'npm',
        ['publish', '--tag', 'next'],
        {
          cwd: `${process.cwd()}/npm/${name}`,
        },
      )
      console.log(stdout)
      console.error(stderr)
    } else if (argument === 'latest') {
      const {stdout, stderr} = await execa(
        'npm',
        ['publish', '--tag', 'latest'],
        {
          cwd: `${process.cwd()}/npm/${name}`,
        },
      )
      console.log(stdout)
      console.error(stderr)
    }
  }
}

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
              'effector-react.bundle.js.flow',
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
              'effector-vue.bundle.js.flow',
            ],
          ],
        ]),
      rollupEffectorVue,
      publishScript('effector-vue'),
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
        massCopy('src/reason', 'npm/bs-effector', [
          ['Effector.re', 'src/Effector.re'],
        ]),
      () =>
        massCopy('packages/bs-effector', 'npm/bs-effector', [
          'README.md',
          'package.json',
          'bsconfig.json',
        ]),
      publishScript('bs-effector'),
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
        massCopy('src/reason', 'npm/bs-effector-react', [
          ['EffectorReact.re', 'src/EffectorReact.re'],
        ]),
      () =>
        massCopy('packages/bs-effector-react', 'npm/bs-effector-react', [
          'README.md',
          'package.json',
          'bsconfig.json',
        ]),
      publishScript('bs-effector-react'),
    ],
  },
  hooks: {
    beforeAll: [() => fs.emptyDir(`${process.cwd()}/npm`)],
  },
})
