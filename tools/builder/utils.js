//@flow
import {resolve, join, dirname, extname, relative} from 'path'
import * as fs from 'fs-extra'
import packageJson from '../../package.json'

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
export type TaskList = Array<() => Promise<any>>
export function taskList({
  tasks,
  hooks,
}: {
  tasks: {[pkg: string]: TaskList},
  hooks: {
    beforeAll: TaskList,
  },
}) {
  const pending = []
  const run = tasks =>
    tasks.reduce((p, task) => p.then(task), Promise.resolve())

  return run(hooks.beforeAll).then(() => {
    for (const pkg in tasks) {
      if (pkg === 'beforeAll') continue
      pending.push(run(tasks[pkg]))
    }
    return Promise.all(pending)
  })
}

//eslint-disable-next-line max-len
/**@example ../../src/react/createComponent.js -> node_modules/effector-react/createComponent.js*/
export const getSourcemapPathTransform = (name: string) =>
  function sourcemapPathTransform(relativePath: string) {
    let packagePath = join('../..', packageJson.alias[name])
    if (extname(packagePath) !== '') {
      packagePath = dirname(packagePath)
    }
    return join(`node_modules/${name}`, relative(packagePath, relativePath))
  }
