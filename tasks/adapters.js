//@flow

import {outputPackageJSON, massCopy, publishScript} from 'Builder/utils'
import {rollupEffectorReduxAdapter} from 'Builder/rollup'
import packages from 'Builder/packages.config'

export default {
  '@effector/redux-adapter': [
    () =>
      outputPackageJSON(
        'packages/@effector/redux-adapter/package.json',
        packages['@effector/redux-adapter'],
      ),
    () => massCopy('.', 'npm/@effector/redux-adapter', ['LICENSE']),
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
