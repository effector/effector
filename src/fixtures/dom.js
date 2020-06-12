import {JSDOM} from 'jsdom'

import prettyHtml from './prettyHtml'

export const provideGlobals = () => {
  const dom = new JSDOM(`<!DOCTYPE html><body><div id="root"></div></body>`, {
    pretendToBeVisual: true,
  })
  const document = dom.window.document
  const window = dom.window
  const el = document.getElementById('root')
  const installDocument = () => {
    const oldDocument = globalThis.document
    globalThis.document = document
    return oldDocument
  }
  const restoreDocument = oldDocument => {
    globalThis.document = oldDocument
  }
  const domSnapshots = []
  const execFunc = async cb => {
    const oldDocument = installDocument()
    try {
      return await cb()
    } finally {
      restoreDocument(oldDocument)
    }
  }
  const exec = async cb => {
    const oldDocument = installDocument()
    try {
      await cb()
    } finally {
      restoreDocument(oldDocument)
    }
    return domSnapshots.map(prettyHtml)
  }
  const act = async cb => {
    if (cb) {
      const oldDocument = installDocument()
      try {
        await cb()
      } finally {
        restoreDocument(oldDocument)
      }
    }
    await new Promise(rs => setTimeout(rs, 200))
    domSnapshots.push(el.innerHTML)
  }

  return {dom, document, window, el, execFunc, exec, act}
}
