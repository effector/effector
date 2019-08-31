// @flow

import {selectVersion} from '../editor'
import {sourceCode} from '../editor/state'

let iframe: HTMLIFrameElement | null = null

function getIframe(): HTMLIFrameElement {
  if (iframe === null) {
    //iframe = document.createElement('iframe')
    iframe =
      ((document.getElementById('dom'): any): HTMLIFrameElement | null) ||
      document.createElement('iframe')

    const generateFrame = () => {
      if (iframe === null) return
      if (iframe.contentDocument.body === null) return
      const styles = `
  <link rel="stylesheet" href="https://unpkg.com/@adobe/spectrum-css@2.x/dist/spectrum-core.css">
  <link rel="stylesheet" href="https://unpkg.com/@adobe/spectrum-css@2.x/dist/spectrum-light.css">
  <link rel="stylesheet" href="https://unpkg.com/@adobe/spectrum-css@2.x/dist/spectrum-lightest.css">
  `
      iframe.contentDocument.head.innerHTML = styles
      iframe.contentDocument.body.innerHTML =
        '<div class="spectrum spectrum--light spectrum--medium" id="root"></div>'
    }
    sourceCode.watch(generateFrame)
    selectVersion.watch(generateFrame)
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
  return function(env: any) {
    for (const key in env) {
      getIframe().contentWindow[key] = env[key]
    }
    return getIframe().contentWindow.eval(code)
  }
}

function runLibrary(code: string) {
  return function(env: any) {
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
