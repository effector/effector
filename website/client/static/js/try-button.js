// Turn off ESLint for this file because it's sent down to users as-is.
/* eslint-disable */
window.addEventListener('load', function() {
  function button(label, ariaLabel, icon, className) {
    const btn = document.createElement('a')
    btn.classList.add('btnIcon', className)
    btn.setAttribute('aria-label', ariaLabel)
    btn.innerHTML =
      '<div class="btnIcon__body">' +
      icon +
      '<strong class="btnIcon__label">' +
      label +
      '</strong>' +
      '</div>'
    return btn
  }

  function addButtons(codeBlockSelector, btn) {
    document.querySelectorAll(codeBlockSelector).forEach(function(code) {
      code.parentNode.appendChild(btn.cloneNode(true))
    })
  }

  const tryIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg>'

  addButtons(
    '.post .hljs.language-js',
    button('Try', 'Try it in playground', tryIcon, 'btnTry'),
  )

  document.querySelectorAll('.btnTry').forEach(function(btn) {
    btn.href =
      window.location.origin +
      '/try/?code=' +
      LZString.compressToEncodedURIComponent(
        btn.parentNode.querySelector('code').textContent,
      )
  })
})
