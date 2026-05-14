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

The BrowserStack suite also includes `src/compat/perf.test.ts`.
It runs lightweight performance budgets for:

- event-to-store graph updates
- store graph creation
- guard/split event routing

To keep BrowserStack variance stable, each benchmark is measured in multiple
rounds and compared by median time-per-iteration.
