#!/bin/sh

set -eu

cd website

git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"
echo "machine github.com login ${GITHUB_ACTOR} password ${GITHUB_TOKEN}" > ~/.netrc

yarn install && GIT_USER="${GITHUB_ACTOR}" yarn run publish-gh-pages
