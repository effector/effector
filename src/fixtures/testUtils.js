//@flow

import {promisify} from 'util'

export const delay = promisify(setTimeout)

//eslint-disable-next-line no-unused-vars
export let spy: Function = (...args: any[]): any => {
  throw new Error('jest should replace this with spy function')
}
export let getSpyCalls: () => Array<Array<any>> = (): any => {
  throw new Error('jest should replace this with spy function')
}
beforeEach(() => {
  spy = jest.fn()
  getSpyCalls = () => spy.mock.calls
})
