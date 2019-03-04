#!/bin/sh

set -eu

cd website

git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"
echo "machine github.com login ${GITHUB_ACTOR} password ${GITHUB_TOKEN}" > ~/.netrc

yarn install
yarn add -D now
node try/loadVersions.js
yarn build:try
# SITE_URL=https://effector.js.org GIT_USER="${GITHUB_ACTOR}" yarn run publish-gh-pages

SITE_URL=https://effector.now.sh yarn build
cd build/effector
echo '{"name": "effector", "alias": ["effector.now.sh"], "version": 2}' > now.json
npx now --token "${NOW_TOKEN}" --force --no-clipboard
npx now --token "${NOW_TOKEN}" alias 'effector.now.sh'
