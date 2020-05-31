export const raf =
  typeof requestAnimationFrame !== 'undefined'
    ? requestAnimationFrame
    : (cb: Function) => setTimeout(cb, 0)

export const cancelRaf: (id: number | NodeJS.Timeout) => void =
  typeof cancelAnimationFrame !== 'undefined'
    ? cancelAnimationFrame
    : clearTimeout
