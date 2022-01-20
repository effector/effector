import {promisify} from 'util'

export const delay = promisify(setTimeout)

export const argumentHistory = fn => fn.mock.calls.map(([arg]) => arg)
