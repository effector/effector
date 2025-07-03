import type {NodePath, Visitor} from '@babel/traverse'
import type {CallExpression} from '@babel/types'
import type {PluginObj} from '@babel/core'

import type {
  SmallConfig,
  MethodParser,
  PluginState,
  EffectorPluginOptions,
} from './types'

import {
  addFileNameIdentifier,
  applyMethodParsers,
  normalizeSource,
  stripRoot,
  rememberLocalName,
  getImportedName,
} from './util'
import {getMethodParsers, normalizeOptions} from './config'
import {transformReactHooks} from './transform/reactHooks'
import {transformFactory} from './transform/factory'
import {processLegacyDomainHooks} from './transform/legacyDomainHooks'
import {transformHmr} from './transform/hmr'
import {
  createFactoryTemplate,
  createWithRegionTemplate,
  createHMRRegionTemplate,
  createHotCodeTemplate,
} from './templates'

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
  const factoryTemplate = createFactoryTemplate(template, addLoc, addNames)
  const hmrRegionTemplate = createHMRRegionTemplate(template)
  const withRegionTemplate = createWithRegionTemplate(template)
  const hotCodeTemplate = createHotCodeTemplate(template, t)

  const {methodParsers, reactMethodParsers, domainMethodParsers} =
    getMethodParsers(t, smallConfig, fullConfig)

  const importVisitor: Visitor<PluginState> = {
    ImportDeclaration(path, state) {
      const source = path.node.source.value
      const specifiers = path.node.specifiers
      if (importName.has(source)) {
        for (let i = 0; i < specifiers.length; i++) {
          const s = specifiers[i]
          if (!t.isImportSpecifier(s)) continue
          const importedName = getImportedName(t, s)
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
          if (!t.isImportSpecifier(s)) continue
          const importedName = getImportedName(t, s)
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
          if (t.isImportNamespaceSpecifier(s)) continue
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

          for (let i = 0; i < specifiers.length; i++) {
            const s = specifiers[i]
            if (t.isImportNamespaceSpecifier(s)) continue
            const importedName = t.isImportDefaultSpecifier(s)
              ? 'default'
              : getImportedName(t, s)
            const localName = s.local.name
            this.effector_factoryMap.set(localName, {
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
      this.effector_factoryMap = new Map()
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
      this.effector_factoryMap.clear()
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
                : hmr === 'es'
                ? 'es'
                : !!state.file.opts.caller?.supportsStaticESM
                ? 'es'
                : 'cjs'
            transformHmr(
              t,
              path,
              factories,
              this.effector_importNames,
              hmrMode,
              hmrRegionTemplate,
              withRegionTemplate,
              hotCodeTemplate,
            )
          }

          path.traverse(importVisitor, state)
        },
      },
      CallExpression(path, state) {
        addFileNameIdentifier(addLoc, enableFileName, t, path, state)

        processLegacyDomainHooks(
          t,
          domainMethodParsers,
          transformLegacyDomainMethods,
          path,
          state,
        )
        const name = getNonIgnoredCalee(t, path, state)
        if (name) {
          transformReactHooks(
            t,
            name,
            reactMethodParsers,
            forceScope,
            path,
            state,
          )
          processEffectorCommonMethods(name, methodParsers, path, state)
        }

        transformFactory(
          t,
          path,
          state,
          factoriesUsed,
          debugSids,
          addLoc,
          addNames,
          factoryTemplate,
        )
      },
      TaggedTemplateExpression(path, state) {
        addFileNameIdentifier(addLoc, enableFileName, t, path, state)

        transformFactory(
          t,
          path,
          state,
          factoriesUsed,
          debugSids,
          addLoc,
          addNames,
          factoryTemplate,
        )
      },
    },
  }
  return plugin
}

function getNonIgnoredCalee(
  t: typeof import('@babel/types'),
  path: NodePath<CallExpression>,
  state: PluginState,
) {
  if (!t.isIdentifier(path.node.callee)) return null
  const name = path.node.callee.name
  if (state.effector_ignoredImports.has(name)) return null
  return name
}

function processEffectorCommonMethods(
  name: string,
  methodParsers: MethodParser[],
  path: NodePath<CallExpression>,
  state: PluginState,
) {
  applyMethodParsers(methodParsers, path, state, name)
}
