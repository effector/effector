//@flow

import {massCopy, publishScript} from 'Builder/utils'
import {rollupEffectorForms} from 'Builder/rollup'
import {copyLicense, generatePackageJSON} from './common'

export default {
  '@effector/forms': [
    generatePackageJSON('@effector/forms'),
    copyLicense('@effector/forms'),
    () =>
      massCopy('packages/@effector/forms', 'npm/@effector/forms', [
        'index.d.ts',
        'README.md',
        'package.json',
        [
          'index.js.flow',
          [
            'index.js.flow',
            'forms.cjs.js.flow',
            'forms.es.js.flow',
            'forms.umd.js.flow',
          ],
        ],
      ]),
    rollupEffectorForms,
    publishScript('@effector/forms'),
  ],
}
