import {processArgsToConfig} from './config'
import {generateErrorTitle} from './naming'
import {validateSampleConfig, createSampling} from './sample'
import {deprecate} from './throw'

export function guard(...args: any[]) {
  let [[source, config], metadata] = processArgsToConfig(args)
  const errorTitle = generateErrorTitle('guard', metadata)
  deprecate(false, 'guard', 'sample', errorTitle)
  if (!config) {
    config = source
    source = config.source
  }
  validateSampleConfig(config, errorTitle)
  return createSampling(
    'guard',
    config.clock,
    source,
    config.filter,
    config.target,
    null,
    config.name,
    metadata,
    !config.greedy,
    false,
    true,
  )
}
