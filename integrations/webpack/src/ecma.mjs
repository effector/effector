import * as effectorNPM from 'effector'

console.log('effector npm', effectorNPM)

import * as effectorES2 from 'effector/effector.mjs'
import * as effectorES from '../npm/effector/effector.mjs'

console.log('effector es', effectorES, effectorES2)

const effectorCJS = require('../npm/effector/effector.js')

// doesn't resolve?
console.log('effector cjs', effectorCJS)
