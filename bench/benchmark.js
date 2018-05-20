'use strict'
//@flow
const delay = require('util').promisify(setTimeout)

const testResults = new Map()
const tests = []
const beforeTests = []
const afterTests = []

function run(desc, fn) {
 const startTime = process.hrtime()
 const before = process.memoryUsage()
 let prepareTime, prepareStart
 fn(() => {
  prepareTime = process.hrtime(startTime)
  prepareStart = process.hrtime()
 })

 const time = process.hrtime(prepareStart)
 const after = process.memoryUsage()
 const result = {
  name: desc,
  rss: after.rss - before.rss,
  heapTotal: after.heapTotal - before.heapTotal,
  heapUsed: after.heapUsed - before.heapUsed,
  external: after.external - before.external,
  time: {
   prepareTime,
   time,
  },
 }
 testResults.set(desc, result)
}
function test(desc /*: string*/, fn /*: (prepared: () => void) => any*/) {
 tests.push({desc, fn})
 if (pending) return
 begin()
}

function beforeAll(fn /*: () => any*/) {
 beforeTests.push(fn)
}

function afterAll(fn /*: (testResults: Map<string, *>) => any*/) {
 afterTests.push(fn)
}

let pending = false
async function begin() {
 pending = true
 await delay(100)
 for (const fn of beforeTests) {
  fn()
 }
 while (tests.length) {
  const {desc, fn} = tests.shift()
  global.gc(true)
  await delay(100)
  run(desc, fn)
 }
 for (const fn of afterTests) {
  fn(testResults)
 }
}

module.exports = {
 test,
 beforeAll,
 afterAll,
}
