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

The BrowserStack matrix also runs `src/compat/perf.test.ts`. It measures
high-traffic store updates, derived graph creation, and `guard`/`split` routing
on the same real-device sessions used by the compatibility checks. Each
benchmark uses warmup rounds and median timing so short BrowserStack scheduling
spikes do not fail the run.
