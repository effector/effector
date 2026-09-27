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

## Performance budget checks

`perf.test.ts` runs a small performance budget suite on the same real-device
matrix. It measures common graph update and graph creation paths and fails only
when a device is far outside the expected budget, so compatibility and
performance regressions are caught together.

Benchmarks (all values are ms per iteration):

| benchmark         | what is measured                      | budget (ms/iter) |
| ----------------- | ------------------------------------- | ---------------- |
| `storeUpdate`     | event + store update dispatch         | `0.05`           |
| `combineRecompute`| combine recompute on one store change | `0.1`            |
| `sampleStoreWatch`| sample graph update with watcher      | `0.1`            |
| `graphCreation`   | building a small effector graph       | `8`              |
| `arrayReplace`    | store of a large array replaced       | `0.05`           |

Budgets are intentionally generous (regression detection, not micro-tuning):
each benchmark runs a warm-up pass, then 7 timed rounds and compares the mean
per-iteration time against the budget.

### Environment variables

- `PERF_BUDGET_MULTIPLIER` - scales every budget (`1` by default). Use it to
  relax or tighten the whole suite without editing the table, e.g. on a noisy CI
  lane: `PERF_BUDGET_MULTIPLIER=3`.
- `PERF_CALIBRATE=1` - runs the benchmarks without asserting budgets and prints
  the measured `msPerIteration` for every device. Run it on the target device
  matrix after a hardware/emulator change, then update the budget table from the
  measured values (the budget for a device should be several times the observed
  `msPerIteration`).
