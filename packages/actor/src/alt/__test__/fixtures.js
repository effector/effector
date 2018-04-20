//@flow

export function logGroup(
 name: string,
 ...pairs: Array<[string | string[], any]>
) {
 const str = [`\n\n# ${name}`]
 if (pairs.length !== 1) {
  for (const [tag, value] of pairs) {
   logGroup$addTag(tag, str)
   logGroup$addValue(value, str)
  }
  str.push(`\n`)
 } else {
  const [[tag, value]] = pairs
  logGroup$addTag(tag, str)
  logGroup$addValue(value, str)
 }

 console.log(...str)
}

function logGroup$addValue(value, str) {
 if (Array.isArray(value)) {
  for (const _ of value) str.push(_, `\n  `)
 } else {
  str.push(value)
 }
}

function logGroup$addTag(value, str) {
 let tag
 if (Array.isArray(value)) {
  tag = value.join(', ')
 } else {
  tag = value
 }
 str.push(`\n  ${tag}:\n  `)
}
