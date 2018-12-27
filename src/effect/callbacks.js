//@flow

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

export const callbacks = (
  thunk: Function,
  onDone: (_: *) => void,
  onFail: (_: *) => void,
): any => [cbDone, cbFail, thunk, onDone, onFail]
