cd website

git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
echo "machine github.com login ${GITHUB_ACTOR password ${GITHUB_TOKEN}" > ~/.netrc

yarn install && GIT_USER="${GITHUB_ACTOR}" yarn run publish-gh-pages
