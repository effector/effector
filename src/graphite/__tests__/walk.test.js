//@flow
//@jsx fx
//eslint-disable-next-line no-unused-vars
import {fx} from 'effector/stdlib'
// import {show} from 'effector/fixtures/showstep'
import {createEvent} from 'effector/event'

import {walkNode} from '../walk'

function eventCtx(payload) {
  return {
    __stepArg: payload,
  }
}
const Next = () => (
  <multi>
    <run
      fn={(...args) => {
        console.log(...args)
      }}
    />
  </multi>
)
describe('filter node will throw', () => {
  it('throw in a single node', () => {
    const next = Next()
    const exec = (
      <seq>
        <emit fullName="emit before filter node will throw" />
        <filter
          fn={() => {
            throw new Error('[expected error]')
          }}
        />
        <multi>
          <emit fullName="emit after filter node did throw" />
        </multi>
        {next}
      </seq>
    )
    const e2 = createEvent('e2')
    e2.graphite = {from: [], seq: exec, next}
    walkNode(e2.graphite.seq, eventCtx('e2()'))
  })
  it('throw in a multi node', () => {
    const next = Next()
    const exec = (
      <seq>
        <emit fullName="emit before filter node will throw" />
        <multi>
          <filter
            fn={() => {
              throw new Error('[expected error]')
            }}
          />
          <emit fullName="emit after filter node did throw" />
        </multi>
        {next}
      </seq>
    )
    const e3 = createEvent('e3')
    e3.graphite = {from: [], seq: exec, next}
    walkNode(e3.graphite.seq, eventCtx('e3()'))
  })
})
test('walk after multi', () => {
  const e1 = createEvent('e1')
  const next = Next()
  const exec = (
    <seq>
      <emit fullName="emit before multi" />
      <multi />
      <seq />
      <multi>
        <emit fullName="emit after multi" />
      </multi>
      {next}
    </seq>
  )
  e1.graphite = {from: [], seq: exec, next}
  console.log(exec)
  const ctx = eventCtx('e1()')
  walkNode(e1.graphite.seq, ctx)
  console.log(ctx)
})

describe('<run /> execution cases', () => {
  it('[a] tested correctly', () => {
    const fn = jest.fn()
    const trigger = createEvent('[run][a]')
    const next = Next()
    const exec = (
      <seq>
        <emit fullName="[a] tested correctly" />
        <run fn={fn} />
        {next}
      </seq>
    )
    trigger.graphite = {from: [], seq: exec, next}
    walkNode(exec, eventCtx('[run][a]()'))
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toBeCalledWith('[run][a]()')
  })
  it(`
| not return anything from <run/>
| run is always last step in the branch`, () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const trigger = createEvent('[run][b]')
    const next = Next()
    const exec = (
      <seq>
        <emit fullName="[b] tested correctly" />
        <run fn={fn1} />
        <run fn={fn2} />
        {next}
      </seq>
    )
    trigger.graphite = {from: [], seq: exec, next}
    walkNode(exec, eventCtx('[run][b]()'))
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toBeCalledWith('[run][b]()')
    expect(fn2).not.toHaveBeenCalled()
  })
})
describe.only('walk no-op', () => {
  test('walk no-op', () => {})
})

describe('<filter /> execution cases', () => {
  it('[a] tested correctly', () => {
    const fn = jest.fn()
    const trigger = createEvent('[filter][a]')
    const next = Next()
    const exec = (
      <seq>
        <emit fullName="[a] tested correctly" />
        <filter fn={fn} />
        {next}
      </seq>
    )
    trigger.graphite = {from: [], seq: exec, next}
    walkNode(exec, eventCtx('[filter][a]()'))
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toBeCalledWith('[filter][a]()')
  })
  it('[b] return changes on resolve', () => {
    const fn1 = jest.fn(() => true)
    const fn2 = jest.fn()
    const trigger = createEvent('[filter][b]')
    const next = Next()
    const exec = (
      <seq>
        <emit fullName="[b] tested correctly" />
        <filter fn={fn1} />
        <run fn={fn2} />
        {next}
      </seq>
    )
    trigger.graphite = {from: [], seq: exec, next}
    walkNode(exec, eventCtx('[filter][b]()'))
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toBeCalledWith('[filter][b]()')
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn2).toBeCalledWith('[filter][b]()')
  })
  it('[c] not return anything on reject', () => {
    const fn1 = jest.fn(() => false)
    const fn2 = jest.fn()
    const trigger = createEvent('[filter][c]')
    const next = Next()
    const exec = (
      <seq>
        <emit fullName="[c] tested correctly" />
        <filter fn={fn1} />
        <run fn={fn2} />
        {next}
      </seq>
    )
    trigger.graphite = {from: [], seq: exec, next}
    walkNode(exec, eventCtx('[filter][c]()'))
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toBeCalledWith('[filter][c]()')
    expect(fn2).not.toHaveBeenCalled()
  })
  it('[d] not return anything on throw', () => {
    const fn1 = () => {
      throw new Error('[expected error]')
    }
    const fn2 = jest.fn()
    const trigger = createEvent('[filter][d]')
    const next = Next()
    const exec = (
      <seq>
        <emit fullName="[d] tested correctly" />
        <filter fn={fn1} />
        <run fn={fn2} />
        {next}
      </seq>
    )
    trigger.graphite = {from: [], seq: exec, next}
    walkNode(exec, eventCtx('[filter][d]()'))
    expect(fn2).not.toHaveBeenCalled()
  })
})
