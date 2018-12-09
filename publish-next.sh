
export NEXT='true'
mkdir temp
cd temp
git clone https://github.com/zerobias/effector.git
cd effector
git checkout develop \
  && yarn \
  && yarn build \
  && yarn test \
  && node scripts/publish.js \
  && cd .. && rm -rf effector