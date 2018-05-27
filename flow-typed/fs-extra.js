declare module 'fs-extra' {
 import type {
  createReadStream as createReadStreamType,
  createWriteStream as createWriteStreamType,
 } from 'fs'

 declare export var createReadStream: createReadStreamType
 declare export var createWriteStream: createWriteStreamType

 declare class ErrnoError {
  errno: number;
  code: string;
  path: string;
  syscall: string;
 }
 declare export type Encoding =
  | 'utf8'
  | 'utf-8'
  | 'ucs2'
  | 'ucs-2'
  | 'utf16le'
  | 'utf-16le'
  | 'latin1'
  | 'binary'
  | 'base64'
  | 'ascii'
  | 'hex'
 declare export class Stats {
  dev: number;
  ino: number;
  mode: number;
  nlink: number;
  uid: number;
  gid: number;
  rdev: number;
  size: number;
  blksize: number;
  blocks: number;
  atimeMs: number;
  mtimeMs: number;
  ctimeMs: number;
  birthtimeMs: number;
  atime: Date;
  mtime: Date;
  ctime: Date;
  birthtime: Date;
  isFile(): boolean;
  isDirectory(): boolean;
  isBlockDevice(): boolean;
  isCharacterDevice(): boolean;
  isSymbolicLink(): boolean;
  isFIFO(): boolean;
  isSocket(): boolean;
 }
 declare export interface PathEntry {
  path: string;
  stats: Stats;
 }
 declare export interface PathEntryStream {
  read(): PathEntry | null;
 }
 declare export type CopyFilter =
  | ((src: string, dest: string) => boolean)
  | RegExp
 declare export type SymlinkType = 'dir' | 'file'
 declare export interface CopyOptions {
  dereference?: boolean;
  overwrite?: boolean;
  preserveTimestamps?: boolean;
  errorOnExist?: boolean;
  filter?: CopyFilter;
  recursive?: boolean;
 }
 declare export interface MoveOptions {
  overwrite?: boolean;
  limit?: number;
 }
 declare export interface ReadOptions {
  throws?: boolean;
  fs?: Object;
  reviver?: any;
  encoding?: Encoding;
  flag?: string;
 }
 declare export interface WriteOptions {
  fs?: Object;
  replacer?: any;
  spaces?: number;
  encoding?: Encoding;
  flag?: string;
  mode?: number;
 }
 declare export interface ReadResult {
  bytesRead: number;
  buffer: Buffer;
 }
 declare export interface WriteResult {
  bytesWritten: number;
  buffer: Buffer;
 }
 declare export function copy(
  src: string,
  dest: string,
  options?: CopyOptions,
 ): Promise<void>
 declare export function copySync(
  src: string,
  dest: string,
  options?: CopyOptions,
 ): void
 declare export function move(
  src: string,
  dest: string,
  options?: MoveOptions,
 ): Promise<void>
 declare export function moveSync(
  src: string,
  dest: string,
  options?: MoveOptions,
 ): void
 declare export function createFile(file: string): Promise<void>
 declare export function createFileSync(file: string): void
 declare export function ensureDir(path: string): Promise<void>
 declare export function ensureDirSync(path: string): void
 declare export function mkdirs(dir: string): Promise<void>
 declare export function mkdirp(dir: string): Promise<void>
 declare export function mkdirsSync(dir: string): void
 declare export function mkdirpSync(dir: string): void
 declare export function outputFile(file: string, data: any): Promise<void>
 declare export function outputFileSync(file: string, data: any): void
 declare export function readJson(
  file: string,
  options?: ReadOptions,
 ): Promise<any>
 declare export function readJSON(
  file: string,
  options?: ReadOptions,
 ): Promise<any>
 declare export function readJsonSync(file: string, options?: ReadOptions): any
 declare export function readJSONSync(file: string, options?: ReadOptions): any
 declare export function remove(dir: string): Promise<void>
 declare export function removeSync(dir: string): void
 declare export function outputJSON(
  file: string,
  data: any,
  options?: WriteOptions,
 ): Promise<void>
 declare export function outputJson(
  file: string,
  data: any,
  options?: WriteOptions,
 ): Promise<void>
 declare export function outputJsonSync(
  file: string,
  data: any,
  options?: WriteOptions,
 ): void
 declare export function outputJSONSync(
  file: string,
  data: any,
  options?: WriteOptions,
 ): void
 declare export function writeJSON(
  file: string,
  object: any,
  options?: WriteOptions,
 ): Promise<void>
 declare export function writeJson(
  file: string,
  object: any,
  options?: WriteOptions,
 ): Promise<void>
 declare export function writeJsonSync(
  file: string,
  object: any,
  options?: WriteOptions,
 ): void
 declare export function writeJSONSync(
  file: string,
  object: any,
  options?: WriteOptions,
 ): void
 declare export function ensureFile(path: string): Promise<void>
 declare export function ensureFileSync(path: string): void
 declare export function ensureLink(src: string, dest: string): Promise<void>
 declare export function ensureLinkSync(src: string, dest: string): void
 declare export function ensureSymlink(
  src: string,
  dest: string,
  type?: SymlinkType,
 ): Promise<void>
 declare export function ensureSymlinkSync(
  src: string,
  dest: string,
  type?: SymlinkType,
 ): void
 declare export function emptyDir(path: string): Promise<void>
 declare export function emptyDirSync(path: string): void
 declare export function pathExists(path: string): Promise<boolean>
 declare export function pathExistsSync(path: string): boolean

 /**
  * Tests a user's permissions for the file specified by path.
  */
 declare export function access(
  path: string | Buffer,
  callback: (err: ErrnoError | null) => void,
 ): void
 declare export function appendFile(
  file: string | Buffer | number,
  data: any,
  options: {
   encoding?: Encoding,
   mode?: number | string,
   flag?: string,
  },
  callback: (err: ErrnoError | null) => void,
 ): void
 declare export function chmod(
  path: string | Buffer,
  mode: string | number,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function chown(
  path: string | Buffer,
  uid: number,
  gid: number,
 ): Promise<void>
 declare export function close(
  fd: number,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function fchmod(
  fd: number,
  mode: string | number,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function fchown(
  fd: number,
  uid: number,
  gid: number,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function fdatasync(fd: number, callback: () => void): void
 declare export function fstat(
  fd: number,
  callback: (err: ErrnoError | null, stats: Stats) => any,
 ): void
 declare export function fsync(
  fd: number,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function ftruncate(
  fd: number,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function futimes(
  fd: number,
  atime: number,
  mtime: number,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function lchown(
  path: string | Buffer,
  uid: number,
  gid: number,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function link(
  srcpath: string | Buffer,
  dstpath: string | Buffer,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function lstat(
  path: string | Buffer,
  callback: (err: ErrnoError | null, stats: Stats) => any,
 ): void

 /**
  * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
  * @param path
  * @param callback No arguments other than a possible exception are given to the completion callback.
  */
 declare export function mkdir(
  path: string | Buffer,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function open(
  path: string | Buffer,
  flags: string | number,
  callback: (err: ErrnoError | null, fd: number) => void,
 ): void
 declare export function read(
  fd: number,
  buffer: Buffer,
  offset: number,
  length: number,
  position: number | null,
  callback: (err: ErrnoError | null, bytesRead: number, buffer: Buffer) => void,
 ): void
 declare export function readFileSync(
  file: string | Buffer | number,
  ...none: void[]
 ): Buffer
 declare export function readFileSync(
  file: string | Buffer | number,
  options: {encoding: 'utf8'},
 ): string

 declare export function readFile(
  file: string | Buffer | number,
  ...none: void[]
 ): Promise<Buffer>
 declare export function readFile(
  file: string | Buffer | number,
  encoding: 'utf8',
  ...none: void[]
 ): Promise<string>
 declare export function readFile(
  file: string | Buffer | number,
  callback: (err: ErrnoError | null, data: Buffer) => void,
 ): void
 declare export function readdir(
  path: string | Buffer,
  ...none: void[]
 ): Promise<string[]>
 declare export function readdir(
  path: string | Buffer,
  callback: (err: ErrnoError | null, files: string[]) => void,
 ): void
 declare export function readdirSync(
  path: string,
  options?: string | {encoding: Encoding},
 ): Array<string>
 declare export function readlink(
  path: string | Buffer,
  callback: (err: ErrnoError | null, linkString: string) => any,
 ): void
 declare export function realpath(
  path: string | Buffer,
  callback: (err: ErrnoError | null, resolvedPath: string) => any,
 ): void
 declare export function rename(
  oldPath: string,
  newPath: string,
  callback: (err: ?ErrnoError) => void,
 ): void

 /**
  * Asynchronous rmdir - removes the directory specified in {path}
  * @param path
  * @param callback No arguments other than a possible exception are given to the completion callback.
  */
 declare export function rmdir(
  path: string | Buffer,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function stat(
  path: string | Buffer,
  callback: (err: ErrnoError | null, stats: Stats) => any,
 ): void
 declare export function symlink(
  srcpath: string | Buffer,
  dstpath: string | Buffer,
  type: string,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function truncate(
  path: string | Buffer,
  callback: (err: ?ErrnoError) => void,
 ): void

 /**
  * Asynchronous unlink - deletes the file specified in {path}
  * @param path
  * @param callback No arguments other than a possible exception are given to the completion callback.
  */
 declare export function unlink(
  path: string | Buffer,
  callback: (err: ?ErrnoError) => void,
 ): void
 declare export function utimes(
  path: string | Buffer,
  atime: number,
  mtime: number,
  callback: (err?: ErrnoError) => void,
 ): void
 declare export function write(
  fd: number,
  buffer: Buffer,
  offset: number,
  length: number,
  position: number | null,
  callback: (err: ErrnoError, written: number, buffer: Buffer) => void,
 ): void
 declare export function writeFile(
  file: string | Buffer | number,
  data: any,
  ...none: void[]
 ): Promise<mixed>
 declare export function writeFile(
  file: string | Buffer | number,
  data: any,
  callback: (err: ErrnoError | null) => void,
 ): void

 /**
  * Asynchronous mkdtemp - Creates a unique temporary directory. Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
  * @param prefix
  * @param callback The created folder path is passed as a string to the callback's second parameter.
  */
 declare export function mkdtemp(prefix: string): Promise<string>
}
