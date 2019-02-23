//@flow
/* eslint-disable max-len */
import * as fs from 'fs-extra'
import {load} from 'js-yaml'
import {
  rollupEffector,
  rollupEffectorReact,
  rollupEffectorVue,
  rollupBabel,
  renderModulesGraph,
} from './rollup'
import packages from './packages.config'
import bsconfigs from './bsconfigs.config'
import {
  massCopy,
  publishScript,
  outputPackageJSON,
  validateConfig,
  loadYaml,
  cliArgs,
} from './utils'
import {taskList, setConfig} from './taskList'
import table from 'markdown-table'

const scope = {
  '@effector/babel-plugin': [
    () =>
      outputPackageJSON(
        'packages/@effector/babel-plugin/package.json',
        packages['@effector/babel-plugin'],
      ),
    () => massCopy('.', 'npm/@effector/babel-plugin', ['LICENSE']),
    () =>
      massCopy(
        'packages/@effector/babel-plugin',
        'npm/@effector/babel-plugin',
        ['package.json', 'README.md'],
      ),
    () => rollupBabel('@effector/babel-plugin', 'src/babel/babel-plugin'),
    publishScript('@effector/babel-plugin'),
  ],
  '@effector/babel-plugin-react': [
    () =>
      outputPackageJSON(
        'packages/@effector/babel-plugin-react/package.json',
        packages['@effector/babel-plugin-react'],
      ),
    () => massCopy('.', 'npm/@effector/babel-plugin-react', ['LICENSE']),
    () =>
      massCopy(
        'packages/@effector/babel-plugin-react',
        'npm/@effector/babel-plugin-react',
        ['package.json', 'README.md'],
      ),
    () =>
      rollupBabel(
        '@effector/babel-plugin-react',
        'src/babel/babel-plugin-react',
      ),
    publishScript('@effector/babel-plugin-react'),
  ],
}

taskList({
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
    ...scope,
  },
  hooks: {
    beforeAll: [
      () => fs.emptyDir(`${process.cwd()}/npm`),
      async() => {
        process.env.IS_BUILD = 'true'
      },
      async() => {
        if (cliArgs.current.length < 1) return
        const argRaw = cliArgs.current[0]
        let body
        try {
          body = load(argRaw)
        } catch {
          return
        }
        if (typeof body !== 'object' || body === null) return
        cliArgs.current.splice(0, 1)
        for (const field in body) {
          //$todo
          setConfig(field, body[field])
        }
      },
      async() => {
        const configRaw = await loadYaml('packages.yml')
        const config = validateConfig(configRaw)
        const packagesByCategory = new Map()
        for (const pkg of config.packages) {
          if (!packagesByCategory.has(pkg.category)) {
            packagesByCategory.set(pkg.category, [pkg])
          } else {
            packagesByCategory.set(pkg.category, [
              //$todo
              ...packagesByCategory.get(pkg.category),
              pkg,
            ])
          }
        }

        const npmVersionBadge = name =>
          `[![npm](https://img.shields.io/npm/v/${name}.svg?maxAge=3600)](https://www.npmjs.com/package/${name})`
        const npmDepsBadge = name =>
          `[![Dependency Status](https://david-dm.org/zerobias/effector.svg?path=packages/${name})](https://david-dm.org/zerobias/effector?path=packages/${name})`
        const markdown = `
# Monorepo
${config.categories
    .map(({name, description}) => {
      const mdHeader = `### ${description}`
      const data = packagesByCategory.get(name) || []
      const rawTable = [
        ['Package', 'Version', 'Dependencies'],
        ...data.map(pkg => [
          `[\`${pkg.name}\`](${pkg.name})`,
          npmVersionBadge(pkg.name),
          npmDepsBadge(pkg.name),
        ]),
      ]
      const mdTable = table(rawTable, {align: 'c'})
      return `

${mdHeader}

${mdTable}
`
    })
    .join('\n')}
`
        await fs.outputFile('./packages/README.md', markdown)
      },
    ],
  },
})
