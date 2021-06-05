import Chalk from 'chalk'

type TaskList = Array<() => Promise<any>>
type BoolRec = Record<string, boolean>

function onFinish(stats: {done: BoolRec; fail: BoolRec}) {
  setConfig = noop
  if (Object.keys(stats.fail).length === 0) {
    console.log(
      label(Chalk.bgGreen, 'DONE'),
      label(Chalk.bgWhite, 'build complete'),
      Chalk.greenBright('all tasks finished successfully'),
    )
    return
  }
  console.log(
    label(Chalk.bgKeyword('orange'), 'WARN'),
    Chalk.bold.keyword('orange')('some tasks failed'),
  )
  for (const name in stats.fail) {
    console.log(Chalk.keyword('orange')(`  - ${name}`))
  }
  process.exit(1)
}

const label = (chalk: typeof Chalk, label: string) => chalk.black(` ${label} `)

const run = ({
  tasks,
  name,
  stats,
}: {
  name: string
  tasks: TaskList
  stats: {done: BoolRec; fail: BoolRec}
}) =>
  tasks
    .reduce((p, task) => p.then(task), Promise.resolve())
    .then(() => {
      stats.done[name] = true
      console.log(
        label(Chalk.bgGreen, 'DONE'),
        label(Chalk.bgWhite, name),
        Chalk.greenBright('task complete'),
      )
    })
    .catch(err => {
      stats.done[name] = false
      stats.fail[name] = err
      console.log(
        label(Chalk.bgRed, 'FAIL'),
        label(Chalk.bgWhite, name),
        Chalk.redBright('task failed'),
      )
      console.error(err)
    })
const noop = () => {}
type Config = {
  ignore: Array<string>
  only: Array<string>
}
export let setConfig: <Field extends keyof Config>(
  field: Field,
  data: Config[Field],
) => void = noop

export function taskList({
  tasks,
  hooks,
}: {
  tasks: {[pkg: string]: TaskList}
  hooks: {
    beforeAll: TaskList
  }
}) {
  const pending = [] as Array<Promise<void>>
  const stats: {done: BoolRec; fail: BoolRec} = {
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
    .then(
      () => onFinish(stats),
      () => onFinish(stats),
    )
}
