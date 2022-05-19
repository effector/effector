import type {BrowserObject} from 'webdriverio'
import {createEvent, createStore, restore} from 'effector'
import {h, spec, using} from 'forest'

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

it('supports setting static object class without class attr', async () => {
  const [s1] = await exec(async () => {
    using(el, () => {
      h('div', {
        text: 'content',
        classList: {example: true, another: true},
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='example another'>content</div>
      "
    `)
})

it('supports setting static object class without class attr', async () => {
  const [s1] = await exec(async () => {
    using(el, () => {
      h('div', {
        text: 'content',
        classList: ['example', 'another'],
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='example another'>content</div>
      "
    `)
})
it('supports setting static object class with class attr', async () => {
  const [s1] = await exec(async () => {
    using(el, () => {
      h('div', {
        text: 'content',
        classList: {example: true, another: true},
        attr: {class: 'foreign'},
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='foreign example another'>content</div>
      "
    `)
})
it('supports setting static object class with class attr', async () => {
  const [s1] = await exec(async () => {
    using(el, () => {
      h('div', {
        text: 'content',
        classList: ['example', 'another'],
        attr: {class: 'foreign'},
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='foreign example another'>content</div>
      "
    `)
})
it('supports setting static list of classes in a single string', async () => {
  const [s1] = await exec(async () => {
    using(el, () => {
      h('div', {
        text: 'content',
        classList: ['example another', 'first second'],
        attr: {class: 'foreign'},
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <div class='foreign example another first second'>
      content
    </div>
    "
  `)
})
it('supports setting dynamic object class', async () => {
  const [s1, s2] = await exec(async () => {
    const setClass = createEvent<boolean>()
    const $class = restore(setClass, false)
    using(el, () => {
      h('div', {
        text: 'content',
        classList: {example: $class},
        attr: {class: 'foreign'},
      })
    })
    await act()
    await act(() => {
      setClass(true)
    })
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='foreign'>content</div>
      "
    `)
  expect(s2).toMatchInlineSnapshot(`
      "
      <div class='foreign example'>content</div>
      "
    `)
})
it('supports setting dynamic array class', async () => {
  const [s1, s2] = await exec(async () => {
    const setClass = createEvent<string>()
    const $class = restore(setClass, null)
    using(el, () => {
      h('div', {
        text: 'content',
        classList: [$class],
        attr: {class: 'foreign'},
      })
    })
    await act()
    await act(() => {
      setClass('example')
    })
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='foreign'>content</div>
      "
    `)
  expect(s2).toMatchInlineSnapshot(`
      "
      <div class='foreign example'>content</div>
      "
    `)
})
it('supports setting dynamic object class without class property', async () => {
  const [s1, s2] = await exec(async () => {
    const setClass = createEvent<boolean>()
    const $class = restore(setClass, false)
    using(el, () => {
      h('div', {
        text: 'content',
        classList: {example: $class},
      })
    })
    await act()
    await act(() => {
      setClass(true)
    })
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
  expect(s2).toMatchInlineSnapshot(`
      "
      <div class='example'>content</div>
      "
    `)
})
it('supports setting dynamic array class without class property', async () => {
  const [s1, s2, s3, s4] = await exec(async () => {
    const setClass = createEvent<string | null>()
    const $class = restore(setClass, null)
    using(el, () => {
      h('div', {
        text: 'content',
        classList: [$class],
      })
    })
    await act()
    await act(() => {
      setClass('example')
    })
    await act(() => {
      setClass('another')
    })
    await act(() => {
      setClass(null)
    })
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
  expect(s2).toMatchInlineSnapshot(`
      "
      <div class='example'>content</div>
      "
    `)
  expect(s3).toMatchInlineSnapshot(`
      "
      <div class='another'>content</div>
      "
    `)
  expect(s4).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
})

it('supports merging static classList h with spec', async () => {
  const [s1] = await exec(async () => {
    using(el, () => {
      h('div', {
        text: 'content',
        classList: ['first'],
        fn() {
          spec({classList: ['second']})
        },
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='second first'>content</div>
      "
    `)
})

it('supports merging static classList h with spec of different types', async () => {
  const [s1] = await exec(async () => {
    using(el, () => {
      h('div', {
        text: 'content',
        classList: ['first'],
        fn() {
          spec({classList: ['second']})
          spec({classList: {third: true}})
        },
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='second third first'>content</div>
      "
    `)
})

it('allows to set many classes at the same property', async () => {
  const [s1] = await exec(async () => {
    using(el, () => {
      h('div', {
        text: 'content',
        classList: ['first'],
        fn() {
          spec({classList: {'second third': true}})
        },
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='second third first'>content</div>
      "
    `)
})

it('supports merging dynamic spec classList', async () => {
  const [s1, s2, s3] = await exec(async () => {
    const setClassA = createEvent<string>()
    const $classA = restore(setClassA, null)
    const setClassB = createEvent<boolean>()
    const $classB = restore(setClassB, false)
    using(el, () => {
      h('div', {
        text: 'content',
        fn() {
          spec({classList: [$classA]})
          spec({classList: {third: $classB}})
        },
      })
    })
    await act()
    await act(() => {
      setClassA('demo')
    })
    await act(() => {
      setClassB(true)
    })
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
  expect(s2).toMatchInlineSnapshot(`
      "
      <div class='demo'>content</div>
      "
    `)
  expect(s3).toMatchInlineSnapshot(`
      "
      <div class='demo third'>content</div>
      "
    `)
})

it('allows to dynamically set many classes at the one property', async () => {
  const [s1, s2, s3, s4, s5] = await exec(async () => {
    const setClassA = createEvent<string | null>()
    const $classA = restore(setClassA, null)
    const setClassB = createEvent<boolean>()
    const $classB = restore(setClassB, false)
    using(el, () => {
      h('div', {
        text: 'content',
        fn() {
          spec({classList: [$classA]})
          spec({classList: {'first second third': $classB}})
        },
      })
    })
    await act()
    await act(() => {
      setClassA('demo foo bar')
    })
    await act(() => {
      setClassB(true)
    })
    await act(() => {
      setClassA(null)
    })
    await act(() => {
      setClassB(false)
    })
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
  expect(s2).toMatchInlineSnapshot(`
      "
      <div class='demo foo bar'>content</div>
      "
    `)
  expect(s3).toMatchInlineSnapshot(`
      "
      <div class='demo foo bar first second third'>content</div>
      "
    `)
  expect(s4).toMatchInlineSnapshot(`
      "
      <div class='first second third'>content</div>
      "
    `)
  expect(s5).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
})

it('supports merging dynamic and static spec classList', async () => {
  const [s1, s2, s3, s4, s5] = await exec(async () => {
    const cleanup = createEvent()
    const setClass3 = createEvent<boolean>()
    const $class3 = restore(setClass3, false).reset(cleanup)
    const setClass4 = createEvent<string>()
    const $class4 = restore(setClass4, null).reset(cleanup)
    const setClass5 = createEvent<boolean>()
    const $class5 = restore(setClass5, false).reset(cleanup)
    using(el, () => {
      h('div', {
        text: 'content',
        attr: {class: 'first'},
        classList: {second: true, third: $class3},
        fn() {
          spec({classList: [$class4]})
          spec({classList: {fifth: $class5}})
        },
      })
    })
    await act()
    await act(() => {
      setClass3(true)
    })
    await act(() => {
      setClass4('fourth')
    })
    await act(() => {
      setClass5(true)
    })
    await act(() => {
      cleanup()
    })
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='first second'>content</div>
      "
    `)
  expect(s2).toMatchInlineSnapshot(`
      "
      <div class='first second third'>content</div>
      "
    `)
  expect(s3).toMatchInlineSnapshot(`
      "
      <div class='first second third fourth'>content</div>
      "
    `)
  expect(s4).toMatchInlineSnapshot(`
      "
      <div class='first second third fourth fifth'>content</div>
      "
    `)
  expect(s5).toMatchInlineSnapshot(`
      "
      <div class='first second'>content</div>
      "
    `)
})

it('example from proposal #599 with overriding false values', async () => {
  const [s1] = await exec(async () => {
    using(el, () => {
      h('div', {
        text: 'content',
        fn() {
          spec({attr: {class: 'zero'}})
          spec({classList: {first: true, second: false}})
          spec({classList: ['second', 'third']})
        },
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div class='zero first second third'>content</div>
      "
    `)
})

it('do not set static class if value is false', async () => {
  const [s1] = await exec(async () => {
    using(el, () => {
      h('div', {
        text: 'content',
        fn() {
          spec({classList: {first: false, second: false}})
        },
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
})

it('do not set dynamic class if value is false', async () => {
  const [s1] = await exec(async () => {
    const $class = createStore(false)
    using(el, () => {
      h('div', {
        text: 'content',
        fn() {
          spec({classList: {first: $class, second: false}})
        },
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
})
