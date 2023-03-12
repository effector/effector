const {prompt} = require('enquirer')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const releaseCandidates = require('../builder/nextVersions.json')
const {isValidBump, getNextBump, getReleaseStatePaths} = require('./utils')

const packages = Object.keys(releaseCandidates)

async function prepareReleseFlow() {
  const {pkgName} = await prompt({
    type: 'select',
    name: 'pkgName',
    message: 'Which package was updated?',
    choices: packages,
  })

  console.log(chalk.green(`Package to update: "${pkgName}"`))
  const update = createPackageUpdate(pkgName)

  const {bumpKind} = await prompt({
    type: 'select',
    name: 'bumpKind',
    message: 'What kind of bump do you want to do?',
    choices: ['major', 'minor', 'patch'],
  })

  const nextBump = update.bump(bumpKind)

  console.log(chalk.green(`"${pkgName}" will be bumped by "${nextBump}"`))

  const {changelogMessage} = await prompt({
    type: 'input',
    name: 'changelogMessage',
    message: 'What is the changelog message?',
  })

  update.changelog(changelogMessage)

  update.save()

  console.log(chalk.green(`Update saved!`))
}

// update state management
function createPackageUpdate(pkgName) {
  const {releaseStatePath, updateJsonPath, changelogsPath} =
    getReleaseStatePaths()
  const updateJson = fs.readJsonSync(updateJsonPath, 'utf-8')
  const currentUpdateState = updateJson[pkgName] || {}

  /**
   * @type {{package: string; bump: "major" | "minor" | "patch"; changelog: string}}
   */
  const state = {
    package: pkgName,
    bump: currentUpdateState.bump,
    changelog: '',
  }
  function bump(bumpKind) {
    if (!isValidBump(bumpKind)) {
      throw new Error(`Invalid bump kind: ${bumpKind}`)
    }

    state.bump = getNextBump(state.bump, bumpKind)

    return state.bump
  }
  function changelog(message) {
    state.changelog = message
  }
  function save() {
    const nextUpdate = {
      ...updateJson,
      [state.package]: {
        bump: state.bump,
      },
    }

    fs.ensureDirSync(releaseStatePath)

    fs.outputJSONSync(updateJsonPath, nextUpdate, {spaces: 2})

    fs.ensureDirSync(changelogsPath)

    const pkgChangelogPath = path.resolve(
      changelogsPath,
      `./${state.package}.md`,
    )
    const hasChangelog = fs.existsSync(pkgChangelogPath)

    if (hasChangelog) {
      const changelog = fs.readFileSync(pkgChangelogPath, 'utf-8')
      fs.outputFileSync(
        pkgChangelogPath,
        `${changelog}\n${state.changelog || ''}`,
      )
    } else {
      fs.outputFileSync(pkgChangelogPath, state.changelog || '')
    }
  }

  return {
    bump,
    changelog,
    save,
  }
}

module.exports = {
  prepareReleseFlow,
}
