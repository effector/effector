//@flow
import {resolve, join, relative} from 'path'
import * as fs from 'fs-extra'

import execa from 'execa'

export const cliArgs: {
  current: string[],
  original: string[],
} = {
  current: process.argv.slice(2),
  original: process.argv.slice(2),
}

const root = process.cwd()
export function dir(...paths: string[]) {
  return resolve(root, ...paths)
}

export async function outputPackageJSON(
  path: string,
  config: {[key: string]: any, ...},
) {
  let fullPath
  if (path.endsWith('package.json')) fullPath = dir(path)
  else fullPath = dir(path, 'package.json')
  await fs.outputJSON(fullPath, config, {spaces: 2})
}

export function booleanEnv(
  value: string | boolean | null | void,
  defaults: boolean,
): boolean {
  switch (value) {
    case 'no':
    case 'false':
    case false:
      return false
    case 'yes':
    case 'true':
    case true:
      return true
    case null:
    case undefined:
    default:
      return defaults
  }
}

export function publishScript(name: string) {
  const onCatch = error => {
    if (booleanEnv(process.env.PRINT_ERRORS, false)) {
      console.error(error)
    }
  }
  return async () => {
    const args = [...cliArgs.original]
    if (args.length < 2) return
    const command = args.shift()
    const argument = args.shift()
    if (command === 'publish') {
      if (argument === 'next') {
        try {
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
        } catch (error) {
          onCatch(error)
        }
      } else if (argument === 'latest') {
        try {
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
        } catch (error) {
          onCatch(error)
        }
      }
    }
  }
}

export function massCopy(
  from: string,
  to: string,
  targets: Array<string | [string, string | string[]]>,
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
 * @example ../../src/react/createComponent.js -> effector-react/createComponent.js
 */
export function getSourcemapPathTransform(name: string) {
  const nameWithoutSuffix = name
    .replace('effector-', '')
    .replace('@effector/', '')
  const packageRoot = join('../..', 'src', nameWithoutSuffix)

  return (relativePath: string) =>
    `${name}/${relative(packageRoot, relativePath)}`
}
