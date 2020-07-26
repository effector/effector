import {getConfig, getNestedConfig} from './getter'

export const onConfigNesting = (
  rawConfig: any,
  fn: (babelData: any, userConfig: any) => void,
) => {
  if (getNestedConfig(rawConfig)) {
    fn(getConfig(rawConfig), getNestedConfig(rawConfig))
  }
}
