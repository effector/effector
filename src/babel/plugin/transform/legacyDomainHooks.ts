import type {NodePath} from '@babel/traverse'
import type {CallExpression} from '@babel/types'

import type {MethodParser, PluginState} from '../types'

import {applyMethodParsers} from '../util'

export function processLegacyDomainHooks(
  t: typeof import('@babel/types'),
  domainMethodParsers: MethodParser[],
  transformLegacyDomainMethods: boolean,
  path: NodePath<CallExpression>,
  state: PluginState,
) {
  if (
    transformLegacyDomainMethods &&
    t.isMemberExpression(path.node.callee) &&
    'name' in path.node.callee.property
  ) {
    applyMethodParsers(
      domainMethodParsers,
      path,
      state,
      path.node.callee.property.name,
    )
  }
}
