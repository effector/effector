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
      "-7lo3z5|f5xnnn": "alice",
      "-k7m3tu|f5xnnn": 21,
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
      "asdxit|-xud9bj|f5xnnn": "alice",
      "asdxit|hw4g0i|f5xnnn": 21,
    }
  `)
})
