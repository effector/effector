// @flow
/* eslint-disable no-unused-vars */
import {createEffect, createStore, Effect, attach} from 'effector'

const typecheck = '{global}'

describe('should infer result type', () => {
  test('complete case', () => {
    const apiRequest = createEffect<
      {url: string; body: string},
      {status: string},
      {code: number}
    >()
    const url = createStore('https://example.com')

    const fetchUsers: Effect<string, string, number> = attach({
      source: {url},
      target: apiRequest,
      mapParams: (params: string, {url}) => ({url, body: params}),
      mapDone: ({status}) => status,
      mapFail: ({code}) => code,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors
      "
    `)
  })
  test('map params, map done', () => {
    const apiRequest = createEffect<
      {url: string; body: string},
      {status: string},
      {code: number}
    >()
    const url = createStore('https://example.com')

    const fetchUsers: Effect<string, string, {code: number}> = attach({
      source: {url},
      target: apiRequest,
      mapParams: (params: string, {url}) => ({url, body: params}),
      mapDone: ({status}) => status,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors
      "
    `)
  })
  test('map params', () => {
    const apiRequest = createEffect<
      {url: string; body: string},
      {status: string},
      {code: number}
    >()
    const url = createStore('https://example.com')

    const fetchUsers: Effect<string, {status: string}, {code: number}> = attach(
      {
        source: {url},
        target: apiRequest,
        mapParams: (params: string, {url}) => ({url, body: params}),
      },
    )

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors
      "
    `)
  })
})
