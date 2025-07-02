import type {NodePath, Visitor} from '@babel/traverse'
import type {
  ExpressionStatement,
  CallExpression,
  TaggedTemplateExpression,
  ObjectExpression,
  PatternLike,
  Expression,
} from '@babel/types'
import type {PluginObj} from '@babel/core'

import type {
  WithRegionTemplate,
  CreateHMRRegionTemplate,
  HotCode,
  FactoryTemplate,
  ImportNamesMap,
  SmallConfig,
  MethodParser,
  PluginState,
  EffectorPluginOptions,
} from './types'

import {
  addFileNameIdentifier,
  addImport,
  findCandidateNameForExpression,
  makeTrace,
  normalizeSource,
  stripRoot,
  generateStableID,
  REGION_NAME,
  transformHmr,
  rememberLocalName,
} from './util'
import {getMethodParsers, normalizeOptions} from './config'

export default function effectorBabelPlugin(
  babel: typeof import('@babel/core'),
  options: EffectorPluginOptions = {},
) {
  const {fullConfig, creatorsList} = normalizeOptions(options)
  const {
    addNames,
    addLoc,
    debugSids,
    transformLegacyDomainMethods,
    hmr,
    filename: enableFileName,
    reactMethods,
    factories,
    importName,
    importReactNames,
    reactSsr,
    forceScope,
  } = fullConfig
  if (reactSsr) {
    console.error(
      '[effector/babel-plugin]: reactSsr option is deprecated, use imports from "effector-react" without aliases or /scope',
    )
  }
  const factoriesUsed = factories.length > 0
  const hasRelativeFactories = factories.some(
    fab => fab.startsWith('./') || fab.startsWith('../'),
  )

  const smallConfig: SmallConfig = {addLoc, addNames, debugSids}
  const {types: t, template} = babel
  let factoryTemplate: FactoryTemplate

  let createHMRRegionTemplate: CreateHMRRegionTemplate

  function createHMRRegion(params: Parameters<CreateHMRRegionTemplate>[0]) {
    if (!createHMRRegionTemplate) {
      createHMRRegionTemplate = template(
        'const REGION_NAME = CREATE_NODE({regional: true})',
      ) as any as CreateHMRRegionTemplate
    }
    return createHMRRegionTemplate(params)
  }
  let withRegionTemplate: WithRegionTemplate

  function createWithRegion(params: Parameters<WithRegionTemplate>[0]) {
    if (!withRegionTemplate) {
      withRegionTemplate = template(
        'WITH_REGION(REGION_NAME, () => FN)',
      ) as any as WithRegionTemplate
    }
    return withRegionTemplate(params)
  }

  let hotProperty: ExpressionStatement
  let hotCode: HotCode
  function createHotCode(
    importNamesMap: ImportNamesMap,
    declaration: NodePath,
    hmrMode: 'cjs' | 'esm',
  ) {
    if (!hotProperty) {
      hotProperty = template.expression.ast(
        hmrMode === 'cjs'
          ? 'module.hot'
          : '(import.meta.hot || import.meta.webpackHot)',
      ) as any as ExpressionStatement
    }
    if (!hotCode) {
      hotCode = template(`
        if (HOT_PROPERTY) {
          HOT_PROPERTY.dispose(() => CLEAR_NODE(REGION_NAME));
        } else {
          console.warn('[effector hmr] HMR is not available in current environment.');
        }
      `) as any as HotCode
    }
    return hotCode({
      HOT_PROPERTY: hotProperty,
      CLEAR_NODE: addImport(t, declaration, 'clearNode', importNamesMap),
      REGION_NAME,
    })
  }

  const {methodParsers, reactMethodParsers, domainMethodParsers} =
    getMethodParsers(t, smallConfig, fullConfig)

  const importVisitor: Visitor<PluginState> = {
    ImportDeclaration(path, state) {
      const createFactoryTemplate = () => {
        if (!this.effector_factoryMap) {
          this.effector_factoryMap = new Map()
          if (!factoryTemplate) {
            factoryTemplate = template(
              addLoc
                ? 'FACTORY({sid: SID,fn:()=>FN,name:NAME,method:METHOD,loc:LOC})'
                : addNames
                ? 'FACTORY({sid: SID,fn:()=>FN,name:NAME,method:METHOD})'
                : 'FACTORY({sid: SID,fn:()=>FN})',
            ) as any as FactoryTemplate
          }
        }
      }

      const source = path.node.source.value
      const specifiers = path.node.specifiers
      if (importName.has(source)) {
        for (let i = 0; i < specifiers.length; i++) {
          const s = specifiers[i]
          if (!s.imported) continue
          const importedName = s.imported.name
          const localName = s.local.name
          if (importedName === localName) continue
          rememberLocalName(importedName, localName, creatorsList)
        }
      } else if (
        importReactNames.ssr.has(source) ||
        importReactNames.nossr.has(source)
      ) {
        for (let i = 0; i < specifiers.length; i++) {
          const s = specifiers[i]
          if (!s.imported) continue
          const importedName = s.imported.name
          const localName = s.local.name

          // effector-react/scope already forced scope
          if (importReactNames.nossr.has(source)) {
            this.effector_forceScopeSpecifiers.add(localName)
          }

          if (importedName === localName) continue
          if (reactMethods.createGate.has(importedName)) {
            reactMethods.createGate.add(localName)
          }
        }
      } else {
        for (let i = 0; i < specifiers.length; i++) {
          const s = specifiers[i]
          const isDefaultImport = t.isImportDefaultSpecifier(s)
          if (!s.imported && !isDefaultImport) continue
          const localName = s.local.name
          if (creatorsList.some(set => set.has(localName))) {
            this.effector_ignoredImports.add(localName)
          }
        }
      }
      if (reactSsr) {
        if (source === 'effector-react' || source === 'effector-react/compat') {
          path.node.source.value = 'effector-react/scope'
        }
      }
      if (factoriesUsed) {
        const rootPath = state.file.opts.root || ''
        if (!this.effector_factoryPaths) {
          if (hasRelativeFactories) {
            const {resolve} = require('path')
            this.effector_factoryPaths = factories.map(fab => {
              if (fab.startsWith('./') || fab.startsWith('../')) {
                const resolvedFab = resolve(rootPath, fab)
                return stripRoot(rootPath, resolvedFab, true)
              }
              return fab
            })
          } else {
            this.effector_factoryPaths = factories
          }
        }
        const normalizedSource = normalizeSource(source, rootPath, state)
        if (
          this.effector_factoryPaths.includes(normalizedSource) ||
          // custom handling for patronum/{method} imports
          normalizedSource.startsWith('patronum/')
        ) {
          this.effector_needFactoryImport = true
          createFactoryTemplate()

          for (let i = 0; i < specifiers.length; i++) {
            const s = specifiers[i]
            const isDefaultImport = t.isImportDefaultSpecifier(s)
            if (!s.imported && !isDefaultImport) continue
            const importedName = isDefaultImport ? 'default' : s.imported.name
            const localName = s.local.name
            this.effector_factoryMap!.set(localName, {
              localName,
              importedName,
              source: normalizedSource,
            })
          }
        }
      }
    },
  }

  const plugin: PluginObj<PluginState> = {
    name: 'effector/babel-plugin',
    pre() {
      this.effector_ignoredImports = new Set()
      this.effector_forceScopeSpecifiers = new Set()
      this.effector_importNames = {
        withFactory: null,
        clearNode: null,
        createNode: null,
        withRegion: null,
        importDeclaration: null,
        importDeclarationPath: null,
        hmrRegionInserted: false,
        hmrCodeInserted: false,
      }
    },
    post() {
      this.effector_ignoredImports.clear()
      this.effector_needFactoryImport = false
      this.effector_importNames = {
        withFactory: null,
        clearNode: null,
        createNode: null,
        withRegion: null,
        importDeclaration: null,
        importDeclarationPath: null,
        hmrRegionInserted: false,
        hmrCodeInserted: false,
      }
      if (this.effector_factoryMap) {
        this.effector_factoryMap.clear()
        delete this.effector_factoryMap
      }
      if (this.effector_factoryPaths) {
        delete this.effector_factoryPaths
      }
    },
    visitor: {
      Program: {
        enter(path, state) {
          if (hmr) {
            const hmrMode =
              hmr === 'cjs'
                ? 'cjs'
                : hmr === 'esm'
                ? 'esm'
                : !!state.file.opts.caller?.supportsStaticESM
                ? 'esm'
                : 'cjs'
            transformHmr(
              babel,
              path,
              factories,
              this.effector_importNames,
              hmrMode,
              createHMRRegion,
              createWithRegion,
              createHotCode,
            )
          }

          path.traverse(importVisitor, state)
        },
      },

      'CallExpression|TaggedTemplateExpression'(
        this: PluginState,
        path: NodePath<CallExpression | TaggedTemplateExpression>,
        state: PluginState,
      ) {
        const node: typeof path.node & {effector_isFactory?: boolean} =
          path.node
        const isTaggedTemplate = t.isTaggedTemplateExpression(node)
        const callee = isTaggedTemplate ? node.tag : node.callee

        addFileNameIdentifier(addLoc, enableFileName, t, path, state)

        if (t.isIdentifier(callee)) {
          const name = callee.name
          if (!this.effector_ignoredImports.has(name)) {
            applyMethodParsers(methodParsers, path, state, name)
            applyMethodParsers(reactMethodParsers, path, state, name)

            if (forceScope && this.effector_forceScopeSpecifiers.has(name)) {
              const binding = path.scope.getBinding(name)

              if (binding && t.isImportSpecifier(binding.path.node)) {
                const hookName = binding.path.node.imported.name
                const forceScopeConfig = {forceScope: t.booleanLiteral(true)}

                switch (hookName) {
                  case 'useEvent':
                  case 'useStore':
                  case 'useUnit': {
                    if (!hasSecondArgument(path)) {
                      pushArgumentConfig(t, path, forceScopeConfig)
                    }
                    break
                  }

                  case 'useList': {
                    if (!hasThirdArgument(path)) {
                      pushArgumentConfig(t, path, forceScopeConfig)
                    }
                    break
                  }

                  case 'useGate': {
                    if (!hasThirdArgument(path)) {
                      // If no props passed
                      if (!hasSecondArgument(path)) {
                        pushArgumentConfig(t, path, {})
                      }
                      // Add forceScope: true
                      pushArgumentConfig(t, path, forceScopeConfig)
                    }
                    break
                  }

                  case 'useStoreMap': {
                    const firstArg = node.arguments[0]
                    if (hasSecondArgument(path)) {
                      convertArgumentsToConfig(t, path, ['store', 'fn'])

                      // Add keys: []
                      appendPropertyToConfig(
                        t,
                        firstArg,
                        'keys',
                        t.arrayExpression(),
                      )
                      // Add forceScope: true
                      appendPropertyToConfig(
                        t,
                        firstArg,
                        'forceScope',
                        t.booleanLiteral(true),
                      )
                    } else if (
                      isFirstArgumentConfig(t, path) &&
                      !hasPropertyInConfig(t, firstArg, 'forceScope')
                    ) {
                      appendPropertyToConfig(
                        t,
                        firstArg,
                        'forceScope',
                        t.booleanLiteral(true),
                      )
                    }
                    break
                  }
                } // switch hookName
              }
            }
          }
          if (
            factoriesUsed &&
            this.effector_factoryMap &&
            !node.effector_isFactory &&
            this.effector_factoryMap.has(name)
          ) {
            const withFactoryImportName = addImport(
              t,
              path,
              'withFactory',
              this.effector_importNames,
            )
            const {importedName} = this.effector_factoryMap.get(name)!
            node.effector_isFactory = true
            const idNode = findCandidateNameForExpression(path)
            const resultName = idNode ? idNode.name : ''
            let loc: {line: number; column: number} | undefined
            path.find(path => {
              if (
                isTaggedTemplate
                  ? path.isTaggedTemplateExpression()
                  : path.isCallExpression()
              ) {
                if (path.node.loc) {
                  loc = path.node.loc.start
                }
                return true
              }
              return false
            })
            const sid = generateStableID(
              state.file.opts.root,
              state.filename,
              resultName,
              loc!.line,
              loc!.column,
              debugSids,
            )
            const factoryConfig: Parameters<FactoryTemplate>[0] = {
              SID: JSON.stringify(sid),
              FN: node,
              FACTORY: withFactoryImportName,
            }
            if (addLoc || addNames) {
              factoryConfig.NAME = JSON.stringify(
                !resultName || resultName === '' ? 'none' : resultName,
              )
              factoryConfig.METHOD = JSON.stringify(importedName)
            }
            if (addLoc) {
              factoryConfig.LOC = makeTrace(
                state.fileNameIdentifier!,
                loc!.line,
                loc!.column,
                t,
              )
            }
            path.replaceWith(factoryTemplate(factoryConfig))
          }
        }

        if (transformLegacyDomainMethods && t.isMemberExpression(callee)) {
          applyMethodParsers(
            domainMethodParsers,
            path,
            state,
            callee.property.name,
          )
        }
      },
    },
  }
  return plugin
}

function applyMethodParsers(
  methodParsers: MethodParser[],
  path: NodePath<any>,
  state: PluginState,
  name: string,
) {
  for (let i = 0; i < methodParsers.length; i++) {
    const {flag, set, fn} = methodParsers[i]
    if (flag && set.has(name)) {
      fn(path, state, name, findCandidateNameForExpression(path))
    }
  }
}

function hasSecondArgument(
  path: NodePath<CallExpression | TaggedTemplateExpression>,
) {
  return path.node.arguments.length >= 2
}

function pushArgumentConfig(
  t: typeof import('@babel/types'),
  path: NodePath<CallExpression | TaggedTemplateExpression>,
  configObject: Record<string, Expression>,
) {
  path.node.arguments.push(
    t.objectExpression(
      Object.entries(configObject).map(([key, value]) =>
        t.objectProperty(t.identifier(key), value),
      ),
    ),
  )
}

function hasThirdArgument(
  path: NodePath<CallExpression | TaggedTemplateExpression>,
) {
  return path.node.arguments.length >= 3
}

function convertArgumentsToConfig(
  t: typeof import('@babel/types'),
  path: NodePath<CallExpression | TaggedTemplateExpression>,
  argumentsAsKeys: string[],
) {
  const objectProperties = argumentsAsKeys.map((keyName, index) =>
    t.objectProperty(
      t.identifier(keyName),
      t.cloneNode(path.node.arguments[index]),
    ),
  )
  path.node.arguments = [t.objectExpression(objectProperties)]
}

function isFirstArgumentConfig(
  t: typeof import('@babel/types'),
  path: NodePath<CallExpression | TaggedTemplateExpression>,
) {
  return t.isObjectExpression(path.node.arguments[0])
}

function hasPropertyInConfig(
  t: typeof import('@babel/types'),
  configNode: ObjectExpression,
  propertyName: string,
) {
  return !!configNode.properties.find(
    property =>
      t.isIdentifier(property.key) && property.key.name === propertyName,
  )
}

function appendPropertyToConfig(
  t: typeof import('@babel/types'),
  configNode: ObjectExpression,
  propertyName: string,
  propertyNode: Expression | PatternLike,
) {
  if (t.isObjectExpression(configNode)) {
    configNode.properties.push(
      t.objectProperty(t.identifier(propertyName), propertyNode),
    )
  }
}
