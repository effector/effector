import {forIn} from './collection'
import {assertObject, isObject, isVoid} from './is'

export function processArgsToConfig(args: any[]): [any[], any | void] {
  const rawConfig = args[0]
  assertObject(rawConfig)
  let metadata = rawConfig.or
  const childConfig = rawConfig.and
  if (childConfig) {
    const unwrappedNestedValue = childConfig[0]
    /**
     * if there is no "and" field then we reached the leaf of the tree
     * and this is an original user-defined argument
     *
     * note that in this case we're returning all arguments, not the only one been unwrapped
     **/
    if (!isObject(unwrappedNestedValue) || !('and' in unwrappedNestedValue)) {
      args = childConfig
    } else {
      const nested = processArgsToConfig(childConfig)

      args = nested[0]
      metadata = {...metadata, ...nested[1]}
    }
  }
  return [args, metadata]
}

export const flattenConfig = (part: any, config: Record<string, any> = {}) => {
  if (isObject(part)) {
    flattenConfig(part.or, config)
    forIn(part, (value, field) => {
      if (!isVoid(value) && field !== 'or' && field !== 'and') {
        config[field] = value
      }
    })
    flattenConfig(part.and, config)
  }
  return config
}
