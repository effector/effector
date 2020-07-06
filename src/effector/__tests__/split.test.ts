import {
  createEvent,
  split,
  createEffect,
  createStore,
  createApi,
  Event,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

describe('split(source, match)', () => {
  it('split event by matching conditions', () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const source: Event<string[]> = createEvent()
    const {emptyList, oneElement, commonList} = split(source, {
      emptyList: list => list.length === 0,
      oneElement: list => list.length === 1,
      commonList: list => list.length > 1,
    })
    emptyList.watch(list => fn1(list))
    commonList.watch(list => fn2(list))
    source([])
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).not.toBeCalled()
    source(['1'])
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).not.toBeCalled()
    source(['foo', 'bar'])
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
  })

  it('has default case __', () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const source: Event<string[]> = createEvent()
    const {emptyList, oneElement, __: commonList} = split(source, {
      emptyList: list => list.length === 0,
      oneElement: list => list.length === 1,
    })
    emptyList.watch(list => fn1(list))
    commonList.watch(list => fn2(list))
    source([])
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).not.toBeCalled()
    source(['1'])
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).not.toBeCalled()
    source(['foo', 'bar'])
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
  })
})

describe('split(config)', () => {
  it('match by conditions', () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const fn3 = jest.fn()

    const messageReceived = createEvent<Message>()
    const showTextPopup = createEvent<Text>()
    const playAudio = createEvent<Audio>()
    const reportUnknownMessageType = createEffect<Message, void>()

    split({
      source: messageReceived,
      match: {
        text: (msg): msg is Text => msg.type === 'text',
        audio: (msg): msg is Audio => msg.type === 'audio',
      },
      cases: {
        text: showTextPopup,
        audio: playAudio,
        __: reportUnknownMessageType,
      },
    })

    showTextPopup.watch(fn1)
    playAudio.watch(fn2)
    reportUnknownMessageType.use(fn3)

    messageReceived({
      type: 'text',
      value: 'Hello',
    })
    messageReceived({
      type: 'image',
      imageUrl: '...',
    })
    messageReceived({
      type: 'audio',
      duration: 500,
    })

    expect(argumentHistory(fn1)).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "text",
          "value": "Hello",
        },
      ]
    `)
    expect(argumentHistory(fn2)).toMatchInlineSnapshot(`
      Array [
        Object {
          "duration": 500,
          "type": "audio",
        },
      ]
    `)
    expect(argumentHistory(fn3)).toMatchInlineSnapshot(`
      Array [
        Object {
          "imageUrl": "...",
          "type": "image",
        },
      ]
    `)
  })
  it('allow to use inline api', () => {
    const fn = jest.fn()

    const textContent = createStore<string[]>([])

    const messageReceived = createEvent<Message>()

    split({
      source: messageReceived,
      match: {
        text: (msg): msg is Text => msg.type === 'text',
        audio: (msg): msg is Audio => msg.type === 'audio',
      },
      cases: createApi(textContent, {
        text: (list, {value}: Text) => [...list, value],
        audio: (list, {duration}: Audio) => [...list, `audio ${duration}`],
        __: (list, msg: Message) => [...list, 'unknown message'],
      }),
    })

    textContent.watch(fn)

    messageReceived({
      type: 'text',
      value: 'Hello',
    })
    messageReceived({
      type: 'image',
      imageUrl: '...',
    })
    messageReceived({
      type: 'audio',
      duration: 500,
    })

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Array [],
        Array [
          "Hello",
        ],
        Array [
          "Hello",
          "unknown message",
        ],
        Array [
          "Hello",
          "unknown message",
          "audio 500",
        ],
      ]
    `)
  })
})

type Message = Text | Image | Audio | System

type System = {
  type: 'system'
}
type Text = {
  type: 'text'
  value: string
}
type Image = {
  type: 'image'
  imageUrl: string
}
type Audio = {
  type: 'audio'
  duration: number
}
