//@flow
import * as fs from 'fs-extra'
import {outputPackageJSON, massCopy, publishScript} from 'Builder/utils'
import packages from 'Builder/packages.config'
import bsconfigs from './packages.config'

export default {
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
}
