import {processArgsToConfig} from './config'
import {validateSampleConfig, createSampling} from './sample'

export function guard(...args: any[]) {
  let [[source, config], metadata] = processArgsToConfig(args)
  if (!config) {
    config = source
    source = config.source
  }
  validateSampleConfig(config, 'guard')
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
