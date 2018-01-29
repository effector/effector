//@flow

declare export class ErrnoError {
  errno: number,
  code: string,
  path: string,
  syscall: string,
}

