//@flow

import {readFile, outputFile} from 'fs-extra'
//$off
import Viz from 'viz.js'
//$off
import {Module, render} from 'viz.js/full.render.js'
//$off
import sharp from 'sharp'
import {massCopy, publishScript} from 'Builder/utils'
import {
  rollupEffector,
  rollupEffectorReact,
  rollupEffectorVue,
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
            'effector.es.d.ts',
            'effector.umd.d.ts',
            'compat.d.ts',
          ],
        ],
        'package.json',
        'fork.d.ts',
        [
          'index.js.flow',
          [
            'index.js.flow',
            'effector.cjs.js.flow',
            'effector.es.js.flow',
            'effector.umd.js.flow',
            'compat.js.flow',
          ],
        ],
      ]),
    () =>
      massCopy('src/babel', 'npm/effector', [
        'babel-plugin.js',
        'babel-plugin-react.js',
      ]),
    () =>
      massCopy('src/babel/plugin', 'npm/effector/plugin', [
        'defaultMetaVisitor.js',
        'noopMetaVisitor.js',
      ]),
    rollupEffector,
    renderModulesGraph,
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
            'effector-react.es.d.ts',
            'effector-react.umd.d.ts',
            'compat.d.ts',
          ],
        ],
        'README.md',
        'package.json',
        'ssr.d.ts',
        [
          'index.js.flow',
          [
            'index.js.flow',
            'effector-react.cjs.js.flow',
            'effector-react.es.js.flow',
            'effector-react.umd.js.flow',
            'compat.js.flow',
          ],
        ],
      ]),
    rollupEffectorReact,
    publishScript('effector-react'),
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
            'effector-vue.es.d.ts',
            'effector-vue.umd.d.ts',
            'compat.d.ts',
          ],
        ],
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

const viz = new Viz({Module, render})
async function renderModulesGraph() {
  const root = process.cwd()
  const source = await readFile(root + '/modules.dot', 'utf8')

  const svg = await viz.renderString(source)
  await outputFile(root + '/modules.svg', svg)
  const buffer = await new Promise((rs, rj) => {
    sharp(root + '/modules.svg')
      .toFormat('png')
      .toBuffer((err, data) => {
        if (err) return void rj(err)
        rs(data)
      })
  })
  await outputFile(root + '/modules.png', buffer)
}
