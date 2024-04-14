import {allSettled, createEvent, createStore, fork, serialize} from 'effector'
import {createField, createFieldset, topLevelFactory} from './factory'

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
      "-iajnln|-77rc2s|2": 21,
      "8iua16|-77rc2s|2": "alice",
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
      "-fjbluz|-fjbluz|1104zu|1|2|-77rc2s|2": "alice",
      "-fjbluz|-fjbluz|11jxl7|3|4|-77rc2s|2": 21,
    }
  `)
})

test('derived sids support', async () => {
  const pushUpdate = createEvent()
  const inlineFactory = () => {
    const $interalStore = createStore(0, {
      // not-unique sid
      sid: '$interalStore',
    }).on(pushUpdate, state => state + 1)

    return {
      $interalStore,
    }
  }

  topLevelFactory(() => {
    inlineFactory() // 1
    inlineFactory() // 2

    topLevelFactory(() => {
      inlineFactory() // 3
    })
  })

  const scope = fork()

  await allSettled(pushUpdate, {scope})

  expect(serialize(scope)).toMatchInlineSnapshot(`
    Object {
      "ot2oxd|$interalStore|1": 1,
      "ot2oxd|$interalStore|4": 1,
      "ot2oxd|ot2oxd|ov9vcj|6|7|$interalStore|1": 1,
    }
  `)
})
