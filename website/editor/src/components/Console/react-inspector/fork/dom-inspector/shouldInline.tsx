const TEXT_NODE_MAX_INLINE_CHARS = 80

const shouldInline = data =>
  data.childNodes.length === 0 ||
  (data.childNodes.length === 1 &&
    data.childNodes[0].nodeType === Node.TEXT_NODE &&
    data.textContent.length < TEXT_NODE_MAX_INLINE_CHARS)

export default shouldInline
