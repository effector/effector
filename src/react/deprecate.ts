export const deprecate = (method: string, suggestion?: string) => {
  const suggestionMessage = suggestion ? `, use ${suggestion} instead` : ''
  console.error(`${method} is deprecated${suggestionMessage}`)
}
