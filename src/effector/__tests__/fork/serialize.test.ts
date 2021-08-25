import {
  createStore,
  createEvent,
  createDomain,
  allSettled,
  combine,
  fork,
  hydrate,
  serialize,
  sample,
} from 'effector'

it('serialize stores to object of sid as keys', () => {
  const $a = createStore('value', {sid: 'a'})
  const $b = createStore([], {sid: 'b'})
  const $c = createStore(null as null | number, {sid: 'c'})
  const $d = createStore(false, {sid: 'd'})

  const scope = fork({
    values: [
      [$a, 'value2'],
      [$b, []],
      [$c, 0],
      [$d, true],
    ],
  })
  const values = serialize(scope)

  expect(values).toMatchInlineSnapshot(`
    Object {
      "a": "value2",
      "b": Array [],
      "c": 0,
      "d": true,
    }
  `)
})

it('serialize stores with ignore parameter', () => {
  const $a = createStore('value', {sid: 'a'})
  const $b = createStore([], {sid: 'b'})
  const $c = createStore(null as null | number, {sid: 'c'})
  const $d = createStore(false, {sid: 'd'})

  const scope = fork({
    values: [
      [$a, 'value2'],
      [$b, []],
      [$c, 0],
      [$d, true],
    ],
  })
  const values = serialize(scope, {ignore: [$b, $d]})

  expect(values).toMatchInlineSnapshot(`
    Object {
      "a": "value2",
      "c": 0,
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
  const $c = third.createStore(null as null | number, {sid: 'c'})
  const $d = app.createStore(false, {sid: 'd'})

  const scope = fork(app, {
    values: [
      [$a, 'value2'],
      [$b, []],
      [$c, 0],
      [$d, true],
    ],
  })
  const values = serialize(scope, {ignore: [$d, $a]})

  expect(values).toMatchInlineSnapshot(`
    Object {
      "b": Array [],
      "c": 0,
    }
`)
})

describe('onlyChanges', () => {
  it('avoid serializing combined stores when they are not changed', async () => {
    const newMessage = createEvent()
    const messages = createStore(0, {sid: '-i1guvk'}).on(newMessage, x => x + 1)
    const stats = combine({messages})
    const scope = fork()
    expect(serialize(scope)).toMatchInlineSnapshot(`Object {}`)
    await allSettled(newMessage, {scope})
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "-i1guvk": 1,
      }
    `)
  })
  it('skip unchanged objects', async () => {
    const newMessage = createEvent()
    const messages = createStore(0, {sid: '-isuad'}).on(newMessage, x => x + 1)
    const scope = fork()
    expect(serialize(scope)).toMatchInlineSnapshot(`Object {}`)
    await allSettled(newMessage, {scope})
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "-isuad": 1,
      }
    `)
  })

  it('keep store in serialization when it returns to default state', async () => {
    const newMessage = createEvent()
    const resetMessages = createEvent()
    const messages = createStore(0, {sid: 'a0ikkx'})
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork()
    await allSettled(newMessage, {scope})
    await allSettled(resetMessages, {scope})
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "a0ikkx": 0,
      }
    `)
  })
  it('keep store in serialization when it filled with fork values', async () => {
    const newMessage = createEvent()
    const resetMessages = createEvent()
    const messages = createStore(0, {sid: '-x2xs4q'})
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork({
      values: [[messages, 1]],
    })
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "-x2xs4q": 1,
      }
    `)
    await allSettled(resetMessages, {scope})
    expect(serialize(scope)).toMatchInlineSnapshot(`
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
      .createStore(0, {sid: '-2b0ci3'})
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork(app)
    hydrate(scope, {
      values: [[messages, 0]],
    })
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "-2b0ci3": 0,
      }
    `)
    await allSettled(newMessage, {scope})
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "-2b0ci3": 1,
      }
    `)
  })
})

describe('serializing combine', () => {
  it('should not serialize combine in default case', async () => {
    const trigger = createEvent()
    const foo = createStore(0, {sid: '19cuby'}).on(trigger, x => x + 1)
    const bar = createStore(0, {sid: 'q3ihek'}).on(trigger, x => x + 1)
    const combined = combine({foo, bar})
    const scope = fork()
    await allSettled(trigger, {scope})
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "19cuby": 1,
        "q3ihek": 1,
      }
    `)
  })
  it('should serialize combine when it updated by on', async () => {
    const trigger = createEvent()
    const foo = createStore(0, {sid: '-rvz6dk'})
    const bar = createStore(0, {sid: 'iaz8iy'})
    const combined = combine({foo, bar}).on(trigger, ({foo, bar}) => ({
      foo: foo + 1,
      bar: bar + 1,
    }))
    const scope = fork()
    await allSettled(trigger, {scope})
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "77n872": Object {
          "bar": 1,
          "foo": 1,
        },
      }
    `)
  })
  describe('don`t reuse values from user', () => {
    test('with sample (more convenient)', async () => {
      const triggerA = createEvent()
      const triggerB = createEvent()
      const foo = createStore(0, {sid: 'foo'})
      const bar = createStore(0, {sid: 'bar'}).on(triggerB, x => x + 10)
      const combined = combine({foo, bar})
      sample({
        clock: triggerA,
        source: combined,
        target: combined,
        fn: ({foo, bar}) => ({
          foo: foo + 1,
          bar: bar + 1,
        }),
      })

      const sid = String(combined.sid)

      const scope = fork()
      await allSettled(triggerA, {scope})
      expect(serialize(scope)).toEqual({[sid]: {foo: 1, bar: 1}})
      await allSettled(triggerB, {scope})
      expect(serialize(scope)).toEqual({bar: 10, [sid]: {foo: 0, bar: 10}})
      await allSettled(triggerA, {scope})
      expect(serialize(scope)).toEqual({bar: 10, [sid]: {foo: 1, bar: 11}})
      await allSettled(triggerB, {scope})
      expect(serialize(scope)).toEqual({bar: 20, [sid]: {foo: 0, bar: 20}})
    })
    test('with on (less convenient)', async () => {
      const triggerA = createEvent()
      const triggerB = createEvent()
      const foo = createStore(0, {sid: 'foo'})
      const bar = createStore(0, {sid: 'bar'}).on(triggerB, x => x + 10)
      const combined = combine({foo, bar})
      combined.on(triggerA, ({foo, bar}) => ({
        foo: foo + 1,
        bar: bar + 1,
      }))

      const sid = String(combined.sid)

      const scope = fork()
      await allSettled(triggerA, {scope})
      expect(serialize(scope)).toEqual({[sid]: {foo: 1, bar: 1}})
      await allSettled(triggerB, {scope})
      expect(serialize(scope)).toEqual({bar: 10, [sid]: {foo: 0, bar: 10}})
      await allSettled(triggerA, {scope})
      expect(serialize(scope)).toEqual({bar: 10, [sid]: {foo: 1, bar: 11}})
      await allSettled(triggerB, {scope})
      expect(serialize(scope)).toEqual({bar: 20, [sid]: {foo: 0, bar: 20}})
    })
  })
})
