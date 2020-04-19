//@noflow

export function withDisplayName(name: string, Component) {
  Component.displayName = name
  return Component
}
