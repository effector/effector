//@flow
//@jsx fx
import fx from 'effector/stdlib/fx'
import {Ctx} from 'effector/graphite/typedef'

import {createEvent} from 'effector/event'
import {walkEvent, walkNode} from '../walk'

function eventCtx(payload, event) {
  return Ctx.emit({
    eventName: event.getType(),
    payload,
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
          <emit subtype="event" fullName="emit before filter node will throw" />
        </single>
        <single>
          <filter
            filter={(...args) => {
              throw new Error('[expected error]')
            }}
          />
        </single>
        <multi>
          <single>
            <emit subtype="event" fullName="emit after filter node did throw" />
          </single>
        </multi>
        {next}
      </seq>
    )
    const e2 = createEvent('e2')
    e2.graphite = {seq: exec, next}
    walkNode(e2.graphite.seq, eventCtx('e2()', e2))
  })
  it('throw in a multi node', () => {
    const next = Next()
    const exec = (
      <seq>
        <single>
          <emit subtype="event" fullName="emit before filter node will throw" />
        </single>
        <multi>
          <single>
            <filter
              filter={(...args) => {
                throw new Error('[expected error]')
              }}
            />
          </single>
          <single>
            <emit subtype="event" fullName="emit after filter node did throw" />
          </single>
        </multi>
        {next}
      </seq>
    )
    const e3 = createEvent('e3')
    e3.graphite = {seq: exec, next}
    walkNode(e3.graphite.seq, eventCtx('e3()', e3))
  })
})
test('walk after multi', () => {
  const e1 = createEvent('e1')
  const next = Next()
  const exec = (
    <seq>
      <single>
        <emit subtype="event" fullName="emit before multi" />
      </single>
      <multi />
      <seq />
      <multi>
        <single>
          <emit subtype="event" fullName="emit after multi" />
        </single>
      </multi>
      {next}
    </seq>
  )
  e1.graphite = {seq: exec, next}
  console.log(exec)
  const ctx = eventCtx('e1()', e1)
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
          <emit subtype="event" fullName="[a] tested correctly" />
        </single>
        <single>
          <run runner={fn} />
        </single>
        {next}
      </seq>
    )
    trigger.graphite = {seq: exec, next}
    walkNode(exec, eventCtx('[run][a]()', trigger))
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn.mock.calls).toEqual([['[run][a]()']])
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
          <emit subtype="event" fullName="[b] tested correctly" />
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
    walkNode(exec, eventCtx('[run][b]()', trigger))
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1.mock.calls).toEqual([['[run][b]()']])
    expect(fn2).not.toHaveBeenCalled()
  })
})
