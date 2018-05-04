
rm -f npm/effector/index.d.ts
cp index.d.ts npm/effector/index.d.ts
rm -f npm/react/index.d.ts
cp react.d.ts npm/react/index.d.ts
rm -f npm/effector/CHANGELOG.md
cp CHANGELOG.md npm/effector/CHANGELOG.md
rm -f npm/effector/README.md
cp README.md npm/effector/README.md

rm -f npm/effector/index.js.flow
cp index.js.flow npm/effector/index.js.flow

rm -f npm/effector/effector.es.js.flow
cp index.js.flow npm/effector/effector.es.js.flow

rm -f npm/effector/effector.cjs.js.flow
cp index.js.flow npm/effector/effector.cjs.js.flow

rm -f npm/react/index.js.flow
cp react.js.flow npm/react/index.js.flow

rm -f npm/react/effector-react.es.js.flow
cp react.js.flow npm/react/effector-react.es.js.flow

rm -f npm/react/effector-react.cjs.js.flow
cp react.js.flow npm/react/effector-react.cjs.js.flow

# rm -rf npm/types
# cp -ri types npm

node scripts/write-package.js
