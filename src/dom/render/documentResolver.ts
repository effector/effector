import * as customDocument from './document'
export const domDocument =
  (typeof globalThis !== 'undefined' && globalThis.document) ||
  (typeof global !== 'undefined' && global.document)

export {customDocument}
export let document = domDocument
export const useCustomDocument = () => {
  //@ts-ignore
  document = customDocument
}

export const useDOMDocument = () => {
  document = domDocument
}
