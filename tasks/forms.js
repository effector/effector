//@flow

import {outputPackageJSON, massCopy, publishScript} from 'Builder/utils'
import {rollupEffectorForms} from 'Builder/rollup'
import packages from 'Builder/packages.config'

export default {
  '@effector/forms': [
    () =>
      outputPackageJSON(
        'packages/@effector/forms/package.json',
        packages['@effector/forms'],
      ),
    () => massCopy('.', 'npm/@effector/forms', ['LICENSE']),
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
    //publishScript('@effector/forms'),
  ],
}
