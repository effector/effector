const {prepareReleseFlow} = require('../prepareReleaseFlow')
const {applyReleaseUpdateFlow} = require('../applyReleaseUpdateFlow')

async function main() {
  await prepareReleseFlow()
  await applyReleaseUpdateFlow()
}

main().catch(console.error)
