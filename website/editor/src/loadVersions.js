const fetch = require('cross-fetch')
const fs = require('fs-extra')
const path = require('path')

async function main() {
  const data = await fetch('https://registry.npmjs.org/effector')
  const pkg = await data.json()
  const versions = []
  const packages = await Promise.all(
    Object.keys(pkg.versions).map(v =>
      fetch(`https://unpkg.com/effector@${v}/package.json`)
        .then(d => d.json())
        .catch(() => ({})),
    ),
  )
  for (const p of packages) {
    const file =
      (p.files || []).filter(file => file === 'effector.cjs.js')[0] || ''
    if (file.includes('cjs')) {
      console.log('cjs', p.version)
      versions.push(p.version)
    } else {
      console.error('Wrong version', p.version)
    }
  }
  versions.push('master')
  await fs.outputJSON(path.join(__dirname, 'versions.json'), versions.reverse())
}

main()
