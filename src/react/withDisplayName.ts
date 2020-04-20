export function withDisplayName(name: string, Component: any) {
  Component.displayName = name
  return Component
}
