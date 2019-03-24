//@flow

import {outputPackageJSON, massCopy, publishScript} from 'Builder/utils'
import {rollupBabel} from 'Builder/rollup'
import packages from 'Builder/packages.config'

export default {
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
