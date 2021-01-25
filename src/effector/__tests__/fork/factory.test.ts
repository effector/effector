import {createDomain, fork, serialize} from 'effector'
import {createField, createFieldset} from './factory'

test('factory support', async () => {
  const app = createDomain()
  const username = createField(app, 'username', 'guest')
  const age = createField(app, 'age', 0)
  const scope = fork(app, {
    values: new Map().set(username.value, 'alice').set(age.value, 21),
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
    values: new Map().set(form.shape.username, 'alice').set(form.shape.age, 21),
  })
  expect(serialize(scope)).toMatchInlineSnapshot(`
    Object {
      "-g0d896ɔ10gcehɔ-77rc2s": "alice",
      "-g0d896ɔ1104zuɔ-77rc2s": 21,
    }
  `)
})
