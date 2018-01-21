//@flow

import {EpicActor, AbstractActor} from '../actor'

test.skip('Actor smoke', () => {
  const epic = new EpicActor
  expect(epic.actorKind).toBe('Epic')
  expect(epic.emitter).toBeDefined()

  expect(AbstractActor.prototype.actorKind).not.toBeDefined()
  expect(EpicActor.prototype.actorKind).toBe('Epic')
})
