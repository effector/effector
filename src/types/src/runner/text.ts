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
