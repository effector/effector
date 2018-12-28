//@flow
import {
  createStore,
  createEvent,
  combine,
  createStoreObject,
  type Store,
} from '../../npm/effector/effector.es'

import {
  switchChar,
  mergeStore,
  joinRow,
  mapRow,
  propCond,
  getPixelEvent,
} from './fixtures'

export function snake() {
  const W = 60
  const H = 40
  const setProperty = createEvent<{
    x: number,
    y: number,
    prop: 'wall' | 'food' | 'snake' | 'cursor',
    value: boolean,
  }>('set property global')
  function createPixel(x, y) {
    const pixelEvent = getPixelEvent(x, y, setProperty)

    const hasWall = createStore(false)
    const hasFood = createStore(false)
    const hasSnake = createStore(false)
    const hasCursor = createStore(false)
    const setWall = propCond('wall', pixelEvent, hasWall)
    const setFood = propCond('food', pixelEvent, hasFood)
    const setSnake = propCond('snake', pixelEvent, hasSnake)
    const setCursor = propCond('cursor', pixelEvent, hasCursor)
    const baseInfo = createStoreObject({
      hasWall,
      hasFood,
      hasSnake,
      hasCursor,
    })
    const fill = baseInfo.map(switchChar)
    const fullInfo = createStoreObject({
      fill,
      baseInfo,
    }).map(mergeStore)
    return fullInfo
  }
  // const pixels = []
  const rowStores = []
  for (let y = 0; y < H; y++) {
    const row = []
    for (let x = 0; x < W; x++) {
      const pxl = createPixel(x, y)
      row.push(pxl)
      // pixels.push(pxl)
    }
    const fillRow = row.map(mapRow)
    const fillRowStore = combine(...fillRow, joinRow)
    rowStores.push(fillRowStore)
  }
  //$off
  const fullTextStore: Store<string> = createStoreObject(rowStores).map(list =>
    list.join(`\n`),
  )
  let upd = 0
  fullTextStore.watch(e => {
    // console.count('upd')
    upd += 1
  })
  const filler = textRaw => {
    const text = textRaw.trim().split(`\n`)
    const map = {
      '#': 'wall',
      '*': 'snake',
      '@': 'food',
    }
    console.log(text)
    console.profile('full screen update')
    for (let y = 0, row, prop; y < H; y++) {
      row = text[(y / 10) | 0]
      for (let x = 0, ch; x < W; x++) {
        ch = row[(x / 10) | 0]
        if (ch in map) setProperty({x, y, prop: map[ch], value: true})
      }
    }
    console.profileEnd('full screen update')
    console.log('upds %d', upd)
  }
  filler(`
######
#  @ #
# ***#
######
`)
  console.log(fullTextStore.getState())
  return fullTextStore
}
