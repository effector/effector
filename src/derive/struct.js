//@flow

// import invariant from 'invariant'

import {derive} from './derivation'
import {deepUnpack} from './unpack'

export function struct(arg: *) {
 // invariant(
 //  arg.constructor === Object || Array.isArray(arg),
 //  '`struct` expects plain Object or Array',
 // )
 return derive(() => deepUnpack(arg))
}
