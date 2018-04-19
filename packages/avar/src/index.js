//@flow

export {makeVar} from './class'

export type {AVar} from './class'

export {
 _killVar as killVar,
 _putVar as putVar,
 _takeVar as takeVar,
 _readVar as readVar,
 _tryPutVar as tryPutVar,
 _tryTakeVar as tryTakeVar,
 _tryReadVar as tryReadVar,
} from './methods'

export type {Cancel, Delegate} from './index.h'
