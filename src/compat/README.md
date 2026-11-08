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


## Performance checks

The BrowserStack suite also runs `perf.test.ts` on the same real-device matrix. Each Effector workload is paired with a comparable plain-JavaScript control workload in the same browser session, and the gate uses the median workload/control ratio over five rounds. This avoids treating one absolute millisecond threshold as equivalent across IE 11, Safari, and a real iPhone.

The control workload increases its iteration count until it takes at least 4 ms (up to a bounded cap), then round order alternates to reduce timer and ordering bias. The suite covers event-to-store propagation, combine recomputation, and array-store replacement. It also checks final state and update counts so repeated same-reference updates cannot masquerade as fast work.

Each run prints one `[compat/perf]` JSON record containing the device, iteration counts, control/workload medians, ratios, and budgets. Set `PERF_RATIO_MULTIPLIER` to a positive number to scale all ratio budgets without editing source; the default is `1`.
