//@flow
/* eslint-disable max-len */
import * as fs from 'fs-extra'
import {load} from 'js-yaml'
import {validateConfig, loadYaml, cliArgs} from 'Builder/utils'
import {setConfig} from 'Builder/taskList'
import table from 'markdown-table'

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
    async() => {
      const configRaw = await loadYaml('packages.yml')
      const config = validateConfig(configRaw)
      const packagesByCategory = new Map()
      for (const pkg of config.packages) {
        if (!packagesByCategory.has(pkg.category)) {
          packagesByCategory.set(pkg.category, [pkg])
        } else {
          packagesByCategory.set(pkg.category, [
            //$todo
            ...packagesByCategory.get(pkg.category),
            pkg,
          ])
        }
      }

      const npmVersionBadge = name =>
        `[![npm](https://img.shields.io/npm/v/${name}.svg?maxAge=3600)](https://www.npmjs.com/package/${name})`
      const npmDepsBadge = name =>
        `[![Dependency Status](https://david-dm.org/zerobias/effector.svg?path=packages/${name})](https://david-dm.org/zerobias/effector?path=packages/${name})`
      const markdown = `
# Monorepo
${config.categories
    .map(({name, description}) => {
      const mdHeader = `### ${description}`
      const data = packagesByCategory.get(name) || []
      const rawTable = [
        ['Package', 'Version', 'Dependencies'],
        ...data.map(pkg => [
          `[\`${pkg.name}\`](${pkg.name})`,
          npmVersionBadge(pkg.name),
          npmDepsBadge(pkg.name),
        ]),
      ]
      const mdTable = table(rawTable, {align: 'c'})
      return `

${mdHeader}

${mdTable}
`
    })
    .join('\n')}
`
      await fs.outputFile('./packages/README.md', markdown)
    },
  ],
}
