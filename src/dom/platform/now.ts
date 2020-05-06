export let now: () => number

if (typeof performance !== 'undefined' && performance.now) {
  now = () => performance.now()
} else if (typeof process !== 'undefined' && process.hrtime) {
  now = () => {
    const hr = process.hrtime()
    return (hr[0] * 1e9 + hr[1]) / 1e6
  }
} else {
  now = () => Date.now()
}
