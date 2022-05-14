import {is, createDomain, createEffect, attach, createStore, createEvent} from 'effector'

it('should return false for common effects', () => {
  const domain = createDomain()
  const domainFx = domain.createEffect()
  const commonFx = createEffect()

  expect(is.attached(domainFx)).toBeFalsy()
  expect(is.attached(commonFx)).toBeFalsy()
})

it('should return false for another units', () => {
  const domain = createDomain()
  const $store = createStore(0)
  const event = createEvent()

  expect(is.attached(domain)).toBeFalsy()
  expect(is.attached(event)).toBeFalsy()
  expect(is.attached($store)).toBeFalsy()
})

it('should return true for really attached effects', () => {
  const $source = createStore(0)
  const fx = createEffect()
  const copyFx = attach({ effect: fx })
  const withSourceFx = attach({ source: $source, effect: fx })
  const noParentFx = attach({
    source: $source,
    async effect(_: number) {
      return 1
    }
  });

  expect(is.attached(copyFx)).toBeTruthy()
  expect(is.attached(withSourceFx)).toBeTruthy()
  expect(is.attached(noParentFx)).toBeTruthy()
})
