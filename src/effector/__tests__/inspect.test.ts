import {inspect, Message} from 'effector/inspect'
import {createEvent, createStore, sample, fork, allSettled} from 'effector'
import {argumentHistory} from 'effector/fixtures'

function compactLog(m: Message) {
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
      fn: m => trackMock(compactLog(m)),
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
      fn: m => trackMock(compactLog(m)),
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
      fn: m => trackMock(compactLog(m)),
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
          trackMock(compactLog(m))
          m.trace!.forEach(trace => {
            trackMock(`<- ${compactLog(trace)}`)
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
