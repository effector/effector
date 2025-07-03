import type {
  CallExpression,
  VariableDeclaration,
  ExpressionStatement,
  IfStatement,
  ImportDeclaration,
  ObjectExpression,
  TaggedTemplateExpression,
  Identifier,
} from '@babel/types'
import type {NodePath} from '@babel/traverse'
import type {PluginPass} from '@babel/core'

export type WithRegionTemplate = (params: {
  WITH_REGION: string
  REGION_NAME: string
  FN: CallExpression | TaggedTemplateExpression
}) => CallExpression

export type CreateHMRRegionTemplate = (params: {
  CREATE_NODE: string
  REGION_NAME: string
}) => VariableDeclaration

export type FactoryTemplate = (params: {
  SID: string
  FN: CallExpression | TaggedTemplateExpression
  FACTORY: string
  NAME?: string
  METHOD?: string
  LOC?: ObjectExpression
}) => CallExpression

export type HotCodeSyntaxTemplate = (params: {
  HOT_PROPERTY: ExpressionStatement
  CLEAR_NODE: string
  REGION_NAME: string
}) => IfStatement

export type HotCodeTemplate = (
  importNamesMap: ImportNamesMap,
  declaration: NodePath<TaggedTemplateExpression> | NodePath<CallExpression>,
  hmrMode: 'cjs' | 'es',
) => IfStatement

export type SmallConfig = {
  addLoc: boolean
  addNames: boolean
  debugSids: boolean
}

export type ImportNamesMap = {
  withFactory: string | null
  clearNode: string | null
  createNode: string | null
  withRegion: string | null
  importDeclaration: ImportDeclaration | null
  importDeclarationPath: NodePath<ImportDeclaration> | null
  hmrRegionInserted: boolean
  hmrCodeInserted: boolean
}

export type MethodParser = {
  flag: boolean
  set: Set<string>
  fn: (
    path: NodePath,
    state: PluginState,
    name: string,
    candidateName: Identifier,
  ) => void
}

export type FactoryInfo = {
  localName: string
  importedName: string
  source: string
}

export type PluginState = PluginPass & {
  effector_ignoredImports: Set<string>
  effector_forceScopeSpecifiers: Set<string>
  effector_importNames: ImportNamesMap
  effector_factoryMap: Map<string, FactoryInfo>
  effector_factoryPaths?: string[]
  effector_needFactoryImport?: boolean
  fileNameIdentifier?: Identifier
}

export type EffectorPluginOptions = {
  addLoc?: boolean
  addNames?: boolean
  debugSids?: boolean
  hmr?: 'cjs' | 'es' | 'none' | true
  factories?: string[]
  transformLegacyDomainMethods?: boolean
  forceScope?: boolean

  importName?: string | string[]

  noDefaults?: boolean
  reactSsr?: boolean
  filename?: boolean

  /** semi-deprecated options to redeclare effector own methods */
  storeCreators?: string[]
  eventCreators?: string[]
  effectCreators?: string[]
  domainCreators?: string[]
  restoreCreators?: string[]
  combineCreators?: string[]
  sampleCreators?: string[]
  forwardCreators?: string[]
  guardCreators?: string[]
  attachCreators?: string[]
  splitCreators?: string[]
  apiCreators?: string[]
  mergeCreators?: string[]

  stores?: boolean
  events?: boolean
  effects?: boolean
  domains?: boolean
  restores?: boolean
  combines?: boolean
  samples?: boolean
  forwards?: boolean
  guards?: boolean
  attaches?: boolean
  splits?: boolean
  apis?: boolean
  merges?: boolean
  gates?: boolean

  domainMethods?: {
    store?: string[]
    event?: string[]
    effect?: string[]
    domain?: string[]
  }
  reactMethods?: {
    createGate?: string[]
  }
  importReactNames?: {
    ssr?: string[]
    nossr?: string[]
  }
}

export type EffectorPluginOptionsNormalized = {
  factories: string[]
  addLoc: boolean
  debugSids: boolean
  forceScope: boolean
  hmr: 'cjs' | 'es' | boolean
  addNames: boolean
  reactSsr: boolean
  transformLegacyDomainMethods: boolean
  filename: boolean

  importName: Set<string>

  stores: boolean
  events: boolean
  effects: boolean
  domains: boolean
  restores: boolean
  combines: boolean
  samples: boolean
  forwards: boolean
  guards: boolean
  attaches: boolean
  splits: boolean
  apis: boolean
  merges: boolean
  gates: boolean

  storeCreators: Set<string>
  eventCreators: Set<string>
  effectCreators: Set<string>
  domainCreators: Set<string>
  restoreCreators: Set<string>
  combineCreators: Set<string>
  sampleCreators: Set<string>
  forwardCreators: Set<string>
  guardCreators: Set<string>
  attachCreators: Set<string>
  splitCreators: Set<string>
  apiCreators: Set<string>
  mergeCreators: Set<string>
  domainMethods: {
    store: Set<string>
    event: Set<string>
    effect: Set<string>
    domain: Set<string>
  }
  reactMethods: {
    createGate: Set<string>
  }
  importReactNames: {
    ssr: Set<string>
    nossr: Set<string>
  }
}
