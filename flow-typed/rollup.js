import {FSWatcher as Watcher} from 'fs'

declare module 'rollup' {
  import type {WatchOptions} from 'chokidar'

  import type {Program, Node} from 'estree'

  declare export var VERSION: string

  declare export interface IdMap {
    [key: string]: string;
  }

  declare export interface RollupError {
    message: string;
    code?: string;
    name?: string;
    url?: string;
    id?: string;
    loc?: {
      file?: string,
      line: number,
      column: number,
    };
    stack?: string;
    frame?: string;
    pos?: number;
    plugin?: string;
    pluginCode?: string;
  }

  declare export interface ExistingRawSourceMap {
    version: string;
    sources: string[];
    names: string[];
    sourceRoot?: string;
    sourcesContent?: string[];
    mappings: string;
    file: string;
  }

  declare export type RawSourceMap = {mappings: ''} | ExistingRawSourceMap

  declare export interface SourceMap {
    version: string;
    file: string;
    sources: string[];
    sourcesContent: string[];
    names: string[];
    mappings: string;

    toString(): string;
    toUrl(): string;
  }

  declare export interface SourceDescription {
    code: string;
    map?: string | RawSourceMap;
  }

  declare export interface TransformSourceDescription
    extends SourceDescription {
    ast?: Program;
    dependencies?: string[];
  }

  declare export interface ModuleJSON {
    id: string;
    dependencies: string[];
    transformDependencies: string[];
    transformAssets: Asset[] | void;
    code: string;
    originalCode: string;
    originalSourcemap: RawSourceMap | void;
    ast: Program;
    sourcemapChain: RawSourceMap[];
    resolvedIds: IdMap;
  }

  declare export interface Asset {
    name: string;
    source: string | Buffer;
    fileName: string;
    transform: boolean;
    dependencies: string[];
  }

  declare export interface PluginContext {
    watcher: Watcher;
    resolveId: ResolveIdHook;
    isExternal: IsExternal;
    parse: (input: string, options: any) => Program;
    emitAsset(name: string, source?: string | Buffer): string;
    emitAsset(
      name: string,
      dependencies: string[],
      source?: string | Buffer,
    ): string;
    setAssetSource: (assetId: string, source: string | Buffer) => void;
    getAssetFileName: (assetId: string) => string;
    warn(
      warning: RollupWarning | string,
      pos?: {line: number, column: number},
    ): void;
    error(
      err: RollupError | string,
      pos?: {line: number, column: number},
    ): void;
  }

  declare export type ResolveIdHook = (
    that: PluginContext,
    id: string,
    parent: string,
  ) => Promise<string | boolean | void | null> | string | boolean | void | null

  declare export type IsExternal = (
    id: string,
    parentId: string,
    isResolved: boolean,
  ) => Promise<boolean | void> | boolean | void

  declare export type LoadHook = (
    that: PluginContext,
    id: string,
  ) =>
    | Promise<SourceDescription | string | void | null>
    | SourceDescription
    | string
    | void
    | null

  declare export type TransformHook = (
    that: PluginContext,
    code: string,
    id: string,
  ) =>
    | Promise<TransformSourceDescription | string | void>
    | TransformSourceDescription
    | string
    | void

  declare export type TransformChunkHook = (
    code: string,
    options: OutputOptions,
    chunk: OutputChunk,
  ) =>
    | Promise<{code: string, map: RawSourceMap} | void>
    | {code: string, map: RawSourceMap}
    | void
    | null

  declare export type TransformChunkHookBound = (
    that: PluginContext,
    code: string,
    options: OutputOptions,
    chunk: OutputChunk,
  ) =>
    | Promise<{code: string, map: RawSourceMap} | void>
    | {code: string, map: RawSourceMap}
    | void

  declare export type ResolveDynamicImportHook = (
    that: PluginContext,
    specifier: string | Node,
    parentId: string,
  ) => Promise<string | void> | string | void

  declare export type AddonHook =
    | string
    | ((that: PluginContext) => string | Promise<string>)

  declare export interface Plugin {
    name: string;
    options?: (options: InputOptions) => InputOptions | void | null;
    load?: LoadHook;
    resolveId?: ResolveIdHook;
    transform?: TransformHook;
    // TODO: deprecate
    transformBundle?: TransformChunkHook;
    transformChunk?: TransformChunkHook;
    buildStart?: (
      that: PluginContext,
      options: InputOptions,
    ) => Promise<void> | void;
    buildEnd?: (that: PluginContext, err?: any) => Promise<void> | void;
    // TODO: deprecate
    ongenerate?: (
      that: PluginContext,
      options: OutputOptions,
      chunk: OutputChunk,
    ) => void | Promise<void>;
    // TODO: deprecate
    onwrite?: (
      that: PluginContext,
      options: OutputOptions,
      chunk: OutputChunk,
    ) => void | Promise<void>;
    generateBundle?: (
      that: PluginContext,
      options: OutputOptions,
      bundle: OutputBundle,
      isWrite: boolean,
    ) => void | Promise<void>;
    resolveDynamicImport?: ResolveDynamicImportHook;
    banner?: AddonHook;
    footer?: AddonHook;
    intro?: AddonHook;
    outro?: AddonHook;
  }

  declare export interface TreeshakingOptions {
    propertyReadSideEffects: boolean;
    pureExternalModules: boolean;
  }

  declare export type ExternalOption = string[] | IsExternal
  declare export type GlobalsOption =
    | {[name: string]: string}
    | ((name: string) => string)
  declare export type InputOption =
    | string
    | string[]
    | {[entryAlias: string]: string}

  declare export interface InputOptions {
    +input: $Subtype<InputOption>;
    +manualChunks?: {[chunkAlias: string]: string[]};
    +external?: ExternalOption;
    +plugins?: Plugin[];

    +onwarn?: WarningHandler;
    +cache?: RollupCache;

    +acorn?: {};
    +acornInjectPlugins?: Function[];
    +treeshake?: boolean | TreeshakingOptions;
    +context?: string;
    +moduleContext?: string | ((id: string) => string) | {[id: string]: string};
    +watch?: WatcherOptions;
    +inlineDynamicImports?: boolean;
    +experimentalCodeSplitting?: boolean;
    +preserveSymlinks?: boolean;
    +experimentalPreserveModules?: boolean;
    +optimizeChunks?: boolean;
    +chunkGroupingSize?: number;
    +shimMissingExports?: boolean;

    // undocumented?
    +pureExternalModules?: boolean;
    +preferConst?: boolean;
    +perf?: boolean;
  }

  declare export type ModuleFormat =
    | 'amd'
    | 'cjs'
    | 'system'
    | 'es'
    | 'es6'
    | 'iife'
    | 'umd'

  declare export type OptionsPaths = {} | ((id: string) => string)

  declare export type OutputOptions = {
    // only required for bundle.write
    file?: string,
    // only required for bundles.write
    dir?: string,
    // this is optional at the base-level of RollupWatchOptions,
    // which extends from this interface through config merge
    format?: ModuleFormat,
    name?: string,
    globals?: GlobalsOption,
    chunkFileNames?: string,
    entryFileNames?: string,
    assetFileNames?: string,

    paths?: OptionsPaths,
    banner?: string | (() => string | Promise<string>),
    footer?: string | (() => string | Promise<string>),
    intro?: string | (() => string | Promise<string>),
    outro?: string | (() => string | Promise<string>),
    sourcemap?: boolean | 'inline',
    sourcemapFile?: string,
    interop?: boolean,
    extend?: boolean,

    exports?: 'default' | 'named' | 'none' | 'auto',
    amd?: {
      id?: string,
      define?: string,
    },
    indent?: boolean,
    strict?: boolean,
    freeze?: boolean,
    esModule?: boolean,
    namespaceToStringTag?: boolean,
    compact?: boolean,

    // undocumented?
    noConflict?: boolean,

    // deprecated
    dest?: string,
    moduleId?: string,
  }

  declare export type OutputOptionsFile = OutputOptions & {
    file?: string,
  }

  declare export type OutputOptionsDir = OutputOptions & {
    // only required for bundles.write
    dir?: string,
  }

  declare export interface RollupWarning {
    message?: string;
    code?: string;
    loc?: {
      file: string,
      line: number,
      column: number,
    };
    deprecations?: {old: string, new: string}[];
    modules?: string[];
    names?: string[];
    source?: string;
    importer?: string;
    frame?: any;
    missing?: string;
    exporter?: string;
    exportName?: string;
    name?: string;
    sources?: string[];
    reexporter?: string;
    guess?: string;
    url?: string;
    id?: string;
    plugin?: string;
    pos?: number;
    pluginCode?: string;
  }

  declare export type WarningHandler = (warning: string | RollupWarning) => void

  declare export interface SerializedTimings {
    [label: string]: number;
  }

  declare export type OutputFile = string | Buffer | OutputChunk

  declare export interface RenderedModule {
    renderedExports: string[];
    removedExports: string[];
    renderedLength: number;
    originalLength: number;
  }

  declare export interface OutputChunk {
    imports: string[];
    exports: string[];
    modules: {
      [id: string]: RenderedModule,
    };
    code: string;
    map?: SourceMap;
  }

  declare export type RollupCache = {
    +modules: ModuleJSON[],
    +assetDependencies?: string[],
  }

  declare export type RollupSingleFileBuild = {
    // TODO: consider deprecating to match code splitting
    imports: string[],
    exports: {name: string, originalName: string, moduleId: string}[],
    modules: ModuleJSON[],
    cache: RollupCache,

    generate(outputOptions: OutputOptions): Promise<OutputChunk>,
    write(options: OutputOptions): Promise<OutputChunk>,
    getTimings?: () => SerializedTimings,
  }

  declare export interface OutputBundle {
    [fileName: string]: OutputChunk | OutputFile;
  }

  declare export type RollupBuild = {
    cache: RollupCache,
    generate(outputOptions: OutputOptions): Promise<{output: OutputBundle}>,
    write(options: OutputOptions): Promise<{output: OutputBundle}>,
    getTimings?: () => SerializedTimings,
  }

  declare export interface RollupFileOptions extends InputOptions {
    +cache?: RollupCache;
    +input: string;
    +output?: OutputOptionsFile;
  }

  declare export interface RollupDirOptions extends InputOptions {
    +cache?: RollupCache;
    +input: $Subtype<string[] | {[entryName: string]: string}>;
    +output?: OutputOptionsDir;
  }

  declare export function rollup(
    options: RollupFileOptions,
  ): Promise<RollupSingleFileBuild>
  declare export function rollup(
    options: RollupDirOptions,
  ): Promise<RollupBuild>

  declare export interface WatcherOptions {
    chokidar?: boolean | WatchOptions;
    include?: string[];
    exclude?: string[];
    clearScreen?: boolean;
  }

  declare export interface RollupWatchOptions extends InputOptions {
    +output?: OutputOptions | OutputOptions[];
    +watch?: WatcherOptions;
  }

  declare export function watch(configs: RollupWatchOptions[]): Watcher
}
