import {forIn} from './forIn'

type Text = Array<string | null | undefined | false>
export function printArray(array: any[]) {
  return `[${array.join(',')}]`
}
export function leftPad(lines: string[]) {
  return lines
    .join(`\n`)
    .split(`\n`)
    .map(line => `  ${line}`)
}
export function wrapText(firstLine: string, lines: string[]) {
  return [firstLine, ...leftPad(lines), '})'].join(`\n`)
}
export function createDescribe(description: string, lines: Text) {
  return wrapText(
    `describe('${description.replace(/\'/gi, '"')}', () => {`,
    lines.filter(Boolean) as any,
  )
}
export function createTest(description: string, lines: Text) {
  return wrapText(
    `test('${description.replace(/\'/gi, '"')}', () => {`,
    lines.filter(Boolean) as any[],
  )
}
export function printMethod({
  method,
  value,
  shape,
  addExpectError = true,
}: {
  method: string
  value: Record<string, any>
  shape: Record<string, string | {field: string; when?: string}>
  addExpectError?: boolean
}) {
  const parts = [method, '({']
  let isFirstField = true
  forIn(shape, (schemaRecord, methodField) => {
    const objectField =
      typeof schemaRecord === 'string' ? schemaRecord : schemaRecord.field
    const when: string | null | void =
      typeof schemaRecord === 'string' ? null : schemaRecord.when
    const objectFieldValue = value[objectField]
    if (when && !value[when]) return
    if (!when && (objectFieldValue === undefined || objectFieldValue === null))
      return
    const content = Array.isArray(objectFieldValue)
      ? printArray(objectFieldValue)
      : `${objectFieldValue}`
    if (isFirstField) {
      parts.push(`${methodField}:${content}`)
    } else {
      parts.push(`, ${methodField}:${content}`)
    }
    isFirstField = false
  })
  parts.push('})')
  const methodBody = parts.join('')
  if (addExpectError) {
    if (!value.pass) return ['//@ts-expect-error', methodBody].join(`\n`)
  }
  return methodBody
}
export function printTable({
  values,
  only: fieldSet,
  header,
}: {
  values: Record<string, any>[]
  only: string[]
  header: string[] | void
}) {
  const fieldsValues: Record<string, {values: string[]; maxSize: number}> = {}
  fieldSet.forEach((field, idx) => {
    const title = header ? header[idx] : field
    fieldsValues[field] = {values: [], maxSize: title.length}
  })
  const resultLines: string[] = []
  for (const value of values) {
    resultLines.push('| ')
    for (const field of fieldSet) {
      const fieldItem = fieldsValues[field]
      if (!(field in value)) {
        fieldItem.values.push('')
      } else {
        const result = String(value[field])
        fieldItem.values.push(result)
        fieldItem.maxSize = Math.max(fieldItem.maxSize, result.length)
      }
    }
  }
  for (let i = 0; i < values.length; i++) {
    let resultLine = resultLines[i]
    for (const field of fieldSet) {
      const fieldItem = fieldsValues[field]
      const textValue = fieldItem.values[i]
      resultLine += textValue
      if (textValue.length < fieldItem.maxSize) {
        resultLine += ' '.repeat(fieldItem.maxSize - textValue.length)
      }
      resultLine += ' | '
    }
    resultLines[i] = resultLine
  }
  let titleLine = '* '
  for (let i = 0; i < fieldSet.length; i++) {
    const field = fieldSet[i]
    const fieldItem = fieldsValues[field]
    const title = header ? header[i] : field
    titleLine += title
    if (title.length < fieldItem.maxSize) {
      titleLine += ' '.repeat(fieldItem.maxSize - title.length)
    }
    titleLine += ' * '
  }
  resultLines.unshift(titleLine)
  return resultLines
}
export function printMethodValues({
  method,
  values,
  shape,
  addExpectError,
  noMultiline,
}: {
  method: string
  values: Record<string, any>[]
  shape: Record<
    string,
    string | {field: string; when?: string; markError?: string}
  >
  addExpectError: (value: any) => boolean
  noMultiline?: boolean
}) {
  const parts = Array.from(values, () => [method, '({'])
  const partsMultiline = Array.from(values, () => [`${method}({`])
  const isFirstField = Array.from(values, () => true)
  const useMultiline = Array.from(values, () => false)
  forIn(shape, (schemaRecord, methodField) => {
    const objectField =
      typeof schemaRecord === 'string' ? schemaRecord : schemaRecord.field
    const when: string | null | void =
      typeof schemaRecord === 'string' ? null : schemaRecord.when
    const markError =
      typeof schemaRecord === 'string' ? null : schemaRecord.markError
    let max = 0
    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      const objectFieldValue = value[objectField]
      if (when && !value[when]) continue
      if (
        !when &&
        (objectFieldValue === undefined || objectFieldValue === null)
      )
        continue
      const markErrorValueRaw: boolean | string | string[] | null | void =
        markError ? value[markError] : null
      const markErrorValue =
        typeof markErrorValueRaw === 'string'
          ? [markErrorValueRaw]
          : markErrorValueRaw
      let skipAlign = false
      const content = Array.isArray(objectFieldValue)
        ? printArray(objectFieldValue)
        : `${objectFieldValue}`
      if (markErrorValue === true) {
        useMultiline[i] = true
        skipAlign = true
      } else if (Array.isArray(markErrorValue)) {
        if (Array.isArray(objectFieldValue)) {
          if (objectFieldValue.some(item => markErrorValue.includes(item))) {
            useMultiline[i] = true
            skipAlign = true
          }
        } else {
          if (markErrorValue.includes(objectFieldValue)) {
            useMultiline[i] = true
            skipAlign = true
          }
        }
      }
      if (!skipAlign) {
        max = Math.max(max, content.length)
      }
    }
    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      const objectFieldValue = value[objectField]
      if (when && !value[when]) continue
      if (
        !when &&
        (objectFieldValue === undefined || objectFieldValue === null)
      )
        continue
      const markErrorValueRaw: boolean | string | string[] | null | void =
        markError ? value[markError] : null
      const markErrorValue =
        typeof markErrorValueRaw === 'string'
          ? [markErrorValueRaw]
          : markErrorValueRaw
      const content = Array.isArray(objectFieldValue)
        ? printArray(objectFieldValue)
        : `${objectFieldValue}`
      if (markErrorValue === true) {
        partsMultiline[i].push(
          '  //' + `@ts-expect-error`,
          `  ${methodField}: ${content},`,
        )
      } else if (Array.isArray(markErrorValue)) {
        if (Array.isArray(objectFieldValue)) {
          if (objectFieldValue.some(item => markErrorValue.includes(item))) {
            partsMultiline[i].push(`  ${methodField}: [`)
            for (const item of objectFieldValue) {
              if (markErrorValue.includes(item)) {
                partsMultiline[i].push('    //' + `@ts-expect-error`)
              }
              partsMultiline[i].push(`    ${item},`)
            }
            partsMultiline[i].push('  ],')
          } else {
            partsMultiline[i].push(`  ${methodField}: ${content},`)
          }
        } else {
          if (markErrorValue.includes(objectFieldValue)) {
            partsMultiline[i].push('  //' + `@ts-expect-error`)
          }
          partsMultiline[i].push(`  ${methodField}: ${content},`)
        }
      } else {
        partsMultiline[i].push(`  ${methodField}: ${content},`)
      }
      const alignPad = ' '.repeat(Math.max(0, max - content.length))
      if (isFirstField[i]) {
        parts[i].push(`${methodField}:${content}`, alignPad)
      } else {
        parts[i].push(`, ${methodField}:${content}`, alignPad)
      }
      isFirstField[i] = false
    }
  })
  parts.forEach(part => {
    part.push('})')
  })
  partsMultiline.forEach(part => {
    part.push('})')
  })
  values.forEach((value, i) => {
    if (addExpectError(value)) parts[i].unshift('//' + `@ts-expect-error\n`)
  })
  return parts.flatMap((part, idx) => {
    if (noMultiline || !useMultiline[idx]) {
      return [part.join('')]
    }
    return partsMultiline[idx]
  })
}
