import type {NodePath} from '@babel/traverse'
import type {CallExpression, TaggedTemplateExpression} from '@babel/types'

import type {FactoryTemplate, PluginState} from '../types'

import {
  addImport,
  findCandidateNameForExpression,
  makeTrace,
  generateStableID,
} from '../util'

export function transformFactory(
  t: typeof import('@babel/types'),
  path: NodePath<CallExpression> | NodePath<TaggedTemplateExpression>,
  state: PluginState,
  factoriesUsed: boolean,
  debugSids: boolean,
  addLoc: boolean,
  addNames: boolean,
  factoryTemplate: FactoryTemplate,
) {
  const node: typeof path.node & {effector_isFactory?: boolean} = path.node
  const isTaggedTemplate = t.isTaggedTemplateExpression(node)
  const callee = isTaggedTemplate ? node.tag : node.callee
  if (!t.isIdentifier(callee)) return
  const name = callee.name
  if (
    !factoriesUsed ||
    node.effector_isFactory ||
    !state.effector_factoryMap.has(name)
  ) {
    return
  }

  const withFactoryImportName = addImport(
    t,
    path,
    'withFactory',
    state.effector_importNames,
  )
  const {importedName} = state.effector_factoryMap.get(name)!
  node.effector_isFactory = true
  const idNode = findCandidateNameForExpression(path)
  const resultName = idNode ? idNode.name : ''
  const nodeFinder = isTaggedTemplate
    ? t.isTaggedTemplateExpression
    : t.isCallExpression
  let loc: {line: number; column: number} | undefined
  path.find(path => {
    if (nodeFinder(path.node)) {
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
