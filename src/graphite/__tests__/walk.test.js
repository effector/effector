//@flow
//@jsx fx
//eslint-disable-next-line no-unused-vars
import fx from 'effector/stdlib/fx'
import {show} from 'effector/fixtures/showstep'
import {Ctx} from 'effector/graphite/typedef'
import {createStateRef} from 'effector/stdlib/stateref'

import {createEvent} from 'effector/event'
import {walkNode} from '../walk'

function eventCtx(payload) {
  return Ctx.emit({
    __stepArg: payload,
  })
}
const Next = () => (
  <multi>
    <single>
      <run
        runner={(...args) => {
          console.log(...args)
        }}
      />
    </single>
  </multi>
)
describe('filter node will throw', () => {
  it('throw in a single node', () => {
    const next = Next()
    const exec = (
      <seq>
        <single>
          <emit fullName="emit before filter node will throw" />
        </single>
        <filter
          filter={() => {
            throw new Error('[expected error]')
          }}
        />
        <multi>
          <single>
            <emit fullName="emit after filter node did throw" />
          </single>
        </multi>
        {next}
      </seq>
    )
    const e2 = createEvent('e2')
    e2.graphite = {seq: exec, next}
    walkNode(e2.graphite.seq, eventCtx('e2()'))
  })
  it('throw in a multi node', () => {
    const next = Next()
    const exec = (
      <seq>
        <single>
          <emit fullName="emit before filter node will throw" />
        </single>
        <multi>
          <filter
            filter={() => {
              throw new Error('[expected error]')
            }}
          />
          <single>
            <emit fullName="emit after filter node did throw" />
          </single>
        </multi>
        {next}
      </seq>
    )
    const e3 = createEvent('e3')
    e3.graphite = {seq: exec, next}
    walkNode(e3.graphite.seq, eventCtx('e3()'))
  })
})
test('walk after multi', () => {
  const e1 = createEvent('e1')
  const next = Next()
  const exec = (
    <seq>
      <single>
        <emit fullName="emit before multi" />
      </single>
      <multi />
      <seq />
      <multi>
        <single>
          <emit fullName="emit after multi" />
        </single>
      </multi>
      {next}
    </seq>
  )
  e1.graphite = {seq: exec, next}
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
        <single>
          <emit fullName="[a] tested correctly" />
        </single>
        <single>
          <run runner={fn} />
        </single>
        {next}
      </seq>
    )
    trigger.graphite = {seq: exec, next}
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
        <single>
          <emit fullName="[b] tested correctly" />
        </single>
        <single>
          <run runner={fn1} />
        </single>
        <single>
          <run runner={fn2} />
        </single>
        {next}
      </seq>
    )
    trigger.graphite = {seq: exec, next}
    walkNode(exec, eventCtx('[run][b]()'))
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toBeCalledWith('[run][b]()')
    expect(fn2).not.toHaveBeenCalled()
  })
})

describe('<choose /> execution cases', () => {
  it('[a] at least not dangerous', () => {
    const fnNext = jest.fn()
    const fnFoo = jest.fn()
    const fnBar = jest.fn()
    const trigger = createEvent('[choose][a]')
    const next = Next()
    const state = createStateRef('foo')
    // <single>
    //       <run runner={fnSelector} />
    //     </single>
    const selector = (
      <seq>
        <compute fn={() => 'bar'} />
        <update store={state} />
      </seq>
    )
    const caseFoo = (
      <seq>
        <compute
          fn={arg => {
            fnFoo(arg)
            return 'case foo'
          }}
        />
      </seq>
    )
    const caseBar = (
      <seq>
        <compute
          fn={arg => {
            fnBar(arg)
            return 'case bar'
          }}
        />
      </seq>
    )
    const exec = (
      <seq>
        <single>
          <emit fullName="[a] at least not dangerous" />
        </single>
        <choose
          state={state}
          selector={selector}
          cases={{foo: caseFoo, bar: caseBar}}
        />
        <single>
          <run runner={fnNext} />
        </single>
        {next}
      </seq>
    )
    trigger.graphite = {seq: exec, next}
    walkNode(exec, eventCtx('[choose][a]()'))
    expect(fnFoo).not.toHaveBeenCalled()
    expect(fnBar).toHaveBeenCalledTimes(1)
    expect(fnBar).toBeCalledWith('[choose][a]()')
    // expect(fnNext).toHaveBeenCalledTimes(1)
    // expect(fnNext).toBeCalledWith('case bar')
    expect(show(exec)).toMatchSnapshot()
    expect(exec).toMatchSnapshot()
  })
})

describe('<filter /> execution cases', () => {
  it('[a] tested correctly', () => {
    const fn = jest.fn()
    const trigger = createEvent('[filter][a]')
    const next = Next()
    const exec = (
      <seq>
        <single>
          <emit fullName="[a] tested correctly" />
        </single>
        <filter filter={fn} />
        {next}
      </seq>
    )
    trigger.graphite = {seq: exec, next}
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
        <single>
          <emit fullName="[b] tested correctly" />
        </single>
        <filter filter={fn1} />
        <single>
          <run runner={fn2} />
        </single>
        {next}
      </seq>
    )
    trigger.graphite = {seq: exec, next}
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
        <single>
          <emit fullName="[c] tested correctly" />
        </single>
        <filter filter={fn1} />
        <single>
          <run runner={fn2} />
        </single>
        {next}
      </seq>
    )
    trigger.graphite = {seq: exec, next}
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
        <single>
          <emit fullName="[d] tested correctly" />
        </single>
        <filter filter={fn1} />
        <single>
          <run runner={fn2} />
        </single>
        {next}
      </seq>
    )
    trigger.graphite = {seq: exec, next}
    walkNode(exec, eventCtx('[filter][d]()'))
    expect(fn2).not.toHaveBeenCalled()
  })
})
