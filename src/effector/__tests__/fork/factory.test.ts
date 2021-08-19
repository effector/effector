import {fork, serialize} from 'effector'
import {createField, createFieldset} from './factory'

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
      "-iajnlnɔ-77rc2s": 21,
      "8iua16ɔ-77rc2s": "alice",
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
      "-fjbluzɔ1104zuɔ-77rc2s": "alice",
      "-fjbluzɔ11jxl7ɔ-77rc2s": 21,
    }
  `)
})
