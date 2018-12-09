//@flow

const {join} = require('path')
const rootDir = process.cwd()

const readPackageList = require('./readPackageList')

function publish() {
 const isNext = process.env.NEXT != null
 console.log(`Publish ${isNext ? 'next' : 'latest'} version`)
 const shell = require('shelljs')
 const packages = readPackageList()
 for (const name of packages) {
  const cwd = join(rootDir, 'npm', name)
  console.log(`publish ${name} from ${cwd}`)
  const command = `npm publish${isNext ? ' --tag=next' : ''}`
  const child = shell.exec(command, {
   cwd,
  })
  if (child.code !== 0) {
   shell.exit(1)
   return
  }
  // console.log(child.stdout)
 }
}

publish()
