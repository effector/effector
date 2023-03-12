const path = require('path')

// version management
const validBumpKinds = ['major', 'minor', 'patch']
const bumpWeights = {
  major: 2,
  minor: 1,
  patch: 0,
}

function isValidBump(bump) {
  return validBumpKinds.includes(bump)
}

function getNextBump(currentBump, nextBump) {
  if (!nextBump) {
    throw new Error(
      `Cannot bump from ${currentBump} to ${nextBump || 'nothing'}`,
    )
  }
  if (!currentBump) return nextBump
  if (currentBump === nextBump) return nextBump

  if (bumpWeights[currentBump] > bumpWeights[nextBump]) {
    return currentBump
  }

  return nextBump
}

function getUpdatedVersion(currentVersion, bump) {
  if (!isValidBump(bump)) {
    throw new Error(`Invalid bump kind: ${bump}`)
  }

  const [major, minor, patch] = currentVersion.split('.')

  if (bump === 'major') {
    return `${Number(major) + 1}.0.0`
  }

  if (bump === 'minor') {
    return `${major}.${Number(minor) + 1}.0`
  }

  if (bump === 'patch') {
    return `${major}.${minor}.${Number(patch) + 1}`
  }

  throw new Error(`Should not happen!`)
}

function readCurrentVersion(pkgName) {
  const pkg = require(`../../packages/${pkgName}/package.json`)
  return pkg.version
}

function getReleaseStatePaths() {
  const releaseStatePath = path.resolve(__dirname, './releaseState')
  const updateJsonPath = path.resolve(releaseStatePath, './update.json')
  const changelogsPath = path.resolve(releaseStatePath, './changelogs')

  return {
    releaseStatePath,
    updateJsonPath,
    changelogsPath,
  }
}

module.exports = {
  getUpdatedVersion,
  readCurrentVersion,
  isValidBump,
  getNextBump,
  getReleaseStatePaths,
}
