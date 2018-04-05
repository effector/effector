//@flow

export type $npm$shelljs$Array<T> = Array<T> & ShellResult
export type $npm$shelljs$Async = Class<child_process$ChildProcess>
export type ShellPattern = RegExp | string
export type $npm$shelljs$String = String & ShellResult

export type ShellConfig = {
  fatal: boolean,
  globOpts: {
    nodir: boolean,
  },
  silent: boolean,
  verbose: boolean,
}

export type ExecThen = (
  code: number,
  stdout: string,
  stderr: string,
) => void

export type ExecOpts = {
  cwd?: string,
  env?: Object,
  encoding?: string,
  shell?: string,
  timeout?: number,
  maxBuffer?: number,
  killSignal?: string,
  uid?: number,
  gid?: number,
  async?: boolean,
  silent?: boolean,
}

export type ExecOptsAsync = {
  cwd?: string,
  env?: Object,
  encoding?: string,
  shell?: string,
  timeout?: number,
  maxBuffer?: number,
  killSignal?: string,
  uid?: number,
  gid?: number,
  async: true,
  silent?: boolean,
}

export type ExecOptsSync = {
  cwd?: string,
  input?: string | Buffer,
  stdio?: string | Array<any>,
  env?: Object,
  shell?: string,
  uid?: number,
  gid?: number,
  timeout?: number,
  killSignal?: string,
  maxBuffer?: number,
  encoding?: string,
  async?: boolean,
  silent?: boolean,
}
export type GrepOpts = { '-l': boolean, '-v': boolean }
export type SedOpts = { '-i': boolean }
export type SortOpts = { '-n': boolean, '-r': boolean }
export type TestOpts =
  | '-b'
  | '-c'
  | '-d'
  | '-e'
  | '-f'
  | '-L'
  | '-p'
  | '-S'
export type TouchOpts = {
  '-a': boolean,
  '-c': boolean,
  '-m': boolean,
  '-d'?: string,
  '-r'?: string,
}

// dupe from flow lib until we can import
export type ShellFileStats = {
  atime: Date,
  birthtime: Date, // FIXME: add to flow lib
  blksize: number,
  blocks: number,
  ctime: Date,
  dev: number,
  gid: number,
  ino: number,
  mode: number,
  mtime: Date,
  name: string, // NOTE: specific to shelljs
  nlink: number,
  rdev: number,
  size: number,
  uid: number,
  isBlockDevice(): boolean,
  isCharacterDevice(): boolean,
  isDirectory(): boolean,
  isFIFO(): boolean,
  isFile(): boolean,
  isSocket(): boolean,
  isSymbolicLink(): boolean,
}

export type ShellResult = {
  code: number,
  stdout: string,
  stderr: string,
  to(file: string): $npm$shelljs$String,
  toEnd(file: string): $npm$shelljs$String,
  cat(rest: void): $npm$shelljs$String,
  exec: ((
    cmd: string,
    opts: ExecOpts & { async: true },
    then: ExecThen,
    rest: void,
  ) => $npm$shelljs$Async) &
    ((
      cmd: string,
      opts: ExecOpts & { async: true },
      rest: void,
    ) => $npm$shelljs$Async) &
    ((cmd: string, opts: ExecOptsSync, rest: void) => $npm$shelljs$String) &
    ((cmd: string, rest: void) => $npm$shelljs$String) &
    ((cmd: string, then: ExecThen, rest: void) => $npm$shelljs$Async),
  grep: ((
    opts: GrepOpts,
    rx: ShellPattern,
    rest: void,
  ) => $npm$shelljs$String) &
    ((rx: ShellPattern, rest: void) => $npm$shelljs$String),
  head: ((num: number, rest: void) => $npm$shelljs$String) &
    ((rest: void) => $npm$shelljs$String),
  sed: (rx: ShellPattern, subst: string, rest: void) => $npm$shelljs$String,
  sort: ((opts: SortOpts, rest: void) => $npm$shelljs$String) &
    ((rest: void) => $npm$shelljs$String),
  tail: ((num: number, rest: void) => $npm$shelljs$String) &
    ((rest: void) => $npm$shelljs$String),
}

export type ShellArray<T> = $npm$shelljs$Array<T>
export type ShellAsync = child_process$ChildProcess
export type ShellResultType = $npm$shelljs$String

export type ChmodOpts = {
  '-R': boolean,
  '-c': boolean,
  '-v': boolean,
}
export type CpOpts = {
  '-P': boolean,
  '-L': boolean,
  '-R': boolean,
  '-f': boolean,
  '-n': boolean,
}
export type DirsOpts = '-c'
export // FIXME
type DirsIdx =
  | '-0'
  | '-1'
  | '-2'
  | '-3'
  | '-4'
  | '-5'
  | '-6'
  | '-7'
  | '-8'
  | '-9'
  | '-10'
  | '-11'
  | '-12'
  | '-13'
  | '-14'
  | '-15'
  | '-16'
  | '-17'
  | '-18'
  | '-19'
  | '-20'
  | '-21'
  | '-22'
  | '-23'
  | '-24'
  | '-25'
  | '-26'
  | '-27'
  | '-28'
  | '-29'
  | '-30'
  | '-31'
  | '+0'
  | '+1'
  | '+2'
  | '+3'
  | '+4'
  | '+5'
  | '+6'
  | '+7'
  | '+8'
  | '+9'
  | '+10'
  | '+11'
  | '+12'
  | '+13'
  | '+14'
  | '+15'
  | '+16'
  | '+17'
  | '+18'
  | '+19'
  | '+20'
  | '+21'
  | '+22'
  | '+23'
  | '+24'
  | '+25'
  | '+26'
  | '+27'
  | '+28'
  | '+29'
  | '+30'
  | '+31'

export type LnOpts = { '-f': boolean, '-s': boolean }
export type LsOpts = {
  '-A': boolean,
  '-R': boolean,
  '-d': boolean,
  '-l': boolean,
}
export type MkdirOpts = { '-p': boolean }
export type MvOpts = { '-f': boolean, '-n': boolean }
export type PopdOpts = { '-n': boolean }
export type PushdOpts = { '-n': boolean }
export type RmOpts = { '-f': boolean, '-r': boolean }
declare export var ShellString: ((
  stdout: string,
  stderr?: string,
  code?: number,
) => ShellResultType) &
  (<T>(stdout: T[], stderr?: string, code?: number) => ShellArray<T>)
declare export var config: ShellConfig
declare export var env: { [key: string]: string }
declare export function cat(glob: string, ...rest: string[]): ShellResultType
declare export function cd(dir?: string): ShellResultType
declare export function chmod(
  mode: number | string,
  glob: string,
  ...rest: string[]
): ShellResultType
declare export function chmod(
  opts: ChmodOpts,
  mode: number | string,
  glob: string,
  ...rest: string[]
): ShellResultType
declare export var cp: ((
  opts: CpOpts,
  src: string,
  next: string,
  ...rest: string[]
) => ShellResultType) &
  ((src: string, next: string, ...rest: string[]) => ShellResultType)
declare export function dirs(
  idxOrOpts?: DirsIdx | DirsOpts,
): string[]
declare export function echo(
  ...rest: $ReadOnlyArray<number | string>
): ShellResultType
// FIXME: consider allowing more input types
declare export function error(rest: void): ?string

declare export function exec(cmd: string, opts: ExecOptsAsync, ...rest: void[]): ShellAsync
declare export function exec(cmd: string, opts: ExecThen, ...rest: void[]): ShellAsync
declare export function exec(cmd: string, opts: ExecOptsAsync, then: ExecThen): ShellAsync
declare export function exec(cmd: string, opts: ExecOptsSync, ...rest: void[]): ShellResultType
declare export function exec(cmd: string, ...rest: void[]): ShellResultType

declare export function exit(code?: number): void
declare export var find: (
  glob: string,
  ...rest: string[]
) => ShellArray<string>
declare export var grep: ((
  opts: GrepOpts,
  rx: ShellPattern,
  glob: string,
  ...rest: string[]
) => ShellResultType) &
  ((rx: ShellPattern, glob: string, ...rest: string[]) => ShellResultType)
declare export var head: ((
  num: number,
  glob: string,
  ...rest: string[]
) => ShellResultType) &
  ((glob: string, ...rest: string[]) => ShellResultType)
declare export var ln: ((
  opts: LnOpts,
  src: string,
  tgt: string,
  rest: void,
) => ShellResultType) &
  ((src: string, tgt: string, rest: void) => ShellResultType)
declare export var ls: ((
  opts: LsOpts & { '-l': true },
  glob: string,
  ...rest: string[]
) => ShellArray<ShellFileStats>) &
  ((opts: LsOpts, glob: string, ...rest: string[]) => ShellArray<string>) &
  ((glob: string, ...rest: string[]) => ShellArray<string>)
declare export var mkdir: ((
  opts: MkdirOpts,
  dir: string,
  ...rest: string[]
) => ShellResultType) &
  ((dir: string, ...rest: string[]) => ShellResultType)
declare export var mv: ((
  opts: MvOpts,
  src: string,
  next: string,
  ...rest: string[]
) => ShellResultType) &
  ((src: string, next: string, ...rest: string[]) => ShellResultType)
declare export var popd: ((
  opts: PopdOpts,
  idx: string,
  rest: void,
) => string[]) &
  ((opts: PopdOpts, rest: void) => string[]) &
  ((idx: string, rest: void) => string[]) &
  ((rest: void) => string[])
declare export var pushd: ((
  opts: PushdOpts,
  dirOrIdx: string,
  rest: void,
) => string[]) &
  ((dirOrIdx: string, rest: void) => string[])
declare export var pwd: (rest: void) => ShellResultType
declare export var rm: ((
  opts: RmOpts,
  glob: string,
  ...rest: string[]
) => ShellResultType) &
  ((glob: string, ...rest: string[]) => ShellResultType)
declare export var sed: ((
  opts: SedOpts,
  rx: ShellPattern,
  subst: string,
  glob: string,
  ...rest: string[]
) => ShellResultType) &
  ((
    rx: ShellPattern,
    subst: string,
    glob: string,
    ...rest: string[]
  ) => ShellResultType)
declare export var set: ((exitOnError: '-e' | '+e', rest: void) => void) &
  ((verbose: '-v' | '+v', rest: void) => void) &
  ((disableGlobbing: '-f' | '+f', rest: void) => void)
declare export var sort: ((
  opts: SortOpts,
  glob: string,
  ...rest: string[]
) => ShellResultType) &
  ((glob: string, ...rest: string[]) => ShellResultType)
declare export var tail: ((
  num: number,
  glob: string,
  ...rest: string[]
) => ShellResultType) &
  ((glob: string, ...rest: string[]) => ShellResultType)
declare export var tempdir: (rest: void) => string
declare export var test: (mode: TestOpts, path: string, rest: void) => boolean
declare export var touch: ((
  opts: TouchOpts,
  glob: string,
  ...rest: string[]
) => ShellResultType) &
  ((glob: string, ...rest: string[]) => ShellResultType)
declare export var which: (cmd: string, rest: void) => ShellResultType
