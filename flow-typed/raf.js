declare module 'raf' {
  declare export default function raf(cb: () => void): TimeoutID
}
