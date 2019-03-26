// @flow

let iframe = null

function getIframe() {
  if (iframe === null) {
    iframe = document.createElement('iframe')
    iframe.style.display = 'none'

    // $FlowFixMe
    document.body.append(iframe)
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

function runCode(code) {
  return function(env) {
    for (const key in env) {
      getIframe().contentWindow[key] = env[key]
    }
    return getIframe().contentWindow.eval(code)
  }
}

function runLibrary(code) {
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
