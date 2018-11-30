//@flow

export opaque type ID = number
export type Read<t> = () => t
export type Write<t> = (t: t) => void
export type CopyRef<t> = () => Ref<t>
export type Close = () => void

export type Ref<t> = [ID, Read<t>, Write<t>, CopyRef<t>, Close]
/*::
declare function hide<T>(
  full: [ID, Read<T>, Write<T>, CopyRef<T>, Close, T]
): Ref<T>
*/
let nextID: ID = 0

function read<t>(): t {
  return this[5]
}
function write<T>(t: T) {
  this[5] = t
}
function close() {
  this.length = 0
}
function copyRef<t>(): Ref<t> {
  return /*::hide(*/ [++nextID, read, write, copyRef, close, this[5]] /*::)*/
}
export function createRef<T>(t: T): Ref<T> {
  return /*::hide(*/ [++nextID, read, write, copyRef, close, t] /*::)*/
}
