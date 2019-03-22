describe('scope', () => {
  test('example', () => {
    const event1 = createEvent()
    const event2 = createEvent()
    const event3 = createEvent()
    const store = createStore(0)
      .on(event1, (_, payload) => payload)
    const track1 = jest.fn()
    store.watch(track1)

    event1(1.0)
    expect(store.getState()).toBe(1.0)
    expect(track1.mock.calls.length).toBe(1)

    // `scope` is function thats return new entity
    // with cloned dependencies.
    const scopeA = createScope('description' /* { handlers? } */)
    const event1A = scopeA(event1)
    const storeA = scopeA(store)

    expect(storeA.getState()).toBe(1)

    // original updates not affect scoped entitys

    event1(1.1)
    expect(storeA.getState()).toBe(1.0)
    expect(store.getState()).toBe(1.1)
    expect(track1.mock.calls.length).toBe(2)

    // scoped updates not affect original entitys

    event1A(1.2)
    expect(storeA.getState()).toBe(1.2)
    expect(store.getState()).toBe(1.1)
    expect(track1.mock.calls.length).toBe(2)

    // any dependencies changes outside the scope is not affect the scope dependencies

    store
      .on(event2, (_, payload) => payload)

    event2(1.3)
    expect(storeA.getState()).toBe(1.2)
    expect(store.getState()).toBe(1.3)

    // when new node attach to the scope
    // all node dependencies inserting to scope

    scopeA(event2)(1.4)
    expect(storeA.getState()).toBe(1.4)
    expect(store.getState()).toBe(1.3)

    // any dependencies changes inside the scope is not affect dependencies outside the scope

    const event3A = scopeA(event3)
    storeA
      .on(event3A, (_, payload) => payload)

    event3A(1.5)
    expect(storeA.getState()).toBe(1.5)
    expect(store.getState()).toBe(1.3)

    // a new scope can recreate infinity times
    const scopeB = createScope()
    const event1AB = scopeB(event1A)
    event1AB(2.0)
    expect(scopeB(storeA).getState()).toBe(2.0)

    // Discussion: need to reupdate dependenies fo third-party scope?
    // expect(scopeB(store).getState()).toBe(2.0) // ??
  })
})
