/* eslint-disable no-unused-vars */

const keyStrUriSafe =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$'
const baseReverseDic = {}
const charAt = (str: string, i) => str.charAt(i)
for (let i = 0; i < keyStrUriSafe.length; i++) {
  baseReverseDic[charAt(keyStrUriSafe, i)] = i
}

export function compress(input?: string) {
  if (input == null) return ''
  let i
  let value
  const context_dictionary = {}
  const context_dictionaryToCreate = {}
  let context_c = ''
  let context_wc = ''
  let context_w = ''

  // Compensate for the first entry which should not count
  let context_enlargeIn = 2

  let context_dictSize = 3
  let context_numBits = 2
  const context_data = []
  let context_data_val = 0
  let context_data_position = 0

  const updateContextData = () => {
    if (context_data_position == 6 - 1) {
      context_data_position = 0
      context_data.push(charAt(keyStrUriSafe, context_data_val))
      context_data_val = 0
    } else {
      context_data_position++
    }
  }
  const contextUpdater = (contextDataValue, valueValue) => {
    context_data_val = contextDataValue
    updateContextData()
    value = valueValue
  }
  const updateCycle = (to, variant) => {
    for (i = 0; i < to; i++) {
      variant == 0 && contextUpdater(context_data_val << 1, value)
      variant == 1 &&
        contextUpdater((context_data_val << 1) | (value & 1), value >> 1)
      variant == 2 && contextUpdater((context_data_val << 1) | value, 0)
    }
  }
  const parseWC = () => {
    if (context_w in context_dictionaryToCreate) {
      if (context_w.charCodeAt(0) < 256) {
        updateCycle(context_numBits, 0)
        value = context_w.charCodeAt(0)
        updateCycle(8, 1)
      } else {
        value = 1
        updateCycle(context_numBits, 2)
        value = context_w.charCodeAt(0)
        updateCycle(16, 1)
      }
      context_enlargeIn--
      if (context_enlargeIn == 0) {
        context_enlargeIn = 2 ** context_numBits
        context_numBits++
      }
      delete context_dictionaryToCreate[context_w]
    } else {
      value = context_dictionary[context_w]
      updateCycle(context_numBits, 1)
    }
    context_enlargeIn--
    if (context_enlargeIn == 0) {
      context_enlargeIn = 2 ** context_numBits
      context_numBits++
    }
  }

  for (let ii = 0; ii < input.length; ii++) {
    context_c = charAt(input, ii)
    if (!(context_c in context_dictionary)) {
      context_dictionary[context_c] = context_dictSize++
      context_dictionaryToCreate[context_c] = true
    }

    context_wc = context_w + context_c
    if (context_wc in context_dictionary) {
      context_w = context_wc
    } else {
      parseWC()
      // Add wc to the dictionary.
      context_dictionary[context_wc] = context_dictSize++
      context_w = String(context_c)
    }
  }

  // Output the code for w.
  if (context_w !== '') parseWC()

  // Mark the end of the stream
  value = 2
  updateCycle(context_numBits, 1)

  // Flush the last char
  while (true) {
    context_data_val = context_data_val << 1
    if (context_data_position == 6 - 1) {
      context_data.push(charAt(keyStrUriSafe, context_data_val))
      break
    } else context_data_position++
  }
  return context_data.join('')
}

export function decompress(input: string) {
  if (input == null) return ''
  if (input === '') return null
  input = input.replace(/ /g, '+')

  const dictionary = [0, 1, 2]
  let enlargeIn = 4
  let dictSize = 4
  let numBits = 3
  let entry = ''
  const result = []
  let w
  let bits = 0
  let resb
  let maxpower = 2 ** 2
  let power = 1
  let c
  let dataVal = baseReverseDic[charAt(input, 0)]
  let dataPosition = 32
  let dataIndex = 1

  const updateData = () => {
    while (power !== maxpower) {
      resb = dataVal & dataPosition
      dataPosition >>= 1
      if (dataPosition === 0) {
        dataPosition = 32
        dataVal = baseReverseDic[charAt(input, dataIndex++)]
      }
      bits |= (resb > 0 ? 1 : 0) * power
      power <<= 1
    }
  }
  const updateDataPower = exp => {
    bits = 0
    maxpower = 2 ** exp
    power = 1
    updateData()
    return String.fromCharCode(bits)
  }

  updateData()

  switch (bits) {
    case 0:
      c = updateDataPower(8)
      break
    case 1:
      c = updateDataPower(16)
      break
    case 2:
      return ''
  }
  dictionary[3] = c
  w = c
  result.push(c)
  while (true) {
    if (dataIndex > input.length) {
      return ''
    }

    updateDataPower(numBits)

    switch ((c = bits)) {
      case 0:
        dictionary[dictSize++] = updateDataPower(8)
        c = dictSize - 1
        enlargeIn--
        break
      case 1:
        dictionary[dictSize++] = updateDataPower(16)
        c = dictSize - 1
        enlargeIn--
        break
      case 2:
        return result.join('')
    }

    if (enlargeIn === 0) {
      enlargeIn = 2 ** numBits
      numBits++
    }

    if (dictionary[c]) {
      entry = dictionary[c]
    } else {
      if (c === dictSize) {
        //$off
        entry = w + charAt(w, 0)
      } else {
        return null
      }
    }
    result.push(entry)

    // Add w+entry[0] to the dictionary.
    //$off
    dictionary[dictSize++] = w + charAt(entry, 0)
    enlargeIn--

    w = entry

    if (enlargeIn === 0) {
      enlargeIn = 2 ** numBits
      numBits++
    }
  }
}
