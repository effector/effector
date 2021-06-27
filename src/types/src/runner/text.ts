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
}: {
  values: Record<string, any>[]
  only: string[]
}) {
  const fieldsValues: Record<string, {values: string[]; maxSize: number}> = {}
  fieldSet.forEach(field => {
    fieldsValues[field] = {values: [], maxSize: field.length}
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
  for (const field of fieldSet) {
    const fieldItem = fieldsValues[field]
    titleLine += field
    if (field.length < fieldItem.maxSize) {
      titleLine += ' '.repeat(fieldItem.maxSize - field.length)
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
  addExpectError = true,
  align = false,
}: {
  method: string
  values: Record<string, any>[]
  shape: Record<string, string | {field: string; when?: string}>
  addExpectError?: boolean | ((value: any) => boolean)
  align?: boolean
}) {
  const parts = Array.from(values, () => [method, '({'])
  const isFirstField = Array.from(values, () => true)
  forIn(shape, (schemaRecord, methodField) => {
    const objectField =
      typeof schemaRecord === 'string' ? schemaRecord : schemaRecord.field
    const when: string | null | void =
      typeof schemaRecord === 'string' ? null : schemaRecord.when
    let max = 0
    if (align) {
      for (const value of values) {
        const objectFieldValue = value[objectField]
        if (when && !value[when]) continue
        if (
          !when &&
          (objectFieldValue === undefined || objectFieldValue === null)
        )
          continue
        const content = Array.isArray(objectFieldValue)
          ? printArray(objectFieldValue)
          : `${objectFieldValue}`
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
      const content = Array.isArray(objectFieldValue)
        ? printArray(objectFieldValue)
        : `${objectFieldValue}`
      const alignPad = align ? ' '.repeat(max - content.length) : ''
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
  if (addExpectError !== undefined || addExpectError !== false) {
    const readExpectError =
      typeof addExpectError === 'boolean'
        ? (value: any) => addExpectError && !value.pass
        : addExpectError
    values.forEach((value, i) => {
      if (readExpectError(value)) parts[i].unshift('//' + `@ts-expect-error\n`)
    })
  }
  return parts.map(part => part.join(''))
}
