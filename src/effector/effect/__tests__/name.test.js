//@flow

import {createEffect} from '..'
import {createDomain} from 'effector/domain'

test("should return it's own name on effect.getType()", () => {
  expect(createEffect('foo').getType()).toBe('foo')
})
test('effect from domains should has full path in name', () => {
  const domain = createDomain('dom')
  const subdomain = domain.domain('subdom')
  expect(domain.effect('foo').getType()).toBe('dom/foo')
  expect(subdomain.effect('bar').getType()).toBe('dom/subdom/bar')
})
test('empty domain name should be skipped', () => {
  const domain = createDomain('')
  const subdomain = domain.domain('subdom')
  expect(domain.effect('foo').getType()).toBe('foo')
  expect(domain.effect('foo').done.getType()).toBe('foo done')
  expect(domain.effect('foo').fail.getType()).toBe('foo fail')
  expect(subdomain.effect('bar').getType()).toBe('subdom/bar')
})
describe('empty name support', () => {
  //eslint-disable-next-line max-len
  test('createEffect() should create effect with string id used as name', () => {
    expect(createEffect().getType()).not.toBe(undefined)
    expect(createEffect().getType()).not.toBe('')
  })
  test('domain.effect() should not fallback to domain name', () => {
    const domain = createDomain('dom')
    expect(domain.effect().getType()).not.toBe(undefined)
    expect(domain.effect().getType()).not.toBe('')
    expect(domain.effect().getType()).not.toBe('dom')
    expect(domain.effect().getType()).not.toBe('dom/')
  })
})
