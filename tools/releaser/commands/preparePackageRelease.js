const {prepareReleseFlow} = require('../prepareReleaseFlow')

async function main() {
  await prepareReleseFlow()
}

main().catch(console.error)
