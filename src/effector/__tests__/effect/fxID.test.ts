import {attach, createEffect, Unit, Node, step} from 'effector'

function getNode(unit: Unit<any>): Node {
  //@ts-expect-error
  return unit.graphite || unit
}

describe('plain effect support', () => {
  test('fxID in fx seq', async () => {
    const fx = createEffect(() => {})
    let fxID: any
    getNode(fx).seq.push(
      step.compute({
        fn(data, _, stack) {
          fxID = stack.meta?.fxID
          return data
        },
      }),
    )
    await fx()
    expect(typeof fxID).toBe('string')
  })
  test('fxID in fx.finally seq', async () => {
    const fx = createEffect(() => {})
    let fxID: any
    getNode(fx.finally).seq.push(
      step.compute({
        fn(data, _, stack) {
          fxID = stack.meta?.fxID
          return data
        },
      }),
    )
    await fx()
    expect(typeof fxID).toBe('string')
  })
  test('fxID in fx.done seq', async () => {
    const fx = createEffect(() => {})
    let fxID: any
    getNode(fx.done).seq.push(
      step.compute({
        fn(data, _, stack) {
          const finallyStack = stack.parent?.parent
          fxID = finallyStack?.meta?.fxID
          return data
        },
      }),
    )
    await fx()
    expect(typeof fxID).toBe('string')
  })
  test('fxID in fx.doneData seq', async () => {
    const fx = createEffect(() => {})
    let fxID: any
    getNode(fx.doneData).seq.push(
      step.compute({
        fn(data, _, stack) {
          const doneStack = stack.parent?.parent
          const finallyStack = doneStack?.parent?.parent
          fxID = finallyStack?.meta?.fxID
          return data
        },
      }),
    )
    await fx()
    expect(typeof fxID).toBe('string')
  })
})

describe('attach support', () => {
  describe('attached effect', () => {
    test('fxID in fx seq', async () => {
      const fx = attach({effect: createEffect(() => {})})
      let fxID: any
      getNode(fx).seq.push(
        step.compute({
          fn(data, _, stack) {
            fxID = stack.meta?.fxID
            return data
          },
        }),
      )
      await fx()
      expect(typeof fxID).toBe('string')
    })
    test('fxID in fx.finally seq', async () => {
      const fx = attach({effect: createEffect(() => {})})
      let fxID: any
      getNode(fx.finally).seq.push(
        step.compute({
          fn(data, _, stack) {
            fxID = stack.meta?.fxID
            return data
          },
        }),
      )
      await fx()
      expect(typeof fxID).toBe('string')
    })
    test('fxID in fx.done seq', async () => {
      const fx = attach({effect: createEffect(() => {})})
      let fxID: any
      getNode(fx.done).seq.push(
        step.compute({
          fn(data, _, stack) {
            const finallyStack = stack.parent?.parent
            fxID = finallyStack?.meta?.fxID
            return data
          },
        }),
      )
      await fx()
      expect(typeof fxID).toBe('string')
    })
    test('fxID in fx.doneData seq', async () => {
      const fx = attach({effect: createEffect(() => {})})
      let fxID: any
      getNode(fx.doneData).seq.push(
        step.compute({
          fn(data, _, stack) {
            const doneStack = stack.parent?.parent
            const finallyStack = doneStack?.parent?.parent
            fxID = finallyStack?.meta?.fxID
            return data
          },
        }),
      )
      await fx()
      expect(typeof fxID).toBe('string')
    })
  })
  describe('inner effect', () => {
    test('fxID in fx seq', async () => {
      const fx = createEffect(() => {})
      const attached = attach({effect: fx})
      let fxID: any
      getNode(fx).seq.push(
        step.compute({
          fn(data, _, stack) {
            fxID = stack.meta?.fxID
            return data
          },
        }),
      )
      await attached()
      expect(typeof fxID).toBe('string')
    })
    test('fxID in fx.finally seq', async () => {
      const fx = createEffect(() => {})
      const attached = attach({effect: fx})
      let fxID: any
      getNode(fx.finally).seq.push(
        step.compute({
          fn(data, _, stack) {
            fxID = stack.meta?.fxID
            return data
          },
        }),
      )
      await attached()
      expect(typeof fxID).toBe('string')
    })
    test('fxID in fx.done seq', async () => {
      const fx = createEffect(() => {})
      const attached = attach({effect: fx})
      let fxID: any
      getNode(fx.done).seq.push(
        step.compute({
          fn(data, _, stack) {
            const finallyStack = stack.parent?.parent
            fxID = finallyStack?.meta?.fxID
            return data
          },
        }),
      )
      await attached()
      expect(typeof fxID).toBe('string')
    })
    test('fxID in fx.doneData seq', async () => {
      const fx = createEffect(() => {})
      const attached = attach({effect: fx})
      let fxID: any
      getNode(fx.doneData).seq.push(
        step.compute({
          fn(data, _, stack) {
            const doneStack = stack.parent?.parent
            const finallyStack = doneStack?.parent?.parent
            fxID = finallyStack?.meta?.fxID
            return data
          },
        }),
      )
      await attached()
      expect(typeof fxID).toBe('string')
    })
  })
})
