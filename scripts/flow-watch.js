//@flow
//$off
import {watch} from 'chokidar'
import {exec} from 'shelljs'
import {merge, fromEvent} from 'most'
import {createInterface} from 'readline'

function nextLine(text = ''): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const req = new Promise(rs =>
    rl.question(text, answer => {
      // TODO: Log the answer in a database
      console.log(answer)

      rl.close()
      rs(answer)
    }),
  )
  return req
}

//$off
import * as S from 'most-node-streams'
function clear() {
  if (process.stdout.isTTY != null) {
    process.stdout.write('\u001b[2J')
    process.stdout.write('\u001b[1;1H')
    process.stdout.write('\u001b[3J')
  }
}
const run = () => {
  const config = {async: true, silent: true}
  const runned = exec(
    command,
    config /*, (code, out, err) => {
    console.log(`Exit code %d`, code)
    // if (code > 0) console.log(err)
    // else console.log(out)
  }*/,
  )
  // console.log(runned)
  // runned.on('data', (data, ...rest) => {
  //   const toPrint = data.replace(dataBuffer, '')
  //   dataBuffer = data
  //   console.log(toPrint)
  //   console.log(rest)
  // })
  let isWait = true
  let date = Date.now()
  return merge(S.fromStream(runned.stdout), S.fromStream(runned.stderr))
    .skipRepeats()
    .map(e => {
      if (e.includes('Please wait')) {
        isWait = true
        if (Date.now() - date < 100) return ''
        date = Date.now()
        return `${e}\r`
      }
      if (e.includes(line)) {
        if (isWait) {
          isWait = false
          clear()
        }
        return `\n\n${e}`
      }
      if (e.includes('No errors')) {
        clear()
        return `\n\n${e}\n`
      }
      return e
    })
    .map(e => e.replace(/Please wait\. /g, ``))
    .filter(e => e.length > 0)
}
const line = '-------------------------------------------------'
const command = `node_modules/.bin/flow status --include-warnings --color=always`

const watcher = watch('./src', {
  persistent: true,
})
// .on('change', run)
// .on('ready', run)

merge(fromEvent('change', watcher), fromEvent('ready', watcher))
  .multicast()
  .map(run)
  .switchLatest()
  // .skipRepeatsWith((a, b) => a.localeCompare(b))
  .observe(data => {
    // const toPrint = data.replace(dataBuffer, '')
    // dataBuffer = data
    const out = data
      .replace(/-------------------------------------------------/g, '-')
      .replace(/src\//g, '')
      .replace(/\.js\:/g, ':')
    process.stdout.write(out)
    // console.log(rest)
  })
process.on('beforeExit', () => {
  watcher.close()
})
