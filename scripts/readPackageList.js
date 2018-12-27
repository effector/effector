//@flow

const {join} = require('path')
const {readdirSync} = require('fs-extra')

const rootDir = process.cwd()

module.exports = function readPackageList() {
  return readdirSync(join(rootDir, 'packages'))
  // .filter(
  //   e => ['bs-effector', 'bs-effector-react'].includes(e) === false,
  // )
}
