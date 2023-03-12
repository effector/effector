const fs = require('fs-extra')
const path = require('path')

const {
  getReleaseStatePaths,
  readCurrentVersion,
  getUpdatedVersion,
} = require('./utils')

const releaseCandidatesPath = path.resolve(
  __dirname,
  `../builder/nextVersions.json`,
)

async function applyReleaseState() {
  const {updateJsonPath} = getReleaseStatePaths()

  const releaseCandidates = fs.readJSONSync(releaseCandidatesPath, 'utf-8')
  const versionsUpdate = {...releaseCandidates}
  const changelogUpdates = {}

  const update = fs.readJSONSync(updateJsonPath, 'utf-8')

  Object.entries(update).forEach(([pkgName, updateState]) => {
    const nextVersion = getNextVersion(pkgName, updateState.bump)
    versionsUpdate[pkgName] = nextVersion

    const changelog = readChangelogUpdateContent(pkgName)
    changelogUpdates[pkgName] = changelog
  })

  applyNextVersionsUpdate(versionsUpdate)
  applyChangelogUpdate(update, versionsUpdate, changelogUpdates)
}

function applyNextVersionsUpdate(versionsUpdate) {
  console.log(versionsUpdate)
  fs.outputJSONSync(releaseCandidatesPath, versionsUpdate, {spaces: 2})
}

const mainChangelogPath = path.resolve(__dirname, `../../CHANGELOG.md`)
function applyChangelogUpdate(update, versionsUpdate, changelogUpdates) {
  const mainChangelog = fs.readFileSync(mainChangelogPath, 'utf-8')
  const targetPos = mainChangelog.indexOf('##')
  let nextChangelogContent = mainChangelog

  Object.keys(update).forEach(pkgName => {
    const nextVersion = versionsUpdate[pkgName]
    const versionHeading = `## ${pkgName} ${nextVersion}`
    const idx = nextChangelogContent.indexOf(versionHeading)

    if (idx > -1) {
      const end = nextChangelogContent.indexOf('##', idx)

      nextChangelogContent = `${nextChangelogContent.slice(
        0,
        idx,
      )}${nextChangelogContent.slice(end)}`
    }

    const changelog = `${versionHeading}\n\n${changelogUpdates[
      pkgName
    ].trim()}\n\n`

    nextChangelogContent = `${nextChangelogContent.slice(
      0,
      targetPos,
    )}${changelog}${nextChangelogContent.slice(targetPos)}`
  })

  fs.writeFileSync(mainChangelogPath, nextChangelogContent, 'utf-8')
}

function getNextVersion(pkgName, bump) {
  const currentVersion = readCurrentVersion(pkgName)
  const nextVersion = getUpdatedVersion(currentVersion, bump)

  return nextVersion
}

function readChangelogUpdateContent(pkgName) {
  const {changelogsPath} = getReleaseStatePaths()
  const changelogPath = path.resolve(changelogsPath, `${pkgName}.md`)
  const changelog = fs.readFileSync(changelogPath, 'utf-8')

  return changelog
}

module.exports = {
  applyReleaseState,
}
