import {performance} from 'perf_hooks'
import {Platform} from '../index.h'

export const platform: Platform = {
  performance,
  requestAnimationFrame: cb => setTimeout(cb, 0),
  cancelAnimationFrame: clearTimeout
}
