//@flow

import {getConfig, getNestedConfig} from './getter'

export const onConfigNesting = (
  rawConfig,
  fn: (babelData: any, userConfig: any) => void,
) => {
  if (getNestedConfig(rawConfig)) {
    fn(getConfig(rawConfig), getNestedConfig(rawConfig))
  }
}
