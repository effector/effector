//@flow

import {massCopy, publishScript} from 'Builder/utils'
import {rollupBabel, rollupBabelReact} from 'Builder/rollup'
import {copyLicense, generatePackageJSON} from './common'

export default {
  '@effector/babel-plugin': [
    generatePackageJSON('@effector/babel-plugin'),
    copyLicense('@effector/babel-plugin'),
    () =>
      massCopy(
        'packages/@effector/babel-plugin',
        'npm/@effector/babel-plugin',
        ['package.json', 'README.md'],
      ),
    () =>
      massCopy('src/babel/plugin', 'npm/@effector/babel-plugin/plugin', [
        'defaultMetaVisitor.js',
        'noopMetaVisitor.js',
      ]),
    rollupBabel,
    publishScript('@effector/babel-plugin'),
  ],
  '@effector/babel-plugin-react': [
    generatePackageJSON('@effector/babel-plugin-react'),
    copyLicense('@effector/babel-plugin-react'),
    () =>
      massCopy(
        'packages/@effector/babel-plugin-react',
        'npm/@effector/babel-plugin-react',
        ['package.json', 'README.md'],
      ),
    rollupBabelReact,
    publishScript('@effector/babel-plugin-react'),
  ],
}
