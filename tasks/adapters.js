//@flow

import {massCopy} from 'Builder/utils'
import {rollupEffectorReduxAdapter} from 'Builder/rollup'
import {copyLicense, generatePackageJSON} from './common'

export default {
  '@effector/redux-adapter': [
    generatePackageJSON('@effector/redux-adapter'),
    copyLicense('@effector/redux-adapter'),
    () =>
      massCopy(
        'packages/@effector/redux-adapter',
        'npm/@effector/redux-adapter',
        [
          'index.d.ts',
          'README.md',
          'package.json',
          [
            'index.js.flow',
            [
              'index.js.flow',
              'adapter.cjs.js.flow',
              'adapter.es.js.flow',
              'adapter.umd.js.flow',
            ],
          ],
        ],
      ),
    rollupEffectorReduxAdapter,
    //publishScript('@effector/forms'),
  ],
}
