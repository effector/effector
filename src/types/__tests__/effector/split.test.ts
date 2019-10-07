// @flow
/* eslint-disable no-unused-vars */
import {createEvent, Event, split} from 'effector'
import setupLocation from '../../setupLocation'
const typecheck = '{global}'

it('should infer type by given predicate', () => {
  const event: Event<number | string> = createEvent()
  const {onlyNumbers} = split(event, {
    onlyNumbers: (value): value is number => typeof value === 'number',
  })
  const shouldBeOk: Event<number> = onlyNumbers
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors
    "
  `)
})
