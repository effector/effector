import {getConfig, getNestedConfig} from './getter'
import {assertObject} from './is'

export function processArgsToConfig(
  arg: any,
  singleArgument: true,
): [any, any | void]
export function processArgsToConfig(args: any[]): [any[], any | void]
export function processArgsToConfig(
  args: any,
  singleArgument?: boolean,
): [any[], any | void] {
  const rawConfig = singleArgument ? args : args[0]
  assertObject(rawConfig)
  let metadata
  if (getNestedConfig(rawConfig)) {
    metadata = getConfig(rawConfig)
    args = getNestedConfig(rawConfig)
  }
  return [args, metadata]
}
