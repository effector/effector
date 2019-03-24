//@flow

import chalk from 'chalk'

type TaskList = Array<() => Promise<any>>

function onFinish(stats) {
  setConfig = noop
  if (Object.keys(stats.fail).length === 0) {
    console.log(
      label(chalk.bgGreen, 'DONE'),
      label(chalk.bgWhite, 'build complete'),
      chalk.greenBright('all tasks finished successfully'),
    )
    return
  }
  console.log(
    label(chalk.bgKeyword('orange'), 'WARN'),
    chalk.bold.keyword('orange')('some tasks are failed'),
  )
  for (const name in stats.fail) {
    console.log(chalk.keyword('orange')(`  - ${name}`))
  }
  process.exit(1)
}

const label = (chalk, label: string) => chalk.black(` ${label} `)

const run = ({tasks, name, stats}) =>
  tasks
    .reduce((p, task) => p.then(task), Promise.resolve())
    .then(() => {
      stats.done[name] = true
      console.log(
        label(chalk.bgGreen, 'DONE'),
        label(chalk.bgWhite, name),
        chalk.greenBright('task complete'),
      )
    })
    .catch(err => {
      stats.done[name] = false
      stats.fail[name] = err
      console.log(
        label(chalk.bgRed, 'FAIL'),
        label(chalk.bgWhite, name),
        chalk.redBright('task failed'),
      )
      console.error(err)
    })
const noop: Function = () => {}
type Config = {
  ignore: Array<string>,
  only: Array<string>,
}
export let setConfig: <Field: $Keys<Config>>(
  field: Field,
  data: $ElementType<Config, Field>,
) => void = noop

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
  const stats = {
    done: {},
    fail: {},
  }
  const config: Config = {ignore: [], only: []}
  setConfig = (field, data) => {
    config[field] = data
  }
  return run({
    tasks: hooks.beforeAll,
    name: 'beforeAll',
    stats,
  })
    .then(() => {
      console.log('running with config')
      console.dir(config)
      for (const pkg in tasks) {
        if (config.ignore.includes(pkg)) continue
        if (config.only.length > 0 && !config.only.includes(pkg)) continue
        pending.push(
          run({
            tasks: tasks[pkg],
            name: pkg,
            stats,
          }),
        )
      }
      return Promise.all(pending)
    })
    .then(() => onFinish(stats), () => onFinish(stats))
}
