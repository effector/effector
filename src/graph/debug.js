//@flow

export default function debug(
 stringsRaw: string[],
 ...values: Array<any>
): any {
 const strings = stringsRaw.map(str =>
  str
   .split(`\n`)
   .map(s => s.trim())
   .join(`\n`),
 )
 if (strings.length === 0) return ['(nothing)']
 if (strings.length === 1 && values.length === 0) {
  console.log(`\n${strings[0]}`)
  return [`\n${strings[0]}`]
 }
 const maxLength = strings
  .filter(s => !/(#|\\\\)/g.test(s))
  .reduce((max, str) => Math.max(max, str.length), 0)
 const results: any[] = []
 for (let i = 0; i < strings.length - 1; i++) {
  const isHeader = /#/g.test(strings[i])
  const isSkip = /\!\!skip/g.test(strings[i])
  if (isSkip) return ['']
  const text = isHeader ? strings[i].replace(/#(\s+)?/g, '') : strings[i]
  const obj = values[i]
  const spaces = Array.from(
   {length: Math.max(0, maxLength - text.length)},
   () => ' ',
  ).join('')
  const spaced = `${text}${spaces} `
  if (isHeader) {
   results.push(`\n~~~\n  `, text, obj, `\n~~~\n`)
  } else if (!/\\\\/g.test(text)) results.push(`\n`, spaced, obj)
 }
 results.push(strings[strings.length - 1])
 console.log(...results)
 return results
}
