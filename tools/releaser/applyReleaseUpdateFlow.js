const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')

const {getUpdatedVersion} = require('./utils')
const releaseCandidates = require('../builder/nextVersions.json')

async function applyReleaseUpdateFlow() {
  delete require.cache[require.resolve('./update.json')]
  const update = require('./update.json')

  applyNextVersions(update)
  applyChangelogChanges(update)

  // cleanup update
  fs.outputJSONSync(path.resolve(__dirname, './update.json'), {})
}

// builder versions update
function applyNextVersions(update) {
  const updateEntries = Object.entries(update)

  const nextVersions = {...releaseCandidates}

  updateEntries.forEach(([pkgName, update]) => {
    const currentUpdateVersion = nextVersions[pkgName]
    const nextVersion = getUpdatedVersion(currentUpdateVersion, update.bump)

    nextVersions[pkgName] = nextVersion

    console.log(chalk.green(`"${pkgName}" will be bumped to "${nextVersion}"`))
  })

  fs.outputJSONSync(
    path.resolve(__dirname, '../builder/nextVersions.json'),
    nextVersions,
    {
      spaces: 2,
    },
  )
}

function applyChangelogChanges() {
  console.log('Not implemented yet!')
}

module.exports = {
  applyReleaseUpdateFlow,
}
