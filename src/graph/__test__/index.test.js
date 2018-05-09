// @flow

import graphRunner from '..'

function createTask(order) {
 return item => {
  order.push(`${item}:start`)
  return Promise.resolve().then(() => {
   order.push(`${item}:end`)
   return item.toUpperCase()
  })
 }
}

function createTaskSync(order) {
 return item => {
  order.push(item)
  return item.toUpperCase()
 }
}

describe('empty graph', () => {
 test('async', async() => {
  const graph = new Map([])
  const task = () => Promise.reject()
  const res = await graphRunner({graph, task})
  expect(res.safe).toBe(true)
  expect(Array.from(res.values)).toEqual([])
 })
 test('sync', () => {
  const graph = new Map([])
  const task = () => {
   throw undefined
  }
  const res = graphRunner({graph, task, sync: true})
  expect(res.safe).toBe(true)
  expect(Array.from(res.values)).toEqual([])
 })
})

describe('graph with no dependencies', () => {
 test('async', async() => {
  const graph = new Map([['a', []], ['b', []], ['c', []], ['d', []]])
  const order = []
  const task = createTask(order)

  const res = await graphRunner({graph, task})
  expect(res.safe).toBe(true)
  expect(Array.from(res.values)).toEqual([
   ['a', 'A'],
   ['b', 'B'],
   ['c', 'C'],
   ['d', 'D'],
  ])
  expect(order).toEqual([
   'a:start',
   'b:start',
   'c:start',
   'd:start',
   'a:end',
   'b:end',
   'c:end',
   'd:end',
  ])
 })

 test('sync', () => {
  const graph = new Map([['a', []], ['b', []], ['c', []], ['d', []]])
  const order = []
  const task = createTaskSync(order)

  const res = graphRunner({graph, task, sync: true})
  expect(res.safe).toBe(true)
  expect(Array.from(res.values)).toEqual([
   ['a', 'A'],
   ['b', 'B'],
   ['c', 'C'],
   ['d', 'D'],
  ])
  expect(order).toEqual(['a', 'b', 'c', 'd'])
 })
})
describe('graph with multiple dependencies on one item', () => {
 test('async', async() => {
  const graph = new Map([['a', ['d']], ['b', ['d']], ['c', []], ['d', []]])
  const order = []
  const task = createTask(order)
  const res = await graphRunner({graph, task})
  expect(res.safe).toBe(true)
  expect(Array.from(res.values)).toEqual([
   ['c', 'C'],
   ['d', 'D'],
   ['a', 'A'],
   ['b', 'B'],
  ])
  expect(order).toEqual([
   'c:start',
   'd:start',
   'c:end',
   'd:end',
   'a:start',
   'b:start',
   'a:end',
   'b:end',
  ])
 })
 test('sync', () => {
  const graph = new Map([['a', ['d']], ['b', ['d']], ['c', []], ['d', []]])
  const order = []
  const task = createTaskSync(order)
  const res = graphRunner({graph, task, sync: true})
  expect(res.safe).toBe(true)
  expect(Array.from(res.values)).toEqual([
   ['c', 'C'],
   ['d', 'D'],
   ['a', 'A'],
   ['b', 'B'],
  ])
  expect(order).toEqual(['c', 'd', 'a', 'b'])
 })
})

describe('graph with cycle (force: true)', () => {
 test('async', async() => {
  const graph = new Map([
   ['a', ['b']],
   ['b', ['c']],
   ['c', ['d']],
   ['d', ['a']],
  ])
  const order = []
  const task = createTask(order)
  const res = await graphRunner({graph, task, force: true})
  expect(res.safe).toBe(false)
  expect(Array.from(res.values)).toEqual([
   ['a', 'A'],
   ['d', 'D'],
   ['c', 'C'],
   ['b', 'B'],
  ])
  expect(order).toEqual([
   'a:start',
   'a:end',
   'd:start',
   'd:end',
   'c:start',
   'c:end',
   'b:start',
   'b:end',
  ])
 })

 test('sync', () => {
  const graph = new Map([
   ['a', ['b']],
   ['b', ['c']],
   ['c', ['d']],
   ['d', ['a']],
  ])
  const order = []
  const task = createTaskSync(order)
  const res = graphRunner({graph, task, force: true, sync: true})
  expect(res.safe).toBe(false)
  expect(Array.from(res.values)).toEqual([
   ['a', 'A'],
   ['d', 'D'],
   ['c', 'C'],
   ['b', 'B'],
  ])
  expect(order).toEqual(['a', 'd', 'c', 'b'])
 })
})

describe('graph with cycle (force: false)', () => {
 test('async', () => {
  const graph = new Map([
   ['a', ['b']],
   ['b', ['c']],
   ['c', ['d']],
   ['d', ['a']],
  ])
  const task = createTask([])
  expect(
   (() => graphRunner({graph, task, force: false}))(),
  ).rejects.toThrowError()
 })
 test('sync', () => {
  const graph = new Map([
   ['a', ['b']],
   ['b', ['c']],
   ['c', ['d']],
   ['d', ['a']],
  ])
  const task = createTaskSync([])
  expect(() =>
   graphRunner({graph, task, force: false, sync: true}),
  ).toThrowError()
 })
})

describe('graph with cycle with multiple unblocked deps', () => {
 test('async', async() => {
  const graph = new Map([
   ['a', ['d']],
   ['b', ['d']],
   ['c', ['d']],
   ['d', ['a']],
  ])
  const order = []
  const task = createTask(order)
  const res = await graphRunner({graph, task, force: true})
  expect(res.safe).toBe(false)
  expect(Array.from(res.values)).toEqual([
   ['d', 'D'],
   ['a', 'A'],
   ['b', 'B'],
   ['c', 'C'],
  ])
  expect(order).toEqual([
   'd:start',
   'd:end',
   'a:start',
   'b:start',
   'c:start',
   'a:end',
   'b:end',
   'c:end',
  ])
 })
 test('sync', () => {
  const graph = new Map([
   ['a', ['d']],
   ['b', ['d']],
   ['c', ['d']],
   ['d', ['a']],
  ])
  const order = []
  const task = createTaskSync(order)
  const res = graphRunner({graph, task, force: true, sync: true})
  expect(res.safe).toBe(false)
  expect(Array.from(res.values)).toEqual([
   ['d', 'D'],
   ['a', 'A'],
   ['b', 'B'],
   ['c', 'C'],
  ])
  expect(order).toEqual(['d', 'a', 'b', 'c'])
 })
})

describe('graph with multiple cycles', () => {
 test('async', async() => {
  const graph = new Map([
   ['a', ['b']],
   ['b', ['a']],
   ['c', ['d']],
   ['d', ['c']],
  ])
  const order = []
  const task = createTask(order)
  const res = await graphRunner({graph, task, force: true})
  expect(res.safe).toBe(false)
  expect(Array.from(res.values)).toEqual([
   ['a', 'A'],
   ['b', 'B'],
   ['c', 'C'],
   ['d', 'D'],
  ])
  expect(order).toEqual([
   'a:start',
   'a:end',
   'b:start',
   'b:end',
   'c:start',
   'c:end',
   'd:start',
   'd:end',
  ])
 })
 test('sync', () => {
  const graph = new Map([
   ['a', ['b']],
   ['b', ['a']],
   ['c', ['d']],
   ['d', ['c']],
  ])
  const order = []
  const task = createTaskSync(order)
  const res = graphRunner({graph, task, force: true, sync: true})
  expect(res.safe).toBe(false)
  expect(Array.from(res.values)).toEqual([
   ['a', 'A'],
   ['b', 'B'],
   ['c', 'C'],
   ['d', 'D'],
  ])
  expect(order).toEqual(['a', 'b', 'c', 'd'])
 })
})

describe('task fails on one item', () => {
 test('async', async() => {
  const graph = new Map([['a', []], ['b', ['a']], ['c', []], ['d', ['c']]])
  const order = []
  const task = item => {
   order.push(`${item}:start`)
   return Promise.resolve().then(() => {
    if (item === 'a') {
     order.push(`a:error`)
     throw new Error('oops')
    }
    order.push(`${item}:end`)
   })
  }
  const req = graphRunner({graph, task, force: true})
  expect(req).rejects.toThrowError()
  await req.catch(res => {})
  expect(order).toEqual([
   'a:start',
   'c:start',
   'a:error',
   'c:end',
   'd:start',
   'd:end',
  ])
 })
 test('sync', () => {
  const graph = new Map([['a', []], ['b', ['a']], ['c', []], ['d', ['c']]])
  const order = []
  const task = item => {
   order.push(`${item}:start`)
   if (item === 'a') {
    order.push(`a:error`)
    throw new Error('oops')
   }
   order.push(`${item}:end`)
  }
  expect(() => {
   graphRunner({graph, task, force: true, sync: true})
  }).toThrowError()
  expect(order).toEqual([
   'a:start',
   'a:error',
   'c:start',
   'c:end',
   'd:start',
   'd:end',
  ])
 })
})
