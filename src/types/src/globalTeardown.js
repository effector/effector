const {resolve} = require('path')
const {remove} = require('fs-extra')

const REMOVE_REPORT = true
const REMOVE_FIXTURES = true

module.exports = async() => {
  const fixtures = resolve(__dirname, '..', '__fixtures__')
  const reportDir = resolve(__dirname, '..', '.reports')
  const reqs = []
  if (REMOVE_REPORT) {
    reqs.push(remove(reportDir))
  }
  if (REMOVE_FIXTURES) {
    reqs.push(
      remove(resolve(fixtures, '.flow')),
      remove(resolve(fixtures, '.typescript')),
    )
  }
  await Promise.all(reqs)
}
