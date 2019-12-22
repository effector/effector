//@flow

import {createEvent, createDomain} from 'effector'

test("should return it's own name on event.getType()", () => {
  expect(createEvent('foo').getType()).toBe('foo')
  expect(createEvent({name: 'foo'}).getType()).toBe('foo')
  expect(createEvent('foo', {name: 'bar'}).getType()).toBe('foo')
  expect(createEvent(undefined, {name: 'bar'}).getType()).toBe('bar')
})
test('event from domains should has full path in name', () => {
  const domain = createDomain('dom')
  const subdomain = domain.domain('subdom')
  expect(domain.event('foo').getType()).toBe('dom/foo')
  expect(subdomain.event('bar').getType()).toBe('dom/subdom/bar')
})
test('empty domain name should be skipped', () => {
  const domain = createDomain('')
  const subdomain = domain.domain('subdom')
  expect(domain.event('foo').getType()).toBe('foo')
  expect(subdomain.event('bar').getType()).toBe('subdom/bar')
})
describe('empty name support', () => {
  test('createEvent() should create event with string id used as name', () => {
    expect(createEvent().getType()).not.toBe(undefined)
    expect(createEvent().getType()).not.toBe('')
  })
  test('domain.event() should not fallback to domain name', () => {
    const domain = createDomain('dom')
    expect(domain.event().getType()).not.toBe(undefined)
    expect(domain.event().getType()).not.toBe('')
    expect(domain.event().getType()).not.toBe('dom')
    expect(domain.event().getType()).not.toBe('dom/')
  })
})
