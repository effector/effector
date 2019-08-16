import {is} from 'effector'
import {realmEvent, realmStore} from '.'

const getUnitName = (unit) => {
  if (is.unit(unit)) {
    return unit?.compositeName?.fullName || unit?.shortName || '{}'
  }
  if (Array.isArray(unit)) return `[${unit.map(getUnitName)}]`
  if (typeof unit == 'object' && unit) {
    return `{${Object.keys(unit).join(', ')}}`
  }
  return String(unit)
}

const getSampleName = (params) => {
  if (params.length === 1) {
    if (is.unit(params[0])) {
      return `sample(${getUnitName(params[0])})`
    }
    // config case
    const config = params[0]
    if (!config.clock) return `sample(${getUnitName(config.source)})`
    return `sample(${getUnitName(config.source)} by ${getUnitName(config.clock)})`
  }
  const sourceName = getUnitName(params[0])
  const clock = params[1]
  if (!clock) {
    return `sample(${sourceName})`
  }
  const clockName = getUnitName(params[1])
  return `sample(${sourceName} by ${clockName})`
}

export const handleSample = (params, instance) => {
  if (params.length === 1 && 'target' in params[0]) return
  const name = getSampleName(params)
  if (instance.compositeName) {
    instance.compositeName.fullName = name
  }
  instance.shortName = name
  if (is.store(instance)) {
    realmStore(instance)
  }
  else {
    realmEvent(instance)
  }
}
