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
  expect(serialize(scope)).toEqual({
    a: 'value2',
    b: [],
    c: 0,
    d: true,
  })
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
  expect(serialize(scope, {ignore: [$b, $d]})).toEqual({
    a: 'value2',
    c: 0,
  })
})

test('serialize: ignore', async () => {
  const inc = createEvent()
  const $a = createStore(0, {sid: 'a', serialize: 'ignore'})
  const $b = createStore(0, {sid: 'b'})
  $a.on(inc, x => x + 1)
  $b.on(inc, x => x + 1)

  const scope = fork()

  await allSettled(inc, {scope})

  expect(serialize(scope)).toEqual({b: 1})
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
  expect(serialize(scope, {ignore: [$d, $a]})).toEqual({
    b: [],
    c: 0,
  })
})

describe('onlyChanges: true', () => {
  it('avoid serializing combined stores when they are not changed', async () => {
    const newMessage = createEvent()
    const messages = createStore(0, {sid: 'messages'}).on(
      newMessage,
      x => x + 1,
    )
    const stats = combine({messages})
    const scope = fork()
    expect(serialize(scope)).toEqual({})
    await allSettled(newMessage, {scope})
    expect(serialize(scope)).toEqual({messages: 1})
  })
  it('skip unchanged objects', async () => {
    const newMessage = createEvent()
    const messages = createStore(0, {sid: 'messages'}).on(
      newMessage,
      x => x + 1,
    )
    const scope = fork()
    expect(serialize(scope)).toEqual({})
    await allSettled(newMessage, {scope})
    expect(serialize(scope)).toEqual({messages: 1})
  })

  it('keep store in serialization when it returns to default state', async () => {
    const newMessage = createEvent()
    const resetMessages = createEvent()
    const messages = createStore(0, {sid: 'messages'})
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork()
    await allSettled(newMessage, {scope})
    await allSettled(resetMessages, {scope})
    expect(serialize(scope)).toEqual({messages: 0})
  })
  it('keep store in serialization when it filled with fork values', async () => {
    const newMessage = createEvent()
    const resetMessages = createEvent()
    const messages = createStore(0, {sid: 'messages'})
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork({
      values: [[messages, 1]],
    })
    expect(serialize(scope)).toEqual({messages: 1})
    await allSettled(resetMessages, {scope})
    expect(serialize(scope)).toEqual({messages: 0})
  })
  it('keep store in serialization when it filled with hydrate values', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const resetMessages = app.createEvent()
    const messages = app
      .createStore(0, {sid: 'messages'})
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork(app)
    hydrate(scope, {
      values: [[messages, 0]],
    })
    expect(serialize(scope)).toEqual({messages: 0})
    await allSettled(newMessage, {scope})
    expect(serialize(scope)).toEqual({messages: 1})
  })

  describe('serializing combine', () => {
    it('should not serialize combine in default case', async () => {
      const trigger = createEvent()
      const foo = createStore(0, {sid: 'foo'}).on(trigger, x => x + 1)
      const bar = createStore(0, {sid: 'bar'}).on(trigger, x => x + 1)
      const combined = combine({foo, bar})
      const scope = fork()
      await allSettled(trigger, {scope})
      expect(serialize(scope)).toEqual({foo: 1, bar: 1})
    })
    it('should serialize combine when it updated by on', async () => {
      const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
      const trigger = createEvent()
      const foo = createStore(0, {sid: 'foo'})
      const bar = createStore(0, {sid: 'bar'})
      const combined = combine({foo, bar}).on(trigger, ({foo, bar}) => ({
        foo: foo + 1,
        bar: bar + 1,
      }))
      warn.mockRestore()
      const sid = String(combined.sid)
      const scope = fork()
      await allSettled(trigger, {scope})
      expect(serialize(scope)).toEqual({
        [sid]: {foo: 1, bar: 1},
      })
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
        const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
        const triggerA = createEvent()
        const triggerB = createEvent()
        const foo = createStore(0, {sid: 'foo'})
        const bar = createStore(0, {sid: 'bar'}).on(triggerB, x => x + 10)
        const combined = combine({foo, bar})
        combined.on(triggerA, ({foo, bar}) => ({
          foo: foo + 1,
          bar: bar + 1,
        }))
        warn.mockRestore()

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

  test('serialize: ignore', async () => {
    const app = createDomain()
    const inc = app.createEvent()
    const $a = app.createStore(0, {sid: 'a', serialize: 'ignore'})
    const $b = app.createStore(0, {sid: 'b'})
    $a.on(inc, x => x + 1)
    $b.on(inc, x => x + 1)

    const scope = fork(app)

    await allSettled(inc, {scope})

    expect(serialize(scope, {onlyChanges: false})).toEqual({b: 1})
  })
})

describe('onlyChanges: false', () => {
  it('avoid serializing combined stores when they are not changed', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const messages = app
      .createStore(0, {sid: 'messages'})
      .on(newMessage, x => x + 1)
    const stats = combine({messages})
    const scope = fork(app)
    expect(serialize(scope, {onlyChanges: false})).toEqual({messages: 0})
    await allSettled(newMessage, {scope})
    expect(serialize(scope, {onlyChanges: false})).toEqual({messages: 1})
  })
  it('keep unchanged objects', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const messages = app
      .createStore(0, {sid: 'messages'})
      .on(newMessage, x => x + 1)
    const scope = fork(app)
    expect(serialize(scope, {onlyChanges: false})).toEqual({messages: 0})
    await allSettled(newMessage, {scope})
    expect(serialize(scope, {onlyChanges: false})).toEqual({messages: 1})
  })

  it('keep store in serialization when it returns to default state', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const resetMessages = app.createEvent()
    const messages = app
      .createStore(0, {sid: 'messages'})
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork(app)
    await allSettled(newMessage, {scope})
    await allSettled(resetMessages, {scope})
    expect(serialize(scope, {onlyChanges: false})).toEqual({messages: 0})
  })
  it('keep store in serialization when it filled with fork values', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const resetMessages = app.createEvent()
    const messages = app
      .createStore(0, {sid: 'messages'})
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork(app, {
      values: [[messages, 1]],
    })
    expect(serialize(scope, {onlyChanges: false})).toEqual({messages: 1})
    await allSettled(resetMessages, {scope})
    expect(serialize(scope, {onlyChanges: false})).toEqual({messages: 0})
  })
  it('keep store in serialization when it filled with hydrate values', async () => {
    const app = createDomain()
    const newMessage = app.createEvent()
    const resetMessages = app.createEvent()
    const messages = app
      .createStore(0, {sid: 'messages'})
      .on(newMessage, x => x + 1)
      .reset(resetMessages)
    const scope = fork(app)
    hydrate(scope, {
      values: [[messages, 0]],
    })
    expect(serialize(scope, {onlyChanges: false})).toEqual({messages: 0})
    await allSettled(newMessage, {scope})
    expect(serialize(scope, {onlyChanges: false})).toEqual({messages: 1})
  })

  describe('serializing combine', () => {
    it('should not serialize combine in default case', async () => {
      const app = createDomain()
      const trigger = app.createEvent()
      const foo = app.createStore(0, {sid: 'foo'}).on(trigger, x => x + 1)
      const bar = app.createStore(0, {sid: 'bar'}).on(trigger, x => x + 1)
      const combined = combine({foo, bar})
      const scope = fork(app)
      await allSettled(trigger, {scope})
      expect(serialize(scope, {onlyChanges: false})).toEqual({foo: 1, bar: 1})
    })
    it('should serialize combine when it updated by on', async () => {
      const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
      const app = createDomain()
      const trigger = app.createEvent()
      const foo = app.createStore(0, {sid: 'foo'})
      const bar = app.createStore(0, {sid: 'bar'})
      const combined = combine({foo, bar}).on(trigger, ({foo, bar}) => ({
        foo: foo + 1,
        bar: bar + 1,
      }))
      warn.mockRestore()
      const sid = String(combined.sid)
      const scope = fork(app)
      await allSettled(trigger, {scope})
      expect(serialize(scope, {onlyChanges: false})).toEqual({
        foo: 0,
        bar: 0,
        [sid]: {foo: 1, bar: 1},
      })
    })
    describe('don`t reuse values from user', () => {
      test('with sample (more convenient)', async () => {
        const app = createDomain()
        const triggerA = app.createEvent()
        const triggerB = app.createEvent()
        const foo = app.createStore(0, {sid: 'foo'})
        const bar = app.createStore(0, {sid: 'bar'}).on(triggerB, x => x + 10)
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

        const scope = fork(app)
        await allSettled(triggerA, {scope})
        expect(serialize(scope, {onlyChanges: false})).toEqual({
          foo: 0,
          bar: 0,
          [sid]: {foo: 1, bar: 1},
        })
        await allSettled(triggerB, {scope})
        expect(serialize(scope, {onlyChanges: false})).toEqual({
          foo: 0,
          bar: 10,
          [sid]: {foo: 0, bar: 10},
        })
        await allSettled(triggerA, {scope})
        expect(serialize(scope, {onlyChanges: false})).toEqual({
          foo: 0,
          bar: 10,
          [sid]: {foo: 1, bar: 11},
        })
        await allSettled(triggerB, {scope})
        expect(serialize(scope, {onlyChanges: false})).toEqual({
          foo: 0,
          bar: 20,
          [sid]: {foo: 0, bar: 20},
        })
      })
      test('with on (less convenient)', async () => {
        const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
        const app = createDomain()
        const triggerA = app.createEvent()
        const triggerB = app.createEvent()
        const foo = app.createStore(0, {sid: 'foo'})
        const bar = app.createStore(0, {sid: 'bar'}).on(triggerB, x => x + 10)
        const combined = combine({foo, bar})
        combined.on(triggerA, ({foo, bar}) => ({
          foo: foo + 1,
          bar: bar + 1,
        }))
        warn.mockRestore()

        const sid = String(combined.sid)

        const scope = fork(app)
        await allSettled(triggerA, {scope})
        expect(serialize(scope, {onlyChanges: false})).toEqual({
          foo: 0,
          bar: 0,
          [sid]: {foo: 1, bar: 1},
        })
        await allSettled(triggerB, {scope})
        expect(serialize(scope, {onlyChanges: false})).toEqual({
          foo: 0,
          bar: 10,
          [sid]: {foo: 0, bar: 10},
        })
        await allSettled(triggerA, {scope})
        expect(serialize(scope, {onlyChanges: false})).toEqual({
          foo: 0,
          bar: 10,
          [sid]: {foo: 1, bar: 11},
        })
        await allSettled(triggerB, {scope})
        expect(serialize(scope, {onlyChanges: false})).toEqual({
          foo: 0,
          bar: 20,
          [sid]: {foo: 0, bar: 20},
        })
      })
    })
  })
})

test('onlyChanges: false supported only in domain-based scopes', () => {
  const scope = fork()
  expect(() => {
    serialize(scope, {onlyChanges: false})
  }).toThrowErrorMatchingInlineSnapshot(`"scope should be created from domain"`)
})

describe('serialize: missing sids', () => {
  test('serialize: warns about missing sids', () => {
    const error = jest.fn()
    const consoleError = console.error
    console.error = error

    // forcing missing sid
    // equals to situation, if user forgot to configure babel-plugin
    // or did not install the sid manually
    const $store = createStore('value', {sid: ''})

    const scope = fork()

    allSettled($store, {scope, params: 'scope value'})

    const result = serialize(scope)
    expect(result).toEqual({})
    expect(scope.getState($store)).toEqual('scope value')
    expect(error).toHaveBeenCalledWith(
      'provided scope cannot be serialized in a reliable way because some stores are missing sid. Please, check that babel-plugin is working or provide sid manually',
    )

    console.error = consoleError
  })
  test('serialize: doesn not warn, if no sid is missing', () => {
    const error = jest.fn()
    const consoleError = console.error
    console.error = error

    const $store = createStore('value')

    const scope = fork()

    allSettled($store, {scope, params: 'scope value'})

    const result = serialize(scope)
    expect(result).toEqual({
      [$store.sid as string]: 'scope value',
    })
    expect(scope.getState($store)).toEqual('scope value')
    expect(error).toHaveBeenCalledTimes(0)
    console.error = consoleError
  })
  test('serialize: doesn not warn on mapped or combined stores', () => {
    const error = jest.fn()
    const consoleError = console.error
    console.error = error

    const $store = createStore('value')
    const $mapped = $store.map(s => s)
    const $combine = combine($store, $mapped, (_, m) => m)

    const scope = fork()

    allSettled($store, {scope, params: 'scope value'})

    const result = serialize(scope)
    expect(scope.getState($store)).toEqual('scope value')
    expect(scope.getState($combine)).toEqual('scope value')
    expect(result).toEqual({
      [$store.sid as string]: 'scope value',
    })
    expect(error).toHaveBeenCalledTimes(0)
    console.error = consoleError
  })
})
