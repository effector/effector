import {createEffect, createDomain} from 'effector'

test("should return it's own name on effect.getType()", () => {
  expect(createEffect('foo').getType()).toBe('foo')
  expect(createEffect('foo', {name: 'bar'}).getType()).toBe('foo')
  expect(createEffect({name: 'foo'}).getType()).toBe('foo')
  expect(createEffect({handler: () => 'done!', name: 'foo'}).getType()).toBe(
    'foo',
  )
  expect(createEffect({handler: () => 'done!'}, {name: 'foo'}).getType()).toBe(
    'foo',
  )
  expect(
    createEffect(
      {handler: () => 'done!', name: 'foo'},
      {name: 'bar'},
    ).getType(),
  ).toBe('foo')
})
test('effect from domains should has full path in name', () => {
  const domain = createDomain('dom')
  const subdomain = domain.createDomain('subdom')
  expect(domain.createEffect('foo').getType()).toBe('dom/foo')
  expect(subdomain.createEffect('bar').getType()).toBe('dom/subdom/bar')
})
test('empty domain name should be skipped', () => {
  const domain = createDomain('')
  const subdomain = domain.createDomain('subdom')
  expect(domain.createEffect('foo').getType()).toBe('foo')
  expect(domain.createEffect('foo').done.getType()).toBe('done')
  expect(domain.createEffect('foo').fail.getType()).toBe('fail')
  expect(subdomain.createEffect('bar').getType()).toBe('subdom/bar')
})
describe('empty name support', () => {
  //eslint-disable-next-line max-len
  test('createEffect() should create effect with string id used as name', () => {
    expect(createEffect().getType()).not.toBe(undefined)
    expect(createEffect().getType()).not.toBe('')
  })
  test('domain.createEffect() should not fallback to domain name', () => {
    const domain = createDomain('dom')
    expect(domain.createEffect().getType()).not.toBe(undefined)
    expect(domain.createEffect().getType()).not.toBe('')
    expect(domain.createEffect().getType()).not.toBe('dom')
    expect(domain.createEffect().getType()).not.toBe('dom/')
  })
})
