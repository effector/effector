//@flow

export opaque type ID = number
export type Read<_> = () => _
export type Write<_> = (_: _) => void
export type CopyRef<_> = () => Ref<_>
export type Close = () => void

export type Ref<_> = [ID, Read<_>, Write<_>, CopyRef<_>, Close]
/*::
declare function hide<T>(full: [ID, Read<T>, Write<T>, CopyRef<T>, Close, T]): Ref<T>
*/
let nextID: ID = 0

function read<_>(): _ {
 return this[5]
}
function write<T>(_: T) {
 this[5] = _
}
function close() {
 this.length = 0
}
function copyRef<_>(): Ref<_> {
 return /*::hide(*/ [++nextID, read, write, copyRef, close, this[5]] /*::)*/
}
export function createRef<T>(_: T): Ref<T> {
 return /*::hide(*/ [++nextID, read, write, copyRef, close, _] /*::)*/
}
