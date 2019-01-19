//@flow
//@jsx fx
//eslint-disable-next-line no-unused-vars
import fx from 'effector/stdlib/fx'
import {show} from 'effector/fixtures/showstep'
import {Ctx} from 'effector/graphite/typedef'
import {createStateRef} from 'effector/stdlib/stateref'

import {createEvent, forward} from 'effector/event'
import {walkNode} from '../walk'

function eventCtx(payload) {
  return Ctx.emit({
    __stepArg: payload,
  })
}
const Next = () => (
  <multi>
    <run
      runner={(...args) => {
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
          filter={() => {
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
    e2.graphite = {seq: exec, next}
    walkNode(e2.graphite.seq, eventCtx('e2()'))
  })
  it('throw in a multi node', () => {
    const next = Next()
    const exec = (
      <seq>
        <emit fullName="emit before filter node will throw" />
        <multi>
          <filter
            filter={() => {
              throw new Error('[expected error]')
            }}
          />
          <emit fullName="emit after filter node did throw" />
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
      <emit fullName="emit before multi" />
      <multi />
      <seq />
      <multi>
        <emit fullName="emit after multi" />
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
        <emit fullName="[a] tested correctly" />
        <run runner={fn} />
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
        <emit fullName="[b] tested correctly" />
        <run runner={fn1} />
        <run runner={fn2} />
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
describe.only('<loop/> execution cases', () => {
  const VAL = 'current'
  function values(val) {
    const result = {}
    for (const key in val) {
      result[key] = val[key][VAL]
    }
    return result
  }
  function using(name, reset: any) {
    if (typeof reset === 'undefined') return {name}
    return {name, reset}
  }
  it('[a] should throw error after loop timeout', () => {
    const runner = createEvent('loop runner')
    forward({
      from: runner,
      to: {
        graphite: {
          seq: (
            <loop
              iterator={<multi />}
              branch={<run runner={() => {}} />}
              source={createStateRef(['a'])}
              until={using('until', true)}
              selector={using('select', 0)}
              item={using('item', 'initial item')}
            />
          ),
        },
      },
    })
    expect(() => runner('x')).toThrowError('infinite loop protection')
  })
  it('[b] at least not dangerous', () => {
    //   {
    //   branch: Fun,
    //   iterator: Fun,
    //   source: StateRef,
    //   until: Using,
    //   selector: Using,
    //   item: Using,
    // }
    const fnItem = jest.fn()

    const state = createStateRef(['a', 'b', 'c'])

    const iterator = (
      <seq>
        <compute fn={(arg, val) => val.counter[VAL] + 1} />
        <update val="counter" />
        <update val="select" />
        <compute fn={(arg, val) => val.counter[VAL] < val.max[VAL]} />
        <update val="until" />
      </seq>
    )
    const branch = (
      <seq>
        <compute
          fn={(arg, val) => {
            console.log('compute branch', arg, values(val))
            return val.item[VAL]
          }}
        />
        <run
          runner={e => {
            console.log('run branch', e)
            fnItem(e)
          }}
        />
      </seq>
    )
    const exec = (
      <seq>
        <compute fn={() => state[VAL].length} />
        <update val="max" />
        <compute fn={() => 0} />
        <update val="counter" />
        <loop
          iterator={iterator}
          branch={branch}
          source={state}
          until={using('until', true)}
          selector={using('select', 0)}
          item={using('item', 'initial item')}
        />
      </seq>
    )
    const runner = createEvent('loop runner')
    forward({
      from: runner,
      to: {
        graphite: {
          seq: exec,
        },
      },
    })
    runner('x')
    expect(fnItem.mock.calls).toEqual([['a'], ['b'], ['c']])
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
        <emit fullName="[a] at least not dangerous" />
        <choose
          state={state}
          selector={selector}
          cases={{foo: caseFoo, bar: caseBar}}
        />
        <run runner={fnNext} />
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
        <emit fullName="[a] tested correctly" />
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
        <emit fullName="[b] tested correctly" />
        <filter filter={fn1} />
        <run runner={fn2} />
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
        <emit fullName="[c] tested correctly" />
        <filter filter={fn1} />
        <run runner={fn2} />
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
        <emit fullName="[d] tested correctly" />
        <filter filter={fn1} />
        <run runner={fn2} />
        {next}
      </seq>
    )
    trigger.graphite = {seq: exec, next}
    walkNode(exec, eventCtx('[filter][d]()'))
    expect(fn2).not.toHaveBeenCalled()
  })
})
