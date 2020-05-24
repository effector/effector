/*
 * Polyfill for running tests
 * `includes` is an ES2016 feature
 */
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {
    var O = Object(this)
    var len = parseInt(O.length) || 0
    if (len === 0) {
      return false
    }
    var n = parseInt(arguments[1]) || 0
    var k
    if (n >= 0) {
      k = n
    } else {
      k = len + n
      if (k < 0) {
        k = 0
      }
    }
    var currentElement
    while (k < len) {
      currentElement = O[k]
      if (
        searchElement === currentElement ||
        (searchElement !== searchElement && currentElement !== currentElement)
      ) {
        // NaN !== NaN
        return true
      }
      k++
    }
    return false
  }
}

export default function getHeaders(data) {
  if (typeof data === 'object') {
    let rowHeaders
    // is an array
    if (Array.isArray(data)) {
      const nRows = data.length
      rowHeaders = [...Array(nRows).keys()]
    } else if (data !== null) {
      // is an object
      // keys are row indexes
      rowHeaders = Object.keys(data)
    }

    // Time: O(nRows * nCols)
    const colHeaders = rowHeaders.reduce((colHeaders, rowHeader) => {
      const row = data[rowHeader]
      if (typeof row === 'object' && row !== null) {
        /* O(nCols) Could optimize `includes` here */
        const cols = Object.keys(row)
        cols.reduce((xs, x) => {
          if (!xs.includes(x)) {
            /* xs is the colHeaders to be filled by searching the row's indexes */
            xs.push(x)
          }
          return xs
        }, colHeaders)
      }
      return colHeaders
    }, [])
    return {
      rowHeaders: rowHeaders,
      colHeaders: colHeaders,
    }
  }
  return undefined
}
