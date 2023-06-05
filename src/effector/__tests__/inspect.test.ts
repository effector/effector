import {inspect, Message, inspectGraph, Declaration} from 'effector/inspect'
import {
  createEvent,
  createStore,
  sample,
  fork,
  allSettled,
  createEffect,
  combine,
  withRegion,
  createNode,
  split,
  attach,
  guard,
  forward,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'
import {performance} from 'perf_hooks'
import {withFactory} from '../region'

function compactMessage(m: Message) {
  return `${m.type} of '${m.name}' [${m.kind}] to value of '${
    m.value
  }' (id:${typeof m.id}, sid:${typeof m.sid}, loc:${typeof m.loc}, meta:${typeof m.meta}, meta.id:${typeof m
    .meta.id}, meta.rootStateRefId:${typeof m.meta.rootStateRefId})`
}

describe('inspect API', () => {
  test('should be possible to track chain of events', async () => {
    const start = createEvent()
    const $a = createStore(0).on(start, s => s + 1)
    const $b = $a.map(s => s + 1)
    const myFx = createEffect(async () => {
      // ok
    })
    const attachedFx = attach({
      effect: myFx,
    })
    const attachedFnFx = attach({
      source: $a,
      effect: async () => {
        // ok
      },
    })

    const end = createEvent()

    sample({
      source: [$a, $b],
      clock: start,
      fn: ([a, b]) => a + b,
      target: [end, myFx, attachedFx, attachedFnFx],
    })

    const evs = split(myFx.doneData, {
      a: () => true,
    })

    guard({
      clock: attachedFnFx.doneData,
      filter: () => true,
      target: end,
    })
    forward({
      from: attachedFnFx.done,
      to: end,
    })

    const trackMock = jest.fn()
    inspect({
      fn: m => trackMock(compactMessage(m)),
    })

    start()

    await new Promise(r => setTimeout(r))

    expect(argumentHistory(trackMock).length).toBeGreaterThan(0)
    expect(argumentHistory(trackMock)).toMatchInlineSnapshot(`
      Array [
        "update of 'start' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of '$a' [store] to value of '1' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of '2' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of '$a → *' [store] to value of '2' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '2' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [combine] to value of '1,2' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'combine($a, $a → *)' [store] to value of '1,2' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1,2' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [sample] to value of '3' (id:string, sid:string, loc:object, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'end' [event] to value of '3' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'myFx' [effect] to value of '3' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'myFx.inFlight' [store] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'inFlight' [store] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'true' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'pending' [store] to value of 'true' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of 'true' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'attachedFx' [effect] to value of '3' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'attachedFx.inFlight' [store] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'inFlight' [store] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'true' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'pending' [store] to value of 'true' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of 'true' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'attachedFnFx' [effect] to value of '3' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'attachedFnFx.inFlight' [store] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'inFlight' [store] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'true' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'pending' [store] to value of 'true' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of 'true' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [fx] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'undefined' [fx] to value of '[object Object]' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'myFx' [effect] to value of '3' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '2' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'myFx.inFlight' [store] to value of '2' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '2' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of '2' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'inFlight' [store] to value of '2' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '2' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'true' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'pending' [store] to value of 'true' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'undefined' [fx] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'undefined' [fx] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'finally' [event] to value of '[object Object]' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [filterMap] to value of '[object Object]' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'undefined' [filterMap] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'done' [event] to value of '[object Object]' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'doneData' [event] to value of 'undefined' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [split] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'cases.a' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'myFx.inFlight' [store] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'inFlight' [store] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'true' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'pending' [store] to value of 'true' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'undefined' [fx] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'finally' [event] to value of '[object Object]' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [filterMap] to value of '[object Object]' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'undefined' [filterMap] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'done' [event] to value of '[object Object]' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'undefined' [forward] to value of '[object Object]' (id:string, sid:undefined, loc:object, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'doneData' [event] to value of 'undefined' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'end' [event] to value of '[object Object]' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [guard] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '0' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'attachedFnFx.inFlight' [store] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of '0' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'inFlight' [store] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'false' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'pending' [store] to value of 'false' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of 'false' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [guard] to value of 'undefined' (id:string, sid:string, loc:object, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'end' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [fx] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'finally' [event] to value of '[object Object]' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [filterMap] to value of '[object Object]' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'undefined' [filterMap] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'done' [event] to value of '[object Object]' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'doneData' [event] to value of 'undefined' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [split] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'cases.a' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '0' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'myFx.inFlight' [store] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of '0' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'inFlight' [store] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'false' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'pending' [store] to value of 'false' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of 'false' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [fx] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'finally' [event] to value of '[object Object]' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [filterMap] to value of '[object Object]' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'undefined' [filterMap] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'done' [event] to value of '[object Object]' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'doneData' [event] to value of 'undefined' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '0' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'attachedFx.inFlight' [store] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of '0' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'inFlight' [store] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '0' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of 'false' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'pending' [store] to value of 'false' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of 'false' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [fx] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
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
        "update of 'start' [event] to value of 'MUST_BE_TRACKED' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '2' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of '$a' [store] to value of '2' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '2' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [undefined] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'undefined' [map] to value of '3' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of '$a → *' [store] to value of '3' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '3' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [combine] to value of '2,3' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'combine($a, $a → *)' [store] to value of '2,3' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '2,3' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [sample] to value of '5' (id:string, sid:string, loc:object, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of 'end' [event] to value of '5' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [undefined] to value of 'undefined' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
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
        "update of 'up' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '1' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of '$count' [store] to value of '1' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '1' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'up' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "update of 'undefined' [on] to value of '2' (id:string, sid:undefined, loc:undefined, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "update of '$count' [store] to value of '2' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:string)",
        "update of 'updates' [event] to value of '2' (id:string, sid:object, loc:undefined, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
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
        "update of 'end' [event] to value of '3' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
        "<- update of 'undefined' [sample] to value of '3' (id:string, sid:string, loc:object, meta:object, meta.id:undefined, meta.rootStateRefId:undefined)",
        "<- update of 'start' [event] to value of 'undefined' (id:string, sid:string, loc:object, meta:object, meta.id:string, meta.rootStateRefId:undefined)",
      ]
    `)
  })
})

function compactDeclaration(d: Declaration) {
  if (d.type === 'region') return `region, parent: ${typeof d.region}`
  if (d.type === 'factory')
    return `factory, ${d.method}, ${d.sid}, ${
      d.name
    }, parent: ${typeof d.region}`

  return `${d.derived ? 'derived ' : ''}${d.type} ${d.name} (${
    d.kind
  }) created (sid ${typeof d.sid}, parent region: ${typeof d.region}, id: ${typeof d.id}, loc: ${typeof d.loc}, meta.id:${typeof d
    .meta.id}, meta.rootStateRefId:${typeof d.meta.rootStateRefId})`
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
    const history = [...argumentHistory(declMock)]
    expect(history).toMatchInlineSnapshot(`
      Array [
        "unit event1 (event) created (sid string, parent region: undefined, id: string, loc: object, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit updates (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "unit reinit (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "unit $store2 (store) created (sid string, parent region: undefined, id: string, loc: object, meta.id:string, meta.rootStateRefId:string)",
        "unit effectFx (effect) created (sid string, parent region: undefined, id: string, loc: object, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit finally (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit done (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit fail (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit doneData (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit failData (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit updates (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "unit reinit (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "unit effectFx.inFlight (store) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:string)",
        "derived unit updates (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit inFlight (store) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:string)",
        "derived unit updates (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit pending (store) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:string)",
        "derived unit updates (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit $store2 → * (store) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:string)",
        "derived unit event1 → * (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "unit * → event1 (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit updates (event) created (sid object, parent region: undefined, id: string, loc: undefined, meta.id:string, meta.rootStateRefId:undefined)",
        "derived unit $store6 (store) created (sid string, parent region: undefined, id: string, loc: object, meta.id:string, meta.rootStateRefId:string)",
      ]
    `)

    unsub()

    const event2 = createEvent()
    const $store1 = createStore(0)
    const effFx = createEffect(() => {})

    expect(argumentHistory(declMock)).toEqual(history)
  })
  describe('region support', () => {
    test('one-level withRegion', () => {
      function customOperator(config: Record<string, unknown>) {
        withRegion(
          createNode({
            meta: {
              myLibType: 'customOperator',
              myLibConfig: config,
            },
          }),
          () => {
            const internalEvent = createEvent()
          },
        )
      }

      const declared = jest.fn()
      const nonRegionalUnitDeclared = jest.fn()
      const regionalUnitDeclared = jest.fn()
      inspectGraph({
        fn: d => {
          declared(`${d.type} ${d.name} created`)
          if (!d.region) {
            nonRegionalUnitDeclared()
          } else {
            regionalUnitDeclared(d.region.meta)
          }
        },
      })

      const $source = createStore(0)
      const targetEvent = createEvent()

      customOperator({
        source: $source,
        target: targetEvent,
      })

      expect(regionalUnitDeclared).toHaveBeenCalledTimes(1)
      expect(regionalUnitDeclared).toHaveBeenCalledWith({
        myLibType: 'customOperator',
        myLibConfig: {
          source: $source,
          target: targetEvent,
        },
      })
      expect(argumentHistory(declared)).toMatchInlineSnapshot(`
        Array [
          "unit updates created",
          "unit reinit created",
          "unit $source created",
          "unit targetEvent created",
          "unit internalEvent created",
          "region undefined created",
        ]
      `)
    })
    test('one-level withFactory', () => {
      function customOperator(config: Record<string, unknown>) {
        const internalEvent = createEvent()
      }

      const declared = jest.fn()
      const nonRegionalUnitDeclared = jest.fn()
      const regionalUnitDeclared = jest.fn()
      inspectGraph({
        fn: d => {
          declared(`${d.type} ${d.name} created`)
          if (!d.region) {
            nonRegionalUnitDeclared()
          } else {
            regionalUnitDeclared(d.region.meta)
          }
        },
      })

      const $source = createStore(0)
      const targetEvent = createEvent()

      withFactory({
        sid: 'customOperator-call-1',
        method: 'customOperator',
        name: 'test-name',
        fn: () =>
          customOperator({
            source: $source,
            target: targetEvent,
          }),
      })
      expect(regionalUnitDeclared).toHaveBeenCalledTimes(1)
      expect(regionalUnitDeclared).toHaveBeenCalledWith(
        expect.objectContaining({
          sid: 'customOperator-call-1',
          method: 'customOperator',
        }),
      )
      expect(argumentHistory(declared)).toMatchInlineSnapshot(`
        Array [
          "unit updates created",
          "unit reinit created",
          "unit $source created",
          "unit targetEvent created",
          "unit internalEvent created",
          "factory test-name created",
        ]
      `)
    })
    test('nested regions', () => {
      function customOperator(config: Record<string, unknown>) {
        withRegion(createNode({meta: {region: 'outer'}}), () => {
          withRegion(createNode({meta: {region: 'inner'}}), () => {
            const internalEvent = createEvent()
          })
        })
      }

      const declared = jest.fn()
      const nonRegionalUnitDeclared = jest.fn()
      const regionalUnitDeclared = jest.fn()
      inspectGraph({
        fn: d => {
          declared(`${d.type} ${d.name} created`)
          if (d.type === 'unit') {
            if (!d.region) {
              nonRegionalUnitDeclared()
            } else {
              regionalUnitDeclared(d.region)
            }
          }
        },
      })

      const $source = createStore(0)
      const targetEvent = createEvent()

      withFactory({
        sid: 'customOperator-call-1',
        method: 'customOperator',
        name: 'test-name',
        fn: () =>
          customOperator({
            source: $source,
            target: targetEvent,
          }),
      })

      expect(regionalUnitDeclared).toHaveBeenCalledTimes(1)
      expect(regionalUnitDeclared).toHaveBeenCalledWith({
        type: 'region',
        id: expect.any(String),
        meta: {
          region: 'inner',
        },
        region: {
          type: 'region',
          id: expect.any(String),
          meta: {region: 'outer'},
          region: {
            type: 'factory',
            id: expect.any(String),
            region: undefined,
            sid: 'customOperator-call-1',
            method: 'customOperator',
            name: 'test-name',
            meta: expect.objectContaining({
              sid: 'customOperator-call-1',
              method: 'customOperator',
            }),
          },
        },
      })
      expect(argumentHistory(declared)).toMatchInlineSnapshot(`
        Array [
          "unit updates created",
          "unit reinit created",
          "unit $source created",
          "unit targetEvent created",
          "unit internalEvent created",
          "region undefined created",
          "region undefined created",
          "factory test-name created",
        ]
      `)
    })
  })
  describe('operators', () => {
    test('sample and sample-like', () => {
      /**
       * guard, forward, merge, etc - their configs are subsets of sample's config
       */
    })
    test('split', () => {
      /**
       * split is a bit special and is not a subset of sample (yet?)
       */
    })
    test('store.on', () => {
      /**
       * store.on is a shorthand for sample
       */
    })
    test('createApi', () => {
      /**
       * It is not clear, how it should look or work, as it is a shortand for store.on,
       * which currently is a shorthand for sample
       */
    })
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
          appLogger.log(`name: ${m.name}, error: ${(m.error as Error).message}`)
        }
      },
    })

    allSettled(start, {scope})

    expect(argumentHistory(appLogger.log)[0]).toEqual(
      'name: started, error: unexpected error, branch computation stopped',
    )
  })
  test('list both units and custom stuff by file', () => {
    function createQuery(config: Record<string, unknown>) {
      return withRegion(
        createNode({
          meta: {
            config,
          },
        }),
        () => {
          const start = createEvent()
          const $data = createStore(0)

          return {
            start,
            $data,
          }
        },
      )
    }

    const unitsByFile: Record<
      string,
      {
        name: string
        value: unknown
      }[]
    > = {}
    inspectGraph({
      fn: d => {
        if (d.loc) {
          const file = d.loc.file.split('/').at(-1) || ''
          const units = unitsByFile[file] || []
          const name = d.region
            ? `${d.region.region?.meta.name!}/${d.name!}`
            : d.name!

          units.push({
            name: name,
            value: d.meta.defaultState,
          })
          unitsByFile[file] = units
        }
      },
    })
    const $a = createStore(0)
    const $b = createStore('1')
    const $c = createStore(2)

    const myQuery = withFactory({
      sid: 'some-sid',
      name: 'myQuery',
      method: 'createQuery',
      fn: () => createQuery({a: 1, b: 2}),
    })

    expect(unitsByFile).toEqual({
      'inspect.test.ts': [
        {
          name: '$a',
          value: 0,
        },
        {
          name: '$b',
          value: '1',
        },
        {
          name: '$c',
          value: 2,
        },
        {
          name: 'myQuery/start',
          value: undefined,
        },
        {
          name: 'myQuery/$data',
          value: 0,
        },
      ],
    })
  })
  test('trail', () => {
    const snapshot: Record<string, any> = {
      samples: [],
      stores: [],
      effects: [],
      domains: [],
      events: [],
      attaches: [],
      storeOns: [],
    }
    function parseUnitDeclaration(d: Declaration) {
      return {
        id: d.id,
        name: d.name,
        kind: d.kind,
        sid: d.sid,
        derived: d.derived,
        createdBy: 'TODO',
        inDomain: 'TODO',
        loc: d.loc,
      }
    }
    function unwrapFactory(
      region: Declaration['region'],
      mode: 'first' | 'last',
    ): null | Declaration['region'] {
      if (!region) {
        return null
      }
      if (mode === 'first' && region.type === 'factory') {
        return region
      }
      if (mode === 'last' && region.type === 'factory' && !region.region) {
        return region
      }

      return unwrapFactory(region.region, mode)
    }
    function parseSampleDeclaration(d: Declaration) {
      if (d.type !== 'operation' || d.kind !== 'sample') {
        throw Error('sample should be operation')
      }

      return {
        ...d.config,
        isCombinedSource:
          d.config.source &&
          (Array.isArray(d.config.source) || d.config.source.type !== 'unit'), // source is present, but is a array or object shape
        isImplicitClock: !!(d.config.source && !d.config.clock),
        isImplicitSource: !!(d.config.clock && !d.config.source),
        // sample always have target
        // if not provided in config, it is created implicitly
        isImplicitTarget: 'TODO', // need to add more meta to unit declarations to track "parent" operators
        parentFactory: unwrapFactory(d.region, 'first'),
        rootParentFactory: unwrapFactory(d.region, 'last'),
      }
    }
    function parseStoreOnDeclaration(d: Declaration) {
      if (d.type !== 'operation' || d.kind !== 'on') {
        throw Error('storeOn should be operation')
      }
      // because $store.on(event, handler)
      // is basically a shorthand for sample({source: $store, clock: event, greedy: true, fn: handler, target: $store})
      return {
        source: d.config.source, // $store
        clock: d.config.clock, // event
        target: d.config.target, // $store again
      }
    }
    inspectGraph({
      fn: d => {
        if (d.kind === 'store') {
          snapshot.stores.push(parseUnitDeclaration(d))
          return
        }
        if (d.kind === 'event') {
          snapshot.events.push(parseUnitDeclaration(d))
          return
        }
        if (d.kind === 'effect') {
          snapshot.effects.push(parseUnitDeclaration(d))
          return
        }
        if (d.kind === 'domain') {
          snapshot.domains.push(parseUnitDeclaration(d))
          return
        }
        if (d.kind === 'sample') {
          snapshot.samples.push(parseSampleDeclaration(d))
          return
        }
        if (d.kind === 'on') {
          snapshot.storeOns.push(parseStoreOnDeclaration(d))
          return
        }
      },
    })
  })
})
