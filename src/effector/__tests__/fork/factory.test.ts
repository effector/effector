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
      "-iajnln|-77rc2s": 21,
      "8iua16|-77rc2s": "alice",
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
      "-fjbluz|1104zu|-77rc2s": "alice",
      "-fjbluz|11jxl7|-77rc2s": 21,
    }
  `)
})
