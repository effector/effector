import {
  createEvent,
  createStore,
  createEffect,
  combine,
  sample,
  merge,
  split,
  createApi,
} from 'effector'

let warn: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>
beforeEach(() => {
  warn = jest.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  warn.mockRestore()
})

function getWarning() {
  return warn.mock.calls.map(([msg]) => msg)[0]
}

describe('basic checks for that the derived untis in target are forbidden', () => {
  const trigger = createEvent()
  const mappedEv = trigger.map(() => {})
  const $store = createStore(0)
  const $map = $store.map(() => 42)
  const $combined = combine({store: $store, map: $map})

  test('targetable field works', () => {
    expect(trigger.targetable).toBe(true)
    // @ts-expect-error
    expect(mappedEv.targetable).toBe(false)
    expect($store.targetable).toBe(true)
    // @ts-expect-error
    expect($map.targetable).toBe(false)
    // @ts-expect-error
    expect($combined.targetable).toBe(false)
  })

  test('event()', () => {
    expect(() => {
      // @ts-expect-error
      mappedEv()
    }).toThrowErrorMatchingInlineSnapshot(
      `"[event] unit 'trigger → *': call of derived event is not supported, use createEvent instead"`,
    )
  })

  test('event.prepend', () => {
    expect(() => {
      // @ts-expect-error
      mappedEv.prepend(() => {})
    }).toThrowErrorMatchingInlineSnapshot(
      `"[event] unit 'trigger → *': .prepend of derived event is not supported, call source event instead"`,
    )
  })

  test('store.on', () => {
    expect(() =>
      // @ts-expect-error
      $map.on(trigger, () => 52),
    ).toThrowErrorMatchingInlineSnapshot(
      `"[store] unit '$store → *': .on of derived store is not supported"`,
    )
  })
  test('store.reset', () => {
    expect(() =>
      // @ts-expect-error
      $map.reset(trigger),
    ).toThrowErrorMatchingInlineSnapshot(
      `"[store] unit '$store → *': .reset of derived store is not supported"`,
    )
  })
  test('store.reinit', () => {
    expect(() =>
      // @ts-expect-error
      $map.reinit(),
    ).toThrowErrorMatchingInlineSnapshot(`"$map.reinit is not a function"`)
  })
  test('split', () => {
    expect(() => {
      split({
        source: trigger,
        match: {
          a: () => true,
        },

        cases: {
          a: mappedEv,
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[split] (/src/effector/__tests__/derived.test.ts:84:6): derived unit in \\"cases.a\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
  test('sample', () => {
    expect(() => {
      sample({
        // @ts-expect-error
        clock: trigger,
        target: mappedEv,
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[sample] (/src/effector/__tests__/derived.test.ts:100:6): derived unit in \\"target\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
})

describe('call of derived events', () => {
  test('usage with .map throw error', () => {
    const a = createEvent()
    const b = a.map(() => {})
    expect(b).toThrowErrorMatchingInlineSnapshot(
      `"[event] unit 'a → *': call of derived event is not supported, use createEvent instead"`,
    )
  })
  test('usage with .filterMap throw error', () => {
    const a = createEvent()
    const b = a.filterMap(() => {})
    expect(b).toThrowErrorMatchingInlineSnapshot(
      `"[event] unit 'a → *': call of derived event is not supported, use createEvent instead"`,
    )
  })
  test('usage with .filter throw error', () => {
    const a = createEvent()
    const b = a.filter({fn: () => false})
    expect(b).toThrowErrorMatchingInlineSnapshot(
      `"[event] unit 'a → *': call of derived event is not supported, use createEvent instead"`,
    )
  })
  test('usage with merge throw error', () => {
    const a = createEvent()
    const b = merge([a])
    expect(b).toThrowErrorMatchingInlineSnapshot(
      `"[event] unit 'b': call of derived event is not supported, use createEvent instead"`,
    )
  })
  test('usage with split throw error', () => {
    const trigger = createEvent<number>()
    const {derived} = split(trigger, {derived: x => x > 0})
    //@ts-expect-error
    expect(() => derived(0)).toThrowErrorMatchingInlineSnapshot(
      `"[event] unit 'cases.derived': call of derived event is not supported, use createEvent instead"`,
    )
  })
  test('usage with sample throw error', () => {
    const a = createEvent()
    const b = sample({clock: a, source: a})
    expect(b).toThrowErrorMatchingInlineSnapshot(
      `"[event] unit 'b': call of derived event is not supported, use createEvent instead"`,
    )
  })
  describe('interal events', () => {
    test('usage with effect.finally throw error', () => {
      const fx = createEffect(() => {})
      expect(() =>
        // @ts-expect-error
        fx.finally({
          status: 'done',
          params: null,
          result: null,
        }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"[event] unit 'finally': call of derived event is not supported, use createEvent instead"`,
      )
    })
    test('usage with effect.done throw error', () => {
      const fx = createEffect(() => {})
      expect(fx.done).toThrowErrorMatchingInlineSnapshot(
        `"[event] unit 'done': call of derived event is not supported, use createEvent instead"`,
      )
    })
    test('usage with effect.fail throw error', () => {
      const fx = createEffect(() => {})
      expect(fx.fail).toThrowErrorMatchingInlineSnapshot(
        `"[event] unit 'fail': call of derived event is not supported, use createEvent instead"`,
      )
    })
    test('usage with effect.doneData throw error', () => {
      const fx = createEffect(() => {})
      expect(fx.doneData).toThrowErrorMatchingInlineSnapshot(
        `"[event] unit 'doneData': call of derived event is not supported, use createEvent instead"`,
      )
    })
    test('usage with effect.failData throw error', () => {
      const fx = createEffect(() => {})
      expect(fx.failData).toThrowErrorMatchingInlineSnapshot(
        `"[event] unit 'failData': call of derived event is not supported, use createEvent instead"`,
      )
    })
    test('usage with store.updates throw error', () => {
      const $store = createStore(0)
      //@ts-expect-error
      expect(() => $store.updates(0)).toThrowErrorMatchingInlineSnapshot(
        `"[event] unit 'updates': call of derived event is not supported, use createEvent instead"`,
      )
    })
  })
})

test('createApi', () => {
  const $a = createStore(0)
  const $derived = $a.map(x => x)
  expect(() => {
    //@ts-expect-error
    createApi($derived, {x: () => 0})
  }).toThrowErrorMatchingInlineSnapshot(
    `"[store] unit '$a → *': .on of derived store is not supported"`,
  )
})

describe('.on/.reset with derived stores', () => {
  test('.on usage with .map is deprecated', () => {
    const trigger = createEvent()
    const $a = createStore(0)
    const $b = $a.map(x => x)
    expect(() => {
      //@ts-expect-error
      $b.on(trigger, x => x)
    }).toThrowErrorMatchingInlineSnapshot(
      `"[store] unit '$a → *': .on of derived store is not supported"`,
    )
  })
  test('.reset usage with .map is deprecated', () => {
    const trigger = createEvent()
    const $a = createStore(0)
    const $b = $a.map(x => x)
    expect(() => {
      //@ts-expect-error
      $b.reset(trigger)
    }).toThrowErrorMatchingInlineSnapshot(
      `"[store] unit '$a → *': .reset of derived store is not supported"`,
    )
  })
  test('.on usage with combine is deprecated', () => {
    const trigger = createEvent()
    const $a = createStore(0)
    const $b = combine({a: $a})
    expect(() => {
      //@ts-expect-error
      $b.on(trigger, x => x)
    }).toThrowErrorMatchingInlineSnapshot(
      `"[store] unit '$b': .on of derived store is not supported"`,
    )
  })
  test('.reset usage with combine is deprecated', () => {
    const trigger = createEvent()
    const $a = createStore(0)
    const $b = combine({a: $a})
    expect(() => {
      //@ts-expect-error
      $b.reset(trigger)
    }).toThrowErrorMatchingInlineSnapshot(
      `"[store] unit '$b': .reset of derived store is not supported"`,
    )
  })
  describe('internal stores', () => {
    test('usage with effect.inFlight is warned', () => {
      const trigger = createEvent()
      const fx = createEffect(() => {})
      expect(() => {
        //@ts-expect-error
        fx.inFlight.on(trigger, s => s + 1)
      }).toThrowErrorMatchingInlineSnapshot(
        `"[store] unit 'inFlight': .on of derived store is not supported"`,
      )
    })
  })
})

describe('split cases', () => {
  test('with derived store', () => {
    const trigger = createEvent<number>()
    const $a = createStore(0)
    const $derived = $a.map(x => x)
    expect(() => {
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: $derived,
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[split] (/src/effector/__tests__/derived.test.ts:279:6): derived unit in \\"cases.a\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
  test('with derived event', () => {
    const trigger = createEvent<number>()
    const a = createEvent<number>()
    const derived = a.map(x => x)
    expect(() => {
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: derived,
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[split] (/src/effector/__tests__/derived.test.ts:295:6): derived unit in \\"cases.a\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
})
describe('interal events', () => {
  test('usage with effect.finally is warned', () => {
    const trigger = createEvent<any>()
    const fx = createEffect(() => {})

    expect(() => {
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.finally,
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[split] (/src/effector/__tests__/derived.test.ts:313:6): derived unit in \\"cases.a\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
  test('usage with effect.done is warned', () => {
    const trigger = createEvent<any>()
    const fx = createEffect(() => {})
    expect(() => {
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.done,
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[split] (/src/effector/__tests__/derived.test.ts:328:6): derived unit in \\"cases.a\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
  test('usage with effect.fail is warned', () => {
    const trigger = createEvent<any>()
    const fx = createEffect(() => {})
    expect(() => {
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.fail,
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[split] (/src/effector/__tests__/derived.test.ts:343:6): derived unit in \\"cases.a\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
  test('usage with effect.doneData is warned', () => {
    const trigger = createEvent<any>()
    const fx = createEffect(() => {})
    expect(() => {
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.doneData,
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[split] (/src/effector/__tests__/derived.test.ts:358:6): derived unit in \\"cases.a\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
  test('usage with effect.failData is warned', () => {
    const trigger = createEvent<any>()
    const fx = createEffect(() => {})
    expect(() => {
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.failData,
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[split] (/src/effector/__tests__/derived.test.ts:373:6): derived unit in \\"cases.a\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
  test('usage with store.updates is warned', () => {
    const trigger = createEvent<any>()
    const $store = createStore(0)
    expect(() => {
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: $store.updates,
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[split] (/src/effector/__tests__/derived.test.ts:388:6): derived unit in \\"cases.a\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
})
describe('internal stores', () => {
  test('usage with effect.inFlight is warned', () => {
    const trigger = createEvent<number>()
    const fx = createEffect(() => {})
    expect(() => {
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.inFlight,
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[split] (/src/effector/__tests__/derived.test.ts:405:6): derived unit in \\"cases.a\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
})

describe('sample target', () => {
  test('with derived store', () => {
    const trigger = createEvent<number>()
    const $a = createStore(0)
    const $derived = $a.map(x => x)
    expect(() => {
      sample({
        //@ts-expect-error
        clock: trigger,
        target: $derived,
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[sample] (/src/effector/__tests__/derived.test.ts:424:6): derived unit in \\"target\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
  test('with derived event', () => {
    const trigger = createEvent<number>()
    const a = createEvent<number>()
    const derived = a.map(x => x)
    expect(() => {
      sample({
        //@ts-expect-error
        clock: trigger,
        target: derived,
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"[sample] (/src/effector/__tests__/derived.test.ts:438:6): derived unit in \\"target\\" is not supported, use createStore/createEvent instead\\""`,
    )
  })
  describe('interal events', () => {
    test('usage with effect.finally is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      expect(() => {
        sample({
          //@ts-expect-error
          clock: trigger,
          target: fx.finally,
        })
      }).toThrowErrorMatchingInlineSnapshot(
        `"[sample] (/src/effector/__tests__/derived.test.ts:452:8): derived unit in \\"target\\" is not supported, use createStore/createEvent instead\\""`,
      )
    })
    test('usage with effect.done is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      expect(() => {
        sample({
          //@ts-expect-error
          clock: trigger,
          target: fx.done,
        })
      }).toThrowErrorMatchingInlineSnapshot(
        `"[sample] (/src/effector/__tests__/derived.test.ts:465:8): derived unit in \\"target\\" is not supported, use createStore/createEvent instead\\""`,
      )
    })
    test('usage with effect.fail is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      expect(() => {
        sample({
          //@ts-expect-error
          clock: trigger,
          target: fx.fail,
        })
      }).toThrowErrorMatchingInlineSnapshot(
        `"[sample] (/src/effector/__tests__/derived.test.ts:478:8): derived unit in \\"target\\" is not supported, use createStore/createEvent instead\\""`,
      )
    })
    test('usage with effect.doneData is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      expect(() => {
        sample({
          //@ts-expect-error
          clock: trigger,
          target: fx.doneData,
        })
      }).toThrowErrorMatchingInlineSnapshot(
        `"[sample] (/src/effector/__tests__/derived.test.ts:491:8): derived unit in \\"target\\" is not supported, use createStore/createEvent instead\\""`,
      )
    })
    test('usage with effect.failData is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      expect(() => {
        sample({
          //@ts-expect-error
          clock: trigger,
          target: fx.failData,
        })
      }).toThrowErrorMatchingInlineSnapshot(
        `"[sample] (/src/effector/__tests__/derived.test.ts:504:8): derived unit in \\"target\\" is not supported, use createStore/createEvent instead\\""`,
      )
    })
    test('usage with store.updates is warned', () => {
      const trigger = createEvent<any>()
      const $store = createStore(0)
      expect(() => {
        sample({
          //@ts-expect-error
          clock: trigger,
          target: $store.updates,
        })
      }).toThrowErrorMatchingInlineSnapshot(
        `"[sample] (/src/effector/__tests__/derived.test.ts:517:8): derived unit in \\"target\\" is not supported, use createStore/createEvent instead\\""`,
      )
    })
  })
  describe('internal stores', () => {
    test('usage with effect.inFlight is warned', () => {
      const trigger = createEvent<number>()
      const fx = createEffect(() => {})
      expect(() => {
        sample({
          //@ts-expect-error
          clock: trigger,
          target: fx.inFlight,
        })
      }).toThrowErrorMatchingInlineSnapshot(
        `"[sample] (/src/effector/__tests__/derived.test.ts:532:8): derived unit in \\"target\\" is not supported, use createStore/createEvent instead\\""`,
      )
    })
  })
})
