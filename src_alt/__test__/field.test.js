//@flow

import {Field, Value} from '../field'
import {fooMessage} from './fixtures'

test('field smoke', () => {
  const field = new Field
  expect(field).toBeDefined()
})

test('should have .on() to subscribe', () => {
  const message = fooMessage()
  function reducer(
    state: 'bar' | 'not bar', data: {foo:'bar'}
  ): 'bar' | 'not bar' {
    return data.foo
  }
  const field: Field<'bar' | 'not bar'> = new Field
  expect(() => {
    field.on(message, reducer)
  }).not.toThrowError()
  console.log(field)
  expect(field.on(message, reducer)).toBe(field)
})
