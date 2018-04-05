
rm -f npm/index.d.ts
cp index.d.ts npm/index.d.ts
rm -f npm/CHANGELOG.md
cp CHANGELOG.md npm/CHANGELOG.md
rm -f npm/README.md
cp README.md npm/README.md

rm -f npm/index.js.flow
cp index.js.flow npm/index.js.flow

rm -f npm/effector.es.js.flow
cp index.js.flow npm/effector.es.js.flow

rm -f npm/effector.cjs.js.flow
cp index.js.flow npm/effector.cjs.js.flow
