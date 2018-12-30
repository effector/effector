//@flow

function prepare(text: string) {
  return text
    .replace(/\n/ig, '<br/>')
    .replace(/\ /ig, `&nbsp;`)
}

export function updateOutput(value: string) {
  const node = document.querySelector('#view')
  if (!node) return
  node.innerHTML = prepare(value)
}

export function updateStatus(value: string) {
  const node = document.querySelector('#status')
  if (!node) return
  node.innerHTML = value
}
