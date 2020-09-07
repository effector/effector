import {getConfig, getNestedConfig} from './getter'
import {assertObject} from './is'

export const onConfigNesting = (
  rawConfig: any,
  fn: (babelData: any, userConfig: any) => void,
) => {
  assertObject(rawConfig)
  if (getNestedConfig(rawConfig)) {
    fn(getConfig(rawConfig), getNestedConfig(rawConfig))
  }
}
