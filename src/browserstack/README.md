# Tests on real devices

Provided by [browserstack open source support](https://www.browserstack.com/open-source) programm

Run on each commmit on [CI](https://semaphoreci.com/zerobias/effector/branches/master)

## Usage

```bash
yarn browserstack
```

This is an alias for running jest tests with [that](https://github.com/zerobias/effector/blob/master/src/browserstack/jest.config.js) config

```bash
npx jest --config='src/browserstack/jest.config.js' --runInBand
```


These tests expects `.env` file with variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`

```
BROWSERSTACK_USERNAME=username
BROWSERSTACK_ACCESS_KEY=key
```
