//@flow

import {promisify} from 'util'

export const delay = promisify(setTimeout)

/*::
//$todo
const mockFN = jest.fn()
*/
type MockFN = typeof mockFN
export const argumentHistory = (fn: MockFN) =>
  fn.mock.calls.map<any>(([arg]) => arg)
