import * as customDocument from './document'
export const domDocument = typeof document !== 'undefined' ? document : null
export {customDocument}
let doc = domDocument!
export {doc as document}
export const useCustomDocument = () => {
  //@ts-ignore
  doc = customDocument
}

export const useDOMDocument = () => {
  //@ts-ignore
  doc = domDocument
}
