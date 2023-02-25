import {inspect, Message, inspectGraph, Declaration} from 'effector/inspect'
import {
  createEvent,
  createStore,
  sample,
  fork,
  allSettled,
  createEffect,
  combine,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'
import {performance} from 'perf_hooks'

function compactMessage(m: Message) {
  return `${m.type} of '${m.name}' [${m.kind}] to value of '${
    m.value
  }' (id:${typeof m.id}, sid:${typeof m.sid}, loc:${typeof m.loc}, meta:${typeof m.meta})`
}

describe('inspect API', () => {
  test('should be possible to track chain of events', () => {
    const start = createEvent()
    const $a = createStore(0).on(start, s => s + 1)
    const $b = $a.map(s => s + 1)

    const end = createEvent()

    sample({
      source: [$a, $b],
      clock: start,
      fn: ([a, b]) => a + b,
      target: end,
    })

    const trackMock = jest.fn()
    inspect({
      fn: m => trackMock(compactMessage(m)),
    })

    start()

    expect(argumentHistory(trackMock).length).toBeGreaterThan(0)
    expect(argumentHistory(trackMock)).toMatchInlineSnapshot(`
      Array [
        "update of 'start' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object)",
        "update of 'undefined' [on] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object)",
        "update of '$a' [store] to value of '1' (id:string, sid:string, loc:object, meta:object)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'undefined' [map] to value of '2' (id:string, sid:undefined, loc:undefined, meta:object)",
        "update of '$a → *' [store] to value of '2' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'updates' [event] to value of '2' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'undefined' [combine] to value of '1,2' (id:string, sid:undefined, loc:undefined, meta:object)",
        "update of 'combine($a, $a → *)' [store] to value of '1,2' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'updates' [event] to value of '1,2' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'undefined' [sample] to value of '3' (id:string, sid:string, loc:object, meta:object)",
        "update of 'end' [event] to value of '3' (id:string, sid:string, loc:object, meta:object)",
      ]
    `)
  })

  test('should be possible to track chain of events in specific scope', () => {
    const start = createEvent<string>()
    const $a = createStore(0).on(start, s => s + 1)
    const $b = $a.map(s => s + 1)

    const end = createEvent()

    sample({
      source: [$a, $b],
      clock: start,
      fn: ([a, b]) => a + b,
      target: end,
    })

    const scopeToTrack = fork()
    const anotherScope = fork()

    const trackMock = jest.fn()
    inspect({
      scope: scopeToTrack,
      fn: m => trackMock(compactMessage(m)),
    })

    start('SHOULD_NOT_BE_TRACKED')
    allSettled(start, {scope: scopeToTrack, params: 'MUST_BE_TRACKED'})
    allSettled(start, {scope: anotherScope, params: 'SHOULD_NOT_BE_TRACKED'})

    expect(argumentHistory(trackMock).length).toBeGreaterThan(0)
    // We explicitly said, which scope computes we want to track
    expect(
      argumentHistory(trackMock).join(',').includes('SHOULD_NOT_BE_TRACKED'),
    ).toBe(false)
    expect(
      argumentHistory(trackMock).join(',').includes('MUST_BE_TRACKED'),
    ).toBe(true)
    expect(argumentHistory(trackMock)).toMatchInlineSnapshot(`
      Array [
        "update of 'start' [event] to value of 'MUST_BE_TRACKED' (id:string, sid:string, loc:object, meta:object)",
        "update of 'undefined' [on] to value of '2' (id:string, sid:undefined, loc:undefined, meta:object)",
        "update of '$a' [store] to value of '2' (id:string, sid:string, loc:object, meta:object)",
        "update of 'updates' [event] to value of '2' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'undefined' [undefined] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object)",
        "update of 'undefined' [map] to value of '3' (id:string, sid:undefined, loc:undefined, meta:object)",
        "update of '$a → *' [store] to value of '3' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'updates' [event] to value of '3' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'undefined' [combine] to value of '2,3' (id:string, sid:undefined, loc:undefined, meta:object)",
        "update of 'combine($a, $a → *)' [store] to value of '2,3' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'updates' [event] to value of '2,3' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'undefined' [sample] to value of '5' (id:string, sid:string, loc:object, meta:object)",
        "update of 'end' [event] to value of '5' (id:string, sid:string, loc:object, meta:object)",
        "update of 'undefined' [undefined] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object)",
      ]
    `)
  })

  test('unsub should work', () => {
    const up = createEvent()
    const $count = createStore(0).on(up, s => s + 1)

    const trackMock = jest.fn()
    const unsub = inspect({
      fn: m => trackMock(compactMessage(m)),
    })

    up()
    up()
    const currentHistory = [...argumentHistory(trackMock)]
    expect(currentHistory).toMatchInlineSnapshot(`
      Array [
        "update of 'up' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object)",
        "update of 'undefined' [on] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object)",
        "update of '$count' [store] to value of '1' (id:string, sid:string, loc:object, meta:object)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object)",
        "update of 'up' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object)",
        "update of 'undefined' [on] to value of '2' (id:string, sid:undefined, loc:undefined, meta:object)",
        "update of '$count' [store] to value of '2' (id:string, sid:string, loc:object, meta:object)",
        "update of 'updates' [event] to value of '2' (id:string, sid:object, loc:undefined, meta:object)",
      ]
    `)

    unsub()

    up()

    const nextHistory = [...argumentHistory(trackMock)]
    expect(nextHistory).toEqual(currentHistory)
    expect($count.getState()).toEqual(3)
  })

  test('trace should work', () => {
    const start = createEvent()
    const $a = createStore(0).on(start, s => s + 1)
    const $b = $a.map(s => s + 1)

    const end = createEvent()

    sample({
      source: [$a, $b],
      clock: start,
      fn: ([a, b]) => a + b,
      target: end,
    })

    const trackMock = jest.fn()
    inspect({
      trace: true,
      fn: m => {
        if (m.sid === end.sid) {
          trackMock(compactMessage(m))
          m.trace!.forEach(trace => {
            trackMock(`<- ${compactMessage(trace)}`)
          })
        }
      },
    })

    start()

    expect(argumentHistory(trackMock).length).toBeGreaterThan(0)
    expect(argumentHistory(trackMock)).toMatchInlineSnapshot(`
      Array [
        "update of 'end' [event] to value of '3' (id:string, sid:string, loc:object, meta:object)",
        "<- update of 'undefined' [sample] to value of '3' (id:string, sid:string, loc:object, meta:object)",
        "<- update of 'start' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object)",
      ]
    `)
  })
})

function compactDeclaration(d: Declaration) {
  return `${d.derived ? 'derived ' : ''}${d.type} ${d.name} (${
    d.kind
  }) created (sid ${typeof d.sid}, parent factory: ${typeof d.factory}, id: ${typeof d.id}, loc: ${typeof d.loc})`
}

describe('inspectGraph API', () => {
  test('should work', () => {
    const declMock = jest.fn()
    const unsub = inspectGraph({
      fn: d => declMock(compactDeclaration(d)),
    })

    const event1 = createEvent()
    const $store2 = createStore(0)
    const effectFx = createEffect(() => {})
    const $store3 = $store2.map(x => x)
    const event4 = event1.map(x => x)
    const event5 = event1.prepend(x => x)
    const $store6 = combine([$store2, $store3])

    expect(argumentHistory(declMock).length).toBeGreaterThan(0)
    expect(argumentHistory(declMock)).toMatchInlineSnapshot(`
      Array [
        "unit event1 (event) created (sid string, parent factory: undefined, id: string, loc: object)",
        "derived unit updates (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "unit 35 (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "unit $store2 (store) created (sid string, parent factory: undefined, id: string, loc: object)",
        "unit effectFx (effect) created (sid string, parent factory: undefined, id: string, loc: object)",
        "derived unit finally (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit done (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit fail (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit doneData (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit failData (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit updates (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "unit 44 (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "unit 43 (store) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit updates (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit inFlight (store) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit updates (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit pending (store) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit updates (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit $store2 → * (store) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit event1 → * (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "unit * → event1 (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit updates (event) created (sid object, parent factory: undefined, id: string, loc: undefined)",
        "derived unit $store6 (store) created (sid string, parent factory: undefined, id: string, loc: object)",
      ]
    `)

    unsub()
  })
})

describe('real use cases', () => {
  test('measure effect timings', async () => {
    const start = createEvent()

    const fx1 = createEffect(() => new Promise(r => setTimeout(r, 12)))
    const fx2 = createEffect(() => new Promise(r => setTimeout(r, 22)))
    const fx3 = createEffect(() => new Promise(r => setTimeout(r, 32)))

    sample({
      clock: start,
      target: [fx1, fx2, fx3],
    })

    const scope = fork()

    const times: Record<string, number> = {}
    const startRecord = (name: string) => {
      const start = Date.now()

      return () => {
        times[name] = Date.now() - start
      }
    }

    const timers = new Map<string, () => void>()

    const unsub = inspect({
      scope,
      fn: m => {
        if (m.kind === 'effect') {
          timers.set(m.stack.fxID as string, startRecord(m.name!))
        }
        if (m.kind === 'event' && m.meta.named === 'finally') {
          const stop = timers.get(m.stack.fxID as string)
          stop?.()
        }
      },
    })

    await allSettled(start, {scope})

    const floor = (n: number) => Math.floor(n / 10) * 10

    expect(floor(times.fx1)).toEqual(10)
    expect(floor(times.fx2)).toEqual(20)
    expect(floor(times.fx3)).toEqual(30)

    unsub()
  })
  test('monitor out-of-scope computations', async () => {
    const start = createEvent()

    const scope = fork()

    const outOfScope = jest.fn()
    inspect({
      fn: () => outOfScope(),
    })

    allSettled(start, {scope})

    expect(outOfScope).not.toBeCalled()

    start()

    expect(outOfScope).toBeCalled()
  })
  test('monitor sid-less stores', async () => {
    const missingSid = jest.fn()

    inspectGraph({
      fn: d => {
        if (d.kind === 'store' && !d.sid) missingSid(d.name)
      },
    })

    const $a = createStore(null)
    const $b = createStore(null, {sid: null as unknown as string})
    const $c = createStore(null)

    expect(missingSid).toBeCalledTimes(1)
    expect(missingSid).toBeCalledWith('$b')
  })
  test('monitor stores with duplicated sid`s', async () => {
    const duplicatedSid = jest.fn()

    const sidMap: Record<string, boolean> = {}

    inspectGraph({
      fn: d => {
        if (d.kind === 'store' && d.sid) {
          if (sidMap[d.sid]) {
            duplicatedSid(d.name)
          } else {
            sidMap[d.sid] = true
          }
        }
      },
    })

    const $a = createStore(null, {sid: '$a'})
    const $b = createStore(null)
    const $c = createStore(null, {sid: '$a'})

    expect(duplicatedSid).toBeCalledTimes(1)
  })
  test('profile computations', async () => {
    const start = createEvent()

    const end = sample({
      clock: start,
      fn: () => {
        let c = 0
        while (c < 10_000) {
          c++
        }
      },
    })

    const timeLog = jest.fn()
    let time = 0
    let tracking = false

    const scope = fork()

    inspect({
      scope,
      fn: m => {
        if (!tracking) {
          tracking = true
          time = performance.now()
          queueMicrotask(() => {
            tracking = false
            timeLog({starter: m.name, ms: performance.now() - time})
          })
        }
      },
    })

    await allSettled(start, {scope})

    expect(tracking).toBe(false)
    expect(timeLog).toBeCalledTimes(1)
    expect(timeLog).toBeCalledWith({starter: 'start', ms: expect.any(Number)})
    expect(argumentHistory(timeLog)[0].ms).toBeGreaterThan(0)
  })
  test('list units by file', () => {
    const unitsByFile: Record<string, string[]> = {}
    inspectGraph({
      fn: d => {
        if (d.loc) {
          const file = d.loc.file.split('/').at(-1) || ''
          const units = unitsByFile[file] || []
          units.push(d.name!)
          unitsByFile[file] = units
        }
      },
    })
    const $a = createStore(null)
    const $b = createStore(null)
    const $c = createStore(null)

    expect(unitsByFile).toEqual({
      'inspect.test.ts': ['$a', '$b', '$c'],
    })
  })
  test('track pure function errors in custom way', () => {
    // something that logs errors directly into our monitoring systems
    // providing additional context
    const appLogger = {
      log: jest.fn(message => ({
        message,
        logContext: {
          appName: 'my-app',
          appVersion: '1.0.0',
        },
      })),
    }

    const start = createEvent()
    const started = sample({
      clock: start,
      fn: () => {
        throw new Error('unexpected error, branch computation stopped')
      },
    })

    const scope = fork()

    inspect({
      scope,
      fn: m => {
        if (m.type === 'error') {
          appLogger.log(`name: ${m.name}, error: ${(m.value as Error).message}`)
        }
      },
    })

    allSettled(start, {scope})

    expect(argumentHistory(appLogger.log)[0]).toEqual(
      'name: started, error: unexpected error, branch computation stopped',
    )
  })
  test.todo('custom factories and operators handling')
})
