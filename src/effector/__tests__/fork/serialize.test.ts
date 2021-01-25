import {
  allSettled,
  combine,
  createDomain,
  fork,
  hydrate,
  serialize,
} from 'effector'

it('serialize stores to object of sid as keys', () => {
  const app = createDomain()
  const $a = app.createStore('value', {sid: 'a'})
  const $b = app.createStore([], {sid: 'b'})
  const $c = app.createStore(null, {sid: 'c'})
  const $d = app.createStore(false, {sid: 'd'})

  const scope = fork(app)
  const values = serialize(scope)

  expect(values).toMatchInlineSnapshot(`
    Object {
      "a": "value",
      "b": Array [],
      "c": null,
      "d": false,
    }
  `)
})

it('serialize stores with ignore parameter', () => {
  const app = createDomain()
  const $a = app.createStore('value', {sid: 'a'})
  const $b = app.createStore([], {sid: 'b'})
  const $c = app.createStore(null, {sid: 'c'})
  const $d = app.createStore(false, {sid: 'd'})

  const scope = fork(app)
  const values = serialize(scope, {ignore: [$b, $d]})

  expect(values).toMatchInlineSnapshot(`
    Object {
      "a": "value",
      "c": null,
    }
  `)
})

it('serialize stores in nested domain', () => {
  const app = createDomain()
  const first = app.createDomain()
  const second = app.createDomain()
  const third = second.createDomain()
  const $a = first.createStore('value', {sid: 'a'})
  const $b = second.createStore([], {sid: 'b'})
  const $c = third.createStore(null, {sid: 'c'})
  const $d = app.createStore(false, {sid: 'd'})

  const scope = fork(app)
  const values = serialize(scope, {ignore: [$d, $a]})

  expect(values).toMatchInlineSnapshot(`
    Object {
      "b": Array [],
      "c": null,
    }
`)
})

describe('onlyChanges', () => {
  it('avoid serializing combined stores when they are not changed', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const messages = app.createStore(0).on(newMessage, x => x + 1)
    const stats = combine({messages})
    const scope = fork(app)
    expect(serialize(scope, {onlyChanges: true})).toMatchInlineSnapshot(
      `Object {}`,
    )
    await allSettled(newMessage, {scope})
    expect(serialize(scope, {onlyChanges: true})).toMatchInlineSnapshot(`
      Object {
        "-i1guvk": 1,
      }
    `)
  })
  it('skip unchanged objects', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const messages = app.createStore(0).on(newMessage, x => x + 1)
    const scope = fork(app)
    expect(serialize(scope, {onlyChanges: true})).toMatchInlineSnapshot(
      `Object {}`,
    )
    await allSettled(newMessage, {scope})
    expect(serialize(scope, {onlyChanges: true})).toMatchInlineSnapshot(`
      Object {
        "-isuad": 1,
      }
    `)
  })

  it('keep store in serialization when it returns to default state', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const resetMessages = app.createEvent()
    const messages = app
      .createStore(0)
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork(app)
    await allSettled(newMessage, {scope})
    await allSettled(resetMessages, {scope})
    expect(serialize(scope, {onlyChanges: true})).toMatchInlineSnapshot(`
      Object {
        "a0ikkx": 0,
      }
    `)
  })
  it('keep store in serialization when it filled with fork values', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const resetMessages = app.createEvent()
    const messages = app
      .createStore(0)
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork(app, {
      values: new Map([[messages, 1]]),
    })
    expect(serialize(scope, {onlyChanges: true})).toMatchInlineSnapshot(`
      Object {
        "-x2xs4q": 1,
      }
    `)
    await allSettled(resetMessages, {scope})
    expect(serialize(scope, {onlyChanges: true})).toMatchInlineSnapshot(`
      Object {
        "-x2xs4q": 0,
      }
    `)
  })
  it('keep store in serialization when it filled with hydrate values', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const resetMessages = app.createEvent()
    const messages = app
      .createStore(0)
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork(app)
    hydrate(scope, {
      values: new Map([[messages, 0]]),
    })
    expect(serialize(scope, {onlyChanges: true})).toMatchInlineSnapshot(`
      Object {
        "-2b0ci3": 0,
      }
    `)
    await allSettled(newMessage, {scope})
    expect(serialize(scope, {onlyChanges: true})).toMatchInlineSnapshot(`
      Object {
        "-2b0ci3": 1,
      }
    `)
  })
})

describe('serializing combine', () => {
  it('should not serialize combine in default case', async () => {
    const app = createDomain()
    const trigger = app.createEvent()
    const foo = app.createStore(0).on(trigger, x => x + 1)
    const bar = app.createStore(0).on(trigger, x => x + 1)
    const combined = combine({foo, bar})
    const scope = fork(app)
    await allSettled(trigger, {scope})
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "19cuby": 1,
        "q3ihek": 1,
      }
    `)
  })
  it('should serialize combine when it updated by on', async () => {
    const app = createDomain()
    const trigger = app.createEvent()
    const foo = app.createStore(0)
    const bar = app.createStore(0)
    const combined = combine({foo, bar}).on(trigger, ({foo, bar}) => ({
      foo: foo + 1,
      bar: bar + 1,
    }))
    const scope = fork(app)
    await allSettled(trigger, {scope})
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "-7gr20z": Object {
          "bar": 1,
          "foo": 1,
        },
        "-rvz6dk": 0,
        "iaz8iy": 0,
      }
    `)
  })
})
