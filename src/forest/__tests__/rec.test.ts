import {BrowserObject} from 'webdriverio'
import {createStore, createEvent, combine} from 'effector'
import {using, h, spec, text, list, rec, remap} from 'forest'
import {Leaf} from '../index.h'

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

test.skip('rec visible support', async () => {
  const [s1, s2] = await exec(async () => {
    const toggleNestedRows = createEvent()
    const nestedRowsVisible = createStore(true).on(
      toggleNestedRows,
      visible => !visible,
    )
    //@ts-ignore
    nestedRowsVisible.graphite.meta.trace = true
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
    let rootLeaf: Leaf
    //@ts-ignore
    using(el, {
      fn() {
        const Row = rec<{item: FlatItem; level: number}>(({state}) => {
          const [level, item] = remap(state, ['level', 'item'] as const)
          const visible = combine(
            level,
            nestedRowsVisible,
            (level, visible) => {
              if (level === 0) return true
              return visible
            },
          )
          visible.updates.watch(e => {
            console.log('visible update', e)
          })
          //@ts-ignore
          visible.graphite.meta.trace = true
          h('div', {
            style: {marginLeft: 'var(--level, 0)'},
            styleVar: {level: level.map(value => `${value}em`)},
            // visible,
            fn() {
              text`${remap(item, 'value')} ${level} ${visible.map(
                vis => (vis ? 'visible' : 'hidden') as string,
              )}`
            },
          })
          const childs = combine(
            flatItems,
            state,
            (list, {item: {child}, level}) =>
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
      },
      onRoot({leaf}: {leaf: Leaf}) {
        rootLeaf = leaf
      },
    })
    await act()
    //@ts-ignore
    // printLeaf(rootLeaf)
    await act(() => {
      toggleNestedRows()
    })
    //@ts-ignore
    // printLeaf(rootLeaf)
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <div style='--level: 0em;'>a 0 visible</div>
    <div style='--level: 1em;'>a_a 1 visible</div>
    <div style='--level: 1em;'>a_b 1 visible</div>
    <div style='--level: 2em;'>a_b_a 2 visible</div>
    <div style='--level: 0em;'>b 0 visible</div>
    <div style='--level: 1em;'>b_a 1 visible</div>
    <div style='--level: 1em;'>b_b 1 visible</div>
    <div style='--level: 2em;'>b_b_a 2 visible</div>
    <div style='--level: 0em;'>c 0 visible</div>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <div style='--level: 0em;'>a 0 visible</div>
    <div style='--level: 1em;'>a_a 1 hidden</div>
    <div style='--level: 1em;'>a_b 1 visible</div>
    <div style='--level: 2em;'>a_b_a 2 visible</div>
    <div style='--level: 0em;'>b 0 visible</div>
    <div style='--level: 1em;'>b_a 1 hidden</div>
    <div style='--level: 1em;'>b_b 1 visible</div>
    <div style='--level: 2em;'>b_b_a 2 visible</div>
    <div style='--level: 0em;'>c 0 visible</div>
    "
  `)
})

test.skip('rec style update support', async () => {
  const [s1, s2] = await exec(async () => {
    const toggleNestedRows = createEvent()
    const nestedRowsVisible = createStore(true).on(
      toggleNestedRows,
      visible => !visible,
    )
    //@ts-ignore
    nestedRowsVisible.graphite.meta.trace = true
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
    let rootLeaf: Leaf
    //@ts-ignore
    using(el, {
      fn() {
        const Row = rec<{item: FlatItem; level: number}>(({state}) => {
          const [level, item] = remap(state, ['level', 'item'] as const)
          const visible = combine(
            level,
            nestedRowsVisible,
            (level, visible): string => {
              if (level === 0) return 'yes'
              return visible ? 'yes' : 'no'
            },
          )
          visible.updates.watch(e => {
            console.log('visible update', e)
          })
          //@ts-ignore
          visible.graphite.meta.trace = true
          h('div', {
            style: {marginLeft: 'var(--level, 0)'},
            styleVar: {level: level.map(value => `${value}em`)},
            data: {visible},
            fn() {
              text`${remap(item, 'value')} ${level} ${visible.map(
                vis => (vis === 'yes' ? 'visible' : 'hidden') as string,
              )}`
            },
          })
          const childs = combine(
            flatItems,
            state,
            (list, {item: {child}, level}) =>
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
      },
      onRoot({leaf}: {leaf: Leaf}) {
        rootLeaf = leaf
      },
    })
    await act()
    //@ts-ignore
    // printLeaf(rootLeaf)
    await act(() => {
      toggleNestedRows()
    })
    //@ts-ignore
    // printLeaf(rootLeaf)
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <div data-visible='yes' style='--level: 0em;'>
      a 0 visible
    </div>
    <div data-visible='yes' style='--level: 1em;'>
      a_a 1 visible
    </div>
    <div data-visible='yes' style='--level: 1em;'>
      a_b 1 visible
    </div>
    <div data-visible='yes' style='--level: 2em;'>
      a_b_a 2 visible
    </div>
    <div data-visible='yes' style='--level: 0em;'>
      b 0 visible
    </div>
    <div data-visible='yes' style='--level: 1em;'>
      b_a 1 visible
    </div>
    <div data-visible='yes' style='--level: 1em;'>
      b_b 1 visible
    </div>
    <div data-visible='yes' style='--level: 2em;'>
      b_b_a 2 visible
    </div>
    <div data-visible='yes' style='--level: 0em;'>
      c 0 visible
    </div>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <div data-visible='yes' style='--level: 0em;'>
      a 0 visible
    </div>
    <div data-visible='no' style='--level: 1em;'>
      a_a 1 hidden
    </div>
    <div data-visible='yes' style='--level: 1em;'>
      a_b 1 visible
    </div>
    <div data-visible='yes' style='--level: 2em;'>
      a_b_a 2 visible
    </div>
    <div data-visible='yes' style='--level: 0em;'>
      b 0 visible
    </div>
    <div data-visible='no' style='--level: 1em;'>
      b_a 1 hidden
    </div>
    <div data-visible='yes' style='--level: 1em;'>
      b_b 1 visible
    </div>
    <div data-visible='yes' style='--level: 2em;'>
      b_b_a 2 visible
    </div>
    <div data-visible='yes' style='--level: 0em;'>
      c 0 visible
    </div>
    "
  `)
})

function printLeaf(leaf: Leaf) {
  const rows = [] as string[]
  parse(leaf, {level: 0})
  function parse(leaf: Leaf, {level}: {level: number}) {
    const {data} = leaf
    const tab = ' '.repeat(level * 2)
    rows.push(`${tab}id: ${leaf.spawn.fullID}`)
    rows.push(`${tab}type: ${data.type}`)
    switch (data.type) {
      case 'using': {
        break
      }
      case 'element': {
        const {parent, value} = data.block
        rows.push(`${tab}index: ${parent.index}`)
        rows.push(`${tab}text: ${value.textContent}`)
        break
      }
      case 'list': {
        break
      }
      case 'list item': {
        break
      }
      case 'route': {
        break
      }
      case 'rec item': {
        break
      }
      case 'rec': {
        break
      }
    }
    let hasChilds = false
    iterateChildLeafs(leaf, child => {
      parse(child, {level: level + 1})
      rows.push(`${tab}  --`)
      hasChilds = true
    })
    if (hasChilds) {
      rows.pop()
    }
  }
  console.log(rows.join(`\n`))
  function iterateChildLeafs(leaf: Leaf, cb: (child: Leaf) => void) {
    const {spawn: page} = leaf
    for (const key in page.childSpawns) {
      const childs = page.childSpawns[key]
      for (let i = 0; i < childs.length; i++) {
        const childSpawn = childs[i]
        //@ts-ignore
        cb(childSpawn.leaf)
      }
    }
  }
}
