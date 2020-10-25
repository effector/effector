import {createDomain, fork, serialize} from 'effector'
import {createField, createFieldset} from './fabric'

test('fabric support', async () => {
  const app = createDomain()
  const username = createField(app, 'username', 'guest')
  const age = createField(app, 'age', 0)
  const scope = fork(app, {
    values: new Map().set(username.value, 'alice').set(age.value, 21),
  })
  expect(serialize(scope)).toMatchInlineSnapshot(`
    Object {
      "-schy1zɔ5qq8yr": 21,
      "mgvfe4ɔ5qq8yr": "alice",
    }
  `)
})

test('nested fabric support', async () => {
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
      "il394nɔ-g68ocvɔ5qq8yr": 21,
      "il394nɔ-g6sgy8ɔ5qq8yr": "alice",
      "il394nɔrx96kl": Object {
        "age": 21,
        "username": "alice",
      },
    }
  `)
})
