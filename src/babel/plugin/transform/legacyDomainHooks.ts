import type {NodePath} from '@babel/traverse'
import type {CallExpression} from '@babel/types'

import type {MethodParser, PluginState} from '../types'

import {applyMethodParsers} from '../util'

const performTargets = new WeakSet<object>()

// Legacy domain methods are recognized by name. A perform target named
// `event` or `store` is a payload callback, not a domain factory.
export function markPerformTargets(path: NodePath<CallExpression>) {
  const resolve = (value: any): any => {
    if (!value?.isIdentifier()) return value
    const binding = value.scope.getBinding(value.node.name)
    return binding?.path.isVariableDeclarator()
      ? binding.path.get('init')
      : binding?.path
  }
  const config = resolve(path.get('arguments')[0])
  if (!config?.isObjectExpression()) return
  for (const property of config.get('properties')) {
    if (
      property.node.key?.name !== 'action' &&
      property.node.key?.value !== 'action'
    )
      continue
    const action = property.isObjectMethod()
      ? property
      : resolve(property.get('value'))
    if (!action?.isFunction()) continue
    const target = action.get('params')[0]
    if (target?.isIdentifier()) performTargets.add(target.node)
  }
}

function isPerformTarget(
  path: NodePath<CallExpression>,
  name: string,
  seen = new Set<object>(),
): boolean {
  const binding = path.scope.getBinding(name)
  if (!binding || seen.has(binding)) return false
  seen.add(binding)
  if (performTargets.has(binding.identifier)) return true
  if (binding.path.isVariableDeclarator()) {
    const init = binding.path.get('init')
    if (init.isIdentifier() && init.node.name !== name) {
      return isPerformTarget(init as any, init.node.name, seen)
    }
  }
  return false
}

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
    'name' in path.node.callee.property &&
    !(
      t.isIdentifier(path.node.callee.object) &&
      isPerformTarget(path, path.node.callee.object.name)
    )
  ) {
    applyMethodParsers(
      domainMethodParsers,
      path,
      state,
      path.node.callee.property.name,
    )
  }
}
