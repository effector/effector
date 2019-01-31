//@flow

describe('perf', () => {
  let effector /*:: = require('effector') */

  let root
  let activeMeasure
  let knownMarks
  let knownMeasures
  let comments

  function resetFlamechart() {
    root = {
      children: [],
      indent: -1,
      markName: null,
      label: null,
      parent: null,
      toString() {
        return this.children.map(c => c.toString()).join('\n')
      },
    }
    activeMeasure = root
    knownMarks = new Set()
    knownMeasures = new Set()
    comments = []
  }

  function addComment(comment) {
    comments.push(comment)
  }

  function getFlameChart() {
    // Make sure we unwind the measurement stack every time.
    // TODO
    expect(activeMeasure.indent).toBe(-1)
    expect(activeMeasure).toBe(root)
    // We should always clean them up because browsers
    // buffer user timing measurements forever.
    expect(knownMarks.size).toBe(0)
    expect(knownMeasures.size).toBe(0)
    return root.toString()
  }

  function createUserTimingPolyfill() {
    return {
      mark(markName) {
        const measure = {
          children: [],
          indent: activeMeasure.indent + 1,
          markName,
          // Will be assigned on measure() call:
          label: null,
          parent: activeMeasure,
          comments,
          toString() {
            return (
              [
                ...this.comments.map(c => '  '.repeat(this.indent) + '// ' + c),
                '  '.repeat(this.indent) + String(this.label),
                ...this.children.map(c => c.toString()),
              ].join('\n') +
              // Extra newline after each root reconciliation
              (this.indent === 0 ? '\n' : '')
            )
          },
        }
        comments = []
        // Step one level deeper
        activeMeasure.children.push(measure)
        activeMeasure = measure
        knownMarks.add(markName)
      },
      // We don't use the overload with three arguments.
      measure(label, markName) {
        if (markName !== activeMeasure.markName) {
          throw new Error('Unexpected measure() call.')
        }
        // Step one level up
        activeMeasure.label = label
        activeMeasure = activeMeasure.parent
        knownMeasures.add(label)
      },
      clearMarks(markName) {
        if (markName === activeMeasure.markName) {
          // Step one level up if we're in this measure
          activeMeasure = activeMeasure.parent
          activeMeasure.children.length--
        }
        knownMarks.delete(markName)
      },
      clearMeasures(label) {
        knownMeasures.delete(label)
      },
    }
  }

  beforeEach(() => {
    // jest.resetModules()
    resetFlamechart()
    global.performance = createUserTimingPolyfill()

    // Import after the polyfill is set up:
    effector = require('effector')
  })

  afterEach(() => {
    delete global.performance
  })

  it('supports store.map', async() => {
    const event = effector.createEvent('default update')
    const mapTest = effector.createStore('wat')
    effector.setStoreName(mapTest, 'mapTest')
    mapTest.on(event, (_, p) => p)
    const child = mapTest.map(v => `${v} - ok`)
    child.watch(() => {})

    event('a')
    event('b')

    expect(getFlameChart()).toMatchSnapshot()
  })

  it('supports throwing error store.map', async() => {
    const event = effector.createEvent('default update')
    const mapErrorTest = effector.createStore('wat')
    effector.setStoreName(mapErrorTest, 'mapErrorTest')
    mapErrorTest.on(event, (_, p) => p)
    const child = mapErrorTest.map(v => {
      throw new Error('wat')
    })
    child.watch(() => {})

    event('a')
    event('b')

    expect(getFlameChart()).toMatchSnapshot()
  })

  it('supports store.subscribe', async() => {
    const event = effector.createEvent('default update')
    const subscribeTest = effector.createStore('wat')
    effector.setStoreName(subscribeTest, 'subscribeTest')
    subscribeTest.on(event, (_, p) => p)
    subscribeTest.watch(() => {})

    event('a')
    event('b')

    expect(getFlameChart()).toMatchSnapshot()
  })

  it('supports throwing error in store.subscribe', async() => {
    const event = effector.createEvent('default update')
    const subscribeErrorTest = effector.createStore('wat')
    effector.setStoreName(subscribeErrorTest, 'subscribeErrorTest')
    subscribeErrorTest.on(event, (_, p) => p)
    subscribeErrorTest.watch(() => {
      throw new Error('wat')
    })

    event('a')
    event('b')

    expect(getFlameChart()).toMatchSnapshot()
  })
})
