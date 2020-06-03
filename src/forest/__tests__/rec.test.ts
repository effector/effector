import {BrowserObject} from 'webdriverio'
import {createStore, createEvent, combine} from 'effector'
import {using, h, spec, list, rec, remap} from 'effector-dom'

// let addGlobals: Function
declare const act: (cb?: () => any) => Promise<void>
declare const initBrowser: () => Promise<void>
declare const el: HTMLElement
// let execFun: <T>(cb: (() => Promise<T> | T) | string) => Promise<T>
// let readHTML: () => string
declare const browser: BrowserObject
declare const exec: (cb: () => any) => Promise<string[]>
declare const execFunc: <T>(cb: () => Promise<T>) => Promise<T>

beforeEach(async () => {
  await initBrowser()
}, 10e3)

test('rec visible support', async () => {
  const [s1, s2] = await exec(async () => {
    const toggleNestedRows = createEvent()
    const nestedRowsVisible = createStore(true).on(
      toggleNestedRows,
      visible => !visible,
    )
    type Item = {
      value: string
      child: Item[]
    }
    type FlatItem = {
      value: string
      child: string[]
    }
    const items = createStore([
      {
        value: 'a',
        child: [
          {
            value: 'a_a',
            child: [],
          },
          {
            value: 'a_b',
            child: [
              {
                value: 'a_b_a',
                child: [],
              },
            ],
          },
        ],
      },
      {
        value: 'b',
        child: [
          {
            value: 'b_a',
            child: [],
          },
          {
            value: 'b_b',
            child: [
              {
                value: 'b_b_a',
                child: [],
              },
            ],
          },
        ],
      },
      {
        value: 'c',
        child: [],
      },
    ])
    const flatItems = items.map(list => {
      const result = [] as FlatItem[]
      list.forEach(processValue)
      function processValue({value, child}: Item) {
        result.push({value, child: child.map(({value}) => value)})
        child.forEach(processValue)
      }
      return result
    })
    const topLevelFlatItems = flatItems.map(list =>
      list
        .filter(({value}) => value.length === 1)
        .map(item => ({item, level: 0})),
    )
    using(el, () => {
      const Row = rec<{item: FlatItem; level: number}>(({state}) => {
        const [level, item] = remap(state, ['level', 'item'] as const)
        h('div', {
          style: {marginLeft: 'var(--level, 0)'},
          styleVar: {level: level.map(value => `${value}em`)},
          text: [remap(item, 'value'), ' ', level],
          visible: combine(level, nestedRowsVisible, (level, visible) => {
            if (level === 0) return true
            return visible
          }),
        })
        const childs = combine(flatItems, item, level, (list, {child}, level) =>
          list
            .filter(({value}) => child.includes(value))
            .map(item => ({item, level: level + 1})),
        )
        list(childs, ({store}) => {
          Row({state: store})
        })
      })
      list(topLevelFlatItems, ({store}) => {
        Row({state: store})
      })
    })
    await act()
    await act(() => {
      toggleNestedRows()
    })
  })
  expect(s1).toMatchInlineSnapshot(
    `"<div style=\\"--level: 0em;\\">a 0</div><div style=\\"--level: 1em;\\">a_a 1</div><div style=\\"--level: 1em;\\">a_b 1</div><div style=\\"--level: 2em;\\">a_b_a 2</div><div style=\\"--level: 0em;\\">b 0</div><div style=\\"--level: 1em;\\">b_a 1</div><div style=\\"--level: 1em;\\">b_b 1</div><div style=\\"--level: 2em;\\">b_b_a 2</div><div style=\\"--level: 0em;\\">c 0</div>"`,
  )
  expect(s2).toMatchInlineSnapshot(
    `"<div style=\\"--level: 0em;\\">a 0</div><div style=\\"--level: 1em;\\">a_b 1</div><div style=\\"--level: 2em;\\">a_b_a 2</div><div style=\\"--level: 0em;\\">b 0</div><div style=\\"--level: 1em;\\">b_b 1</div><div style=\\"--level: 2em;\\">b_b_a 2</div><div style=\\"--level: 0em;\\">c 0</div>"`,
  )
})
