
declare module 'js-yaml' {

 declare export interface LoadOptions {
  // string to be used as a file path in error/warning messages.
  filename?: string;
  // makes the loader to throw errors instead of warnings.
  strict?: boolean;
  // specifies a schema to use.
  schema?: any;
  // compatibility with JSON.parse behaviour.
  json?: boolean;
 }

 declare export interface TypeConstructorOptions {
  kind?: 'sequence' | 'scalar' | 'mapping';
  resolve?: (data: any) => boolean;
  construct?: (data: any) => any;
  instanceOf?: Object;
  predicate?: string;
  represent?: ((data: Object) => any) | { [x: string]: (data: Object) => any };
  defaultStyle?: string;
  styleAliases?: { [x: string]: any };
 }

 declare export function safeLoad(str: string, opts?: LoadOptions): any;
 declare export function load(str: string, opts?: LoadOptions): any;

 declare export class Type {
  constructor(tag: string, opts?: TypeConstructorOptions): Type;
  kind: 'sequence' | 'scalar' | 'mapping' | null;
  resolve(data: any): boolean;
  construct(data: any): any;
  instanceOf: Object | null;
  predicate: string | null;
  represent: ((data: Object) => any) | { [x: string]: (data: Object) => any } | null;
  defaultStyle: string | null;
  styleAliases: { [x: string]: any };
 }


 declare export class Schema implements SchemaDefinition {
  constructor(definition: SchemaDefinition): Schema;
  static create(types: Type[] | Type): Schema;
  static create(schemas: Schema[] | Schema, types: Type[] | Type): Schema;
 }

 declare export function safeLoadAll(str: string, ...none: void[]): any;
 declare export function safeLoadAll(str: string, opts: LoadOptions, none: void): any;
 declare export function safeLoadAll(str: string, iterator: (doc: any) => void, opts: LoadOptions): any;
 declare export function loadAll(str: string, ...none: void[]): any;
 declare export function loadAll(str: string, opts: LoadOptions, none: void): any;
 declare export function loadAll(str: string, iterator: (doc: any) => void, opts: LoadOptions): any;


 declare export interface DumpOptions {
  // indentation width to use (in spaces).
  indent?: number;
  // do not throw on invalid types (like function in the safe schema) and skip pairs and single values with such types.
  skipInvalid?: boolean;
  // specifies level of nesting, when to switch from block to flow style for collections. -1 means block style everwhere
  flowLevel?: number;
  // Each tag may have own set of styles.	- "tag" => "style" map.
  styles?: { [x: string]: any };
  // specifies a schema to use.
  schema?: any;
  // if true, sort keys when dumping YAML. If a function, use the function to sort the keys. (default: false)
  sortKeys?: boolean | ((a: any, b: any) => number);
  // set max line width. (default: 80)
  lineWidth?: number;
  // if true, don't convert duplicate objects into references (default: false)
  noRefs?: boolean;
  // if true don't try to be compatible with older yaml versions. Currently: don't quote "yes", "no" and so on, as required for YAML 1.1 (default: false)
  noCompatMode?: boolean;
  // if true flow sequences will be condensed, omitting the space between `key: value` or `a, b`. Eg. `'[a,b]'` or `{a:{b:c}}`.
  // Can be useful when using yaml for pretty URL query params as spaces are %-encoded. (default: false)
  condenseFlow?: boolean;
 }

 declare export function safeDump(obj: any, opts?: DumpOptions): string;
 declare export function dump(obj: any, opts?: DumpOptions): string;



 declare export interface SchemaDefinition {
  implicit?: any[];
  explicit?: Type[];
  include?: Schema[];
 }

 // only strings, arrays and plain objects: http://www.yaml.org/spec/1.2/spec.html#id2802346
 declare export var FAILSAFE_SCHEMA: Schema;
 // only strings, arrays and plain objects: http://www.yaml.org/spec/1.2/spec.html#id2802346
 declare export var JSON_SCHEMA: Schema;
 // same as JSON_SCHEMA: http://www.yaml.org/spec/1.2/spec.html#id2804923
 declare export var CORE_SCHEMA: Schema;
 // all supported YAML types, without unsafe ones (!!js/undefined, !!js/regexp and !!js/function): http://yaml.org/type/
 declare export var DEFAULT_SAFE_SCHEMA: Schema;
 // all supported YAML types.
 declare export var DEFAULT_FULL_SCHEMA: Schema;
 declare export var MINIMAL_SCHEMA: Schema;
 declare export var SAFE_SCHEMA: Schema;

 declare export class YAMLException extends Error {
  constructor(reason?: any, mark?: any): YAMLException;
  toString(compact?: boolean): string;
 }

}