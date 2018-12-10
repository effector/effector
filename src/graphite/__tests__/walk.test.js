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
