import type {NodePath} from '@babel/traverse'
import type {CallExpression, ObjectExpression} from '@babel/types'

import type {MethodParser, PluginState} from '../types'

import {applyMethodParsers, getImportedName, property} from '../util'

export function transformReactHooks(
  t: typeof import('@babel/types'),
  name: string,
  reactMethodParsers: MethodParser[],
  forceScope: boolean,
  path: NodePath<CallExpression>,
  state: PluginState,
) {
  applyMethodParsers(reactMethodParsers, path, state, name)
  transformReactForceScope(t, name, forceScope, path, state)
}

function transformReactForceScope(
  t: typeof import('@babel/types'),
  name: string,
  forceScope: boolean,
  path: NodePath<CallExpression>,
  state: PluginState,
) {
  if (!forceScope || !state.effector_forceScopeSpecifiers.has(name)) return
  const binding = path.scope.getBinding(name)
  if (!binding || !t.isImportSpecifier(binding.path.node)) return
  const hookName = getImportedName(t, binding.path.node)

  switch (hookName) {
    case 'useEvent':
    case 'useStore':
    case 'useUnit': {
      if (!hasSecondArgument(path)) {
        pushForceScopeToConfig(t, path)
      }
      break
    }

    case 'useList': {
      if (!hasThirdArgument(path)) {
        pushForceScopeToConfig(t, path)
      }
      break
    }

    case 'useGate': {
      if (!hasThirdArgument(path)) {
        // If no props passed
        if (!hasSecondArgument(path)) {
          path.node.arguments.push(t.objectExpression([]))
        }
        // Add forceScope: true
        pushForceScopeToConfig(t, path)
      }
      break
    }

    case 'useStoreMap': {
      if (hasSecondArgument(path)) {
        const config = convertArgumentsToConfig(t, path, ['store', 'fn'])
        path.node.arguments = [config]

        // Add keys: []
        config.properties.push(property(t, 'keys', t.arrayExpression()))
        // Add forceScope: true
        config.properties.push(
          property(t, 'forceScope', t.booleanLiteral(true)),
        )
      } else {
        const firstArg = path.node.arguments[0]
        if (
          t.isObjectExpression(firstArg) &&
          !hasPropertyInConfig(t, firstArg, 'forceScope')
        ) {
          firstArg.properties.push(
            property(t, 'forceScope', t.booleanLiteral(true)),
          )
        }
      }
      break
    }
  }
}

function hasSecondArgument(path: NodePath<CallExpression>) {
  return path.node.arguments.length >= 2
}

function pushForceScopeToConfig(
  t: typeof import('@babel/types'),
  path: NodePath<CallExpression>,
) {
  path.node.arguments.push(
    t.objectExpression([property(t, 'forceScope', t.booleanLiteral(true))]),
  )
}

function hasThirdArgument(path: NodePath<CallExpression>) {
  return path.node.arguments.length >= 3
}

function convertArgumentsToConfig(
  t: typeof import('@babel/types'),
  path: NodePath<CallExpression>,
  argumentsAsKeys: string[],
) {
  const objectProperties = argumentsAsKeys.map((keyName, index) =>
    t.objectProperty(
      t.identifier(keyName),
      t.cloneNode(path.node.arguments[index]),
    ),
  )
  return t.objectExpression(objectProperties)
}

function hasPropertyInConfig(
  t: typeof import('@babel/types'),
  configNode: ObjectExpression,
  propertyName: string,
) {
  return configNode.properties.some(
    property =>
      !t.isSpreadElement(property) &&
      t.isIdentifier(property.key) &&
      property.key.name === propertyName,
  )
}
