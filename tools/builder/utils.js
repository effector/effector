//@flow
import {resolve, join, dirname, extname, relative} from 'path'
import * as fs from 'fs-extra'

import execa from 'execa'
import {load} from 'js-yaml'
import packageJson from '../../package.json'

export const cliArgs: {
  current: Array<string>,
  +original: $ReadOnlyArray<string>,
} = {
  current: process.argv.slice(2),
  original: process.argv.slice(2),
}

const root = process.cwd()
export function dir(...paths: $ReadOnlyArray<string>): string {
  return resolve(root, ...paths)
}

export async function outputPackageJSON(
  path: string,
  config: {[key: string]: any},
) {
  let fullPath
  if (path.endsWith('package.json')) fullPath = dir(path)
  else fullPath = dir(path, 'package.json')
  await fs.outputJSON(fullPath, config, {spaces: 2})
}

export function publishScript(name: string) {
  return async() => {
    const args = cliArgs.current.splice(0, 2)
    if (args.length < 2) return
    const command = args.shift()
    const argument = args.shift()
    if (command === 'publish') {
      if (argument === 'next') {
        const {stdout, stderr} = await execa(
          'npm',
          ['publish', '--tag', 'next'],
          {
            cwd: `${process.cwd()}/npm/${name}`,
            env: process.env,
          },
        )
        console.log(stdout)
        console.error(stderr)
      } else if (argument === 'latest') {
        const {stdout, stderr} = await execa(
          'npm',
          ['publish', '--tag', 'latest'],
          {
            cwd: `${process.cwd()}/npm/${name}`,
            env: process.env,
          },
        )
        console.log(stdout)
        console.error(stderr)
      }
    }
  }
}

export function massCopy(
  from: string,
  to: string,
  targets: Array<string | [string, string | $ReadOnlyArray<string>]>,
) {
  const jobs: [string, string][] = []
  for (const target of targets) {
    if (typeof target === 'string') {
      jobs.push([dir(from, target), dir(to, target)])
    } else {
      const [fromFile, toFile] = target
      if (typeof toFile === 'string') {
        jobs.push([dir(from, fromFile), dir(to, toFile)])
      } else {
        for (const toFileName of toFile) {
          jobs.push([dir(from, fromFile), dir(to, toFileName)])
        }
      }
    }
  }

  return Promise.all(jobs.map(([from, to]) => fs.copy(from, to)))
}

/* eslint-disable max-len */
/**
 * @example ../../src/react/createComponent.js -> node_modules/effector-react/createComponent.js
 */
export const getSourcemapPathTransform = (name: string) =>
  function sourcemapPathTransform(relativePath: string) {
    let packagePath = join('../..', packageJson.alias[name])
    if (extname(packagePath) !== '') {
      packagePath = dirname(packagePath)
    }
    return join(`node_modules/${name}`, relative(packagePath, relativePath))
  }

export async function loadYaml(url: string) {
  const text = await fs.readFile(resolve(process.cwd(), url), 'utf8')
  const object = load(text)
  return object
}
export function validateConfig(
  obj: any,
): {
  categories: Array<{name: string, description: string}>,
  packages: Array<{name: string, version: string, category: string}>,
} {
  return obj
}
