import 'effector/enable_debug_traces'

import {createEvent, fork, allSettled, serialize} from 'effector'
import {argumentHistory} from 'effector/fixtures'

import {simpleStore} from './stub/simple-store'
import {sidlessStore} from './stub/sidless-store'

const mapStackTrace = (stacktrace: string) => {
  if (!stacktrace) return []
  return stacktrace.split('\n').map(line => {
    const [, , , , , , file] = line.split(' ')
    return file
  })
}

describe('skipVoid error messages', () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  function getErrorStacks() {
    return argumentHistory(consoleErrorSpy).map(e =>
      e?.message
        ? e.message +
          '\n' +
          mapStackTrace(e.stack)
            .filter(x => !!x && x.includes('error-stacks'))
            .map(f => f.split('/').slice(-3).join('/') + '\n')
        : e,
    )
  }

  afterEach(() => {
    consoleErrorSpy.mockClear()
  })

  test('Serialize scope', async () => {
    const scope = fork()

    const event = createEvent()
    simpleStore.on(event, () => 2)
    sidlessStore.on(event, () => 2)
    await allSettled(event, {scope})
    expect(serialize(scope)).toMatchInlineSnapshot(`
      Object {
        "u23wz5": 2,
      }
    `)
    expect(getErrorStacks()).toMatchInlineSnapshot(`
      Array [
        "serialize: One or more stores dont have sids, their values are omitted",
        "store: store should have sid or \`serialize: ignore\`
      error-stacks/stub/sidless-store.ts:5:29)
      ,__tests__/error-stacks/debug_traces_enabled.scope-serialize-messages.test.ts:7:1)
      ",
      ]
    `)
  })
})
