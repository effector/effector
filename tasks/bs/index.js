//@flow
import {outputJSON} from 'fs-extra'
import {massCopy, publishScript} from 'Builder/utils'
import bsconfigs from './packages.config'
import {copyLicense, generatePackageJSON} from '../common'

export default {
  'bs-effector': [
    generatePackageJSON('bs-effector'),
    copyLicense('bs-effector'),
    () =>
      outputJSON(
        'packages/bs-effector/bsconfig.json',
        bsconfigs['bs-effector'],
        {spaces: 2},
      ),
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
    generatePackageJSON('bs-effector-react'),
    copyLicense('bs-effector-react'),
    () =>
      outputJSON(
        'packages/bs-effector-react/bsconfig.json',
        bsconfigs['bs-effector-react'],
        {spaces: 2},
      ),
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
