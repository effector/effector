//@flow
/* eslint-disable max-len */
import * as fs from 'fs-extra'
import {load} from 'js-yaml'
import {cliArgs} from 'Builder/utils'
import {setConfig} from 'Builder/taskList'

export default {
  beforeAll: [
    () => fs.emptyDir(`${process.cwd()}/npm`),
    async() => {
      process.env.IS_BUILD = 'true'
    },
    async() => {
      if (cliArgs.current.length < 1) return
      const argRaw = cliArgs.current[0]
      let body
      try {
        body = load(argRaw)
      } catch {
        return
      }
      if (typeof body !== 'object' || body === null) return
      cliArgs.current.splice(0, 1)
      for (const field in body) {
        //$todo
        setConfig(field, body[field])
      }
    },
  ],
}
