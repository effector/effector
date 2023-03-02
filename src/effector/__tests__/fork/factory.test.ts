import {allSettled, attach, createStore, fork, serialize} from 'effector'
import {createField, createFieldset, createOperation} from './factory'

test('factory support', async () => {
  const username = createField('username', 'guest')
  const age = createField('age', 0)
  const scope = fork({
    values: [
      [username.value, 'alice'],
      [age.value, 21],
    ],
  })
  expect(serialize(scope)).toMatchInlineSnapshot(`
    Object {
      "-iajnln|57xl5h": 21,
      "8iua16|57xl5h": "alice",
    }
  `)
})

test('nested factory support', async () => {
  const form = createFieldset(() => [
    createField('username', 'guest'),
    createField('age', 0),
  ])
  const scope = fork({
    values: [
      [form.shape.username, 'alice'],
      [form.shape.age, 21],
    ],
  })
  expect(serialize(scope)).toMatchInlineSnapshot(`
    Object {
      "-fjbluz|1104zu|57xl5h": "alice",
      "-fjbluz|11jxl7|57xl5h": 21,
    }
  `)
})

test('issue #863: serialize should ignore store with serialize: ignore event it used in fork({ values })', async () => {
  const $count = createStore(0, {sid: 'mustBeIgnored', serialize: 'ignore'})
  const fx = attach({
    source: $count,
    effect: count => count * 100,
  })

  const operation = createOperation(fx)

  const scope = fork({
    values: [[$count, 5]],
  })

  await allSettled(operation.run, {scope})
  expect(serialize(scope)).toMatchInlineSnapshot(`
    Object {
      "gxtf3v|k9rtgc": 500,
    }
  `)
})
