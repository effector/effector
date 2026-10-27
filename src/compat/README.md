# Tests on real devices

Provided by [browserstack open source support](https://www.browserstack.com/open-source) programm

Run on each commmit on [CI](https://semaphoreci.com/effector/effector/branches/master)

## Usage

```bash
yarn browserstack
```

These tests expects `.env` file with variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`

```
BROWSERSTACK_USERNAME=username
BROWSERSTACK_ACCESS_KEY=key
```

The BrowserStack suite also runs a small performance budget check on the same
device matrix. It measures common graph update and graph creation paths and
fails only when a device is far outside the expected budget, so compatibility
and performance regressions are caught together.
