#!/bin/sh

set -eu

cd website

git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"
echo "machine github.com login ${GITHUB_ACTOR} password ${GITHUB_TOKEN}" > ~/.netrc

yarn install
yarn add -D now
yarn build:try
yarn build
# GIT_USER="${GITHUB_ACTOR}" yarn run publish-gh-pages
cd build/effector
echo '{"name": "effector", "alias": ["effector.now.sh"], "version": 2}' > now.json
npx now --token "${NOW_TOKEN}"
