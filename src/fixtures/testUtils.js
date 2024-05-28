import {promisify} from 'util'

export const delay = promisify(setTimeout)

export const argumentHistory = fn => fn.mock.calls.map(([arg]) => arg)

export const muteErrors = wordsRaw => {
  const words = Array.isArray(wordsRaw) ? wordsRaw : [wordsRaw]
  const consoleError = console.error
  beforeAll(() => {
    console.error = (message, ...args) => {
      if (words.some(word => String(message).includes(word))) return
      consoleError(message, ...args)
    }
  })

  afterAll(() => {
    console.error = consoleError
  })
}
