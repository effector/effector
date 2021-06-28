import {
  ConfigStruct,
  ConfigStructShape,
  PartialCtxConfig,
  CtxConfig,
} from './types'
import {forIn} from '../forIn'

const Conf = {
  val: (required: boolean = false): ConfigStruct => ({
    type: 'value',
    required,
  }),
  kv: (required: boolean = false): ConfigStruct => ({
    type: 'kv',
    required,
  }),
  shape: (shape: Record<string, ConfigStruct>): ConfigStructShape => ({
    type: 'shape',
    shape,
    required: isRequiredConfShape(shape),
  }),
}
export const confStruct = Conf.shape({
  header: Conf.val(),
  file: Conf.val(),
  grouping: Conf.shape({
    filter: Conf.val(),
    getHash: Conf.val(true),
    describeGroup: Conf.val(true),
    dedupeHash: Conf.val(),
    createTestLines: Conf.val(true),
    sortByFields: Conf.kv(),
    pass: Conf.val(),
  }),
})

export const fileGeneratorConfStruct = Conf.shape({
  header: Conf.val(true),
  file: Conf.val(true),
  usedMethods: Conf.val(true),
  grouping: Conf.shape({
    filter: Conf.val(),
    getHash: Conf.val(true),
    describeGroup: Conf.val(true),
    dedupeHash: Conf.val(),
    createTestLines: Conf.val(true),
    sortByFields: Conf.kv(),
    pass: Conf.val(),
  }),
})

export function validateRequiredFields(
  cfg: ConfigStructShape,
  value: any,
  path: string[],
  isNested: boolean,
): string[][]
export function validateRequiredFields(
  cfg: ConfigStructShape,
  value: PartialCtxConfig,
): asserts value is CtxConfig
export function validateRequiredFields(
  cfg: ConfigStructShape,
  value: any,
  path: string[] = [],
  isNested: boolean = false,
) {
  if (!cfg.required) return []
  if (typeof value !== 'object' || value === null) {
    const results = collectRequiredFields(cfg.shape, path)
    if (!isNested) {
      const paths = results.map(path => path.join('.')).join(`\n`)
      throw Error(`required config items are missed:\n${paths}`)
    }
    return results
  }
  const missedPaths: string[][] = []
  forIn(cfg.shape, (cfgItem, field) => {
    switch (cfgItem.type) {
      case 'kv':
      case 'value': {
        if (!(field in value) && cfgItem.required) {
          missedPaths.push([...path, field])
        }
        break
      }
      case 'shape': {
        missedPaths.push(
          ...validateRequiredFields(
            cfgItem,
            value[field],
            [...path, field],
            true,
          ),
        )
        break
      }
    }
  })
  if (!isNested && missedPaths.length > 0) {
    const paths = missedPaths.map(path => path.join('.')).join(`\n`)
    throw Error(`required config items are missed:\n${paths}`)
  }
  return missedPaths
}
function collectRequiredFields(
  shape: Record<string, ConfigStruct>,
  path: string[],
) {
  const results: string[][] = []
  forIn(shape, (item, field) => {
    switch (item.type) {
      case 'kv':
      case 'value':
        if (item.required) results.push([...path, field])
        break
      case 'shape':
        results.push(...collectRequiredFields(item.shape, [...path, field]))
        break
    }
  })
  return results
}
function isRequiredConfShape(shape: Record<string, ConfigStruct>) {
  for (const field in shape) {
    const value = shape[field]
    switch (value.type) {
      case 'kv':
      case 'value': {
        if (value.required) return true
        break
      }
      case 'shape': {
        if (isRequiredConfShape(value.shape)) return true
        break
      }
    }
  }
  return false
}

export function applyConfigStruct(
  cfg: Record<string, ConfigStruct>,
  target: Record<string, any>,
  source: Record<string, any>,
) {
  let isApplied = false
  for (const field in cfg) {
    const cfgRecord = cfg[field]
    if (field in source) {
      switch (cfgRecord.type) {
        case 'value': {
          isApplied = true
          target[field] = source[field]
          break
        }
        case 'kv': {
          const isNewObject = !(field in target)
          const nestedTarget = isNewObject ? {} : target[field]
          let isNestedApplied = false
          for (const k in source[field]) {
            isNestedApplied = true
            nestedTarget[k] = source[field][k]
          }
          if (isNestedApplied) {
            isApplied = true
            if (isNewObject) target[field] = nestedTarget
          }
          break
        }
        case 'shape': {
          const isNewObject = !(field in target)
          const nestedTarget = isNewObject ? {} : target[field]
          const isNestedApplied = applyConfigStruct(
            cfgRecord.shape,
            nestedTarget,
            source[field],
          )
          if (isNestedApplied) {
            isApplied = true
            if (isNewObject) target[field] = nestedTarget
          }
          break
        }
      }
    }
  }
  return isApplied
}
