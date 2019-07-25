//@flow

import {massCopy, publishScript} from 'Builder/utils'
import {rollupBabel} from 'Builder/rollup'
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
    () => rollupBabel('@effector/babel-plugin', 'src/babel/babel-plugin'),
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
    () =>
      rollupBabel(
        '@effector/babel-plugin-react',
        'src/babel/babel-plugin-react',
      ),
    publishScript('@effector/babel-plugin-react'),
  ],
}
