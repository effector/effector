// @flow

import {sourceCode, selectVersion} from '../domain'

let iframe: HTMLIFrameElement | null = null

function getIframe(): HTMLIFrameElement {
  if (iframe === null) {
    //iframe = document.createElement('iframe')
    iframe =
      ((document.getElementById('dom'): any): HTMLIFrameElement | null) ||
      document.createElement('iframe')
    //iframe.style.display = 'none'

    //$off
    //document.body.append(iframe)

    sourceCode.watch(() => {
      if (iframe === null) return
      if (iframe.contentDocument.body === null) return
      iframe.contentDocument.body.innerHTML = ''
    })
    selectVersion.watch(() => {
      if (iframe === null) return
      if (iframe.contentDocument.body === null) return
      iframe.contentDocument.body.innerHTML = ''
    })
  }

  return iframe
}

// workaround for bundlers, which understand
// surce mapping urls
const tag = `# source`
function scopedEval(code: string, sourceMap: ?string) {
  // Append source map footer so errors map to pre-compiled code.
  if (sourceMap) {
    code = `${code}\n//${tag}MappingURL=data:application/json;charset=utf-8;base64,${btoa(
      unescape(encodeURIComponent(sourceMap)),
    )}`
  }

  // Eval code within an iframe so that it can't eg unmount the REPL.
  getIframe().contentWindow.eval(code)
}

function runCode(code: string) {
  return function(env) {
    for (const key in env) {
      getIframe().contentWindow[key] = env[key]
    }
    return getIframe().contentWindow.eval(code)
  }
}

function runLibrary(code: string) {
  return function(env) {
    for (const key in env) {
      getIframe().contentWindow[key] = env[key]
    }
    return getIframe().contentWindow.eval(code)
  }
}

export default {
  execute: scopedEval,
  //Function: scopedFunction,
  runLibrary,
  runCode,
  getIframe,
}
