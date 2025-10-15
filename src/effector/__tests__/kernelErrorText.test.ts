import {createEvent, sample, combine, createStore} from 'effector'
// import 'effector/enable_debug_traces'
import {argumentHistory} from 'effector/fixtures'

function stackErrors(fn: jest.SpyInstance) {
  const history = argumentHistory(fn)
  return history.map(arg => {
    if ('stack' in Object(arg)) {
      const lines = String(arg.stack)
        .split('\n')
        .filter(line => {
          return (
            !line.includes('node_modules') && !line.includes('at new Promise')
          )
        })
        .map(line => line.replace(/\(\/.*\/src\//, '(/src/'))
      return lines.join('\n')
    }
    return arg
  })
}

let fn: jest.SpyInstance
beforeEach(() => {
  fn = jest.spyOn(console, 'error').mockImplementation(() => {})
  require('effector/enable_debug_traces')
})
afterEach(() => {
  fn.mockRestore()
})

test('errors in sample', () => {
  const clock = createEvent()
  const target = createEvent()
  sample({
    clock,
    fn() {
      throw Error('failed')
    },
    target,
    name: 'clock to target',
  })
  clock()
  expect(stackErrors(fn)).toMatchInlineSnapshot(`
    Array [
      "sample: This error happened in function from this unit:",
      "Error: unit trace
        at Object.<anonymous> (/Users/zerobias/web/effector7/current/src/effector/__tests__/kernelErrorText.test.ts:35:9)
        at Promise.then.completed (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/utils.js:391:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/utils.js:316:10)
        at _callCircusTest (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:218:40)
        at processTicksAndRejections (node:internal/process/task_queues:95:5)
        at _runTest (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:155:3)
        at _runTestsForDescribeBlock (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:66:9)
        at run (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:25:3)
        at runAndTransformResultsToJestFormat (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:170:21)",
      "Error: failed
        at fn (/src/effector/__tests__/kernelErrorText.test.ts:38:13)
        at fn (/src/effector/caller.ts:7:6)
        at tryRun (/src/effector/kernel.ts:539:12)
        at launch (/src/effector/kernel.ts:390:17)
        at Function.create (/src/effector/createUnit.ts:190:13)
        at clock (/src/effector/createUnit.ts:176:18)
        at Object.<anonymous> (/src/effector/__tests__/kernelErrorText.test.ts:43:3)",
    ]
  `)
})

test('errors in combine', () => {
  const clock = createEvent<number>()
  const $foo = createStore(0)
  sample({clock, target: $foo})

  const $bar = combine($foo, foo => {
    if (foo !== 0) {
      throw Error('failed')
    }
    return foo
  })

  clock(1)
  expect(stackErrors(fn)).toMatchInlineSnapshot(`
    Array [
      "combine: This error happened in function from this unit:",
      "Error: unit trace
        at Object.<anonymous> (/Users/zerobias/web/effector7/current/src/effector/__tests__/kernelErrorText.test.ts:75:23)
        at Promise.then.completed (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/utils.js:391:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/utils.js:316:10)
        at _callCircusTest (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:218:40)
        at processTicksAndRejections (node:internal/process/task_queues:95:5)
        at _runTest (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:155:3)
        at _runTestsForDescribeBlock (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:66:9)
        at run (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:25:3)
        at runAndTransformResultsToJestFormat (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:170:21)",
      "Error: failed
        at fn (/src/effector/__tests__/kernelErrorText.test.ts:77:13)
        at fn (/src/effector/combine.ts:87:34)
        at fn (/src/effector/caller.ts:14:3)
        at tryRun (/src/effector/kernel.ts:539:12)
        at launch (/src/effector/kernel.ts:390:17)
        at Function.create (/src/effector/createUnit.ts:190:13)
        at clock (/src/effector/createUnit.ts:176:18)
        at Object.<anonymous> (/src/effector/__tests__/kernelErrorText.test.ts:82:3)",
    ]
  `)
})

test('errors in on', () => {
  const clock = createEvent<number>()
  const $foo = createStore(0)
  sample({clock, target: $foo})

  $foo.on(clock, () => {
    throw Error('failed')
  })

  clock(1)
  expect(stackErrors(fn)).toMatchInlineSnapshot(`
    Array [
      "on: This error happened in function from this unit:",
      "Error: unit trace
        at Object.on (/Users/zerobias/web/effector7/current/src/effector/createUnit.ts:325:14)
        at Object.<anonymous> (/Users/zerobias/web/effector7/current/src/effector/__tests__/kernelErrorText.test.ts:115:8)
        at Promise.then.completed (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/utils.js:391:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/utils.js:316:10)
        at _callCircusTest (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:218:40)
        at processTicksAndRejections (node:internal/process/task_queues:95:5)
        at _runTest (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:155:3)
        at _runTestsForDescribeBlock (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:66:9)
        at run (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:25:3)",
      "Error: failed
        at fn (/src/effector/__tests__/kernelErrorText.test.ts:116:11)
        at fn (/src/effector/caller.ts:12:6)
        at tryRun (/src/effector/kernel.ts:539:12)
        at launch (/src/effector/kernel.ts:390:17)
        at Function.create (/src/effector/createUnit.ts:190:13)
        at clock (/src/effector/createUnit.ts:176:18)
        at Object.<anonymous> (/src/effector/__tests__/kernelErrorText.test.ts:119:3)",
    ]
  `)
})

test('errors in event map', () => {
  const clock = createEvent<number>()
  const target = clock.map(x => {
    throw Error('failed')
  })

  clock(1)
  expect(stackErrors(fn)).toMatchInlineSnapshot(`
    Array [
      "map: This error happened in function from this unit:",
      "Error: unit trace
        at Function.map (/Users/zerobias/web/effector7/current/src/effector/createUnit.ts:194:28)
        at Object.<anonymous> (/Users/zerobias/web/effector7/current/src/effector/__tests__/kernelErrorText.test.ts:148:24)
        at Promise.then.completed (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/utils.js:391:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/utils.js:316:10)
        at _callCircusTest (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:218:40)
        at processTicksAndRejections (node:internal/process/task_queues:95:5)
        at _runTest (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:155:3)
        at _runTestsForDescribeBlock (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:66:9)
        at run (/Users/zerobias/web/effector7/current/node_modules/jest-circus/build/run.js:25:3)",
      "Error: failed
        at fn (/src/effector/__tests__/kernelErrorText.test.ts:149:11)
        at fn (/src/effector/caller.ts:14:3)
        at tryRun (/src/effector/kernel.ts:539:12)
        at launch (/src/effector/kernel.ts:390:17)
        at Function.create (/src/effector/createUnit.ts:190:13)
        at clock (/src/effector/createUnit.ts:176:18)
        at Object.<anonymous> (/src/effector/__tests__/kernelErrorText.test.ts:152:3)",
    ]
  `)
})

test('errors in event prepend', () => {
  const target = createEvent<number>()
  const clock = target.prepend((x: number) => {
    throw Error('failed')
  })

  clock(1)
  expect(stackErrors(fn)).toMatchInlineSnapshot(`
    Array [
      "prepend: This error happened in function from this unit:",
      "Error: unit trace",
      "Error: failed
        at fn (/src/effector/__tests__/kernelErrorText.test.ts:182:11)
        at fn (/src/effector/caller.ts:14:3)
        at tryRun (/src/effector/kernel.ts:539:12)
        at launch (/src/effector/kernel.ts:390:17)
        at Function.create (/src/effector/createUnit.ts:190:13)
        at clock (/src/effector/createUnit.ts:176:18)
        at Object.<anonymous> (/src/effector/__tests__/kernelErrorText.test.ts:185:3)",
    ]
  `)
})
