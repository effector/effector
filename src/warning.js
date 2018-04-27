//@flow

export default function warning(message: string) {
 if (typeof console !== 'undefined' && typeof console.error === 'function') {
  console.error(message)
 }
 try {
  throw new Error(message)
 } catch (e) {
  // catch here
 }
}
