//@flow

import mock from 'jest-mock'
import expect from 'expect'
export {expect}

export const jest = {
  fn() {
    return mock.fn()
  },
}
