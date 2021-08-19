import {createDomain, fork, serialize} from 'effector'
import {createField, createFieldset} from './factory'

test('factory support', async () => {
  const app = createDomain()
  const username = createField(app, 'username', 'guest')
  const age = createField(app, 'age', 0)
  const scope = fork(app, {
    values: [
      [username.value, 'alice'],
      [age.value, 21],
    ],
  })
  expect(serialize(scope)).toMatchInlineSnapshot(`
    Object {
      "-hti17gɔ-77rc2s": 21,
      "8zvwfdɔ-77rc2s": "alice",
    }
  `)
})

test('nested factory support', async () => {
  const app = createDomain()
  const form = createFieldset(app, () => [
    createField(app, 'username', 'guest'),
    createField(app, 'age', 0),
  ])
  const scope = fork(app, {
    values: [
      [form.shape.username, 'alice'],
      [form.shape.age, 21],
    ],
  })
  expect(serialize(scope)).toMatchInlineSnapshot(`
    Object {
      "-el8d2lɔ123q6kɔ-77rc2s": "alice",
      "-el8d2lɔ12nirxɔ-77rc2s": 21,
    }
  `)
})
