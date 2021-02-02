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
