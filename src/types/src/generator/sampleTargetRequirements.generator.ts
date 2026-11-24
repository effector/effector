import {computeFn, config, union} from '../runner/manifold/operators'

export default () => {
  const payload = union({oneOf: ['never', 'void', 'unknown', 'any', '{a: number}', '{a: number; b: string}']})
  const targets = union({oneOf: ['[bottom, ignored]', '[ignored, bottom]', '[wide, ignored]', '[left, right]', '[left, wide]', '[ignored, wide]']})
  const form = union({oneOf: ['inline', 'readonly', 'mutable', 'array']})
  const mode = union({oneOf: ['source', 'clock', 'fn']})
  const code = computeFn({
    source: {payload, targets, form, mode},
    fn: ({payload, targets, form, mode}) => `{
function regression() {
const input = createEvent<${payload}>()
const bottom = createEvent<never>()
const ignored = createEvent<void>()
const wide = createEvent<unknown>()
const left = createEvent<{a: number}>()
const right = createEvent<{b: string}>()
const selected = ${targets}${form === 'readonly' ? ' as const' : form === 'mutable' ? ` as [typeof ${targets.slice(1, -1).split(', ').join(', typeof ')}]` : ''}
sample({
  ${mode === 'source' ? 'source' : 'clock'}: input,
  ${mode === 'fn' ? `fn: value => {
    const exact: ${payload} = value
    return exact
  },` : ''}
  target: ${form === 'inline' ? targets : 'selected'},
})
}
}`,
  })
  config({
    header: '',
    file: 'generated/sampleTargetRequirements',
    usedMethods: ['createEvent', 'sample'],
    grouping: {
      getHash: [payload, form, mode],
      describeGroup: computeFn({source: {payload, form, mode}, fn: ({payload, form, mode}) => `${payload}, ${form}, ${mode}`}),
      createTestLines: {type: 'text', value: code},
    },
  })
}
