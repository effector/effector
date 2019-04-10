//@flow

import {createDomain} from '..'

test("should return it's own name on domain.getType()", () => {
  expect(createDomain('foo').getType()).toBe('foo')
})
test('subdomains should has full path in name', () => {
  const domain = createDomain('dom')
  const subdomain = domain.domain('subdom')
  expect(domain.domain('foo').getType()).toBe('dom/foo')
  expect(subdomain.domain('bar').getType()).toBe('dom/subdom/bar')
})
test('empty domain name should be skipped', () => {
  const domain = createDomain('')
  const subdomain = domain.domain('subdom')
  expect(domain.domain('foo').getType()).toBe('foo')
  expect(subdomain.domain('bar').getType()).toBe('subdom/bar')
})
describe('empty name support', () => {
  test(
    'createDomain() should' + ' create domain with empty string used as name',
    () => {
      //eslint-disable-next-line max-len
      expect(createDomain().getType()).toBeDefined()
      expect(createDomain().getType()).toBe('')
    },
  )
  test('domain.domain() should fallback to parent domain name', () => {
    const domain = createDomain('dom')
    expect(domain.domain().getType()).toBeDefined()
    expect(domain.domain().getType()).not.toBe('')
    expect(domain.domain().getType()).toBe('dom')
    expect(domain.effect().getType()).not.toBe('dom/')
  })
})
