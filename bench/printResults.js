'use strict'
//@flow

const doDiffWithFloor = {
 external: false,
 total: false,
 used: false,
 rss: true,
}

function memoryText(size) {
 return `${(size / 1000 / 1000).toFixed(1)} Mb`
}
function printResults(testResults /*: Map<string, *>*/) {
 //$off
 const prettyHrtime = require('pretty-hrtime')
 const floor = testResults.get('just mutate')
 if (!floor) return
 testResults.delete('just mutate')
 console.log(`* ${floor.name} [FLOOR]
  create: ${prettyHrtime(floor.time.prepareTime)}
  update: ${prettyHrtime(floor.time.time)}
  heap:
    total ${memoryText(floor.heapTotal)}
    used  ${memoryText(floor.heapUsed)}
  rss: ${memoryText(floor.rss)}
 `)
 for (const result of testResults.values()) {
  const total = doDiffWithFloor.total
   ? result.heapTotal - floor.heapTotal
   : result.heapTotal
  const used = doDiffWithFloor.used
   ? result.heapUsed - floor.heapUsed
   : result.heapUsed
  const rss = doDiffWithFloor.rss ? result.rss - floor.rss : result.rss
  const external = doDiffWithFloor.external
   ? result.external - floor.external
   : result.external

  console.log(`* ${result.name}
  create: ${prettyHrtime(result.time.prepareTime)}
  update: ${prettyHrtime(result.time.time)}
  heap:
    total ${memoryText(total)}
    used  ${memoryText(used)}
  rss: ${memoryText(rss)}
`)
 }
}

module.exports = {printResults}
