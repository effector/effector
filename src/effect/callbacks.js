//@flow

import type {Thunk, Callbacks} from './index.h'

const cbDone = function(value: any) {
 const cb = this[3]
 this.length = 0
 cb(value)
}
const cbFail = function(value: any) {
 const cb = this[4]
 this.length = 0
 cb(value)
}

export const callbacks = <Args, Done, Fail>(
 thunk: Thunk<Args, Done>,
 onDone: (_: {result: Done, params: Args}) => void,
 onFail: (_: {error: Fail, params: Args}) => void,
): Callbacks<Args, Done, Fail> => ([cbDone, cbFail, thunk, onDone, onFail]: any)
