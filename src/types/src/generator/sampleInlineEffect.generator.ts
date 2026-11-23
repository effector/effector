import {bool, computeFn, config, union} from '../runner/manifold/operators'

type Payload = 'void' | 'unknown' | 'any' | 'never' | 'number' | 'string'
const payloads: Payload[] = [
  'void',
  'unknown',
  'any',
  'never',
  'number',
  'string',
]

export default () => {
  const payload = union({oneOf: payloads})
  const params = union({oneOf: ['inferred', 'explicitUnknown', ...payloads]})
  const async = union({oneOf: [false, true]})
  const form = union({
    oneOf: [
      'single',
      'inline',
      'multiple',
      'readonly',
      'extracted',
      'mutable',
      'readonlyArray',
    ],
  })
  const mode = union({
    oneOf: ['clock', 'source', 'both', 'Boolean', 'filter', 'fn'],
  })
  const compatible = computeFn({
    source: {payload, params},
    fn: ({payload, params}) =>
      payload === 'never' ||
      ['inferred', 'explicitUnknown', 'void', 'unknown', 'any'].includes(
        params,
      ) ||
      payload === params ||
      (payload === 'any' && params !== 'never'),
  })
  const pass = bool({source: {compatible}, true: {compatible: true}})
  const fail = bool({source: {compatible}, true: {compatible: false}})
  const target = computeFn({
    source: {params, async, form},
    fn: ({params, async, form}) => {
      const handler = `${async ? 'async ' : ''}(${['inferred', 'explicitUnknown'].includes(params) ? '' : `value: ${params}`}) => {}`
      const effect = `createEffect${params === 'explicitUnknown' ? '<unknown, unknown>' : ''}(${handler})`
      const name = `${async ? 'async' : 'sync'}${params}`
      switch (form) {
        case 'single':
          return effect
        case 'inline':
          return `[${effect}]`
        case 'multiple':
          return `[${effect}, createEvent<void>()]`
        case 'readonly':
          return `[${effect}] as const`
        case 'extracted':
          return `[${name}]`
        case 'mutable':
          return `${name}Mutable`
        default:
          return `${name}Readonly`
      }
    },
  })
  const clock = computeFn({
    source: {payload, mode},
    fn: ({payload, mode}) => (mode === 'source' ? null : `${payload}Clock`),
  })
  const source = computeFn({
    source: {payload, mode},
    fn: ({payload, mode}) =>
      ['source', 'both'].includes(mode) ? `${payload}Clock` : null,
  })
  const filter = computeFn({
    source: {mode},
    fn: ({mode}) =>
      mode === 'Boolean' ? 'Boolean' : mode === 'filter' ? '() => true' : null,
  })
  const fn = computeFn({
    source: {payload, mode},
    fn: ({payload, mode}) =>
      mode === 'fn' ? `(value: ${payload}) => value` : null,
  })
  config({
    header:
      payloads
        .map(payload => `const ${payload}Clock = createEvent<${payload}>()`)
        .join('\n') +
      '\n' +
      [false, true]
        .flatMap(async =>
          ['inferred', 'explicitUnknown', ...payloads].map(params => {
            const name = `${async ? 'async' : 'sync'}${params}`
            return `const ${name} = createEffect${params === 'explicitUnknown' ? '<unknown, unknown>' : ''}(${async ? 'async ' : ''}(${['inferred', 'explicitUnknown'].includes(params) ? '' : `value: ${params}`}) => {})\nconst ${name}Mutable = [${name}]\nconst ${name}Readonly: ReadonlyArray<typeof ${name}> = [${name}]`
          }),
        )
        .join('\n'),
    file: 'generated/sampleInlineEffect',
    usedMethods: ['createEvent', 'createEffect', 'sample'],
    grouping: {
      pass,
      getHash: [form, mode, async],
      tags: {payload, params, form, mode, async},
      describeGroup: computeFn({
        source: {form, mode, async},
        fn: ({form, mode, async}) =>
          `${form}, ${mode}, ${async ? 'async' : 'sync'}`,
      }),
      createTestLines: {
        method: 'sample',
        shape: {
          clock: {field: clock, markError: fail},
          source: {field: source, markError: fail},
          filter: {field: filter, markError: fail},
          fn: {field: fn, markError: fail},
          target: {field: target, markError: fail},
        },
      },
    },
  })
}
