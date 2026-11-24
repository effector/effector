import {computeFn, config, union} from '../runner/manifold/operators'

export default () => {
  const generic = union({oneOf: [false, true]})
  const clock = union({oneOf: ['[tick, index]', '[index, index]', 'mixed', 'tuple', 'readonlyArray', '[tick, unknown]', '[tick, any]', '[tick, never]']})
  const source = union({oneOf: ['state', '{stack, cursor}']})
  const target = union({oneOf: ['restored', '[restored]', 'none']})
  const filter = union({oneOf: ['none', 'flag', 'callback']})
  const code = computeFn({
    source: {generic, clock, source, target, filter},
    fn: ({generic, clock, source, target, filter}) => `{
function regression${generic ? '<T>' : ''}() {
${generic ? '' : 'type T = string'}
const tick = createEvent<void>()
const index = createEvent<number>()
const unknown = createEvent<unknown>()
const any = createEvent<any>()
const never = createEvent<never>()
const mixed = [tick, index]
const tuple = [tick, index] as const
const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
const stack = createStore<T[]>([])
const cursor = createStore(0)
const flag = createStore(true)
const restored = createEvent<T>()
sample({clock: ${clock}, source: ${source},
${filter === 'flag' ? 'filter: flag,' : filter === 'callback' ? `filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },` : ''}
fn: ({stack, cursor}) => {
assertNotAny<IsAny<typeof stack>>()
assertNotAny<IsAny<typeof cursor>>()
const result = stack[cursor]
${generic ? '' : 'assertNotAny<IsAny<typeof result>>()'}
const expected: T = result
return expected
}${target === 'none' ? '' : `, target: ${target}`}
})
}
}`,
  })
  config({
    header: `type IsAny<T> = 0 extends (1 & T) ? true : false\nconst assertNotAny = <T extends false>() => {}`,
    file: 'generated/sampleCallbackInference',
    usedMethods: ['createEvent', 'createStore', 'sample'],
    grouping: {
      getHash: [generic, source, target, filter],
      describeGroup: computeFn({source: {generic, source, target, filter}, fn: ({generic, source, target, filter}) => `${generic ? 'generic' : 'concrete'}, ${source}, ${target}, ${filter}`}),
      createTestLines: {type: 'text', value: code},
    },
  })
}
