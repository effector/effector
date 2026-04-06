import type {NodePath} from '@babel/traverse'
import type {
  CallExpression,
  TaggedTemplateExpression,
  Program,
} from '@babel/types'

import type {
  CreateHMRRegionTemplate,
  HotCodeTemplate,
  ImportNamesMap,
  WithRegionTemplate,
} from '../types'
import {addImport, findProgramPath, REGION_NAME} from '../util'

const DEFAULT_WATCHED_CALLS = [
  'map',
  'filter',
  'filterMap',
  'subscribe',
  'on',
  'watch',
  'reset',
  'prepend',
]

const SUPPORTED_NODES = [
  'FunctionDeclaration',
  'ArrowFunctionExpression',
  'ExportDefaultDeclaration',
  'ClassDeclaration',
]

export function transformHmr(
  t: typeof import('@babel/types'),
  path: NodePath<Program>,
  factories: string[],
  importNamesMap: ImportNamesMap,
  hmrMode: 'cjs' | 'es',
  createHMRRegion: CreateHMRRegionTemplate,
  createWithRegion: WithRegionTemplate,
  createHotCode: HotCodeTemplate,
) {
  const watchedFactories = new Set(DEFAULT_WATCHED_CALLS)

  path.traverse({
    ImportDeclaration(declaration) {
      const source = declaration.node.source.value
      const specifiers = declaration.node.specifiers.map(
        specifier => specifier.local.name,
      )

      if (!['effector', ...factories].includes(source)) {
        return
      }

      for (const specifier of specifiers) {
        watchedFactories.add(specifier)
      }

      if (source !== 'effector') {
        return
      }
    },
    CallExpression(path) {
      applyHMRTransform(
        t,
        path,
        path.node.callee,
        watchedFactories,
        importNamesMap,
        hmrMode,
        createHMRRegion,
        createWithRegion,
        createHotCode,
      )
    },
    TaggedTemplateExpression(path) {
      applyHMRTransform(
        t,
        path,
        path.node.tag,
        watchedFactories,
        importNamesMap,
        hmrMode,
        createHMRRegion,
        createWithRegion,
        createHotCode,
      )
    },
  })
}

function applyHMRTransform(
  t: typeof import('@babel/types'),
  path: NodePath<TaggedTemplateExpression> | NodePath<CallExpression>,
  callee: CallExpression['callee'] | TaggedTemplateExpression['tag'],
  watchedFactories: Set<string>,
  importNamesMap: ImportNamesMap,
  hmrMode: 'cjs' | 'es',
  createHMRRegion: CreateHMRRegionTemplate,
  createWithRegion: WithRegionTemplate,
  createHotCode: HotCodeTemplate,
) {
  if (!isSupportHMR(path, callee, watchedFactories)) {
    return
  }
  if (!importNamesMap.hmrRegionInserted) {
    const createNodeName = addImport(t, path, 'createNode', importNamesMap)
    const regionNode = createHMRRegion({
      CREATE_NODE: createNodeName,
      REGION_NAME,
    })
    /** guaranteed to be initialized after addImport call */
    importNamesMap.importDeclarationPath!.insertAfter(regionNode)
    importNamesMap.hmrRegionInserted = true
  }
  if (!importNamesMap.hmrCodeInserted) {
    const hotCode = createHotCode(importNamesMap, path, hmrMode)
    const programPath = findProgramPath(path)
    programPath.pushContainer('body', hotCode)
    importNamesMap.hmrCodeInserted = true
  }
  path.replaceWith(
    createWithRegion({
      WITH_REGION: addImport(t, path, 'withRegion', importNamesMap),
      REGION_NAME,
      FN: path.node,
    }),
  )
}

function isSupportHMR(
  path: NodePath<any>,
  callee: CallExpression['callee'] | TaggedTemplateExpression['tag'],
  watchedFactories: Set<string>,
) {
  /** calls like `[foo]()`, who the hell even does that? */
  if (
    !('name' in callee) &&
    !((callee as any).property && (callee as any).property.name)
  ) {
    return false
  }
  const name = (callee as any).name || (callee as any).property?.name
  if (!watchedFactories.has(name)) {
    return false
  }
  return !path.findParent(
    parent => parent && SUPPORTED_NODES.includes(parent.node.type),
  )
}
